import React, { Suspense } from 'react';
import './App.css';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer"
import UploadProductPage from './views/UploadProductPage/UploadProductPage'
import DetailProductPage from './views/DetailProductPage/DetailProductPage';
import CartPage from './views/CartPage/CartPage';
import HistoryPage from './views/HistoryPage/HistoryPage';
import ContactUs from './views/ContactUs'
import { useTranslation } from 'react-i18next';
import PageNotFound from './views/PageNotFound'
import EnquiryPage from './views/EnquiryPage/EnquiryPage';
import ListingPage from './views/ListingPage/ListingPage.js';
import LandingPage from './views/LandingPage/LandingPage';


function App() {
  const { t, i18n } = useTranslation();
  const language = t('language');
  // console.log(language)
  return (

    <Suspense fallback={(<div id="loader"></div>)}>
      <NavBar />
      <div style={{ paddingTop: '75px', minHeight: 'calc(100vh - 80px)' }} dir={language}>
        {/* <div style={{ paddingTop: document.getElementById('navbar_custom').offsetHeight + 'px', minHeight: "calc(100vh - 80px)" }} dir={language}> */}
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/listing" component={Auth(ListingPage, null)} />
          <Route exact path="/contactus" component={Auth(ContactUs, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/product/upload" component={Auth(UploadProductPage, true)} />
          <Route exact path="/product/:productId" component={Auth(DetailProductPage, null)} />
          <Route exact path="/user/cart" component={Auth(CartPage, true)} />
          <Route exact path="/history" component={Auth(HistoryPage, true)} />
          <Route exact path="/enquiry" component={Auth(EnquiryPage, true)} />
          <Route component={PageNotFound} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
