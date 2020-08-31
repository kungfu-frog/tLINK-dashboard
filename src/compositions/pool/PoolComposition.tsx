import React, { useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Button, TextField } from '@material-ui/core';
import Config from 'config';

import { Container, Header } from 'components';
import { RootState } from 'types';
import { selectAccount } from 'store/account/accountSelector';
import { selectTotalStaked, selectStaked, selectStakingTokenAllowance } from 'store/stake/stakeSelector';

import StakingAssetCard from './StakingAsset';
import DistributionAssetCard from './DistributionAsset';
import { loadAllowance, loadStaked, loadLocked, stakeToken, unstakeToken } from 'store/stake/stakeActions';

interface StateFromProps {
  account: ReturnType<typeof selectAccount>;
  totalStaked: ReturnType<typeof selectTotalStaked>;
  staked: ReturnType<typeof selectStaked>;
  allowance: ReturnType<typeof selectStakingTokenAllowance>;
}
interface DispatchFromProps {
  loadAllowance: typeof loadAllowance,
  loadStaked: typeof loadStaked,
  loadLocked: typeof loadLocked,
  stakeToken: typeof stakeToken,
  unstakeToken: typeof unstakeToken,
}
interface OwnProps {}

type Props = StateFromProps & DispatchFromProps & OwnProps;

export const PoolComposition = ({ loadAllowance, loadStaked, loadLocked, staked, allowance, stakeToken, unstakeToken }: Props) => {
  const [stakeAmount, setStakeAmount] = React.useState<string>('');

  useEffect(() => {
    loadAllowance();
    loadStaked();
    loadLocked();
  });

  const handleStakeAmountInput = (event: any) => {
    setStakeAmount(event.target.value);
  };

  const handleStake = () => {
    stakeToken(parseFloat(stakeAmount));
  }

  const handleUnstake = () => {
    unstakeToken(staked);
  }

  return (
    <div>
      <Header />
      <Container>
        <div className='flex-v screen-center'>
          <div className='center-h mb-30'>
            <span className='text-title'>
              {`Deposit ${Config.StakingToken.symbol} and earn ${Config.Token.symbol}`}
            </span>
          </div>
          <div className='center-h wp-100 mt-30'>
            <DistributionAssetCard />
            <StakingAssetCard />
          </div>
          <div className='center-h mt-30'>
            <Button
              variant='contained'
              className='btn-primary'
              disabled={staked <= 0}
              onClick={handleUnstake}
            >
              Unstake
            </Button>
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
  return {
    loadAllowance: () => dispatch(loadAllowance()),
    loadStaked: () => dispatch(loadStaked()),
    loadLocked: () => dispatch(loadLocked()),
    stakeToken: (payload: number) => dispatch(stakeToken(payload)),
    unstakeToken: (payload: number) => dispatch(unstakeToken(payload)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PoolComposition)
