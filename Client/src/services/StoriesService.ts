import axios from "axios";
import { Friend, FriendRequest } from "../models/Friend.model";
import { UserStory } from "../models/Story.model";

const api = "http://localhost:3000/api";

const StoriesService = {
  getStoriesInfos: async () => {
    try {
      const response = await axios.get<Array<UserStory>>(
        `${api}/users/getStoryInfo`,
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

  getStoryPhoto: async (userId: string) => {
    try {
      const response = await axios.get<Blob>(`${api}/users/getStoryImage/${userId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        responseType: 'blob', // Set responseType to 'blob'
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

  postStory: async (
    photo: Blob,
    description: string,
    latitude: number,
    longitude: number
  ) => {
    try {
      const formData = new FormData();
      formData.append("file", photo, "story-photo.jpg");
      formData.append("description", description);
      formData.append("latitude", latitude.toString());
      formData.append("longitude", longitude.toString());

      const response = await axios.post<UserStory>(
        `${api}/users/postStory`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default StoriesService;
