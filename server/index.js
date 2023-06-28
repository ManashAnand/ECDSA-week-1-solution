const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "9ac5f59a3e63cd657406": 100,
//   private key is : 6f69f0979dd95dd182cd91186c9f87862cb0ec9d207a82e94820c73a27e5c67b
// Public key: 02caa92f4f47592bed14a07196dc98cc942883201db8359ac5f59a3e63cd657406
// Public address is 9ac5f59a3e63cd657406
  "50197a23dc774e888074": 50,
//   private key is : 18a0eb25b7b05e33c9d668fbdc7664f8df262b391bae4a816feb7546ebfd63a4
// Public key: 03ebb8daecdced9755613690a20a83583d6ac5fbc4e66750197a23dc774e888074
// Public address is 50197a23dc774e888074
  "47a1e71e25c0e1a9886a": 75,
//   private key is : 219a9162dcc8bcdb227b2f83a1dfb6849bc52ac85d3eb59142f53d1d2e2e97da
// Public key: 03a54ed5629bf3d0ecd6a5c4901d2d43b565e5eeaeceb847a1e71e25c0e1a9886a
// Public address is 47a1e71e25c0e1a9886a
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  // console.log(address);
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;
  // console.log(sender)

  setInitialBalance(sender);
  setInitialBalance(recipient);
  console.log(sender);
  console.log(recipient);



  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
