const { greet } = require("./greet");

/**
 * Valida las credenciales de un usuario.
 * @param {string} usuario Nombre de usuario ingresado.
 * @param {string} clave Contraseña ingresada.
 * @returns {{ok: boolean, mensaje: string}} Resultado de la validación.
 */
function login(usuario, clave) {
  if (!usuario || !clave) {
    return { ok: false, mensaje: "Usuario y clave son obligatorios." };
  }

  if (clave.length < 6) {
    return { ok: false, mensaje: "La clave debe tener al menos 6 caracteres." };
  }

  return { ok: true, mensaje: greet(usuario) };
}

module.exports = { login };
