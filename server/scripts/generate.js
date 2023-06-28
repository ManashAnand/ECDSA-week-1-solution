const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

const privateKey = toHex(secp.secp256k1.utils.randomPrivateKey());
const publicKey = toHex(secp.secp256k1.getPublicKey(privateKey));
const address = publicKey.slice(-20);




console.log("private key is : "+(privateKey))
console.log("Public key: " + (publicKey)); 
console.log("Public address is "+ (address))