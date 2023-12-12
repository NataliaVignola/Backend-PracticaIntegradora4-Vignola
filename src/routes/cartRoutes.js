import { Router } from "express";
import {
    createNewCartController,
    getCartByIdController,
    setProductToCart,
    deleteProductInCart,
    replaceProductsInCart,
    updateProductQuantityInCart,
    deleteAllProductsInCart
} from '../controllers/cartController.js';

const router = Router();

/**
 * @swagger
 * /cart:
 *   post:
 *     summary: Crea un nuevo carrito de compras
 *     responses:
 *       200:
 *         description: Carrito creado con éxito
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /cart/{cid}:
 *   get:
 *     summary: Obtiene un carrito específico por ID
 *     parameters:
 *       - in: path
 *         name: cid
 *         required: true
 *         description: ID del carrito a obtener
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Carrito obtenido con éxito
 *       404:
 *         description: Carrito no encontrado
 *       500:
 *         description: Error del servidor
 *   put:
 *     summary: Reemplaza todos los productos en un carrito por ID
 *     parameters:
 *       - in: path
 *         name: cid
 *         required: true
 *         description: ID del carrito a actualizar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Carrito actualizado con éxito
 *       404:
 *         description: Carrito no encontrado
 *       500:
 *         description: Error del servidor
 *   delete:
 *     summary: Elimina un carrito específico por ID
 *     parameters:
 *       - in: path
 *         name: cid
 *         required: true
 *         description: ID del carrito a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Carrito eliminado con éxito
 *       404:
 *         description: Carrito no encontrado
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /cart/{cid}/products/{pid}:
 *   post:
 *     summary: Agrega un producto al carrito por ID de carrito y ID de producto
 *     parameters:
 *       - in: path
 *         name: cid
 *         required: true
 *         description: ID del carrito al que se agregará el producto
 *         schema:
 *           type: string
 *       - in: path
 *         name: pid
 *         required: true
 *         description: ID del producto a agregar al carrito
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto agregado al carrito con éxito
 *       404:
 *         description: Carrito o producto no encontrado
 *       500:
 *         description: Error del servidor
 */

router.post('/', createNewCartController);
router.get('/:cid', getCartByIdController);
router.post('/:cid/products/:pid', setProductToCart);
router.delete('/:cid/products/:pid', deleteProductInCart);
router.put('/:cid', replaceProductsInCart);
router.put('/:cid/products/:pid', updateProductQuantityInCart);
router.delete('/:cid', deleteAllProductsInCart);

export default router;
