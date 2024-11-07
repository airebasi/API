import assert from 'node:assert';
import test from 'node:test';
import * as areas from '../src/AreaCuadrado.js';

test("Si mando un 2, debe de resultar en un 4",()=>{
    let res = areas.areaCuadrado(2);
    assert.strictEqual(res,4);
})