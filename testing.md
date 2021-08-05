## Testing /posts Route
- Testing was conducted for this Node.js application. Cases were test to pass, test to fail, and boundary condition testing 
- One assumption I made when testing was that the 'tags' query parameter needs to be included but does not have to come before other parameters in the query. If it needed to be, a quick check at index 0 in the query array could be done but this did not seem imperative.
### Test to pass 

#### using just tags query
- Test: GET: http://localhost:5000/api/posts?tags=science
- Expected result: Array of posts in order of ascending post id. Each post's 'tags' array property contains 'science'
- Result: PASSED
#### Multiple tags 
- Test: GET: http://localhost:5000/api/posts?tags=science,tech
- Expected result: Array of posts in order of ascending post id. This array should be longer than the last. Each post's 'tags' array property contains either 'science' or 'tech'
- Result: PASSED
#### Using sortBy query
- Test: GET: http://localhost:5000/api/posts?tags=science,tech&sortBy=popularity
- Expected result: Array of posts in order of ascending popularity (least to most popular). Each post's 'tags' array property contains either 'science' or 'tech'
- Result: PASSED
#### Using direction query
- Test: GET: http://localhost:5000/api/posts?tags=science,tech&direction=desc
- Expected result: Array of posts in order of *Descending* id. Each post's 'tags' array property contains either 'science' or 'tech'
- Result: PASSED
#### Using all queries
- Test: GET: http://localhost:5000/api/posts?tags=science,tech&sortBy=reads&direction=desc
- Expected result: Array of posts in order of *Descending* number of reads (most to least). Each post's 'tags' array property contains either 'science' or 'tech'
- Result: PASSED
#### Test this node.js API alongside provided API solution "https://api.hatchways.io/assessment/solution"
- Test: GET: https://api.hatchways.io/assessment/solution/posts?tags=history,tech&sortBy=reads&direction=desc AND http://localhost:5000/api/posts?tags=history,tech&sortBy=reads&direction=desc
- Expected result: Arrays returned by both APIs are equal 
- Result: PASSED

### Test to fail

#### No tags parameter/empty string tags parameter
- Test: GET: http://localhost:5000/api/posts AND GET: http://localhost:5000/api/posts?tags= AND GET: http://localhost:5000/api/posts?tags
- Expected result: {"error":"please include tag name in query"}
- Result: PASSED
#### Invalid sortBy parameter value
- Test: GET: http://localhost:5000/api/posts?tags=science&sortBy=age
- Expected result: {"error":"sortBy parameter is invalid"}
- Result: PASSED
#### Invalid direction parameter value 
- Test: GET: http://localhost:5000/api/posts?tags=science&direction=up
- Expected result: {"error":"direction parameter is invalid"}
- Result: PASSED
#### Invalid parameter type
- Test: GET: http://localhost:5000/api/posts?tags=science&randomize=true
- Expected result: {"error":"'randomize' is not a valid query parameter. Valid parameters are 'tags', 'sortBy', and 'direction' where tags is required"}
- Result: PASSED

## Testing /ping Route
### Test to pass
#### Request to /ping
- Test: GET: http://localhost:5000/api/ping
- Expected result: {"success":true}, status 200 
- Result: PASSED
