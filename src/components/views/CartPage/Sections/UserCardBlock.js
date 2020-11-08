import React from 'react'
import { useTranslation } from 'react-i18next';

function UserCardBlock(props) {
    const { t, i18n } = useTranslation();



    const renderCartImage = (images) => {
        if (images.length > 0) {
            let image = images[0]
            return `http://localhost:5000/${image}`
        }
    }

    const renderItems = () => (
        props.products && props.products.map(product => (
            <tr key={product._id}>
                <td>
                    <img style={{ width: '70px' }} alt="product"
                        src={renderCartImage(product.images)} />
                </td>
                <td>{product.quantity} EA</td>
                <td>$ {product.price} </td>
                <td><button
                    onClick={() => props.removeItem(product._id)}
                >{t('remove')} </button> </td>
            </tr>
        ))
    )


    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>{t('productImage')}</th>
                        <th>{t('productQuantity')}</th>
                        <th>{t('productPrice')}</th>
                        <th>{t('removeFromCart')}</th>
                    </tr>
                </thead>
                <tbody>
                    {renderItems()}
                </tbody>
            </table>
        </div>
    )
}

export default UserCardBlock
