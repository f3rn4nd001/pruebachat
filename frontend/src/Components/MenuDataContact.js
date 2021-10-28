import React from 'react';
import './css/MenuDataContact.css';
import close from '../assets/close.svg';

const MenuDataContact = ({img, name, phone, btnShowMenu}) => {
    return(
        <div className="container-MenuDataContact">
           <img className="img_perfil" src={img} alt="Imagen de perfil del contacto" />
            <div className="container-data_person">
                <p className="name">{name}</p>
                <p className="phone">{phone}</p>
            </div>
            <button onClick={btnShowMenu} className="btn-close-menu"><img src={close} alt="Icono de cerrar menu" /></button>
            <div className="container__data">
                <div className="Item-group">
                    <p className="title">Categoría</p>
                    <p className="text">Global</p>
                </div>
                <div className="Item-group">
                    <p className="title">Nombre cliente</p>
                    <p className="text">Nombre cliente</p>
                </div>
                <div className="Item-group">
                    <p className="title">Apellido paterno</p>
                    <p className="text">Apellido paterno</p>
                </div>
                <div className="Item-group">
                    <p className="title">Apellido materno</p>
                    <p className="text">Apellido materno</p>
                </div>
                <div className="Item-group">
                    <p className="title">Correo electrónico</p>
                    <p className="text">Correo electrónico</p>
                </div>
                <div className="Item-group">
                    <p className="title">Observaciones</p>
                    <p className="text">Observaciones</p>
                </div>
            </div>
        </div>
    )
}
export default MenuDataContact; 