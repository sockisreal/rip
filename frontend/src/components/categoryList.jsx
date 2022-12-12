import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Carousel from 'react-bootstrap/Carousel';

import { setCategory } from "./reducerSlice";
import authHeader from "../services/auth-header";

const Component = () => {
  const apiBase = useSelector((state) => state.toolkit.apiBase);
  const category = useSelector((state) => state.toolkit.category);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.toolkit.isLoggedIn);

  useEffect(() => {
    axios.get(`${apiBase}/category`, { headers: authHeader() }).then((resp) => {
      dispatch(setCategory(resp.data));
    });
  }, [apiBase, dispatch]);

  return (
    <>
      <div style={{width:2000, height:'100%',  display:'flex'}}>
          <Row style={{width:800, height:'100%',  display:'flex'}}>
            <Carousel>
                {category &&
                    category.map((x) => (
                        <Carousel.Item  interval={3500}>
                            <img
                                className="d-block w-100"
                                src={x.image}
                                alt="First slide"
                                style={{width:'100%', height:'100%'}}
                            />
                            <Carousel.Caption>
                                <h1>{x.name}</h1>
                                <p><Button
                                    variant="link"
                                    as={Link}
                                    to={`product/${x.id}`}
                                    style={{ color: 'white', fontSize: 20}}>
                                    Перейти
                                </Button></p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))}
            </Carousel>
          </Row>
        {!category && (
          <>
            <h3>Букеты не найдены</h3>
          </>
        )}
          <Row style={{margin:50, width:400}}><p>Цветочная мастерская «La Fleur» — актуальный, уникальный в своем роде цветочный магазин эксклюзивной флористики и декора!</p>
              <p>Мы работаем только по заказу, который вы можете сделать за 3-4 дня, в зависимости от объема и сложности выбранного Вами букета/композиции/корзины и т.д.</p>
                  <p>Свежий, новый взгляд на общепринятые привычные шаблоны в направлении оформления цветами, креативные и необычные идеи в авторской флористике!</p></Row>
      </div>


    </>
  );
};

export default Component;
