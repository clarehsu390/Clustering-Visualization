//author Brian Thorne
//github: https://gist.github.com/hardbyte/40cd6622cffbe98055d3#file-index-html
var margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 50
    },
    width = 700 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var X = d3.scaleLinear()
    .range([0, width]);

var Y = d3.scaleLinear()
    .range([height, 0]);

var svg_pca = d3.select("#pca").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var numSamplesPerFrame = 60,
    numSamples = 0;

var xdata = [],
    ydata = [];

var finalData;


var components = svg_pca.selectAll("line")
    .data([
        [
            [0.5, 0.5],
            [1, 0.5], "X"
        ],
        [
            [0.5, 0.5],
            [0.5, 1], "Y"
        ],
    ], function(d, i) {
        return d[2];
    });

components.exit().remove();
components.enter().append('line')
    .attr('stroke', '#026670')
    .attr('x1', function(d) {
        return X(d[0][0]);
    })
    .attr('y1', function(d) {
        return Y(d[0][1]);
    })
    .attr('x2', function(d) {
        return X(d[1][0]);
    })
    .attr('y2', function(d) {
        return Y(d[1][1]);
    })
    .attr("stroke-width", 3);

function rnd(mean, std) {
    var r = 0;
    for (var i = 0; i < 10; i++) {
        r += Math.random() * 2 - 1
    }
    return r * std + mean;
}

function covariance(x_adjust, y_adjust, n) {
    var total = 0;
    for (var i = 0; i < x_adjust.length; i++) {
        total += x_adjust[i] * y_adjust[i];
    }
    return total / (n - 1);
}

function solve() {
    var n = xdata.length;
    var x_mean = xdata.reduce(function(memo, num) {
        return memo + num;
    }, 0) / n;
    var y_mean = ydata.reduce(function(memo, num) {
        return memo + num;
    }, 0) / n;

    // Subtract the mean
    var x_adjust = xdata.map(function(num) {
        return num - x_mean;
    });
    var y_adjust = ydata.map(function(num) {
        return num - y_mean;

    });

    // Calculate the covariance
    var xyc = covariance(x_adjust, y_adjust, n);
    var xxc = covariance(x_adjust, x_adjust, n);
    var yyc = covariance(y_adjust, y_adjust, n);

    var covar = [
        [xxc, xyc],
        [xyc, yyc]
    ];

    var eig = numeric.eig(covar);

    var eigs = eig.E.x;

    // Plot eig unit vectors centered at the mean
    var components = svg_pca.selectAll("line")
        .data([
            [
                [x_mean, y_mean],
                [x_mean + eigs[0][1], y_mean + eigs[0][0]],
                "Y"
            ],
            [
                [x_mean, y_mean],
                [x_mean + eigs[1][1], y_mean + eigs[1][0]],
                "X"
            ]
        ], function(d) {
            return d[2];
        });

    components.enter().append('line');
    components
        .attr('x1', function(d) {
            return X(d[0][0]);
        })
        .attr('y1', function(d) {
            return Y(d[0][1]);
        })
        .attr('x2', function(d) {
            return X(d[1][0]);
        })
        .attr('y2', function(d) {
            return Y(d[1][1]);
        });

    // Form a feature vector
    var featureVectorRow = [eigs[1]] //, eigs[0]];
    var data = [x_adjust, y_adjust];

    finalData = numeric.transpose(numeric.dot(featureVectorRow, data));
    setTimeout(move(), 1500);
}

function move() {
    var n = xdata.length;
    // Move the axis lines to normal positions
    var components = svg_pca.selectAll("line")
        .data([
            [
                [0.5, 0.5],
                [1, 0.5], "X"
            ],
            [
                [0.5, 0.5],
                [0.5, 1], "Y"
            ],
        ], function(d, i) {
            return d[2];
        });

    components.exit().remove();
    components.enter().append('line');

    // plot the new lower dimensional data
    var circle = svg_pca.selectAll("circle");

    circle
        .transition().duration(5000)
        .attr('cx', function(d, i) {
            return X(i / n);
        })
        .transition().duration(5000)
        .attr('cy', function(d, i) {
            return Y(0.5 + finalData[i][0]);
        });

    components
        .transition().duration(5000)
        .attr('x1', function(d) {
            return X(d[0][0]);
        })
        .attr('y1', function(d) {
            return Y(d[0][1]);
        })
        .attr('x2', function(d) {
            return X(d[1][0]);
        })
        .attr('y2', function(d) {
            return Y(d[1][1]);
        });

}


var t = d3.timer(function() {
    for (var i = 0; i < numSamplesPerFrame; ++i) {
        var a = rnd(0.6, 0.05),
            b = rnd(0.4, 0.08);

        var x = 0.65 * a + 0.35 * b,
            y = 0.20 * a + 0.80 * b;

        xdata.push(x);
        ydata.push(y);

    }

    var circle = svg_pca.selectAll("circle")
        .data(numeric.transpose([xdata, ydata]), function(d) {
            return d;
        });

    circle.enter().append("circle")
    // #9FEDD7
        .attr("fill", '#FCE181')
        .attr("cx", function(d, i) {
            return X(d[0]);
        })
        .attr("cy", function(d, i) {
            return Y(d[1]);
        })
        .attr("r", 2);

    circle.exit().remove();

    if (++numSamples > 10) {
        t.stop();
        // setTimeout(function(){
        //     solve();
        //     setTimeout(move(), 1500)}
        // , 1500)

      }
});
