// Load variables from `.env` as soon as possible
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`
})

const token = process.env.SANITY_READ_TOKEN

const isProd = process.env.NODE_ENV === 'production'


module.exports = {
  siteMetadata: {
    title: `Quarry Park Disc Golf`,
    description: `Quarry Park Disc golf club based in Leamington Spa`,
    author: `hsmess.dev`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#CCC000`,
        theme_color: `#CCC000`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.,
      },
    },
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: process.env.GATSBY_SANITY_PROJECT_ID || 'xo68m8n4',
        dataset: process.env.GATSBY_SANITY_DATASET || 'production',
        token,
        watchMode: !isProd,
        overlayDrafts: !isProd && token
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: '12345678',
        head: true,
      },
    },
    // in your gatsby-config.js

    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
