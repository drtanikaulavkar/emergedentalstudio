import { useRouter } from 'next/router';

// import logoPng from '../../public/assets/images/emergeLogo.png';

type ILogoProps = {
  xl?: boolean;
};

const LogoV2 = (props: ILogoProps) => {
  const imageSize = props.xl ? 36 : 28;
  const router = useRouter();
  return (
    <img
      className="inline-block bg-none mx-2"
      src={`${router.basePath}/assets/images/emergeLogo.webp`}
      style={{ height: imageSize }}
      alt=""
      loading="lazy"
    />
  );
  // return <Image src={logoPng} fill alt="emerge dental studio logo" />;
};

export { LogoV2 };
