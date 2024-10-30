// Fetch observations from iNaturalist API
  var baseUrl = 'https://api.inaturalist.org/v1/observations?';
  var project = '&project_id=vermont-atlas-of-life';
  var research = '&quality_grade=research';

var qResearchCurrent = baseUrl + project + research;
var startingObservations = 852949;
var currentObservations = 0;
var targetObservations = 1000000-startingObservations; // Example target for the progress bar

Promise.all([fetch(qResearchCurrent)])
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
currentObservations = data2[0];
// Log the data to the console
// You would do something with both sets of data here
console.log(`data2: ${data2}`);
console.log(currentObservations);
     })
.then(function(){
  updateProgressBar(currentObservations-startingObservations, targetObservations);});

function updateProgressBar(current, target) {
  const progressPercent = (current / target) * 100;
  
  // Update the progress bar width and text
  const progressBar = document.getElementById('progress-bar');
  progressBar.style.width = `${progressPercent}%`;

  const progressText = document.getElementById('progress-text');
  progressText.textContent = `Progress: ${Math.min(progressPercent, 100).toFixed(2)}%`;

  // Optionally, style the bar color based on progress (e.g., green for full)
  if (progressPercent >= 100) {
    progressBar.style.backgroundColor = '#4CAF50'; // Change color on full completion
  }
}