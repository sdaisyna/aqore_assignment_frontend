import React, { Component } from 'react'

import axios from 'axios'

import { Container, Row, Col, Form, Input, FormGroup, Label, Button } from 'reactstrap'
import { Link } from 'react-router-dom'

import AuthenticNavigation from './AuthenticNavigation'

export default class EditTransaction extends Component {
    constructor(props) {
        super(props)

        this.state = {
            transaction: {},
            products: [],
            customers: [],
            product_name:''


        }
    }

    handleChange(e) {
        this.setState({
            transaction: { ...this.state.transaction, [e.target.name]: e.target.value }
        })
    }

    componentDidMount() {

        axios.get('http://localhost:3002/sales/' + (this.props.match.params.id))
            .then((response) => {
                console.log(response.data)
                this.setState({
                    transaction: response.data
                })
            }).catch((err) => console.log(err.response));

        axios.get('http://localhost:3002/customer', this.config)
            .then((response) => {
                const data = response.data;
                this.setState({ customers: data });
                console.log(response.data);
            }).catch(error => console.log(error.response));

        axios.get('http://localhost:3002/product', this.config)
            .then((response) => {
                const data = response.data;
                this.setState({ products: data });
                console.log(response.data);
            }).catch(error => console.log(error.response));
    }

    updateSalesTrnsaction = (e) => {
        e.preventDefault();
        axios.put('http://localhost:3002/sales/' + (this.props.match.params.id), this.state.transaction)
            .then((response) => {
                console.log(response.data);
            }).catch((err) => console.log(err.response))
        this.props.history.push('/transaction')
    }

    render() {
        return (
            <div style={{ height: '130vh' }}>
                <AuthenticNavigation></AuthenticNavigation>

                <Container>
                    <div className="clearfix">
                        <h2 className="float-left">Add Product </h2>
                        <Link to={`/transaction`} className="float-right mt-1">
                            <Button color="primary" > View transaction</Button>
                        </Link>

                    </div>
                    <hr></hr>


                    <Row>
                        <Col sm="12" md={{ size: 6, offset: 3 }}>
                            <Form>

                                <FormGroup>
                                    <Label for="product">Product</Label>
                                    <Input type="select" name="product" id="product_available" value={this.state.transaction.product}
                                        onChange={(e) => this.handleChange(e)} >
                                        <option>Select Product </option>
                                        {
                                            this.state.products.map((product) => {
                                                return <option key={product._id} value={product._id}>{product.product_name}</option>
                                            })
                                        }
                                    </Input>


                                </FormGroup>


                                <FormGroup>
                                    <Label for="customer">Customer</Label>
                                    <Input type="select" name="customer" id="customer_available" value={this.state.transaction.fullname}
                                        onChange={(e) => this.handleChange(e)}>
                                        <option>Select Customer</option>
                                        {
                                            this.state.customers.map((customer) => {
                                                return <option key={customer._id} value={customer._id}>{customer.fullname}</option>
                                            })
                                        }
                                    </Input>


                                </FormGroup>

                                <FormGroup>
                                    <Label for="qty">Quantity</Label>
                                    <Input type="number" name="qty" id="qty" value={this.state.transaction.quantity} onChange={(e) => this.handleChange(e)} />
                                </FormGroup>

                                <FormGroup>
                                    <Label for="sale_date">Sales date</Label>
                                    <Input type="date" name="sale_date" id="sale_date" onChange={(e) => this.handleChange(e)} value={this.state.transaction.sales_date} />
                                </FormGroup>

                                <Button color='primary' block onClick={this.updateSalesTrnsaction}>Update</Button>


                            </Form>
                        </Col>
                    </Row>

                </Container>

            </div >
        )
    }
}
