---
layout: post
title:  "Snake & More"
summary: "Talking about my Snake project, and more."
author: tello-
date: '2023-08-18 15:00:00 -0700'
category: game-projects
thumbnail: /assets/img/office.png
keywords: c++ game-development game-developer game-project game-projects game-implementation self-starter
permalink: /blog/snake-game
usemathjax: true
---


<html>
<body>
    <p>I'm in the process of rounding up a few years worth of game projects, artworks, music compositions, collaborations, and anecdotes in order to supercharge my portfolio site.</p>

    <p>Currently, on the <a href="https://lnkd.in/gDgjyEFB" target="_blank">about page on my website</a>, you can see a couple of the projects I've made in my own time. The first is an implementation of the game Snake.</p>
    
    <p>In my version, I wanted to come up with some new mechanic/s of my own to spice up the Nokia classic. I implemented a mechanic where the player doesn't lose the game on the first head-body collision, and instead loses a life. The portion of the snake's tail hit then turns to bones and becomes an obstacle for the snake to navigate around along with its own increasing tail size.</p>
    <hr>

    <p>I have updated the repository for this project to (hopefully) work out of the box. I have included SFML and Cereal in the repo as well as the VS project files. Usually, I'd use a CMAKE build system to allow for a more portable repo but I thought it would make it more universally accessible, for the sake of my portfolio viewer, to do it this way.</p>
    <hr>

    <p>Stay tuned, more projects, art, and music, as well as demonstrations of the existing projects as videos or gifs coming soon.</p>
    
    <p>-Josh ✌</p>

    <p>P.S. Please check out the <a href="{{ site.baseurl }}/gallery/snake.html">gallery page</a> for Snake, where you can see a few screenshots of gameplay, high score tracking and more!</p>
</body>
</html>
