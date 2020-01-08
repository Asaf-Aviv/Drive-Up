/* eslint-disable no-empty */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs')

const makeBarrel = (
  directoryPath,
  barrelsFilePath,
  fromFilePath,
  filterByFile,
  deleteFileBefore = true,
) => {
  if (deleteFileBefore) {
    try {
      fs.unlinkSync(barrelsFilePath)
    } catch (e) {}
  }

  const barrelFileContent = fs.readdirSync(directoryPath, { withFileTypes: true })
    .filter(dirent => filterByFile ? dirent.isFile() : dirent.isDirectory())
    .filter(({ name }) => name !== 'global')
    .map(({ name }) => name.split('.')[0])
    .map(name => `export { default as ${name} } from '${fromFilePath}/${name}'\n`)
    .join('')

  fs.appendFileSync(barrelsFilePath, barrelFileContent)
}

makeBarrel('./src/components/global', './src/components/index.tsx', './global', true)
makeBarrel('./src/components', './src/components/index.tsx', '.', false, false)
makeBarrel('./src/hooks', './src/hooks/index.ts', '.', true)
