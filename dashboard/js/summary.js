!(function (d3) {

  function make_summary() {

    $("#summary").empty();

    var event_name = $("#select_event").val();
    var summary_type  = $("#select_summary").val();
    var threshold = +$("#threshold").val();

    var formatDate = d3.time.format("%Y-%m-%d %H:%M:%S");

      d3.tsv("dat/event_"+event_name+"_summary_"+summary_type+".txt", type, function(error, data) {
        if (error) throw error;

        var summary_data = data.filter(function(d) { return d.rank <= threshold & d.rank != ''; });
        var summary_height = 14 * summary_data.length + 2;

        var svg = d3.select("#summary").append("svg")
          .attr("width", 1000)
          .attr("height", summary_height);
          
        svg.selectAll("text")
          .data(summary_data)
          .enter().append("text")
            .classed("text", true)
            .text(function(d, i) { return String("0"+i).slice(-2) + '|    ' + String(d.created_at).substring(0,21) + '|    ' + d.text; })
            .attr("x", 0)
            .attr("y", function(d, i) { return 10 + 14 * i + 2; });
        
      });

      function type(d) {
        d.created_at = formatDate.parse(d.created_at);
        d.volume = +d.volume;
        d.rank = +d.rank;
        return d;
      }

  };

  make_summary();

})(d3);