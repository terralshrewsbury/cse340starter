// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId); /*the route, which is divided into three elements:
"get" indicates that the route will listen for the GET method within the request (typically a clicked link or the URL itself).
/type/:classificationId the route being watched for (note that the inv element of the route is missing, but it will be accounted for later).
invController.buildByClassification indicates the buildByClassification function within the invController will be used to fulfill the request sent by the route. */

router.get("/vehicle/:vehicle_id", invController.showVehicleDetail); //Route to show vehicle detail

router.get("/detail/:inv_id", invController.showVehicleDetail); //Route to show inventory detail

module.exports = router; //exports the router object for use elsewhere.

/*Line 1 - a comment for the lines to follow.
Line 2 - brings Express into the scope of the file.
Line 3 - uses Express to create a new Router object. Remember in lesson 2 that using separate router files for specific elements of the application would keep the server.js file smaller and more manageable? That's what we're doing.
Line 4 - brings the inventory controller into this router document's scope to be used. */
