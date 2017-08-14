
function kMeans(elt, w, h, numPoints, numClusters, maxIter) {
    
    // the current iteration
    var iter = 1,
        centroids = [],
        points = [];
        
    var margin = {top: 30, right: 20, bottom: 20, left: 30},
        width = w - margin.left - margin.right,
        height = h - margin.top - margin.bottom;

    var colors = ['#FCE181','#EDEAE5', '#9FEDD7' ];
    
    var svg = d3.select(elt).append("svg")
        .style("width", width + margin.left + margin.right)
        .style("height", height + margin.top + margin.bottom);
        
    var group = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    svg.append("g")
        .append("text")
        .attr("class", "label")
        .attr("transform", "translate(" + (width - margin.left - margin.right) + 
            "," + (height + margin.top + margin.bottom) + ")")
        .text("");

    /**
     * Computes the euclidian distance between two points.
     */
    function getEuclidianDistance(a, b) {
        var dx = b.x - a.x,
            dy = b.y - a.y;
        return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    }
    
    /**
     * Returns a point with the specified type and fill color and with random 
     * x,y-coordinates.
     */
    function getRandomPoint(type, fill) {
        
        return { 
            x: Math.round(Math.random() * width), 
            y: Math.round(Math.random() * height),
            type: type,
            fill: fill 
        };
    }

    /** 
     * Generates a specified number of random points of the specified type.
     */
    function initializePoints(num, type) {
        
        var result = [];
        for (var i = 0; i < num; i++) {
            var color = colors[i];
            var point = {
                x: Math.round(50 * iris_list[i].petal_length),
                y: Math.round(50 * iris_list[i].petal_width),
                type: type,
                fill: color
            }
            point.id = point.type + "-" + i;
            result.push(point);
        }
        return result;
    }

    function initializeCentroids(num, type) {
        let result = [];
       for (let i=0; i < num; i++) {
           let color = colors[i];
        let centroid = {
            x: Math.round(50 * iris_list[Math.round(Math.random() * 20)].petal_length),
            y: Math.round(50 * iris_list[Math.round(Math.random() * 20)].petal_width),
            type: type,
            fill: color
            };
        centroid.id = centroid.type + "-" + i;
        result.push(centroid);
       }

       return result;
    }

    /**
     * Find the centroid that is closest to the specified point.
     */
    function findClosestCentroid(point) {
        var closest = {i: -1, distance: width * 2};
        centroids.forEach(function(d, i) {
            var distance = getEuclidianDistance(d, point);
            // Only update when the centroid is closer
            if (distance < closest.distance) {
                closest.i = i;
                closest.distance = distance;
            }
        });
        return (centroids[closest.i]); 
    }
    
    /**
     * All points assume the color of the closest centroid.
     */
    function colorizePoints() {
        points.forEach(function(d) {
            var closest = findClosestCentroid(d);
            d.fill = closest.fill;
        });
    }

    /**
     * Computes the center of the cluster by taking the mean of the x and y 
     * coordinates.
     */
    function computeClusterCenter(cluster) {
        return [
            d3.mean(cluster, function(d) { return d.x; }), 
            d3.mean(cluster, function(d) { return d.y; })
        ];
    }
    
    /**
     * Moves the centroids to the center of their cluster.
     */
    function moveCentroids() {
        centroids.forEach(function(d) {
            // Get clusters based on their fill color
            var cluster = points.filter(function(e) {
                return e.fill === d.fill;
            });
            // Compute the cluster centers
            var center = computeClusterCenter(cluster);
            // Move the centroid
            d.x = center[0];
            d.y = center[1];
        });
    }

    /**
     * Updates the chart.
     */
    function update() {
    
        var data = points.concat(centroids);
        
        // The data join
        var circle = group.selectAll("circle")
            .data(data);
            
        // Create new elements as needed
        circle.enter().append("circle")
            .attr("id", function(d) { return d.id; })
            .attr("class", function(d) { return d.type; })
            .attr("r", 5);
            
        // Update old elements as needed
        circle.transition().delay(10).duration(100)
            .attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; })
            .style("fill", function(d) { return d.fill; });
        
        // Remove old nodes
        circle.exit().remove();
    }

    /**
     * Updates the text in the label.
     */
    function setText(text) {
        svg.selectAll(".label").text(text);
    }
    
    /**
     * Executes one iteration of the algorithm:
     * - Fill the points with the color of the closest centroid (this makes it 
     *   part of its cluster)
     * - Move the centroids to the center of their cluster.
     */
    function iterate() {
        
        // Update label
        setText("Iteration " + iter);

        // Colorize the points
        colorizePoints();
        
        // Move the centroids
        moveCentroids();
        
        // Update the chart
        update();
    }

    /** 
     * The main function initializes the algorithm and calls an iteration every 
     * two seconds.
     */
    function initialize() {
        
        // Initialize random points and centroids
        centroids = initializeCentroids(numClusters, "centroid");
        points = initializePoints(numPoints, "point");
        
        // initial drawing
        update();
        
        var interval = setInterval(function() {
            if(iter < maxIter + 1) {
                iterate();
                iter++;
            } else {
                clearInterval(interval);
                setText("Done");
            }
        }, 2 * 1000);
    }

    // Call the main function
    initialize();
}

