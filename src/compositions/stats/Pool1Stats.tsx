import React, { useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Config from 'config';
import { RootState } from 'types';
import { selectPoolStaked, selectPoolTotalStaked, selectPoolEarned } from 'store/pool/poolSelector';
import { numberWithDecimals } from 'utils';
import { web3client, coingeckoclient, dexclient } from 'lib';


interface StateFromProps {
  staked: ReturnType<typeof selectPoolStaked>;
  earned: ReturnType<typeof selectPoolEarned>;
  totalStaked: ReturnType<typeof selectPoolTotalStaked>
}
interface DispatchFromProps {}
interface OwnProps {}

type Props = StateFromProps & DispatchFromProps & OwnProps;

const Pool1Stats = ({staked, totalStaked, earned}: Props) => {
  const [totalSupply, setTotalSupply] = React.useState<number>(0);
  const [token1Price, setToken1Price] = React.useState<number>(0);
  const [token2Price, setToken2Price] = React.useState<number>(0);

  useEffect(() => {
    web3client.getTotalSupply(web3client.stakingTokenContract)
      .then(res => setTotalSupply(res));
    coingeckoclient.getMemePrice().then(res => setToken1Price(res));
    dexclient.getTokenPrice().then(res => setToken2Price(res));
  });

  return (
    <React.Fragment>
      <h2 className='mb-20'>{Config.StakingToken.name} staking pool</h2>
      <div>=========== PRICES ============</div>
      <div>{`1 ${Config.StakingToken.symbol} = $ ${token1Price}`}</div>
      <div>{`1 ${Config.Token.symbol} = $ ${token2Price}`}</div>
      <br/>
      <div>=========== STAKING ============</div>
      <div>
        There are total :&nbsp;
        {`${numberWithDecimals(totalSupply, Config.StakingToken.decimals, Config.Utils.decimals)} ${Config.StakingToken.symbol}.`}
      </div>
      <div>
        There are total :&nbsp;
        {`${numberWithDecimals(totalStaked, Config.StakingToken.decimals, Config.Utils.decimals)} ${Config.StakingToken.symbol} staked in ${Config.Token.symbol}'s ${Config.StakingToken.symbol} staking pool.`}
      </div>
      <div>
        {`= $ ${0}`}
      </div>
      <br/>
      <div>
        {`You are staking : ${numberWithDecimals(staked, Config.StakingToken.decimals, Config.Utils.decimals)} ${Config.StakingToken.symbol} (${0}% of the pool)`}
      </div>
      <div>
        {`= $ ${0.00}`}
      </div>
      <br/>
      <div>=========== {Config.Token.symbol} REWARDS ============</div>
      <div>{`Claimable rewards : ${earned} ${Config.Token.symbol} = $${0}`}</div>
      <div>{`Hourly estimate : ${0} ${Config.Token.symbol} = $${0}`}</div>
      <div>{`Daily estimate : ${0} ${Config.Token.symbol} = $${0}`}</div>
      <div>{`Weekly estimate : ${0} ${Config.Token.symbol} = $${0}`}</div>
      <br />
      <div>{`Hourly ROI in USD : ${0}%`}</div>
      <div>{`Daily ROI in USD : ${0}%`}</div>
      <div>{`Weekly ROI in USD : ${0}%`}</div>
      <div>{`APY (unstable) : ${0}%`}</div>
    </React.Fragment>
  )
};

function mapStateToProps(
  state: RootState,
): StateFromProps {
  return {
    staked: selectPoolStaked(state),
    totalStaked: selectPoolTotalStaked(state),
    earned: selectPoolEarned(state),
  };
}
function mapDispatchToProps(dispatch: Dispatch): DispatchFromProps {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Pool1Stats);
