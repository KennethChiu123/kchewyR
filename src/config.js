require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  app: {
    title: 'KChewy',
    description: 'KChewy Sit',
    head: {
      titleTemplate: 'KChewy Site: %s',
      meta: [
        {name: 'description', content: 'KChewy Site'},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'KChewy Site'},
        {property: 'og:image', content: 'https://scontent-lax3-1.cdninstagram.com/t51.2885-15/e35/22639176_1062038843933587_392429714431541248_n.jpg'},
        {property: 'og:locale', content: 'en_US'},
        {property: 'og:title', content: 'KChewy Site'},
        {property: 'og:description', content: 'KChewy Site'},
        {property: 'og:card', content: 'summary'},
        {property: 'og:site', content: '@kchewy'},
        {property: 'og:creator', content: '@kchewy'},
        {property: 'og:image:width', content: '200'},
        {property: 'og:image:height', content: '200'}
      ]
    }
  },

}, environment);
