import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';

import { fileURLToPath } from 'url';

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  const config = {
    plugins: [react()],
    build: {
      assetsDir: 'public',
      outDir: 'build',
    },
    server: {
      port: Number(process.env.FRONTEND_PORT),
      open: '/home',
    },
    resolve: {
      alias: [
        {
          find: '@',
          replacement: fileURLToPath(new URL('./src', import.meta.url)),
        },
      ],
    },
  };
  return defineConfig(config);
};
