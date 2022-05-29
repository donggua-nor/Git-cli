import shell from 'shelljs'
import chalk from 'chalk'

export const log = console.log

export function success(msg: string) {
  console.log(chalk.green(msg))
}

export function warn(msg: string) {
  log(chalk.yellow(msg))
  process.exit(0)
}

export function error(msg: string) {
  log(chalk.red(msg))
  process.exit(1)
}

export function precheck() {
  if (!shell.which('git')) {
    warn('Git must be installed')
  }
  success(`Using ${parseManagerAgent()}`)
}

function parseManagerAgent(): string {
  const base = `Node ${process.version}`
  const { npm_config_user_agent: userAgent = '' } = process.env
  if (!userAgent) {
    return base
  }
  const manager = userAgent.split(' ')[0]
  return base + ' ' + manager.replace('/', '@')
}
