/* Posts controller contains all current and future methods for interacting with post objects on the Hatchways API */
import axios from 'axios'
import myCache from '../cache.js'
/* Create new controller class for post objects */
export default class postController{
    static async getPostByTagName(req, res, next){
        /**** SET VARIABLES ****/
        
        /* Get the user's query parameters*/
        let query = req.query
        /* console.log(query) */

        /* Get the list of tags from the query*/
        let tags = []

        //set default sortBy to id and direction to asc
        let sortBy = "id";
        let direction = "asc";

        /* Initially empty array of posts results. This will be sent to client once added to */
        let posts = [] 

        /* Create a list of requests for each tag in an array of promises initially empty */
        let promiseList = []

        /**** VALIDATION ****/
        /* If the user's URL includes an invalid parameter, return error to user. This was not required but I think it is a worthwhile addition */
        for(var param in query){
            if(param !== 'tags' && param !== 'sortBy' && param !== 'direction'){
                let error = {
                    error : `'${param}' is not a valid query parameter. Valid parameters are 'tags', 'sortBy', and 'direction' where tags is required`
                }
                res.status(400).json(error)
                return
            }
        }
        /* create tags array from the tags values input by user */
        if(query.tags){
            tags = query.tags.split(',')
            console.log(tags)
            console.log(query)
        }
        /* If tags query is not included, return 'please include tag name in query' */
        else{
            let error = {
                error : "please include tag name in query"
            }
            res.status(400).json(error)
            return 
        }
            
        /* If a sortBy value was queried... */
        if(query.sortBy){
            //if the user queried a valid sortBy value
            if(query.sortBy === 'id' || query.sortBy === 'reads' || query.sortBy === 'likes' || query.sortBy === 'popularity'){
                sortBy = query.sortBy
            }
            else{ //else send error to user
                let error = {
                    error : "sortBy parameter is invalid"
                }
                res.status(400).json(error)
                return
            }
        } 
        /* If a direction was queried... */
        if(query.direction){
            //if direction query is valid
            if(query.direction === 'desc' || query.direction === 'asc' ){
                direction = query.direction
            }
            else{//else send error to user
                let error = {
                    error : "direction parameter is invalid"
                }
                res.status(400).json(error)
                return
            }
        } 

        /**** DEFINE REQUESTS THAT NEED TO BE MADE BASED ON CACHED DATA ****/
        tags.map((tag) => {
            /* If the current tag is already defined in the cache, add the cached data under the tag name to the promise list */
            if(myCache.data[tag] !== undefined){
                let cachedData = {
                    data : myCache.data[tag].v
                }
                promiseList.push(cachedData)
                /* console.log("using CACHE" + myCache.data[tag])
                console.log(myCache.data[tag].v) */

            }
            //if the tag is not yet defined in the cache, add an HTTP GET request for that tag in the promise list 
            else{
                promiseList.push(axios.get('https://api.hatchways.io/assessment/blog/posts?tag=' + tag))
                console.log("using AXIOS")
            }
            
        })

        /**** FUNCTIONS ****/

        /* Callback function for sort() method - Sorts posts by ID */
        const sortById = function(a, b) {
            let idA = a.id;
            let idB = b.id;
            if(idA < idB){
                return -1
            }
            if(idA > idB){
                return 1
            }
            return 0
        }
        /* Callback function for sort() method - Sorts posts by sortBy value */
        const sortAscending = function(a, b) {
            let propertyA = a[sortBy];
            let propertyB = b[sortBy];
            if(propertyA < propertyB){
                return -1
            }
            if(propertyA > propertyB){
                return 1
            }
            return 0
        }

        /**** EXECUTE REQUESTS AND SEND CLIENT RESPONSE ****/

        /* Execute separate request for each tag in parallel and Wait for all promises to return */
        Promise.all(promiseList).then((results) => {
            //concatenate all posts for each result set the 'posts' array
            for(let i=0;i<results.length;i++){
                console.log(results[i])
                //add each promise result to the cache - **Had issues caching results[i] so had to cache results[i].data which led to a more complex solution 
                myCache.set(tags[i], results[i].data)
                //concatenate the posts from each result to the initially empty posts array
                posts = posts.concat(results[i].data.posts)
            }
            //sort the posts array by id ascending by default
            posts.sort(sortById) 

            /* id should be a primary key and unique - eliminate the duplicates with a loop*/
            for(let i = 0;i<posts.length;i++){
                // if the current id is equal to the last id, remove the current object and subtract 1 from i
                if(i>0 && posts[i].id === posts[i-1].id){
                    posts.splice(i,1)
                    i = i-1;
                }
            }
            //if the sort method is id, no need to re-sort. Else, sort by the user's queried sortBy value*/
            if(sortBy !== 'id'){
                posts.sort(sortAscending)
            }
            //if direction was specified as 'desc' reverse the array. Else leave as is
            if(direction === 'desc'){
                posts.reverse();
            }
            /* console.log(posts) */
            //send posts to client as json object 'posts'
            let response = {
                "posts" : posts
            } 
            res.status(200).json(response)
        })
    }
}