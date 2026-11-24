// Next.js 16.4.6 wraps its import and React rules for ESLint 10, while these
// pinned plugin releases declare peer support only through ESLint 9. The
// version-scoped package.json overrides can be removed once their peer ranges
// include ESLint 10.
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';

export default nextCoreWebVitals;
