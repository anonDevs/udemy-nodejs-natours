const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const Tour = require('../../models/tourModel');

dotenv.config({ path: `${__dirname}/../../config.env` });

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

//Read JSON File
const tours = JSON.parse(fs.readFileSync('tours-simple.json', 'utf-8'));

//Delete data from DB
const deletData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

//Import the data
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data Successfully Loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] == '--import') {
  importData();
} else if (process.argv[2] == '--delete') {
  deletData();
}
