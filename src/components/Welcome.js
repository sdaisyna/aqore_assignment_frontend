import React, { Component } from 'react'
import Navigation from './Navigation'

import {Redirect} from 'react-router-dom'

export default class Welcome extends Component {
    render() {
        if (localStorage.getItem('token')) {
            return <Redirect to='/home' />
        }
        return (
            <div>
                <Navigation></Navigation>

            </div>
        )
    }
}
