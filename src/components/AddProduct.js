import React, { Component } from 'react'
import axios from 'axios'
import { Container, Row, Col, Form, Input, FormGroup, Label, Button, CustomInput, Alert } from 'reactstrap'
import { Link } from 'react-router-dom'

import FileUploadButton from './FileUploadButton'
import AuthenticNavigation from './AuthenticNavigation'


export default class AddProduct extends Component {
    constructor(props) {
        super(props)

        this.state = {
            product_name: '',
            product_details: '',
            price: '',
            image: '',
            product: {},
            selectedFile: null,
        }
    }

    handleFileSelect = (e) => {
        this.setState({
            selectedFile: e.target.files[0]
        })
    }

    addproduct = (e) => {
        e.preventDefault();
        console.log(this.state);

        axios.post('http://localhost:3002/product', {

            product_name: this.state.product_name,
            product_details: this.state.product_details,
            price: this.state.price,
            image: this.state.image,
        }, this.state.config)
            .then((response) => {
                console.log(response.data);
                this.setState({
                    product_name: '',
                    product_details: '',
                    price: '',
                    image: '',

                });
            }).catch((err) => console.log(err))

        this.props.history.push('/product');
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }



    uploadFile = (e) => {
        e.preventDefault();
        const data = new FormData()
        data.append('imageFile', this.state.selectedFile)
        axios.post('http://localhost:3002/upload', data)
            .then((response) => {
                console.log(response.data)
                this.setState({
                    image: response.data.filename
                })
            }).catch((err) => console.log(err.response))
    }

    render() {
        return (
            <div style={{ height: '130vh' }}>
                <AuthenticNavigation></AuthenticNavigation>

                <Container>
                    <div className="clearfix">
                        <h2 className="float-left">Add Product </h2>
                        <Link to={`/product`} className="float-right mt-1">
                            <Button color="primary" > View product</Button>
                        </Link>

                    </div>
                    <hr></hr>


                    <Row>
                        <Col sm="12" md={{ size: 6, offset: 3 }}>
                            <Form>
                                <FormGroup>
                                    <Label for="product_name">Product name</Label>
                                    <Input type="text" name="product_name" id="product_name" value={this.state.product_name} onChange={this.handleChange} />
                                </FormGroup>

                                <FormGroup>
                                    <Label for="product_details">Product details</Label>
                                    <Input type="text" name="product_details" id="product_details" value={this.state.product_details} onChange={this.handleChange} />
                                </FormGroup>

                                <FormGroup>
                                    <Label for="price">Price</Label>
                                    <Input type="number" name="price" id="price" value={this.state.price} onChange={this.handleChange} />
                                </FormGroup>




                                <FormGroup>
                                    <Label for="image">Product image</Label>
                                    <FormGroup>
                                        <img className='img-thumbnail productImage'
                                            width='400' src={`http://localhost:3002/uploads/${this.state.image}`}
                                        />
                                        <CustomInput type='file' id='image'
                                            onChange={this.handleFileSelect} />
                                        {this.state.selectedFile ? (<FileUploadButton
                                            uploadFile={this.uploadFile} />) : null}
                                    </FormGroup>
                                </FormGroup>


                                <Button color='primary' block onClick={this.addproduct}>Add</Button>


                            </Form>
                        </Col>
                    </Row>

                </Container>

            </div >
        )
    }
}
