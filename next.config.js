module.exports = {
  reactStrictMode: true,
  env: {
    // Next.js에서는 Pages폴더 외 env를 사용하기 위해서는 이하처럼 추가해주어야 한다.
    CF_HASH: process.env.CF_HASH,
  },
};
