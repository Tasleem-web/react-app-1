/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu, Icon, Badge, Radio, Button } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useTranslation, withTranslation } from 'react-i18next';
import { isEnglishUser } from '../../../../_actions/user_actions';

function RightMenu(props) {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();


  function handleClick(lang) {
    i18n.changeLanguage(lang)
    let position = lang == 'en' ? 'ltr' : 'rtl';
    const selectedLang = dispatch(isEnglishUser(position));
    // console.log(value)
    // buttonClick(selectedLang)

  }

  const user = useSelector(state => state.user)
  const role = user?.userData?.role;

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`)
      .then(response => {
        if (response.status === 200) {
          props.history.push("/login");
        } else {
          alert('Log Out Failed')
        }
      });
  };

  // const buttonClick = (selectedLang) => {
  //   this.props.sendData(selectedLang);
  // }

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Radio.Group>
          <Radio.Button value="english" onClick={(e) => handleClick('en')}>English</Radio.Button>
          <Radio.Button value="arabic" onClick={(e) => handleClick('arab')}>العربية</Radio.Button>
          {/* <Radio.Button value="hebrew" onClick={(e) => handleClick('heb')}>עִברִית</Radio.Button> */}
        </Radio.Group>
        {/* <Menu.Item key="contactus">
          <Link to="/contactus">{t('contactus')}</Link>
        </Menu.Item> */}
        <Menu.Item key="mail">
          <Link to="/login">{t('signIn')}</Link>
        </Menu.Item>
        <Menu.Item key="app">
          <Link to="/register">{t('signUp')}</Link>
        </Menu.Item>
      </Menu>
    )
  } else {
    return (
      <Menu mode={props.mode}>
        <Radio.Group>
          <Radio.Button value="english" onClick={(e) => handleClick('en')}>English</Radio.Button>
          <Radio.Button value="arabic" onClick={(e) => handleClick('arab')}>العربية</Radio.Button>
          {/* <Radio.Button value="hebrew" onClick={(e) => handleClick('heb')}>עִברִית</Radio.Button> */}
        </Radio.Group>
        {/* <Menu.Item key=- */}
        {/* <Menu.Item key="history">
          <Link to="/history">History</Link>
        </Menu.Item> */}
        {/* {
          role ?
            <Menu.Item key="upload">
              <Link to="/product/upload">{t('uploadProducts')}</Link>
            </Menu.Item>
            : null
        }
        */}
        {
          role ?
            <Menu.Item key="enquiry">
              <Link to="/enquiry">{t('enquiry')}</Link>
            </Menu.Item>
            :
            null
        }



        <Menu.Item key="cart" style={{ marginBottom: -20 }}>
          <Badge count={user.userData && user.userData.cart.length}>
            <Link to="/user/cart" style={{ marginRight: -22, color: '#667777' }}>
              <Icon type="shopping-cart" style={{ fontSize: 30, marginBottom: 3 }} />
            </Link>
          </Badge>
        </Menu.Item>


        <Menu.Item key="logout">
          <a onClick={logoutHandler}>{t('logout')}</a>
        </Menu.Item>
      </Menu>
    )
  }
}

export default withTranslation()(withRouter(RightMenu));

