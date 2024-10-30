import { render_open_pie } from './makeOpenPie_function.js';


//********************************************************************//
//
//                    API VARIABLES
//
//
//*******************************************************************//

var baseUrl = 'https://api.inaturalist.org/v1/observations?';
var projectid = '&project_id=vermont-atlas-of-life';
var needs_id = '&quality_grade=needs_id';
var iconic = '&iconic_taxa='

var iconicTaxon = ["Amphibia",
                     "Arachnida",
                     "Aves",
                     "Chromista",
                     "Fungi",
                     "Insecta",
                     "Mammalia",
                     "Mollusca",
                     "Reptilia",
                     "Plantae",
                     "Protozoa"];

var sppQueries = [];
      iconicTaxon.map(function(d){
      sppQueries[d] = baseUrl + projectid + needs_id + iconic + d 
                     });

var sppQueriesTot = [];
     iconicTaxon.map(function(d){
     sppQueriesTot[d] = baseUrl + projectid + iconic + d 
                     });

  var sppTaxonData = {"Amphibia" : 0,
                      "Arachnida" : 0,
                      "Aves" : 0,
                      "Chromista" : 0,
                      "Fungi" : 0,
                      "Insecta" : 0,
                      "Mammalia" : 0,
                      "Mollusca" : 0,
                      "Reptilia" : 0,
                      "Plantae" : 0,
                      "Protozoa" : 0};

 var sppTaxonDataTot = {"Amphibia" : 0,
                      "Arachnida" : 0,
                      "Aves" : 0,
                      "Chromista" : 0,
                      "Fungi" : 0,
                      "Insecta" : 0,
                      "Mammalia" : 0,
                      "Mollusca" : 0,
                      "Reptilia" : 0,
                      "Plantae" : 0,
                      "Protozoa" : 0};

 var percent_needsid = [];

    Promise.all([fetch(sppQueries.Amphibia),
                 fetch(sppQueries.Arachnida),
                 fetch(sppQueries.Aves),
                 fetch(sppQueries.Chromista),
                 fetch(sppQueries.Fungi),
                 fetch(sppQueries.Insecta),
                 fetch(sppQueries.Mammalia),
                 fetch(sppQueries.Mollusca),
                 fetch(sppQueries.Reptilia),
                 fetch(sppQueries.Plantae),
                 fetch(sppQueries.Protozoa),
                 fetch(sppQueriesTot.Amphibia),
                 fetch(sppQueriesTot.Arachnida),
                 fetch(sppQueriesTot.Aves),
                 fetch(sppQueriesTot.Chromista),
                 fetch(sppQueriesTot.Fungi),
                 fetch(sppQueriesTot.Insecta),
                 fetch(sppQueriesTot.Mammalia),
                 fetch(sppQueriesTot.Mollusca),
                 fetch(sppQueriesTot.Reptilia),
                 fetch(sppQueriesTot.Plantae),
                 fetch(sppQueriesTot.Protozoa),])
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
               sppTaxonData.Amphibia = data2[0];
               sppTaxonData.Arachnida = data2[1];
               sppTaxonData.Aves = data2[2];
               sppTaxonData.Chromista = data2[3];
               sppTaxonData.Fungi = data2[4];
               sppTaxonData.Insecta = data2[5];
               sppTaxonData.Mammalia = data2[6];
               sppTaxonData.Mollusca = data2[7];
               sppTaxonData.Reptilia = data2[8];
               sppTaxonData.Plantae = data2[9];
               sppTaxonData.Protozoa = data2[10];
               sppTaxonDataTot.Amphibia = data2[11];
               sppTaxonDataTot.Arachnida = data2[12];
               sppTaxonDataTot.Aves = data2[13];
               sppTaxonDataTot.Chromista = data2[14];
               sppTaxonDataTot.Fungi = data2[15];
               sppTaxonDataTot.Insecta = data2[16];
               sppTaxonDataTot.Mammalia = data2[17];
               sppTaxonDataTot.Mollusca = data2[18];
               sppTaxonDataTot.Reptilia = data2[19];
               sppTaxonDataTot.Plantae = data2[20];
               sppTaxonDataTot.Protozoa = data2[21];
         
        var needs_id = data2.slice(0,10);
        var research = data2.slice(11,21);

    // var taxon_species = Object.values(sppTaxonData).reduce(function(a, b){return a + b;}, 0);
        percent_needsid = needs_id.map((num, index) => Math.round((num / research[index]*100*100))/100);
         // percent_needsid = data2.map(number => Math.round((number / taxon_species)*100*100,2)/100);

             // Log the data to the console
             // You would do something with both sets of data here
             // console.log(`data2: ${data2}`);
             console.log(Object.values(sppTaxonData));
             console.log(`percent_needsid: ${percent_needsid}`);
                         })
.then(function(){
    var colors = [d3.interpolateViridis(0.5),
                  d3.interpolateViridis(1.0),
                  d3.interpolateViridis(0.1),
                  d3.interpolateViridis(0.9),
                  d3.interpolateViridis(0.2),
                  d3.interpolateViridis(0.8),
                  d3.interpolateViridis(0.3),
                  d3.interpolateViridis(0.7),
                  d3.interpolateViridis(0.4),
                  d3.interpolateViridis(0.6),
                  d3.interpolateViridis(0.0)]
    var data = [{value: percent_needsid[0], label: "Amphibians", color: colors[0]},
                {value: percent_needsid[1], label: "Spiders & Allies", color: colors[1]},
                {value: percent_needsid[2], label: "Birds", color: colors[2]},
                {value: percent_needsid[3], label: "Algae", color: colors[3]},
                {value: percent_needsid[4], label: "Fungus", color: colors[4]},
                {value: percent_needsid[5], label: "Insects", color: colors[5]},
                {value: percent_needsid[6], label: "Mammals", color: colors[6]},
                {value: percent_needsid[7], label: "Mollucks", color: colors[7]},
                {value: percent_needsid[8], label: "Reptiles", color: colors[8]},
                {value: percent_needsid[9], label: "Plants", color: colors[9]}
            ];

    var data3 = data.sort(function(a,b){return a.value-b.value})

    render_open_pie({data: data3,
                     htmlID: "open_pie_me_please",
                     width_val: 200,
                     height_val: 200});})