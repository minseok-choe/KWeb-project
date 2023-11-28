const util = require('util');
const crypto = require('crypto');
const pbkdf2 = util.promisify(crypto.pbkdf2);

const randomBytes = util.promisify(crypto.randomBytes);
const encrypt = async text => {
    const ALGO = 'sha512';
    const KEY_LEN = 64;
    const salt = await randomBytes(32);
    const iter = Math.floor(Math.random() * 20000) + 200000;
    const digest = await pbkdf2(text, salt, iter, KEY_LEN, ALGO);
    console.log(`${text} | ${iter} | ${digest.toString('base64')}`);
};

(async () => encrypt('samplepassword'))();
(async () => encrypt('samplepassword'))();