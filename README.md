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




#### 2D K-means Clustering

K-means Clustering algorithm calculates the distance between each data point and its centroid. The data point is then assigned to the closest centroid, resulting in clusters. This algorithm works iteratively until a maximum number of iterations is reached. We then render the result using D3.js.

```javascript
function moveCentroids() {
        centroids.forEach(function(d) {
            
            let cluster = points.filter(function(e) {
                return e.fill === d.fill;
            });
           
            let center = computeClusterCenter(cluster);
          
            d.x = center[0];
            d.y = center[1];
        });
    }

function findClosestCentroid(point) {
        let closest = {i: -1, distance: width * 2};
        centroids.forEach(function(d, i) {
            let distance = getEuclidianDistance(d, point);
            
            if (distance < closest.distance) {
                closest.i = i;
                closest.distance = distance;
            }
        });
        return (centroids[closest.i]); 
    }
    
```

![Click](https://user-images.githubusercontent.com/26496447/29265125-aa51d706-8094-11e7-9751-8138702e5a13.gif)

#### PCA - Principal Component Analysis
Principal Component Analysis (PCA) is a technique used to transform a high-dimensional dataset into a lower-dimensional subspace prior to running a machine learning algorithm on the data. It makes data easy to describe and visualize. 
![Click](https://user-images.githubusercontent.com/26496447/29265623-9334b6fe-8096-11e7-9b77-9b1b608be457.gif)


#### X3DOM - 3D Visualization
This library allows DOM manipulation in a 3D space. We are able to animate the K-means algorithm using 3D scene. The scene can be dragged to be viewed at different angles in space. 

![Click](https://user-images.githubusercontent.com/26496447/29265793-31b09528-8097-11e7-91e9-1f84d959cc82.gif)



#### ScrollMagic - Scroll Interactions

ScrollMagic.io allows animations or functions to be invoked based on a scroll trigger element. We set the trigger element to be a certain HTML element. When the user scrolls and reaches that element on the page, the function is invoked.

```javascript
   let twoD = new ScrollMagic.Scene({
                    triggerElement: "#kmeans",
                    triggerHook: 'onEnter',
                    duration: 200
                }).on('start', function(e){
                        if (e.scrollDirection == "FORWARD" && count === 0){
                        kMeans("#kmeans", 400, 400, 150, 3, 15);
                        count += 1;

                        }
                })
                .addTo(ctrl);

}
```

### Iris Dataset Source
UCI Machine Learning Repository

## Future features

#### Adding a real life example analysis
We want to use our algorithm to visualize a practical example (i.e customer segmentation or social circles)

