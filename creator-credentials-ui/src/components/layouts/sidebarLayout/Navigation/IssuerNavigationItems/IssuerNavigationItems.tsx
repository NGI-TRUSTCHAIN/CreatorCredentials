import React, { useMemo } from 'react';
import { useIssuerCreators } from '@/api/queries/useIssuerCreators';
import { CreatorVerificationStatus } from '@/shared/typings/CreatorVerificationStatus';
import { CredentialVerificationStatus } from '@/shared/typings/CredentialVerificationStatus';
import { useIssuersCredentials } from '@/api/queries/useIssuersCredentials';
import { NavigationRoute } from '../NavigationRoute';
import { NavigationSignOutButton } from '../NavigationSignOutButton';
import { NavigationItem } from '../NavigationItem';

function getIssuerRoutes(
  amountOfPendingConnections: number | undefined,
  amountOfPendingCredentials: number | undefined,
): NavigationRoute[] {
  return [
    {
      labelKey: 'navigation.home',
      href: '/issuer',
      iconName: 'Home',
      activeIconName: 'HomeFilled',
      exact: true,
    },
    {
      labelKey: 'navigation.verification',
      href: '/issuer/verification',
      iconName: 'Verified',
      activeIconName: 'VerifiedFilled',
    },
    {
      labelKey: 'navigation.creators',
      href: '/issuer/creators',
      iconName: 'DesignServices',
      activeIconName: 'DesignServicesFilled',
    },
    {
      labelKey: 'navigation.requested',
      href: '/issuer/creators/requested',
      suffixComponent: amountOfPendingConnections ? (
        <NavigationItem.CountBadge>
          {amountOfPendingConnections}
        </NavigationItem.CountBadge>
      ) : null,
      className: 'text-xs ms-4 py-1.5',
      iconName: 'Schedule',
      activeIconName: 'ScheduleFilled',
    },
    {
      labelKey: 'navigation.accepted',
      href: '/issuer/creators/accepted',
      className: 'text-xs ms-4 py-1.5',
      iconName: 'CheckCircle',
      activeIconName: 'CheckCircleFilled',
    },
    {
      labelKey: 'navigation.credentials',
      href: '/issuer/credentials',
      iconName: 'Caption',
      activeIconName: 'CaptionFilled',
    },
    {
      labelKey: 'navigation.requested',
      href: '/issuer/credentials/requested',
      suffixComponent: amountOfPendingCredentials ? (
        <NavigationItem.CountBadge>
          {amountOfPendingCredentials}
        </NavigationItem.CountBadge>
      ) : null,
      className: 'text-xs ms-4 py-1.5',
      iconName: 'Schedule',
      activeIconName: 'ScheduleFilled',
    },
    {
      labelKey: 'navigation.issued',
      href: '/issuer/credentials/issued',
      className: 'text-xs ms-4 py-1.5',
      iconName: 'CheckCircle',
      activeIconName: 'CheckCircleFilled',
    },
  ];
}

const ISSUER_SUB_ROUTES: NavigationRoute[] = [
  {
    labelKey: 'navigation.profile',
    href: '/issuer/profile',
    iconName: 'AccountCircle',
    activeIconName: 'AccountCircleFilled',
  },
  // {
  //   labelKey: 'navigation.credentials',
  //   href: '/issuer/self-credentials',
  //   iconName: 'Caption',
  //   activeIconName: 'CaptionFilled',
  // },
];

const mappedIssuerSubRoutes = ISSUER_SUB_ROUTES.map((props) => (
  <NavigationItem
    {...props}
    key={props.href}
  />
));
export const IssuerNavigationItems = () => {
  const { data: connections } = useIssuerCreators({
    params: {
      status: CreatorVerificationStatus.Pending,
    },
  });

  const { data: credentials } = useIssuersCredentials({
    params: { status: CredentialVerificationStatus.Pending },
  });

  const amountOfPendingConnections = connections?.creators.length;
  const amountOfPendingCredentials = credentials?.credentials.length;

  const mappedIssuerRoutes = useMemo(
    () =>
      getIssuerRoutes(
        amountOfPendingConnections,
        amountOfPendingCredentials,
      ).map((props) => (
        <NavigationItem
          {...props}
          key={props.href}
        />
      )),
    [amountOfPendingConnections, amountOfPendingCredentials],
  );

  return (
    <>
      <div className="pt-[6rem]">{mappedIssuerRoutes}</div>
      <div>
        {mappedIssuerSubRoutes}
        <NavigationSignOutButton />
      </div>
    </>
  );
};
