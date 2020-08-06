import React, { Component } from 'react'
import { Button, Container, CardColumns, Card, CardImg, CardBody, CardTitle, Label } from 'reactstrap'
import axios from 'axios'

import { Link } from 'react-router-dom'
import AuthenticNavigation from './AuthenticNavigation'


export default class Product extends Component {
    constructor(props) {
        super(props)

        this.state = {
            product_id: '',
            product_name: '',
            product_details: '',
            price: '',
            image: '',
            product: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3002/product', this.config)
            .then((response) => {
                const data = response.data;
                this.setState({ product: data });
                console.log("data fetch");
            }).catch(error => console.log(error.response));

    }

    deleteProduct = (product_id) => {
        axios.delete(`http://localhost:3002/product/${product_id}`, this.state.config)
            .then(response => {
                const filteredProduct = this.state.product.filter((i) => {
                    return i._id !== product_id
                })
                this.setState({
                    product: filteredProduct
                })
            }).catch((err) => console.log.response)
    }



    render() {
        return (
            <div>
                <AuthenticNavigation></AuthenticNavigation>

                <Container>
                    <div className="clearfix">
                        <h2 className="float-left">All Products </h2>
                        <Link to={`/addproduct`} className="float-right mt-1">
                            <Button color="primary" > Add product</Button>
                        </Link>

                        <hr></hr>

                        <CardColumns className="mt-5">
                            {this.state.product.map((allProducts =>
                                <Card>
                                    <CardImg className="cardimg" top width="50%" height="50%" src={`http://localhost:3002/uploads/${allProducts.image}`} alt="Card_image" />
                                    <CardBody>
                                        <CardTitle className="cardtitle">
                                            <Label className="font-weight-bold">Product name  </Label>
                                            : {allProducts.product_name}
                                        </CardTitle>

                                        <CardTitle className="cardtitle">
                                            <Label className="font-weight-bold">Product details  </Label>
                                            : {allProducts.product_details}
                                        </CardTitle>
                                        <CardTitle className="cardtitle">
                                            <Label className="font-weight-bold">Product price  :  </Label>
                                            Rs: {allProducts.price}</CardTitle>
                                        <hr></hr>

                                        <div className="clearfix">
                                            <Link to={`/updateProduct/${allProducts._id}`} className="float-left ml-5">
                                                <Button color="primary" > Update</Button>
                                            </Link>

                                            <Button color="danger" onClick={() => this.deleteProduct(allProducts._id)} className="float-right mr-5">Delete </Button>
                                        </div>



                                    </CardBody>
                                </Card>
                            ))}
                        </CardColumns>

                    </div>
                </Container>

            </div>
        )
    }
}
