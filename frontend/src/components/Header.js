import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { logout } from "../actions/authActions";
import SearchBox from "./SearchBox";

const Header = () => {
  const authSelector = useSelector((state) => state.user);
  const { userInfo } = authSelector;
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <h1>SHOPIFY</h1>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Route render={({ history }) => <SearchBox history={history} />} />

            <Nav className="me-auto"></Nav>
            <Nav className="d-flex">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i> CART
                </Nav.Link>
              </LinkContainer>
              {!userInfo && (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i> SIGN IN
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>PROFILE</NavDropdown.Item>
                  </LinkContainer>
                  {userInfo.isAdmin && (
                    <>
                      <LinkContainer to="/users">
                        <NavDropdown.Item>USERS</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/orders">
                        <NavDropdown.Item>ORDERS</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/products">
                        <NavDropdown.Item>PRODUCTS</NavDropdown.Item>
                      </LinkContainer>
                    </>
                  )}
                  <NavDropdown.Item onClick={logoutHandler}>
                    LOGOUT
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
