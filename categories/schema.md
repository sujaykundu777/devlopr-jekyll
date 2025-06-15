---
layout: page
title: Schema
permalink: /blog/categories/Schema/
---

<h5> Posts by Category : {{ page.title }} </h5>

<div class="card">
{% for post in site.categories.Schema %}
    <div class="category-posts"><span>{{ post.date | date_to_string }}</span> &nbsp; <a href="{{ post.url }}">{{ post.title }}</a></div>
{% endfor %}
</div>