import {useState} from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import authHeader from "../services/auth-header";

const Component = () => {
    const apiBase = useSelector((state) => state.toolkit.apiBase);

    const [name, setName] = useState("");
    const [product, setProduct] = useState([]);

    const find = () => {
        axios.get(`${apiBase}/products/?name=${encodeURIComponent(name)}`, {headers: authHeader()}).then((resp) => {
            setProduct(resp.data);
        });

    };


    return (
        <>
            <Row>
                <Form.Group className="mb-3">
                    <Form.Label><p>Поиск по названию цветов</p>
                        <Form.Control
                            type="text"
                            placeholder="Введите название"
                            value={name}
                            onChange={(e) => setName(e.target.value)}></Form.Control>
                    </Form.Label>
                    <Button variant="light" style={{color:'#ec407a'}} type="submit" onClick={find}>
                        Найти
                    </Button>
                </Form.Group>
            </Row>

            <h4>Результаты поиска</h4>

            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Название</th>
                    <th>Перейти</th>
                </tr>
                </thead>
                <tbody>
                {product.length > 0 &&
                    product.map((x) => {
                        return (
                            <tr key={x.id}>
                                <td>{x.id}</td>
                                <td>{x.name}</td>
                                <td>
                                    <Button
                                        variant="light" style={{color:'#ec407a'}}
                                        as={Link}
                                        to={`product/${x.category_id}`}
                                    >
                                        Перейти к просмотру
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                {!product.length && (
                    <tr>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                    </tr>
                )}
                </tbody>
            </Table>
        </>
    );
};

export default Component;
