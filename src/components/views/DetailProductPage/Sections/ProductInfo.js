import React, { useEffect, useState } from 'react'
import { Button, Descriptions } from 'antd';
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { useTranslation } from 'react-i18next';


function ProductInfo(props) {
    const { t, i18n } = useTranslation();

    const user = useSelector(state => state.user)
    console.log(props)
    const [Product, setProduct] = useState({})

    useEffect(() => {

        setProduct(props.detail)

    }, [props.detail])

    const addToCarthandler = () => {
        if (user && !user.userData.isAuth) {
            // props.history.push('/login')
            // <Route path="/login" />
            return <Redirect to="/login" />;
        } else {
            props.addToCart(props.detail._id)
        }
    }


    return (
        <div>
            <Descriptions title="Product Info">
                <Descriptions.Item label={t('price')}> {Product.price}</Descriptions.Item>
                <Descriptions.Item label={t("sold")}>{Product.sold}</Descriptions.Item>
                <Descriptions.Item label={t("view")}> {Product.views}</Descriptions.Item>
                <Descriptions.Item label={t("description")}> {Product.description}</Descriptions.Item>
            </Descriptions>

            <br />
            <br />
            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button size="large" shape="round" type="danger"
                    onClick={addToCarthandler}
                >
                    {t('addToCart')}
                </Button>
            </div>
        </div>
    )
}

export default ProductInfo
