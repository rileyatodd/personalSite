let [_, __, gitRef, envName, ...flags] = process.argv
const util = require('util')
const exec = util.promisify(require('child_process').exec)
const stdout = cmd => exec(cmd).then(x => x.stdout.trim())

if ([gitRef, envName].some(x => !x)) {
  throw new Error(`Missing arguments
example usage:
node deploySite.js gitRef envName`)
}

const skipGitCheck = flags.includes('--skip-git-check')

main()

async function main() {
  let commit = await stdout(`git rev-parse ${gitRef}`)
  if (!skipGitCheck) {
    let gitOkay = await checkGitStatus(commit)
  }
  let {bucket} = await getStackOutputs(envName)
  console.log(await pushToBucket(bucket))
}

async function checkGitStatus(commit) {
  let st = await stdout(`git status`)
  if (!st.includes('working tree clean')) {
    throw new Error('Working tree unclean')
  }
  let head = await stdout(`git rev-parse HEAD`)
  if (head !== commit) {
    throw new Error(`HEAD not at commit specified by ref: ${gitRef}`)
  }
  return true
}

async function getStackOutputs(stackName) {
  let bucket = await stdout(`pulumi stack output -s ${stackName} uiContentBucketName`)
  return {bucket}
}

async function pushToBucket(bucket) {
  let profile = await stdout(`pulumi config get aws:profile`)
  return stdout(`aws s3 sync ./dist s3://${bucket} --acl public-read --delete --profile ${profile}`)
}