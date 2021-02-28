---
layout: post
title:  "Adding Multiple Categories in Posts"
summary: "Learn how to add categories in posts"
author: xplor4r
date: '2021-02-28 1:35:23 +0530'
category: ['jekyll','guides', 'sample_category']
tags: jekyll
thumbnail: /assets/img/posts/code.jpg
keywords: devlopr jekyll, how to use devlopr, devlopr, how to use devlopr-jekyll, devlopr-jekyll tutorial,best jekyll themes, multi categories and tags
usemathjax: false
permalink: /blog/adding-categories-tags-in-posts/
---

## Adding Multiple Categories in Posts

To add categories in blog posts all you have to do is add a **category** key with category values in frontmatter of the post :

```
---
category: ['jekyll', 'guides', 'sample_category']
---
```

Then to render this category using link and pages. All we need to do is, Create a new file with [your_category_name].md inside categories folder. Then copy the below code, replacing all the values with your_category_name. For eg. to create a category with your_category_name.

To add a category with name "sample_category", use this

In categories/sample_category.md

```jsx
---
layout: page
title: Guides
permalink: /blog/categories/sample_category/
---

<h5> Posts by Category : {{ page.title }} </h5>

<div class="card">
{% for post in site.categories.sample_category %}
 <li class="category-posts"><span>{{ post.date | date_to_string }}</span> &nbsp; <a href="{{ post.url }}">{{ post.title }}</a></li>
{% endfor %}
</div>
```

Using the category, all the posts associated with the category will be listed on
`http://localhost:4000/blog/categories/sample_category`