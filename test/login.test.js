const test = require("node:test");
const assert = require("node:assert");
const { login } = require("../src/login");

test("rechaza credenciales vacías", () => {
  const res = login("", "");
  assert.strictEqual(res.ok, false);
});

test("rechaza una clave demasiado corta", () => {
  const res = login("eduardo", "123");
  assert.strictEqual(res.ok, false);
});

test("acepta credenciales válidas", () => {
  const res = login("eduardo", "clave123");
  assert.strictEqual(res.ok, true);
  assert.match(res.mensaje, /¡Hola, eduardo!/);
});
