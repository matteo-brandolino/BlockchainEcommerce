import Store from "./Store";
import { MDBMask, MDBView } from 'mdbreact';
import bg from '../assets/bg-shop.jpg'

function Shop({ paymentProcessor, dai }) {
    return (
        <MDBView src={bg}>
          <MDBMask 
            style={{backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))", display:"block"}} 
            overlay="purple-light" 
            className="flex-center flex-column text-white text-center"
          >
            <Store paymentProcessor={paymentProcessor} dai={dai} />
          </MDBMask>
        </MDBView>
    )
}

export default Shop
