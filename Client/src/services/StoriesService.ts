import axios from "axios";
import { Friend, FriendRequest } from "../models/Friend.model";
import { UserStory } from "../models/Story.model";

const api = "http://localhost:3000/api";

const StoriesService = {
  getStoriesInfos: async () => {
    try {
      const response = await axios.get<Array<UserStory>>(`${api}/users/getStoryInfo`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getStoryPhoto: async (userId: string) => {
    try {
      const response = await axios.get<string>(`${api}/users/getStoryImage`, {
        data: {
          friendId: userId
        },
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getMyStory: async () => {
    try {
      const response = await axios.get<UserStory>(`${api}/users/myStoryInfo`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getMyStoryPhoto: async () => {
    try {
      const response = await axios.get<string>(`${api}/users/myStoryImage`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  postStory: async (file: any, description: string, latitude: number, longitude: number) => {
    try {
      const response = await axios.post<UserStory>(`${api}/users/postStory`, {
        file: file,
        description: description,
        latitude: latitude,
        longitude: longitude
      }, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default StoriesService;