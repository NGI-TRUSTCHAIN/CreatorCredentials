import dynamic from 'next/dynamic';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function lazy(importFn: () => Promise<any>) {
  return dynamic(async () => {
    const m = await importFn();
    return typeof m.default === 'function' ? m.default : m.ReactComponent;
  });
}

// https://flowbite.com/icons/
export const icons = {
  AccountBalanceWallet: lazy(
    () => import('@/public/images/icons/account-balance-wallet.svg'),
  ),
  AccountCircle: lazy(() => import('@/public/images/icons/account-circle.svg')),
  AccountCircleFilled: lazy(
    () => import('@/public/images/icons/account-circle-filled.svg'),
  ),
  Add: lazy(() => import('@/public/images/icons/add.svg')),
  ArchiveFilled: lazy(() => import('@/public/images/icons/archive-filled.svg')),
  ArrowLeft: lazy(() => import('@/public/images/icons/arrow-left.svg')),
  ArrowLeftToBracket: lazy(
    () => import('@/public/images/icons/arrow-left-to-bracket.svg'),
  ),
  ArrowRight: lazy(() => import('@/public/images/icons/arrow-right.svg')),
  AssuredWorkload: lazy(
    () => import('@/public/images/icons/assured-workload.svg'),
  ),
  AssuredWorkloadFilled: lazy(
    () => import('@/public/images/icons/assured-workload-filled.svg'),
  ),
  CalendarMonth: lazy(() => import('@/public/images/icons/calendar-month.svg')),
  Caption: lazy(() => import('@/public/images/icons/caption.svg')),
  CaptionFilled: lazy(() => import('@/public/images/icons/caption-filled.svg')),
  Check: lazy(() => import('@/public/images/icons/check.svg')),
  CheckCircle: lazy(() => import('@/public/images/icons/check-circle.svg')),
  CheckCircleFilled: lazy(
    () => import('@/public/images/icons/check-circle-filled.svg'),
  ),
  Close: lazy(() => import('@/public/images/icons/close.svg')),
  ContentCopy: lazy(() => import('@/public/images/icons/content-copy.svg')),
  DesignServices: lazy(
    () => import('@/public/images/icons/design-services.svg'),
  ),
  DesignServicesFilled: lazy(
    () => import('@/public/images/icons/design-services-filled.svg'),
  ),
  Download: lazy(() => import('@/public/images/icons/download.svg')),
  EventFilled: lazy(() => import('@/public/images/icons/event-filled.svg')),
  EventTodayFilled: lazy(
    () => import('@/public/images/icons/event-today-filled.svg'),
  ),
  Groups: lazy(() => import('@/public/images/icons/groups.svg')),
  Home: lazy(() => import('@/public/images/icons/home.svg')),
  HomeFilled: lazy(() => import('@/public/images/icons/home-filled.svg')),
  Info: lazy(() => import('@/public/images/icons/info.svg')),
  Mail: lazy(() => import('@/public/images/icons/mail.svg')),
  Metamask: lazy(() => import('@/public/images/icons/metamask.svg')),
  MoreHoriz: lazy(() => import('@/public/images/icons/more-horiz.svg')),
  Payments: lazy(() => import('@/public/images/icons/payments.svg')),
  Public: lazy(() => import('@/public/images/icons/public.svg')),
  Refresh: lazy(() => import('@/public/images/icons/refresh.svg')),
  Search: lazy(() => import('@/public/images/icons/search.svg')),
  Schedule: lazy(() => import('@/public/images/icons/schedule.svg')),
  ScheduleFilled: lazy(
    () => import('@/public/images/icons/schedule-filled.svg'),
  ),
  UnarchiveFilled: lazy(
    () => import('@/public/images/icons/unarchive-filled.svg'),
  ),
  Verified: lazy(() => import('@/public/images/icons/verified.svg')),
  VerifiedFilled: lazy(
    () => import('@/public/images/icons/verified-filled.svg'),
  ),
  Warning: lazy(() => import('@/public/images/icons/warning.svg')),
  Web: lazy(() => import('@/public/images/icons/web.svg')),
};
