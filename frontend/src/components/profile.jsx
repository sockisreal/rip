import {useEffect} from "react";
import {Navigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import axios from "axios";

import authHeader from "../services/auth-header";

import {
    setOrders,
    setOrderStatuses,
    setProduct,
} from "./reducerSlice";
import {CardGroup} from "react-bootstrap";
import Card from "react-bootstrap/Card";

const Profile = () => {
    const user = useSelector((state) => state.toolkit.user);

    const apiBase = useSelector((state) => state.toolkit.apiBase);
    const product = useSelector((state) => state.toolkit.product);
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
    }, [apiBase, dispatch]);

    if (!user) {
        return <Navigate to="/login"/>;
    }

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>
                    <strong>{user.username}</strong>
                </h3>
            </header>
            <p>
                <strong>Id:</strong> {user.id}
            </p>
            <p>
                <strong>Электронная почта:</strong> {user.email}
            </p>
            <strong>Права доступа:</strong>
            <ul>
                {user.roles &&
                    user.roles.map((role, index) => <li key={index}>{role}</li>)}
            </ul>
            <h3>Заказы пользователя :</h3>
            {orders.length > 0 &&
                product.length > 0 &&
                orderStatuses.length > 0 && (
                    <div className='Row' style={{
                        display: 'flex',
                        overflow: 'auto',
                    }}>
                        {orders.length > 0 &&
                            orders
                                .map((x) => {
                                    return (
                                        <CardGroup style={{width: 250}}>
                                            <Card style={{margin: 3}}> <Card.Body>
                                                <p>ID заказа: {x.id}</p>
                                                <Card.Img src={product.find((el) => +el.id === x.product_id).image}
                                                          style={{width: 100, height: 100}}/>
                                                <h6>{product.find((el) => +el.id === x.product_id).name}</h6>

                                                <Card.Text>

                                                </Card.Text>
                                            </Card.Body>
                                                <Card.Footer>
                                                    <p>{product.find((el) => +el.id === x.product_id).price} р.</p>
                                                    Статус: <small className="text-muted"> {orderStatuses &&
                                                    orderStatuses.find((e) => +e.val === +x.status)
                                                        ?.name}</small>
                                                </Card.Footer>
                                            </Card>
                                        </CardGroup>
                                    );
                                })}

                    </div>
                )}
            {!orders.length && (
                <p>Вы пока не совершили ни одного заказа
                    <p>Как только вы сделаете свой первый заказ - он отобразится здесь!</p></p>

            )}
        </div>
    );
};

export default Profile;
