import express from "express";
import fileDb from "../fileDb";
import {IMessage, IMessageMutation} from "../types";
import {imagesUpload} from "../multer";

const messagesRouter = express.Router();

messagesRouter.get('/', async (req, res) => {
    const messages: IMessage[] = await fileDb.getMessages();
    res.send(messages);
});

messagesRouter.post('/', imagesUpload.single('image'), async (req, res) => {
    if (!req.body.message) {
        res.status(400).send({error: 'Please enter a message!'});
        return;
    }

    const message: IMessageMutation = {
        author: req.body.author ? req.body.author : 'Anonymous',
        message: req.body.message,
        image: req.file ? 'images' + req.file.filename : null,
    };

    const newMessage = await fileDb.createMessage(message);
    res.send(newMessage);
});

export default messagesRouter;