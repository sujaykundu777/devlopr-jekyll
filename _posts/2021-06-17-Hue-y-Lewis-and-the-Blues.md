---
title: 'Hue-y Lewis and the Blues'
date: 2021-06-17
permalink: /posts/2021/06/Hue-y-Lewis/
tags:
  - Unity
  - Devlog
  - 'Neon Cloud'
---


## :: Lerp ::
### The planes will be painted red... ...with a smooth transition to purple, then blue.

---

<br>

Today, I learned how to utilize *Linear Interpolation* (Lerp) in Unity.

Lerping is...

![Larping](/../../images/larp.gif)

*No, not that...*

---

*Linear Interpolation*is a linear transition between two coordinate points on any bi-axial plane. A *color picker* is essentially a graph of hues, where each color has an x-coordinate and a y-coordinate. Choosing two colors is thus equivalent to choosing two coordinate points on a graph of color data. Lerping then, in the scope of color, means to smoothly transition from one color coordinate to the other. This is by no means the only use case for lerping either. Anything that can be represented as two points on a plane can be linearly interpolated.

---

>### *Side Note:*
>I will never come to terms with the phrase that I've heard too often throughout my career as a student... "When will we ever use this?!?"
>
>**HERE**. 
>
>Here is one out of infinite examples in which math can be used in life. With some creative thinking, math can be found in... well in anything.
>
>I digress...

---

## :: Lerp in Game Dev ::

Linear Interpolation has many use cases in video game development. A character can be lerped from one position to another by way of transformation, an object can be interpolated on a rotational axis from one angle to another, or as in my game, colors can be interpolated. As I've said, linear interpolation can really be used for any situation that can be represented as a pair of coordinates.

Here's how lerp is utilized in my game, Neon Cloud:

![BG Lerp](/../../images/lerpbg.gif)


What you're seeing is a series of 10 sprite panels that make up the background. Each panel is lerping over a series of colors, offset from one-another by a fraction of time. The overall effect I've created is a retro-like box gradient of gradients. 

**VS.**

This is the old background, which chooses from a random color range at startup, and that's it...BORING


![Old BG](/../../images/prelerp.gif)

---

## :: But How?!? ::
### This must be some sort of Lerp Wizardry...

---

![Larp Wizard](/../../images/magicmissile.gif)

**No!** Not that!

---


## If you'd like to see how I've accomplished this effect, please check back for upcoming blog posts. I will show some code snippets and explain a little further what's going on here.

---

*If you want to see videos or support my development, please check out my Youtube channel where I post progress snippets, dev streams, and devlog videos about the game. Please consider liking and subscribing. Your support is greatly appreciated and will allow me to continue doing what I love!* 

  ***And** every subscriber gets me closer to a shorter URL!*

My Channel: https://www.youtube.com/channel/UC-FFrKPac98eL4zfAU1CW9g

Lerp Snippet: https://youtu.be/kCTCbXfQMr0

For Math nerds: https://en.wikipedia.org/wiki/Linear_interpolation

---

