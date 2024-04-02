const mongoose = require('mongoose');
const { connectionType, afterDBconnectSuccessful, connectToDBunsuccessful } = require('../node-mongo-helpers');

const mongooseConnect = async function(port) {
  try {
    await mongoose.connect(`${connectionType().uri}`);
    afterDBconnectSuccessful(port);
  } catch (err) {
    connectToDBunsuccessful(err);
  }
}

module.exports = mongooseConnect;
