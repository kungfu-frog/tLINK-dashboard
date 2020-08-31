import React from 'react';
import { Button, Card, CardContent } from '@material-ui/core';
import Config from 'config';
import { numberWithDecimals } from 'utils';
import StakeTokenImage from 'assets/img/token-stake.png';

interface OwnProps {
  allowed: boolean;
  staked: number;
  totalStaked: number;
  onApprove: () => void;
}

type Props = OwnProps;

export const StakingAsset = ({ totalStaked, staked, allowed, onApprove }: Props) => {
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
            <span className='text-number'>
              {numberWithDecimals(totalStaked, Config.StakingToken.decimals, Config.Utils.decimals)}
            </span>
          </div>
          <div className='center-h mb-20'>
            <span className='text-small'>{`${Config.StakingToken.symbol} Staked`}</span>
          </div>
        </div>
        {allowed ? (
          <React.Fragment>
            <div className='section'>
              <div className='mt-20' />
              <div className='center-h'>
                <Button
                  variant='contained'
                  className='btn-primary'
                  onClick={onApprove}
                >
                  {`Approve ${Config.StakingToken.symbol}`}
                </Button>
              </div>
            </div>
          </React.Fragment>
        ) : null}
      </CardContent>
    </Card>
  )
}

export default StakingAsset;

