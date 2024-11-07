import * as chai from 'chai';
import test from 'node:test';
import * as areas from '../src/AreaCuadrado.js';

test("Si mando un 2, debe de resultar en un 4",()=>{
    let res = areas.areaCuadrado(2);
    chai.assert(res, 4);
//    assert.typeOf(res,'number');
})

test("Si mando un 2, debe de resultar en un 4",()=>{
    let res = areas.areaCuadrado(2);
    chai.expect(res).to.be.a('number');
})