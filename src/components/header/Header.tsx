import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { Container } from 'components';
import LogoImage from 'assets/img/token-distribute.png';
import { selectAccount } from 'store/account/accountSelector';
import { RootState } from 'types';
import { truncateAddress } from 'utils';
import Config from 'config';
import { loadAccount } from 'store/account/accountActions';

interface StateFromProps {
  account: ReturnType<typeof selectAccount>;
}
interface DispatchFromProps {
  loadAccount: typeof loadAccount;
}
type Props = StateFromProps & DispatchFromProps;

const Header: React.FC<Props> = ({ account, loadAccount }: Props) => {
  return (
    <Container>
      <div className="nav-header">
        <div className="center-v">
          <img className="logo-image" src={LogoImage} alt={Config.Token.name} />
          <span className="logo-text">{Config.Token.name}</span>
        </div>
        <div className="flex-h">
          <Button className='btn-text' href='/' >Home</Button>
          <Button className='btn-text' href='/farm' >Farm</Button>
        </div>
        {account ? (
          <Button
            variant='contained'
            className='btn-header'
            href={`${Config.etherscan}${account.address}`}
            target='_blank'
          >{truncateAddress(account.address)}</Button>
        ) : (
          <Button
            variant='contained'
            className='btn-header'
            onClick={loadAccount}
          >
            Connect Wallet
          </Button>
        )}
      </div>
    </Container>
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
  return {
    loadAccount: () => dispatch(loadAccount()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
