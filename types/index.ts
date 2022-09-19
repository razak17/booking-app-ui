export enum QueryKeys {
  me = "me",
  hotels = "hotels",
  rooms = "rooms",
}

export interface Me {
  _id: string;
  email: string;
  username: string;
}

