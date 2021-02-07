import {
  BigNumber,
  providers,
  constants,
  utils,
  ContractReceipt,
} from 'ethers';

import {
  ERC20__factory,
} from './typechain';

async function getSymbol(
  provider: providers.Web3Provider,
  contractAddress: string,
): Promise<string> {
  try {
    const token = ERC20__factory.connect(contractAddress, provider);
    const symbol = await token.symbol();
    return symbol;
  } catch (e) {
    console.error(e);
    throw new Error('Cannot get symbol');
  }
}

async function getDecimals(
  provider: providers.Web3Provider,
  contractAddress: string,
): Promise<number> {
  try {
    const token = ERC20__factory.connect(contractAddress, provider);
    const decimals = await token.decimals();
    return decimals;
  } catch (e) {
    console.error(e);
    throw new Error('Cannot get decimals');
  }
}

async function getBalance(
  provider: providers.Web3Provider,
  contractAddress: string,
  owner: string,
): Promise<string> {
  try {
    const token = ERC20__factory.connect(contractAddress, provider);
    const decimals = await token.decimals();
    const balance = await token.balanceOf(owner);

    return utils.formatUnits(balance, decimals);
  } catch (e) {
    console.error(e);
    throw new Error('Cannot get balance');
  }
}

async function isAllowanceEnough(
  provider: providers.Web3Provider,
  contractAddress: string,
  owner: string,
  spender: string,
  amount: BigNumber,
): Promise<boolean> {
  try {
    const token = ERC20__factory.connect(contractAddress, provider);
    const allowance = await token.allowance(owner, spender);

    return allowance.gt(amount);
  } catch (e) {
    console.error(e);
    throw new Error('Cannot get check allowance');
  }
}

async function approveMaxAmount(
  provider: providers.Web3Provider,
  contractAddress: string,
  spender: string,
): Promise<ContractReceipt> {
  try {
    const token = ERC20__factory.connect(contractAddress, provider.getSigner());

    const tx = await token.approve(spender, constants.MaxUint256);
    const receipt = await tx.wait();
    return receipt;
  } catch (e) {
    console.error(e);
    throw new Error('Cannot approve');
  }
}

export {
  getBalance,
  getSymbol,
  getDecimals,
  isAllowanceEnough,
  approveMaxAmount,
};
