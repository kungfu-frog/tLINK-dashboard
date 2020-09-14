import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Config from 'config';
import { RootState } from 'types';


interface StateFromProps {
}
interface DispatchFromProps {}
interface OwnProps {}

type Props = StateFromProps & DispatchFromProps & OwnProps;

const Pool2Stats = () => {
  const [totalSupply, setTotalSupply] = React.useState<number>(0);
  const [token1Price, setToken1Price] = React.useState<number>(0);
  const [token2Price, setToken2Price] = React.useState<number>(0);

  return (
    <React.Fragment>
      <h2 className='mb-20'>{Config.UniToken.name} staking pool</h2>
      <div>=========== PRICES ============</div>
      <div>{`1 ${Config.UniToken.symbol} = $ ${token1Price}`}</div>
      <div>{`1 ${Config.Token.symbol} = $ ${token2Price}`}</div>
      <br/>
      <div>=========== STAKING ============</div>
      <div>
        There are total :&nbsp;
        {`${totalSupply} ${Config.UniToken.symbol}.`}
      </div>
      <div>
        There are total :&nbsp;
        {`${0} ${Config.UniToken.symbol} staked in ${Config.Token.symbol}'s ${Config.UniToken.symbol} staking pool.`}
      </div>
      <div>
        {`= $${0}`}
      </div>
      <br/>
      <div>
        {`You are staking : ${0} ${Config.UniToken.symbol} (${0}% of the pool)`}
      </div>
      <div>
        {`= $ ${0}`}
      </div>
      <br/>
      <div>=========== {Config.Token.symbol} REWARDS ============</div>
      <div>{`Claimable rewards : ${0} ${Config.Token.symbol} = $${0}`}</div>
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
  };
}
function mapDispatchToProps(dispatch: Dispatch): DispatchFromProps {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Pool2Stats);
