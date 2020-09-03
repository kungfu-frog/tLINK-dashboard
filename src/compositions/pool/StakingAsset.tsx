import React from 'react';
import { Button, Card, CardContent, Dialog, DialogTitle, Fab, TextField, DialogContent, DialogActions } from '@material-ui/core';
import Config from 'config';
import { numberWithDecimals } from 'utils';
import StakeTokenImage from 'assets/img/token-stake.png';

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
      <Dialog onClose={() => setStakeDialogOpen(false)} open={stakeDialogOpen}>
        <DialogTitle>
          <div className="center-v">
            <img className="logo-image" src={StakeTokenImage} alt={Config.StakingToken.name} />
            <span className="logo-text">{`Stake ${Config.StakingToken.symbol}`}</span>
          </div>
        </DialogTitle>
        <DialogContent>
          <div className='mb-10 text-small'>
            Community distributes <b>{Config.Pool.balance}</b>&nbsp; {Config.Token.symbol} as rewards
          </div>
          <div className='mb-10'>
            Total staked {Config.StakingToken.symbol} by Community is &nbsp;
            <b>{numberWithDecimals(totalStaked, Config.StakingToken.decimals, Config.Utils.decimals)}</b>
          </div>
          <span>
            Your {Config.StakingToken.symbol} Balance is&nbsp;
            <b>{numberWithDecimals(balance, Config.StakingToken.decimals, Config.Utils.decimals)}</b>
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
            onClick={() => { onStake(parseFloat(stakeAmount)); setStakeDialogOpen(false); }}
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
            <img className="logo-image" src={StakeTokenImage} alt={Config.StakingToken.name} />
            <span className="logo-text">{`Withdraw ${Config.StakingToken.symbol}`}</span>
          </div>
        </DialogTitle>
        <DialogContent>
          <div className='mb-10'>
            Current total staked balance is&nbsp;
            <b>{numberWithDecimals(totalStaked, Config.StakingToken.decimals, Config.Utils.decimals)}</b>
          </div>
          <span>
            Your {Config.StakingToken.symbol} Balance is&nbsp;
            <b>{numberWithDecimals(balance, Config.StakingToken.decimals, Config.Utils.decimals)}</b>
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
            onClick={() => { onUnstake(parseFloat(unstakeAmount)); setUnstakeDialogOpen(false); }}
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

