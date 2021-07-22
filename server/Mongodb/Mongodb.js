const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/interview', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
mongoose.set('useFindAndModify', false);
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('db Connected')
});