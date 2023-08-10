---
title: 'Decaf and Decoupling'
date: 2021-06-07
permalink: /posts/2021/06/Decaf-and-Decoupling/
tags:
  - Devlog
  - Coding
  - Unity
  - Z
  - 'Neon Cloud'
---

Today was one of those... less glamorous days of game development. I spent a majority of the day refactoring some of the code for my Flappy Koopa game. I got a lot of feedback from Z. Let's be real, he shredded my codebase. I am always open for a good critique though. He never holds back the truth and that is vital to me. A lot of his feedback was related to code formatting and consistency. I'll admit, I do have a tendency to "sketch" when I'm coding up something. Especially when its something I'm doing for fun. 

I went through every C# file in my project, or at least the ones I wrote, and adjusted line spacings, bracket placements and variable naming consistency. Of course this would have been good to do the first time around, but like I said, when I'm in "sketch" mode, I tend to push a lot of this clerical code work for future Tello-. Z is a big fan of '{' on the same line as a method signature. I come from a C++ background and this is something that takes extra effort for me to remember. My trian of thought has always been, and it's saved my ass many times, that keeping your braces lined up allows for quicker debugging. You can simply line up your braces and spot where the odd-brace out is. 

He made a good point to me one night though. He told me, "The signature itself lines up with the end brace." and "Having a brace on it's own line is a waste of line space and makes code longer and more difficult to read or fit on a page." I had a hard time arguing with him here. Since then, I've been trying to follow his ideaology even though Unity tries to fight me at every moment. Unity loves to put the brace on it's own line for you. Seems silly to fight what must be automated to suit the common standard. But hey, I want the guy to keep offering feedback so I respect his opinion enough to at the very least give his style standard a shot.

At this point I had to take a break. A lot of stuff is still closed because of Covid-19. I would usually go get a coffee at the cafe or go sit at the library for a while. However, due to current closures, I went to get some food and some decaf at IHOP. I got myself a decaf because I am trying to cut back my caffiene intake. It helps me think more clearly when I haven't been loaded up on coffee. I got to IHOP and the server brought me my coffee. I had my journal with me to do some thinking about the problems I would tackle later that day. When I was pouring my french vanilla creamer into my decaf, an elderly man, also solo, sits down in the booth across the aisl from me. He promptly orders a decaf and french vanilla creamer. He was on the same side of his booth as I was mine. I got this strange doppleganger feeling coupled with the sting of aging. I thought, "who am I?". Fortunately, the old man ordered bacon (I'd ordered sausage) and he also ordered his eggs and toast differently. The ghost of Christmas future left me alone after that fortunately! 

After a brief nap I got to work on the harder portion of my work today. The major cost of my time wasn't the tedious task of code maintenence. I spent almost all of today bringing my triggering objects into the new custom event system Z taught me how to write. I have 5 triggers in my game for various purposes. One trigger listens for the backdrop. There's a trigger for the parallaxing background landscape panels. There is 2 triggers off of the top and bottom of the screen to listen for character collision, and one remaining trigger to listen for the Bowser sprite to crash into.

I had the character collision triggers set up from the other night. I was able to get the two background related triggers on the new event system. I did this by deriving specific event classes from the "Offscreen Event" that Z and I wrote. I did the same for the already completed character triggers to conform with my new architecture.

Overall, I was able to get the background triggers and the character triggers all on the new custom event system. Now instead of polling for collisions or having a generic event type, these triggers now broadcast their collision to the custom listeners I've made. It is these listening objects that will respond to the triggering, not the triggers themselves like in my old set-up. 

For example, the back panel trigger will broadcast that it's been entered by a back panel. The Panel Handler will listen for this broadcast, and react accordingly. This has allowed for a more generic implementation of each part. Each piece of this machine is now doing less tasks. This is ideal for good decoupled code. The whole system is simply a version of the Observer Pattern as made popular by the Gang of 4.

While this is a quick easy thing to write about in a blog post, in reality it took me most of my day. I'm still coming to understand the relationship of C# and the unity engine. The interplay between scripts and engine is a little mysterious at first. Days like today bring me closer and closer to the bigger picture. I appreciate everything Z has done to teach me good coding practices in a practical setting like Unity. He makes my dream of working in this industry more realistic. 

It makes me think of the old song we sang when I went to church as a kid... something about building your house on a rock instead of on a pile of sand. Seems like an obvious concept, but a good metaphor nonetheless. 

:: Tello-