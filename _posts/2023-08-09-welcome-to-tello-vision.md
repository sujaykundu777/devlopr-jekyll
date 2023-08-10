---
layout: post
title:  "Welcome to Tello-Vison!"
summary: "My first post on the new site."
author: tello-
date: '2023-08-09 14:35:08 -0700'
category: general
thumbnail: /assets/img/posts/hello.jpg
keywords: hello-world
permalink: /blog/welcome-to-tello-vision
usemathjax: true
comments: true
---


Hello! Welcome to my [new site](https://telloviz.netlify.app). I've migrated to a new theme and (at least for now) a new hosting [platform](https://www.netlify.com)


{% if page.comments %}
<script>
    var disqus_config = function () {
        this.page.url = "{{ site.url }}{{ page.url }}"; /* Replace PAGE_URL with your page's canonical URL variable */
        this.page.identifier = "{{ page.id }}"; /* Replace PAGE_IDENTIFIER with your page's unique identifier variable */
    };


    (function () { /* DON'T EDIT BELOW THIS LINE */
        var d = document,
            s = d.createElement('script');
        s.src = 'https://{{ site.disqus_shortname }}.disqus.com/embed.js';
        s.setAttribute('data-timestamp', +new Date());
        (d.head || d.body).appendChild(s);
    })();
</script>
<noscript>Please enable JavaScript to view the
    <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a>
</noscript>
{% endif %}