import express from "express";
import messagesRouter from "./routers/messages";
import fileDb from "./fileDb";
import cors from "cors";
import fs = require("fs");

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use('/messages', messagesRouter);
app.use(express.static('public'));

const run: () => Promise<void> = async () => {
    if (!fs.existsSync('./db.json')) {
        fs.writeFileSync('./db.json', JSON.stringify([]));
    }

    await fileDb.init();

    app.listen(port, () => {
        console.log(`Listening on port http://localhost:${port}`);
    });
};

run().catch((err) => {
    console.error(err);
});