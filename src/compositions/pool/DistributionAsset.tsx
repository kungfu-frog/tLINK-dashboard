import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Card, CardContent, Button } from '@material-ui/core';
import { RootState } from 'types';
import Config from 'config';
import { selectTotalLocked, selectTotalUnlocked } from 'store/stake/stakeSelector';
import { numberWithDecimals } from 'utils';
import DistributeTokenImage from 'assets/img/token-distribute.png';

interface StateFromProps {
  totalLocked: ReturnType<typeof selectTotalLocked>;
  totalUnlocked: ReturnType<typeof selectTotalUnlocked>;
}
interface DispatchFromProps {}
interface OwnProps {}

type Props = StateFromProps & DispatchFromProps & OwnProps;

export const DistributionAsset = ({ totalLocked, totalUnlocked }: Props) => {
  return (
    <Card className='card card-h transparent'>
      <CardContent>
        <div className='section'>
          <div className='circle'>
            <img className="logo-image" src={DistributeTokenImage} alt='LinkStepper' />
          </div>
          <div className='center-h'>
            <h2>{`${Config.Token.name} (${Config.Token.symbol})`}</h2>
          </div>
          <div className='center-h'>
            <span className='text-number'>
              {numberWithDecimals(totalLocked, Config.Token.decimals, Config.Utils.decimals)}
            </span>
          </div>
          <div className='center-h mb-20'>
            <span className='text-small'>{`${Config.Token.symbol} earned`}</span>
          </div>
        </div>
        <div className='section'>
          <div className='mt-20' />
          <div className='center-h'>
            <Button
              variant='contained'
              className='btn-primary'
              onClick={() => {}}
              disabled
            >
              Harvest
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function mapStateToProps(
  state: RootState,
): StateFromProps {
  return {
    totalLocked: selectTotalLocked(state),
    totalUnlocked: selectTotalUnlocked(state),
  };
}
function mapDispatchToProps(dispatch: Dispatch): DispatchFromProps {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DistributionAsset);

