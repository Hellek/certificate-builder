import { relative } from 'path'

let customArgs = ''
const isFailOnWarnings = true
const failOnWarningsArg = '--max-warnings=0'
if (isFailOnWarnings) customArgs += ` ${failOnWarningsArg}`

const buildEslintCommand = filenames =>
  `next lint ${customArgs} --file ${filenames
    .map(f => relative(process.cwd(), f))
    .join(' --file ')}`

const stylelintCommand = 'npm run lintstyle';

const config = {
  '*.{js,ts,tsx}': [buildEslintCommand],
  '*.css': [stylelintCommand],
}

export default config