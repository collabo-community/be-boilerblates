import mongooseConnect from './db.connect';
import { app as app } from './app';
import { connectionType } from './lib/helpers';


const port = connectionType().port || 3000;

app.listen(port, () => {
  mongooseConnect(port);
});
