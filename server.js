/* Server.js will define the properties of the application - express application using JSON, base URL for requests*/

/* Import dependencies */
import express from 'express'
import router from './routes.js'

/* This app will be an express server*/
const app = express();
const port = 5000;

/* Set server properties - cross origin sharing, express.json, base url, invalid url handling - return 404 error */
app.use(express.json());
/* requests to '/api' requests will be routed to the routes.js sibling file */ 
app.use("/api", router);
app.use("*", (req, res) => {res.status(404).json({error : 'page does not exist'})});
/* app.use("/*", (req, res) => {res.status(404).json({error : "Page does not exist"})});
 */
/* Activate the server to listen for requests */
app.listen(port,()=>{
    console.log(`server waiting for requests on port ${port}`)
});