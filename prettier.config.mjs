/** @type {import("prettier").Config} */
const prettierConfig = {
  // Style
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 100,

  // Consistency
  endOfLine: 'lf',
  tabWidth: 2,
  useTabs: false,

  // JSX
  jsxSingleQuote: false,

  // Plugins
  plugins: ['prettier-plugin-tailwindcss'],

  // Tailwind plugin options
  tailwindFunctions: ['cn', 'cva', 'clsx', 'twMerge'],
}

export default prettierConfig
