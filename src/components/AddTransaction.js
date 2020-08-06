import React, { Component } from 'react'
import axios from 'axios'

import { Container, Row, Col, Form, Input, FormGroup, Label, Button} from 'reactstrap'
import { Link } from 'react-router-dom'

import AuthenticNavigation from './AuthenticNavigation'

export default class AddTrasaction extends Component {
    constructor(props) {
        super(props)

        this.state = {
            product_available: '',
            customer_available: '',
            qty: '',
            rate: '',
            sales_date: '',
            product: [],
            customer: [],

        }
    }

    componentDidMount() {
        axios.get('http://localhost:3002/customer', this.config)
            .then((response) => {
                const data = response.data;
                this.setState({ customer: data });
                console.log(response.data);
            }).catch(error => console.log(error.response));

        axios.get('http://localhost:3002/product', this.config)
            .then((response) => {
                const data = response.data;
                this.setState({ product: data });
                console.log(response.data);
            }).catch(error => console.log(error.response));

    }


    addtransaction = (e) => {
        e.preventDefault();
        console.log(this.state);

        axios.post('http://localhost:3002/sales', {

            product: this.state.product_available,
            customer: this.state.customer_available,
            quantity: this.state.qty,
            rate: this.state.rate,
            sales_date: this.state.sales_date
        }, this.state.config)
            .then((response) => {
                console.log(response.data);
                this.setState({
                    product: '',
                    customer: '',
                    quantity: '',
                    sales_date: new Date().toLocaleString()

                });
            }).catch((err) => console.log(err))

        this.props.history.push('/transaction');
    }



    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        var curr = new Date();
        curr.setDate(curr.getDate());
        var date = curr.toISOString().substr(0, 10);



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
                                    <Label for="lstProduct">Product</Label>
                                    <Input type="select" name="product_available" id="product_available" value={this.state.product_available}
                                        onChange={this.handleChange} >
                                        <option>Select Product</option>
                                        {
                                            this.state.product.map((product) => {
                                                return <option key={product._id} value={product._id}>{product.product_name}</option>
                                            })
                                        }
                                    </Input>


                                </FormGroup>


                                <FormGroup>
                                    <Label for="lstProduct">Customer</Label>
                                    <Input type="select" name="customer_available" id="customer_available" value={this.state.customer_available}
                                        onChange={this.handleChange}>
                                        <option>Select Customer</option>
                                        {
                                            this.state.customer.map((customer) => {
                                                return <option key={customer._id} value={customer._id}>{customer.fullname}</option>
                                            })
                                        }
                                    </Input>


                                </FormGroup>

                                <FormGroup>
                                    <Label for="qty">Quantity</Label>
                                    <Input type="number" name="qty" id="qty" value={this.state.qty} onChange={this.handleChange} />
                                </FormGroup>

                                <FormGroup>
                                    <Label for="sale_date">Sales date</Label>
                                    <Input type="date" name="sale_date" id="sale_date" value={this.state.sales_date} onChange={e => this.setState({ sales_date: e.target.value })} />
                                </FormGroup>

                                <Button color='primary' block onClick={this.addtransaction}>Add</Button>


                            </Form>
                        </Col>
                    </Row>

                </Container>

            </div >
        )
    }
}
