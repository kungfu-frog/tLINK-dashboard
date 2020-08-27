import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Button, Card, CardContent, Typography } from '@material-ui/core';
import Config from 'config';

import { Container, Header, Timer } from 'components';
import { RootState } from 'types';
import { selectAccount } from 'store/account/accountSelector';
import { selectTotalSupply } from 'store/token/tokenSelector';
import { numberWithDecimals, getTimeLeft } from 'utils';
//import { web3client } from 'lib';

interface StateFromProps {
  account: ReturnType<typeof selectAccount>;
  totalSupply: ReturnType<typeof selectTotalSupply>;
}
interface DispatchFromProps {}
interface OwnProps {}

type Props = StateFromProps & DispatchFromProps & OwnProps;

export const HomeComposition = ({ account, totalSupply }: Props) => {
  const [rebaseEnable, setRebaseEnable] = React.useState<boolean>(true);

  const renderTokenInfo = () => (
    <React.Fragment>
      <Card className='card card-v transparent'>
        <CardContent>
          <b>{numberWithDecimals(totalSupply, Config.Token.decimals, Config.Utils.decimals)}</b>
          <Typography>Total supply</Typography>
        </CardContent>
      </Card>
      <Card className='card card-v transparent'>
        <CardContent>
          <b>{numberWithDecimals(( account ? account.balance : 0 ), Config.Token.decimals, Config.Utils.decimals)}</b>
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
            <Timer
              seconds={getTimeLeft(Config.Token.rebase.offset) * 1000}
              onEnd={() => setRebaseEnable(false)}
            />
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
    account: selectAccount(state),
    totalSupply: selectTotalSupply(state),
  };
}
function mapDispatchToProps(dispatch: Dispatch): DispatchFromProps {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeComposition)
