import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Button, Card, CardContent, Typography } from '@material-ui/core';
import moment from 'moment';

import { Container, Header, Timer } from 'components';
import { RootState } from 'types';
import { selectAccount } from 'store/account/accountSelector';
//import { web3client } from 'lib';

interface StateFromProps {
  account: ReturnType<typeof selectAccount>;
}
interface DispatchFromProps {}
interface OwnProps {}

type Props = StateFromProps & DispatchFromProps & OwnProps;

const getTimeLeft = () => {
  const now = moment.utc();
  const deadline = now.clone().hour(15).minute(0).second(0);
  if (now.isAfter(deadline)) {
    const tomorrow = moment.utc(new Date()).add(1, 'days').hour(15).minute(0).second(0);
    return tomorrow.diff(now, "seconds");
  } else {
    return deadline.diff(now, "seconds");
  }
}

export const HomeComposition = ({ account }: Props) => {
  const [rebaseEnable, setRebaseEnable] = React.useState<boolean>(false);
  const renderTokenInfo = () => (
    <React.Fragment>
      <Card className='card transparent'>
        <CardContent>
          <b>35000.000</b>
          <Typography>Total supply</Typography>
        </CardContent>
      </Card>
      <Card className='card transparent'>
        <CardContent>
          <b>{account ? account.address : '0.00'}</b>
          <Typography>TLINK Balance</Typography>
        </CardContent>
      </Card>
    </React.Fragment>
  );
  return (
    <div>
      <Header />
      <Container>
        <div className='flex screen-center'>
          <div style={{ flex: 1 }}>
            <h1 className='center-h'>Rebase at everyday 3PM UTC</h1>
            <Timer seconds={getTimeLeft() * 1000} />
            <div className='center-h'>
              <Button variant='contained' className='btn-primary' disabled={rebaseEnable}>Rebase</Button>
            </div>
          </div>
          <div className='center-h'>
            <div className='w-300'>
              {renderTokenInfo()}
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

function mapStateToProps(
  state: RootState,
): StateFromProps {
  return {
    account: selectAccount(state)
  };
}
function mapDispatchToProps(dispatch: Dispatch): DispatchFromProps {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeComposition)
