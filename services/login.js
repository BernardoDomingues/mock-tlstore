const MOCK = require('../mock.json'); // Importa dados
const bcrypt = require("bcryptjs"); // Criptografia da senha
const jwt = require('jsonwebtoken'); // Cria token de autenticação
const secret = require('../config/secret'); // Importa API Secret

module.exports.loginService = async (data) => {
  let returnValue = {
    status: false,
    error: "Dados Incorretos.",
  };
  
  // Procura usuário pelo e-mail no mock
  const userData = MOCK.users.find((user) => user.email === data.email);

  if (userData) {
    // Compara a senha registrada com a inputada
    const comparePassword = bcrypt.compareSync(
      data.password,
      userData.password
    );
    if (comparePassword) {
      const payload = {...userData, id: userData.id };
      const token = jwt.sign(payload, secret, { algorithm: 'HS256', expiresIn: 43200 });
      returnValue = {
        status: true,
        userToken: token,
        description: "Os dados foram recebidos com sucesso.",
      };
    }
  }

  return returnValue;
};
