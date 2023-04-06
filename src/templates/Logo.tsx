type ILogoProps = {
  xl?: boolean;
};

const Logo = (props: ILogoProps) => {
  const fontStyle = props.xl ? 'text-3xl' : 'text-xl';

  return (
    <span className={`inline-flex items-center ${fontStyle}`}>
      <p className="text-primary-900 font-bold">Emerge</p>
      <p className="text-primary-100 font-semibold">Dental</p>
    </span>
  );
};

export { Logo };
