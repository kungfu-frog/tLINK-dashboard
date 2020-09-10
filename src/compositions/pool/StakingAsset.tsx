import React from 'react';
import { Button, Card, CardContent, Fab } from '@material-ui/core';
import Config from 'config';
import { numberWithDecimals } from 'utils';
import StakeTokenImage from 'assets/img/token-stake.png';
import { StakeDialog, UnstakeDialog } from 'components';

interface OwnProps {
  allowed: boolean;
  staked: number;
  totalStaked: number;
  balance: number;
  onApprove: () => void;
  onStake: (amount: number) => void;
  onUnstake: (amount: number) => void;
}

type Props = OwnProps;

export const StakingAsset = ({ totalStaked, staked, allowed, onApprove, onStake, onUnstake, balance }: Props) => {
  const [stakeDialogOpen, setStakeDialogOpen] = React.useState<boolean>(false);
  const [unstakeDialogOpen, setUnstakeDialogOpen] = React.useState<boolean>(false);

  return (
    <Card className='card card-h transparent'>
      <CardContent>
        <div className='section'>
          <div className='circle'>
            <img className="logo-image" src={StakeTokenImage} alt={Config.StakingToken.name} />
          </div>
          <div className='center-h'>
            <h2>{`${Config.StakingToken.name} (${Config.StakingToken.symbol})`}</h2>
          </div>
          <div className='center-h'>
            <span className='text-number'>
              {numberWithDecimals(staked, Config.StakingToken.decimals, Config.Utils.decimals)}
            </span>
          </div>
          <div className='center-h mb-20'>
            <span className='text-small'>{`${Config.StakingToken.symbol} Staked`}</span>
          </div>
        </div>
        {!allowed ? (
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
        ) : (
          <div className='section'>
            <div className='center-h mt-20'>
              <Fab className='btn-fab mr-20' disabled={staked <= 0} onClick={() => setUnstakeDialogOpen(true)}>-</Fab>
              <Fab className='btn-fab' onClick={() => setStakeDialogOpen(true)}>+</Fab>
            </div>
          </div>
        )}
      </CardContent>

      <StakeDialog
        open={stakeDialogOpen}
        poolBalance={Config.Pool.balance}
        stakeToken={Config.StakingToken}
        totalStaked={totalStaked}
        userBalance={balance}
        dialogTitle={(
          <div className="center-v">
            <img className="logo-image" src={StakeTokenImage} alt={Config.StakingToken.name} />
            <span className="logo-text">{`Stake ${Config.StakingToken.symbol}`}</span>
          </div>
        )}
        onStake={onStake}
        onClose={() => setStakeDialogOpen(false)}
      />
      <UnstakeDialog
        open={unstakeDialogOpen}
        stakeToken={Config.UniToken}
        totalStaked={totalStaked}
        staked={staked}
        userBalance={balance}
        dialogTitle={(
          <div className="center-v">
            <img className="logo-image" src={StakeTokenImage} alt={Config.StakingToken.name} />
            <span className="logo-text">{`Withdraw ${Config.StakingToken.symbol}`}</span>
          </div>
        )}
        onUnstake={onUnstake}
        onClose={() => setUnstakeDialogOpen(false)}
      />
    </Card>
  )
}

export default StakingAsset;

