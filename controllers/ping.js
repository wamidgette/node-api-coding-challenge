/* Simple class holds method that recieves a get request and returns a success json object */
//kept as its own controller file because it is interacted with on its own /ping extension
export default class ping {
    static sendPing(req, res){
        let response = {
            success : true
        }
        res.status(200).json(response)
    }
}