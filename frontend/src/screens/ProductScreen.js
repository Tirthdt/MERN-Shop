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
import { listProduct, createReview } from "../actions/productActions";
import Alert from "react-bootstrap/Alert";
import Loading from "../components/Loading";
import { PRODUCT_CREATE_REVIEW_RESET } from "../actionTypes/productActions";

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [rating, setrating] = useState(0);
  const [comment, setcomment] = useState("");

  const id = match.params.id;
  const dispatch = useDispatch();

  const productScreenState = useSelector((state) => state.product);
  const { product, loading, error } = productScreenState;

  const userState = useSelector((state) => state.user);
  const { userInfo } = userState;

  const productReviewState = useSelector((state) => state.productReview);
  const { success } = productReviewState;

  useEffect(() => {
    if (success) {
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProduct(id));
  }, [dispatch, id, history, userInfo, success]);

  const addToCartHandler = () => {
    history.push(`/cart/${id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!comment || comment === "") {
      alert("Please enter valid review");
      return;
    }

    dispatch(createReview(product._id, { rating, comment }));
    setrating(0);
    setcomment("");
  };

  const reviewedAlready = () => {
    let res = false;
    if (product.reviews) {
      res = product.reviews.find((review) => review.user === userInfo?._id);
    }
    return res;
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
              <Image
                src={
                  product?.image?.startsWith("uploads")
                    ? `../../${product?.image}`
                    : product?.image
                }
                alt={product.name}
                fluid
              />
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
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {product?.reviews?.length === 0 ? (
                <Alert variant="info">No Reviews</Alert>
              ) : (
                <>
                  <ListGroup variant="flush">
                    {product?.reviews?.map((review) => (
                      <ListGroup.Item key={review._id}>
                        <strong>{review.name}</strong>
                        <Rating value={review.rating} color={"yellow"} />
                        <p className="mb-0">
                          {review.createdAt.substring(0, 10)}
                        </p>
                        <p>{review.comment}</p>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </>
              )}
              {
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    {userInfo ? (
                      <>
                        <h2>Write a customer review</h2>
                        <Form onSubmit={submitHandler}>
                          <Form.Group controlId="rating">
                            <Form.Label>Rating</Form.Label>
                            <Form.Control
                              as="select"
                              onChange={(e) => setrating(e.target.value)}
                              value={rating}
                            >
                              {[0, 1, 2, 3, 4, 5].map((x) => {
                                return <option key={x}>{x}</option>;
                              })}
                            </Form.Control>
                          </Form.Group>
                          <Form.Group controlId="comment">
                            <Form.Label>Review</Form.Label>
                            <Form.Control
                              value={comment}
                              onChange={(e) => setcomment(e.target.value)}
                              as="textarea"
                              rows={3}
                            ></Form.Control>
                          </Form.Group>
                          <Button
                            disabled={reviewedAlready()}
                            variant="dark"
                            className="mt-2 w-100"
                            type="submit"
                          >
                            Submit Review
                          </Button>
                        </Form>
                      </>
                    ) : (
                      <Alert variant="info">
                        Please <Link to="/login">login</Link> to write a review.
                      </Alert>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              }
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
