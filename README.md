# Title

This is a basic notes app, containing the basic features, as well as some extra work. 
[deployed url](http://schneider-cs52-notes.surge.sh)

## What Worked Well
The basic notes app worked well overall, particularly function passing, tracking position, and updating/rendering the zIndex. I put a fair amount of effort into making the site friendly and usable, without glitchy CSS or textbox overflow. 

## What Didn't AKA Mount Transitions

I decided that I wanted to have the notes pop up whenever you create a new one. I went to my css file, and added a transistion that worked very nicely, looked very good. Unfortunately it also triggered when opening the app instead of just note creation so I added in a fade-in for the whole app to hide that. However, there was another glitch. Sometimes, but not always, when you click on a note, then click on a different note, that note will undergo the transition a second time, when it should only every run once per note. This became quite annoying so I went with another approach. Next, I used ReactTransitionGroups for note animations. These note animations worked well for a while, except they broke the delete function. When the notes were deleted the call was passed to the firebase and the state updated, but for some reason the DOM did not update, instead leaving a note stripped of data. So I decided to call it quits and not have the transition.  

## Extra Credit

I implemented multiple note pages that can be alternated between on the main page. A user can switch between and edit the notes of different categories. Additionally, Z-index was fully implemented, and clicking on a note will bring it to the front. This was accomplished with ordering through the Immutable Ordered Map and rendering order based on Z-index. See screenshots

# CROSS SITE SCRIPTING
With the use of dangerously setting HTML in the sites, I went around and added presents to my classmates sites, exploiting the html insert with a harmless XSS attack.

I would of course never be at risk myself, so I used the XSS package to sanitize my inputs. 
## Screenshots
<img width="690" alt="Screen Shot 2020-07-25 at 9 52 13 PM" src="https://user-images.githubusercontent.com/48935297/88471069-b215bb00-cec1-11ea-9d99-d4bdc91205d1.png">
<img width="619" alt="Screen Shot 2020-07-25 at 9 37 17 PM" src="https://user-images.githubusercontent.com/48935297/88471071-b4781500-cec1-11ea-84ef-2cb8ea6b1666.png">
<img width="852" alt="Screen Shot 2020-07-25 at 9 37 12 PM" src="https://user-images.githubusercontent.com/48935297/88471072-b641d880-cec1-11ea-92bc-754ea48740d9.png">
