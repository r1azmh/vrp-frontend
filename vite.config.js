// import {defineConfig} from 'vite'
// import react from '@vitejs/plugin-react'
// import flowbiteReact from "flowbite-react/plugin/vite";
//
// import tailwindcss from "@tailwindcss/vite"
//
// // https://vite.dev/config/
// export default defineConfig({
//     plugins: [react(), tailwindcss(), flowbiteReact()],
// })

// import path from "path"
// import tailwindcss from "@tailwindcss/vite"
// import react from "@vitejs/plugin-react"
// import { defineConfig } from "vite"
//
// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), tailwindcss()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
// })
import path, { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import flowbiteReact from "flowbite-react/plugin/vite";

// Paths
const root = resolve(__dirname)
const src = resolve(__dirname, 'src')
const outDir = resolve("/home/muhammad-samsuddin/workstation/python/vrp-backend/")

export default defineConfig({
    src,
    plugins: [react(), tailwindcss(), {
        name: 'remove-src-dir-from-html-path',
        enforce: 'post',
        generateBundle(_, bundle) {
            const htmlFilePattern = /^.*\.html$/;

            for (const [fileName, outputItem] of Object.entries(bundle)) {

                if (htmlFilePattern.test(fileName) && 'source' in outputItem) {
                    let htmlContent = typeof outputItem.source === 'string'
                        ? outputItem.source
                        : new TextDecoder().decode(outputItem.source);

                    htmlContent = htmlContent
                        .replace(
                            /<script type="module" crossorigin src="\/static\/(.*?)"><\/script>/g,
                            // '<script type="module" crossorigin src="{{ url_for(\'static\', path=\'/$1\') }}"></script>'
                            '<script type="module" crossorigin src="{% static \'$1\' %}"></script>'
                        )
                        .replace(
                            /<link rel="modulepreload" crossorigin href="\/static\/(.*?)">/g,
                            '<link rel="modulepreload" crossorigin href="{% static \'$1\' %}" >'
                            // '<link rel="modulepreload" crossorigin href="{{ url_for(\'static\', path=\'/$1\') }}" >'
                        )
                        // {% static 'js/my_script.js' %}
                        .replace(
                            /<link rel="stylesheet" crossorigin href="\/static\/(.*?)">/g,
                            '<link rel="stylesheet" crossorigin href="{% static \'$1\' %}" >'
                        );

                    outputItem.source ="{% load static %}\n" + htmlContent + "\n <script>\n" +
                        "  window.CSRF_TOKEN = '{{ csrf_token }}';\n" +
                        "</script>";

                    outputItem.fileName = `templates/${fileName}`;
                }
            }
        },
    }, flowbiteReact()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    build: {
        outDir,
        manifest: true,
        assetsDir: resolve(outDir, 'assets'),
        rollupOptions: {
            input: {
                main: resolve(root, 'index.html'),
            },
            output: {
                entryFileNames: 'static/[name]-[hash].js',
                chunkFileNames: 'static/[name]-[hash].js',
                assetFileNames: 'static/[name]-[hash][extname]',
            },
        },

    }
})