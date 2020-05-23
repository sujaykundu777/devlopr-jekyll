---
layout: post
author: Sujay Kundu
title: How to setup Netlify CMS with Github-Hosted devlopr Blog
date: 2020-05-23T19:50:21.763Z
thumbnail: /assets/img/posts/netlify-cms-blog-opengraph-image-02.png
category: jekyll
summary: Using Netlify CMS with Devlopr-Jekyll
---
Lets face it, We have our beautiful **Devlopr Jekyll** Site ready, but what if we want to ensure that it is as easy to update the site without any technical / markup sideof it. The administration should be simple and easy for any author or editor who wants to update the content of your site. To solve this problem, we are going to use Netlify CMS with our Devlopr Jekyll Blog. In this article I will show you how I setup Netlify CMS for my Github Pages Hosted site \[https://sujaykundu.com](https://sujaykundu.com)

### Setting up Netlify CMS with Github-Pages Hosted devlopr-jekyll Site:

This post walks through the really fast process of adding [Netlify CMS](https://www.netlifycms.org/) to an existing GitHub Pages devlopr site. At the end of this post you should have:

* A functioning **CMS** for your static GitHub Pages site
* Your GitHub Pages site **still hosted by GitHub Pages, not Netlify**
* Logging into the **CMS** through ***GitHub OAuth***, with Netlify auth servers (not git-gateway)

**Let’s get started :**

## 1. Creating an GitHub OAuth App

First, go to [Github Dev Settings](https://github.com/settings/developers) and click **New OAuth App.**

Enter whatever you like for **Application name** and **Homepage URL**.

In **Authorization callback URL**, enter: `https://api.netlify.com/auth/done`.

Once finished, leave the page in the background. You will need the **Client ID** and **Client Secret** on this page later.

![Creating an Github OAuth App](/assets/img/posts/auth1.png "Creating an Github OAuth App"){:class="img-fluid}

## **2.  Creating a Netlify Site**

… Relax! We’re just creating one, without actually using it. In fact, if you want to deploy Jekyll site on Netlify, you [will need](https://www.netlify.com/blog/2015/10/28/a-step-by-step-guide-jekyll-3.0-on-netlify/) to include Jekyll (generator) in your git repo.

Go to [Netlify](https://app.netlify.com/account/sites) and create a new site from…*any* repo. We are not really using Netlify to host that, anyway.

![](/assets/img/posts/auth2.png){:class="img-fluid"}

After that, go to **Settings**, and copy your **Site name**. It should be something like **agitated-northcutt-53b578**.

![](/assets/img/posts/auth3.png){:class="img-fluid"}

From the sidebar go to **Domain Management** and add your GitHub Pages domain (`you.github.io`) as a custom domain. Choose **Yes** when asked if you are `github.io`’s owner.

In my case I added sujaykundu.com,  since that's my custom domain, otherwise it would have been sujaykundu777.github.io

![](/assets/img/posts/auth4.png){:class="img-fluid"}

From the sidebar go to **Access control**, scroll down to **OAuth** and click **Install provider**.

![](/assets/img/posts/auth5.png){:class="img-fluid"}

Choose **GitHub** as provider, and enter the **Client ID** and **Client Secret** from GitHub OAuth app page mentioned above.

![](/assets/img/posts/auth6.png){:class="img-fluid"}

Then you can close the Netlify and GitHub webpages.

### 3. "Installing" the CMS

Since you might have forked the repo, you might find a **admin** folder already existing inside the project, otherwise you need to create this files in your existing repo. Netlify CMS uses this configuration to update the blog posts. You can configure your Netlify CMS settings in config.yml file inside the admin folder.

**/admin/ directory explained**

The **/admin/** directory contains the `index.html` and `config.yml` for Netlify CMS.

Here’s how the `config.yml` looks for now (in case of Github Pages hosted) Replace **you** with your **Github's username**

You may edit this according to your preference.

and here's how the **index.html** looks like

```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>devlopr - Admin</title>
  <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
</head>
<body>
  <!-- Include the script that builds the page and powers Netlify CMS -->
  <script src="https://unpkg.com/netlify-cms@^2.0.0/dist/netlify-cms.js"></script>
</body>
</html>
```

### **Accessing Netlify CMS Dashboard**

The Dashboard can be accessed by admins using **/admin** URL.

![netlify cms dashboard](/assets/img/posts/auth7.png "Netlify CMS Dashboard"){:class="img-fluid"}

That's all, Now you can updated your Site using the Netlify CMS. You can visit the site at http://you.github.io/admin (you - your github username) :D