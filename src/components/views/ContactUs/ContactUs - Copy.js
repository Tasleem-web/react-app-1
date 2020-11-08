import React, { useState } from "react";
import './ContactUs.css';
import { withRouter } from "react-router-dom";
import { loginUser } from "../../../_actions/user_actions";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Icon, Input, Button, Checkbox, Typography } from 'antd';
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
const { Title } = Typography;

function ContactUs(props) {
  const { t, i18n } = useTranslation();
  const { TextArea } = Input;
  const dispatch = useDispatch();
  const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;

  const [formErrorMessage, setFormErrorMessage] = useState('')
  const [rememberMe, setRememberMe] = useState(rememberMeChecked)

  const handleRememberMe = () => {
    setRememberMe(!rememberMe)
  };

  const initialEmail = localStorage.getItem("rememberMe") ? localStorage.getItem("rememberMe") : '';

  return (
    <Formik
      initialValues={{
        email: initialEmail,
        password: '',
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email('Email is invalid')
          .required('Email is required'),
        password: Yup.string()
          .min(6, 'Password must be at least 6 characters')
          .required('Password is required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          let dataToSubmit = {
            email: values.email,
            password: values.password
          };

          dispatch(loginUser(dataToSubmit))
            .then(response => {
              if (response.payload.loginSuccess) {
                window.localStorage.setItem('userId', response.payload.userId);
                if (rememberMe === true) {
                  window.localStorage.setItem('rememberMe', values.id);
                } else {
                  localStorage.removeItem('rememberMe');
                }
                props.history.push("/");
              } else {
                setFormErrorMessage('Check out your Account or Password again')
              }
            })
            .catch(err => {
              setFormErrorMessage('Check out your Account or Password again')
              setTimeout(() => {
                setFormErrorMessage("")
              }, 3000);
            });
          setSubmitting(false);
        }, 500);
      }}
    >
      {props => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
        } = props;
        return (
          <div className="contactus-container">
            <div className="inner-container">
              <Title level={2}>{t('contactus')}</Title>
              <form onSubmit={handleSubmit}>
                <div className="two-col">
                  <Form.Item required>
                    <label>{t('name')}:</label>
                    <Input
                      id="name"
                      type="text"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.name && touched.name ? 'text-input error' : 'text-input'
                      }
                    />
                    {errors.name && touched.name && (
                      <div className="input-feedback">{errors.name}</div>
                    )}
                  </Form.Item>

                  <Form.Item required>
                    <label>{t('email')}:</label>
                    <Input
                      id="email"
                      type="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.email && touched.email ? 'text-input error' : 'text-input'
                      }
                    />
                    {errors.email && touched.email && (
                      <div className="input-feedback">{errors.email}</div>
                    )}
                  </Form.Item>
                </div>

                <div className="two-col">
                  <Form.Item required>
                    <label>{t('telephoneNumber')}:</label>
                    <Input
                      id="telephone"
                      type="number"
                      value={values.telephone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.telephone && touched.telephone ? 'text-input error' : 'text-input'
                      }
                    />
                    {errors.telephone && touched.telephone && (
                      <div className="input-feedback">{errors.telephone}</div>
                    )}
                  </Form.Item>

                  <Form.Item required>
                    <label>{t('companyName')}:</label>
                    <Input
                      id="companyName"
                      type="text"
                      value={values.companyName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.companyName && touched.companyName ? 'text-input error' : 'text-input'
                      }
                    />
                    {errors.companyName && touched.companyName && (
                      <div className="input-feedback">{errors.companyName}</div>
                    )}
                  </Form.Item>
                </div>
                <Form.Item required>
                  <label>{t('description')}:</label>
                  <TextArea rows={4}
                    id="description"
                    type="text"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.description && touched.description ? 'text-input error' : 'text-input'
                    }
                  />
                  {errors.description && touched.description && (
                    <div className="input-feedback">{errors.description}</div>
                  )}
                </Form.Item>


                {formErrorMessage && (
                  <label ><p style={{ color: '#ff0000bf', fontSize: '0.7rem', border: '1px solid', padding: '1rem', borderRadius: '10px' }}>{formErrorMessage}</p></label>
                )}

                <Form.Item>
                  {/* <Checkbox id="rememberMe" onChange={handleRememberMe} checked={rememberMe} >Remember me</Checkbox>
                  <a className="login-form-forgot" href="/reset_user" style={{ float: 'right' }}>
                    forgot password
                  </a> */}
                  <div>
                    <Button type="primary" htmlType="submit" className="login-form-button" style={{ minWidth: '100%' }} disabled={isSubmitting} onSubmit={handleSubmit}>
                      {t('send')}
                    </Button>
                  </div>
                  {/* Or <a href="/register">register now!</a> */}
                </Form.Item>
              </form>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default withRouter(ContactUs);


