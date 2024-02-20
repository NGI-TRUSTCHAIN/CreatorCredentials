type WelcomeHeaderProps = {
  title: string;
  subtitle: string;
};

export const WelcomeHeader = ({ title, subtitle }: WelcomeHeaderProps) => (
  <header className="mb-8 mt-27 flex w-[31.875rem] flex-col gap-4 self-center text-black">
    <h1 className="text-center text-[2rem] font-semibold">
      <p>{title}</p>
    </h1>
    <h2 className="whitespace-pre-line text-center text-2xl font-normal leading-tight">
      <p>{subtitle}</p>
    </h2>
  </header>
);
