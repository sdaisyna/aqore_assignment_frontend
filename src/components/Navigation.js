import React, { Component } from 'react'
import {
    Navbar,
    NavbarBrand,
    Nav, Label, NavLink, Button
} from 'reactstrap';

export default class Navigation extends Component {
    render() {
        return (
            <Navbar expand='md' id="navbar" color="dark" >
                <NavbarBrand >
                    <Label style={{ color: '#fff' }}>Sales Transaction Application</Label>
                </NavbarBrand>

                <Nav className="mr-auto" navbar></Nav>
                <NavLink href="/login">
                    <Button color="success" style={{ padding: '7px 25px 7px 25px', fontSize: '18px' }}>Login</Button>
                </NavLink>

            </Navbar>
        )
    }
}
