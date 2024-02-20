import { IssuerDetailsCard } from '@/components/shared/IssuerDetailsCard';
import { Issuer } from '@/shared/typings/Issuer';

type IssuersListProps = {
  issuers: Issuer[];
};

export const IssuersList = ({ issuers }: IssuersListProps) => (
  <section className="grid grid-cols-3 gap-4">
    {issuers.map((issuer) => (
      <IssuerDetailsCard
        key={issuer.id}
        issuer={issuer}
      />
    ))}
  </section>
);
