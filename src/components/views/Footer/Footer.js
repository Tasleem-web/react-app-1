import React from 'react'
import Icon from '@ant-design/icons';
import { WhatsAppOutlined, StarFilled, StarTwoTone } from '@ant-design/icons';
function Footer() {
    return (
        <div style={{
            height: '80px', display: 'flex',
            flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', fontSize: '1rem'
        }}>
            <div className="social-icon">
                <a href="https://www.facebook.com/sharer/sharer.php?u=amberoud.com/" target="_blank"
                    style={{
                        fontSize: '30px', marginRight: '10px'
                    }}>
                    <Icon type="facebook" />
                </a>
                <a href="https://www.facebook.com/sharer/sharer.php?u=amberoud.com/" target="_blank">
                    <Icon type="whatsapp" />
                </a>
                <a href="https://www.facebook.com/sharer/sharer.php?u=amberoud.com/" target="_blank"
                    style={{
                        fontSize: '30px', marginRight: '10px'
                    }}>
                    <Icon type="instagram" />
                </a>
            </div>
        </div>
    )
}

export default Footer