import React, { Component } from 'react'
import axios from 'axios'

import { Container, Table, Button, Modal, ModalBody, ModalHeader, ModalFooter, Label } from 'reactstrap'
import { Link } from 'react-router-dom'
import AuthenticNavigation from './AuthenticNavigation'

export default class Transaction extends Component {
    constructor(props) {
        super(props)

        this.state = {
            transactionId: '',
            transaction: [],
            transactionById: {},
            transId: [],

            modal: false

        }
        this.toggle = this.toggle.bind(this);

    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        })
    }

    handleSubmit = (e) => {
        this.props.toggle();
    }


    componentDidMount() {
        axios.get('http://localhost:3002/sales')
            .then((response) => {
                console.log("Transcation", response.data)
                this.setState({
                    transaction: response.data
                })
            })
            .catch((err) => console.log(err.response));

        // axios.get('http://localhost:3002/sales/' + (this.props.match.params.id))
        //     .then((response) => {
        //         console.log(response.data)

        //         this.setState({
        //             transactionById: response.data,
        //             modal: !this.state.modal
        //         })
        //     })
        //     .catch((err) => console.log(err.response));
    }

    genTrans = (transId) => {
        axios.get(`http://localhost:3002/sales/${transId}`)
            .then((response) => {
                console.log("Transcatin by ID", response.data)

                this.setState({
                    transactionById: response.data,
                    modal: !this.state.modal
                })
            })
            .catch((err) => console.log(err.response));
    }

    removeTransaction = (transactionId) => {
        axios.delete(`http://localhost:3002/sales/${transactionId}`)
            .then((response) => {
                const filteredSales = this.state.transaction.filter((transaction) => {
                    return transaction._id !== transactionId
                })
                this.setState({

                    transaction: filteredSales
                })
            }).catch((err) => console.log(err.response));
    }

    render() {
        var curr = new Date();
        curr.setDate(curr.getDate());
        var date = curr.toISOString().substr(0, 10);

        if (this.state.transactionById) {
            const { customer, product } = this.state.transactionById;
            console.log('customer', customer)
        }
        return (
            <div>
                <AuthenticNavigation></AuthenticNavigation>

                <Container>
                    <div className="clearfix">
                        <h2 className="float-left">All Transaction </h2>
                        <Link to={`/addtransaction`} className="float-right mt-1">
                            <Button color="primary" > Add transaction</Button>
                        </Link>

                        <hr></hr>

                        <Container>
                            <Table hover>
                                <thead>
                                    <tr>
                                        <th>S.N</th>
                                        <th>Customer name</th>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                        <th>Edit</th>
                                        <th>Remove</th>
                                        <th>Generate</th>

                                    </tr>
                                </thead>
                                <tbody>

                                    {this.state.transaction.map(transactions => {
                                        return (<tr>
                                            <td key={transactions._id}></td>
                                            <td>{transactions.customer.fullname}</td>
                                            <td>{transactions.product.product_name}</td>
                                            <td>{transactions.product.price}</td>
                                            <td>{transactions.quantity}</td>
                                            <td>{transactions.product.price * transactions.quantity}</td>
                                            <td>
                                                <Link to={`/updatetransaction/${transactions._id}`}>
                                                    <Button color="primary" >Update</Button>
                                                </Link>
                                            </td>
                                            <td>
                                                <Button color="danger" onClick={() => this.removeTransaction(transactions._id)}>Delete</Button>
                                            </td>
                                            <td>
                                                <Link >
                                                    <Button color="success" onClick={() => this.genTrans(transactions._id)}>Generate Invoice</Button>{' '}
                                                    <Modal isOpen={this.state.modal}>
                                                        <ModalHeader toggle={this.toggle}>Sales Transaction Invoice</ModalHeader>
                                                        <ModalBody>

                                                            <Label className="font-weight-bold">Date : </Label>
                                                            <Label>{date}</Label>
                                                            <br></br>
                                                            <Label className="font-weight-bold">Name: </Label>
                                                            <Label>{this.state.modal && this.state.transactionById.customer.fullname} </Label>
                                                            <br></br>

                                                            <div>
                                                                <Table>
                                                                    <thead>
                                                                        <tr>
                                                                            <th>S.N</th>
                                                                            <th>Product</th>
                                                                            <th>Price</th>
                                                                            <th>Quantity</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td>1</td>
                                                                            <td>{this.state.modal && this.state.transactionById.product.product_name}</td>
                                                                            <td>{this.state.modal && this.state.transactionById.product.price}</td>
                                                                            <td>{this.state.transactionById.quantity}</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </Table>

                                                                <hr></hr>



                                                                <div className="float-right mr-4">
                                                                    <Label className="font-weight-bold">Total: Rs. {this.state.modal && this.state.transactionById.product.price * this.state.modal && this.state.transactionById.product.price}</Label>
                                                                </div>
                                                            </div>
                                                        </ModalBody>
                                                        <ModalFooter>

                                                        </ModalFooter>
                                                    </Modal>
                                                </Link>
                                            </td>

                                        </tr>)
                                    })
                                    }



                                </tbody>
                            </Table>
                        </Container>

                    </div>


                </Container>

            </div>
        )
    }
}
