/* This is the Cache. Kept global so in future controllers other than posts can have access to it as well*/
import Cache from 'node-cache';
const myCache = new Cache({stdTTL : 60}); // The lifetime of cached data can be adjusted - I have set it to 1 minute by default. Ideally in a more in depth solution this would be checked against the Hatchways API periodically to allow data to be stored for longer without returning stale data 
export default myCache
