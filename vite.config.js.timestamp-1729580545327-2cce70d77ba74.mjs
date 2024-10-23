// vite.config.js
import { defineConfig } from "file:///F:/VSCodeworkspace/H3m-Blog-front/node_modules/vite/dist/node/index.js";
import vue from "file:///F:/VSCodeworkspace/H3m-Blog-front/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import path from "path";
var __vite_injected_original_dirname = "F:\\VSCodeworkspace\\H3m-Blog-front";
var vite_config_default = defineConfig({
  plugins: [vue()],
  server: {
    port: 5174,
    proxy: {
      "/api": {
        target: "http://localhost:8082",
        changeOrigin: true,
        rewrite: (path2) => {
          return path2.replace(/^\/api/, "");
        }
      },
      "/image": {
        target: "https://imglt.com/api/v1",
        changeOrigin: true,
        rewrite: (path2) => {
          return path2.replace(/^\/image/, "");
        }
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "src")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJGOlxcXFxWU0NvZGV3b3Jrc3BhY2VcXFxcSDNtLUJsb2ctZnJvbnRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkY6XFxcXFZTQ29kZXdvcmtzcGFjZVxcXFxIM20tQmxvZy1mcm9udFxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRjovVlNDb2Rld29ya3NwYWNlL0gzbS1CbG9nLWZyb250L3ZpdGUuY29uZmlnLmpzXCI7Ly8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgdnVlIGZyb20gXCJAdml0ZWpzL3BsdWdpbi12dWVcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFt2dWUoKV0sXG4gIHNlcnZlcjoge1xuICAgIHBvcnQ6IDUxNzQsXG4gICAgcHJveHk6IHtcbiAgICAgIFwiL2FwaVwiOiB7XG4gICAgICAgIHRhcmdldDogXCJodHRwOi8vbG9jYWxob3N0OjgwODJcIixcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgICByZXdyaXRlOiAocGF0aCkgPT4ge1xuICAgICAgICAgIHJldHVybiBwYXRoLnJlcGxhY2UoL15cXC9hcGkvLCBcIlwiKTtcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBcIi9pbWFnZVwiOiB7XG4gICAgICAgIHRhcmdldDogXCJodHRwczovL2ltZ2x0LmNvbS9hcGkvdjFcIixcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgICByZXdyaXRlOiAocGF0aCkgPT4ge1xuICAgICAgICAgIHJldHVybiBwYXRoLnJlcGxhY2UoL15cXC9pbWFnZS8sIFwiXCIpO1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgIFwiQFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcInNyY1wiKSxcbiAgICB9LFxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQ0EsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sVUFBVTtBQUhqQixJQUFNLG1DQUFtQztBQUt6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsSUFBSSxDQUFDO0FBQUEsRUFDZixRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsTUFDTCxRQUFRO0FBQUEsUUFDTixRQUFRO0FBQUEsUUFDUixjQUFjO0FBQUEsUUFDZCxTQUFTLENBQUNBLFVBQVM7QUFDakIsaUJBQU9BLE1BQUssUUFBUSxVQUFVLEVBQUU7QUFBQSxRQUNsQztBQUFBLE1BQ0Y7QUFBQSxNQUNBLFVBQVU7QUFBQSxRQUNSLFFBQVE7QUFBQSxRQUNSLGNBQWM7QUFBQSxRQUNkLFNBQVMsQ0FBQ0EsVUFBUztBQUNqQixpQkFBT0EsTUFBSyxRQUFRLFlBQVksRUFBRTtBQUFBLFFBQ3BDO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxLQUFLO0FBQUEsSUFDcEM7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFsicGF0aCJdCn0K
