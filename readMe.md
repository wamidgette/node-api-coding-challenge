# Coding Challenge - Node.js Application Hatchways API
## About
- Purpose: Creating a backend JSON API to make calls to the Hatchways API provided. More details can be found in blogPostsChallenge.pdf in parent folder.
- Solution uses Node.js and Express as well as additional modules axios, nodemon, and node-cache
### Routes
- Base URL for this API after running: http://localhost:5000/api
#### Posts Route
- Posts route: GET: http://localhost:5000/api/posts returns a list of post objects by for tag name(s)
- 'tags' query parameter - this parameter is required in URL as it defines the post search by tag name
- 'sortBy' query parameter - this parameter defines which post propery the post results are ordered by. Accepted values are 'id' (default), 'reads', 'likes', 'popularity'
- 'direction' query parameter - this parameter defines whether the post results are displayed in ascending or descending order by the sortBy value. Accepted values are 'desc'. Results will be ascending by default
#### Ping route: http:
- Ping route: GET: http://localhost:5000/api/ping
- This simple API route is called by the /ping extension  to the base url and returns status 200 {success : true} 
## Instructions to run
- Make sure Node version 14.15.4 or later is installed
- open the 'backend' folder in your terminal
- in terminal, enter 'npm install' to install the dependencies in the package.json file
- in terminal, enter 'node server.js' to run the server
- Server is run on port 5000
- The server takes only get requests to 'http://localhost:5000/api'
- Accepted queries are 'tags', 'sortBy', and 'direction'. Please refer to specifications.pdf for further details
- Example get request: 'http://localhost:5000/api/posts?tags=science,tech&sortBy=id&direction=desc'

## Structure
- server.js is called when the node application runs and defines the server as an express application. It then runs the express server. Upon requests to the '/api' extension, it runs calls the routes.js file
- routes.js handles the GET request and calls the appropriate controller and method
- Methods defined in the controllers (posts.js and ping.js) in the controllers folder make request to the Hatchways API and manipulate data before sending a response which is then sent to the client
### Scalability 
- requests to /posts go through a post.js controller which can be used for any functions pertaining to post objects
- Cache.js file separated so it can be used by controllers other than just the post controller if expansion to the API were to occur
### Caching
- node-cache package is used to create a cache which stores posts responses under their associated tag name
- Before a request is queued, the cache is checked to see if an object under the current tag name already exists. If it does exist, the posts data under that tag will be used in the response. If it does not exist, an HTTP GET request will be queued in the promiselist. 

## Testing
- Please refer to testing.md for testing conducted on API routes

## Challenges 
- This took me longer than I had thought it would. Mainly this was because before this exercise I had not performed API requests with Node.js. I had also not worked with caching before. I believe the solution I have come to is robust, except for the fact that I did not impliment checks to the Hatchways API to ensure data remains fresh. Going forward, I would like to learn more about caching in depth to ensure the API I have built is not delivering outdated data to users.