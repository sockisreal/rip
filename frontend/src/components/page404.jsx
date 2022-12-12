import { Link } from "react-router-dom";

const Component = () => {
  return (
    <div>
      <h1>Страница не найдена</h1>
      <p>Вернитесь на домашнюю страницу</p>
      <Link to="/">Вернуться на домашнюю страницу</Link>
    </div>
  );
};

export default Component;
