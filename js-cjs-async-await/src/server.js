const mongooseConnect = require('./db.connect');
const { app } = require('./app');
const { connectionType } = require('./lib/helpers');

const port = connectionType().port || 3000;

app.listen(port, function() {
  mongooseConnect(port);
});
