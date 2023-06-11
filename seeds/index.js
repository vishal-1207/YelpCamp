const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error: '));
db.once('open', () => {
  console.log('Database Connected!');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany();
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const camp = new Campground({
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      image: 'https://source.unsplash.com/collection/483251',
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod iure commodi delectus illum voluptatem impedit repellat magnam voluptatibus adipisci ipsa, a asperiores, nostrum quia soluta possimus, ut maxime mollitia ratione.',
      price: Math.floor(Math.random() * 20) + 10
    })
    await camp.save();
  }
}

seedDB().then(() => {
  mongoose.connection.close();
});