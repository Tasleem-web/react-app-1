import React, { useState } from 'react'
import { Input } from 'antd';
import { useTranslation } from 'react-i18next';

const { Search } = Input;

function SearchFeature(props) {
    const { t, i18n } = useTranslation();
    const [SearchTerms, setSearchTerms] = useState("")

    const onChangeSearch = (event) => {
        setSearchTerms(event.currentTarget.value)

        props.refreshFunction(event.currentTarget.value)

    }
    const typing = t('searchByTyping');

    return (
        <div>
            <Search
                value={SearchTerms}
                onChange={onChangeSearch}
                placeholder={typing}
            />
        </div>
    )
}

export default SearchFeature
