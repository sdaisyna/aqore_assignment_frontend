import React, { Component } from 'react'
import axios from 'axios';

import { Container, Form, FormGroup, Label, Input, Button, FormText, Row, Col } from 'reactstrap'
import { Link, Redirect } from 'react-router-dom'

import Navigation from './Navigation';

export default class Signup extends Component {
    constructor(props) {
        super(props)

        this.state = {
            full_name: '',
            email: '',
            phone: '',
            username: '',
            password: '',

        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }


    handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3002/user/signup', {
            full_name: this.state.full_name,
            email: this.state.email,
            phone: this.state.phone,
            username: this.state.username,
            password: this.state.password

        })
            .then((response) => {
                console.log(response)
                localStorage.setItem('token', response.data.token);
                this.setState({
                    full_name: '',
                    email: '',
                    phone: '',
                    username: '',
                    password: ''
                })

            }).catch((err) => console.log(err));

    }



    render() {
        if (localStorage.getItem('token')) {
            return <Redirect to='/home' />
        }

        return (
            <div>

                <Navigation></Navigation>

                <Container>
                    <h2 style={{ margin: '20px 0px 0px 0px', textAlign: 'center' }}>Create user account</h2>
                    <hr></hr>
                    <Row>
                        <Col sm="12" md={{ size: 6, offset: 3 }}>

                            <Form>
                                <Row form>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="full_name">Full name</Label>
                                            <Input type="text" name="full_name" id="full_name" value={this.state.fullname} onChange={this.handleChange} />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="email">Email</Label>
                                            <Input type="text" name="email" id="email" value={this.state.email} onChange={this.handleChange} />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <FormGroup>
                                    <Label for="phone">Phone number</Label>
                                    <Input type="telephone" name="phone" id="phone" value={this.state.phone} onChange={this.handleChange} />
                                </FormGroup>

                                <Row form>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="username">Username</Label>
                                            <Input type="text" name="username" id="username" value={this.state.username} onChange={this.handleChange} />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="password">Password</Label>
                                            <Input type="password" name="password" id="password" value={this.state.password} onChange={this.handleChange} />
                                        </FormGroup>
                                    </Col>
                                </Row>


                                <Button color='primary' block onClick={this.handleSubmit}>Register</Button>
                                <Row style={{ margin: '15px 0px 0px 0px' }}>
                                    <Col sm={{ size: 'auto', offset: 4 }} >
                                        <FormText>Already a user? <Link to='/login'>Login here!</Link></FormText>
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
