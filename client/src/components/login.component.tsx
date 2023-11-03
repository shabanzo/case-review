import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  FloatingLabel,
  Row,
  Spinner,
} from 'react-bootstrap';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { login } from '../services/auth.service';
import { getCurrentUser } from '../services/user.service';

type Props = {};

const Login: React.FC<Props> = () => {
  let navigate: NavigateFunction = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const initialValues: {
    email: string;
    password: string;
  } = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('This field is required!'),
    password: Yup.string().required('This field is required!'),
  });

  const handleLogin = (formValue: { email: string; password: string }) => {
    const { email, password } = formValue;

    setMessage('');
    setLoading(true);

    login(email, password).then(
      () => {
        getCurrentUser();
        navigate('/case-review');
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setLoading(false);
        setMessage(resMessage);
      }
    );
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col className="col-md-6">
          <Card>
            <Card.Header>
              <h3>Sign In</h3>
            </Card.Header>
            <Card.Body>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleLogin}
              >
                <Form>
                  <Col className="mb-3">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Email"
                      className="mb-3"
                    >
                      <Field
                        type="text"
                        name="email"
                        className="form-control"
                      />
                    </FloatingLabel>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="alert alert-danger mt-2"
                    />
                  </Col>

                  <Col className="mb-3">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Email"
                      className="mb-3"
                    >
                      <Field
                        type="password"
                        name="password"
                        className="form-control"
                      />
                    </FloatingLabel>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="alert alert-danger mt-2"
                    />
                  </Col>

                  <Col className="mb-3">
                    <Button
                      type="submit"
                      className="btn-primary btn-block"
                      disabled={loading}
                    >
                      {loading && (
                        <>
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                          ></Spinner>{' '}
                        </>
                      )}
                      Login
                    </Button>
                  </Col>

                  {message && (
                    <Col className="mb-3">
                      <Alert className={'alert-danger'} role="alert">
                        {message}
                      </Alert>
                    </Col>
                  )}

                  <Col className="mb-3">
                    <Link to="/registration">
                      Do not have an account? Sign up!
                    </Link>
                  </Col>
                </Form>
              </Formik>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
