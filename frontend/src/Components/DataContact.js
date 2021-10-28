import React from 'react';
import './css/sala.css';

const DataContact = ({title, text}) => {
    return(
        <div className="group-data">
            <p className="group-data__title">{title}</p>
            <p className="group-data__info">{text}</p>
        </div>
    );
}

export default DataContact;