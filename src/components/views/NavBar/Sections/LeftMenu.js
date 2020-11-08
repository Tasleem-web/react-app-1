import React from 'react';
import { Menu } from 'antd';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './Navbar.css'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  const { t, i18n } = useTranslation();
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="home">
        <Link to="/">{t('Home')}</Link>
      </Menu.Item>
      <Menu.Item key="shope">
        <Link to="/listing">{t('shop')}</Link>
      </Menu.Item>
      <Menu.Item key="contactus">
        <Link to="/contactus">{t('contactus')}</Link>
      </Menu.Item>
    </Menu>
  )
}

export default LeftMenu