import React from "react";
import logoWhite from '../images/whitelogo.png';
import youtubeIcon from '../images/youtube.svg';
import telegramIcon from '../images/telegram.svg';
import twitterIcon from '../images/twitter.svg';
import robo from '../images/robo.png';

export default function Footer() {

    return (
        <React.Fragment>
            <footer>
                <div className="container">
                    <div className="row">
                        <div className="col-md-2 col-12">
                            <img src={robo} style={{ "height": "80%" }} alt="robo" />
                        </div>
                        <div className="col-md-5 col-12">
                            <div className="row">
                                <div className="col-md-12">
                                    <a target="_blank" rel="noreferrer" href="#sec" className="logo d-block">
                                        <img src={logoWhite} className="w-100 lazy" alt="log0-white" />
                                    </a>
                                    <p>
                                        Dex Market is a funny way to discover the fascinating universe of the blockchain.Learn about Real-world projects and receive crypto-currencies as reward
                                    </p>
                                    <a href="https://pancakeswap.finance/swap?outputCurrency=0x0224fb8a83a27091e5b4aa9cabb3d42edd20f355" target="_Blank" rel="noreferrer"  className="cs-btn" style={{"marginTop" : "20px"}}>
                                        <span className="btn-text">BUY TOKEN</span>
                                    </a>

                                </div>
                            </div>
                        </div>
                        <div className="col-md-5 col-12 mt-5 mt-md-0">
                            <div className="row">
                                <div className="col-12 col-sm-3">
                                    <div className="align-items-center align-items-sm-start d-flex flex-column gap-2 mb-5 mb-sm-4 ">
                                        <a href="#sec" target="_Blank" rel="noreferrer" className="link fs-16 text-white">HOME</a>
                                        <a href="#sec"  target="_Blank" rel="noreferrer" className="link fs-16 text-white">FEATURE</a>
                                        <a href="#sec" target="_Blank" rel="noreferrer" className="link fs-16 text-white">ROADMAP</a>
                                        <a href="#sec" className="link fs-16 text-white">TOKENOMICS</a>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-3">
                                    <div className="align-items-center align-items-sm-start d-flex flex-column gap-2 mb-5 mb-sm-4 ">
                                        <a href="#sec" target="_Blank" rel="noreferrer" className="link fs-16 text-white">WHITEPAPER</a>
                                        <a href="#sec" target="_Blank" rel="noreferrer" className="link fs-16 text-white">TEAM</a>
                                        <a href="#sec" target="_Blank" rel="noreferrer" className="link fs-16 text-white">PARTNERS</a>
                                        <a href="https://pancakeswap.finance/swap?outputCurrency=0x0224fb8a83a27091e5b4aa9cabb3d42edd20f355" target="_Blank" rel="noreferrer" className="link fs-16 text-white">BUY TOKEN</a>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6">
                                    <p>Folllow us:</p>
                                    <div className="social-icon gap-3">
                                        <a href="https://twitter.com/dexmarketlive" target="_Blank" rel="noreferrer" className="caption-color">
                                            <img src={twitterIcon} alt="svg-twitter" />
                                        </a>
                                        <a href="https://www.youtube.com/channel/UCfZBKmF4KY2Zh_nWVWyckuA" target="_Blank" rel="noreferrer" className="caption-color">
                                            <img src={youtubeIcon} alt="svg-twitter" />
                                        </a>
                                        <a href="https://t.me/dexlive" target="_Blank" rel="noreferrer" className="caption-color">
                                            <img src={telegramIcon} alt="svg-twitter" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-sm-12 col-lg-12 text-center">
                            <span className="text-white" style={{ "fontSize": "15px" }}>Copyright © 2022. All rights reserved by Dex Market</span>
                        </div>
                    </div>
                </div>
            </footer>
        </React.Fragment>
    )
}
