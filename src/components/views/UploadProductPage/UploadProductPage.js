import React, { useState } from 'react'
import { Typography, Button, Form, message, Input, Icon, Select } from 'antd';
import FileUpload from '../../utils/FileUpload'
import Axios from 'axios';
import { useTranslation } from 'react-i18next';

const { Title } = Typography;
const { TextArea } = Input;

// const Continents = [
//     { key: 1, value: "United Arab Emirates (UAE) د.إ" },
//     { key: 2, value: "Africa R" },
//     { key: 3, value: "Europe €" },
//     { key: 4, value: "Asia ₹" }
// ];
const Continents = [
    { key: 1, value: "₹" }
];

const productCategories = [
    { id: 1, category: "Gifts & Boxes" },
    { id: 4, category: "Oil" },
    { id: 5, category: "Perfumes" }
]

function UploadProductPage(props) {
    const { Option } = Select;
    const [TitleValue, setTitleValue] = useState("")
    const [DescriptionValue, setDescriptionValue] = useState("")
    const [PriceValue, setPriceValue] = useState(0)
    const [ContinentValue, setContinentValue] = useState(1)
    const [Images, setImages] = useState([])
    const [selectedOption, setSelectedOption] = useState(Continents[0]);
    const [productCategory, setProductCategory] = useState(productCategories[0]);

    const { t, i18n } = useTranslation();


    const mystyle = {
        display: 'grid',
        gridTemplateColumns: '35% auto',
        width: '100%',
        gridGap: '20px'
    };

    // display: grid;grid-template-columns: 35% auto; width: 100%;grid-gap: 20px;

    const onTitleChange = (event) => {
        setTitleValue(event.currentTarget.value)
    }

    const onDescriptionChange = (event) => {
        setDescriptionValue(event.currentTarget.value)
    }

    const onPriceChange = (event) => {
        setPriceValue(event.currentTarget.value)
    }

    const onContinentsSelectChange = (event) => {
        setContinentValue(event.currentTarget.value)
    }

    const updateImages = (newImages) => {
        setImages(newImages)
    }

    const onSubmit = (event) => {
        event.preventDefault();


        if (!TitleValue || !DescriptionValue || !PriceValue ||
            !ContinentValue || !Images) {
            return alert('fill all the fields first!')
        }

        const variables = {
            writer: props.user.userData._id,
            title: TitleValue,
            description: DescriptionValue,
            price: PriceValue,
            images: Images,
            continents: ContinentValue,
            productCategories: productCategory
        }

        console.log(variables)
        Axios.post('/api/product/uploadProduct', variables)
            .then(response => {
                if (response.data.success) {
                    alert('Product Successfully Uploaded')
                    props.history.push('/')
                } else {
                    alert('Failed to upload Product')
                }
            })

    }

    const setSelectedOptionChanges = (e) => {
        setSelectedOption(Continents[e - 1])
    }

    const setSelectedCategoryOptionChanges = (e) => {
        setProductCategory(productCategories[e - 1])
    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}> {t('ProductDetails')}</Title>
            </div>


            <Form onSubmit={onSubmit} >

                {/* DropZone */}
                <FileUpload refreshFunction={updateImages} />

                <br />
                <br />
                <label>{t('title')}</label>
                <Input
                    onChange={onTitleChange}
                    value={TitleValue}
                />
                <br />
                <br />
                <label>{t('description')}</label>
                <TextArea
                    onChange={onDescriptionChange}
                    value={DescriptionValue}
                />
                <br />
                <br />
                <div style={{ display: "flex", alignItems: "center" }}>
                    <label>{t('price')}</label>
                    <span style={mystyle}>
                        <Select
                            style={{ margin: '0 8px' }}
                            value={selectedOption.value}
                            onChange={setSelectedOptionChanges}
                        >
                            {Continents.map(item => (
                                <Option
                                    value={item.value}
                                    key={item.key}
                                    value={item.key}
                                >
                                    {item.value}
                                </Option>
                            ))}
                        </Select>
                        <Input
                            onChange={onPriceChange}
                            value={PriceValue}
                            type="number"
                        />
                    </span>
                </div>
                {/* <br /><br />
                <select onChange={onContinentsSelectChange} value={ContinentValue}>
                    {Continents.map(item => (
                        <option key={item.key} value={item.key}>{item.value} </option>
                    ))}
                </select> */}
                <br />
                <div style={{ display: "grid", alignItems: "center" }}>
                    <label>{t('productCategories')}</label>
                    <div>
                        <Select
                            value={productCategory?.category}
                            onChange={setSelectedCategoryOptionChanges}
                        >
                            {productCategories.map(item => (
                                <Option
                                    value={item.category}
                                    key={item.id}
                                    value={item.id}
                                >
                                    {item.category}
                                </Option>
                            ))}
                        </Select>
                    </div>
                </div>
                <br />
                <Button
                    onClick={onSubmit}
                >
                    {t('submit')}
                </Button>

            </Form>

        </div>
    )
}

export default UploadProductPage
