import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import Config from 'config';

import { Container, Header } from 'components';
import { RootState } from 'types';
import { selectAccount } from 'store/account/accountSelector';

import StakingAssetCard from './StakingAsset';
import DistributionAssetCard from './DistributionAsset';
import { selectPoolStaked, selectPoolEarned, selectPoolStakeAllowed } from 'store/pool/poolSelector';
import { poolStake, poolWithdraw, poolApproveToken, poolHarvest, poolExit } from 'store/pool/poolActions';

interface StateFromProps {
  account: ReturnType<typeof selectAccount>;
  staked: ReturnType<typeof selectPoolStaked>;
  earned: ReturnType<typeof selectPoolEarned>;
  allowed: ReturnType<typeof selectPoolStakeAllowed>;
}
interface DispatchFromProps {
  stake: typeof poolStake;
  unstake: typeof poolWithdraw;
  approve: typeof poolApproveToken;
  harvest: typeof poolHarvest;
  exit: typeof poolExit;
}
interface OwnProps {}

type Props = StateFromProps & DispatchFromProps & OwnProps;

export const PoolComposition = ({
  allowed,
  staked,
  approve,
  stake,
  unstake,
  earned,
  harvest,
  exit,
}: Props) => {
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
            <DistributionAssetCard
              earned={earned}
              onHarvest={harvest}
            />
            <StakingAssetCard
              allowed={allowed}
              staked={staked}
              totalStaked={0}
              onApprove={approve}
              onStake={stake}
              onUnstake={unstake}
            />
          </div>
          <div className='center-h mt-30'>
            <Button
              variant='contained'
              className='btn-primary'
              disabled={staked <= 0}
              onClick={exit}
            >
              Harvest & Withdraw
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
    //totalStaked: selectTotalStaked(state),
    staked: selectPoolStaked(state),
    allowed: selectPoolStakeAllowed(state),
    earned: selectPoolEarned(state),
  };
}
function mapDispatchToProps(dispatch: Dispatch): DispatchFromProps {
  return {
    stake: (payload: number) => dispatch(poolStake(payload)),
    unstake: (payload: number) => dispatch(poolWithdraw(payload)),
    approve: () => dispatch(poolApproveToken()),
    harvest: () => dispatch(poolHarvest()),
    exit: () => dispatch(poolExit()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PoolComposition)
