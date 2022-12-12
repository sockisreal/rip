import Layout from "./components/layout";
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import "./App.scss";

import Home from "./components/home";
import Cart from "./components/cart";
import Admin from "./components/admin";
import Login from "./components/login";
import Profile from "./components/profile";
import Register from "./components/register";
import Page404 from "./components/page404";
import Product from "./components/product";

import { store } from "./components/store";

function App() {
  return (
    <Provider store={store}>
      <Layout>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="cart" element={<Cart />} />
            <Route path="admin" element={<Admin />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="profile" element={<Profile />} />
            <Route path="product/:id" element={<Product />} />
            <Route path="*" element={<Page404 />} />
          </Route>
        </Routes>
      </Layout>
    </Provider>
  );
}

export default App;
