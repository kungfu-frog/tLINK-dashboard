import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RootState } from 'types';
import { Header, Container } from 'components';

import Pool1Stats from './Pool1Stats';
import Pool2Stats from './Pool2Stats';


interface StateFromProps {}
interface DispatchFromProps {}
interface OwnProps {}

type Props = StateFromProps & DispatchFromProps & OwnProps;

const StatsComposition = () => {
  return (
    <div>
      <Header />
      <Container>
        <div className='flex-h'>
          <div className='card mr-30'>
            <Pool1Stats />
          </div>
          <div className='card'>
            <Pool2Stats />
          </div>
        </div>
      </Container>
    </div>
  )
};

function mapStateToProps(
  state: RootState,
): StateFromProps {
  return {
  };
}
function mapDispatchToProps(dispatch: Dispatch): DispatchFromProps {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StatsComposition);
