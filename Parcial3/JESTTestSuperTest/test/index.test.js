const request = require('supertest');
const url = 'https://localhost/8002'

describe('Inserta un empleado: ', () => {
    it("Revisar que servidor me de un 200", (done) => {
        request(url)
        .get("/empleado")
        .end((err, res) => {
            expect(res.statusCode).toBe(200);
            expect(res.body).toBeInstanceOf(Object);
            expect(res.body).toHaveProperty("message", "Servidor funcionando en 8002");
        done();
        });
    });
});
