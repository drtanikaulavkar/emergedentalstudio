import { NextSeo } from 'next-seo';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { AppConfig } from '../utils/AppConfig';

type IMetaProps = {
  title: string;
  description: string;
  canonical?: string;
};

const seoTitle =
  'Best Dentist Near Me in Bengaluru for Expert Dental Care & Treatments | Emerge Dental Studio';
const seoDescription =
  'Looking for a 5-star rated dentist in Bengaluru? Our expert dental clinic offers top-notch care for all dental needs. Book an appointment today!';

const Meta = (props: IMetaProps) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <meta charSet="UTF-8" key="charset" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1"
          key="viewport"
        />
        <link
          rel="apple-touch-icon"
          href={`${router.basePath}/assets/icons/apple-touch-icon.png`}
          key="apple"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${router.basePath}/assets/icons/favicon-32x32.png`}
          key="icon32"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${router.basePath}/assets/icons/favicon-16x16.png`}
          key="icon16"
        />
        <link
          rel="icon"
          href={`${router.basePath}/assets/icons/favicon.ico`}
          key="favicon"
        />
      </Head>
      <NextSeo
        title={seoTitle}
        description={seoDescription}
        canonical={props.canonical}
        openGraph={{
          title: props.title,
          description: seoDescription,
          url: props.canonical,
          locale: AppConfig.locale,
          site_name: AppConfig.site_name,
          images: [
            {
              url: `${router.basePath}/assets/images/preview.png`,
              width: 800,
              height: 600,
              alt: 'Website preview',
            },
          ],
        }}
      />
    </>
  );
};

export { Meta };
