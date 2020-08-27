import React from 'react';
import { Button } from '@material-ui/core';
import { Container } from 'components';
import LogoImage from 'assets/img/logo.png';

interface Props {}

const Header: React.FC<Props> = () => {
  return (
    <Container>
      <div className="nav-header">
        <div className="center-v">
          <img className="logo-image" src={LogoImage} alt='LinkStepper' />
          <span className="logo-text">LinkStepper</span>
        </div>
        <div className="flex-h">
          <Button className='btn-text' href='/' >Home</Button>
          <Button className='btn-text' href='/distribute' >Distribute</Button>
        </div>
        <Button variant='contained' className='btn-header'>Connect Wallet</Button>
      </div>
    </Container>
  )
}

export default Header;
