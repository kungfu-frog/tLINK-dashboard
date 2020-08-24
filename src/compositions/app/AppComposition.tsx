import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';


interface StateFromProps {
}
interface DispatchFromProps {}
interface OwnProps {}

type Props = StateFromProps & DispatchFromProps & OwnProps;

export const AppComposition = () => {
  return (
    <div>
      LinkStepper
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
