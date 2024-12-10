import globals from "globals";
import pluginJs from "@eslint/js";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import airbnbHooks from "eslint-config-airbnb/hooks";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["/*.{js,mjs,cjs,jsx}"] },
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
    },
  },
  { rules: {} },
  tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.recommended,
    tseslint.configs.strict,
    tseslint.configs.stylistic
  ),
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  airbnbHooks,
];
