import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Die 5-Euro-Aktion lag kurzzeitig unter einer eigenen URL, bevor sie
      // Startseite wurde – bestehende Links dorthin sollen nicht ins Leere laufen.
      { source: "/5-euro-aktion", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
