import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import moment from "moment";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";

import {
  addOrder,
  setOrders,
  setOrderStatuses,
  setProduct,
  setCategory,
  setUsers,
  updateOrder,
} from "../reducerSlice";
import authHeader from "../../services/auth-header";

const Component = () => {
  const [status, setStatus] = useState("");
  const [productId, setProductId] = useState("");
  const [userId, setUserId] = useState("");

  const apiBase = useSelector((state) => state.toolkit.apiBase);
  const product = useSelector((state) => state.toolkit.product);
  const orders = useSelector((state) => state.toolkit.orders);
  const orderStatuses = useSelector((state) => state.toolkit.orderStatuses);
  const users = useSelector((state) => state.toolkit.users);
  const dispatch = useDispatch();

  const [filterStatus, setFilterStatus] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterUser, setFilterUser] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);


  const filterOrders = () => {
    if (!orders) return;

    if (!filterStatus && !filterDate && !filterUser) setFilteredOrders(orders);

    const date = moment(filterDate);

    const tmp = orders.filter((x) => {
      if (filterStatus && +x.status !== +filterStatus) return false;
      if (filterUser && +x.user_id !== +filterUser) return false;
      if (filterDate && !moment(x.updatedAt).isSame(date, "date")) return false;
      return true;
    });

    setFilteredOrders(tmp);
  };


  useEffect(() => {
    axios
      .get(`${apiBase}/orders?all=1`, { headers: authHeader() })
      .then((resp) => {
        dispatch(setOrders(resp.data));
        setFilterStatus("");
        setFilterDate("");
        setFilterUser("");
        setFilteredOrders(resp.data);
      });

    axios
      .get(`${apiBase}/orders/info/statuses`, { headers: authHeader() })
      .then((resp) => {
        dispatch(setOrderStatuses(resp.data));
      });

    axios.get(`${apiBase}/products`, { headers: authHeader() }).then((resp) => {
      dispatch(setProduct(resp.data));
    });

    axios.get(`${apiBase}/category`, { headers: authHeader() }).then((resp) => {
      dispatch(setCategory(resp.data));
    });

    axios.get(`${apiBase}/users`, { headers: authHeader() }).then((resp) => {
      dispatch(setUsers(resp.data));
    });
  }, [apiBase, dispatch]);

  const addNew = (e) => {
    e.preventDefault();

    axios
      .post(
        `${apiBase}/orders`,
        {
          status: +status,
          product_id: +productId,
          user_id: +userId,
        },
        { headers: authHeader() }
      )
      .then((resp) => {
        dispatch(addOrder(resp.data));
        setFilterStatus("");
        setFilterDate("");
        setFilterUser("");
        filterOrders();
      });
  };


  const [show, setShow] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setSelectedId(id);
    setShow(true);
  };


  const handleSave = () => {
    const order = orders.find((x) => x.id === selectedId);

    if (!order) return;

    const o = { ...order };
    o.status = selectedStatus;

    axios
      .put(`${apiBase}/orders/${o.id}`, o, { headers: authHeader() })
      .then((resp) => {
        dispatch(updateOrder(o));
        handleClose();
        setFilterStatus("");
        setFilterDate("");
        setFilterUser("");
        filterOrders();
      });
  };

  return (
    <div className="mb-5 p-2 border border-top-0 rounded-bottom">
      <h3>Список заказов</h3>

      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Фильтр - статус</Form.Label>
            <Form.Select
              placeholder="Статус заказа"
              value={filterStatus}
              onChange={(e) => {
                setFilterStatus(e.target.value);
                filterOrders();
              }}
              onBlur={(e) => {
                setFilterStatus(e.target.value);
                filterOrders();
              }}
            >
              <option value="">Не выбрано</option>
              {orderStatuses &&
                orderStatuses.map((x) => (
                  <option key={x.val} value={x.val}>
                    {x.name}
                  </option>
                ))}
            </Form.Select>
          </Form.Group>
        </Col>

        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Фильтр - дата</Form.Label>
            <Form.Control
              type="date"
              placeholder="Дата"
              value={filterDate}
              onChange={(e) => {
                setFilterDate(e.target.value);
                filterOrders();
              }}
              onBlur={(e) => {
                setFilterDate(e.target.value);
                filterOrders();
              }}
            ></Form.Control>
          </Form.Group>
        </Col>

        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Фильтр - пользователь</Form.Label>
            <Form.Select
              placeholder="Пользователь (ID)"
              value={filterUser}
              onChange={(e) => {
                setFilterUser(e.target.value);
                filterOrders();
              }}
              onBlur={(e) => {
                setFilterUser(e.target.value);
                filterOrders();
              }}
            >
              <option value="">Не выбрано</option>
              {users &&
                users.map((x) => (
                  <option key={x.id} value={x.id}>
                    {x.username} - {x.email}
                  </option>
                ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      {filteredOrders && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Статус</th>
              <th>ID Товара</th>
              <th>Пользоватль</th>
              <th>Дата</th>
              <th>Изменить</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 &&
              filteredOrders.map((x) => {
                return (
                  <tr key={x.id}>
                    <td>{x.id}</td>
                    <td>
                      {orderStatuses &&
                        orderStatuses.find((e) => +e.val === +x.status)?.name}
                    </td>
                    <td>{x.product_id}</td>
                    <td>
                      {users &&
                        users.find((y) => +y.id === +x.user_id)?.username}
                    </td>
                    <td>{moment(x.updatedAt).format("DD-MM-YYYY hh:ss")}</td>
                    <td>
                      <Button
                          variant="light" style={{color:'#ec407a'}}
                          onClick={() => handleShow(x.id)}
                      >
                        &#9998;
                      </Button>
                    </td>
                  </tr>
                );
              })}
            {!filteredOrders.length && (
              <tr>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
            )}
          </tbody>
        </Table>
      )}

      <h3>Добавить новый заказ</h3>

      <Form onSubmit={addNew}>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Статус</Form.Label>
              <Form.Select
                name="status"
                placeholder="Статус заказа"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                onBlur={(e) => setStatus(e.target.value)}
              >
                <option disabled value="">
                  Выберите статус
                </option>
                {orderStatuses &&
                  orderStatuses.map((x) => (
                    <option key={x.val} value={x.val}>
                      {x.name}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Товар</Form.Label>
              <Form.Select
                name="product_id"
                placeholder="Товар"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                onBlur={(e) => setProductId(e.target.value)}
              >
                <option disabled value="">
                  Выберите Товар
                </option>
                {product &&
                  product.map((x) => (
                    <option key={x.id} value={x.id}>
                      {x.name}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Пользователь</Form.Label>
              <Form.Select
                name="user_id"
                placeholder="Пользователь"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                onBlur={(e) => setUserId(e.target.value)}
              >
                <option disabled value="">
                  Выберите Пользователя
                </option>
                {users &&
                  users.map((x) => (
                    <option key={x.id} value={x.id}>
                      {x.username} - {x.email}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Button  variant="light" style={{color:'#ec407a'}}  type="submit">
          Добавить
        </Button>
      </Form>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Изменить статус заказа</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Статус</Form.Label>
            <Form.Select
              name="status"
              placeholder="Статус заказа"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              onBlur={(e) => setSelectedStatus(e.target.value)}
            >
              <option disabled value="">
                Выберите статус
              </option>
              {orderStatuses &&
                orderStatuses.map((x) => (
                  <option key={x.val} value={x.val}>
                    {x.name}
                  </option>
                ))}
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Отмена
          </Button>
          <Button  variant="light" style={{color:'#ec407a'}}  onClick={handleSave}>
            Сохранить
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Component;
