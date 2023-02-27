#!/usr/bin/env node
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { execSync } = require('child_process')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require('../package.json')

const runCommand = (command) => {
  try {
    execSync(`${command}`, { stdio: 'inherit' })
  } catch (e) {
    console.error('Failed to execute ${command}', e)
    return false
  }
  return true
}

function sanitize_string(command) {
  const regex_expression = /^[\w\d-_]+$/ //only allow letters (\w), digits (\d), dash (-) and underscore (_)
  if (regex_expression.test(command)) {
    return command
  } else {
    throw new Error(
      'Please use a valid repo name (no special characters allowed).'
    )
  }
}

const repoName = sanitize_string(process.argv[2])
const gitCloneCommand = `git clone --depth 1 --branch v${packageJson.version} https://github.com/equinor/create-dm-app ${repoName}`
const installDepsCommand = `cd ${repoName} && npm install`

console.log(`Cloning version v${packageJson.version} into ${repoName}`)
const cloned = runCommand(gitCloneCommand)
if (!cloned) process.exit(-1)

console.log(`Installing dependencies for ${repoName}`)
const installedDeps = runCommand(installDepsCommand)
if (!installedDeps) process.exit(-1)

console.log('Cleaning up...')
runCommand(`rm -rf ${repoName}/bin`)
runCommand(`rm -rf ${repoName}/.git`)
runCommand(`rm -rf ${repoName}/.github`)
runCommand(`rm -rf ${repoName}/CHANGELOG.md`)

console.log(
  'Congratulations! You are ready. Follow the following commands to start'
)
console.log(`cd ${repoName} && npm start`)
