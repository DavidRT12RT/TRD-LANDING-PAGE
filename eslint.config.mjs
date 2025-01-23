import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Ignorar advertencia sobre el uso de <img>
      "@next/next/no-img-element": "off",
      // Ignorar el uso de 'any'
      "@typescript-eslint/no-explicit-any": "off",
      // Ignorar interfaces vacías
      "@typescript-eslint/no-empty-object-type": "off",
      // Ignorar variables no utilizadas
      "@typescript-eslint/no-unused-vars": "off",
      // Ignorar preferencia por @ts-expect-error
      "@typescript-eslint/ban-ts-comment": "off",
    },
  },
];

export default eslintConfig;
