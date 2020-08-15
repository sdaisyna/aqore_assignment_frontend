import React, { Component } from 'react'
import {
    Navbar,
    NavbarBrand,
    Nav, Label, NavItem, NavLink, Button
} from 'reactstrap';

export default class AuthenticNavigation extends Component {

    handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        alert("Logout Successfull");
        window.location.reload(false);

    }

    render() {
        return (
            <div>
                <Navbar expand='md' id="navbar" color="dark" >
                    <NavbarBrand href="/home">
                        <Label style={{ color: '#fff', fontSize: '20px' }}>Sales Transaction Application</Label>
                    </NavbarBrand>

                    <Nav className="mr-auto" navbar>
                        <NavItem className="ml-4">
                            <NavLink href="/customer" style={{ color: '#fff' }}>Customer</NavLink>
                        </NavItem>

                        <NavItem className="ml-4">
                            <NavLink href="/product" style={{ color: '#fff' }}>Product</NavLink>
                        </NavItem>

                        <NavItem className="ml-4">
                            <NavLink href="/transaction" style={{ color: '#fff' }}>Transaction</NavLink>
                        </NavItem>

                    </Nav>
                    <NavLink>
                        <Button color="success" style={{ padding: '7px 25px 7px 25px', fontSize: '18px' }} onClick={this.handleLogout}>Logout</Button>
                    </NavLink>

                </Navbar>

            </div>
        )
    }
}
