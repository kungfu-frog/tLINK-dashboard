import React from 'react';
import { Button, Card, CardContent, Dialog, DialogTitle, TextField, DialogContent, DialogActions } from '@material-ui/core';
import Config from 'config';
import { numberWithDecimals } from 'utils';
import StakeTokenImage from 'assets/img/token-stake.png';

interface OwnProps {
  allowed: boolean;
  staked: number;
  totalStaked: number;
  onApprove: () => void;
  onStake: (amount: number) => void;
  onUnstake: (amount: number) => void;
}

type Props = OwnProps;

export const StakingAsset = ({ totalStaked, staked, allowed, onApprove, onStake, onUnstake }: Props) => {
  const [stakeDialogOpen, setStakeDialogOpen] = React.useState<boolean>(false);
  const [unstakeDialogOpen, setUnstakeDialogOpen] = React.useState<boolean>(false);
  const [stakeAmount, setStakeAmount] = React.useState<string>('');
  const [unstakeAmount, setUnstakeAmount] = React.useState<string>('');

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
            <div className='center-h'>
              <Button
                variant='contained'
                className='btn-primary small'
                onClick={() => setStakeDialogOpen(true)}
              >
                Stake
              </Button>
            </div>
            <div className='center-h mt-10'>
              <Button
                variant='contained'
                className='btn-primary small'
                disabled={staked <= 0}
                onClick={() => setUnstakeDialogOpen(true)}
              >
                Unstake
              </Button>
            </div>
          </div>
        )}
      </CardContent>
      <Dialog onClose={() => setStakeDialogOpen(false)} open={stakeDialogOpen}>
        <DialogTitle>{`Enter amount to stake`}</DialogTitle>
        <DialogContent>
          <TextField
            className='staking-input'
            variant='outlined'
            onChange={(event) => setStakeAmount(event.target.value)}
            value={stakeAmount}
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
        <DialogTitle>{`Enter amount to unstake`}</DialogTitle>
        <DialogContent>
          <TextField
            className='staking-input'
            variant='outlined'
            onChange={(event) => setUnstakeAmount(event.target.value)}
            value={unstakeAmount}
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

