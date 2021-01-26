import axios from "axios";

export default {
    //Get all messages from DB.
    getAllChatrooms: () => {
        return axios.get(`/api/chatrooms/all`);
    }
}