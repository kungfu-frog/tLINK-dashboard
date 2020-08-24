import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

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
        <Timer />
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
