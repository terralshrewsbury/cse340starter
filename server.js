/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project. 
 * Other names for it can be index.js or app.js
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const env = require("dotenv").config()
const app = express()
const static = require("./routes/static")
const baseController = require("./controllers/baseController")
const inventoryRoute = require("./routes/inventoryRoute");
const intentionalErrorRoute = require("./routes/intentionalError.js");
const Util = require("./utilities")

/* ***********************
 * View Engine and Templates
 *************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "layouts/layout") // not at views root



/* ***********************
 * Routes
 *************************/
app.use(static)

/*Index route
app.get("/", function(req, res) {
  res.render("index", { title: "Home" })
})*/
//Index route
app.get("/", baseController.buildHome)
/*Previously the index.ejs view was rendered directly in the route. While it worked, it did not follow the M-V-C methodology.
The new code uses the imported "baseController" to "call" the "buildHome" method.
This will execute the function in the controller, build the navigation bar and pass it and the title name-value pair to the index.ejs view, which will then be sent to the client.
*/
// Inventory routes
app.use("/inv", inventoryRoute) /*composed of three elements:
app.use() is an Express function that directs the application to use the resources passed in as parameters.
/inv is a keyword in our application, indicating that a route that contains this word will use this route file to work with inventory-related processes; "inv" is simply a short version of "inventory".
inventoryRoute is the variable representing the inventoryRoute.js file which was required (brought into the scope of the server.js file) earlier. */
//In short, any route that starts with /inv will then be redirected to the inventoryRoute.js file, to find the rest of the route in order to fulfill the request.

// Use the intentional error route
app.use(intentionalErrorRoute);
const utilities = require("./utilities");

app.use(async (err, req, res, next) => {
  console.error(err.stack);  // Log the error for debugging

  try {
    const nav = await utilities.getNav(); 

    res.status(err.status || 500);  // Set the status code for the response
    res.render('error', { 
      error: err,
      title: 'Error',
      nav,
    });
  } catch (error) {
    // In case there's an error resolving the nav
    console.error("Error fetching nav:", error);
    res.status(err.status || 500).render('error', {
      error: err,
      title: 'Error',
      nav: [], // Fallback if getNav() fails
    });
  }
});


/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT
const host = process.env.HOST




/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})

