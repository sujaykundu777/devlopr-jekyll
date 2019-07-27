---
layout: page
menus: header
title: Styleguide
permalink: /styleguide
---

<h1 class="text-center"> devlopr jekyll - Styleguide </h1>

<hr />
 
 <img src="assets/img/styleguide.png" class="img-fluid">

<p> Lets try the different text styles  <b> Bold </b> , <strong> Strong </strong>, <em> Emphasis </em>, <i> Italic </i> </p>


<p> Now, lets try different heading styles : </p>

<h1> Hello in h1 ! </h1>
<h2> Hello in h2 ! </h2>
<h3> Hello in h3 ! </h3>
<h4> Hello in h4 ! </h4>
<h5> Hello in h5 ! </h5>
<h6> Hello in h6 ! </h6>

<hr />
<p> Unordered List </p>

<ul>
<li> List Item 1 </li>
<li> List Item 2 </li>
<li> List Item 3 </li>
<li> List Item 4 </li>
<li> List Item 5 </li>
</ul>

<p> Ordered List </p> 
<ol>
<li> List Item 1 </li>
<li> List Item 2 </li>
<li> List Item 3 </li>
<li> List Item 4 </li>
<li> List Item 5 </li>
</ol>

<blockquote> 
<p>This is a Block Quote,  It can Expand Multiple Lines </p>

</blockquote>

<p>You can use the mark tag to <mark>highlight</mark> text. </p>

<p><del> This line of text is meant to be deleted text </del> </p>

<p><u>This line of text will render as underlined</u></p>
<p><small>This line of text is meant to be treated as fine print.</small></p>
<p><strong>This line rendered as bold text.</strong></p>
<p><em>This line rendered as italicized text.</em></p>
<p><abbr title="attribute">attr</abbr></p>
<p><abbr title="HyperText Markup Language" class="initialism">HTML</abbr></p>

<hr />
<div class="responsive-table">
<table>
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Heading</th>
          <th scope="col">Heading</th>
          <th scope="col">Heading</th>
          <th scope="col">Heading</th>
          <th scope="col">Heading</th>
          <th scope="col">Heading</th>
          <th scope="col">Heading</th>
          <th scope="col">Heading</th>
          <th scope="col">Heading</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Cell</td>
          <td>Cell</td>
          <td>Cell</td>
          <td>Cell</td>
          <td>Cell</td>
          <td>Cell</td>
          <td>Cell</td>
          <td>Cell</td>
          <td>Cell</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Cell</td>
          <td>Cell</td>
          <td>Cell</td>
          <td>Cell</td>
          <td>Cell</td>
          <td>Cell</td>
          <td>Cell</td>
          <td>Cell</td>
          <td>Cell</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Cell</td>
          <td>Cell</td>
          <td>Cell</td>
          <td>Cell</td>
          <td>Cell</td>
          <td>Cell</td>
          <td>Cell</td>
          <td>Cell</td>
          <td>Cell</td>
        </tr>
      </tbody>
    </table>
    </div> 

<hr />

<h3>YouTube Responsive Embed</h3>

<iframe width="560" height="315" src="https://www.youtube.com/embed/nuwjUZCSB2Y?rel=0&amp;controls=0&amp;showinfo=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen=""></iframe>

<hr />

<h3>Vimeo Responsive Embed</h3>

<iframe src="https://player.vimeo.com/video/212114694?title=0&amp;byline=0&amp;portrait=0" width="640" height="360" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen=""></iframe>

<hr />

<h3 id="ted-responsive-embed">TED Responsive Embed</h3>

<iframe src="https://embed.ted.com/talks/ted_halstead_a_climate_solution_where_all_sides_can_win" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen=""></iframe>

<hr />

<h3 id="twitch-responsive-embed">Twitch Responsive Embed</h3>

<iframe src="https://player.twitch.tv/?autoplay=false&amp;video=v248755437" frameborder="0" allowfullscreen="true" scrolling="no" height="378" width="620"></iframe>

<hr />

<h3 id="soundcloud-embed">SoundCloud Embed</h3>

<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/29738591&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"></iframe>

<hr />

<h3 id="codepen-embed">CodePen Embed</h3>

<p data-height="265" data-theme-id="light" data-slug-hash="YWvpRo" data-default-tab="css,result" data-user="kharrop" data-embed-version="2" data-pen-title="Referral Form" class="codepen"></p>
<script async="" src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

<hr />

<h3 id="syntax-highlighting">Syntax Highlighting</h3>

