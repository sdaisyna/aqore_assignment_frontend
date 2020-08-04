import React, { Component } from 'react'
import AuthenticNavigation from './AuthenticNavigation'

import { Button, Row, Col, CardTitle, Container, CardImg, Card } from 'reactstrap'

import { Link } from 'react-router-dom'

import product from './assets/product.png'
import customer from './assets/customer.jpeg'
import sales from './assets/sales.png'


export default class Home extends Component {
    render() {
        return (
            <div>
                <AuthenticNavigation></AuthenticNavigation>

                <Container className="themed-container" fluid="md" style={{ marginTop: '100px' }} >
                    <Row>
                        <Col sm="2" xs="2"></Col>

                        <Col xs="6" sm="3">
                            <Card>
                                <Link to="/product" style={{ textDecoration: 'none' }}>

                                    <CardImg width="70%" height="70%" src={product} alt="product_image" />
                                    <CardTitle></CardTitle>
                                    <Button color="secondary" block>Product</Button>

                                </Link>
                            </Card>
                        </Col>


                        <Col xs="6" sm="3">
                            <Card>
                                <Link to="/customer" style={{ textDecoration: 'none' }}>

                                    <CardImg alt="customer_image" src={customer} width="70%" height="70%" />
                                    <CardTitle></CardTitle>
                                    <Button color="secondary" block>Customer</Button>

                                </Link>
                            </Card>
                        </Col>

                        <Col sm="3">
                            <Card style={{ height: '93%' }}>


                                <Link to="/transaction" style={{ textDecoration: 'none' }}>

                                    <CardImg alt="transaction_image" src={sales} width="70%" height="74%" />
                                    <CardTitle></CardTitle>
                                    <Button color="secondary" block>Transaction</Button>

                                </Link>
                            </Card>

                        </Col>


                    </Row>
                </Container>

            </div>
        )
    }
}
