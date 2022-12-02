import { supportNetwork } from "./network";
import StakeAbi from '../json/tokenstake.json';
import {contract}  from './contract';
import Multicall from '@dopex-io/web3-multicall';
import {getWeb3} from './connectors';
import tokenAbi from '../json/token.json';

export const MulticallContract = (chainId) => {
  let multicallAddress = contract[chainId] ? contract[chainId].multicallAddress : contract['default'].multicallAddress; 

  let provider = supportNetwork[chainId] ? supportNetwork[chainId].rpc : supportNetwork['default'].rpc; 
  

  const multicall = new Multicall({
    multicallAddress,
    provider
  });

  return multicall;

}


export const getStakingContract = (chainId) =>{
  let address = contract[chainId] ? contract[chainId].stakingAddress : contract['default'].stakingAddress;
  let web3 = getWeb3(chainId);
  return new web3.eth.Contract(StakeAbi, address);
} 

export const getTokenContract = (chainId) =>{
  let address = contract[chainId] ? contract[chainId].tokenAddress : contract['default'].tokenAddress;
  let web3 = getWeb3(chainId);
  return new web3.eth.Contract(tokenAbi, address);
} 


export const formatPrice = (num) => {
  //return parseFloat(num.toFixed(decimals)).toLocaleString();
  return new Intl.NumberFormat('ja-JP').format(num);
}