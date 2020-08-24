import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';

import { Container, Header, Timer } from 'components';


interface StateFromProps {
}
interface DispatchFromProps {}
interface OwnProps {}

type Props = StateFromProps & DispatchFromProps & OwnProps;

export const AppComposition = () => {
  return (
    <div>
      <Header />
      <Container>
        <div className='flex screen-center'>
          <div style={{ flex: 1 }}>
            <Timer />
            <div className='center'>
              <Button variant='contained' className='btn-primary'>Rebase</Button>
            </div>
          </div>
          <div>
            <Timer />
          </div>
        </div>
      </Container>
    </div>
  )
}

function mapStateToProps(
  state: any,
): StateFromProps {
  return {
  };
}
function mapDispatchToProps(dispatch: Dispatch): DispatchFromProps {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppComposition)
