"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  src: string;
  alt: string;
  fill: boolean;
  sizes: string;
  className: string;
  loading: "lazy" | "eager";
};

/** Renders a gallery image with a placeholder fallback if the image fails to load. */
export function GalleryImageWithFallback({
  src,
  alt,
  fill,
  sizes,
  className,
  loading,
}: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-300 text-gray-500 ${className}`}
        aria-label={alt}
      >
        <span className="text-xs text-center px-2">Image unavailable</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      sizes={sizes}
      className={className}
      loading={loading}
      onError={() => setFailed(true)}
    />
  );
}
