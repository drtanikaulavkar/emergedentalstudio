import React from 'react';

import { useRouter } from 'next/router';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

import { Section } from '../layout/Section';

export const Gallery = () => {
  const router = useRouter();

  const slides = [];
  for (let i = 1; i <= 8; i += 1) {
    slides.push({ src: `${router.basePath}/assets/gallery/${i}.jpg` });
  }

  return (
    <Section yPadding="0">
      <Lightbox
        plugins={[Thumbnails, Zoom]}
        open={true}
        close={() => {
          router.back();
        }}
        slides={slides}
      />
    </Section>
  );
};
