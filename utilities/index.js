const invModel = require("../models/inventory-model")
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  try{
    let data = await invModel.getClassifications()
    if (!data || !data.rows) {
      throw new Error('No classifications found'); 
    }

  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'

  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
    });

    list += "</ul>"
    return list //return the constructed naviagation list

  } catch (error) {
    console.error("getNav error", error);
    return "<ul><li>Failed to load navigation</li></ul>";
  }
}


/* ************************
Line 1 - requires the inventory-model file, so it can be used to get data from the database.
Line 2 - creates an empty Util object. Just as you did earlier in the base controller.
Line 3 - left intentionally blank.
Lines 4 through 6 - a multi-line comment introducing the function.
Line 7 - creates an asynchronous function, which accepts the request, response and next methods as parameters. The function is then stored in a getNav variable of the Util object.
Line 8 - calls the getClassifications() function from the inventory-model file and stores the returned resultset into the data variable.
Line 9 - creates a JavaScript variable named list and assigns a string to it. In this case, the string is the opening of an HTML unordered list. Note the use of let. This is because the value will be changed as the upcoming lines of the function are processed.
Line 10 - the list variable has an addition string added to what already exists. Note the use of +=, which is the JavaScript append operator. In this instance a new list item, containing a link to the index route, is added to the unordered list.
Line 11 - uses a forEach loop to move through the rows of the data array one at a time. For each row, the row is assigned to a row variable and is used in the function.
Line 12 - appends an opening list item to the string in the list variable.
Line 13 - appends the code that is found on lines 14 through 20 as a string to the list variable.
Line 16 - a string that includes the beginning of an HTML anchor. The + sign is the JavaScript concatenation operator, used to join two strings together. The value in the href attribute is part of a route that will be watched for in an Express router.
Line 17 - the classification_id value found in the row from the array. It is being added into the link route.
Line 18 - the title attribute of the anchor element.
Line 19 - the classification_name value found in the row from the array. It is being added into the title attribute.
Line 20 - the last part of the string forming the opening HTML anchor tag.
Line 21 - the classification_name from the row being displayed between the opening and closing HTML anchor tags. This is the display name in the navigation bar.
Line 22 - the closing HTML anchor tag.
Line 23 - the closing list item tag being added to the list variable.
Line 24 - the ending of the forEach loop and enclosed anonymous function.
Line 25 - the closing HTML unordered list tag being appended to the list variable.
Line 26 - sends the finished string, back to where the getNav function was called.
Line 27 - ends the function which started on line 7.
************************************ */

/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function(data){
  let grid
  if(data.length > 0){
    grid = '<ul id="inv-display">'
    data.forEach(vehicle => { 
      grid += '<li>'
      grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
      + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
      + 'details"><img src="' + vehicle.inv_thumbnail 
      +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
      +' on CSE Motors" /></a>'
      grid += '<div class="namePrice">'
      grid += '<hr />'
      grid += '<h2>'
      grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
      grid += '</h2>'
      grid += '<span>$' 
      + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
      grid += '</div>'
      grid += '</li>'
    })
    grid += '</ul>'
  } else { 
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}

/* Lines 1-3 - A multi-line comment.
Line 4 - declares the function as asynchronous and expects a data array as a parameter.
Line 5 - declares a variable to hold a string.
Line 6 - an "if" to see if the array is not empty.
Line 7 - creates an unordered list element and adds it to the grid variable.
Line 8 - sets up a "forEach" loop, to break each element of the data array into a vehicle object.
Lines 9-25 - builds a single HTML <li>. Withing the list item is an <a> element that surrounds an <img> element. Next is a <div> that contains a horizontal rule, followed by an <h2> that contains another <a> with the Make and Model of the vehicle. Finally, is a <span> that contains a formatted price, in US dollars.
Line 26 - closes the foreach process.
Line 27 - closes the unordered list.
Line 28 - ends the "if" and opens an "else". The else is executed if the data array is empty.
Line 29 - stores a <p> with a message indicating that no vehicles match the classification.
Line 30 - ends the "else".
Line 31 - returns the variable to the calling location.
Line 32 - ends the function.
Be sure to carefully review the code, particularly lines 9 through 25 to understand the structure and what is happening. */

/* **************************************
* function to build vehicle detail HTML
* ************************************ */ 
Util.buildVehicleDetailHTML = function(vehicleData) {
  return `
    <div class="vehicle-details">
      <h2>${vehicleData.inv_make} ${vehicleData.inv_model}</h2>
      <p><strong>Year:</strong> ${vehicleData.inv_year}</p>
      <p><strong>Price:</strong> $${vehicleData.inv_price}</p>
      <p><strong>Mileage:</strong> ${vehicleData.inv_miles} miles</p>
      <p><strong>Description:</strong> ${vehicleData.inv_description}</p>
      <img src="${vehicleData.inv_image}" alt="${vehicleData.inv_make} ${vehicleData.inv_model}" />
    </div>
  `;
}

module.exports = Util;
