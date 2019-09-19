//IMPORT APP CONFIG
const mongoose = require('mongoose');
const app = require('./app');

//Connect DB
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log('connection to DB successful');
  })
  .catch(err => {
    console.log('Error: ', err);
  });

//START THE SERVER
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
