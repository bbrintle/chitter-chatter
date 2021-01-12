import axios from "axios";

export default {
    //Get all messages from DB.
    getAllMessages: () => {
        return axios.get(`/api/messages/all`);
    }
}