// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 30},
    width = 700 - margin.left - margin.right,
		height = 500 - margin.top - margin.bottom;

var formatCount = d3.format(",.0f");		

// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select(".bar").append("svg") // data join
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
  	.append("g")
  	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//set the ranges
var xScale = d3.scaleLinear()
	// .range([0, width]);
	.rangeRound([0, width]);

var xAxis;

var attribute_selector = 0; // to select sepal width, petal length etc.

var headerText = "Iris Setosa: Sepal Length";

drawHist = function (i) {}

d3.csv("static/iris.csv", start)

function start (err, data) {
	if (err)
		console.error(err);

	var nested = d3.nest()
		.key(function (d) {return d.Name})
		.entries(data);
	
	for (j = 0; j < 3; j++) {

		nested[j].sepal_length_array = [];
		nested[j].sepal_width_array = [];
		nested[j].petal_length_array = [];
		nested[j].petal_width_array = [];

		for (i = 0; i < nested[j].values.length; i++) {
			nested[j].sepal_length_array.push(+nested[j].values[i].Sepal_Length)
			nested[j].sepal_width_array.push(+nested[j].values[i].Sepal_Width)
			nested[j].petal_length_array.push(+nested[j].values[i].Petal_Length)
			nested[j].petal_width_array.push(+nested[j].values[i].Petal_Width)
		}
	}
	// console.log(nested);
	drawHist = function (i) {

		headerText = "";

		switch (i) {
			case 0:
				headerText = "Iris Setosa: ";
				break;
			case 1:
				headerText = "Iris Veriscolor: ";
				break;
			case 2:
				headerText = "Iris Virginica: ";
				break;
		}

		var binsData;
		// console.log(xScale);
		switch (attribute_selector) {
			case 0:
				headerText += "Sepal Length";
				//d3.extent(array) returns the minimum and maximum value of the array
				xScale.domain(d3.extent(nested[i].sepal_length_array));
				// console.log(xScale.domain());
				binsData = d3.histogram()
				// .domain(xScale.domain())
				.thresholds(xScale.ticks(10))(nested[i].sepal_length_array);
				// console.log("binsdata",binsData);
				break;
			case 1:
				headerText += "Sepal Width";
				xScale.domain(d3.extent(nested[i].sepal_width_array));
				binsData = d3.histogram().thresholds(xScale.ticks(10))(nested[i].sepal_width_array);
				// console.log("binsdata", binsData);
				break;
			case 2:
				headerText += "Petal Length";
				xScale.domain(d3.extent(nested[i].petal_length_array));
				binsData = d3.histogram().thresholds(xScale.ticks(10))(nested[i].petal_length_array);
				// console.log("binsdata",binsData);
				break;
			case 3:
				headerText += "Petal Width";
				xScale.domain(d3.extent(nested[i].petal_width_array));
				binsData = d3.histogram().thresholds(xScale.ticks(10))(nested[i].petal_width_array);
				// console.log('binsData', binsData);
				break;
		}
		// console.log(nested[i].petal_width_array);
		// console.log(xScale.domain());

		//set y range
		var yScale = d3.scaleLinear()
		.domain([0, d3.max(binsData, function(d) { return d.length; })])
		.range([height, 0]);

		yScale.domain([0, d3.max(binsData, function(d) { return d.length; })]);
		// console.log(yScale.domain());
		
		var barContent = svg.selectAll(".bar")
		    .data(binsData);
		// console.log(barContent);
		var barEnter = barContent.enter().append("g")
		    .attr("class", "bar")
		    .attr("transform", function(d) { 
		    	// console.log("d", d);
					// console.log("d.length", d.length);
					// console.log("d.x0", d.x0);
		    	return "translate(" + (xScale(d.x0)) + "," + yScale(d.length)	 + ")"; });
		// console.log('barenter',barEnter);
		barEnter.append("rect")
	    	.attr("x", 1)
	    	.attr("width", 50)
	    	.attr("height", function(d) {
					// console.log("height", height);
					// console.log("d.length", d.length);
					// console.log("yScale", yScale(d.length));
					return height - yScale(d.length); });

		// console.log('rerender text')
		// console.log(binsData)
		// barEnter.remove("text")
		barEnter.append("text")
		    .attr("dy", ".5em")
		    .attr("y", 6)
				// .attr("x", 50)
				.attr("x", (xScale(binsData[0].x1) - xScale(binsData[0].x0))/2)
		    .attr("text-anchor", "middle")
		    // .text(function(d) { return formatCount(d.length); });

		var updateSelection = svg.selectAll(".bar")
			.transition()
			.duration(500)
		    .attr("transform", function(d) { return "translate(" + xScale(d.x0) + "," + yScale(d.length)	 + ")"; });

		updateSelection.select("rect")
	    	.attr("x", 1)
	    	.attr("width", 50)
	    	.attr("height", function(d) { return height - yScale(d.length); });

	    barContent.exit()
	    	.transition()
	    	.duration(500)
	    	.style("opacity", "0")
	    	.remove();	
		
		xAxis = d3.axisBottom()
		    .scale(xScale)
		    .tickSize(-height)
		    .tickPadding(2);
		
		svg.append("g")
		    .attr("class", "axis")
				.attr("transform", "translate(0," + height + ")")
				.call(d3.axisBottom(xScale));
	}

	drawHist(0);

}

function changeAttribute(i) {
	attribute_selector = i;
}

function displayHist (i) {

	switch (i) {
		case 0:
			drawHist(0);
			d3.select(".header").text(headerText);

			svg.select(".axis")
				.remove()

			svg.select(".axis")
				.transition()
				.duration(250)
				// .call(xAxis);
				.call(d3.axisBottom(xScale));
			
			break;
		case 1:
			drawHist(1);
			d3.select(".header").text(headerText);
			svg.select(".axis")
				.remove()

			svg.select(".axis")
				.transition()
				.duration(250)
				.call(d3.axisBottom(xScale));
			break;
		case 2:
			drawHist(2);
			
			d3.select(".header").text(headerText);
			
			svg.select(".axis")
				.remove()

			svg.select(".axis")
				.transition()
				.duration(250)
				.call(d3.axisBottom(xScale));	
			break;
	}
}