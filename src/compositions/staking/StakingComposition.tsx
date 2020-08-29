import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Button, Card, CardContent, TextField, Divider } from '@material-ui/core';
import Config from 'config';

import { Container, Header } from 'components';
import { RootState } from 'types';
import { selectAccount } from 'store/account/accountSelector';
import { selectTotalStaked, selectStaked, selectStakingTokenAllowance } from 'store/stake/stakeSelector';

import StakingAssetCard from './StakingAssetCard';
import DistributionAssetCard from './DistributionAssetCard';

interface StateFromProps {
  account: ReturnType<typeof selectAccount>;
  totalStaked: ReturnType<typeof selectTotalStaked>;
  staked: ReturnType<typeof selectStaked>;
  allowance: ReturnType<typeof selectStakingTokenAllowance>;
}
interface DispatchFromProps {}
interface OwnProps {}

type Props = StateFromProps & DispatchFromProps & OwnProps;

export const StakingComposition = ({ account, totalStaked, staked, allowance }: Props) => {
  return (
    <div>
      <Header />
      <Container>
        <div className='flex-v screen-center'>
          <div className='center-h'>
            <TextField
              className='staking-input'
              placeholder={`Enter ${Config.StakingToken.symbol} Amount`}
              variant='outlined'
              disabled
            />
            <Button variant='contained' className='btn-primary' disabled={allowance <= 0}>{`Stake ${Config.StakingToken.symbol}`}</Button>
          </div>
          <div className='center-h wp-100 mt-30'>
            <StakingAssetCard />
            <DistributionAssetCard />
          </div>
          <div className='center-h mt-30'>
            <Button variant='contained' className='btn-primary' disabled={staked <= 0}>Unstake</Button>
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
    totalStaked: selectTotalStaked(state),
    staked: selectStaked(state),
    allowance: selectStakingTokenAllowance(state),
  };
}
function mapDispatchToProps(dispatch: Dispatch): DispatchFromProps {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StakingComposition)
