

### devlopr-jekyll - A Jekyll Theme Built for Developers

Just a little something I'm using to jump start a site refresh. I like to think of it as a starter for building your own Jekyll site. I purposely keep the styling minimal and bare to make it easier to add your own flare and markup.

![devlopr jekyll](https://github.com/sujaykundu777/devlopr-jekyll/blob/master/assets/img/screenshot.PNG?raw=true)

You can easily manage the site using the admin : [http://localhost:4000/admin](http://localhost:4000/admin)

![jekyll admin](https://github.com/sujaykundu777/devlopr-jekyll/blob/master/assets/img/jekyll-admin.PNG?raw=true)

[![Gem Version](https://badge.fury.io/rb/devlopr.svg)](https://badge.fury.io/rb/devlopr)![workflow-badge](https://github.com/sujaykundu777/devlopr-jekyll/workflows/deploy/badge.svg)
[![Netlify Status](https://api.netlify.com/api/v1/badges/4232ac2b-63e0-4c78-92e0-e95aad5ab8c3/deploy-status)](https://app.netlify.com/sites/devlopr/deploys)
![](https://ruby-gem-downloads-badge.herokuapp.com/devlopr?type=total&color=brightgreen&style=plastic)

### Deploy your Blog using devlopr-jekyll - [Get Started](https://devlopr.netlify.com/get-started)

[![Deploy with ZEIT Now](https://zeit.co/button)](https://zeit.co/new/project?template=https://github.com/sujaykundu777/devlopr-jekyll)
[![Deploy with Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/sujaykundu777/devlopr-jekyll)
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/sujaykundu777/devlopr-jekyll)

### Demo (Hosted Apps)

- Github Pages Demo - [here](https://sujaykundu.com)
- Netlify Demo - [here](https://devlopr.netlify.com)
- Zeit Now Demo - [here](https://devlopr-jekyll.now.sh)
- Heroku Demo - [here](https://devlopr-jekyll.herokuapp.com)
- AWS Amplify Demo - [here](https://master.d3t30wwddt6jju.amplifyapp.com/)

#### Features :

- CMS Admin Support using [Jekyll Admin](https://jekyll.github.io/jekyll-admin/)
- Supports Latest [Jekyll 4.x](https://jekyllrb.com) and [Bundler](https://bundler.io)
- Stylesheet built using Sass
- SEO, Google Adsense and Analytics Optimized
- Real Time Search using [Algolia](https://algolia.com/)
- Sell Stuff (Ecommerce) in your Blog using [Snipcart](https://snipcart.com/)
- Send Newsletters using [Mailchimp](https://mailchimp.com/)
- Contact Forms using [Formspree](https://formspree.io/)
- Coding Activity using [Wakatime](https://wakatime.com/)
- Hosting Support for [Github Pages](https://pages.github.com), [Netlify](https://netlify.com), [Zeit](https://zeit.co), [Heroku](https://heroku.com), [AWS Amplify](aws.amplify.com)

## Using Docker :

Building the Image :

`docker build -t my-devlopr-jekyll-blog .`

Running the container :

`docker run -d -p 4000:4000 -it --volume="$PWD:/srv/jekyll" --name "my_blog" my-devlopr-jekyll-blog:latest jekyll serve --watch`

## Using Docker Compose :

### Development :

You can run the app in development mode : (your changes will be reflected --watch moded)

Serve the site at http://localhost:4000 :

`docker-compose -f docker-compose-dev.yml up --build --remove-orphans`

### Production :

You can run the app in production mode : (your changes will be reflected --watch moded)

Serve the site at http://localhost:4000 :

`docker-compose -f docker-compose-prod.yml up --build --remove-orphans`

Stop the app :
`docker-compose -f docker-compose-prod.yml down`
Once everything is good and ready to go live -

`docker-compose -f docker-compose-prod.yml up --build --detach`

## Contributions:

Contributions are more than just welcome. Fork this repo and create a new branch, then submit a pull request

- 1.Fork it [http://github.com/sujaykundu777/devlopr-jekyll/fork](http://github.com/sujaykundu777/devlopr-jekyll/fork )

- 2.Create your feature branch
`git checkout -b my-new-feature`

- 3.Commit your changes
`git commit -am 'Add some feature'`

- 4.Push to the branch
`git push origin my-new-feature`

- 5.Create new Pull Request

## Support / Buy Me a Coffee

If you like the project. Don't forget to Star ! Also, It would be great if you can help my by Donating some amount at any of the below links:

- [Support via Patreon](https://patreon.com/sujaykundu)
- [Support via Kofi](https://ko-fi.com/sujaykundu)
- [Donate Me using Paypal](https://paypal.me/sujaykundu)

## Licence

The theme is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).



