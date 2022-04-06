$(document).ready(function() {
    console.log("Loaded Page");
    Working();

    $("#selDataset").on("change", function(){
        Working();
        $("#sample-metadata").empty();
    });
});

function Working() {
    // Read in data and print
    var url = "app/static/data/samples.json";
    ajaxRequest(url);
}

function ajaxRequest(url) {
    $.ajax({
        type: "GET",
        url: url,
        contentType: "application/json; charset=utf-8",
        success: function(info) {
            console.log(info);
            createDropdown(info);
            createMetadata(info);
            createBarChart(info);
            createBubbleChart(info);
            createGauge(info);
          
        },
        error: function(textStatus, errorThrown) {
            console.log("FAILED to get data");
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}

// create dropdown
    function createDropdown(info) {
        var names = info.names;
        for (let i = 0; i < names.length; i++) {
            let name = names[i];
            let html = `<option>${name}</option>`;
            $("#selDataset").append(html);
        }
    }
  //create metadata  
    function createMetadata(info) {
        let id = $("#selDataset").val();
        let content = info.metadata.filter(x => x.id == id)[0];
        console.log(content);
        Object.entries(content).map(function(x) {
            let html = `<h6>${x[0]}: ${x[1]}</h6>`;
            $("#sample-metadata").append(html);
    
    
        });
    }
    //create charts and graphs
    function createBarChart(info) {
        let id = $("#selDataset").val();
        let sample = info.samples.filter(x => x.id == id)[0];
    
        var trace1 = {
            type: 'bar',
            x: sample.sample_values.slice(0, 10).reverse(),
            y: sample.otu_ids.map(x => `OTU ${x}`).slice(0, 10).reverse(),
            text: sample.otu_labels.slice(0, 10).reverse(),
            orientation: 'h',
            marker: {color: 'magenta'},
            
        }
    
        var info1 = [trace1];
        var layout = {
            "title": "Number of Bacteria in Test Subject's Bellybutton",
            font: {
                family: 'Arial, monospace'
              },
            xaxis: {
                title: {
                  text: 'Number of Bacteria',
                  font: {
                    family: 'Arial, monospace'
                  }
                },
              },
              yaxis: {
                title: {
                  text: 'Type of Bacteria',
                  font: {
                    family: 'Arial, monospace'
                  }
                }
              }
            };

    
        Plotly.newPlot('bar', info1, layout);

    }
    
    
    
    function createBubbleChart(info) {
        let id = $("#selDataset").val();
        let sample = info.samples.filter(x => x.id == id)[0];
    
        var trace1 = {
            x: sample.otu_ids,
            y: sample.sample_values,
            text: sample.otu_labels.slice(0, 10).reverse(),
            mode: 'markers',
            marker: {
                size: sample.sample_values,
                color: sample.otu_ids,
                colorscale: "Picnic",
            }
        }
    
        var data1 = [trace1];
        var layout = {
            "title": "Amount of Bacteria in Subject's Belly Button",
            xaxis: {
                title: {
                  text: 'OTU ID',
                  font: {
                    family: 'Arial, monospace',
                    size: 15,
                    color: '#7f7f7f'
                  }
                },
              },
              yaxis: {
                title: {
                  text: 'Sample Values',
                  font: {
                    family: 'Arial, monospace',
                    size: 15,
                    color: '#7f7f7f'
                  }
                }
              }
            
        }
    
        Plotly.newPlot('bubble', data1, layout);
    }

    function createGauge(info){
        let id = $("#selDataset").val();
        let wash = info.metadata.filter(x => x.id == id)[0];
        console.log(wash)
        let freq = parseFloat(wash.wfreq)
        var trace = [
            {
              domain: { x: [0, 1], y: [0, 1] },
              value: freq,
              title: { text: "Belly Button Washing Frequency" },
              type: "indicator",
              mode: "gauge+number+delta",
              delta: { reference: 3 },
              gauge: {
                axis: { range: [null, 10] },
                steps: [
                  { range: [0, 5], color: "lightgray" },
                  { range: [5, 7], color: "gray" }
                ],
                threshold: {
                  line: { color: "red", width: 4 },
                  thickness: 0.75,
                  value: 9.5
                }
              }
            }
          ];
          
          var layout = { margin: { t: 0, b: 0 }}

          Plotly.newPlot('gauge', trace, layout);

    }
    
    