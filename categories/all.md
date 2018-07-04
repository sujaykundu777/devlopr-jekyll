---
layout: page
permalink: /blog/categories/
---
 

<h3>  {{ page.title }} </h3>

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


