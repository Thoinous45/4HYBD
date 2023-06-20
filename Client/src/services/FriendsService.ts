import axios from "axios";
import { Friend, FriendRequest } from "../models/Friend.model";

const api = "http://localhost:3000/api";

const FriendsService = {
  getFriends: async () => {
    try {
      const response = await axios.get<Array<Friend>>(`${api}/friends`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getFriendsToAdd: async () => {
    try {
      const response = await axios.get<Array<Friend>>(`${api}/users/stranger`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getFriendsRequestsSent: async () => {
    try {
      const response = await axios.get<Array<FriendRequest>>(
        `${api}/friends/requestsend`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getFriendsRequestsReceived: async () => {
    try {
      const response = await axios.get<Array<FriendRequest>>(
        `${api}/friends/request`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  sendFriendRequest: async (recipientId: string) => {
    console.log(sessionStorage.getItem("token"));
    try {
      const response = await axios.post(
        `${api}/friends/add`,
        { recipient: recipientId },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      // TODO: toasts
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  acceptFriendRequest: async (requestId: string) => {
    try {
      const response = await axios.put(
        `${api}/friends/accept`,
        {
          requestid: requestId,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      // TODO: toasts
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default FriendsService;
