/** @type {import('next').NextConfig} */
// GitHub Pages는 정적 파일만 올릴 수 있어서 export 모드로 빌드합니다.
// 주소가 https://poodingcake-hue.github.io/remuatelier/ 이므로 경로 앞에 /remuatelier 가 붙습니다.
const basePath = process.env.PAGES_BASE_PATH ?? '';

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
  transpilePackages: ['three'],
};
export default nextConfig;
