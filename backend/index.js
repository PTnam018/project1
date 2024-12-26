import express from 'express';
import cors from 'cors';
import { createServer } from "http";
import config from './config.js';
import route from './routes/index.js';


const app = express();
const httpServer = createServer(app);

//const io = configureSocket(httpServer);

app.use(cors());
app.use(express.json({ limit: '10mb' }));  // Điều chỉnh kích thước payload cho JSON
app.use(express.urlencoded({ limit: '10mb', extended: true }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// Route init
route(app);

httpServer.listen(config.port, () =>
  console.log(`Server is live @ ${config.hostUrl}`),
);

export default app;