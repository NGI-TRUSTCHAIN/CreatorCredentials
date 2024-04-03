export const truncateWalletAddress = (walletAddress: string) => {
  return truncateString(walletAddress, 10, 10);
};

export const truncateEmailAddress = (emailAddress: string) => {
  return truncateString(emailAddress, 10, 10);
};

function truncateString(
  string: string,
  keepAtHead: number,
  keepAtTail: number,
) {
  if (keepAtHead + keepAtTail >= string.length) {
    return string;
  }
  return string.slice(0, keepAtHead) + '...' + string.slice(-keepAtTail);
}
