import { MDBMask, MDBView, MDBBtn } from 'mdbreact';
import bg from '../assets/bg.jpg'

function View() {
    return (
        <MDBView src={bg}>
          <MDBMask 
            style={{backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))"}} 
            overlay="purple-light" 
            className="flex-center flex-column text-white text-center"
          >
            <h1>Welcome to Crypto Ecommerce</h1>
            <p>You can buy in Dai!</p>
            <MDBBtn color="dark mt-5" href="/shop">Go to the shop</MDBBtn>
          </MDBMask>
        </MDBView>
    )
}

export default View
