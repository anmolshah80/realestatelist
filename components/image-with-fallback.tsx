'use client';

import { useState } from 'react';
import Image from 'next/image';

type ImageWithFallbackProps = {
  src: string;
  fallbackImageSrc: string;
  alt: string;
};

// Source -> https://stackoverflow.com/questions/66949606/what-is-the-best-way-to-have-a-fallback-image-in-nextjs
const ImageWithFallback = ({
  src,
  fallbackImageSrc,
  alt,
}: ImageWithFallbackProps) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className="object-cover"
      onError={() => {
        setImgSrc(fallbackImageSrc);
      }}
    />
  );
};

export default ImageWithFallback;
