import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),

  {
    files: ["**/*.{ts,tsx}"],

    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],

    plugins: {
      "simple-import-sort": simpleImportSort,
    },

    rules: {
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // React / Next
            ["^react$", "^react/", "^next$", "^next/"],

            // Third-party packages
            ["^[a-zA-Z]"],

            // Project aliases
            ["^@/"],

            // Relative imports
            ["^\\.\\.?/"],

            // Styles / assets
            ["\\.(css|scss|sass|less)$"],
          ],
        },
      ],

      "simple-import-sort/exports": "error",
    },

    languageOptions: {
      globals: globals.browser,
    },
  },
]);