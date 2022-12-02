import { useEffect, useState } from "react"
import { MulticallContract, getStakingContract } from "../helper/useContracts";
import { useWeb3React } from "@web3-react/core";
import { getWeb3 } from "../helper/connectors";
import tokenAbi from '../json/token.json';



export const useCommonStats = (update) => {
  const context = useWeb3React();
  const { chainId } = context;
  let web3 = getWeb3(chainId);

  const [stats, setStats] = useState({
    totalRewardsDistribution: 0,
    totalStake: 0,
    totalWithdrawal: 0,
    tokenDecimal: 0,
    tokenSymbol: '',
    tokenName: '',
    duration: [],
    bonous: [],
    tokenAddress : ''
  });

  const mc = MulticallContract(chainId);
  const sc = getStakingContract(chainId);

  useEffect(() => {
    const fetch = async () => {

      const data = await mc.aggregate([
        sc.methods.totalRewardsDistribution(), //0,
        sc.methods.totalStake(), //1
        sc.methods.totalWithdrawal(), //2
        sc.methods.token(), //3
        sc.methods.getAllPoolInfo() //4
      ]);

      let tc = new web3.eth.Contract(tokenAbi, data[3]);

      const tokenData = await mc.aggregate([
        tc.methods.name(),
        tc.methods.symbol(),
        tc.methods.decimals()
      ]);

      setStats({
        totalRewardsDistribution: data[0] / Math.pow(10, tokenData[2]),
        totalStake: data[1] / Math.pow(10, tokenData[2]),
        totalWithdrawal: data[2] / Math.pow(10, tokenData[2]),
        tokenDecimal: tokenData[2],
        tokenSymbol: tokenData[1],
        tokenName: tokenData[0],
        duration: [data[4][0], data[4][1], data[4][2], data[4][3]],
        bonous: [data[4][4], data[4][5], data[4][6], data[4][7]],
        tokenAddress : data[3]


      });
    }

    if (mc) {
      fetch();
    }
    else {
      setStats({
        totalRewardsDistribution: 0,
        totalStake: 0,
        totalWithdrawal: 0,
        tokenDecimal: 0,
        tokenSymbol: '',
        tokenName: '',
        duration: [],
        bonous: [],
        tokenAddress : ''

      })
    }
    // eslint-disable-next-line
  }, [update, chainId]);

  return stats;
}

export const useAccountStats = (updater) => {
  const context = useWeb3React();
  const { chainId, account } = context;
  let web3 = getWeb3(chainId);
  const [stats, setStats] = useState({
    balance: 0,
    isApprove: false,
    totalStake: 0,
    orderIds: '',
    totalRewardEarn: 0
  });

  const mc = MulticallContract(chainId);
  const sc = getStakingContract(chainId);
  // const tc = getTokenContract(chainId);


  useEffect(() => {
    const fetch = async () => {
      try {
          const data = await mc.aggregate([
            sc.methods.token(),
            sc.methods.balanceOf(account),
            sc.methods.investorOrderIds(account),
            sc.methods.totalRewardEarn(account),
          ]);

          let tc = new web3.eth.Contract(tokenAbi, data[0]);
          
          const tokenData = await mc.aggregate([
            tc.methods.decimals(),
            tc.methods.balanceOf(account),
            tc.methods.allowance(account,sc._address)
          ]);

       

        setStats({
          balance: tokenData[1] / Math.pow(10, tokenData[0]),
          isApprove: tokenData[2] / Math.pow(10, tokenData[0]),
          totalStake: data[1] / Math.pow(10, tokenData[0]),
          orderIds: data[2],
          totalRewardEarn: data[3] / Math.pow(10, tokenData[0])
        })
      }
      catch (err) {
        console.log(err.message);
      }
    }

    if (mc && account) {
      fetch();
    }
    else {
      setStats({
        balance: 0,
        isApprove: false,
        totalStake: 0,
        orderIds: '',
        totalRewardEarn: 0,
      })
    }
    // eslint-disable-next-line
  }, [account, updater, chainId]);

  return stats;
}
