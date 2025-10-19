const glob = require('glob');

// Get all TSX/JSX files
const react4xpFiles = glob.sync('./src/main/resources/react4xp/**/*.{jsx,tsx}');
const siteFiles = glob.sync('./src/main/resources/site/**/*.{html,xml}');

console.log(`[Tailwind] Scanning ${react4xpFiles.length} React files and ${siteFiles.length} site files`);

module.exports = {
  plugins: {
    '@tailwindcss/postcss': {
      content: [
        ...react4xpFiles,
        ...siteFiles
      ]
    },
    autoprefixer: {},
  },
}
