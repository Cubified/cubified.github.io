import adapter from '@sveltejs/adapter-static';

const dev = process.argv.includes('dev');

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    paths: {
      base: dev ? '' : '/docs'
    },
    adapter: adapter({
      pages: 'docs',
      assets: 'docs'
    })
  }
};

export default config;
