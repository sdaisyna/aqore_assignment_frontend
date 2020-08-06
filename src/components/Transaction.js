import React, { Component } from 'react'
import axios from 'axios'

import { Container, Table, Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import AuthenticNavigation from './AuthenticNavigation'

export default class Transaction extends Component {
    constructor(props) {
        super(props)

        this.state = {
            transactionId: '',
            transaction: []

        }
    }

    componentDidMount() {
        axios.get('http://localhost:3002/sales')
            .then((response) => {
                console.log(response.data)
                this.setState({
                    transaction: response.data
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
                                            <td>
                                                <Link to={`/updatetransaction/${transactions._id}`}>
                                                    <Button color="primary" >Update</Button>
                                                </Link>
                                            </td>
                                            <td>
                                                <Button color="danger" onClick={() => this.removeTransaction(transactions._id)}>Delete</Button>
                                            </td>
                                            <td>
                                                <Link to={`/generateInvoice/${transactions._id}`}>
                                                    <Button color="success" >Generate Invoice</Button>
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
