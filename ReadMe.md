# Game Title: Roll & Go!

## Project Objective

1. To develop a game that fulfil the MVP - Requirements set.
2. Includes project planning details
   - User stories
   - Wireframes
   - Game architecture
   - Code architecture
3. Meet the project deadline

## Timeline

- Duration: 1 Week

## Game Description

- This is a 2 player game that requires each player to roll the dice to determine how many moves they can make on the path. Who make it to the end of the path first wins the game.

## How to play the Game

- WIP

## User Stories

### (MVP - Requirement)

- As a user, I want to see the <b>landing page</b> when I arrive at the website to know I'm in the right place.
- As a user, I want to be able to <b>key in my name</b>, so I know what is my character name.
- As a user, I want a <b>start game</b> button so I can start the game when I am ready.
- As a user, I want a <b>game page</b> after I clicked the start game button so I know the game has started.
- As a user, during the game I want to see <b>my character name/image shown</b> to indicate my presence.
- As a user, I want a <b>roll dice button</b> so I can roll the dice.
- As a user, I want to see what number is rolled <b>(my dice digit)</b>.
- As a user, I want to see my <b>character/marker moves</b> along the path.
- As a user, I want to know <b>who is the winner</b> of the game.

### (Stretch Goals - Not Mandatory)

- Includes all features in MVP Release.
- As a user, I could have a mystery item that provides boost to my character.
- As a user, I could have a mystery item that gives a disadvantage to my opponent.

## Game Architecture

### Landing Page

1. Landing Page: The system displays the landing page.
2. Enter Player 1 Name: User enters Player 1 name in the input fields
3. Submit Name Button: Player 1 click submit name button
4. Enter Player 2 Name: User enters Player 2 name in the input fields
5. Submit Name Button: Player 2 click submit name button
6. Start Game Button: Start game button appears after the 2nd player clicked submit button
7. Go to Game Page

```mermaid
flowchart TB
    LP[Landing Page] --> EP1[Enter Player 1 Name]
    EP1 --> SN1[Submit Name Button Player 1]
    SN1 --> EP2[Enter Player 2 Name]
    EP2 --> SN2[Submit Name Button Player 2]
    SN2 --> SGB[Start Game Button]
    SGB --> GP[Go to Game Page]
```

<br>

### Game Page

- WIP

## Wireframe

#### - Landing Page

![Landing Page Wireframe](assets-readme/wireframe/wf-1.png)

### - Game Page - Roll Stage - option 1

![Roll Stage Wireframe - 1](assets-readme/wireframe/wf-2.png)

### - Game Page - Roll Stage - option 2

![Roll Stage Wireframe - 2](assets-readme/wireframe/wf-3.png)

### - Game Page - Go Stage - option 1

![Go Stage Wireframe](assets-readme/wireframe/wf-4.png)

## Code Architecture

<br>

/_-------------- Constants -------------_/

/_---------- Variables (state) ---------_/

/_----- Cached Element References -----_/

/_---------- Render Functions ---------_/

/_-------------- Functions -------------_/

/_----------- Event Listeners ----------_/

<br>

## References

### JavaScript

- https://medium.com/@belloquadriolawale/the-getboundingclientrect-method-5cd13e206bcf
- https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect

### CSS

- https://www.w3schools.com/css/css_grid.asp
- https://www.geeksforgeeks.org/how-to-add-a-pressed-effect-on-button-click-in-css/
- https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Auto-placement_in_grid_layout

### Documentations

- MVC Architecture: https://www.geeksforgeeks.org/mvc-design-pattern/ <br>
- Mermaid Markdown: https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/creating-diagrams <br>
- Flow Chart Documentation: https://info.aiim.org/aiim-blog/flowcharting-in-business-process-management

### Game Assets Attribution

<a href="https://www.flaticon.com/free-icons/finish" title="finish icons">Finish icons created by Good Ware - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/start-button" title="start button icons">Start button icons created by Good Ware - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/medal" title="medal icons">Medal icons created by Vectors Market - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/reset" title="reset icons">Reset icons created by KP Arts - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/grenade" title="grenade icons">Grenade icons created by Flat Icons - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/bomb" title="bomb icons">Bomb icons created by max.icons - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/bomb" title="bomb icons">Bomb icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/forward" title="forward icons">Forward icons created by meaicon - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/up-chevron" title="up chevron icons">Up chevron icons created by Pixel perfect - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/chest" title="chest icons">Chest icons created by Freepik - Flaticon</a>
<br>
<a href="https://www.flaticon.com/free-icons/award" title="award icons">Award icons created by Freepik - Flaticon</a>
<br>
<a href="https://www.flaticon.com/free-icons/bomb" title="bomb icons">Bomb icons created by vectorsmarket15 - Flaticon</a>
<br>
<a href="https://www.flaticon.com/free-icons/rocket" title="rocket icons">Rocket icons created by Freepik - Flaticon</a>
<br>
<a href="https://www.flaticon.com/free-icons/grenade" title="grenade icons">Grenade icons created by Umeicon - Flaticon</a>
<br>
<a href="https://www.flaticon.com/free-icons/hot-air-balloon" title="hot air balloon icons">Hot air balloon icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/arrows" title="arrows icons">Arrows icons created by Maxim Basinski Premium - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/play-button" title="play button icons">Play button icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/dice" title="dice icons">Dice icons created by Nsit - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/dice" title="dice icons">Dice icons created by Nsit - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/location-marker" title="location marker icons">Location marker icons created by Earthz Stocker - Flaticon</a>.
<a href="https://www.flaticon.com/free-icons/dual-trigger-insurance" title="dual trigger insurance icons">Dual trigger insurance icons created by vectorsmarket15 - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/hot-air-balloon" title="hot air balloon icons">Hot air balloon icons created by Smashicons - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/hot-air-balloon" title="hot air balloon icons">Hot air balloon icons created by Freepik - Flaticon</a>

Sound Effect from <a href="https://pixabay.com/sound-effects/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=39222">Pixabay</a>

### Other References

- https://github.com/jahid28/Games/blob/main/SnakesAndLadder/game.js
