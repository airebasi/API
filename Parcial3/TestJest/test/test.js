const areas = require('../src/AreaCuadrado');

test('Si mando un 2, debe de resultar en un 4', () => {
  expect(areas.areaCuadrado(2)).toBe(4);
});
