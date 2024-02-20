import { CustomFlowbiteTheme, Tooltip } from 'flowbite-react';
import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';

const tooltipTheme: CustomFlowbiteTheme['tooltip'] = {
  target: 'max-w-[100%] overflow-hidden text-ellipsis',
};

type EmailDomainProps = {
  domain: string;
};

export const EmailDomain = ({ domain }: EmailDomainProps) => {
  const emailRef = useRef<HTMLSpanElement>(null);

  const [emailOverflowing, setEmailOverflowing] = useState(false);

  useLayoutEffect(() => {
    if (!window || !emailRef.current) return;

    if (emailRef.current?.clientWidth < emailRef.current?.scrollWidth) {
      setEmailOverflowing(true);
    }
  }, []);

  const renderDomain = useCallback(
    () => (
      <span
        ref={emailRef}
        className="max-w-[200px] overflow-hidden text-ellipsis"
      >
        @{domain}
      </span>
    ),
    [domain],
  );

  if (!emailOverflowing) {
    return renderDomain();
  }

  return (
    <Tooltip
      className="max-w-[25rem] break-all"
      theme={tooltipTheme}
      content={`@${domain}`}
      animation={false}
    >
      {renderDomain()}
    </Tooltip>
  );
};
