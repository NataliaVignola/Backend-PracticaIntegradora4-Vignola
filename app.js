import express from 'express';
import http from 'http';
import path from 'path';
import mongoose from 'mongoose';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import passport from './config/passport-config.js';
import initializePassport from './config/passport-config.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import { ProductManager } from './src/ProductManager.js';
import { Server } from 'socket.io';

// Nueva importación para Swagger
import swaggerSetup from './config/swagger.js';

// Rutas
import cartRoutes from './src/routes/cartRoutes.js';
import productRoutes from './src/routes/productRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import authRoutes from './src/routes/authRoutes.js';
import mockingController from './src/controllers/mockingController.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const port = 8080;

// Conectar a la base de datos MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/cultura-cafe', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
    const MongoStore = connectMongo.create({
        client: mongoose.connection.getClient()
    });

    app.use(session({
        secret: 'clave-secreta-nati',
        resave: false,
        saveUninitialized: true,
        store: MongoStore,
    }));

    // Configura Passport
    initializePassport(passport);
    app.use(passport.initialize());
    app.use(passport.session());

    const currentFileUrl = import.meta.url;
    const __dirname = path.dirname(new URL(currentFileUrl).pathname);
    const productManager = new ProductManager(path.join(__dirname, 'data/products.json'));
    const hbs = exphbs.create();
    app.engine('handlebars', hbs.engine);
    app.set('view engine', 'handlebars');

    app.use(express.json());
    app.use(express.urlencoded({
        extended: true
    }));

    // Rutas
    app.use('/cart', cartRoutes);
    app.use('/products', productRoutes);
    app.use('/users', userRoutes);
    app.use('/auth', authRoutes);
    app.use('/mocking', mockingController);

    // Servir archivos estáticos desde la carpeta "public"
    app.use(express.static(path.join(__dirname, 'public')));

    // Ruta para la vista en tiempo real utilizando Handlebars y WebSockets
    app.get('/realtimeproducts', (req, res) => {
        const products = productManager.getProducts();
        res.render('realTimeProducts', {
            products
        });
    });

    // Manejar conexiones de socket.io
    io.on('connection', (socket) => {
        console.log('Usuario conectado por WebSocket');

        socket.on('productoCreado', (newProduct) => {
            // Manejar evento de nuevo producto
            console.log('Nuevo producto:', newProduct);
        });

        socket.on('productoActualizado', (productId) => {
            // Manejar evento de producto actualizado
            console.log('Producto actualizado:', productId);
        });

        socket.on('productoEliminado', (productId) => {
            // Manejar evento de producto eliminado
            console.log('Producto eliminado:', productId);
        });

        socket.on('disconnect', () => {
            console.log('Usuario desconectado por WebSocket');
        });
    });

// Ruta para obtener el usuario actual (Swagger no documenta esta ruta)
app.get('/api/sessions/current', (req, res) => {
    if (req.isAuthenticated()) {
        res.json({
            user: req.user
        });
    } else {
        res.json({
            user: null
        });
    }
});

// Configurar Swagger
swaggerSetup(app);

// Usar el middleware de manejo de errores
app.use(errorHandler);
app.use(notFoundHandler);

// Iniciar el servidor
    server.listen(port, () => {
        console.log(`Servidor Express corriendo en http://localhost:${port}`);
    });
}).catch(error => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
});
