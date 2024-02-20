import { CreatorVerificationStatus } from './CreatorVerificationStatus';

export type Creator = {
  id: string;
  imageUrl: string;
  title: string;
  credentials: {
    email: string;
    walletAddress?: string;
    domain?: string;
  };
  status: CreatorVerificationStatus;
};
