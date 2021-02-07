interface Asset {
  id: string;
  url: string;
  image: string;
  name: string;
  tokenName: string;
  tokenAddress: string;
  type: 'ERC721' | 'ERC1155';
}
