import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { listProduct } from "../actions/productActions";
import Alert from "react-bootstrap/Alert";
import Loading from "../components/Loading";

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const id = match.params.id;
  const dispatch = useDispatch();

  const productScreenState = useSelector((state) => state.product);
  const { product, loading, error } = productScreenState;

  useEffect(() => {
    dispatch(listProduct(id));
  }, [dispatch, id]);

  const addToCartHandler = () => {
    history.push(`/cart/${id}?qty=${qty}`);
  };

  return (
    <>
      {loading && <Loading />}
      {product && !loading && (
        <>
          <Link to="/" className="btn btn-dark my-3">
            Go Back
          </Link>
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>{product.name}</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: Rs.{product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price</Col>
                      <Col>
                        {" "}
                        <strong>Rs.{product.price}</strong>{" "}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status</Col>
                      <Col>
                        <strong>
                          {product.countInStock > 0
                            ? "In Stock"
                            : "Not Available"}
                        </strong>{" "}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <>
                      <ListGroup.Item>
                        <Row>
                          <Col>Qty:</Col>
                          <Col>
                            <Form.Control
                              as="select"
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => {
                                  return <option key={x + 1}>{x + 1}</option>;
                                }
                              )}
                            </Form.Control>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Row>
                          <Button
                            onClick={addToCartHandler}
                            type="button"
                            variant="dark"
                          >
                            Add To Card
                          </Button>
                        </Row>
                      </ListGroup.Item>
                    </>
                  )}
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
      {error && (
        <Alert className="text-center" variant="danger">
          Something went wrong.
        </Alert>
      )}
    </>
  );
};

export default ProductScreen;
