import express from 'express';
import passport from 'passport';
const router = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     responses:
 *       302:
 *         description: Redirección exitosa después del registro
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Inicia sesión con las credenciales del usuario
 *     responses:
 *       302:
 *         description: Redirección exitosa después del inicio de sesión
 *       401:
 *         description: Credenciales no válidas
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: Cierra sesión y redirige al usuario a la página principal
 *     responses:
 *       302:
 *         description: Redirección exitosa después del cierre de sesión
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /auth/user:
 *   get:
 *     summary: Obtiene el usuario actual
 *     responses:
 *       200:
 *         description: Usuario obtenido con éxito
 *       401:
 *         description: Usuario no autenticado
 *       500:
 *         description: Error del servidor
 */

// Ruta para el registro de usuarios
router.post('/register', passport.authenticate('signup', {
    successRedirect: '/auth/login',
    failureRedirect: '/auth/register',
    failureFlash: true
}));

// Ruta para iniciar sesión
router.post('/login', passport.authenticate('signin', {
    successRedirect: '/', // Redirige a la página principal o a donde desees
    failureRedirect: '/auth/login',
    failureFlash: true
}));

// Ruta para cerrar sesión
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/'); // Redirige a la página principal o a donde desees
});

// Ruta para obtener el usuario actual
router.get('/user', (req, res) => {
    res.json({ user: req.user });
});

export default router;
