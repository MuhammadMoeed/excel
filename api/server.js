const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());
//Your database link here!
const dbURI =
  '';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

const DataSchema = new mongoose.Schema({
  data: [[String]],
});

const DataModel = mongoose.model('excel', DataSchema);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.get('/data', async (req, res) => {
  const data = await DataModel.findOne();
  res.json(data ? data.data : []);
});

app.post('/data', async (req, res) => {
  const data = req.body;
  await DataModel.deleteMany({});
  await DataModel.create({ data });
  res.sendStatus(200);
});

app.listen(3000, () => console.log('Server listening on port 3000'));
