import { defineConfig } from 'vitest/config';

export default defineConfig({
    // Served from the domain root (https://neluxx.github.io/).
    base: '/',

    test: {
        // Simulated browser, so tests can use `document` and `localStorage`.
        environment: 'jsdom',
    },
});
