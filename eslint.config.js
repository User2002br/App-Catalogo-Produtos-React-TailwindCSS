import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

// Configuração do ESLint para o projeto.
export default tseslint.config(
  // Ignora o diretório 'dist' da verificação.
  { ignores: ["dist"] },
  {
    // Estende as configurações recomendadas de JS e TypeScript.
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    // Aplica estas regras para arquivos .ts e .tsx.
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      // Regra para garantir que apenas componentes sejam exportados por padrão.
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      // Desativa a regra de variáveis não utilizadas do TypeScript (pode ser útil durante o desenvolvimento).
      "@typescript-eslint/no-unused-vars": "off",
    },
  }
);
