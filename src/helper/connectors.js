import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { ethers } from "ethers";
import Web3 from "web3";
import { supportNetwork , RPC_URLS } from './network';


export const infura_Id = "84842078b09946638c03157f83405213";

export const web3 = new Web3(Web3.givenProvider);
web3.eth.getChainId().then((result) => {
  web3.setProvider(getRpcUrl(result))
});

export const getRpcUrl = (chainId) => {
  // console.log(supportNetwork[chainId]);
  return supportNetwork[chainId] ? supportNetwork[chainId].rpc : supportNetwork['default'].rpc;
}


export const getWeb3 = (chainId) =>{
  return new Web3(getRpcUrl(chainId));
}



export const supportChainId = Object.keys(supportNetwork).map(function (key) {
    return parseInt(key);
});


export const injected = new InjectedConnector({
  supportedChainIds: supportChainId
})

export const walletconnect = new WalletConnectConnector({
  rpc: RPC_URLS,
  qrcode: true,
  infuraId: infura_Id,
});

export const coinbaseWallet = new WalletLinkConnector({

  url: RPC_URLS,
  appName: "Blockstar App",
  supportedChainIds: supportChainId,

});


export const simpleRpcProvider = new ethers.providers.StaticJsonRpcProvider(getRpcUrl());

