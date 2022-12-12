import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { register } from "./reducerSlice";
import { clearMessage } from "./reducerSlice";

const Register = () => {
  const [successful, setSuccessful] = useState(false);

  const message = useSelector((state) => state.toolkit.message);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .test(
        "len",
        "Имя должно быть от 3 до 20 символов",
        (val) =>
          val && val.toString().length >= 3 && val.toString().length <= 20
      )
      .required("Это поле обязательное"),
    email: Yup.string()
      .email("Адрес электронной почты не корректный")
      .required("Это поле обязательное"),
    password: Yup.string()
      .test(
        "len",
        "Пароль должет быть от 6 до 40 мисволов",
        (val) =>
          val && val.toString().length >= 6 && val.toString().length <= 40
      )
      .required("Это поле обязательное"),
  });

  const handleRegister = (formValue) => {
    const { username, email, password } = formValue;

    setSuccessful(false);

    dispatch(register({ username, email, password }))
      .unwrap()
      .then(() => {
        setSuccessful(true);
      })
      .catch(() => {
        setSuccessful(false);
      });
  };

  return (
    <div className="col-md-4 signup-form mx-auto mb-5">
      <div className="card card-container mb-3">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />
        <div className="card-body">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleRegister}
          >
            <Form>
              {!successful && (
                <div>
                  <div className="mb-3">
                    <label htmlFor="username">Имя пользователя</label>
                    <Field name="username" type="text" className="form-control" />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email">Электронная почта</label>
                    <Field name="email" type="email" className="form-control" />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password">Пароль</label>
                    <Field
                      name="password"
                      type="password"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>
                  <div className="mb-3">
                    <button type="submit" className="btn btn-primary btn-block">
                      Зарегистрироваться
                    </button>
                  </div>
                </div>
              )}
            </Form>
          </Formik>
        </div>
      </div>

      {message && (
        <div className="mb-3">
          <div
            className={
              successful ? "alert alert-success" : "alert alert-danger"
            }
            role="alert"
          >
            {message}
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
