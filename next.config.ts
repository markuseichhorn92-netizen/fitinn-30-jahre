import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typescript: { ignoreBuildErrors: false },
  images: {
    // Qualität 85: bei dunklen Verläufen im Hero kein sichtbarer Unterschied zum Original
    qualities: [85],
    formats: ['image/avif', 'image/webp'],
    // optimierte Bilder ein Jahr im CDN/Browser behalten (neue Bilder bekommen neue Dateinamen)
    minimumCacheTTL: 31536000,
  },
  async headers() {
    return [
      { source: '/media/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
    ];
  },
};

export default nextConfig;
