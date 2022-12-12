import {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import authHeader from "../services/auth-header";

import {
    setOrders,
    setOrderStatuses,
    setProduct,
    setCategory,
    deleteOrder,
    updateOrder,
} from "./reducerSlice";

const Component = () => {
    const apiBase = useSelector((state) => state.toolkit.apiBase);
    const product = useSelector((state) => state.toolkit.product);
    const category = useSelector((state) => state.toolkit.category);
    const orders = useSelector((state) => state.toolkit.orders);
    const orderStatuses = useSelector((state) => state.toolkit.orderStatuses);
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(`${apiBase}/orders`, {headers: authHeader()}).then((resp) => {
            dispatch(setOrders(resp.data));
        });

        axios
            .get(`${apiBase}/orders/info/statuses`, {headers: authHeader()})
            .then((resp) => {
                dispatch(setOrderStatuses(resp.data));
            });

        axios.get(`${apiBase}/products`, {headers: authHeader()}).then((resp) => {
            dispatch(setProduct(resp.data));
        });

        axios.get(`${apiBase}/category`, {headers: authHeader()}).then((resp) => {
            dispatch(setCategory(resp.data));
        });
    }, [apiBase, dispatch]);

    const deleteCart = (id) => {
        axios
            .delete(`${apiBase}/orders/${id}`, {headers: authHeader()})
            .then((resp) => {
                dispatch(deleteOrder(id));
            });
    };
    const payCart = () => {
        const ordersInCart = orders.filter((x) => x.status === 1);

        for (const oic of ordersInCart) {
            const id = oic.id;
            const tmp = {...oic};
            tmp.status = 2;
            axios
                .put(`${apiBase}/orders/${id}`, tmp, {headers: authHeader()})
                .then((resp) => {
                    dispatch(updateOrder(tmp));
                });
        }
    };

    return (
        <div className="mb-5">
            <h3>Корзина</h3>

            {orders.length > 0 &&
                product.length > 0 &&
                orderStatuses.length > 0 &&
                category.length > 0 && (
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Статус</th>
                            <th>Товар</th>
                            <th>Удалить</th>
                        </tr>
                        </thead>
                        <tbody>
                        {orders.length > 0 &&
                            orders
                                .filter((x) => x.status === 1)
                                .map((x) => {

                                    return (
                                        <tr key={x.id}>
                                            <td>{x.id}</td>
                                            <td>
                                                {orderStatuses &&
                                                    orderStatuses.find((e) => +e.val === +x.status)
                                                        ?.name}
                                            </td>
                                            <td>
                                                {product.find((el) => +el.id === x.product_id).name}
                                            </td>
                                            <td>
                                                {product.find((el) => +el.id === x.product_id).price} р.
                                            </td>
                                            <td>
                                                <Button
                                                    variant="danger"
                                                    style={{
                                                        color: "transparent",
                                                        textShadow: "0 0 0 white",
                                                    }}
                                                    onClick={() => deleteCart(x.id)}
                                                >
                                                    &#10006;
                                                </Button>
                                            </td>
                                        </tr>
                                    );
                                })}
                        {!orders.length && (
                            <tr>
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

            <Form.Group className="mb-3">
                <Button
                    variant="light"
                    style={{color: '#ec407a'}}
                    onClick={payCart}>
                    Оплатить заказ
                </Button>
            </Form.Group>
        </div>
    );
};

export default Component;
