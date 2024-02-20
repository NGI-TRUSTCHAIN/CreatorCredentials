import { ClassValue, clsxm } from '@/shared/utils/clsxm';

type StepperProps = {
  steps: string[];
  activeStep: number;
  className?: string | ClassValue;
};

export const Stepper = ({ steps, activeStep, className }: StepperProps) => (
  <div className={clsxm('flex gap-8 font-semibold text-grey-4', className)}>
    {steps.map((step, index) => (
      <div
        key={step}
        className={clsxm(
          'flex items-center gap-3 border-black',
          {
            'text-primary border-primary': index <= activeStep,
          },
          {
            'text-success border-success': index < activeStep,
          },
          {
            'text-grey-4 border-grey-4': index > activeStep,
          },
        )}
      >
        <div className="relative flex h-8 w-8 items-center justify-center rounded-full border border-inherit text-center">
          <span>{index + 1}</span>
        </div>
        <div>{step}</div>
      </div>
    ))}
  </div>
);
