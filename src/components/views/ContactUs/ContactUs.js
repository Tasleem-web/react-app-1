import React, { useState } from "react";
import moment from "moment";
import './ContactUs.css';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { userContactUs } from "../../../_actions/user_actions";
import { useDispatch } from "react-redux";
import { Form, Icon, Input, Button, Checkbox, Typography } from 'antd';
import { useTranslation } from "react-i18next";

const { Title } = Typography;
// const formItemLayout = {
//   labelCol: {
//     xs: { span: 24 },
//     sm: { span: 8 },
//   },
//   wrapperCol: {
//     xs: { span: 24 },
//     sm: { span: 16 },
//   },
// };
// const tailFormItemLayout = {
//   wrapperCol: {
//     xs: {
//       span: 24,
//       offset: 0,
//     },
//     sm: {
//       span: 16,
//       offset: 8,
//     },
//   },
// };

function ContactUs(props) {
  const { t, i18n } = useTranslation();
  const { TextArea } = Input;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  return (

    <Formik
      initialValues={{
        name: '',
        email: '',
        telephone: '',
        companyName: '',
        description: ''
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string()
          .required('Name is required'),
        email: Yup.string()
          .email('E-mail is invalid')
          .required('E-mail is required'),
        telephone: Yup.number()
          .min(11, 'Telephone Number must be at least 11 digits')
          .required('Telephone Number is required'),
        companyName: Yup.string()
          .required('Company name is required'),
        description: Yup.string()
          .required('Description is required')
      })}
      onSubmit={(values, { setSubmitting }) => {
        setIsLoading(true);
        setTimeout(() => {

          let dataToSubmit = {
            name: values.name,
            email: values.email,
            telephone: values.telephone,
            companyName: values.companyName,
            description: values.description
          };
          console.log(dataToSubmit)
          dispatch(userContactUs(dataToSubmit))
            .then(response => {
              console.log(response)
              // if (response.payload.success) {
              // } else {
              //   alert(response.payload.err.errmsg)
              // }
              setIsLoading(false);
            })
            .catch(err => {
              console.log(err);
              setIsLoading(false);
            })
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
              {
                isLoading ?
                  <div id="loader"></div>
                  :
                  <div>
                    <Title level={2}>{t('contactus')}</Title>
                    <Form style={{ minWidth: '900px' }} onSubmit={handleSubmit} >
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

                        <Form.Item required hasFeedback>
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
                        <Form.Item required hasFeedback>
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

                      <Form.Item>
                        <div>
                          <Button type="primary" htmlType="submit" className="login-form-button" style={{ minWidth: '100%' }} disabled={isSubmitting} onSubmit={handleSubmit}>
                            {t('send')}
                          </Button>
                        </div>
                      </Form.Item>
                    </Form>
                  </div>
              }
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default ContactUs