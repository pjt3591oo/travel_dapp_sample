import Web3 from 'web3';

import erc721Abi from './erc721NftAbi';

const endpoint = "http://localhost:8545";
const web3 = new Web3(new Web3.providers.HttpProvider(endpoint));

const CA = "0x303b63964fC536Eb70211cF5f9fEe1079b2fFB8d"; // 배포한 스마트 컨트랙트 주소
const Contract = new web3.eth.Contract(erc721Abi, CA);

const from = "0xCA6ace6f884B84D34A6567e9a782a47a5fcb98e9";
const privatekey = "0xfd645d40e36cf431010ecf4411b5171cb3896d2c3d410a981044fe3e5e210cc7";

async function createNft(reservationId, startDate, endDate, price, ownerAddress) {
  let bytedata = await Contract.methods.mint(
    reservationId, startDate, endDate, price, ownerAddress
  ).encodeABI()
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
  createNft: createNft,
  getReservationById: getReservationById
};