import React, { Component } from 'react'
import { Button, Container, CardColumns, Card, CardImg, CardBody, CardTitle, Label } from 'reactstrap'
import axios from 'axios'

import { Link } from 'react-router-dom'
import AuthenticNavigation from './AuthenticNavigation'



export default class Customer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            customer_id: '',
            fullname: '',
            address: '',
            phone: '',
            email: '',
            customers: []

        }
    }

    componentDidMount() {
        axios.get('http://localhost:3002/customer', this.config)
            .then((response) => {
                const data = response.data;
                this.setState({ customers: data });
                console.log("data fetch");
            }).catch(error => console.log(error.response));

    }


    deleteCustomer = (customer_id) => {
        axios.delete(`http://localhost:3002/customer/${customer_id}`, this.state.config)
            .then(response => {
                const filteredCustomer = this.state.customers.filter((i) => {
                    return i._id !== customer_id
                })
                this.setState({
                    customers: filteredCustomer
                })
            }).catch((err) => console.log.response)
    }


    render() {

        return (
            <div>
                <AuthenticNavigation></AuthenticNavigation>

                <Container>

                    <div className="clearfix">
                        <h2 className="float-left">All Customers </h2>
                        <Link to={`/addcustomer`} className="float-right mt-1">
                            <Button color="primary" > Add customer</Button>
                        </Link>

                    </div>

                    <hr></hr>

                    <CardColumns>
                        {this.state.customers.map((allCustomer =>
                            <Card>

                                <CardBody className="text-justify">
                                    <CardTitle className="cardtitle">
                                        <Label className="font-weight-bold">Full name </Label>
                                        : {allCustomer.fullname}
                                    </CardTitle>

                                    <CardTitle className="cardtitle">
                                        <Label className="font-weight-bold">Address  </Label>
                                        : {allCustomer.address}
                                    </CardTitle>

                                    <CardTitle className="cardtitle">
                                        <Label className="font-weight-bold">Phone number  </Label>
                                        : {allCustomer.phone}
                                    </CardTitle>

                                    <CardTitle className="cardtitle">
                                        <Label className="font-weight-bold">Email  </Label>
                                        : {allCustomer.email}
                                    </CardTitle>
                                    <hr></hr>

                                    <div className="clearfix">
                                    <Link to={`/updateCustomer/${allCustomer._id}`} className="float-left ml-5">
                                        <Button color="primary" > Update</Button>
                                    </Link>

                                    <Button color="danger" onClick={() => this.deleteCustomer(allCustomer._id)} className="float-right mr-5">Delete</Button>
                                    </div>
                                </CardBody>
                            </Card>
                        ))}

                    </CardColumns>

                </Container>


            </div>
        )
    }
}
