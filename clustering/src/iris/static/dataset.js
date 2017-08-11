let margin = {top: 10, right: 30, bottom: 30, left: 30},
width = 960 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom

let svg = d3.select(".bar").append("svg")
.attr("width", width + margin.left + margin. right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

let xScale = d3.scaleLinear()
.range([0, width]);

let xAxis;

let yScale = d3.scaleLinear()
.range([height, 0]);

let attribute_selector = 0;

let headerText = "Iris Setosa: Sepal Length";

drawHist = function(i) {}

d3.csv("../../iris.csv", start)

function start (err, data) {
	if (err)
		console.error(err);

	var nested = d3.nest()
		.key(function (d) {return d.type})
		.entries(data);

	for (j = 0; j < 3; j++) {

		nested[j].sepal_length_array = [];
		nested[j].sepal_width_array = [];
		nested[j].petal_length_array = [];
		nested[j].petal_width_array = [];

		for (i = 0; i < nested[j].values.length; i++) {
			nested[j].sepal_length_array.push(+nested[j].values[i].sepal_length)
			nested[j].sepal_width_array.push(+nested[j].values[i].sepal_length)
			nested[j].petal_length_array.push(+nested[j].values[i].petal_length)
			nested[j].petal_width_array.push(+nested[j].values[i].sepal_length)
		}
	}

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

		switch (attribute_selector) {
			case 0:
				headerText += "Sepal Length";
				xScale.domain(d3.extent(nested[i].sepal_length_array));
				binsData = d3.layout.histogram().bins(xScale.ticks(10))(nested[i].sepal_length_array);
				break;
			case 1:
				headerText += "Sepal Width";
				xScale.domain(d3.extent(nested[i].sepal_width_array));
				binsData = d3.layout.histogram().bins(xScale.ticks(10))(nested[i].sepal_width_array);
				break;
			case 2:
				headerText += "Petal Length";
				xScale.domain(d3.extent(nested[i].petal_length_array));
				binsData = d3.layout.histogram().bins(xScale.ticks(10))(nested[i].petal_length_array);
				break;
			case 3:
				headerText += "Petal Width";
				xScale.domain(d3.extent(nested[i].petal_width_array));
				binsData = d3.layout.histogram().bins(xScale.ticks(10))(nested[i].petal_width_array);
				break;
		}


		yScale.domain([0, d3.max(binsData, function(d) { return d.y; })])

		var barContent = svg.selectAll(".bar")
		    .data(binsData)
		
		var barEnter = barContent.enter().append("g")
		    .attr("class", "bar")
		    .attr("transform", function(d) { return "translate(" + xScale(d.x) + "," + yScale(d.y)	 + ")"; });
		
		barEnter.append("rect")
	    	.attr("x", 1)
	    	.attr("width", 110)
	    	.attr("height", function(d) { return height - yScale(d.y); });

		barEnter.append("text")
		    .attr("dy", ".75em")
		    .attr("y", 6)
		    .attr("x", 50)
		    .attr("text-anchor", "middle")
		    .text(function(d) { return d.y; });

		var updateSelection = svg.selectAll(".bar")
			.transition()
			.duration(500)
		    .attr("transform", function(d) { return "translate(" + xScale(d.x) + "," + yScale(d.y)	 + ")"; });

		updateSelection.select("rect")
	    	.attr("x", 1)
	    	.attr("width", 110)
	    	.attr("height", function(d) { return height - yScale(d.y); });

	    barContent.exit()
	    	.transition()
	    	.duration(500)
	    	.style("opacity", "0")
	    	.remove();	
		
		xAxis = d3.svg.axis()
		    .scale(xScale)
		    .orient("bottom")
		    .tickSize(-height)
		    .tickPadding(10);

		svg.append("g")
		    .attr("class", "axis")
		    .attr("transform", "translate(0," + height + ")")
		    .call(xAxis);
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
				.call(xAxis);
			
			break;
		case 1:
			drawHist(1);
			d3.select(".header").text(headerText);
			svg.select(".axis")
				.remove()

			svg.select(".axis")
				.transition()
				.duration(250)
				.call(xAxis);
			break;
		case 2:
			drawHist(2);
			
			d3.select(".header").text(headerText);
			
			svg.select(".axis")
				.remove()

			svg.select(".axis")
				.transition()
				.duration(250)
				.call(xAxis);		
			break;
	}
}


