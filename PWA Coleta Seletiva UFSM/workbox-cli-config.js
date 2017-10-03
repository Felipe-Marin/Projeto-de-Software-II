module.exports = {
  "globDirectory": ".\\",
  "globPatterns": [
    "**/*.{css,png,js,ico,woff,woff2,html,json}"
  ],
  "runtimeCaching": [
    {
      urlPattern: 'https://spreadsheets.google.com/*',
      handler: 'cacheFirst'
    }
  ],
  "swDest": "sw.js",
  "globIgnores": [
    "workbox-cli-config.js"
  ]
};
