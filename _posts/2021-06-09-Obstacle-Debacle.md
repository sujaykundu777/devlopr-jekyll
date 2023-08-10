---
title: 'Obstacle Debacle'
date: 2021-06-09
permalink: /posts/2021/06/Obstacle-Debacle/
tags:
  - Unity
  - Coding
  - Devlog
  - 'Neon Cloud'
  - Z
---

**Today's Task:**

The problem to tackle today will make Flappy Koopa a game in the minimal sense. I am working on implementing obstacles for the player to dodge. I am going to use an Empty Object made up of various components I've already made. I think I've made these components modular enough to work great for this use case. 

**Some background**

Essentially, obstacles have a collider, rigid body and some sort of renderer. I will likely use a sprite renderer, but for now I am using a mesh renderer for implementation simplicity. Sprites can easily be added later on. I think I should be able to use a couple of the scripts that I'm using elsewhere in the game to allow my obstacles to scroll from right to left across the screen and then "teleport back to the start upon passing off of the left screen edge. I will try to use my custom trigger events to signal the teleport. I will do what I did with my other offscreen triggers, and derive from the same parent OffscreenEvent class.

**Also Today**

I streamed live for the first time today. I was live for about 1 minute and 40 seconds. The feed was just me awkwardly trying to figure out the interface alone in the vacuum of the internet. I sure hope this gets a lot less daunting in the near future. Only one way to make that happen though. Time for tons of public embarrassment...


**Days Later**

Just getting back to this draft. I was able to get enemies in my game that scroll toward the player. They don't change axes at all. So the game is playable in the most minimal sense. The enemies translate back to the reset position, much like the backdrop does. 

I ran into a logical bug though in doing this. I realized translating will push my player object along with the translating enemy objects.

I have also learned that I don't need all of the overhead of the trigger objects, and can just use an empty object to save performance. I was using mesh renderers and filters only for now though so I could see the object at all times when I'm building the game. Sort of a visual cue. 

Making these trigger zones an empty object, that is simply an end and start position marker, will allow me to drag and drop these anywhere. 

*Some dialogue with Z:*
>This is... very expensive. Not only is each collider checking on every other collider to see if the collision has happened in every frame, but it's also got the other rigidbody expenses attached. Make 2 empty gameobjects to use as markers. Name them "ResetFrom" and "ResetTo". In each frame the BG can check it's position. If it's X position <= the ResetFrom's x position, it gets moved to the ResetTo position. You're literally only comparing 1 Vector3 each frame. And they are existing Vector3s, not even new ones to be GC'd later.

**This is just an update to this draft from the other day. More on this to come in more recent blog entries.**


