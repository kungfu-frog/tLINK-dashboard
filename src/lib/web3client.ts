import Web3 from 'web3';
import Config from 'config';

let web3 = (window as any).web3;
if (typeof web3 !== 'undefined') {
  web3 = new Web3(Web3.givenProvider);
} else {
  web3 = new Web3(new Web3.providers.HttpProvider(Config.provider));
}

const tokenContract: any = getContract(Config.Token.abi, Config.Token.address);
const orchestratorContract: any = getContract(Config.Orchestrator.abi, Config.Orchestrator.address);
const stakingTokenContract: any = getContract(Config.StakingToken.abi, Config.StakingToken.address);
const poolContract: any = getContract(Config.Pool.abi, Config.Pool.address);

/**
 * Common Contract Functions
 */
function getContract(abi: any, address: string) {
  return new web3.eth.Contract(abi, address);
}

async function getAccount(): Promise<string | undefined> {
  await web3.eth.currentProvider.enable();
  const accounts = await web3.eth.getAccounts();
  return accounts ? accounts[0] : undefined;
}

async function getBalance(contract: any, address?: string): Promise<number> {
  const _address = address || getAccount();
  const result = await contract.methods.balanceOf(_address).call();
  return parseInt(result);
}

async function getTotalSupply(): Promise<number> {
  const result = await tokenContract.methods.totalSupply().call();
  return parseInt(result);
}

async function rebase() {
  await orchestratorContract.methods.rebase().send()
    .on('error', function(error: any, receipt: any) {
      console.log(error, receipt);
    });
}

function promisify(fn: (cb: any) => any): Promise<any> {
  return new Promise((resolve, reject) => {
      fn((err: any, result: any) => {
          if (err) {
              return reject(err);
          }

          resolve(result);
      });
  });
}

async function transferToken(amount: number, to: string): Promise<void> {
  await promisify((f) => tokenContract.transfer(amount, to, f));
}

async function approve(contract: any, address: string, from: string) {
  const max = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';
  await contract.methods.approve(address, max).send({ from })
    .on('error', function(error: any, receipt: any) {
      console.log(error, receipt);
    });
}

async function allowance(contract: any, owner: string, spender: string) {
  const result = await contract.methods.allowance(owner, spender).call();
  return result;
}

async function totalStaked() {
  const result = await poolContract.methods.totalStaked().call();
  return result;
}

async function totalStakedFor(address: string) {
  const result = await poolContract.methods.totalStakedFor(address).call();
  return result;
}

async function totalLocked() {
  const result = await poolContract.methods.totalLocked().call();
  return result;
}

async function totalUnlocked() {
  const result = await poolContract.methods.totalUnlocked().call();
  return result;
}

async function stake(amount: number, from: string) {
  await poolContract.methods.stake(amount, '0x40').send({ from })
    .on('error', function(error: any, receipt: any) {
      console.log(error, receipt);
    });
}

async function unstake(amount: number, from: string) {
  await poolContract.methods.unstake(amount, '0x40').send({ from })
    .on('error', function(error: any, receipt: any) {
      console.log(error, receipt);
    });
}

/**
 * StakingRewards Pool Contract Functions
 */
async function poolStake(amount: number, from: string) {
  await poolContract.methods.stake(amount).send({ from })
    .on('error', function(error: any, receipt: any) {
      console.log(error, receipt);
    });
}

async function poolWithdraw(amount: number, from: string) {
  await poolContract.methods.withdraw(amount).send({ from })
    .on('error', function(error: any, receipt: any) {
      console.log(error, receipt);
    });
}

async function poolHarvest(from: string) {
  await poolContract.methods.getReward().send({ from })
    .on('error', function(error: any, receipt: any) {
      console.log(error, receipt);
    });
}

async function poolExit(from: string) {
  await poolContract.methods.exit().send({ from })
    .on('error', function(error: any, receipt: any) {
      console.log(error, receipt);
    });
}

async function poolGetEarned(address: string): Promise<number> {
  const result = await poolContract.methods.earned(address).call();
  return result;
}

export default {
  getContract,
  getAccount,
  getBalance,
  getTotalSupply,
  rebase,
  allowance,
  approve,
  totalStaked,
  totalStakedFor,
  totalLocked,
  totalUnlocked,
  stake,
  unstake,
  // Yield farming pool
  poolStake,
  poolWithdraw,
  poolHarvest,
  poolExit,
  poolGetEarned,
  // Utils
  promisify,
  transferToken,
  // Contracts
  tokenContract,
  orchestratorContract,
  stakingTokenContract,
  poolContract,
};
