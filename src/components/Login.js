import React, { Component } from 'react'
import axios from 'axios'

import {
    FormGroup, Input, FormText, Form,
    Button, Label, Row, Col, Container
} from 'reactstrap';



import { Redirect, Link } from 'react-router-dom';

import Navigation from './Navigation'

export default class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            isLoggedIn: false
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3002/user/login', this.state)
            .then((response) => {
                console.log(response.data)
                localStorage.setItem('token', response.data.token)
                this.setState({
                    username: '',
                    password: '',
                    isLoggedIn: true
                })
            }).catch((err) => console.log(err.response))
    }


    render() {
        if (this.state.isLoggedIn) {
            return <Redirect to='/home' />
        }

        return (
            <div>
                <Navigation></Navigation>

                <Container>
                    <h2 style={{ margin: '20px 0px 0px 0px', textAlign: 'center' }}>Login</h2>
                    <hr></hr>
                    <Row>
                        <Col sm="12" md={{ size: 6, offset: 3 }}>

                            <Form>

                                <FormGroup>
                                    <Label for="username">Username</Label>
                                    <Input type="text" name="username" id="username" value={this.state.username} onChange={this.handleChange} />
                                </FormGroup>

                                <FormGroup>
                                    <Label for="password">Password</Label>
                                    <Input type="password" name="password" id="password" value={this.state.password} onChange={this.handleChange} />
                                </FormGroup>



                                <Button color='primary' block onClick={this.handleSubmit}>Login</Button>
                                <Row style={{ margin: '15px 0px 0px 0px' }}>
                                    <Col sm={{ size: 'auto', offset: 4 }} >
                                        <FormText>Don't have an account? <Link to='/register'>Create here!</Link></FormText>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>


                </Container>

            </div>
        )
    }
}
