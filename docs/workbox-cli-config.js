module.exports = {
  "globDirectory": ".\\",
  "globPatterns": [
    "**/*.{css,png,js,ico,woff,woff2,html,json}"
  ],
  "runtimeCaching": [
    {
      urlPattern: 'https://spreadsheets.google.com/*',
      handler: 'networkFirst'
    }
  ],
  "swDest": "sw.js",
  "globIgnores": [
    "workbox-cli-config.js",
    "node_modules/**/*",
	".git/**/*",
    ".eslintrc.js",
    "admin.html",
	"scripts/admin.js"
  ]
};
