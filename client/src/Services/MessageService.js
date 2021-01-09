import axios from "axios";

export default {
    //Get all messages from DB.
    getAllMessages: () => {
        return axios.get(`/api/message`).then(response => {
            //We want an array of messages to be returned OR after returning, get all messages from this.
            console.log(response);
        });
    }
}