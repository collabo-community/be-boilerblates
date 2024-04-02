import mongoose from 'mongoose';
import { connectionType, afterDBconnectSuccessful, connectToDBunsuccessful } from './node-mongo-helpers';

const mongooseConnect = async (port: number | string) => {
  try {
    await mongoose.connect(`${connectionType().uri}`);
    afterDBconnectSuccessful(port);
  } catch (err) {
    connectToDBunsuccessful(err);
  }
}

export default mongooseConnect;
