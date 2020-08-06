import React, { Component } from 'react'
import axios from 'axios'
import { Container, Row, Col, Form, Input, FormGroup, Label, Button, CustomInput, Alert } from 'reactstrap'
import { Link } from 'react-router-dom'

import FileUploadButton from './FileUploadButton'
import AuthenticNavigation from './AuthenticNavigation'

export default class EditProduct extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             product:{},
             selectedFile:null
        }
    }

    handleChange = (e) => {
        this.setState({
            product: { ...this.state.product, [e.target.name]: e.target.value },

        })
    }


    componentDidMount() {
        axios.get('http://localhost:3002/product/' + (this.props.match.params.id), this.state.config)
            .then((response) => {

                this.setState({
                    product: response.data,

                })

                console.log(this.state.checksize)
            }).catch((err) => console.log(err.response));
    }

    handleFileSelect = (e) => {
        this.setState({
            selectedFile: e.target.files[0]
        })
    }
 

    uploadFile = (e) => {
        e.preventDefault();
        const data = new FormData()
        data.append('imageFile', this.state.selectedFile)
        axios.post('http://localhost:3002/upload', data, this.state.config)
            .then((response) => {
                console.log(response.data)
                this.setState({
                    product: { ...this.state.product, image: response.data.filename }
                })
            }).catch((err) => console.log(err.response))
    }


    updateProduct = (e) => {
        e.preventDefault();
        axios.put('http://localhost:3002/product/' + (this.props.match.params.id), {
            ...this.state.product
        }, this.state.config)
            .then((response) => {
                console.log(response.data)
            }).catch((err) => console.log(err.response))

        this.props.history.push('/product')

    }



    
    render() {
        return (
            <div>
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
                                    <Input type="text" name="product_name" id="product_name" value={this.state.product.product_name} onChange={this.handleChange} />
                                </FormGroup>

                                <FormGroup>
                                    <Label for="product_details">Product details</Label>
                                    <Input type="text" name="product_details" id="product_details" value={this.state.product.product_details} onChange={this.handleChange} />
                                </FormGroup>

                                <FormGroup>
                                    <Label for="price">Price</Label>
                                    <Input type="number" name="price" id="price" value={this.state.product.price} onChange={this.handleChange} />
                                </FormGroup>




                                <FormGroup>
                                    <Label for="image">Product image</Label>
                                    <FormGroup>
                                        <img className='img-thumbnail productImage'
                                            width='400' src={`http://localhost:3002/uploads/${this.state.product.image}`}
                                        />
                                        <CustomInput type='file' id='image'
                                            onChange={this.handleFileSelect} />
                                        {this.state.selectedFile ? (<FileUploadButton
                                            uploadFile={this.uploadFile} />) : null}
                                    </FormGroup>
                                </FormGroup>


                                <Button color='primary' block onClick={this.updateProduct}>Update</Button>


                            </Form>
                        </Col>
                    </Row>

                </Container>


                
            </div>
        )
    }
}
