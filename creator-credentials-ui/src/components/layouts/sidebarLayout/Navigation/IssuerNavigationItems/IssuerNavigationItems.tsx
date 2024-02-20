import React from 'react';
import { NavigationItem } from '../NavigationItem';
import { NavigationSignOutButton } from '../NavigationSignOutButton';
import { NavigationRoute } from '../NavigationRoute';

const ISSUER_ROUTES: NavigationRoute[] = [
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
    suffixComponent: <NavigationItem.CountBadge>10</NavigationItem.CountBadge>,
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
];

const ISSUER_SUB_ROUTES: NavigationRoute[] = [
  {
    labelKey: 'navigation.profile',
    href: '/issuer/profile',
    iconName: 'AccountCircle',
    activeIconName: 'AccountCircleFilled',
  },
  {
    labelKey: 'navigation.credentials',
    href: '/issuer/credentials',
    iconName: 'Caption',
    activeIconName: 'CaptionFilled',
  },
];

const mappedIssuerRoutes = ISSUER_ROUTES.map((props) => (
  <NavigationItem
    {...props}
    key={props.href}
  />
));
const mappedIssuerSubRoutes = ISSUER_SUB_ROUTES.map((props) => (
  <NavigationItem
    {...props}
    key={props.href}
  />
));
export const IssuerNavigationItems = () => (
  <>
    <div className="pt-[6rem]">{mappedIssuerRoutes}</div>
    <div>
      {mappedIssuerSubRoutes}
      <NavigationSignOutButton />
    </div>
  </>
);
