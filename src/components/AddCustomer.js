import React, { Component } from 'react'

// Axios is a promise-based HTTP client which
// makes easy to send asynchronous HTTP requests to REST 
// endpoints anad perform CRUD operation
import axios from 'axios'

import { Container, Row, Col, Form, Input, FormGroup, Label, Button } from 'reactstrap'
import { Link } from 'react-router-dom'

import AuthenticNavigation from './AuthenticNavigation'

export default class AddCustomer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            fullname: '',
            address: '',
            phone: '',
            email: '',
            config: {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            },
        }
    }


    addCustomer = (e) => {
        e.preventDefault();
        console.log(this.state);

        axios.post('http://localhost:3002/customer', {
            fullname: this.state.fullname,
            address: this.state.address,
            phone: this.state.phone,
            email: this.state.email

        }, this.state.config)
            .then((response) => {
                console.log(response.data);
                this.setState({
                    fullname: '',
                    address: '',
                    phone: '',
                    email: ''

                });

            }).catch((err) => console.log(err))

        this.props.history.push('/customer');
    }



    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }



    render() {
        return (
            <div style={{ height: '130vh' }}>
                <AuthenticNavigation></AuthenticNavigation>

                <Container >
                    <div className="clearfix">
                        <h2 className="float-left">Add Customer </h2>
                        <Link to={`/customer`} className="float-right mt-1">
                            <Button color="primary" > View customer</Button>
                        </Link>

                    </div>
                    <hr></hr>

                    <Row>
                        <Col sm="12" md={{ size: 6, offset: 3 }}>
                            <Form>
                                <FormGroup>
                                    <Label for="fullname">Full name</Label>
                                    <Input type="text" name="fullname" id="fullname" value={this.state.fullname} onChange={this.handleChange} />
                                </FormGroup>

                                <FormGroup>
                                    <Label for="address">Address</Label>
                                    <Input type="text" name="address" id="address" value={this.state.address} onChange={this.handleChange} />
                                </FormGroup>

                                <FormGroup>
                                    <Label for="phone">Phone number</Label>
                                    <Input type="telephone" name="phone" id="phone" value={this.state.phone} onChange={this.handleChange} />
                                </FormGroup>

                                <FormGroup>
                                    <Label for="email">Email address</Label>
                                    <Input type="email" name="email" id="email" value={this.state.email} onChange={this.handleChange} />
                                </FormGroup>


                                <Button color='primary' block onClick={this.addCustomer}>Add</Button>


                            </Form>
                        </Col>
                    </Row>

                </Container>

            </div >
        )
    }
}
