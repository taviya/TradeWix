import React from "react";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import {
    NoEthereumProviderError
} from "@web3-react/injected-connector";

import { useEffect, useState } from "react";
import { injected, walletconnect, coinbaseWallet } from "../helper/connectors";
// import Modal from 'react-bootstrap/Modal';
import { trimAddress } from '../helper/constant';
import useEagerConnect from '../helper/useWeb3';
import wrongNetwork from '../images/wrong-network.svg';
import metaMask from '../images/meta-mask.png';
import wallet from '../images/wallet.png';
import coinbase from '../images/coinbase.png';
import trust from '../images/trust.png';
// import 'antd/dist/antd.css';
import { Modal, Col, Row, Card , Menu , Dropdown , Button } from 'antd';
import { useAccountStats } from "../hooks/useStats";
import { formatPrice } from "../helper/useContracts";
import { supportNetwork } from "../helper/network";
import { useCommonStats } from "../hooks/useStats";




export const Connect = function () {
    const context = useWeb3React();
    const { connector, account, activate, deactivate, active, error } = context;
    // const [show, setShow] = useState(false);
    // const [networkshow, setNetworkshow] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    let accStats = useAccountStats(1); 
    let stats = useCommonStats(1); 
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    // handle logic to recognize the connector currently being activated
    const [activatingConnector, setActivatingConnector] = useState();
    useEagerConnect();
    useEffect(() => {
        if (activatingConnector && activatingConnector === connector) {
            setActivatingConnector(undefined);
        }
    }, [activatingConnector, connector]);


    function getErrorMessage(error) {

        if (error instanceof NoEthereumProviderError) {
            const dappUrl = window.location.href; // TODO enter your dapp URL. 
            let metamaskAppDeepLink = "https://metamask.app.link/dapp/" + dappUrl;
            window.open(metamaskAppDeepLink)
        }
        if (error instanceof UnsupportedChainIdError) {
            return <span className="btn-text" onClick={(e) => switchNetwork(supportNetwork['default'].chainId)}>
                <img src={wrongNetwork} alt="wrong-network" height="17px" width="17px" className="mx-2" />Wrong Network</span>;
        }

        deactivate(injected);
    }

    const activating = (connection) => connection === activatingConnector;
    const connected = (connection) => connection === connector;

    const switchNetwork = (networkid=56) => {
        try {
            // @ts-ignore
            window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: `0x${networkid.toString(16)}` }]
            });
        } catch (e) {
            console.error(e);
        }
    }

    const menu = (
        <Menu
            items={[
                {
                    key: '1',
                    label: (
                        <span>
                            {formatPrice(accStats.balance)} {stats.tokenSymbol ? stats.tokenSymbol : '-'}
                        </span>
                    ),
                },
                {
                    key: '2',
                    label: (
                        <a href="#sec" onClick={() => {
                            setActivatingConnector();
                            deactivate(injected);
                            deactivate(walletconnect);
                            deactivate(coinbaseWallet);

                        }} >
                            logout
                        </a>
                    ),
                }
            ]}
        />
    );

    return (
        <React.Fragment>
            {
                error &&
                <button type="button" className="cs-btn" onClick={() => {
                    setActivatingConnector();
                }}>
                    <span className="btn-text">{getErrorMessage(error)}</span>
                </button>
            }
            {!error &&
                <>


                    {active && (connected(injected) || connected(walletconnect) || connected(coinbaseWallet)) &&
                        <Dropdown overlay={menu} placement="bottom" arrow>
                            <Button type="primary" shape="round" size="large"  className="cs-btn" >{account && trimAddress(account)}</Button>
                        </Dropdown>
                        // <button type="button" className="cs-btn" >

                        //     <span className="btn-text" onClick={() => {
                        //         setActivatingConnector();
                        //         deactivate(injected);
                        //         deactivate(walletconnect);
                        //         deactivate(coinbaseWallet);

                        //     }} >{account && trimAddress(account)}</span>

                        // </button>


                    }
                    {!active && (!connected(injected) || !connected(walletconnect) || !connected(coinbaseWallet)) &&
                        <button type="button" className="cs-btn" onClick={(e) => showModal(e)}>
                            {/* <img src={walletarrow} width="14px" alt="wallet connect" className='mx-2' /> */}
                            {(activating(injected) || activating(walletconnect) || activating(coinbaseWallet)) && <span className="btn-text">Connecting...</span>}
                            {(!activating(injected) || !activating(walletconnect) || !activating(coinbaseWallet)) && <span className="btn-text">Connect</span>}
                        </button>
                    }
                </>
            }

            <Modal title="Connect to a wallet" visible={isModalVisible} onCancel={handleCancel} footer={[]}>
                <div className="site-card-wrapper">
                    <Row gutter={16}>
                        <Col span={12}>
                            <Card bordered={false}>
                                <div class="ProviderItem_item__2uvZt" onClick={() => {
                                    activate(injected);
                                    setIsModalVisible(false);
                                }}>
                                    <img src={metaMask} alt="metamask" />
                                    <div class="ProviderItem_title__3NYon">Metamask</div>
                                </div>
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card bordered={false}>
                                <div class="ProviderItem_item__2uvZt" onClick={() => {
                                    activate(walletconnect);
                                    setIsModalVisible(false);
                                }}>
                                    <img src={wallet} alt="metamask" />
                                    <div class="ProviderItem_title__3NYon">walletconnect</div>
                                </div>
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card bordered={false}>
                                <div class="ProviderItem_item__2uvZt" onClick={() => {
                                    activate(coinbaseWallet);
                                    setIsModalVisible(false);
                                }}>
                                    <img src={coinbase} alt="metamask" />
                                    <div class="ProviderItem_title__3NYon">coinbase wallet</div>
                                </div>
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card bordered={false}>
                                <div class="ProviderItem_item__2uvZt" onClick={() => {
                                    activate(injected);
                                    setIsModalVisible(false);
                                }}>
                                    <img src={trust} alt="metamask" />
                                    <div class="ProviderItem_title__3NYon">trustwallet</div>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Modal>
        </React.Fragment>
    );
};




export default Connect;