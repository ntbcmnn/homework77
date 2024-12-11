export interface IMessage {
  id: string;
  author: string;
  message: string;
  image: string | null;
}

export interface IMessageMutation {
  author: string;
  message: string;
  image: File | null;
}