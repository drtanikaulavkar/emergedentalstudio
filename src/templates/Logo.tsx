import { useRouter } from 'next/router';

type ILogoProps = {
  xl?: boolean;
};

const Logo = (props: ILogoProps) => {
  const fontStyle = props.xl ? 'text-2xl' : 'text-xl';
  const imageSize = props.xl ? 28 : 20;
  const router = useRouter();
  return (
    <span className={`inline-flex items-center ${fontStyle}`}>
      <img
        className="m-1.5 inline-block bg-none"
        src={`${router.basePath}/assets/images/emergeSq.png`}
        style={{ height: imageSize }}
        alt=""
        loading="lazy"
      />
      <p className="text-primary-900 font-bold">Emerge</p>
      <p className="text-primary-100 font-semibold">Dental</p>
    </span>
  );
};

export { Logo };
