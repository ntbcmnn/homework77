import {promises as fs} from 'fs';
import {IMessage, IMessageMutation} from "./types";
import crypto from "crypto";

const db = './db.json';
let data: IMessage[] = [];

const fileDb = {
    async init() {
        try {
            const fileContent = await fs.readFile(db);
            data = await JSON.parse(fileContent.toString()) as IMessage[];
        } catch (e) {
            console.error(e);
        }
    },
    async getMessages() {
        return data;
    },
    async createMessage(item: IMessageMutation) {
        const id = crypto.randomUUID();
        const message = {id, ...item};
        data.push(message);
        await this.save();
        return message;
    },
    async save() {
        return fs.writeFile(db, JSON.stringify(data));
    }
};

export default fileDb;