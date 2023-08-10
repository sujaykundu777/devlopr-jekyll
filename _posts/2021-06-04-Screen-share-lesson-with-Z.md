---
title: 'Screen share lesson with Z'
date: 2021-06-04
permalink: /posts/2021/06/Screen-share-lesson-with-Z/
tags:
  - Z
  - Unity
  - Devlog
  - 'Neon Cloud'
---

Tonight I got an invite from Z to have a screen share session on Discord. I was almost hesitant to jump on the call because phone calls have never been my forte. I always have awkward timing and have a terrible time interjecting over the phone. I rely very heavily on body language, hand gestures and the natural rhythm of an in person conversation. This is not to say I'm shy by any means. I believe that this hesitancy is just a symptom of my ADHD. I've become really good at recognizing these traits and growing past them or at the very least growing into them.
 
...Returning from that tangent road trip...
    
Z is my friend Q's mentor as well as a retired Senior Developer. Q is a Game Developer I met in my Game Design class this last semester. She introduced me to Z after inviting me to their discord server. The server... serves... as a meetup place for Unity devs and the meetups they are planning.
 
Recently I declared that I would from now on be "hanging my balls out there", to quote Jerry McGuire. I completely subscribe to this sentiment. I believe this is the only way I will attain my dream of being a professional game developer. Opportunities don't come to your door. They drive on by, often very quickly. They don't stop and open the door for you like a chauffeur there to serve you. You have to hail opportunities like a cab in an aggressive city. You have to jump onto the hood of opportunity and hope to find a handhold rather than launch off of the windshield into traffic. And an opportunity in your eyes isn't even always an opportunity in reality. This is the risk you take. I've been thrown off of the windshield into traffic many times throwing myself out there.
 
So cabs and balls aside, I joined the Discord session. Once we all got our sound settings tuned up to chat, conversation evolved naturally. There was no small-talk or awkward overly polite pleasantries. I shared my display with Z as he walked me through the concept of creating custom events in Unity. He showed me how to incorporate the Observer pattern into a Unity setting. I'd been familiar with the Observer Pattern from my years of C++ study. I am however, still very new to the relationships between files in Unity, so it's been a task getting my feet wet. He led me as a student and not an inferior developer. He gave me guidance but let me make the choices.
 
After just over an hour, I felt confident in dependency injection in a Unity setting. What he taught me in that hour changed my whole perspective on development. Not just in Unity, but in other realms of my development. I love that learning a concept in one setting can suddenly clear the fog from the map in so many other places of my interest. I always equate it to knowing multiple routes to and from a place, but never understanding where these routes are in relation to one another. Then there is this moment, where suddenly you feel you've gained a birds-eye view of the lay of the road system. Suddenly you can't "unsee" how all of the individual routes you've taken so many times are related in the scope of the whole road system. This is what I live for. This is why I do it! (Well beside the opportunity to create and to bring joy to others...) I love learning and this was like an intense hit of knowledge to my brain.
 
The concepts he guided me through allowed me to see how many concepts I'm familiar with could be used to better structure my games in Unity. The methods I wrote in that lesson utilize polymorphism, templated types, design patterns, interfaces, abstract classes, dependency injection, scriptable objects and manipulation of the Unity editor itself.
 
I owe Q a few lunches or something for this introduction to my new mentor. His guidance was loose, patient and in no way demeaning. I slept like a rock that night feeling like I'd accomplished so much in our Discord session. I've just met Z and I can tell there is so much knowledge contained in his brain that I just can't wait to soak up.
 
The road ahead looks bright...
 
:: Tello-
    p.s. I'll include the code I wrote in that call below.

```
// BaseGameEvent.cs

using System.Collections.Generic;
using SOEvents.Listeners;
using UnityEngine;

namespace SOEvents.Events {
    public abstract class BaseGameEvent<T> : ScriptableObject {
        private readonly List<IGameEventListener<T>> listeners = new List<IGameEventListener<T>>();

        public void Raise(T item) {
            for(int i = listeners.Count - 1; i >= 0; i -= 1) {
                listeners[i].OnEventRaised(item);
            }
        }

        public void RegisterListener(IGameEventListener<T> listener) {
            if(!listeners.Contains(listener)) {
                listeners.Add(listener);
            }
        }

        public void UnregisterListener(IGameEventListener<T> listener) {
            while(listeners.Contains(listener)) {
                listeners.Remove(listener);
            }
        }
    }
}
```

```
// OffscreenGameEvent.cs

using UnityEngine;
namespace SOEvents.Events{

[CreateAssetMenu(fileName = "New Game Event (OffscreenGameEvent)", menuName = "Events/New Game Event (OffscreenGameEvent)")]
public class OffscreenGameEvent : BaseGameEvent<OffscreenGameEventData> { }
```
```
// IGameEventListener.cs

namespace SOEvents.Listeners {

    public interface IGameEventListener<T> {

        void OnEventRaised(T item);
    }
}
```

```
// BaseGameEventListener.cs

using SOEvents.Events;
using UnityEngine;
using UnityEngine.Events;

namespace SOEvents.Listeners {
    public abstract class BaseGameEventListener<T, E, UER> : MonoBehaviour,
        IGameEventListener<T> where E : BaseGameEvent<T> where UER : UnityEvent<T> {
        [SerializeField] private E gameEvent;
        [SerializeField] private UER response;

        #region Properties

        public E GameEvent { get => gameEvent; set => gameEvent = value; }
        public UER Response { get => response; set => response = value; }

        #endregion Properties

        #region MonoBehaviour

        private void OnEnable() {
            GameEvent?.RegisterListener(this);
        }

        private void OnDisable() {
            GameEvent?.UnregisterListener(this);
        }

        #endregion MonoBehaviour

        #region Class Methods

        public void OnEventRaised(T item) {
            Response?.Invoke(item);
        }

        #endregion Class Methods
    }
}
```

```
// OffscreenGameEventListener

using UnityEngine;
using UnityEngine.Events;
using SOEvents.Events;

namespace SOEvents.Listeners{
    
public class OffscreenGameEventListener : BaseGameEventListener<OffscreenGameEventData, OffscreenGameEvent, UnityEvent<OffscreenGameEventData>> { }


}
```

``` 
// OffscreenGameEventTest

using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class OffscreenGameEventTest : MonoBehaviour
{
    public void Test(OffscreenGameEventData data){
        Debug.Log("U DED");
    }
}
```

## And it worked like a charm!
### ありがとう先生Z。



