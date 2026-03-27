'use client';

import { useState } from 'react';
import Image from 'next/image';

import { cn } from '@/lib/utils';

type ImageWithFallbackProps = {
  src: string;
  fallbackImageSrc: string;
  alt: string;
  fill?: boolean | undefined;
  sizes?: string | undefined;
  width?: number | `${number}` | undefined;
  height?: number | `${number}` | undefined;
  className?: string | undefined;
};

// Source -> https://stackoverflow.com/questions/66949606/what-is-the-best-way-to-have-a-fallback-image-in-nextjs
const ImageWithFallback = ({
  src,
  fallbackImageSrc,
  alt,
  fill,
  sizes,
  width,
  height,
  className,
}: ImageWithFallbackProps) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill={fill}
      sizes={sizes}
      width={width}
      height={height}
      className={cn('object-cover', className)}
      onError={() => {
        setImgSrc(fallbackImageSrc);
      }}
    />
  );
};

export default ImageWithFallback;
