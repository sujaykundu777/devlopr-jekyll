# devlopr

[![Gem Version](https://badge.fury.io/rb/devlopr.svg)](https://badge.fury.io/rb/devlopr)

Welcome to your new Jekyll theme! In this directory, you'll find the files you need to be able to package up your theme into a gem. Put your layouts in `_layouts`, your includes in `_includes`, your sass files in `_sass` and any other assets in `assets`.

To experiment with this code, add some sample content and run `bundle exec jekyll serve` – this directory is setup just like a Jekyll site!

TODO: Delete this and the text above, and describe your gem


## Installation

Add this line to your Jekyll site's `Gemfile`:

```ruby
gem "devlopr"
```

And add this line to your Jekyll site's `_config.yml`:

```yaml
theme: devlopr
```

And then execute:

    $ bundle

Or install it yourself as:

    $ gem install devlopr

## Usage

TODO: Write usage instructions here. Describe your available layouts, includes, sass and/or assets.

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/[USERNAME]/hello. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## Development

To set up your environment to develop this theme, run `bundle install`.

Your theme is setup just like a normal Jekyll site! To test your theme, run `bundle exec jekyll serve` and open your browser at `http://localhost:4000`. This starts a Jekyll server using your theme. Add pages, documents, data, etc. like normal to test your theme's contents. As you make modifications to your theme and to your content, your site will regenerate and you should see the changes in the browser after a refresh, just like normal.

When your theme is released, only the files in `_layouts`, `_includes`, `_sass` and `assets` tracked with Git will be bundled.
To add a custom directory to your theme-gem, please edit the regexp in `devlopr.gemspec` accordingly.

## License

The theme is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).

# Variables need to be declared in _config.yml of your jekyll site

`{{site.variable}}`

# _config.yml configuration  ( Copy and Edit accordingly )

```
title: Your Site Title
subtitle: Your Site Subtitle
description: >- # this means to ignore newlines until "baseurl:"
  Write an awesome description for your new site here. You can edit this
  line in _config.yml. It will appear in your document head meta (for
  Google search results) and in your feed.xml site description.
baseurl: "" # the subpath of your site, e.g. /blog
url: "" # the base hostname & protocol for your site, e.g. http://example.com

author_logo: profile.png
disqus_shortname: sujay-kundu  #for comments using disqus
author: Your Name
author_bio: Something About You for about me
author_email: "your-email@example.com"
author_location: Your Location
author_website_url: "https://yourwebsite.com"

# social links
twitter_username: yourusername
github_username:  yourusername
facebook_username: yourusername
linkedin_username: yourusername
behance_username: yourusername
instagram_username: yourusername
medium_username: yourusername 
telegram_username: yourusername
dribbble_username: yourusername 
flickr_username: yourusername
```

# Add blog section

Create a new file blog.md file with following front yaml inside it. 

```
---
layout: blog
title: Blog
permalink: \blog\
---
```

# Post Yaml Format  ( Example Below ) :

```
---
layout: post
title: How to use docker compose 
categories: 
 - web-development
 - docker
summary: Learn how to use docker compose 
thumbnail: docker-compose.png
author: Sujay Kundu
---
```

# Adding Categories 

For Adding Categories create new folder categories and inside that create a file `all.md` and copy the below code in that :

```
---
layout: page
permalink: /blog/categories/
---

<div id="categories">
{% for tag in site.categories %}
  <div class="category-box" >
    {% capture tag_name %}{{ tag | first }}{% endcapture %}
    <div id="#{{ tag_name | slugize }}"></div>
    <h4 class="tag-head"><a href="{{ site.baseurl }}/blog/categories/{{ tag_name }}">{{ tag_name }}</a></h4>
    <a name="{{ tag_name | slugize }}"></a>
     {% for post in site.tags[tag_name] %}
    <article class="center">
      <h6 ><a href="{{ site.baseurl }}{{ post.url }}">{{post.title}}</a></h6>
    </article>


    {% endfor %}
    
  </div>
{% endfor %}
</div>

```

# Individual Categories 

If you want to show all posts of a particular category, create a new file for that category inside categories folder

For example ( angularjs.md  )

```
---
layout: page
permalink: /blog/categories/angularjs
---
 
<div class="card">
{% for post in site.categories.angularjs %}
 <li class="category-posts"><span>{{ post.date | date_to_string }}</span> &nbsp; <a href="{{ post.url }}">{{ post.title }}</a></li>
{% endfor %}
</div>


```

