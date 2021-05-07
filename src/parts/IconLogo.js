import React from 'react'
import Button from 'elements/Button'
import logo from 'assets/images/Logo-orange.png';

export default function IconLogo() {
    return (
        <Button href="/landingpage" type="link"> 
            <img className="brand-logo-icon" src={logo} alt="pocketlist-logo" ></img>
        </Button>
    )
}
