import { realpath } from 'node:fs/promises'

Promise.all([realpath(process.argv[1]), realpath(import.meta.filename)]).then(([argPath, filePath]) => {
  if (argPath === filePath) {
    import('./src/cli.ts')
  }
})
