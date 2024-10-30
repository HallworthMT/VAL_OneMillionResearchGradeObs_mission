
import { makeDoughNut} from './makeDoughNut_function.js';
import { render_open_pie } from './makeOpenPie_function.js';

//********************************************************************//
//
//                    API VARIABLES
//
//
//*******************************************************************//

  var baseUrl = 'https://api.inaturalist.org/v1/observations?';
  var begDate = '&d1=2024-11-01';
  var endDate = '&d2=2024-12-31';
  var project = '&project_id=vermont-atlas-of-life';
  var research = '&quality_grade=research';
  var needs_id = '&quality_grade=needs_id';
  var casual = '&quality_grade=casual';

// API strings
var qTotalObs = baseUrl + project;
var qNeedsID = baseUrl + project + needs_id;
var qResearch = baseUrl + project + research;
var qCasual = baseUrl + project + casual;

var export_OBS = {"totalObs": 0};

var exportData = {
      "NeedsID": 0,
      "Research": 0,
      "Casual": 0 };

var totalObs = export_OBS.totalObs;

var totalNeedsID = exportData.NeedsID; 

console.log(qTotalObs);
console.log(`exportData names: ${Object.getOwnPropertyNames(exportData)}`);

//********************************************************************//
//
//                    FUNCTIONS
//
//
//*******************************************************************//
Promise.all([fetch(qTotalObs),
	           fetch(qResearch),
             fetch(qNeedsID),
             fetch(qCasual)])
        .then(function (responses) {
	       // Get a JSON object from each of the responses
	      return Promise.all(responses.map(function (response) {
		                                     return response.json();}
                                       )
                          );
                        })
        .then(function (data) {
        var data2 = data.map(function (d) {
            return d.total_results
                                       })
      // add data to global variable
          export_OBS.totalObs = data2[0];
          exportData.Research = data2[1];
          exportData.NeedsID = data2[2];
          exportData.Casual = data2[3];
	// Log the data to the console
	// You would do something with both sets of data here
     console.log(`data2: ${data2}`);
     console.log(exportData);
                })
        .then(function(){
          makeDoughNut({exportData: exportData,
                        export_OBS: export_OBS,
                        htmlID: "currentObsDoughnut",
                        width: 700,
                        height: 700}); })
        .then(function(){
          var data = [{value: 45, label: "label_1", color: '#ff0000'},
            {value: 33, label: "label_2", color: '#00ff00'},
            {value: 66, label: "label_3", color: '#0000ff'},
            {value: 50, label: "label_4", color: '#ffff00'},
            {value: 90, label: "label_5", color: '#ff0099'}];

          render_open_pie({data: data,
                           htmlID: "open_pie_me_please",
                           width: 700});})
          .then(function(){
          // Print the needs to text within HTML 
        document.getElementById("CurrentNeedsID").innerHTML =  exportData.Research.toLocaleString();
       })
.catch(function (error) {
	// if there's an error, log it
	console.log(error);
});

