import shell from 'shelljs'
import { error } from './utils'

export function exec(command: string): string {
  const options = { slient: true, windowsHide: true }
  const result = shell.exec(command, options)
  if (result.code !== 0) {
    error(result.stderr.toString() || '命令运行出错')
  }
  return result.stdout.toString()
}

export function getUncommitted(file?: string) {
  if (file) {
    return exec(`git status --porcelain ${file}`).trim()
  }
  return exec('git status --porcelain').trim()
}

export function hadChangedFile(file?: string) {
  return !!getUncommitted(file)
}

export function getCurrentBranch(fullPath: boolean = false) {
  return exec(`git symbolic-ref -q HEAD ${fullPath ? '' : '--short'}`).trim()
}

export function getUpstream(branchName?: string) {
  branchName = branchName || getCurrentBranch(true)
  return exec(`git for-each-ref --format='%(upstream:short)' ${branchName}`)
}

export function setUpstream(branchName?: string, remote?: string) {
  branchName = branchName || getCurrentBranch(true)
  remote = remote || 'origin'
  exec(`git push --set-upstream ${remote} ${branchName}`)
}
