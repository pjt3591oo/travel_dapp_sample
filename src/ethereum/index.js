import erc20 from './erc20';
import erc721 from './erc721';

export default { 
  erc20: {
    sendEther: erc20.sendEther,
  }, 
  erc721: {
    createNft: erc721.createNft,
    getReservationById: erc721.getReservationById
  } 
}
