---
layout: post
title: Deploy devlopr jekyll Blog using Github Pages and Travis
author: Sujay Kundu
date: '2017-11-19 14:35:23 +0530'
category: guides
tag: 
    - jekyll
    - blogging
summary: Deployment Guide for devlopr-jekyll blog using Github Pages and Travis CI
thumbnail: /assets/img/posts/deploy-using-github-pages-and-travis.png
---

This guide assumes that you already have created your blog and tested locally. If not please follow this tutorial : [Create a Blog using devlopr jekyll](https://devlopr.netlify.com/guides/2017/11/19/build-a-blog-using-devlopr-jekyll). Then come back and proceed with the deployment process.

In this Guide, we are using Github Pages and Travis CI for deploying our blog. So let's get started:

##### Generate a New Github Personal Access Token 

We need this token as a Environment Variable in Travis. For Travis can automatically login as you, and finish its job of building your site and pushing it to your repo's master branch.

Go to [Github Generate a New Token](https://github.com/settings/tokens) Page.

![deploy using travis](/assets/img/posts/d1.png){:class="img-fluid"}

Create a new Access Token 

![deploy using travis](/assets/img/posts/d2.png){:class="img-fluid"}

##### Configure Travis 

Go to [Travis](https://travis.org) and Toggle the repository access to use Travis 

![deploy using travis](/assets/img/posts/d3.png){:class="img-fluid"}

Go to the repository settings page and Add Environment Variable 'GITHUB_TOKEN' 
![deploy using travis](/assets/img/posts/d4.png){:class="img-fluid"}

##### Push your changes to Github 

You can delete local build files (_site, .sass-cache) folders, as travis will generate this automatically on every push.

Commit your local changes in gh-pages branch 

`git add .`
`git commit -m "added new post"`
`git push origin gh-pages`

After push, Travis will automatically run a build process and deploy your blog.

![deploy using travis](/assets/img/posts/d5.png){:class="img-fluid"}

You can visit your site at https://yourusername.github.io

![deploy using travis](/assets/img/posts/d6.png){:class="img-fluid"}

Done ! Enjoy your brand new devlopr-jekyll blog. 