import { readFile } from 'node:fs/promises'
import { getNiriConfigPath } from '../config.ts'

export async function showConfig(_ctx: any): Promise<void> {
  const configPath = getNiriConfigPath()
  
  try {
    const configContent = await readFile(configPath, 'utf-8')
    console.log(`Niri configuration: ${configPath}\n`)
    console.log(configContent)
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      console.error(`Error: Niri configuration file not found at ${configPath}`)
      process.exit(1)
    }
    throw error
  }
}
