import getBlockchain from './eth'
import {useState, useEffect} from 'react'

import { BrowserRouter as Router,Switch, Route } from "react-router-dom";

import Navbar from './components/Navbar';

import View from './components/View';
import Shop from './components/Shop';

function App() {

  const [paymentProcessor, setPaymentProcessor] = useState(undefined)
  const [dai, setDai] = useState(undefined)
  const [account, setAccount] = useState(undefined)

  useEffect(() => {
    const init = async () => {
      const { paymentProcessor, dai, account } = await getBlockchain()
      console.log(dai);
      setPaymentProcessor(paymentProcessor)
      setDai(dai)
      setAccount(account)
    }
    init()
  }, [])

  //metamask not found
  if(typeof window.ethereum === 'undefined') {
    return (
      <div className="container">
        <div className="col-sm-12">
          <h1>Blockchain Ecommerce App</h1>
          <p>You need to install the latest version of Metamask</p>
        </div>
      </div>
    )
  }

  return (
    <Router>
      <Switch>
          <Route path="/" exact >
            <Navbar account={account} />
            <View />
          </Route>
          <Route path="/shop" >
              <Navbar account={account} />
              <Shop paymentProcessor={paymentProcessor} dai={dai} />
          </Route>
      </Switch>
    </Router>
  );
}

export default App;
