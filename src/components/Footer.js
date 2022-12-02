import React from "react";
import logoWhite from '../images/logo-white.png';
import facebookIcon from '../images/facebook.svg';
import youtubeIcon from '../images/youtube.svg';
import telegramIcon from '../images/telegram.svg';
import redditIcon from '../images/reddit.svg';
import linkedinIcon from '../images/linkedin.svg';
import instagramIcon from '../images/instagram.svg';

export default function Footer() {

    return (
        <React.Fragment>
            <footer>
                <div className="container">
                    <div className="row">
                        <div className="col-md-5 col-12">
                            <div className="row">
                                <div className="col-md-12">
                                    <a target="_blank" rel="noreferrer" href="https://bitzen.space/" className="logo d-block">
                                        <img src={logoWhite} className="w-100 lazy" alt="log0-white" />
                                    </a>
                                    <p>
                                        Bitzen is a funny way to discover the fascinating universe of the blockchain.Learn about Real-world projects and receive crypto-currencies as reward
                                    </p>
                                    <a href="https://bitzen.space/" target="_Blank" rel="noreferrer"  className="cs-btn" style={{"marginTop" : "20px"}}>
                                        <span className="btn-text">About US</span>
                                    </a>

                                </div>
                            </div>
                        </div>
                        <div className="col-md-7 col-12 mt-5 mt-md-0">
                            <div className="row">
                                <div className="col-12 col-sm-3">
                                    <div className="align-items-center align-items-sm-start d-flex flex-column gap-2 mb-5 mb-sm-4 ">
                                        <a href="https://bitzen.space/#what_is_ico" target="_Blank" rel="noreferrer" className="link fs-16 text-white">What Is Bitzen</a>
                                        <a href="https://blog.bitzen.space/"  target="_Blank" rel="noreferrer" className="link fs-16 text-white">Blog</a>
                                        <a href="https://bitzen.space/#our_technology" target="_Blank" rel="noreferrer" className="link fs-16 text-white">Product</a>
                                        <a href="https://bitzen.space/#roadmap" className="link fs-16 text-white">Roadmap</a>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-3">
                                    <div className="align-items-center align-items-sm-start d-flex flex-column gap-2 mb-5 mb-sm-4 ">
                                        <a href="https://bitzen.space/#team" target="_Blank" rel="noreferrer" className="link fs-16 text-white">Team</a>
                                        <a href="https://bitzen.space/#partner" target="_Blank" rel="noreferrer" className="link fs-16 text-white">Partners</a>
                                        <a href="https://bitzen.space/#contact" target="_Blank" rel="noreferrer" className="link fs-16 text-white">Contact Us</a>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6">
                                    <p>Folllow us:</p>
                                    <div className="social-icon gap-3">
                                        <a href="https://www.facebook.com/Bitzen.Space" target="_Blank" rel="noreferrer" className="caption-color">
                                            <img src={facebookIcon} alt="svg-facebook" />
                                        </a>
                                        <a href="https://twitter.com/BitzenSpace" target="_Blank" rel="noreferrer" className="caption-color">
                                            <img src={telegramIcon} alt="svg-twitter" />
                                        </a>
                                        <a href="https://www.youtube.com/c/BitzenSpace" target="_Blank" rel="noreferrer" className="caption-color">
                                            <img src={youtubeIcon} alt="svg-twitter" />
                                        </a>
                                        <a href="https://t.me/BitzenSpace" target="_Blank" rel="noreferrer" className="caption-color">
                                            <img src={telegramIcon} alt="svg-twitter" />
                                        </a>
                                        <a href="https://www.reddit.com/user/bitzenspace/" target="_Blank" rel="noreferrer" className="caption-color">
                                            <img src={redditIcon} alt="svg-twitter" />
                                        </a>
                                        <a href="https://www.linkedin.com/company/bitzenspace/" target="_Blank" rel="noreferrer" className="caption-color">
                                            <img src={linkedinIcon} alt="svg-twitter" />
                                        </a>
                                        <a href="https://www.instagram.com/bitzen.space/" target="_Blank" rel="noreferrer" className="caption-color">
                                            <img src={instagramIcon} alt="svg-twitter" />
                                        </a>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-sm-12 col-lg-12 text-center">
                            <span className="text-white" style={{ "fontSize": "15px" }}>Copyright © 2022. All rights reserved by Bitzen.Space</span>
                        </div>
                    </div>
                </div>
            </footer>
        </React.Fragment>
    )
}
