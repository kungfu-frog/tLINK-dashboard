import React, { useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import Config from 'config';

import { Container, Header } from 'components';
import { RootState } from 'types';
import { selectAccount } from 'store/account/accountSelector';

import StakingAssetCard from './StakingAsset';
import DistributionAssetCard from './DistributionAsset';
import { selectUniStaked, selectUniEarned, selectUniStakeAllowed, selectStakeTokenBalance, selectUniTotalStaked, selectUniPeriodFinish } from 'store/uni/uniSelector';
import { uniStake, uniWithdraw, uniApproveToken, uniHarvest, uniExit, uniGetEarned, uniGetStaked } from 'store/uni/uniActions';
import { getDateLeft, secondsToDays, secondsToHours, secondsToMinutes, secondsToSeconds } from 'utils';

interface StateFromProps {
  account: ReturnType<typeof selectAccount>;
  staked: ReturnType<typeof selectUniStaked>;
  earned: ReturnType<typeof selectUniEarned>;
  allowed: ReturnType<typeof selectUniStakeAllowed>;
  totalStaked: ReturnType<typeof selectUniTotalStaked>
  stakeTokenBalance: ReturnType<typeof selectStakeTokenBalance>;
  deadline: ReturnType<typeof selectUniPeriodFinish>;
}
interface DispatchFromProps {
  stake: typeof uniStake;
  unstake: typeof uniWithdraw;
  approve: typeof uniApproveToken;
  harvest: typeof uniHarvest;
  exit: typeof uniExit;
  loadStaked: typeof uniGetStaked;
  loadEarned: typeof uniGetEarned;
}
interface OwnProps {}

type Props = StateFromProps & DispatchFromProps & OwnProps;

const UniComposition = ({
  allowed,
  staked,
  totalStaked,
  stakeTokenBalance,
  deadline,
  approve,
  stake,
  unstake,
  earned,
  harvest,
  exit,
  loadEarned,
  loadStaked,
}: Props) => {
  const [timeLeft, setTimeLeft] = React.useState<number>(0);

  useEffect(() => setTimeLeft(getDateLeft(deadline)), [deadline]);

  useEffect(() => {
    const timeInterval = setInterval(() => setTimeLeft(getDateLeft(deadline)), 1000);
    return () => clearInterval(timeInterval);
  });
  useEffect(() => {
    if (allowed) {
      loadEarned();
      loadStaked();
      const timeInterval = setInterval(() => {
        loadEarned();
        loadStaked();
      }, 30000);
      return () => clearInterval(timeInterval);
    }
  });
  return (
    <div>
      <Header />
      <Container>
        <div className='flex-v screen-center'>
          <div className='mb-20'>
            <div className='center-h text-title mb-10'>
              {`Deposit ${Config.UniToken.symbol} and earn ${Config.Token.symbol}`}
            </div>
            <div className={`center-h ${timeLeft > 0 ? 'text-small' : 'text-error'}`}>
              {timeLeft > 0 ? 
                `Time Left : ${secondsToDays(timeLeft)} day(s), ${secondsToHours(timeLeft)} hour(s), ${secondsToMinutes(timeLeft)} minute(s), ${secondsToSeconds(timeLeft)} second(s)` :
                `Pool has been finished or not started yet.`}
            </div>
          </div>
          <div className='center-h wp-100 mt-30'>
            <DistributionAssetCard
              earned={earned}
              onHarvest={harvest}
            />
            <StakingAssetCard
              allowed={allowed}
              staked={staked}
              totalStaked={totalStaked}
              balance={stakeTokenBalance}
              onApprove={approve}
              onStake={(amount: number) => stake(amount)}
              onUnstake={unstake}
            />
          </div>
          <div className='center-h mt-30 mb-30'>
            <Button
              variant='contained'
              className='btn-primary'
              disabled={staked <= 0}
              onClick={exit}
            >
              Harvest & Withdraw
            </Button>
          </div>
          <a className='bottom-left text-small' href={`${Config.etherscan}${Config.Token.address}`} target='_blank' rel="noopener noreferrer">
            {Config.Token.symbol} Contract
          </a>
          <a className='bottom-middle text-small' href={`${Config.etherscan}${Config.UniPool.address}`} target='_blank' rel="noopener noreferrer">
            Pool Contract
          </a>
          <a className='bottom-right text-small' href={`${Config.etherscan}${Config.UniToken.address}`} target='_blank' rel="noopener noreferrer">
            {Config.UniToken.symbol} Contract
          </a>
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
    totalStaked: selectUniTotalStaked(state),
    staked: selectUniStaked(state),
    allowed: selectUniStakeAllowed(state),
    earned: selectUniEarned(state),
    stakeTokenBalance: selectStakeTokenBalance(state),
    deadline: selectUniPeriodFinish(state),
  };
}
function mapDispatchToProps(dispatch: Dispatch): DispatchFromProps {
  return {
    stake: (payload: number) => dispatch(uniStake(payload)),
    unstake: (payload: number) => dispatch(uniWithdraw(payload)),
    approve: () => dispatch(uniApproveToken()),
    harvest: () => dispatch(uniHarvest()),
    exit: () => dispatch(uniExit()),
    loadEarned: () => dispatch(uniGetEarned()),
    loadStaked: () => dispatch(uniGetStaked()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UniComposition)
