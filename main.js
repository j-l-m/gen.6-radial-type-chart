	/*How not to use Highcharts.js*/
	
	
	//colors for each type, shown in the inner pie
	var colours = ["#A8A878","#C03028","#A890F0","#A040A0","#E0C068",
					"#B8A038","#A8B820","#705898","#B8B8D0","#F08030",
					"#6890F0","#78C850","#F8D030","#F85888","#98D8D8",
					"#7038F8","#705848","#EE99AC"];
	
	//names of each type, show in inner pie
	var type_names = ["Normal",	"Fighting",	"Flying",	"Poison", "Ground",	"Rock", 
				"Bug",	"Ghost",	"Steel",	"Fire",	"Water",	"Grass",	"Electric",
				"Psychic",	"Ice",	"Dragon",	"Dark",	"Fairy"];
				
	
	/*
	note: order of colours[] and type_names[] correspond to each other 
	e.g. type_names[0] is Normal and the colour for normal is at colours[0]
	*/
	
	/*The type matchups of each type.
	 e.g the array at 'normal' is the damage multiplier against each type in the order use by the type_names[] array
	 therefore the multiplier for normal vs rock is found at location [5] of the array (i.e. 0.5).
	
	*/
	var type_matchups = {
	
		normal : [1,1,1,1,1,0.5,1,0,0.5,1,1,1,1,1,1,1,1,1],
		fighting : [2,1,0.5,0.5,1,2,0.5,0,2,1,1,1,1,0.5,2,1,2,0.5],
		flying : [1,2,1,1,1,0.5,2,1,0.5,1,1,2,0.5,1,1,1,1,1],
		poison : [1,1,1,0.5,0.5,0.5,1,0.5,0,1,1,2,1,1,1,1,1,2],
		ground : [1,1,0,2,1,2,0.5,1,2,2,1,0.5,2,1,1,1,1,1],
		rock : [1,1,2,1,0.5,1,2,1,0.5,2,1,1,1,1,2,1,1,1],
		bug : [1,0.5,0.5,0.5,1,1,1,0.5,0.5,0.5,1,2,1,2,1,1,2,0.5],
		ghost : [0,1,1,1,1,1,1,2,1,1,1,1,1,2,1,1,0.5,1],
		steel : [1,1,1,1,1,2,1,1,0.5,0.5,0.5,1,0.5,1,2,1,1,2],
		fire : [1,1,1,1,1,0.5,2,1,2,0.5,0.5,2,1,1,2,0.5,1,1],
		water : [1,1,1,1,2,2,1,1,1,2,0.5,0.5,1,1,1,0.5,1,1],
		grass : [1,1,0.5,0.5,2,2,0.5,1,0.5,0.5,2,0.5,1,1,1,0.5,1,1],
		electric : [1,1,2,1,0,1,1,1,1,1,2,0.5,0.5,1,1,0.5,1,1],
		psychic : [1,2,1,2,1,1,1,1,0.5,1,1,1,1,0.5,1,1,0,1],
		ice : [1,1,2,1,2,1,1,1,0.5,0.5,0.5,2,1,1,0.5,2,1,1],
		dragon : [1,1,1,1,1,1,1,1,0.5,1,1,1,1,1,1,2,1,0],
		dark : [1,0.5,1,1,1,1,1,2,1,1,1,1,1,2,1,1,0.5,0.5],
		fairy : [1,2,1,0.5,1,1,1,1,0.5,0.5,1,1,1,1,1,2,2,1],
				
	};
			
		//Highcharts
		
	$(function () {
	
	//------pie chart set up-------------------	
			$('#container').highcharts({
				chart: {
					plotBackgroundColor: null,
					plotBorderWidth: null,
					plotShadow: false,
					type: 'pie'
				},
				colors: colours, //assign the colours[] defined above to the pie colors
				title: {
					text: 'Pokemon Gen.6 Interactive Type Chart'
				},
				subtitle: {
					text: 'Select By Attacking Type'
				},
				tooltip: {
					//pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
					enabled: false,
				},
				plotOptions: {
					pie: {
						allowPointSelect: true,
						cursor: 'pointer',
						borderWidth: 3,
						dataLabels: {
							enabled: true,
							distance: -30,
							//format: '<b>{point.name}</b>: {point.percentage:.1f} %',
							format: '<b>{point.name}</b>',
							style: {
								fontWeight: 'bold',
								fontSize:'14px',
								color: 'white',
								textShadow: '0px 2px 2px black'
							}
						}
					}
				},
				
				series: [{ //inner pie series
					name: 'Types',
					colorByPoint: true,
					size:"60%",			//size of inner pie
					innerSize: "40%",	//inner size of inner pie
					data: createData(), //create the data set for the inner pie
					point:{
						 events:{					//set event handler function for click event		
							click: rebuildSeries, 	//rebuilds the outer pie based based on selection
						 }
					 },
				},
				{//2nd series, outer pie
				colorByPoint: true,
				allowPointSelect:false,
				states: { //disabled hover. I would like to replicate the hover halo effect on damage values that are not 1x, can't figure out how 
					hover: {
						enabled: false
					}
				},
				size:"80%",			//size of outer pie
				innerSize: "80%",   //inner size of outer pie
				data:createDmgData("Normal")
				}]
			});  
	//----------------end of chart set up------------------	
			
			
			
			//label (String str, Number x, Number y, String shape, Number anchorX, Number anchorY, Boolean useHTML, Boolean baseline, String className)
			
			var chart = $("#container").highcharts();  //chart object
			
			//used to center the label in middle of donut. Would like a better way of doing this 
			var posX = chart.plotLeft + (chart.plotWidth  * 0.5);
			var posY = chart.plotTop  + (chart.plotHeight * 0.5);
			
			var label = chart.renderer.label(type_names[0], posX-30, posY-20)
						.css({
							fontSize: 14,
							color: "#ffffff" //text color
						})
						.attr({
							fill: colours[0], //because Normal is set by Default
							width:50,
							height: 20,
							padding: 8,
							r: 5,
							zIndex: 6
						});		
						
			label.add();		//add the label to the chart	
			
			
//---------------------Functions--------------------------------------

		/*
		 Creates the data for Series 1, the inner pie chart
		 and sets the default selected options
		 Returns the data set as an array
		*/		
		function createData(){
			var data = [];
			for(var i = 0; i<type_names.length; i++){
				data.push({
							name : type_names[i], 
							y: 20, //y is set to 20 because there are 18 types and I needed the pie divided evenly
						});
			}
			//set defaults
			data[0].sliced = true;
			data[0].selected = true;
			return data;
		}
		
		
		
		/*
		 Creates the data for Series 2, the outer pie chart
		 and sets the default selected options
		 Returns the data set as an array
		*/		
		function createDmgData(type){
		
			matchups = type_matchups[type.toLowerCase()];
			var data = [];
			var highlight = false;
			for(var i = 0; i<matchups.length; i++){
				if(matchups[i]!==1) highlight = true; //ignore
				data.push({
							name : matchups[i]+"x", //e.g display multiplier as 1x rather than 1
							y: 20, 
							color: dmgColor(matchups[i]), //assign the color based on damage multiplier
							selected: highlight,//ignore
							});
				highlight = false;//ignore
			}
			return data;
		}
		
		
		
		/*
		 Assigns the appropriate color to the outer pie slice based on the value of the damage multiplier
		 
		*/
		function dmgColor(dmg){
			switch(dmg){
				case 2:
					return "#5cd65c"; //green for 2x damage
				
				case 1:
					return 'rgba(0,0,0,0.1)';//black with 10% opacity for 1x damage
				
				case 0:
					return "black"; //black for 0x damage
				
				default:
					return "#ff4d4d"; //red for 0.5x damage
			}
		}
		
		
		/*
		 Rebuild the second series (damage values or outer pie chart values) and updates teh chart
		 Also updates the label at the centre 
		 Assigned to the point click event of the inner pie chart
		*/	
		function rebuildSeries(event){

			var chart = $("#container").highcharts();
			editLabel(this); //this ==  the point object that was clicked	
			//rebuild series data and update chart
			chart.series[1].update({
				pointStart: chart.series[1].pointStart,
				data: createDmgData(this.name)
			}, true);
		}
			
		/*
		 Changes the text and color of the label based on the selected point on inner pie chart
		*/
		function editLabel(point){
			label.attr({text: point.name});
			label.attr({fill: point.color});
		}
			
			
			
			
			
	});//end of function wrapper