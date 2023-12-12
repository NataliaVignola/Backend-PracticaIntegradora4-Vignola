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

describe('Product Routes', () => {
    it('should return a list of products', async () => {
        const res = await supertest(app).get('/products');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
    });

    it('should add a new product', async () => {
        const res = await supertest(app)
            .post('/products')
            .send({
                title: "Nuevo Producto",
                description: "Descripción del nuevo producto",
                price: 800,
                thumbnail: "nueva-imagen.jpg",
                code: 55,
                stock: 10,
                category: "Nuevo Producto Category"
            });
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('productId');
    });

    it('should update an existing product', async () => {
        // Asume que ya hay un producto creado y su ID es 1 (ajusta según tu lógica)
        const productId = 1;

        const res = await supertest(app)
            .put(`/products/${productId}`)
            .send({
                title: "Producto Actualizado",
                description: "Nueva descripción del producto",
                price: 900,
                thumbnail: "nueva-imagen-actualizada.jpg",
                code: 60,
                stock: 15,
                category: "Producto Actualizado Category"
            });

        expect(res.status).to.equal(200);
        // Añade más aserciones según tus necesidades
    });
});
