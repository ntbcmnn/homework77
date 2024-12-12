import React, { useState } from 'react';
import { IMessageMutation } from '../../types';
import ButtonSpinner from '../UI/ButtonSpinner/ButtonSpinner.tsx';
import { toast } from 'react-toastify';
import { useAppSelector } from '../../app/hooks.ts';
import { selectCreateLoading } from '../../store/slices/messagesSlice.ts';
import FileInput from '../FileInput/FileInput.tsx';

interface Props {
  onSubmit: (product: IMessageMutation) => void;
}

const initialState = {
  author: '',
  message: '',
  image: null,
};

const Form: React.FC<Props> = ({onSubmit}) => {
  const [form, setForm] = useState<IMessageMutation>({...initialState});
  const isCreating: boolean = useAppSelector(selectCreateLoading);

  const onFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.message.trim().length === 0) {
      toast.error('Message is required!');
      return;
    }

    onSubmit({...form});
    setForm({...initialState});
    toast.success('Message added successfully!');
  };

  const onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setForm((prevState: IMessageMutation) => ({...prevState, [name]: value}));
  };

  const onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;

    if (files) {
      setForm((prevState: IMessageMutation) => ({...prevState, [name]: files[0] || null}));
    }
  };

  return (
    <>
      <h3 className="text-center">Create a new message</h3>
      <form onSubmit={onFormSubmit} className="my-5">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Author"
            name="author"
            value={form.author}
            onChange={onInputChange}
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Message"
            name="message"
            value={form.message}
            onChange={onInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <FileInput
            name="image"
            label="Image"
            onGetFile={onFileChange}
            file={form.image}
          />
        </div>

        <div className="d-flex gap-3 justify-content-center">
          <button
            disabled={isCreating}
            type="submit"
            className="btn btn-dark d-flex align-items-center"
          >
            <span className="me-2">
              Create
            </span>
            {isCreating ? <ButtonSpinner/> : null}
          </button>
        </div>
      </form>
    </>
  );
};

export default Form;