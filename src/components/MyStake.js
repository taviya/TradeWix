import React, { useState, useEffect } from 'react';
import { formatPrice } from '../helper/useContracts';
import { useAccountStats , useCommonStats } from '../hooks/useStats';
import { useWeb3React } from '@web3-react/core';
import { getStakingContract } from '../helper/useContracts';
import { getContract } from '../helper/contractHelper';
import { contract } from '../helper/contract';
import { toast } from 'react-toastify';
import stakeAbi from '../json/tokenstake.json';
import { getWeb3 } from '../helper/connectors';
import Button from 'react-bootstrap-button-loader';




export default function MyStake() {
    const { chainId, account, library } = useWeb3React();
    const [updater, setUpdater] = useState(new Date());
    const accStats = useAccountStats(updater);
    const stats = useCommonStats(updater);
    const [orders, setOrders] = useState([]);
    const [wloading, setWloading] = useState(false);
    // const [croading, setCroading] = useState(false);
    const [emloading, setEmloading] = useState(false);
    const [currentTime,setCurrentTime] = useState(Math.floor(Date.now() / 1000))
    const [refresh, setRefersh] = useState(new Date());
    const [rewardcal, setRewardcal] = useState({ pendingReward: 0 });


    useEffect(() => {
        const getOrder = async () => {
            try {
                let stakecontract = await getStakingContract(chainId);
                
                const data_array = await stakecontract.methods.investorOrderIds(account).call();
                Promise.all(data_array.map(async (index) => {
                    const getdata = await stakecontract.methods.orders(index).call();
                    const pendingReward = await stakecontract.methods.pendingRewards(index).call();
                    
                    const object = {
                        amount: getdata.amount.toString() / Math.pow(10, 18),
                        lockupDuration: getdata.Duration.toString(),
                        returnPer: getdata.Bonus.toString(),
                        starttime: getdata.starttime.toString(),
                        endtime: getdata.endtime.toString(),
                        claimedReward: getdata.claimedReward.toString(),
                        claimed: getdata.claimed.toString(),
                        orderId: index,
                        pendingReward: pendingReward / Math.pow(10, 18 )
                    }
                    return object;
                })).then((result) => {
                    setOrders(result);
                })
            } catch (err) {
                console.log(err);
            }
        };

        async function rewardCount() {
            try {
                let stakecontract = await getStakingContract(chainId);
                const data_array = await stakecontract.methods.investorOrderIds(account).call();
                Promise.all(data_array.map(async (index) => {
                    const pendingReward = await stakecontract.methods.pendingRewards(index).call();
                    const object = {
                        pendingReward: pendingReward / Math.pow(10, 18)
                    }
                    return object;
                })).then((result) => {
                    setRewardcal(result);
                    setCurrentTime(Math.floor(Date.now() / 1000));
                })
            } catch (err) {
                console.log(err);
            }
        }

        if (account && chainId) {
            getOrder();
            rewardCount();
            setInterval(() => {
                rewardCount();
            }, 60000);
        }
        // eslint-disable-next-line
    }, [account, chainId, refresh,stats]);




    const handleWithdraw = async (e, orderId) => {
        e.preventDefault();
        setWloading(true);
        try {

            if (account) {
                if (chainId) {
                    let tokenStakingAddress = contract[chainId] ? contract[chainId].stakingAddress : contract['default'].stakingAddress;
                    let stakeContract = getContract(stakeAbi, tokenStakingAddress, library);
                    let tx = await stakeContract.withdraw(orderId, { 'from': account });
                    toast.loading('Waiting for confirmation..');

                    var interval = setInterval(async function () {
                        let web3 = getWeb3(chainId);
                        var response = await web3.eth.getTransactionReceipt(tx.hash);
                        if (response != null) {
                            clearInterval(interval)
                            if (response.status === true) {
                                toast.dismiss();
                                toast.success('success ! your last transaction is success 👍');
                                setUpdater(new Date());
                                setWloading(false);
                                setRefersh(new Date())
                            }
                            else if (response.status === false) {
                                toast.dismiss();
                                toast.error('error ! Your last transaction is failed.');
                                setUpdater(new Date());
                                setWloading(false);
                            }
                            else {
                                toast.dismiss();
                                toast.error('error ! something went wrong.');
                                setUpdater(new Date());
                                setWloading(false);
                                setRefersh(new Date())
                            }
                        }
                    }, 5000);
                }
                else {
                    toast.error('Please select Smart Chain Network !');
                    setWloading(false);
                }
            }
            else {
                toast.error('Please Connect Wallet!');
                setWloading(false);
            }

        }
        catch (err) {
            toast.dismiss();
            toast.error(err.reason ? err.reason : err.message )
            setWloading(false);
        }
    }

    const handleEmergencyWithdraw = async (e, orderId) => {
        e.preventDefault();
        setEmloading(true);
        try {

            if (account) {
                if (chainId) {
                    let tokenStakingAddress = contract[chainId] ? contract[chainId].stakingAddress : contract['default'].stakingAddress;
                    let stakeContract = getContract(stakeAbi, tokenStakingAddress, library);
                    let tx = await stakeContract.emergencyWithdraw(orderId, { 'from': account });
                    toast.loading('Waiting for confirmation..');

                    var interval = setInterval(async function () {
                        let web3 = getWeb3(chainId);
                        var response = await web3.eth.getTransactionReceipt(tx.hash);
                        if (response != null) {
                            clearInterval(interval)
                            if (response.status === true) {
                                toast.dismiss();
                                toast.success('success ! your last transaction is success 👍');
                                setUpdater(new Date());
                                setEmloading(false);
                                setRefersh(new Date())
                            }
                            else if (response.status === false) {
                                toast.dismiss();
                                toast.error('error ! Your last transaction is failed.');
                                setUpdater(new Date());
                                setEmloading(false);
                            }
                            else {
                                toast.dismiss();
                                toast.error('error ! something went wrong.');
                                setUpdater(new Date());
                                setEmloading(false);
                                setRefersh(new Date())
                            }
                        }
                    }, 5000);
                }
                else {
                    toast.error('Please select Smart Chain Network !');
                    setEmloading(false);
                }
            }
            else {
                toast.error('Please Connect Wallet!');
                setEmloading(false);
            }

        }
        catch (err) {
            toast.dismiss();
            toast.error(err.reason);
            setEmloading(false);
        }
    }

    return (
        <div className="staking-overflow py-4 py-sm-5">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <a href="#sec" className="nav-link fs-21 active" >My Stake
                                </a>
                            </li>
                        </ul>
                        <div className="tab-content rounded-8 mt-4 mt-sm-5" id="pills-tabContent">
                            <div className="tab-pane fade show active" id="pills-my-stake" role="tabpanel"
                                aria-labelledby="pills-my-stake-tab">
                                <div className="row gx-4 gy-3 gy-sm-0 gx-sm-5 mb-4 mb-sm-5 ">
                                    <div className="col-sm-6">
                                        <div className="top-content d-flex flex-column gap-3 text-white justify-content-center align-items-center">
                                            <p>Total Staked</p>
                                            <div className="fs-28 fw-bold">{formatPrice(accStats.totalStake)}</div>
                                            <small>{stats.tokenSymbol ? stats.tokenSymbol : '-'}</small>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="top-content info d-flex flex-column gap-3 text-white justify-content-center align-items-center">
                                            <p>Total Earning</p>
                                            <div className="fs-28 fw-bold">{formatPrice(accStats.totalRewardEarn)}</div>
                                            <small>{stats.tokenSymbol ? stats.tokenSymbol : '-'}</small>
                                        </div>
                                    </div>
                                </div>

                                <div className="row" style={{ "overflowX": "auto" }}>
                                    <div className="col-12" style={{ "minWidth": "780px" }}>
                                        <div className="bg-green border border-green d-flex fs-21 justify-content-between my-stake-heading px-4 py-3 text-white">
                                            <div>Serial</div>
                                            <div>Staking Date</div>
                                            <div>Token Amount</div>
                                            <div>Staking End</div>
                                            <div>Action</div>
                                        </div>

                                        <div className="accordion" id="accordionStake">
                                            {orders.map((row, index) => {
                                                return (
                                                    row.claimed === 'false' ? (
                                                        <div className="accordion-item px-4 py-3" type="button" key={index}>
                                                            <div className="accordion-header d-flex align-items-center justify-content-between"
                                                                id="headingTwo">
                                                                <div>{parseInt(index + 1)}</div>
                                                                <div>{new Date(row.starttime * 1000).toString().substring(4, 25)}</div>
                                                                <div>{formatPrice(row.amount)}</div>
                                                                <div>{new Date(row.endtime * 1000).toString().substring(4, 25)}</div>
                                                                <button className="btn btn-outline-secondary py-1" data-bs-toggle="collapse"
                                                                    data-bs-target={`#heading-${index + 1}`} aria-expanded="false"
                                                                    aria-controls={`heading-${index + 1}`}>
                                                                    View <i className="fa-solid fa-angle-down"></i>
                                                                </button>
                                                            </div>
                                                            <div id={`heading-${index + 1}`} className="accordion-collapse collapse"
                                                                aria-labelledby="headingTwo" data-bs-parent="#accordionStake">
                                                                <div className="accordion-body px-0">
                                                                    <div className="accordion-header d-flex align-items-center justify-content-between">
                                                                        <div></div>
                                                                        <div className="rounded-8 py-3">
                                                                            <p>Total Staked</p>
                                                                            <div className="align-items-center d-flex fs-21 fw-bold gap-1 justify-content-center">
                                                                                {formatPrice(row.amount)}
                                                                                <small className="fs-12">{stats.tokenSymbol ? stats.tokenSymbol : '-'}</small>
                                                                            </div>
                                                                        </div>
                                                                        <div className="rounded-8 py-3">
                                                                            <p>Pending Rewards</p>
                                                                            <div className="align-items-center d-flex fs-21 fw-bold gap-1 justify-content-center">
                                                                                {formatPrice(rewardcal[index] ?  rewardcal[index].pendingReward : 'waiting..')}
                                                                                <small className="fs-12">{stats.tokenSymbol ? stats.tokenSymbol : '-'}</small>
                                                                            </div>
                                                                        </div>
                                                                        <div className="rounded-8 py-3">
                                                                            <p>Time Left</p>
                                                                            <div className="align-items-center d-flex fs-21 fw-bold gap-1 justify-content-center">
                                                                                { row.endtime > currentTime ? Math.round(Math.abs((row.endtime - currentTime) / 86400)) : 0}
                                                                                <small className="fs-12">days</small>
                                                                            </div>
                                                                        </div>
                                                                        <div></div>
                                                                    </div>
                                                                    <div className="mt-4 text-center">
                                                                        <Button
                                                                            disabled={(row.endtime <= currentTime) ? false : true}
                                                                            loading={wloading}
                                                                            variant="none"
                                                                            className="btn btn-secondary py-1 mx-3 my-3 text-center"
                                                                            onClick={(e) => handleWithdraw(e, row.orderId)}
                                                                        >
                                                                            Claim Now
                                                                        </Button>
                                                                        {/* <Button
                                                                            loading={croading}
                                                                            disabled={(row.pendingReward > 0) ? false : true}
                                                                            variant="none"
                                                                            className="btn btn-secondary text-white py-1 mx-3 my-3 text-center"
                                                                            onClick={(e) => handleClaimReward(e, row.orderId)}
                                                                        >
                                                                            Claim Now
                                                                        </Button> */}

                                                                        <Button
                                                                            loading={emloading}
                                                                            disabled={(row.endtime > currentTime) ? false : true}
                                                                            variant="none"
                                                                            className="btn btn-secondary py-1 mx-3 my-3 text-center"
                                                                            onClick={(e) => handleEmergencyWithdraw(e, row.orderId)}
                                                                        >
                                                                            Emergency Withdraw
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ) :
                                                        (
                                                            <div className="accordion-item px-4 py-3" data-bs-toggle="collapse"
                                                                data-bs-target={`#heading-${index + 1}`} aria-expanded="false" type="button" key={index}>
                                                                <div className="accordion-header d-flex align-items-center justify-content-between"
                                                                    id="headingTwo">
                                                                    <div>{parseInt(index + 1)}</div>
                                                                    <div>{new Date(row.starttime * 1000).toString().substring(4, 25)}</div>
                                                                    <div>{formatPrice(row.amount)}</div>
                                                                    <div>{new Date(row.endtime * 1000).toString().substring(4, 25)}</div>
                                                                    <button className="btn btn-outline-secondary py-1" data-bs-toggle="collapse"
                                                                        data-bs-target={`#heading-${index + 1}`} aria-expanded="false"
                                                                        aria-controls={`heading-${index + 1}`}>
                                                                        Claimed
                                                                    </button>

                                                                </div>
                                                                <div id={`heading-${index + 1}`} className="accordion-collapse collapse"
                                                                    aria-labelledby="headingTwo" data-bs-parent="#accordionStake">
                                                                    <div className="accordion-body px-0">
                                                                        <div className="accordion-header d-flex align-items-center justify-content-between">
                                                                            <div></div>
                                                                            <div className="rounded-8 py-3">
                                                                                <p>Total Staked</p>
                                                                                <div className="align-items-center d-flex fs-21 fw-bold gap-1 justify-content-center">
                                                                                    {formatPrice(row.amount)}
                                                                                    <small className="fs-12">{stats.tokenSymbol ? stats.tokenSymbol : '-'}</small>
                                                                                </div>
                                                                            </div>
                                                                            <div className="rounded-8 py-3">
                                                                                <p>Pending Rewards</p>
                                                                                <div className="align-items-center d-flex fs-21 fw-bold gap-1 justify-content-center">
                                                                                    {formatPrice(row.pendingReward)}
                                                                                    <small className="fs-12">{stats.tokenSymbol ? stats.tokenSymbol : '-'}</small>
                                                                                </div>
                                                                            </div>
                                                                            <div className="rounded-8 py-3">
                                                                                <p>Time Left</p>
                                                                                <div className="align-items-center d-flex fs-21 fw-bold gap-1 justify-content-center">
                                                                                    {Math.round(Math.abs((row.endtime - row.starttime) / 86400))}
                                                                                    <small className="fs-12">days</small>
                                                                                </div>
                                                                            </div>
                                                                            <div></div>
                                                                        </div>
                                                                        <div className="mt-4 text-center">
                                                                            {/* <button className="btn btn-secondary text-white py-1 mx-3 my-3 text-center disabled">
                                                                                Withdraw
                                                                            </button> */}
                                                                            <button className="btn btn-secondary py-1 mx-3 my-3 text-center disabled">
                                                                                Claim Now
                                                                            </button>
                                                                            <button className="btn btn-secondary py-1 mx-3 my-3 text-center disabled">
                                                                                Emergency Withdraw
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                )
                                            }
                                            )}




                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
