import server from "./server";
import { secp256k1 } from 'ethereum-cryptography/secp256k1'
import {toHex} from 'ethereum-cryptography/utils'

function Wallet({ address, setAddress, balance, setBalance }) {
  async function onChange(evt) {
    const address = evt.target.value;
    if(address.length<64){
      console.log("private key length is less");
      setAddress(address);
      return ;
    } 
    
    setAddress(address);
    if (address) {
      // address originally mera pvt key hai jisko hum yha pe address me badlenge public key ke use se
      const pvtKey = address;
      // console.log(pvtKey)
      const publicKey = toHex(secp256k1.getPublicKey(pvtKey));
      const add = publicKey.slice(-20);
      // console.log("From frontend "+add)
      const {
        data: { balance },
      } = await server.get(`balance/${add}`);
      setAddress(add);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Wallet Address
        <input placeholder="Type an address, for example: 0x1" value={address} onChange={onChange}></input>
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
