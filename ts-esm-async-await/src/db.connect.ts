import mongoose from 'mongoose';
import { connectionType, afterDBconnectSuccessful, connectToDBunsuccessful } from './lib/helpers';

const mongooseConnect = async (port: number | string) => {
  try {
    await mongoose.connect(`${connectionType().uri}`);
    afterDBconnectSuccessful(port);
  } catch (err) {
    connectToDBunsuccessful(err);
  }
}

export default mongooseConnect;
