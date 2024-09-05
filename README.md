# Random Map Tile Generator
A Node.js application that randomly generates maps for 2D tile-based games using an XY grid system.

![Animated gif with examples of generated maps](images/maps.gif)

![Detail of a generated map](images/sample.png)

## Installation

    git clone https://github.com/iacoposk8/Random-Map-Tile-Generator
    cd Random-Map-Tile-Generator
    node index.js
The script will generate a tmx file that can be opened with [Tiled](https://www.mapeditor.org)

## TODO

 - The generation of the roads needs improvement; they are very
   unnatural, too straight, and the curves are too rigid.  
 - Villages should emerge at the points where the roads intersect.

## Credits
The tilesets were taken from [RPG-JS](https://github.com/RSamaium/RPG-JS)
