// Function that displays a Venn Diagram of the chosen features

function vennDiagram() {
      // set chart theme
      anychart.theme('pastel');

/** FOR INGA: you can add the code here to get data from the queries 
when you find a way to do that
*/
      var data = [
        {
          x: 'A',
          value: 50,
          name: 'DUMMY Disease 1',
          tooltipTitle: 'TIME \n Can be quickly made',
          normal: {fill: "#8ecafb 0.7"},
          hovered: {fill: "#8ecafb 1"},
          selected: {fill: "#8ecafb 1"}
        },
        {
          x: 'B',
          value: 100,
          name: 'DUMMY Disease 2',
          tooltipTitle: 'INGREDIENTS \n Key elements available',
          normal: {fill: "#ffeaa6 0.7"},
          hovered: {fill: "#ffeaa6 1"},
          selected: {fill: "#ffeaa6 1"}
        },
        
        {
          x: ['A', 'B'],
          value: 20,
          name: 'DUMMY Overlap',
          tooltipTitle: 'Possibility of disaster',
          tooltipDesc: 'Keep a backup ready',
          normal: {fill: "#9fdebe 0.8"},
          hovered: {fill: "#9fdebe 1"},
          selected: {fill: "#9fdebe 1"},
          hatchFill: {
            type:"weave",
            color: "#83c3a3"
          }    
        },
  
      ];

      // create venn diagram
      var chart = anychart.venn(data);

      // set chart title
      chart
        .title()
        .enabled(true)
        .fontFamily('Roboto, sans-serif')
        .fontSize(24)
        .padding({ bottom: 30 })
        .text('Overlap in brain region expression');

      // set chart stroke
      chart.stroke('1 #fff');

      // set labels settings
      chart
        .labels()
        .fontSize(16)
        .fontColor('#5e6469')
        .hAlign("center")
        .vAlign("center")
        .fontFamily('Roboto, sans-serif')
        .fontWeight('500')
        .format('{%Name}');

      // set intersections labels settings
      chart
        .intersections()
        .labels()
        .fontStyle('italic')
        .fontColor('#fff')
        .format('{%Name}');

      // disable legend
      chart.legend(false);

      // set tooltip settings
      chart
        .tooltip()
        .titleFormat('{%tooltipTitle}')
        .format("{%tooltipDesc}")
        .background().fill("#000 0.5");

      // set container id for the chart
      chart.container('container');

      // initiate chart drawing
      chart.draw();
    };