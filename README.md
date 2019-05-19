---
layout: page
title: Docs
---

# devlopr jekyll - Getting Started

[![Gem Version](https://badge.fury.io/rb/devlopr.svg)](https://badge.fury.io/rb/devlopr)
[![Netlify Status](https://api.netlify.com/api/v1/badges/4232ac2b-63e0-4c78-92e0-e95aad5ab8c3/deploy-status)](https://app.netlify.com/sites/devlopr/deploys)

Anyone can use devlopr theme to build a personal <strong>Portfolio + Blog Type of Website</strong>, hosted freely on <b>[Github Pages](https://pages.github.com)</b> or <b>[Netlify](https://netlify.com) </b>. 

To get started follow the below given methods to get your devlopr mod jekyll website ! For a complete Tutorial : [How to create a blog using Jekyll and Github Pages](https://sujaykundu.com/github/jekyll/2019/05/18/deploy-blog-using-github-free.html)

Many features are in our checklist, that needs to be worked upon and are in progress. And if you liked this project ! Do share with your developer friends and colleagues who may find it interesting :D  

## Method 1:  Installation for new Jekyll Site using Rubygem

Follow this step by step [Tutorial](https://sujaykundu.com/github/jekyll/2019/05/19/setup-devlopr-for-blog.html), if you are new to Jekyll Themes Customization !

## Method 2: Easy Installation - Just Clone !!

All you need to do is clone this repo and customize the theme accordingly.

Clone the repo :

`$ git clone https://github.com/sujaykundu777/devlopr-jekyll.git"`
`$ cd devlopr-jekyll`
`$ code .`

Edit the below file configurations to make devlopr theme yours, you can customize everything from logo, name, posts.. anything. 

Add Posts in <highlight>_posts</highlight> directory. <br /> 
Add Images in <highlight>assets/img</highlight> directory <br />
Add Categories in <highlight>categories</highlight> directory  <br />
Edit Styles in <highlight>_sass</highlight> directory <br />

### _config.yml configuration  ( Copy and Edit accordingly )

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

### Add blog section (if you want \blog)

Create a new file blog.md file with following front yaml inside it. 

```
---
layout: blog
title: Blog
permalink: \blog\
---
```

### Post Yaml Format  ( Example Below ) :

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

### Adding Categories 

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

### Individual Categories 

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

## License

The theme is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).


