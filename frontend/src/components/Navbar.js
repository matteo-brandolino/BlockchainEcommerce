import { useState } from 'react'
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBIcon } from 'mdbreact';

function Navbar( { account }) {
    const [collapse, setCollapse] = useState()
    const onClick = () => {
        setCollapse({
            collapse: !collapse,
        });
    }
    return (
        <MDBNavbar color="bg-primary" fixed="top" dark expand="md" scrolling transparent>
        <MDBNavbarBrand href="/">
            <MDBIcon fab icon="ethereum" />
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={onClick} />
        <MDBCollapse isOpen={collapse} navbar>
            <MDBNavbarNav left>
            <MDBNavItem>
                <MDBNavLink to="/">Home</MDBNavLink>
            </MDBNavItem>
            </MDBNavbarNav>
            <MDBNavbarNav right>
            <MDBNavItem>
                <MDBNavLink to="#"> {account} </MDBNavLink>
            </MDBNavItem>
            </MDBNavbarNav>
        </MDBCollapse>
        </MDBNavbar>
    )
}

export default Navbar
