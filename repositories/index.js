const mock = require("../mock.json");
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const writeMock = async (colection, data) => {
  const newData = mock;
  data.id = uuidv4(); // Adiciona Id ao registro
  newData[colection].push(data); // Adiciona registro no array

  // Cria novo arquivo atualizado
  const treatData = JSON.stringify(newData, null, 2);
  fs.writeFileSync('mock.json', treatData, (err) => {
    if (err) throw err;
    console.log('Erro ao gravar dados');
  });

  // Lê dados para gerar retorno
  const read = fs.readFileSync('mock.json');
  const jsonTransform = JSON.parse(read);
  const createdRegisterPosition = jsonTransform[colection].length - 1
  const createdRegister = jsonTransform[colection][createdRegisterPosition];

  return createdRegister
}

module.exports = { writeMock };