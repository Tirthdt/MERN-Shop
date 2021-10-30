import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Alert from "react-bootstrap/Alert";
import Paginate from "../components/Paginate";
import { listProducts } from "../actions/productActions";
import Loading from "../components/Loading";
import ProductCarousel from "../components/ProductCarousel";

const HomeScreen = ({ match }) => {
  const dispatch = useDispatch();
  const homeState = useSelector((store) => store.productList);
  const { products, loading, error, pages, page } = homeState;

  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      {!keyword && <ProductCarousel />}
      {loading && <Loading />}
      {products && !loading && (
        <>
          <h1>Latest Products</h1>
          <Row>
            {products.map((product) => {
              return (
                <Col key={product._id} sm={12} md={6} lg={4}>
                  <Product product={product} />
                </Col>
              );
            })}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
      {error && (
        <Alert
          className="text-center"
          variant="danger"
          isAdmin={userInfo?.isAdmin}
        >
          Something went wrong.
        </Alert>
      )}
    </>
  );
};

export default HomeScreen;
