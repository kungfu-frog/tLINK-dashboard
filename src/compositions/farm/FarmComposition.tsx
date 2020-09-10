import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Config from 'config';

import { Container, Header } from 'components';
import { RootState } from 'types';
import { selectAccount } from 'store/account/accountSelector';
import PoolCard from './PoolCard';
import LogoImage from 'assets/img/token-distribute.png';

interface StateFromProps {
  account: ReturnType<typeof selectAccount>;
}
interface DispatchFromProps {}
interface OwnProps {}

type Props = StateFromProps & DispatchFromProps & OwnProps;

const FarmComposition = () => {
  return (
    <div>
      <Header />
      <Container>
        <div className='flex-v'>
          <div className='mt-30 mb-20 center-h'>
            <img className="logo-image large" src={LogoImage} alt={Config.Token.name} />
          </div>
          <div className='mb-20'>
            <div className='center-h text-title mb-10'>
              Select a farm.
            </div>
            <div className='center-h text-small'>
              Earn {Config.Token.symbol} tokens by providing liquidity.
            </div>
          </div>
          <div className='center-h wp-100 mt-30 home-container'>
            <PoolCard stakingToken={Config.StakingToken} picture='💸' poolUrl='/farm-shib' />
            <PoolCard stakingToken={Config.UniToken} picture='🌈' poolUrl='/farm-uni' />
          </div>
        </div>
      </Container>
    </div>
  )
}

function mapStateToProps(
  state: RootState,
): StateFromProps {
  return {
    account: selectAccount(state),
  };
}
function mapDispatchToProps(dispatch: Dispatch): DispatchFromProps {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FarmComposition)
