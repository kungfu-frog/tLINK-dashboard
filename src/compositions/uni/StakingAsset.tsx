import React from 'react';
import { Button, Card, CardContent, Fab } from '@material-ui/core';
import Config from 'config';
import { numberWithDecimals } from 'utils';
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
            <span role='img' aria-label={Config.UniToken.symbol}>🌱</span>
          </div>
          <div className='center-h'>
            <h2>{`${Config.UniToken.name} (${Config.UniToken.symbol})`}</h2>
          </div>
          <div className='center-h'>
            <span className='text-number'>
              {numberWithDecimals(staked, Config.UniToken.decimals, Config.Utils.decimals)}
            </span>
          </div>
          <div className='center-h mb-20'>
            <span className='text-small'>{`${Config.UniToken.symbol} Staked`}</span>
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
                  {`Approve ${Config.UniToken.symbol}`}
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
        poolBalance={Config.UniPool.balance}
        stakeToken={Config.UniToken}
        totalStaked={totalStaked}
        userBalance={balance}
        dialogTitle={(
          <div className="center-v">
            <span role='img' aria-label={Config.UniToken.symbol}>🌱</span>
            <span className="logo-text">{`Stake ${Config.UniToken.symbol}`}</span>
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
            <span role='img' aria-label={Config.UniToken.symbol}>🌱</span>
            <span className="logo-text">{`Withdraw ${Config.UniToken.symbol}`}</span>
          </div>
        )}
        onUnstake={onUnstake}
        onClose={() => setUnstakeDialogOpen(false)}
      />
    </Card>
  )
}

export default StakingAsset;

