export const truncateWalletAddress = (walletAddress: string) => {
  return walletAddress.slice(0, 6) + '...' + walletAddress.slice(-6);
};
