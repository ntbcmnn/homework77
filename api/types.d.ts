export interface IMessage {
    id: string;
    author: string;
    message: string;
    image: string | null;
}

export type IMessageMutation = Omit<IMessage, 'id'>;