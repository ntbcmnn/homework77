import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { IMessage, IMessageMutation } from '../../types';

export const fetchMessages = createAsyncThunk<IMessage[], void>(
  'messages/fetchMessages',
  async () => {
    const response = await axiosApi<IMessage[]>('/messages');
    return response.data || [];
  }
);

export const createMessage = createAsyncThunk<void, IMessageMutation>(
  'messages/createMessage',
  async (messageMutation: IMessageMutation) => {
    const formData = new FormData();
    const keys = Object.keys(messageMutation) as (keyof IMessageMutation)[];

    keys.forEach((key) => {
      const value: string | File | null = messageMutation[key];

      if (value !== null) {
        formData.append(key, value);
      }
    });

    await axiosApi.post('/messages', formData);
  }
);