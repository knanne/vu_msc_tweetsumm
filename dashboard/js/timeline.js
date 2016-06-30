!(function (d3) {

  function make_chart() {

    $("#timeline").empty();

    var event_name = $("#select_event").val();
    var summary_type  = $("#select_summary").val();
    var threshold = +$("#threshold").val();

      var color = d3.scale.linear()
            .range(["#FF3D00", "#FFC107", "#4CAF50"]);

      var margin = {top: 20, right: 20, bottom: 30, left: 50},
          width = 960 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom;

      var formatDate = d3.time.format("%Y-%m-%d %H:%M:%S");

      var x = d3.time.scale()
          .range([0, width]);

      var y = d3.scale.linear()
          .range([height, 20]); //offset y-axis by 20, to fit nodes

      var xAxis = d3.svg.axis()
          .scale(x)
          .orient("bottom");

      var yAxis = d3.svg.axis()
          .scale(y)
          .orient("left");

      var line = d3.svg.line()
          .x(function(d) { return x(d.created_at); })
          .y(function(d) { return y(d.volume); });

      var area = d3.svg.area()
        .x(function(d) { return x(d.created_at); })
        .y0(height)
        .y1(function(d) { return y(d.volume); });

      var zoom = d3.behavior.zoom()
          .on("zoom", draw);

      var svg = d3.select("#timeline").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
          .call(zoom);

      d3.tsv("dat/event_"+event_name+"_summary_"+summary_type+".txt", type, function(error, data) {
        if (error) throw error;

        x.domain(d3.extent(data, function(d) { return d.created_at; }));
        y.domain(d3.extent(data, function(d) { return d.volume; }));

        color.domain([0, threshold / 2, threshold]);

        //clip outside bounding box (attributed to all objects)
        svg.append("defs").append("clipPath")
          .attr("id", "clip")
          .append("rect")
          .attr("width", width)
          .attr("height", height);

        svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .attr("clip-path", "url(#clip)")
          .call(xAxis);

        svg.append("g")
          .attr("class", "y axis")
          .call(yAxis);

        svg.append("path")
          .data([data])
          .attr("class", "line")
          .attr("d", line)
          .attr("clip-path", "url(#clip)");

        svg.append("path")
          .data([data])
          .attr("class", "area")
          .attr("d", area)
          .attr("clip-path", "url(#clip)");

        node = svg.selectAll("dot")
          .data(data.filter(function(d) { return d.rank <= threshold & d.rank != ''; }))
          .enter().append("circle")
            .classed("dot", true)
          .attr("r", function(d) { return Math.sqrt(10 * (threshold / d.rank)) + 3; })
          .style("fill", function(d) { return color(d.rank); })
          .attr("clip-path", "url(#clip)")
          .on("mouseover", function(d){
            d3.select("#tooltip")
              .style("left", (d3.event.pageX+10) + "px")
              .style("top", (d3.event.pageY-10) + "px")
              .select("#value")
              .html("<strong>"+String(d.created_at).substring(0,21)+"</strong>"+"<br>"+d.text)
              d3.select("#tooltip").classed("hidden", false);
            })
          .on("mouseout", function(){
            d3.select("#tooltip").classed("hidden", true);
          })
          .on("click", function(d) { 
            $("#tweet")
              .attr("value", d.twitter_id)
            .trigger("change");
          });

        svg.selectAll("text")
          .data(data.filter(function(d) { return d.rank <= threshold; }))
          .enter().append("text")
            .classed("text", true)
            .text(function(d) { return d.show_text; })
            .attr("clip-path", "url(#clip)");

        zoom.x(x);
       
        draw();

      });

      function type(d) {
        d.created_at = formatDate.parse(d.created_at);
        d.volume = +d.volume;
        d.rank = +d.rank;
        return d;
      }

      function draw() {
          svg.select("g.x.axis").call(xAxis);
          svg.select("g.y.axis").call(yAxis);
          svg.select("path.line").attr("d", line);
          svg.select("path.area").attr("d", area);

          svg.selectAll("circle")
            .attr("cx", function(d) { return x(d.created_at); })
            .attr("cy", function(d) { return y(d.volume); });

          svg.selectAll("text")
            .attr("x", function(d) { return x(d.created_at) + 10; })
            .attr("y", function(d) { return y(d.volume); });
      }

  };

  make_chart();

})(d3);