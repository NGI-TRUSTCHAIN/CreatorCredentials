import { Button, ButtonProps } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from '@/shared/utils/useTranslation';
import { ClassValue, clsxm } from '@/shared/utils/clsxm';
import { Icon } from '../Icon';

const FOOTER_PORTAL_ID = 'footer-portal-root';

type FormFooterProps = {
  className?: string | ClassValue;
  children?: React.ReactNode;
};

export const FormFooter = ({ className, children }: FormFooterProps) => {
  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  return mount === true
    ? createPortal(
        <footer
          className={clsxm(
            'flex w-full justify-between border-t border-grey-2 bg-white px-8 py-3',
            className,
          )}
        >
          {children}
        </footer>,
        document.getElementById(FOOTER_PORTAL_ID)!,
      )
    : null;
};

const BackButton = (props: ButtonProps) => {
  const { t } = useTranslation('common');

  return (
    <Button
      color="text"
      {...props}
    >
      <Icon
        icon="ArrowLeft"
        className="me-2"
      />
      {t('back')}
    </Button>
  );
};

const NextButton = (props: ButtonProps) => {
  const { t } = useTranslation('common');

  return (
    <Button
      color="primary"
      {...props}
    >
      {t('next')}
      <Icon
        icon="ArrowRight"
        className="ms-2"
      />
    </Button>
  );
};

const ConfirmButton = (props: ButtonProps) => {
  const { t } = useTranslation('common');

  return (
    <Button
      color="primary"
      {...props}
    >
      {t('confirm')}
      <Icon
        icon="ArrowRight"
        className="ms-2"
      />
    </Button>
  );
};

const PortalRoot = () => <div id={FOOTER_PORTAL_ID} />;

FormFooter.PortalRoot = PortalRoot;
FormFooter.BackButton = BackButton;
FormFooter.NextButton = NextButton;
FormFooter.ConfirmButton = ConfirmButton;
