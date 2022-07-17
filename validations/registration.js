const { check } = require("express-validator");
const MOCK = require("../mock.json");

// Validação dos dados
module.exports = [
  check('email', 'Email inválido').isEmail(),
  check('email', 'Email deve ter ao menos 5 caracteres').isLength({ min: 5 }),
  check('email').custom(async (value) => {
    //Confere se o e-mail já está cadastrado
    const userData = MOCK.users.find((user) => user.email === value);
    if (userData) { 
      throw new Error('Email já cadastrado');
    }
    return true;
  }),
  check('userName', 'Nome deve ter ao menos 5 caracteres').isLength({ min: 5 }),
  check('address_cep', 'CEP deve ter 8 caracteres').isLength({ min: 8, max: 8 }),
  check('address_street', 'Rua deve ter ao menos 3 caracteres').isLength({ min: 3 }),
  check('address_number', 'Número deve ter ao menos 1 caractere').isLength({ min: 1 }),
  check('address_neighborhood', 'Bairro deve ter ao menos 5 caracteres').isLength({ min: 5 }),
  check('address_city', 'Cidade deve ter ao menos 5 caracteres').isLength({ min: 5 }),
  check('address_uf', 'UF deve ter 2 caracteres').isLength({ min: 2, max: 2 }),
  check('password', 'Senha deve ter ao menos 5 caracteres').isLength({ min: 5}),
  check('passwordConfirmation').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Senhas não conferem');
    }
    return true;
  }),
];