import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    swaggerDefinition: {
        info: {
            title: 'Cultura Café API',
            version: '1.0.0',
            description: 'API para gestionar productos de café de especialidad en Cultura Café',
        },
    },
    apis: ['./src/routes/*.js'],
};

const specs = swaggerJsdoc(options);

export default (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
