import './PageNotFound.css';
import React from 'react'
import { Result, Button } from 'antd';

export default function PageNotFound(props) {
  const backToHome = () => {
    props.history.push('/')
  }
  return (
    <div>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button type="primary" onClick={backToHome}>Back Home</Button>} />
    </div>
  )
}
