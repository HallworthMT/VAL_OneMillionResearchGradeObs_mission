//////////////////////////////////////////////////////////////////////////////////////
// 
//  The following code gets the top identifiers from the start of the mission
//
//
////////////////////////////////////////////////////////////////////////////////////////

var baseURL = "https://api.inaturalist.org/v1/observations/identifiers?project_id=vermont-atlas-of-life&updated_since="
var missionStart = "10-29-2024"
var perPage = "&per_page=10"

// Create variables to populate with the API calls 
var num_iders = 0;

var idcount = [];
var iduser = [];
var idicon = [];

//
// Make the API call 
// 
Promise.all([fetch(baseURL+missionStart+perPage)])
.then(function (responses) {
// Get a JSON object from each of the responses
return Promise.all(responses.map(function (response) {
                                  return response.json();}
                            )
               );
             })
.then(function (data) {
    num_iders = data[0].total_results;
    document.getElementById("NumberIdentifiers").innerHTML = num_iders.toLocaleString();
 return data[0].results})

.then(function(data) {
// Pull out the number of identifications a user has
idcount = data.map(function(d){
            return d.count});
// Pull out the user's name (login id)
iduser = data.map(function(d){
           return d.user.login
});
// Pull out the users image 
idicon = data.map(function(d){
    return d.user.icon_url
});

 //console.log(`counts: ${idcount}`)
 //console.log(`users: ${iduser}`)
 //console.log(`usersICON: ${idicon}`)
})
.then(function(){
    var fulldata = [{"usericon": idicon},
                    {"userid": iduser},
                    {"numids": idcount}];
    console.log(fulldata);

    // Populate the table
    populateTable(idicon, iduser, idcount);
}
);

// Function to populate the table with data
function populateTable(icons, users, counts) {
    var tableBody = document.querySelector("#identifierTable tbody");

    for (var i = 0; i < users.length; i++) {
        var row = document.createElement("tr");

        // Profile Image (if available)
        var imgCell = document.createElement("td");
        var img = document.createElement("img");
        img.src = icons[i] ? icons[i] : "default-profile.png"; // Fallback to default image if no icon
        img.alt = "User Icon";
        img.width = 50; // Set width of image
        img.height = 50; // Set height of image
        img.radius = '50%'; 
        imgCell.appendChild(img);

        // Username
        var userCell = document.createElement("td");
        userCell.textContent = users[i];
        userCell.classList.add("username");

        // Number of Identifications
        var countCell = document.createElement("td");
        countCell.textContent = counts[i];
        countCell.classList.add("count");

        // Append cells to the row
        row.appendChild(imgCell);
        row.appendChild(userCell);
        row.appendChild(countCell);

        // Append row to table body
        tableBody.appendChild(row);
    }
}
