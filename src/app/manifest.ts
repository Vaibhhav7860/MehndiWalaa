import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'MehndiWalaa — Mehndi Artist Discovery & Booking',
    short_name: 'MehndiWalaa',
    description: "India's premier platform to find and book verified mehndi artists for weddings, festivals, and special occasions.",
    start_url: '/',
    display: 'standalone',
    background_color: '#FFFEF5',
    theme_color: '#4B0002',
    orientation: 'portrait-primary',
    categories: ['lifestyle', 'beauty', 'wedding'],
    icons: [
      { src: '/images/logo.png', sizes: '192x192', type: 'image/png' },
      { src: '/images/logo.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
