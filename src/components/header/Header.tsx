import React from 'react';
import { Button } from '@material-ui/core';
import { Container } from 'components';

interface Props {}

const Header: React.FC<Props> = () => {
  return (
    <Container>
      <div className="nav-header">
        <div>LinkStepper</div>
        <Button variant='contained' className='btn-primary'>Connect Wallet</Button>
      </div>
    </Container>
  )
}

export default Header;
