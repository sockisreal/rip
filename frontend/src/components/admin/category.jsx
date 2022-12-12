import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import {addCategory, setCategory, setOrderStatuses, setProduct} from "../reducerSlice";
import authHeader from "../../services/auth-header";

const Component = () => {
  const defNewObj = {
    name: "",
    image: "",
  };

  const [newCategory, setNewCategory] = useState(defNewObj);
  const apiBase = useSelector((state) => state.toolkit.apiBase);
  const category = useSelector((state) => state.toolkit.category);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`${apiBase}/category`, { headers: authHeader() }).then((resp) => {
      dispatch(setCategory(resp.data));
    });



    axios
        .get(`${apiBase}/orders/info/statuses`, {headers: authHeader()})
        .then((resp) => {
          dispatch(setOrderStatuses(resp.data));
        });
  }, [apiBase, dispatch]);

  const addNew = (e) => {
    e.preventDefault();

    axios.post(`${apiBase}/category`, newCategory, { headers: authHeader() }).then((resp) => {
      dispatch(addCategory(resp.data));
      setNewCategory(defNewObj);
    });
  };

  const handleChange = (e) => {
    const newCategoryTmp = { ...newCategory };

    newCategoryTmp[e.target.name] = e.target.value;

    setNewCategory(newCategoryTmp);
  };

  return (
      <div className="mb-5 p-2 border border-top-0 rounded-bottom">
        <h3>Список категорий</h3>

        {category && (
            <Table striped bordered hover>
              <thead>
              <tr>
                <th>ID</th>
                <th>Название</th>
                <th>Изображение</th>
              </tr>
              </thead>
              <tbody>
              {category.length > 0 &&
                  category.map((x) => {
                    return (
                        <tr key={x.id}>
                          <td>{x.id}</td>
                          <td>{x.name}</td>
                          <td>{x.image}</td>
                        </tr>
                    );
                  })}
              {!category.length && (
                  <tr>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                  </tr>
              )}
              </tbody>
            </Table>
        )}

        <h3>Добавить новую категорию</h3>

        <Form onSubmit={addNew}>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Название</Form.Label>
                <Form.Control
                    type="text"
                    name="name"
                    placeholder="Название"
                    value={newCategory.name}
                    onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Изображение</Form.Label>
                <Form.Control
                    type="text"
                    name="image"
                    placeholder="Изображение"
                    value={newCategory.image}
                    onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Button  variant="light" style={{color:'#ec407a'}}  type="submit">
            Добавить
          </Button>
        </Form>
      </div>
  );
};

export default Component;
