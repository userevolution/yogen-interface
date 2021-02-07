import {
  providers,
} from 'ethers';

export default function getLibrary(
  provider: any,
): providers.Web3Provider | providers.JsonRpcProvider {
  /*
  if (provider.host !== undefined) {
    const library = new providers.JsonRpcProvider(provider, 'any');
    library.pollingInterval = 15000;
    return library;
  }
  */

  const library = new providers.Web3Provider(provider, 'any');
  library.pollingInterval = 15000;
  return library;
}
