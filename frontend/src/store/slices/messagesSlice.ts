import { IMessage } from '../../types';
import { RootState } from '../../app/store.ts';
import { createMessage, fetchMessages } from '../thunks/messagesThunk.ts';
import { createSlice } from '@reduxjs/toolkit';

interface IMessagesState {
  messages: IMessage[];
  fetching: boolean;
  creating: boolean;
  error: boolean;
}

const initialState: IMessagesState = {
  messages: [],
  fetching: false,
  creating: false,
  error: false,
};

export const selectAllMessages = (state: RootState) => state.messages.messages;
export const selectFetchLoading = (state: RootState) => state.messages.fetching;
export const selectCreateLoading = (state: RootState) => state.messages.creating;

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.fetching = true;
        state.error = false;
      })
      .addCase(fetchMessages.fulfilled, (state, {payload: items}) => {
        state.fetching = false;
        state.messages = items;
      })
      .addCase(fetchMessages.rejected, (state) => {
        state.fetching = false;
        state.error = true;
      })
      .addCase(createMessage.pending, (state) => {
        state.creating = true;
        state.error = false;
      })
      .addCase(createMessage.fulfilled, (state) => {
        state.creating = false;
      })
      .addCase(createMessage.rejected, (state) => {
        state.creating = false;
        state.error = true;
      })
  },
});

export const messagesReducer = messagesSlice.reducer;