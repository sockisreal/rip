import { useState } from "react";
import Nav from "react-bootstrap/Nav";
import Product from "./admin/product";
import Orders from "./admin/orders";
import Category from "./admin/category";

const Component = () => {
  const [selectedTab, setSelectedTab] = useState("Category");

  const handleChange = (eventKey) => {
    setSelectedTab(eventKey);
  };

  return (
    <>
      <h2>Интерфейс администратора</h2>
      <Nav variant="tabs" defaultActiveKey="/home" onSelect={handleChange}>
        <Nav.Item>
          <Nav.Link eventKey="Category" active={selectedTab === "Category"} style={{color:'#ec407a'}}>
            Категории
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="Product" active={selectedTab === "Product"} style={{color:'#ec407a'}}>
            Товары
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="Orders" active={selectedTab === "Orders"} style={{color:'#ec407a'}}>
            Заказы
          </Nav.Link>
        </Nav.Item>
      </Nav>
      {selectedTab === "Category" && <Category />}
      {selectedTab === "Product" && <Product />}
      {selectedTab === "Orders" && <Orders />}
    </>
  );
};

export default Component;
