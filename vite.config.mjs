import { defineConfig } from 'vite';
import { extensions, classicEmberSupport, ember } from '@embroider/vite';
import { babel } from '@rollup/plugin-babel';
import { scopedCSS } from 'ember-scoped-css/vite';

export default defineConfig({
  plugins: [
    classicEmberSupport(),
    ember(),
    // extra plugins here
    babel({
      babelHelpers: 'runtime',
      extensions,
    }),
    scopedCSS({
      layerName: false,
      additionalRoots: ['templates/'],
    }),
  ],
  server: {
    proxy: {
      '/github-issues': {
        target: process.env.LOCAL_API
          ? 'http://localhost:3000'
          : 'https://ember-help-wanted-server.herokuapp.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/github-issues/, '/github-issues'),
      },
      '/github-repositories': {
        target: process.env.LOCAL_API
          ? 'http://localhost:3000'
          : 'https://ember-help-wanted-server.herokuapp.com',
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(/^\/github-repositories/, '/github-repositories'),
      },
      '/api/pull-requests': {
        target: process.env.LOCAL_API
          ? 'http://localhost:3000'
          : 'https://ember-help-wanted-server.herokuapp.com',
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(/^\/api\/pull-requests/, '/api/pull-requests'),
      },
    },
  },
});
