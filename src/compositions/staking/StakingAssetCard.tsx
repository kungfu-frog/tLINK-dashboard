import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Button, Card, CardContent, Divider } from '@material-ui/core';
import { RootState } from 'types';
import Config from 'config';
import { selectTotalStaked, selectStaked, selectStakingTokenAllowance } from 'store/stake/stakeSelector';
import { numberWithDecimals } from 'utils';
import StakeTokenImage from 'assets/img/token-stake.png';

interface StateFromProps {
  totalStaked: ReturnType<typeof selectTotalStaked>;
  staked: ReturnType<typeof selectStaked>;
  allowance: ReturnType<typeof selectStakingTokenAllowance>;
}
interface DispatchFromProps {}
interface OwnProps {}

type Props = StateFromProps & DispatchFromProps & OwnProps;

export const StakingAssetCard = ({ totalStaked, staked, allowance }: Props) => {
  return (
    <Card className='card card-h transparent'>
      <CardContent>
        <div className='section'>
          <div className='circle'>
            <img className="logo-image" src={StakeTokenImage} alt='Chainlink' />
          </div>
          <div className='center-h'>
            <h2>{`${Config.StakingToken.name} (${Config.StakingToken.symbol})`}</h2>
          </div>
          <div className='center-h'>
            Total Staked :&nbsp;
            <span>{numberWithDecimals(totalStaked, Config.StakingToken.decimals, Config.Utils.decimals)}</span>
          </div>
        </div>
        <Divider />
        <div className='section'>
          <div className='mt-20' />
          <div className='center-h'>
            Staked :&nbsp;
            <span>{numberWithDecimals(staked, Config.StakingToken.decimals, Config.Utils.decimals)}</span>
          </div>
        </div>
        {allowance <= 0 ? (
          <React.Fragment>
            <Divider />
            <div className='section'>
              <div className='mt-20' />
              <div className='center-h'>
                <Button variant='contained' className='btn-primary'>{`Approve ${Config.StakingToken.symbol}`}</Button>
              </div>
            </div>
          </React.Fragment>
        ) : null}
      </CardContent>
    </Card>
  )
}

function mapStateToProps(
  state: RootState,
): StateFromProps {
  return {
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
)(StakingAssetCard);

