import React from 'react';
import './Header.css';

class Header extends React.Component{
    render(){
        return (
            <header>
                <div className="title-wrapper">
                    <p id="title-text">RedZone</p>
                </div>
            </header>
        )
    }
}

export default Header;