const meta = {
  // Metadata
  siteTitle: 'Tina Marion Abwor - Creative Web Developer',
  siteDescription:
    'Tina Marion Abwor - Creative frontEnd web developer who loves javascript and modern web technologies.',
  siteTitleAlt: 'Tina Marion Abwor',
  siteShortName: 'Tina Marion Abwor',
  siteUrl: 'https://tinamarion.github.io', // No trailing slash!
};

const social = {
  siteLogo: `src/static/logo.svg`,
  siteBanner: `${meta.siteUrl}/images/social-banner.png`,
  twitter: '@tinamarion', // Update with your Twitter handle
};

const website = {
  ...meta,
  ...social,
  disqusShortName: 'tinamarion', // Update with your Disqus shortname if you use it
  googleAnalyticsID: '', // Add your Google Analytics ID here
  // Manifest
  themeColor: '#6D83F2',
  backgroundColor: '#6D83F2',
};

module.exports = website;
