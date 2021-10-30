import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import FormContainer from "../components/FormContainer";
import { listProduct, updateProduct } from "../actions/productActions";
import {
  PRODUCT_FETCH_RESET,
  PRODUCT_UPDATE_RESET,
} from "../actionTypes/productActions";
import axios from "axios";

const ProductEditScreen = ({ match, history }) => {
  const [name, setname] = useState("");
  const [price, setprice] = useState(0);
  const [image, setimage] = useState("");
  const [brand, setbrand] = useState("");
  const [category, setcategory] = useState("");
  const [countInStock, setcountInStock] = useState(0);
  const [description, setdescription] = useState("");
  const [uploading, setuploading] = useState(false);

  const dispatch = useDispatch();

  const productSelector = useSelector((state) => state.product);
  const { product, error, loading } = productSelector;

  const productUpdateSelector = useSelector((state) => state.productUpdate);
  const {
    error: updateError,
    loading: updateLoading,
    success,
  } = productUpdateSelector;

  useEffect(() => {
    if (success) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      dispatch({ type: PRODUCT_FETCH_RESET });
      history.push("/products");
    } else {
      if (!product || product._id !== match.params.id) {
        dispatch(listProduct(match.params.id));
      } else {
        setname(product.name);
        setbrand(product.brand);
        setcategory(product.category);
        setcountInStock(product.countInStock);
        setdescription(product.description);
        setimage(product.image);
        setprice(product.price);
      }
    }
  }, [dispatch, match, product, history, success]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(image, name, price);
    dispatch(
      updateProduct({
        _id: match.params.id,
        name,
        image,
        description,
        brand,
        category,
        countInStock,
        price,
      })
    );
  };

  const onUploadHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setuploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(`/api/uploads`, formData, config);
      setuploading(false);
      setimage(data);
    } catch (err) {
      console.log(err);
      setuploading(false);
    }
  };

  return (
    <FormContainer>
      {(loading || updateLoading) && <Loading />}
      <h1>Update</h1>
      {error ||
        (updateError && (
          <Alert variant="danger" className="text-center">
            {error ? error : updateError}
          </Alert>
        ))}
      <Form onSubmit={onSubmitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setname(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setprice(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label>Image</Form.Label>
          <Form.Control
            value={image}
            onChange={(e) => setimage("")}
            type="text"
          ></Form.Control>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Choose Image</Form.Label>
            <Form.Control onChange={onUploadHandler} type="file" />
          </Form.Group>
          {uploading && <Loading />}
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            value={description}
            onChange={(e) => setdescription(e.target.value)}
            type="text"
          ></Form.Control>
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label>Brand</Form.Label>
          <Form.Control
            value={brand}
            onChange={(e) => setbrand(e.target.value)}
            type="text"
          ></Form.Control>
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            value={category}
            onChange={(e) => setcategory(e.target.value)}
            type="text"
          ></Form.Control>
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label>Count in Stock</Form.Label>
          <Form.Control
            value={countInStock}
            onChange={(e) => setcountInStock(e.target.value)}
            type="number"
          ></Form.Control>
        </Form.Group>

        <Button className="mt-3 btn-block" type="submit" variant="dark">
          Update Product
        </Button>
      </Form>
      <div className="text-center mt-2">
        <Link to="/products">Cancel</Link>
      </div>
    </FormContainer>
  );
};

export default ProductEditScreen;
