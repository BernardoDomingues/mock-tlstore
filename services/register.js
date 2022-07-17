const bcrypt = require("bcryptjs"); // Criptografia da senha
const { writeMock } = require('../repositories');

module.exports.registerService = async (data) => {
  const saltRounds = 10; // Define quantas vezes a senha será incriptada
  const salt = bcrypt.genSaltSync(saltRounds);
  data.password = bcrypt.hashSync(data.password, salt);

  const registerAddressData = {
    cep: data.address_cep,
    street: data.address_street,
    number: data.address_number,
    neighborhood: data.address_neighborhood,
    city: data.address_city,
    uf: data.address_uf
  }
  const saveAddressDatabase = await writeMock('address', registerAddressData);

  const registerUserData = {
    email: data.email,
    userName: data.userName,
    password: data.password,
    addressId: saveAddressDatabase.id
  };

  const saveDatabase = await writeMock('users', registerUserData);
  return {
    status: true,
    saveDatabase,
  };
};
