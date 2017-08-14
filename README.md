# Clustering Visualiztion

[LiveSite][Clustering]

[Clustering]: https://clustervisualization.herokuapp.com/

Machine learning has become particularly popular in the recent years. Computers are able to perform complex tasks without human interference. We wanted to introduce the basics of machine learning.

For our project, we have decided to build data visualizations of a machine learning algorithm called K-means clustering. We want to provide an intuitive visual for this popular algorithm. The goal of this algorithm is to find groups in the data, with k number of groups. This algorithm works iteratively to assign data points to a group based on similarities. K-means clustering is an example of unsupervised learning, where data has not been explicitly labeled.

Clustering is often used in the industry to study user purchase behavior or group images and videos.

![Website](https://user-images.githubusercontent.com/26496447/29264745-1d17c0b8-8093-11e7-9db0-7541651c65a7.gif)

## Features

  * Users can scroll through page to view visualizations of K-means clustering
  * Explains how the K-means clustering algorithm is implemented
  * Animated visualizations using D3.js and X3Dom.js


## Project Design
[dev-readme]: docs/README.md
[wireframes]: docs/wireframes

[Development README][dev-readme]

[Wireframes][wireframes]


#### D3.js - Animated Visualiztions

Our webpage relies on D3 to render visualizations of the algorithm. The D3 library allows for data to be displayed dynamically. This library uses HTML, CSS, and SVG to manipulate the DOM. Below is an example of how we used D3 to update the position of the centroids for our 2D visualization.

```javascript
function update() {
    
        let data = points.concat(centroids);
        
        let circle = group.selectAll("circle")
            .data(data);
            
        circle.enter().append("circle")
            .attr("id", function(d) { return d.id; })
            .attr("class", function(d) { return d.type; })
            .attr("r", 5);
            
        circle.transition().delay(10).duration(100)
            .attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; })
            .style("fill", function(d) { return d.fill; });
        
        circle.exit().remove();
    }

```


![Click](https://user-images.githubusercontent.com/26496447/29265125-aa51d706-8094-11e7-9751-8138702e5a13.gif)

#### 2D K-means Clustering

The dictionary used in the game was built on a trie data structure, allowing for efficient search. The structure starts with a root node which is an empty string. Every other node represents a word or prefix of one or more words. Each node represents a character, and each node's descendants have a common prefix.

```javascript
contains(word) {
  let currentNode = this.root;
  //check to see if character node exists in children
  for(let i = 0; i < word.length; i++) {
    let char = word[i];
    if (currentNode.children[char]){
      //next depth of the trie
      currentNode = currentNode.children[char];
    }
    else {
      //not a valid word
      return false;
    }
  }
  return currentNode.isWord;
}
```



#### ScrollMagic - Scroll Interactions

After a word is selected and verified, those squares will be replaced by new letters. Users can also click the 'reset' button to reset the board.

```javascript
replace() {

    const $selected = $(".selected");
    $selected.each(function(index) {
      const letter = LETTERS[Math.floor(Math.random() * LETTERS.length)];
      let newLetter = $($selected[index]);
      newLetter.text(letter);
    });
    $(".selected").addClass("animated fadeInUp");
    $(".square").removeClass("selected");

}
```


## Future features

#### Adding Levels
Allow users to choose different levels of difficulty.

#### Bonuses
Depending on the difficulty of the word, certain words will receive extra points.