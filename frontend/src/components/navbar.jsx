import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Badge from "react-bootstrap/Badge";

import logo from "../logo.png";
import { logout } from "./reducerSlice";

const Component = () => {
  const orders = useSelector((state) => state.toolkit.orders);
  const isLoggedIn = useSelector((state) => state.toolkit.isLoggedIn);
  const user = useSelector((state) => state.toolkit.user);
  const dispatch = useDispatch();
  const isAdmin = user?.roles?.indexOf("ROLE_ADMIN") > -1;
  const isUser = user?.roles?.indexOf("ROLE_USER") > -1;
  const exit = () => {
    dispatch(logout());
    window.location.reload();
  };

  return (
    <Navbar bg="light" expand="lg" className="mb-3">
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          className="d-flex flex-row align-items-center"
        >
          <img
            src={logo}
            style={{ height: `44px`}}
            className="me-3"
            alt="logo"
          />
          La Fleur
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            {isLoggedIn && isAdmin && (
                <Nav.Link as={Link} to="/admin" >
              Панель администратора
            </Nav.Link>
            )}
          </Nav>
          <Nav className="ms-auto">
            {isLoggedIn && (
            <Nav.Link as={Link} to="/cart" style={{color:'#ec407a'}}>
              {orders && orders.length > 0 && (
                <Badge bg="secondary" className="me-1">
                  {orders.filter((x) => x.status === 1).length}
                </Badge>
              )}
              Корзина
            </Nav.Link>    )}
            {isLoggedIn ? (
              <>
                <Nav.Link as={Link} to="/profile" style={{color:'#ec407a'}}>
                  {user.email}
                </Nav.Link>
                <Nav.Link onClick={exit} style={{color:'#ec407a'}}>Выйти</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" style={{color:'#ec407a'}}>
                  Войти
                </Nav.Link>
                <Nav.Link as={Link} to="/register" style={{color:'#ec407a'}}>
                  Зерегистрироваться
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Component;
