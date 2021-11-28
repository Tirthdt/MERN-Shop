//Bootstrap imports
import Container from "react-bootstrap/Container";

import { BrowserRouter as Router, Route } from "react-router-dom";

//component imports
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentsScreen from "./screens/PaymentsScreen";
import Placeorder from "./screens/Placeorder";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import AdminUserEditScreen from "./screens/AdminUserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrdersListScreen from "./screens/OrdersListScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <main className="py-3">
          <Container>
            <Route path="/" component={HomeScreen} exact />
            <Route path="/search/:keyword" component={HomeScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            <Route
              path="/admin/product/:id/edit"
              component={ProductEditScreen}
            />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/login" component={LoginScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/profile" component={ProfileScreen} />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/payments" component={PaymentsScreen} />
            <Route path="/placeOrder" component={Placeorder} />
            <Route path="/orders/:id" component={OrderScreen} />
            <Route path="/users" component={UserListScreen} />
            <Route path="/admin/orders" component={OrdersListScreen} />
            <Route path="/forgotPassword" component={ForgotPasswordScreen} />
            <Route
              path="/admin/users/:id/edit/"
              component={AdminUserEditScreen}
            />
            <Route path="/products" component={ProductListScreen} exact />
            <Route path="/products/:pageNumber" component={ProductListScreen} />

            <Route path="/page/:pageNumber" component={HomeScreen} />
            <Route
              path="/search/:keyword/page/:pageNumber"
              component={HomeScreen}
              exact
            />
          </Container>
        </main>
        <Footer />
      </Router>
    </>
  );
};

export default App;
