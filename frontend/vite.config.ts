import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react()],
    server: {
      port: 5174,
    },
    define: {
      "process.env.BASE_URL": JSON.stringify(env.BASE_URL),
      "process.env.BASE_IMG": JSON.stringify(env.BASE_IMG),
      "process.env.YOUR_BOOLEAN_VARIABLE": env.YOUR_BOOLEAN_VARIABLE,
    },
  };
});
