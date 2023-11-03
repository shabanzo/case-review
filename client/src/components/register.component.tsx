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

import { register } from '../services/auth.service';
import { IUser } from '../types/user.type';

const Registration: React.FC = () => {
  let navigate: NavigateFunction = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);

  const [message, setMessage] = useState<string>('');

  const initialValues: IUser = {
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .test(
        'len',
        'The name must be between 3 and 20 characters.',
        (val: any) =>
          val && val.toString().length >= 3 && val.toString().length <= 20
      )
      .required('This field is required!'),
    email: Yup.string()
      .email('This is not a valid email.')
      .required('This field is required!'),
    password: Yup.string()
      .test(
        'len',
        'The password must be between 6 and 40 characters.',
        (val: any) =>
          val && val.toString().length >= 6 && val.toString().length <= 40
      )
      .required('This field is required!'),
    passwordConfirmation: Yup.string().oneOf(
      [Yup.ref('password')],
      'Password must match!'
    ),
  });

  const handleRegister = (formValue: IUser) => {
    const { name, email, password, passwordConfirmation } = formValue;

    register(name, email, password, passwordConfirmation).then(
      (response) => {
        setMessage(response.data.status);
        setLoading(true);
        navigate('/login');
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.error) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
        setLoading(false);
      }
    );
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Header>
              <h3>Registration</h3>
            </Card.Header>
            <Card.Body>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleRegister}
              >
                <Form>
                  <div>
                    <Col className="mb-3">
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Name"
                        className="mb-3"
                      >
                        <Field
                          type="text"
                          className="form-control"
                          name="name"
                        />
                      </FloatingLabel>
                      <ErrorMessage
                        component="div"
                        name="name"
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
                          type="text"
                          className="form-control"
                          name="email"
                        />
                      </FloatingLabel>
                      <ErrorMessage
                        component="div"
                        name="email"
                        className="alert alert-danger mt-2"
                      />
                    </Col>

                    <Col className="mb-3">
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Password"
                        className="mb-3"
                      >
                        <Field
                          type="password"
                          className="form-control"
                          name="password"
                        />
                      </FloatingLabel>
                      <ErrorMessage
                        component="div"
                        name="password"
                        className="alert alert-danger mt-2"
                      />
                    </Col>

                    <Col className="mb-3">
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Password Confirmation"
                        className="mb-3"
                      >
                        <Field
                          type="password"
                          className="form-control"
                          name="passwordConfirmation"
                        />
                      </FloatingLabel>
                      <ErrorMessage
                        component="div"
                        name="passwordConfirmation"
                        className="alert alert-danger mt-2"
                      />
                    </Col>

                    <Col className="mb-3">
                      <Button
                        variant="primary"
                        type="submit"
                        disabled={loading}
                      >
                        {loading && (
                          <Spinner as="span" animation="border" size="sm" />
                        )}{' '}
                        Sign Up
                      </Button>
                    </Col>

                    <Col className="mb-3">
                      <Link to="/signin">Have an account? Sign In!</Link>
                    </Col>
                  </div>

                  {message && (
                    <Col className="mb-3">
                      <Alert className={'alert-danger'} role="alert">
                        {message}
                      </Alert>
                    </Col>
                  )}
                </Form>
              </Formik>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Registration;
