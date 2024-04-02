import { spawn } from 'child_process';
import package_json from './package.json';
import chalk from 'chalk';
import dotenv from 'dotenv';

dotenv.config();

/* eslint-disable no-console */

// console
export const success = (message: string) => {
  console.log( chalk.greenBright(message) );
}

export const warning = (message: string) => {
  console.log( chalk.yellowBright(message) );
}

export const error = (message: string) => {
  console.log( chalk.redBright(message) );
}


const npmLifeCycleEvent = process.env.npm_lifecycle_event;

const startScript = {
  atlas: npmLifeCycleEvent === 'dev:atlas',
  local: npmLifeCycleEvent === 'dev:local',
};

export const connectionType = () => {
  let connectionChoice: {
    port: string | number;
    uri: string;
  } = { port: '', uri: '' };

  if (startScript.atlas) {
    connectionChoice = {
      port: process.env.PORT_ATLAS as string | number,
      uri: process.env.MONGODB_ATLAS_URI as string,
    };
  }

  if (startScript.local) {
    connectionChoice = {
      port: process.env.PORT_LOCAL as string | number,
      uri: process.env.MONGODB_LOCAL_URI as string,
    };
  }

  return connectionChoice;
}


// DB connect
export const npmRunPackageJsonScript = ({ script, currentWorkingDir } : { script: string, currentWorkingDir: string }): void => {
  const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  spawn(npm, ['run', script], { cwd: currentWorkingDir, stdio: 'inherit' });
}

export const server = (serverPort: number | string): void => {
  try {
    success(`\nnode-mongo (Typescript) API boilerplate template v${package_json.version}`);
    success(`\nServer running at ${serverPort}`);
  } catch (err) {
    error(`${{ err }}`);
  }
}

const eslintAndServer = (serverPort: number | string) => {
  npmRunPackageJsonScript({ script: 'lint:watch', currentWorkingDir: './' });
  server(serverPort);
}

export const afterDBconnectSuccessful = (serverPort: number | string) => {
  const serverType = {
    atlas: startScript.atlas ? 'ATLAS' : '',
    local: startScript.local ? 'LOCAL ' : '',
  }
  success(`\nConnected to ${serverType.local}mongoDB ${serverType.atlas}`);
  eslintAndServer(serverPort);
}

export const connectToDBunsuccessful = (err: { message: unknown; }) => {
  error(`\nError in DB connection: ${err.message}\n`);
  warning('Refer to the node-mongo documentation: https://code-collabo.gitbook.io/node-mongo-v2.0.0\n\nGet further help from Code Collabo Community\'s Node mongo channel: https://matrix.to/#/#collabo-node-mongo:gitter.im\n');
}
