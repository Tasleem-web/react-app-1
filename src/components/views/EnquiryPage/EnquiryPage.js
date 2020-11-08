import React, { useEffect, useState } from 'react'
import { useDispatch } from "react-redux";
import Axios from 'axios';

function EnquiryPage(props) {
    const dispatch = useDispatch();
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        getAllEnquiry();
    }, [])

    const getAllEnquiry = () => {
        Axios.get('/api/getContact')
            .then(response => {
                console.log(response);
                console.log('here')
                setContacts(response['data']['message']);
                // if (response.data.success) {
                //     if (variables.loadMore) {
                //         setProducts([...Products, ...response.data.products])
                //     } else {
                //         setProducts(response.data.products)
                //     }
                //     setPostSize(response.data.postSize)
                // } else {
                //     alert('Failed to fectch product datas')
                // }
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div style={{ width: '80%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h1>Enquiry Entries</h1>
            </div>
            <br />

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email ID</th>
                        <th>Company Name</th>
                        <th>Telephone Number</th>
                        <th>Description</th>
                    </tr>
                </thead>

                <tbody>

                    {
                        contacts && contacts.length > 0 ?
                            contacts.map(item => (
                                <tr key={item._id}>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.companyName}</td>
                                    <td>{item.telephone}</td>
                                    <td>{item.description}</td>
                                </tr>
                            ))
                            :
                            // <tr>No Enquiries </tr>
                            null
                    }
                </tbody>
            </table>
        </div>
    )
}

export default EnquiryPage
