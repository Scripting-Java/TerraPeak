# TerraPeak
A game where you simulate & try to build the largest population possible.
This is a simulator, so the numbers obviously aren't real. 
Play at: https://scripting-java.github.io/TerraPeak

## Objective
Build the largest population possible, by managing your workers, keeping an eye on the weather, looking at your civilian composition, and a bunch of other variables, just like managing a real society! (Just kidding, it's a very crude approximation)
After you do all that, you can ascend mountains which have perks, and your goal is to ascend to the tippy top of Mt. Everest.

## Features:
- You start with 20 people, on mount Washington. 
- Your people are either civilians or workers
- Civilians can be normal, shiny, or lazy
- Normal and shiny civilians are buffs, and lazy civilians are a nerf
- The game chooses for you :P otherwise it wouldnt be a simulator
- You also get workers
- Workers produce a specific good that your civlization need
- So in this case, peaches, gas, and wood
- Wood keeps you farm through fire
- Peaches give you food
- Gas is energy
- Upgrades: You can upgrade each worker's production
- Weather: Weather gives you buffs/nerfs
- Forest: Each time a lumberjack cuts down a tree, it has to regrow, so there's a regrow delay.

## How To Play
So I reccomend clicking on the side panel to learn about everything first.
You can open up the workers panel, and then click on the individual worker titles to hire workers.
Keep in mind there's a minimum civilian count you must have. 
Each worker gathers a different type of resource.
The quick rundown is:
- Lumberjack = wood
- Researcher = Gas
- Farmer= peaches

Your first few runs will likely be unsustainable.
However, you'll learn as you play.
Every time you fail, please look through the sidebar because that'll tell you what caused you to fail.
For example, if you start with subZero weather on your first run, then you'll need to prepare more adequately. 
Furthermore, having more civilians is sometimes good.
Having lots of shiny civilians is a lot better than having a lot of workers.
For example, if I remember correctly, having 21 shiny civilians is the same as having more than 21 extra workers in each field. 

Press the run cycle button to run a cycle and see the result!

## Population
So as I said before your population is the main objective and they're either workers or civilians.
There's a dedicated panel to each of them.

There are three civilian types
Normal: 1.05X boost
Shiny: 1.2 boost
Lazy: 2% nerf

## Mountains
So in the mountains panel, you'll be able to unlock more mountains. The higher your altitude the more your buffs
So life actually gets easier to sustain up there.
However, the trap then becomes managing 200 people and doing all your math properly.
Having more people means you have a higher working corpus, but you also have to be more responsible.
Higher mountains also give you access to more trees, peach farms, and gas vents which you'll need.

## Running locally:
clone the repo at https://github.com/Scripting-Java/TerraPeak
install dependencies and run npm run dev.
However, I reccomend the web version!

## Apologies :(
This game was honestly going to be a lot bigger and be a lot more automated and less hands on. 
Unfortunately, I had way too many tests and school stuff to actually finish the game. 
I'm really sorry it turned out like this, but I tried my best.
