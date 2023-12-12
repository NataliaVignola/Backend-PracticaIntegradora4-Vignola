import {Router} from "express";
import {
    getProductByIdController,
    getProductsController,
    postNewProductController,
    updateNewProductController,
    deleteProductController
} from '../controllers/productController.js';

const router = Router();

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Obtiene la lista de productos de café de especialidad
 *     responses:
 *       200:
 *         description: Lista de productos obtenida con éxito
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Obtiene un producto específico por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto a obtener
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto obtenido con éxito
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error del servidor
 *   put:
 *     summary: Actualiza un producto existente por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto a actualizar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto actualizado con éxito
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error del servidor
 *   delete:
 *     summary: Elimina un producto existente por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto eliminado con éxito
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error del servidor
 */

router.get('/', getProductsController);
router.get('/:id', getProductByIdController);
router.post('/', postNewProductController);
router.put('/:id', updateNewProductController);
router.delete('/:id', deleteProductController);

export default router;
