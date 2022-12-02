import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Stake from './components/Stake';
import MyStake from './components/MyStake';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from "./components/ScrollToTop";
import Privacypolicy from "./components/Privacypolicy";



function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <ScrollToTop />
          <ToastContainer pauseOnFocusLoss={false} />
          <Header />
          <Routes>
            <Route exact path="/" element={<Stake />} />
            <Route exact path="/my-stake" element={<MyStake />} />
            <Route exact path="/privacy-policy" element={<Privacypolicy />} />
          </Routes>
          <Footer />
        </BrowserRouter>
    </div>
  );
}

export default App;
