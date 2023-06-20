export interface Friend {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
}

export interface FriendRequest {
  requestId: string;
  recipientId: string;
  firstname: string;
  lastname: string;
  email: string;
}
