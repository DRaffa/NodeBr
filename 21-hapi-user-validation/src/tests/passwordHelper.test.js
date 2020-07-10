const assert = require('assert');
const PasswordHelper = require('../helpers/passwordHelper');

const SENHA = 'Rafa@123';
const HASH = '$2b$04$YIROn7jDDBnb1MlBtEGS9uc3rcRQBev90zcnl87EEKNAc.WR2vXeG';

describe('UserHelper test suite', function () {
  it('deve gerar um has a partir de uma senha', async () => {
    const result = await PasswordHelper.hashPassword(SENHA);
    assert.ok(result.length > 10);
  });
  it('deve validar nossa senha', async () => {
    const result = await PasswordHelper.comparePassword(SENHA, HASH);
    assert.ok(result);
  });
});
