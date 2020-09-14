import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Button, Card, CardContent, Typography } from '@material-ui/core';
import Config from 'config';

import { Container, Header, Timer } from 'components';
import { RootState } from 'types';
import { selectAccount } from 'store/account/accountSelector';
import { selectTotalSupply } from 'store/token/tokenSelector';
import { numberWithDecimals, getTimeLeft, inWindow } from 'utils';
import { tokenRebase } from 'store/token/tokenActions';
//import { web3client } from 'lib';

interface StateFromProps {
  account: ReturnType<typeof selectAccount>;
  totalSupply: ReturnType<typeof selectTotalSupply>;
}
interface DispatchFromProps {
  rebase: typeof tokenRebase;
}
interface OwnProps {}

type Props = StateFromProps & DispatchFromProps & OwnProps;

export const HomeComposition = ({ account, totalSupply, rebase }: Props) => {
  const [rebaseEnable, setRebaseEnable] = React.useState<boolean>(inWindow(Config.Token.rebase.offset, Config.Token.rebase.length));

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
          <Typography>{Config.Token.symbol} Balance</Typography>
        </CardContent>
      </Card>
    </React.Fragment>
  );
  return (
    <div>
      <Header />
      <Container>
        <div className='home-container screen-center'>
          <div className='home-timer'>
            <h1 className='center-h text-gray'>{Config.Utils.homeText}</h1>
            <Timer
              started={!Config.Token.rebase.paused}
              seconds={!Config.Token.rebase.paused ? getTimeLeft(Config.Token.rebase.offset) * 1000 : 0}
              onEnd={() => setRebaseEnable(true)}
              onStart={() => setRebaseEnable(false)}
            />
            {Config.Token.rebase.paused ? (
              <div className='mb-10 center-h'>
                <span className='text-error'>We didn't start rebase yet.</span>
              </div>
            ) : null}
            <div className='center-h'>
              <Button variant='contained' className='btn-primary' disabled={!rebaseEnable} onClick={rebase}>Rebase</Button>
            </div>
          </div>
          <div className='home-info center-h'>
            <div className='home-info__container'>
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
  return {
    rebase: () => dispatch(tokenRebase()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeComposition)
