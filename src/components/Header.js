import React, { useMemo } from 'react'
import Connect from './Connect';
import logoBlack from '../images/logo.png';
// import logoMobile from '../images/logo-mobile.png';
import bscImage from '../images/binance-coin.svg';
import queryString from "query-string";
import sLogo from '../images/1s-logo.png';
import {
    Link,
    useParams,
    useLocation,
} from "react-router-dom";


export default function Header() {
    const router = useRouter();
    return (
        <header id="navbar">
            {/* <!--HEADER SECTION--> */}
            <div className="container-fluid">
                <div className="row d-flex justify-content-center">
                    <div className="col-12">
                        <nav className="navbar navbar-expand-lg navbar-light p-0">
                            <div className="container-fluid">
                                <button className="navbar-toggler bg-dark" type="button" data-bs-toggle="offcanvas"
                                    data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <a className="flex-shrink-0 navbar-brand p-0" target="_blank" rel="noreferrer" href="#sec">
                                    {/* <!--<img className="w-100 lazy" src="assets/images/logo-black.png" alt="">--> */}
                                    <img className="w-100 mob-none lazy" src={logoBlack} alt="logoblack" />
                                    <img className="mob-logo desk-none GFG" style={{ "height": "38px", "width": "38px" }} src={sLogo} alt="logoMobile" />
                                </a>

                                <div className="navbar-collapse d-none d-lg-block" id="navbarSupportedContent">
                                    {/* <!--MENU ITEMS--> */}
                                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 justify-content-center">
                                        <li className="nav-item">
                                            <a className="nav-link p-0" aria-current="page" target="_blank" rel="noreferrer"
                                                href="#sec">Home</a>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/staking" className={`nav-link p-0 ${router.pathname === "/" ? "active" : ""}`} >Stake</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/my-stake" className={`nav-link p-0 ${router.pathname === "/my-stake" ? "active" : ""}`}>My Stake</Link>
                                        </li>
                                        <li className="nav-item">
                                            <a className={`p-0 buy-btn`} target="_blank" rel="noreferrer" href="https://pancakeswap.finance/swap?outputCurrency=0x0224fb8a83a27091e5b4aa9cabb3d42edd20f355" >BUY TOKEN</a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="network on-mobile mr-3">
                                    <img src={bscImage} width="18" className="mx-2" alt="" />
                                    <span className="ml-2 hide-on-mobile">BSC MAINNET</span>
                                </div>
                                <Connect />
                            </div>
                        </nav>

                        {/* <!--MOBILE MENU--> */}
                        <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                            <div className="offcanvas-header">
                                <a className="navbar-brand p-0" href="#sec" target="_blank" rel="noreferrer">
                                    <img src={logoBlack} style={{ "height": "35px", "margin-top": "7%" }} className="lazy mobile-logo" alt="logo-blkc" />
                                </a>
                                <button type="button" className="btn-close text-reset bg-dark" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                            </div>
                            <div className="offcanvas-body">
                                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <a className="nav-link p-0" aria-current="page" target="_blank" rel="noreferrer" href="#sec">Home</a>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/staking" className={`nav-link p-0 ${router.pathname === "/" ? "active" : ""}`} >Stake</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/my-stake" className={`nav-link p-0 ${router.pathname === "/my-stake" ? "active" : ""}`}>My Stake</Link>
                                    </li>
                                    <li className="nav-item">
                                        <a target="_blank" rel="noreferrer" href="https://pancakeswap.finance/swap?outputCurrency=0x0224fb8a83a27091e5b4aa9cabb3d42edd20f355" className={`nav-link p-0`}>BUY TOKEN</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}


export function useRouter() {
    const params = useParams();
    const location = useLocation();

    // Return our custom router object
    // Memoize so that a new object is only returned if something changes
    return useMemo(() => {
        return {
            // For convenience add push(), replace(), pathname at top level
            push: location.push,
            replace: location.replace,
            pathname: location.pathname,
            // Merge params and parsed query string into single "query" object
            // so that they can be used interchangeably.
            // Example: /:topic?sort=popular -> { topic: "react", sort: "popular" }
            query: {
                ...queryString.parse(location.search), // Convert string to object
                ...params,
            },
            // Include match, location, history objects so we have
            // access to extra React Router functionality if needed.
            location,

        };
    }, [params, location]);
}