<figure class="highlight"><pre><code class="language-js" data-lang="js"><span class="s1">'use strict'</span><span class="p">;</span>
<span class="kd">var</span> <span class="nx">markdown</span> <span class="o">=</span> <span class="nx">require</span><span class="p">(</span><span class="s1">'markdown'</span><span class="p">).</span><span class="nx">markdown</span><span class="p">;</span>
<span class="kd">function</span> <span class="nx">Editor</span><span class="p">(</span><span class="nx">input</span><span class="p">,</span> <span class="nx">preview</span><span class="p">)</span> <span class="p">{</span>
  <span class="k">this</span><span class="p">.</span><span class="nx">update</span> <span class="o">=</span> <span class="kd">function</span><span class="p">()</span> <span class="p">{</span>
    <span class="nx">preview</span><span class="p">.</span><span class="nx">innerHTML</span> <span class="o">=</span> <span class="nx">markdown</span><span class="p">.</span><span class="nx">toHTML</span><span class="p">(</span><span class="nx">input</span><span class="p">.</span><span class="nx">value</span><span class="p">);</span>
  <span class="p">};</span>
  <span class="nx">input</span><span class="p">.</span><span class="nx">editor</span> <span class="o">=</span> <span class="k">this</span><span class="p">;</span>
  <span class="k">this</span><span class="p">.</span><span class="nx">update</span><span class="p">();</span>
<span class="p">}</span></code></pre></figure>

<p>You can add inline code just like this, E.g. <code class="highlighter-rouge">.code { color: #fff; }</code></p>

<figure class="highlight"><pre><code class="language-css" data-lang="css"><span class="nt">pre</span> <span class="p">{</span>
  <span class="nl">background-color</span><span class="p">:</span> <span class="m">#f4f4f4</span><span class="p">;</span>
  <span class="nl">max-width</span><span class="p">:</span> <span class="m">100%</span><span class="p">;</span>
  <span class="nl">overflow</span><span class="p">:</span> <span class="nb">auto</span><span class="p">;</span>
<span class="p">}</span></code></pre></figure>

<hr />

<h3 id="github-gist-embed">GitHub gist Embed</h3>

<script src="https://gist.github.com/ahmadajmi/dbb4f713317721668bcbc39420562afc.js"></script>

<hr />

<h3 id="input-style">Input Style</h3>

<p><input type="text" placeholder="I'm an input field!" /></p>

<hr />

<h3> Twitter Embed </h3>

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">I just published “Deploying a blog using Jekyll and Github Pages with SSL certificate for Free” <a href="https://t.co/B3T3IQVU93">https://t.co/B3T3IQVU93</a></p>&mdash; Sujay Kundu (@SujayKundu777) <a href="https://twitter.com/SujayKundu777/status/1012601950469160962?ref_src=twsrc%5Etfw">June 29, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<hr />

<h3> Instagram Embed </h3>

<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/BhFTg6uhNRi/" data-instgrm-version="9" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:658px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:8px;"> <div style=" background:#F8F8F8; line-height:0; margin-top:40px; padding:50.0% 0; text-align:center; width:100%;"> <div style=" background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAMUExURczMzPf399fX1+bm5mzY9AMAAADiSURBVDjLvZXbEsMgCES5/P8/t9FuRVCRmU73JWlzosgSIIZURCjo/ad+EQJJB4Hv8BFt+IDpQoCx1wjOSBFhh2XssxEIYn3ulI/6MNReE07UIWJEv8UEOWDS88LY97kqyTliJKKtuYBbruAyVh5wOHiXmpi5we58Ek028czwyuQdLKPG1Bkb4NnM+VeAnfHqn1k4+GPT6uGQcvu2h2OVuIf/gWUFyy8OWEpdyZSa3aVCqpVoVvzZZ2VTnn2wU8qzVjDDetO90GSy9mVLqtgYSy231MxrY6I2gGqjrTY0L8fxCxfCBbhWrsYYAAAAAElFTkSuQmCC); display:block; height:44px; margin:0 auto -44px; position:relative; top:-22px; width:44px;"></div></div><p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;"><a href="https://www.instagram.com/p/BhFTg6uhNRi/" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;" target="_blank">A post shared by Ahmad Ajmi (@ahmadajme)</a> on <time style=" font-family:Arial,sans-serif; font-size:14px; line-height:17px;" datetime="2018-04-02T21:18:58+00:00">Apr 2, 2018 at 2:18pm PDT</time></p></div></blockquote> <script async defer src="//www.instagram.com/embed.js"></script>

