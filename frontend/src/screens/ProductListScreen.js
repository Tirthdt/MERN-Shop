import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Alert, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import {
  listProducts,
  deleteProductByID,
  createProduct,
} from "../actions/productActions";
import Paginate from "../components/Paginate";
import { PRODUCT_CREATE_RESET } from "../actionTypes/productActions";

const ProductListScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const pageNumber = match.params.pageNumber || 1;

  const userState = useSelector((state) => state.user);
  const { userInfo } = userState;

  const { loading, error, products, page, pages } = useSelector(
    (state) => state.productList
  );

  const {
    loading: productCreateLoading,
    error: productCreateError,
    success,
    product,
  } = useSelector((state) => state.productCreate);

  const { message } = useSelector((state) => state.productDelete);

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (success) {
      history.push(`/admin/product/${product._id}/edit`);
    } else {
      dispatch(listProducts("", pageNumber));
    }
    if (typeof userInfo === "undefined") {
      history.push("/");
      return;
    }
    if (userInfo.isAdmin || message) {
      dispatch(listProducts("", pageNumber));
    } else {
      history.replace("/");
    }
  }, [dispatch, history, userInfo, success, product, message, pageNumber]);

  const deleteHandler = (id) => {
    dispatch(deleteProductByID(id));
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button
            className="my-3"
            style={{ marginLeft: "auto", display: "inherit" }}
            onClick={createProductHandler}
          >
            <i className="fas fa-plus"></i>Create Product
          </Button>
        </Col>
      </Row>

      {loading || productCreateLoading ? (
        <Loading />
      ) : error || productCreateError ? (
        <Alert variant="danger">{error ? error : productCreateError}</Alert>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr className="text-center">
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="text-center">
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit/`}>
                      <Button variant="success">Edit</Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      onClick={() => deleteHandler(product._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate page={page} pages={pages} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default ProductListScreen;
