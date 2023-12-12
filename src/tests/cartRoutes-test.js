const supertest = require('supertest');
const app = require('../app');
const {
    expect
} = require('chai');

const products = [{
        "title": "Brasil Crucera",
        "description": "Bolsa de café 250gr.",
        "price": 550,
        "thumbnail": "bolsa-brasil.jpg",
        "code": 5,
        "stock": 50,
        "id": 1,
        "category": "250gr."
    },
    // ... otros productos ...
];

describe('Cart Routes', () => {
    it('should return a list of carts', async () => {
        const res = await supertest(app).get('/cart');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
    });

    it('should add a new cart', async () => {
        const res = await supertest(app)
            .post('/cart')
            .send({
                products: products.map(product => ({
                    productId: product.id,
                    quantity: 2 // ajusta la cantidad según tus necesidades
                }))
            });
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('cartId');
    });

    it('should replace all products in a cart', async () => {
        // Asume que ya hay un carrito creado y su ID es 1 (ajusta según tu lógica)
        const cartId = 1;

        const res = await supertest(app)
            .put(`/cart/${cartId}`)
            .send({
                products: products.map(product => ({
                    productId: product.id,
                    quantity: 3 // ajusta la cantidad según tus necesidades
                }))
            });

        expect(res.status).to.equal(200);
    });
});
