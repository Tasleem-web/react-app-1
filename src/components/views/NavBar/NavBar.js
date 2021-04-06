import React, { useState } from "react";
import LeftMenu from "./Sections/LeftMenu";
import RightMenu from "./Sections/RightMenu";
import { Drawer, Button } from "antd";
import Icon from "@ant-design/icons";
import "./Sections/Navbar.css";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function NavBar() {
  const { t, i18n } = useTranslation();
  const language = t("language");

  const [visible, setVisible] = useState(false);

  return (
    <nav
      className="menu"
      id="navbar_custom"
      style={{ position: "fixed", zIndex: 5, width: "100%" }}
      dir={language}
    >
      <div className="menu_left">
        <LeftMenu mode="horizontal" />
      </div>

      <div className="menu__logo">
        <Link to="/">
          <img src src={require("../../../assets/Amber-Oud-logo.webp").default} />
        </Link>
      </div>
      <div className="menu__container">
        <div className="menu_rigth">
          <RightMenu mode="horizontal" />
        </div>
        <Button
          className="menu__mobile-button"
          type="primary"
          onClick={(e) => setVisible(true)}
        >
          <Icon type="align-right" />
        </Button>
        <Drawer
          title="Menu"
          placement="right"
          className="menu_drawer"
          closable={false}
          onClose={(e) => setVisible(false)}
          visible={visible}
        >
          <LeftMenu mode="inline" />
          <RightMenu mode="inline" />
        </Drawer>
      </div>
    </nav>
  );
}

export default NavBar;
