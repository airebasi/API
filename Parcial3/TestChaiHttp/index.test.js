let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url = 'http://localhost:3000';

describe('Inserta un empleado: ', () => {
    it("Revisar que servidor me de un 200", (done) => {
        chai.request(url)
        .get("/empleado")
        .end(function (err, res) { 
            if (err) done(err);  
            expect(res).to.have.status(200);  
            done(); 
        });
    });
});
