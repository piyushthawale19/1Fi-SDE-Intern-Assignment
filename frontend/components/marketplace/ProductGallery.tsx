import React, { useState } from 'react';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const fallback = `https://placehold.co/600x600/EDE9FE/7C3AED?text=${encodeURIComponent(productName)}`;
  const displayImages = images.length > 0 ? images : [fallback];

  return (
    <div className="product-gallery">
      <div className="product-gallery-main">
        <img
          src={displayImages[activeIndex]}
          alt={`${productName} - image ${activeIndex + 1}`}
          onError={(e) => { (e.target as HTMLImageElement).src = fallback; }}
        />
      </div>

      {displayImages.length > 1 && (
        <div className="product-gallery-thumbs">
          {displayImages.map((src, i) => (
            <button
              key={i}
              className={`product-gallery-thumb ${i === activeIndex ? 'active' : ''}`}
              onClick={() => setActiveIndex(i)}
              aria-label={`View image ${i + 1}`}
            >
              <img
                src={src}
                alt={`${productName} thumbnail ${i + 1}`}
                onError={(e) => { (e.target as HTMLImageElement).src = fallback; }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
