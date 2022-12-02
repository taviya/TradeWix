import { useEffect, useState } from "react"
import { MulticallContract, getStakingContract, getTokenContract } from "../helper/useContracts";
import { useWeb3React } from "@web3-react/core";



export const useCommonStats = (update) => {
  const context = useWeb3React();
  const { chainId } = context;

  const [stats, setStats] = useState({
    totalRewardsDistribution: 0,
    totalStake: 0,
    totalWithdrawal: 0,
    tokenDecimal : 18
  });

  const mc = MulticallContract(chainId);
  const sc = getStakingContract(chainId)
  const tc = getTokenContract(chainId)

  useEffect(() => {
    const fetch = async () => {
      
      const data = await mc.aggregate([
        sc.methods.totalRewardsDistribution(),
        sc.methods.totalStake(),
        sc.methods.totalWithdrawal(),
        tc.methods.decimals()
      ]);

      setStats({
        totalRewardsDistribution: data[0] / Math.pow(10, data[3]),
        totalStake: data[1] / Math.pow(10, data[3]),
        totalWithdrawal: data[2] / Math.pow(10, data[3]),
        tokenDecimal : data[3]
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
        tokenDecimal : 18

      })
    }
    // eslint-disable-next-line
  }, [update, chainId]);

  return stats;
}

export const useAccountStats = (updater) => {
  const context = useWeb3React();
  const { chainId, account } = context;
  const [stats, setStats] = useState({
    balance: 0,
    isApprove: false,
    totalStake: 0,
    orderIds: '',
    totalRewardEarn: 0
  });

  const mc = MulticallContract(chainId);
  const sc = getStakingContract(chainId);
  const tc = getTokenContract(chainId);


  useEffect(() => {
    const fetch = async () => {
      const data = await mc.aggregate([
        tc.methods.balanceOf(account),
        tc.methods.allowance(account, sc._address),
        sc.methods.balanceOf(account),
        sc.methods.investorOrderIds(account),
        sc.methods.totalRewardEarn(account),
        tc.methods.decimals()
      ]);

      setStats({
        balance: data[0] / Math.pow(10, data[5]),
        isApprove: data[1] / Math.pow(10, data[5]),
        totalStake: data[2] / Math.pow(10, data[5]),
        orderIds: data[3],
        totalRewardEarn: data[4] / Math.pow(10, data[5])
      })
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
        totalRewardEarn: 0
      })
    }
    // eslint-disable-next-line
  }, [account, updater, chainId]);

  return stats;
}
