import React from 'react';
import { Button, Card, CardContent, Dialog, DialogTitle, Fab, TextField, DialogContent, DialogActions } from '@material-ui/core';
import Config from 'config';
import { numberWithDecimals } from 'utils';

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
  const [stakeAmount, setStakeAmount] = React.useState<string>('');
  const [unstakeAmount, setUnstakeAmount] = React.useState<string>('');

  const handleStake = () => {
    const _amount = parseFloat(stakeAmount);
    const _balance = numberWithDecimals(balance, Config.StakingToken.decimals);
    if (_amount > _balance || _amount <= 0) {
      alert('Invalid stake amount');
    } else {
      onStake(_amount);
      setStakeDialogOpen(false);
    }
  }

  const handleUnstake = () => {
    const _amount = parseFloat(unstakeAmount);
    const _staked = numberWithDecimals(staked, Config.StakingToken.decimals);
    if (_amount > _staked || _amount <= 0) {
      alert('Invalid withdraw amount');
    } else {
      onUnstake(_amount);
      setUnstakeDialogOpen(false);
    }
  }

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
      <Dialog onClose={() => setStakeDialogOpen(false)} open={stakeDialogOpen}>
        <DialogTitle>
          <div className="center-v">
            <span role='img' aria-label={Config.UniToken.symbol}>🌱</span>
            <span className="logo-text">{`Stake ${Config.UniToken.symbol}`}</span>
          </div>
        </DialogTitle>
        <DialogContent>
          <div className='mb-10 text-small'>
            Community distributes <b>{Config.UniPool.balance}</b>&nbsp; {Config.Token.symbol} as rewards
          </div>
          <div className='mb-10'>
            Total staked {Config.UniToken.symbol} by Community is &nbsp;
            <b>{numberWithDecimals(totalStaked, Config.UniToken.decimals, Config.Utils.decimals)}</b>
          </div>
          <span>
            Your {Config.UniToken.symbol} Balance is&nbsp;
            <b>{numberWithDecimals(balance, Config.UniToken.decimals, Config.Utils.decimals)}</b>
          </span>
          <TextField
            className='staking-input mt-50'
            variant='outlined'
            placeholder='Enter amount to stake'
            onChange={(event) => setStakeAmount(event.target.value)}
            value={stakeAmount}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button
            className='btn-text'
            onClick={handleStake}
          >
            Stake
          </Button>
          <Button
            className='btn-text'
            onClick={() => { setStakeDialogOpen(false); setStakeAmount('') }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog onClose={() => setUnstakeDialogOpen(false)} open={unstakeDialogOpen}>
        <DialogTitle>
          <div className="center-v">
            <span role='img' aria-label={Config.UniToken.symbol}>🌱</span>
            <span className="logo-text">{`Withdraw ${Config.UniToken.symbol}`}</span>
          </div>
        </DialogTitle>
        <DialogContent>
          <div className='mb-10'>
            Total staked {Config.UniToken.symbol} by Community is &nbsp;
            <b>{numberWithDecimals(totalStaked, Config.UniToken.decimals, Config.Utils.decimals)}</b>
          </div>
          <span>
            Your {Config.UniToken.symbol} Balance is&nbsp;
            <b>{numberWithDecimals(balance, Config.UniToken.decimals, Config.Utils.decimals)}</b>
          </span>
          <TextField
            className='staking-input mt-50'
            variant='outlined'
            placeholder='Enter amount to withdraw'
            onChange={(event) => setUnstakeAmount(event.target.value)}
            value={unstakeAmount}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button
            className='btn-text'
            onClick={handleUnstake}
          >
            Unstake
          </Button>
          <Button
            className='btn-text'
            onClick={() => { setUnstakeDialogOpen(false); setUnstakeAmount('') }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  )
}

export default StakingAsset;

