import { useTranslation } from '@/shared/utils/useTranslation';
import { BadgeType } from '@/shared/typings/BadgeType';
import { ClassValue, clsxm } from '@/shared/utils/clsxm';
import { Icon, IconName } from '../Icon';

const BADGE_PROPS_MAP: Record<
  BadgeType,
  {
    tKey: string;
    iconName: IconName;
    className: ClassValue;
    iconClassName?: ClassValue;
  }
> = {
  verification: {
    tKey: 'badges.verification',
    iconName: 'Verified',
    className: 'fill-verification text-verification bg-verification/5',
  },
  credential: {
    tKey: 'badges.credential',
    iconName: 'Caption',
    className: 'fill-credential text-credential bg-credential/10',
  },
  creator: {
    tKey: 'badges.creator',
    iconName: 'Caption',
    className: 'fill-creator text-creator bg-creator/10',
  },
  issuer: {
    tKey: 'badges.issuer',
    iconName: 'AssuredWorkload',
    className: 'fill-issuer text-issuer bg-issuer/10',
  },
  verified: {
    tKey: 'verified',
    iconName: 'CheckCircle',
    className:
      'fill-success text-success text-base gap-2 py-2 border border-transparent',
    iconClassName: 'h-5 w-5',
  },
  connected: {
    tKey: 'connected',
    iconName: 'CheckCircle',
    className:
      'fill-success text-success text-base gap-2 py-2 border border-transparent',
    iconClassName: 'h-5 w-5',
  },
  pending: {
    tKey: 'pending',
    iconName: 'Schedule',
    className:
      'fill-credential text-credential text-base gap-2 py-2 border border-transparent',
    iconClassName: 'h-5 w-5',
  },
  active: {
    tKey: 'active',
    iconName: 'CheckCircle',
    className:
      'fill-success text-success text-base gap-2 py-2 border border-transparent',
    iconClassName: 'h-5 w-5',
  },
  accepted: {
    tKey: 'accepted',
    iconName: 'CheckCircle',
    className:
      'fill-success text-success text-base gap-2 py-2 border border-transparent',
    iconClassName: 'h-5 w-5',
  },
  selected: {
    tKey: 'selected',
    iconName: 'CheckCircle',
    className:
      'fill-success text-success text-base gap-2 py-2 border border-transparent',
    iconClassName: 'h-5 w-5',
  },
};

type ColoredBadgeProps = {
  badgeType: BadgeType;
  className?: ClassValue;
};

export const ColoredBadge = ({ badgeType, className }: ColoredBadgeProps) => {
  const { t } = useTranslation('common');

  const {
    tKey,
    iconName,
    className: mapClassName,
    iconClassName: mapIconClassName,
  } = BADGE_PROPS_MAP[badgeType];

  return (
    <div
      className={clsxm(
        'flex items-center justify-center gap-1 self-start rounded-md px-2 py-0.5 text-sm',
        className,
        mapClassName,
      )}
      aria-hidden="true"
    >
      <Icon
        icon={iconName}
        className={clsxm('h-4 w-4', mapIconClassName)}
      />
      <span className="text-inherit">{t(tKey)}</span>
    </div>
  );
};
