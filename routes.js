/* Express will be used to route the requests to the controller files which contain methods for interacting with the Hatchways API */
import express from 'express'
import ping from './controllers/ping.js'
import posts from './controllers/posts.js'

const router = express.Router();

/* Route the requests as outlined in requirements*/
router.route("/test").get((req, res) => res.send("hello world"))
router.route("/posts").get(posts.getPostByTagName)
router.route("/ping").get(ping.sendPing)
router.route("*").get((req, res) => res.status(404).json({error : 'page does not exist'})) ///404

export default router