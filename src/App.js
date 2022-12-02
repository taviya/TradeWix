import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Stake from './components/Stake';
import MyStake from './components/MyStake';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from "./components/ScrollToTop";



function App() {
  return (
    <div className="App">
      <Router>
        <ScrollToTop />
        <ToastContainer pauseOnFocusLoss={false} />
        <Header />
        <Switch>
          <Route exact path="/">
            <Redirect to="/staking" />
          </Route>
          <Route exact path="/staking">
            <Stake />
          </Route>
          <Route exact path="/my-stake">
            <MyStake />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
