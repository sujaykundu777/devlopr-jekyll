---
title: 'Transformers :: Logic Bugs in Disguise'
date: 2021-06-14
permalink: /posts/2021/06/Transformers/
tags:
  - Unity
  - Devlog
  - 'Neon Cloud'
---

# I have one word of advice for anyone treading into Unity for the first time....

### **IMMEDIATELY** set all of your transform components to (0,0,0) when you put a new object in your scene. Just do it. Save yourself the headache.

---

Both Q and Z have shared this advice with me. They both stressed the importance of this simple concept. 

#### I listened. 

### I understood. 

## I followed. 

![Transformer](/../../images/Transformers.gif)

Even so, I fell victim to the pain wrought by the silent but deadly transform component...

<br>


# Pivot/Parent/Child/Transformer Conferences:

Every object in Unity contains the component "Transform". A transform component is what holds the positional, rotational and scale state of any object in the 3d world of Unity Engine. The silent killer of the transform component is the position field. The position field is a Vector3, which is a 3-float vector denoting the object's position in 3d space.

When placing an object into a Unity scene, the position vector is initialized with arbitrary floating point values. These values are often many digits in length past the decimal point. The vector value usually has nothing to do with the actual position you intend to place the object and is rather unfriendly to work with when trying to place objects into your world in a calculated/accurate manner. Once an object holds an arbitrary series of decimal places, it is nearly impossible to control the object using grid snapping with any accuracy. This is especially the case when aligning this object with others already in a scene. This in itself can lead to many unintended bugs in logic and the interaction of game objects.This is not the main problem caused by an arbitrarily initialized transform component, however.


There is another concept that is the cousin of the transform component. This concept is known as the *Pivot Point*. The pivot of any object is the point on the object where transforms are applied. An object usually has its pivot at the center of its mass. You can however, move this pivot to many predefined points. For example, I had set all of my sprite entities to have a pivot point in the bottom left corner. I did this to allow for convenient alignment to my grid. This was especially useful for uniquely sized objects like my parallaxed background panels. At the same time, many objects in my scene kept their default pivot-point, which is the center. 




# Floating-Point Inferno & Pivot-point Purgatory

Consider what I said previously, that every object placed into a Unity scene has a transform component of it's own. This is true for objects which are children of a parent object. What happens in this case, is that the parent object acts as scope of the transform of the child. What I mean by this is, the child's transform is completely relative to the parent's transform, and not to the global coordinate system.

For example, a parent set at the vector coordinate (5, 0, 0), becomes the origin(0, 0, 0) coordinate of any of its children. When a child object is thus transformed, it is manipulated in relation to this origin and not to the global origin. I like to think that this concept is intuitive enough to understand up to this point.

The situation starts to get really hairy when you add in rotation to your parent and/or child transform components. Now not only do you have a positional origin relative to the parent, you also have a rotational origin relative to the parent as well. When you translate an object that has been rotated, the object translates on its original axes which have now been rotated. This can get very confusing, very quickly.

To add another layer, remember that the child transform is completely relative to the parent's transform. A parent that has been translated on the global scope, and then also rotated, acts as the new origin point for any of its children. Now, you have a non-zero positional origin and a non-zero rotational origin for your child objects.

Children of parents with altered pivot points, or varying pivot points from their parent, rapidly descend your project into the deepest circles of Dante's Inferno. Things quit reacting to your transformations in an intuitive way. The brain just plain struggles to comprehend all of the new scopes introduced by changing parent transform as well as pivot points of select objects.



## *I guarantee at this point your brain will explode.*

---

# Transform.Position.Translate into the 9th circle

My project utilized the parent/child relational hierarchy to organize the game's background objects. The background is made of multiple landscape elements that scroll by the camera. They all move at their own rate and this allowed me to create a parallax illusion. The parent of these layers was an empty object serving as a container for all of the individual panels. I did this because I have multiple sets of these parallax panels and thought that this could help me keep things organized and prefabricated. I also altered the pivot point of the parallax layers to be the bottom-left corner. I wanted to be able to accurately place the layers, and because they were sort of irregularly shaped, this seemed most convenient.

What I'd done was introduce multiple transform scopes with MANY child objects with scopes relative to the containers they belonged to. I was well aware of the parent-child relationship, transform and pivot scope concept as I have described previously. Everything was going great, things moved as I'd intended and no problems seemed to surface. All of this crumbled when I decided to change the way the background objects were managed. It isn't necessary to know those details to explain what followed.

Panels used to travel from right to left, then shift back to the right to begin again once they'd made it out of the camera's left hand view. Suddenly, I was seeing seams between background panels. To make it worse, panels were starting to overlap and the illusion I'd created was completely destroyed. The background looked like a chaotic scrolling mess. It seems I'd written my panel logic in a way that any changes applied, disrupted the delicate parent-child transform relationship. Even though I was well aware of the relationship, there were just too many layers of positional scope for my mind to handle by intuition alone. 

I spent the entire day trying to make my background panels return to their once working state. I considered my game pointless and dull without the parallaxed background. I was losing hope. I reset transforms and repositioned panels for hours; even began breaking up all parent-child relationships and adjusting pivot points. The further I tinkered in this mess, the worse it seemed to get. I was so close to rethinking the whole thing. I truly was in Inferno.

 ![Inferno](/../../images/dante.jpg)

# Pivot to Paradiso

Then suddenly after setting my pivots back to their center (actually bottom-center), and a few more adjustments that I swear I'd made many times already, the whole thing started working again like a well oiled parallax-machine.

I wasted an entire day descending the 9 circles of transformation-Inferno. I'd hung in pivot-point purgatory for hours. I'd lost all hope. Then, by some divine intervention, I was guided back to Paradiso. The sulfuric smell of transform-Inferno cleared. I once again saw the sun over the horizon of my parallaxed background. I'm not exactly sure how I was led from the depths. I do know however, what I'd seen and what I'd learned while I was down there...

--- 
1. Never again will I introduce so many layers of transform scope into my project. 
2. I will never again mess with pivot-points unless I adjust all pivots in accordance.
3. I will **always** initialize my transform components to (0,0,0).
4. I will never return to that inferno.

---

Never again do I want to revisit the horrors of that pit. I never want to relive that hopelessness of a broken, irredeemable project. Please internalize this tale. Don't let time slip from under you, by making these same mistakes. 

The slope into transformation-Inferno is slippery and the human mind fragile. 

**Please** protect yourself.

:: Tello-



