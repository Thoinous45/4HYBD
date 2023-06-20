import axios from "axios";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

const api = "http://localhost:3000/api/chatroom/"

const ChatService = {

    createChatRoom: async (name: string, userIds: string) => {
        try {
            const response = await axios.post(api + "create", {
                userIds,
                conversationName: name,
            }, {headers: {Authorization: `Bearer ${sessionStorage.getItem('token')}`}});
            return {data: response.data};
        } catch (error) {
            return {status: "error", data: error};
        }
    },

    getAllMyChatRooms: async () => {
        return axios.get(api, {headers: {Authorization: `Bearer ${sessionStorage.getItem('token')}`}})
    },

    getChat: async (id: string) => {
        try {
            const response = await axios.get(api + `${id}`, {headers: {Authorization: `Bearer ${sessionStorage.getItem('token')}`}});
            return {status: "success", data: response.data}
        } catch (error) {
            return {status: "error", data: error};
        }
    },

    sendMessage: async (id: string, message: string) => {
        try {
            const response = await axios.post(api + `sendMessage`, {
                message: message,
                roomId: id,
            }, {headers: {Authorization: `Bearer ${sessionStorage.getItem('token')}`}});
            return {status: "success", data: response.data};
        } catch (error) {
            return {status: "error", data: error};
        }
    },

    deleteChatRoom: (id: string) => {
        return axios.delete(api, {
            data: {roomId: id},
            headers: {Authorization: `Bearer ${sessionStorage.getItem('token')}`}
        }).then((res) => {
            return {status: "success", data: res.data}
        })
    }

}

export default ChatService;
