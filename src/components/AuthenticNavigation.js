import React, { Component } from 'react'
import {
    Navbar,
    NavbarBrand,
    Nav, Label, NavLink, Button
} from 'reactstrap';

export default class AuthenticNavigation extends Component {

    handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        this.props.history.push('/')
        
    }
    render() {
        return (
            <div>
            <Navbar expand='md' id="navbar" color="dark" >
                <NavbarBrand href="/home">
                    <Label style={{ color: '#fff' }}>Sales Transaction Application</Label>
                </NavbarBrand>

                <Nav className="mr-auto" navbar></Nav>
                <NavLink>
                    <Button color="success" style={{ padding: '7px 25px 7px 25px', fontSize: '18px' }} onClick={this.handleLogout}>Logout</Button>
                </NavLink>

            </Navbar>
                
            </div>
        )
    }
}
