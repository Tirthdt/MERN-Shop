import React from 'react';
import { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { Alert, Row, Col, ListGroup, Image, Form, Button, Card } from "react-bootstrap";

const CartScreen = ({ match, location, history }) => {


    const productId = match.params.id;
    const qty = location.search ? Number(location.search.split("=")[1]) : 1;

    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart.cartItems);

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty]);

    const removeFromCarthandler = (id) => {
        dispatch(removeFromCart(id));
        history.push('/cart');
    }

    const checkOuthandler = () => {
        history.push('/login?redirect=shipping');
    }

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                <Link to='/' className="btn btn-dark my-3">Go Back</Link>
                {cart.length === 0 ? <Alert className='text-center' variant='info'>No tems in the cart</Alert> : (
                    <ListGroup variant='flush'>
                        {
                            cart.map((i) => {
                                return (
                                    <ListGroup.Item key={i.product}>
                                        <Row>
                                            <Col md={2}>
                                                <Image src={i.image} alt={i.name} fluid rounded />
                                            </Col>
                                            <Col md={3}>
                                                <Link to={`product/${i.product}`}>{i.name}</Link>
                                            </Col>
                                            <Col md={2}>
                                                ${i.price}
                                            </Col>
                                            <Col md={2}>
                                                {
                                                    <Form.Control as="select" value={i.qty} onChange={(e) => dispatch(addToCart(i.product, Number(e.target.value)))}>
                                                        {
                                                            [...Array(i.countInStock).keys()].map((x) => {
                                                                return <option key={x + 1}>{x + 1}</option>
                                                            })
                                                        }
                                                    </Form.Control>
                                                }
                                            </Col>
                                            <Col md={2}>
                                                <Button type='button' variant='dark' onClick={(e) => removeFromCarthandler(i.product)}>
                                                    <i className='fas fa-trash'></i>
                                                </Button>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )
                            })
                        }
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2 className='text-center'>SubTotal ({cart.reduce((acc, i) => acc + i.qty, 0)}) items</h2>
                            <h6 className='text-center'> ${cart.reduce((acc, i) => acc + (i.price * i.qty), 0).toFixed(2)} </h6>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button style={{ width: '100%' }} type='button' variant='dark' disabled={cart.length === 0} onClick={checkOuthandler}>Checkout</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen;
