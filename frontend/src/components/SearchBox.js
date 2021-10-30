import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };

  return (
    <Form className="d-flex" onSubmit={submitHandler}>
      <Form.Control
        type="text"
        name="keyword"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Products ...."
        className="mr-sm-2 mr-3"
      ></Form.Control>
      <Button
        type="submit"
        style={{ marginLeft: "5px" }}
        variant="outline-success"
        className="p-2"
      >
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;