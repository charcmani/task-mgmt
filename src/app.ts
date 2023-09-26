import express from 'express';
import { seq } from './db';

import * as Task from './routes/tasks';
import * as Metric from './routes/metrics';
import { PORT } from './config';

const app = express();
// const PORT = PORT;

app.use(express.json());

app.use('/tasks', Task.router);
app.use('/metrics', Metric.router);

module.exports = app;

seq.sync().then(() => {
    app.listen(PORT, () => {
        console.log('Server is running on port : ' + PORT);
    });
});
