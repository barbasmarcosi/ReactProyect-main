import React from 'react';
import './NavBar.css';
import { MainContext } from '../MainContext';
function NavBar() {
    const {
        selectedNav, setSelectedNav
      } = React.useContext(MainContext);
    return (
        <ul className='NavBar'>
            <li onClick={() => setSelectedNav(1)} className={`Button ${(selectedNav === 1) && 'Button--active'}`}>Matriculados</li>
            <li onClick={() => setSelectedNav(2)} className={`Button ${(selectedNav === 2) && 'Button--active'}`}>Facturas</li>
            <li onClick={() => setSelectedNav(3)} className={`Button ${(selectedNav === 3) && 'Button--active'}`}>Retenciones</li>
            <li onClick={() => setSelectedNav(4)} className={`Button ${(selectedNav === 4) && 'Button--active'}`}>Liquidaciones</li>
        </ul>
    )
}

export { NavBar };