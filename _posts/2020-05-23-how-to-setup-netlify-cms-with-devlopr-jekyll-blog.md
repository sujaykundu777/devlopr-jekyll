---
layout: post
author: John Doe
title: How to setup Netlify CMS with devlopr-jekyll Blog
date: 2020-05-23T19:50:21.763Z
thumbnail: /assets/img/posts/netlify-cms-blog-opengraph-image-02.png
category: jekyll
summary: Using Netlify CMS with Devlopr-Jekyll
---
Lets face it, We have our beautiful **Devlopr Jekyll** Site ready, but what if we want to ensure that it is as easy to update the site without any technical / markup sideof it. The administration should be simple and easy for any author or editor who wants to update the content of your site. To solve this problem, we are going to use Netlify CMS with our Devlopr Jekyll Blog.

### Setting up Netlify CMS 

Since you might have forked the repo, you might find a **admin** folder already existing inside the project. Netlify CMS uses this configuration to update the blog posts. You can configure your Netlify CMS settings in config.yml file inside the admin folder.

**/admin/ directory explained**

The **/admin/** directory contains the `index.html` and `config.yml` for Netlify CMS.

Here’s how the `config.yml` looks for now.

```yaml
backend:
  name: git-gateway
  branch: master

media_folder: "assets/img/posts" # Media files will be stored in the repo under images/uploads
public_folder: "/assets/img/posts" # The src attribute for uploaded media will begin with /images/uploads

collections:
  - name: "blog" # Used in routes, e.g., /admin/collections/blog
    label: "Blog" # Used in the UI
    folder: "_posts" # The path to the folder where the documents are stored
    create: true # Allow users to create new documents in this collection
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}" # Filename template, e.g., YYYY-MM-DD-title.md
    fields: # The fields for each document, usually in front matter
      - {label: "Layout", name: "layout", widget: "hidden", default: "post"}
      - {label: "Author", name: "author", widget: "string"}
      - {label: "Title", name: "title", widget: "string"}
      - {label: "Publish Date", name: "date", widget: "datetime"}
      - {label: "Featured Image", name: "thumbnail", widget: "image"}
      - {label: "Category", name: "category", widget: "string", default: "jekyll"}
      - {label: "Summary", name: "summary", widget: "string"}
      - {label: "Body", name: "body", widget: "markdown"}
```

You may edit this according to your preference.

and here's how the index.html looks like 

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

![devlopr-jekyll netlify cms dashboard](/assets/img/posts/netlify-cms.png "Netlify CMS Dashboard")