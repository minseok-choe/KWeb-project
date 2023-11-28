const util = require('util');
const crypto = require('crypto');
const pbkdf2 = util.promisify(crypto.pbkdf2);

const randomBytes = util.promisify(crypto.randomBytes);
const encrypt = async text => {
    const ALGO = 'sha512';
    const KEY_LEN = 64;
    const salt = await randomBytes(32);
    const digest = await pbkdf2(text, salt, 1, KEY_LEN, ALGO);
    console.log(`${text} | ${salt.toString('base64')} | ${digest.toString('base64')}`);
};


(async () => encrypt('samplepassword'))();
(async () => encrypt('samplepassword'))();