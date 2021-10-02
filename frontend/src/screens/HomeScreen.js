import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import Alert from 'react-bootstrap/Alert';
import { listProducts } from '../actions/productActions';
import Loading from '../components/Loading';

const HomeScreen = () => {

    const dispatch = useDispatch();
    const homeState = useSelector(store => store.productList);
    const { products, loading, error } = homeState;

    useEffect(() => {

        dispatch(listProducts());

    }, [dispatch]);



    return (
        <>
            {loading && <Loading />}
            {(products && !loading)
                && (<>
                    <h1>Latest Products</h1>
                    <Row>
                        {
                            products.map((product) => {
                                return (
                                    <Col key={product._id} sm={12} md={6} lg={4}>
                                        <Product product={product} />
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </>
                )
            }
            {error && <Alert className="text-center" variant='danger'>Something went wrong.</Alert>}
        </>
    )
}


export default HomeScreen
