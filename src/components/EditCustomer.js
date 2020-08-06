import React, { Component } from 'react'
import axios from 'axios'
import { Container, Row, Col, Form, Input, FormGroup, Label, Button } from 'reactstrap'
import { Link } from 'react-router-dom'

import AuthenticNavigation from './AuthenticNavigation'

export default class EditCustomer extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             customer:{},
             config: {
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
            },
        }
    }

    handleChange = (e) => {
        this.setState({
            customer: { ...this.state.customer, [e.target.name]: e.target.value },

        })
    }

    componentDidMount() {
        axios.get('http://localhost:3002/customer/' + (this.props.match.params.id), this.state.config)
            .then((response) => {
                console.log(response.data)
                this.setState({
                    customer: response.data
                })
            }).catch((err) => console.log(err.response));
    }

    editCustomer = (e) => {
        e.preventDefault();
        axios.put('http://localhost:3002/customer/' + (this.props.match.params.id), this.state.customer, this.state.config)
            .then((response) => {
                console.log(response.data);
            }).catch((err) => console.log(err.response))
        this.props.history.push('/customer')
    }
    
    render() {
        return (
            <div style={{ height: '130vh' }}>
                <AuthenticNavigation></AuthenticNavigation>

                <Container >
                <div className="clearfix">
                        <h2 className="float-left">Update Customer </h2>
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
                                    <Input type="text" name="fullname" id="fullname" value={this.state.customer.fullname} onChange={(e) => this.handleChange(e)} />
                                </FormGroup>

                                <FormGroup>
                                    <Label for="address">Address</Label>
                                    <Input type="text" name="address" id="address" value={this.state.customer.address} onChange={(e) => this.handleChange(e)} />
                                </FormGroup>

                                <FormGroup>
                                    <Label for="phone">Phone number</Label>
                                    <Input type="telephone" name="phone" id="phone" value={this.state.customer.phone} onChange={(e) => this.handleChange(e)} />
                                </FormGroup>

                                <FormGroup>
                                    <Label for="email">Email address</Label>
                                    <Input type="email" name="email" id="email" value={this.state.customer.email} onChange={(e) => this.handleChange(e)} />
                                </FormGroup>


                                <Button color='primary' block onClick={this.editCustomer}>Update</Button>


                            </Form>
                        </Col>
                    </Row>

                </Container>

            </div >
        )
    }
}
