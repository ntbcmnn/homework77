import { IMessage } from '../../types';
import React from 'react';
import { api_URL } from '../../globalConstants.ts';

interface Props {
  message: IMessage;
}

const Message: React.FC<Props> = ({message}) => {
  return (
    <div className="card mb-4">
      <div className="card-header">
        {message.author}
      </div>

      <div className="card-body">
        <h5 className="card-title">{message.message}</h5>
        <>
          {message.image ?
            (
              <img
                className="rounded-3 w-25 my-2"
                src={`${api_URL}/${message.image}`}
                alt={message.author}
              />
            ) : null}
        </>
      </div>
    </div>
  );
};

export default Message;