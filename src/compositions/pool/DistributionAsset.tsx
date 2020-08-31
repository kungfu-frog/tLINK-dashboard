import React from 'react';
import { Card, CardContent, Button } from '@material-ui/core';
import Config from 'config';
import { numberWithDecimals } from 'utils';
import DistributeTokenImage from 'assets/img/token-distribute.png';

interface OwnProps {
  earned: number;
  onHarvest: () => void;
}

type Props = OwnProps;

export const DistributionAsset = ({ earned, onHarvest }: Props) => {
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
              {numberWithDecimals(earned, Config.Token.decimals, Config.Utils.decimals)}
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
              onClick={onHarvest}
              disabled={earned <= 0}
            >
              Harvest
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default DistributionAsset;

