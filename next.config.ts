import type {NextConfig} from 'next';
const config: NextConfig = {
 poweredByHeader: false,
 async redirects() {
  return [
   {source:'/products/pocket-filter',destination:'https://www.parknonwoven-filtration.com/products/pocket-filters',permanent:true},
   {source:'/products/bag-filter',destination:'https://www.parknonwoven-filtration.com/products/dust-collector-bag-filters',permanent:true},
   {source:'/products/hepa-filter',destination:'https://www.parknonwoven-filtration.com/products/hepa-filters',permanent:true},
   {source:'/products/cabin-air-filter',destination:'https://www.parknonwoven-filtration.com/products/cabin-air-filters',permanent:true},
   {source:'/products/liquid-filter',destination:'https://www.parknonwoven-filtration.com/products/liquid-bag-filters',permanent:true},
   {
    source: '/:path*',
    has: [{type: 'host', value: 'parknonwoven-filtration.com'}],
    destination: 'https://www.parknonwoven-filtration.com/:path*',
    permanent: true,
   },
  ];
 },
 async headers() {
  return [
   {source: '/videos/:path*', headers: [{key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800'}]},
   {source: '/images/:path*', headers: [{key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800'}]},
   {source: '/fonts/:path*', headers: [{key: 'Cache-Control', value: 'public, max-age=31536000, immutable'}]},
  ];
 },
};
export default config;
