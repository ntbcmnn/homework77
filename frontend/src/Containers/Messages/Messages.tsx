import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectAllMessages, selectFetchLoading } from '../../store/slices/messagesSlice.ts';
import Loader from '../../Components/UI/Loader/Loader.tsx';
import Message from '../../Components/Message/Message.tsx';
import { createMessage, fetchMessages } from '../../store/thunks/messagesThunk.ts';
import { IMessage, IMessageMutation } from '../../types';
import Form from '../../Components/Form/Form.tsx';
import { useEffect } from 'react';

const Messages = () => {
  const isLoading: boolean = useAppSelector(selectFetchLoading);
  const messages: IMessage[] = useAppSelector(selectAllMessages);
  const dispatch = useAppDispatch();

  const onSubmit: (message: IMessageMutation) => Promise<void> = async (message: IMessageMutation) => {
    await dispatch(createMessage(message));
    await dispatch(fetchMessages());
  };

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  return (
    <>
      <Form onSubmit={onSubmit}/>
      <>
        {isLoading ? <Loader/> :
          <div>
            {messages.length !== 0 ?
              messages.map((message: IMessage) => (
                <Message message={message} key={message.id}/>
              )) :
              <h3 className="text-center">No messages found</h3>
            }
          </div>
        }
      </>
    </>
  );
};

export default Messages;