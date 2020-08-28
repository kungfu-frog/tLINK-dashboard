import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Button, Card, CardContent, TextField, Divider } from '@material-ui/core';
import Config from 'config';

import { Container, Header, Timer } from 'components';
import { RootState } from 'types';
import { selectAccount } from 'store/account/accountSelector';
import { numberWithDecimals } from 'utils';
//import { web3client } from 'lib';
import StakeTokenImage from 'assets/img/token-stake.png';
import DistributeTokenImage from 'assets/img/token-distribute.png';

interface StateFromProps {
  account: ReturnType<typeof selectAccount>;
}
interface DispatchFromProps {}
interface OwnProps {}

type Props = StateFromProps & DispatchFromProps & OwnProps;

export const StakingComposition = ({ account }: Props) => {

  const renderStakeAssetCard = () => (
    <Card className='card card-h transparent'>
      <CardContent>
        <div className='section'>
          <div className='circle'>
            <img className="logo-image" src={StakeTokenImage} alt='Chainlink' />
          </div>
          <div className='center-h'>
            <h2>Chainlink (LINK)</h2>
          </div>
          <div className='center-h'>
            Total Staked :&nbsp;
            <span>3500</span>
          </div>
        </div>
        <Divider />
        <div className='section'>
          <div className='mt-20' />
          <div className='center-h'>
            Staked :&nbsp;
            <span>100</span>
          </div>
        </div>
        <Divider />
        <div className='section'>
          <div className='mt-20' />
          <div className='center-h'>
            <Button variant='contained' className='btn-primary'>Approve</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const renderDistributeAssetCard = () => (
    <Card className='card card-h transparent'>
      <CardContent>
        <div className='section'>
          <div className='circle'>
            <img className="logo-image" src={DistributeTokenImage} alt='LinkStepper' />
          </div>
          <div className='center-h'>
            <h2>LinkStepper (TLINK)</h2>
          </div>
          <div className='center-h'>
            Total Locked :&nbsp;
            <span>3500</span>
          </div>
        </div>
        <Divider />
        <div className='section'>
          <div className='mt-20' />
          <div className='center-h'>
            Total Unlocked :&nbsp;
            <span>100</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div>
      <Header />
      <Container>
        <div className='flex-v screen-center'>
          <div className='center-h'>
            <TextField className='staking-input' variant='outlined' />
            <Button variant='contained' className='btn-primary'>{`Stake ${Config.StakingToken.symbol}`}</Button>
          </div>
          <div className='center-h wp-100 mt-30'>
            {renderStakeAssetCard()}
            {renderDistributeAssetCard()}
          </div>
          <div className='center-h mt-30'>
            <Button variant='contained' className='btn-header'>Unstake</Button>
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
  };
}
function mapDispatchToProps(dispatch: Dispatch): DispatchFromProps {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StakingComposition)
