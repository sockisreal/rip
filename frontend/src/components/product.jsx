import {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";


import {setProduct, setOrderStatuses, addOrder} from "./reducerSlice";
import authHeader from "../services/auth-header";

const Component = () => {
    let {id} = useParams();

    const apiBase = useSelector((state) => state.toolkit.apiBase);
    const product = useSelector((state) => state.toolkit.product);
    const orderStatuses = useSelector((state) => state.toolkit.orderStatuses);
    const isLoggedIn = useSelector((state) => state.toolkit.isLoggedIn);
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(`${apiBase}/products/category/${id}`, {headers: authHeader()}).then((resp) => {
            dispatch(setProduct(resp.data));
        });

        axios
            .get(`${apiBase}/orders/info/statuses`, {headers: authHeader()})
            .then((resp) => {
                dispatch(setOrderStatuses(resp.data));
            });
    }, [apiBase, dispatch]);


    const addCart = (x) => {
        const status = orderStatuses.find((x) => x.name === "В корзине").val;

        axios
            .post(
                `${apiBase}/orders`,
                {
                    status: +status,
                    product_id: +x,
                },
                {headers: authHeader()}
            )
            .then((resp) => {
                dispatch(addOrder(resp.data));
            });
    };

    return (
        <>
            <div style={{textAlign:'center', padding: 30}}>
            <h1>Букеты</h1></div>
            <Row xs={1} md={2} className="g-4" style={{justifyContent:'center', padding: 10}}>

                {product &&
                    product.map((x) => (
                        <Card style={{ width: '18rem', margin: 10 }}>
                            <Card.Img variant="top" src={x.image} style={{marginTop:12, justifyContent:'center'}} />
                            <Card.Body style={{justifyContent:'center', textAlign:'center'}}>
                                <Card.Title style={{fontSize:25}} >{x.name}</Card.Title>
                                <Card.Text style={{fontSize:16}}>
                                    {x.price}р.
                                </Card.Text>
                                {isLoggedIn && (
                                    <Button
                                        key={x.id}
                                        variant="light"
                                        className="m-1"
                                        onClick={()=>addCart(x.id)}
                                        style={{color:'#ec407a'}}
                                    >
                                        Добавить в корзину
                                    </Button>)}
                            </Card.Body>
                        </Card>
                    ))}
            </Row>
        </>
    );
};

export default Component;
