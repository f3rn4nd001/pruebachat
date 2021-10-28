import React from "react";
import './css/ViewUse.css';

const ViewUser = ({children, imgPerfil, name, phone}) => {
    return(
        <div className="viewUser-container">
            <div className="container__user-info">
                <div className="container__user-info--img-perfil">
                    <img className="img-perfil" src={imgPerfil} alt="Imagen de perfil"/>
                </div>
                <p className="container__user-info--name">{name}</p>
                <p className="container__user-info--phone">{phone}</p>
                {children}
            </div>
        </div>
    );
}

export default ViewUser;