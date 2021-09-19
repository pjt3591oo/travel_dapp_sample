import Web3 from 'web3';

import erc20Abi from './erc20TokenAbi';

const endpoint = "http://localhost:8545";
const web3 = new Web3(new Web3.providers.HttpProvider(endpoint));

const CA = "0x6E8250489b39c0fA94bFb4586Ba4Bb085C1Af19F"; // 배포한 스마트 컨트랙트 주소
const Contract = new web3.eth.Contract(erc20Abi, CA);

async function sendEther(from, to, amount, privatekey) {
  let bytedata = await Contract.methods.transfer(to, parseInt(amount)).encodeABI()
  const tx = {
    from,
    to: CA, // 해당 스마트 컨트랙트에서 bytedata 실행, to는 스마트 컨트랙트 주소, 없으면 에러발생
    gas: 1000000,
    gasPrice: '2100000000',
    data: `${bytedata}`
  }

  const account = web3.eth.accounts.privateKeyToAccount(privatekey)
  const signedTx = await account.signTransaction(tx)
  const sentTx = await web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction);
  
  let d1 = await web3.eth.getTransaction(sentTx.transactionHash)
  let d2 = await web3.eth.getTransactionReceipt(sentTx.transactionHash)
  console.log(d1, d2)
  return d2;
}

async function getReservationById(index) {
  return await Contract.methods.reservations(index).call()
}

export default {
  sendEther: sendEther,
};
