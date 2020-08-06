import React, { Component } from 'react'
import Navigation from './Navigation'

import { Redirect } from 'react-router-dom'

import transaction from './assets/transaction.jpg'
import { Container } from 'reactstrap'

export default class Welcome extends Component {
    render() {
        if (localStorage.getItem('token')) {
            return <Redirect to='/home' />
        }
        return (
            <div>
                <Navigation></Navigation>



                <Container className="d-flex justify-content-center">
                    <img src={transaction} height="40%" width="40%" alt="sales transaction"></img>
                </Container>
            </div>
        )
    }
}
