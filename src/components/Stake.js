import React, { useEffect, useState } from 'react';
import { formatPrice } from '../helper/useContracts';
import { useCommonStats, useAccountStats } from '../hooks/useStats';
import { useWeb3React } from '@web3-react/core';
import Button from 'react-bootstrap-button-loader';
import { parseEther } from '@ethersproject/units';
import { toast } from 'react-toastify';
import { getContract } from '../helper/contractHelper';
import stakeAbi from '../json/tokenstake.json';
import tokenAbi from '../json/token.json';
import { contract } from '../helper/contract';
import { getWeb3 } from '../helper/connectors';
import sLogo from '../images/s-logo.png';
import { ethers } from 'ethers';



export default function Stake() {
    const { chainId, account, library } = useWeb3React();
    const [dayId, setDayId] = useState(0);
    const [updater, setUpdater] = useState(new Date());
    const stats = useCommonStats(updater);
    const accStats = useAccountStats(updater);
    const [btndisabled, setBtndisabled] = useState(false);
    const [amount, setAmount] = useState(0);
    const [error_msg, setError_msg] = useState('');
    const [ereturn, setEreturn] = useState(0);
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const [loading, setLoading] = useState(false);

    const handleChangeDay = (id) => {
        console.log(id);
        try{
            if(id < 0 &&  id > 3) return;
            setDayId(id >= 0 && id <= 3 ? id : 0);
        }catch(err){
            console.log(err.message);
        }
    }

    const handleChangeAmount = (e) => {
        setAmount(e.target.value);
        setBtndisabled(true);

        if (isNaN(e.target.value)) {
            setError_msg('Please enter valid amount');
            setBtndisabled(true);
        }

        else if (parseFloat(e.target.value) === 0 || e.target.value === '') {
            setError_msg('Amount must be greater than zero');
            setBtndisabled(true);
        }
        else if(parseFloat(e.target.value) > parseFloat(accStats.balance)){
            setError_msg('you don\'t have enough fund in wallet');
            setBtndisabled(true);
        }
        else {
            setError_msg('');
            setBtndisabled(false);
        }
        return;
    }

    const handleApprove = async (e) => {
        e.preventDefault();
        if (account) {
            if (chainId) {
                try {
                    setLoading(true);
                    let tokenStakingAddress = contract[chainId] ? contract[chainId].stakingAddress : contract['default'].stakingAddress;

                    let tokenContract = getContract(tokenAbi, stats.tokenAddress, library);
                    let amount = parseEther('100000000000000000000000').toString();
                    let tx = await tokenContract.approve(tokenStakingAddress, amount, { 'from': account });
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
                                setLoading(false);
                            }
                            else if (response.status === false) {
                                toast.dismiss();
                                toast.error('error ! Your last transaction is failed.');
                                setUpdater(new Date());
                                setLoading(false);
                            }
                            else {
                                toast.dismiss();
                                toast.error('error ! something went wrong.');
                                setUpdater(new Date());
                                setLoading(false);
                            }
                        }
                    }, 5000);

                }
                catch (err) {
                    toast.dismiss();
                    toast.error(err.reason ? err.reason : err.message )
                    setLoading(false);
                }
            }
            else {
                toast.error('Please select Smart Chain Network !');
                setLoading(false);
            }

        }
        else {
            toast.error('Please Connect Wallet!');
            setLoading(false);
        }
    }

    const handleStake = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (amount > 0 && !isNaN(e.target.value)) {
                if (account) {
                    if (chainId) {
                        if (parseFloat(accStats.balance) >= parseFloat(amount)) {
                            if (typeof dayId !== 'undefined' || dayId !== 0) {
                                let tokenStakingAddress = contract[chainId] ? contract[chainId].stakingAddress : contract['default'].stakingAddress;
                                let stakeContract = getContract(stakeAbi, tokenStakingAddress, library);
                                let stakeAmount = ethers.utils.parseUnits(amount.toString(),stats.tokenDecimal);

                                let tx = await stakeContract.deposit(stakeAmount.toString(), dayId, { 'from': account });
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
                                            setLoading(false);
                                        }
                                        else if (response.status === false) {
                                            toast.dismiss();
                                            toast.error('error ! Your last transaction is failed.');
                                            setUpdater(new Date());
                                            setLoading(false);
                                        }
                                        else {
                                            toast.dismiss();
                                            toast.error('error ! something went wrong.');
                                            setUpdater(new Date());
                                            setLoading(false);
                                        }
                                    }
                                }, 5000);
                            }
                            else {
                                toast.dismiss();
                                toast.error('Please select days !');
                                setLoading(false);
                            }
                        }
                        else {
                            toast.dismiss();
                            toast.error('you don\'t have enough balance !');
                            setLoading(false);
                        }

                    }
                    else {
                        toast.error('Please select Smart Chain Network !');
                        setLoading(false);
                    }
                }
                else {
                    toast.error('Please Connect Wallet!');
                    setLoading(false);
                }
            }
            else {
                toast.error('Please Enter Valid Amount !');
                setLoading(false);
            }
        }
        catch (err) {
            toast.error(err.reason ? err.reason : err.message )
            setLoading(false);
        }
    }

    const handleMaxButton = () =>{
        setAmount(parseFloat(accStats.balance) > 1 ? parseFloat(accStats.balance) - 1 : 0);
        setError_msg(parseFloat(accStats.balance) > 0 ? '' : 'Amount must be greater than zero' );
        setBtndisabled(false);
    }

    useEffect(() => {
        try{
            setEreturn((amount * stats.duration[dayId] * stats.bonous[dayId]) / (365*10000));
        }
        catch(err){
            console.log(err.message);
        }
        // eslint-disable-next-line
    }, [amount, dayId , stats])


    return (
        <div className="staking-overflow py-4 py-sm-5">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <a href="#sec" className="nav-link fs-21 active" >Stake {stats.tokenSymbol ? stats.tokenSymbol : '-' }
                                </a>
                            </li>
                        </ul>
                        <div className="tab-content rounded-8 mt-4 mt-sm-5" id="pills-tabContent">
                            {/* <!--STAKING-OVERFLOW--> */}
                            <div className="tab-pane fade show active" id="pills-staking-overflow" role="tabpanel"
                                aria-labelledby="pills-staking-overflow-tab">
                                <div className="row gx-4 gy-3 gy-sm-0 gx-sm-5 mb-4 mb-sm-5 ">
                                    <div className="col-sm-6">
                                        <div className="top-content d-flex flex-column gap-3 text-white justify-content-center align-items-center">
                                            <p>Total Token Staked</p>
                                            <div className="fs-28 fw-bold">{formatPrice(stats.totalStake)} {stats.tokenSymbol ? stats.tokenSymbol : '-' }</div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="top-content info d-flex flex-column gap-3 text-white justify-content-center align-items-center">
                                            <p>Average Staking Days</p>
                                            <div className="fs-28 fw-bold">120 Days</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-100">
                                    <div className="col-12">
                                        <div className="fs-28 mb-sm-5 mb-4">Staking Submission</div>
                                        <div className="d-flex staking-days flex-wrap flex-lg-nowrap">

                                            {stats.duration.length > 0 && stats.bonous.length > 0 &&
                                                stats.duration.map((rowdata,index)=>{
                                                    return (
                                                        <div key={index} onClick={(e) => { handleChangeDay(index) }} className={`${index === dayId ? " active" : ""} align-items-center w-100 d-flex flex-column item justify-content-center rounded-8 position-relative overflow-hidden`}>
                                                            <div className="fs-21">{Math.floor(rowdata)} Days</div>
                                                            <p>{stats.bonous[index] ? parseFloat(stats.bonous[index]/100) : 0}% APY</p>
                                                        </div>
    
                                                    )
                                                })
                                            }
                                            {/* {daysTab.links.map(link => {
                                                return (
                                                    <div key={link.id} onClick={(e) => { handleChangeDay(link.id) }} className={`${link.id === dayId ? " active" : ""} align-items-center w-100 d-flex flex-column item justify-content-center rounded-8 position-relative overflow-hidden`}>
                                                        <div className="fs-21">{link.content}</div>
                                                        <p>{link.apy}% APY</p>
                                                    </div>

                                                )
                                            })
                                            } */}
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="align-items-center d-flex flex-wrap flex-sm-nowrap w-100 gap-2 gap-sm-4">
                                            <div className="fs-21 flex-shrink-0">
                                                Amount to be staked:
                                            </div>
                                            <div className="input-staked d-flex w-100 border rounded-8 p-2">
                                                <input type="text" className="form-control border-0" value={amount} onChange={(e) => { handleChangeAmount(e) }} placeholder="Enter amount" />
                                                <button className='max-btn' type='button' onClick={()=>handleMaxButton()}>MAX</button>
                                                <img src={sLogo} className="img-fluid" alt="s-logo" style={{ "width": "51px" }} />
                                            </div>
                                        </div>
                                        <h5 className='fs-21 mt-2 fw-normal mb-4 mb-sm-5 ml-254 text-danger mt-3'><small>{error_msg}</small></h5>

                                        <div className="fs-21 mt-2 fw-normal mb-4 mb-sm-5 ml-254">Balance: {formatPrice(accStats.balance)} {stats.tokenSymbol ? stats.tokenSymbol : '-' }</div>

                                        <div className="fs-21 mt-2 fw-bold mb-3 mb-sm-4 ml-254 ml-0">Staking Summary</div>

                                        <div className="ml-254 ml-0">
                                            <div className="table-grid">
                                                <div>
                                                    <div>Duration</div>
                                                    <div>:</div>
                                                    <div>{stats.duration[dayId] ?  stats.duration[dayId] : 0} Days</div>
                                                </div>
                                                <div>
                                                    <div>APY</div>
                                                    <div>:</div>
                                                    <div>{stats.bonous[dayId] ?  stats.bonous[dayId] / 100 : 0}%</div>
                                                </div>
                                                <div>
                                                    <div>Stake Amount</div>
                                                    <div>:</div>
                                                    <div>{formatPrice(amount)} {stats.tokenSymbol ? stats.tokenSymbol : '-' }</div>
                                                </div>
                                                <div>
                                                    <div>Estimated Return</div>
                                                    <div>:</div>
                                                    <div>{formatPrice(ereturn)} {stats.tokenSymbol ? stats.tokenSymbol : '-' }</div>
                                                </div>
                                                <div>
                                                    <div>Start Date</div>
                                                    <div>:</div>
                                                    <div>{today.toUTCString()}</div>
                                                </div>
                                                <div>
                                                    <div>End Date</div>
                                                    <div>:</div>
                                                    <div>{new Date(parseInt(timeElapsed) + parseInt(stats.duration[dayId] * 86400 * 1000)).toUTCString()}</div>
                                                </div>
                                            </div>
                                            {parseFloat(accStats.isApprove) <= 1000000000 ? (
                                                <Button loading={loading} className="confirm-btn my-4 my-sm-5" onClick={(e) => handleApprove(e)}>APPROVE
                                                </Button>
                                            ) : (
                                                <Button disabled={btndisabled} loading={loading} className="confirm-btn my-4 my-sm-5" onClick={(e) => handleStake(e)}>STAKE NOW
                                                </Button>
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
