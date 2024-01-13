import express from 'express';
import cors from 'cors';
import { router } from './routes/maigret.route.js'

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/maigret", router);

app.listen(process.env.PORT || 8811, () => {
  console.log(`run on ${process.env.PORT || 8811}`);
});


