function kMeans3D() {
    // the current iteration
    var iter = 1,
        centroids = [],
        points = [],
        w = 600,
        h = 400,
        numPoints = 150,
        numClusters = 3,
        maxIter = 15;
        
    var margin = {top: 30, right: 20, bottom: 20, left: 30},
        width = w - margin.left - margin.right,
        height = h - margin.top - margin.bottom;

    var colors = ['#FCE181','#EDEAE5', '#9FEDD7' ];
    
    /**
     * Computes the euclidian distance between two points.
     */
    function getEuclidianDistance(a, b) {
        var dx = b.x - a.x,
            dy = b.y - a.y, 
            dz = b.z - a.z;
        return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2) + Math.pow(dz, 2));
    }
    
    /**
     * Returns a point with the specified type and fill color and with random 
     * x,y-coordinates.
     */
    
    function initializePoints(num, type) {
        
        var result = [];
        for (var i = 0; i < num; i++) {
            var color = colors[i % 3];
            var point = {
                x: pca_list[i].x,
                y: pca_list[i].y,
                z: pca_list[i].z,
                label: pca_list[i].label,
                type: type,
                fill: color
            };
            point.id = point.type + "-" + i;
            result.push(point);
        }
        return result;
    }

    function initializeCentroids(num, type) {
        let result = [];
       for (let i=0; i < num; i++) {
           let color = colors[i % 3];
        let centroid = {
            x: 0.5,
            y: 0.5,
            z: 0.5,
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
    
     // All points assume the color of the closest centroid.
     
    function colorizePoints() {
        points.forEach(function(d, i, arr) {
            var closest = findClosestCentroid(d);
            arr[i].fill = closest.fill;
        });
    }

    /**
     * Computes the center of the cluster by taking the mean of the x,y and z 
     * coordinates.
     */

    function computeClusterCenter(cluster) {
        return [
            d3.mean(cluster, function(d) { return d.x; }), 
            d3.mean(cluster, function(d) { return d.y; }),
            d3.mean(cluster, function(d) { return d.z; }),
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
            if (cluster.length === 0) {
                return;
            }
            // Compute the cluster centers
            var center = computeClusterCenter(cluster);
            // Move the centroid
            d.x = center[0];
            d.y = center[1];
            d.z = center[2];
        });
        

    }

    /**
     * Updates the chart.
     */
    function update() {

        var data = points.concat(centroids);

        var circle = scene.selectAll('.data-point').data(data);
        var ex = circle.exit().remove();

        var newCircle = circle.enter().append('transform')
            .attr("id", function(d) { return d.id; })
            .attr("class", 'data-point')
            .append('shape');

            newCircle.append("appearance")
            .append("material");

            newCircle.append('sphere')
            .attr('radius', function(d){ 
                if (d.type === "centroid") {
                    return 1.3;}
                else {
                    return 0.5; 
                }});

            circle.selectAll("shape appearance material")
            .attr("diffuseColor", function(d){return d.fill;});
            
            circle.transition().delay(50).duration(500)
            .attr('translation', function(d){ 
                    return x(d.x) + ' ' + y(d.y) + ' ' + z(d.z)});
            }

    /**
     * Executes one iteration of the algorithm:
     * - Fill the points with the color of the closest centroid (this makes it 
     *   part of its cluster)
     * - Move the centroids to the center of their cluster.
     */
     
    function iterate() {
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
                // setText("Done");
            }
        }, 15 * 1000);
    }

    // Call the main function
    initialize();
}

