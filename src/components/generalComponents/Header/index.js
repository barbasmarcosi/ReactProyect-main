import React from 'react';
import './Header.css';
import Logo from '../../../Logos/logo192.png'    

function Header(props) {
    const {children} = props;
     
    return (
        <ul className='Header'>
            <li className='LogoLi'><img className='Logo' src={Logo} alt="Logo"/></li>
            <li className='Title'>Colegio de Psicologos de Trenque Lauquen</li>
            <li className='Children'>{children}</li>
        </ul>
    )
}

export { Header };