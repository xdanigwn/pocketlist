import React from 'react'
import Button from 'elements/Button'
import profile from 'assets/images/Profile.svg';

export default function IconProfile() {
    return (
        <Button href="/landingpage" type="link"> 
            <img className="profile-icon" src={profile} alt="pocketlist-profile" ></img>
            
        </Button>
    )
}
