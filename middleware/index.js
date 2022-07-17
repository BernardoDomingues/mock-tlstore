const { getUserByToken } = require("./getUserByToken");
const MOCK = require('../mock.json');

module.exports.isAuth = async (req, res, next) => {
  if (!req.headers.authorization) { // Verifica existência do token
    return res.status(401).json({ error: 'Token não encontrado' });
  };

  const token = req.headers.authorization; // Verifica se o usuario do token enviado existe
  const userToken = getUserByToken(token);
  const authorizedUser = MOCK.users.find((user) => user.id === userToken.id);

  if (!authorizedUser) {
    return res.status(401).json({ error: 'Token inválido' });
  }

  return next();
};