import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";

import { AppDataSource } from "./data-source";
import { userRouter } from "./router/userRouter";
import { opinionRouter } from "./router/opinionRouter";
import { userTweetRouter } from "./router/userTweetRouter";

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(cors());

    app.use("/users", userRouter);
    app.use("/opinions", opinionRouter);
    app.use("/tweets", userTweetRouter);

    const port = process.env.LISTEN_PORT;
    app.listen(port, () => {
      console.log(`Express server has started on port ${port}`);
    });
  })
  .catch((error) => console.log(error));
