const { spawn } = require('child_process');
const package_json = require('./package.json');
const chalk = require('chalk');
const dotenv = require('dotenv');

dotenv.config();

/* eslint-disable no-console */

// console
const success = (message) => {
  console.log( chalk.greenBright(message) );
}

const warning = (message) => {
  console.log( chalk.yellowBright(message) );
}

const error = (message) => {
  console.log( chalk.redBright(message) );
}


const npmLifeCycleEvent = process.env.npm_lifecycle_event;

const startScript = {
  atlas: npmLifeCycleEvent === 'dev:atlas',
  local: npmLifeCycleEvent === 'dev:local',
};

const connectionType = () => {
  let connectionChoice = { port: '', uri: '' };

  if (startScript.atlas) {
    connectionChoice = {
      port: process.env.PORT_ATLAS,
      uri: process.env.MONGODB_ATLAS_URI,
    };
  }

  if (startScript.local) {
    connectionChoice = {
      port: process.env.PORT_LOCAL,
      uri: process.env.MONGODB_LOCAL_URI,
    };
  }

  return connectionChoice;
}


// DB connect
const watchEslint = () => {
  const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  spawn(npm, ['run', 'lint:watch'], { cwd: './', stdio: 'inherit' });
}

const server = (serverPort) => {
  try {
    success(`\nnode-mongo (Commonjs Module) API boilerplate template v${package_json.version}`);
    success(`\nServer running at ${serverPort}`);
  } catch (err) {
    error(`${{ err }}`);
  }
}

const eslintAndServer = (serverPort) => {
  watchEslint();
  server(serverPort);
}

const afterDBconnectSuccessful = (serverPort) => {
  const serverType = {
    atlas: startScript.atlas ? 'ATLAS' : '',
    local: startScript.local ? 'LOCAL ' : '',
  }
  success(`\nConnected to ${serverType.local}mongoDB ${serverType.atlas}`);
  eslintAndServer(serverPort);
}

const connectToDBunsuccessful = (err) => {
  error(`\nError in DB connection: ${err.message}\n`);
  warning('Refer to the node-mongo documentation: https://code-collabo.gitbook.io/node-mongo-v2.0.0\n\nGet further help from Code Collabo Community\'s Node mongo channel: https://matrix.to/#/#collabo-node-mongo:gitter.im\n');
}


// export all helper functions together
module.exports = {
  success,
  warning,
  error,
  watchEslint,
  server,
  afterDBconnectSuccessful,
  connectToDBunsuccessful,
  connectionType,
};
