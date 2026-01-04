import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { join } from 'node:path'
import { getNiriConfigDir } from '../config.ts'

const MAIN_CONFIG_PATH = join(getNiriConfigDir() || '', 'config.kdl')
const LETTERBOX_DIR = join(getNiriConfigDir() || '', 'letterbox')
const LETTERBOX_CONFIG_PATH = join(LETTERBOX_DIR, 'letterbox.kdl')
const INCLUDE_LINE = `include "letterbox/letterbox.kdl"`

export async function enableDisableLetterbox(enable: boolean): Promise<void> {
  await mkdir(LETTERBOX_DIR, { recursive: true })
  
  let mainConfig = ''
  try {
    mainConfig = await readFile(MAIN_CONFIG_PATH, 'utf-8')
  } catch (error: unknown) {
    throw error
  }
  
  if (enable) {
    if (mainConfig.includes(INCLUDE_LINE)) {
      console.log('Letterboxing already enabled')
      return
    }
    
    const newConfig = mainConfig.trimEnd() + `\n${INCLUDE_LINE}\n`
    await writeFile(MAIN_CONFIG_PATH, newConfig, 'utf-8')
    console.log('Enabled letterboxing')
    console.log(`Include added: ${INCLUDE_LINE}`)
  } else {
    if (!mainConfig.includes('letterbox/letterbox.kdl')) {
      console.log('Letterboxing already disabled')
      return
    }
    
    const newConfig = mainConfig.trimEnd() + `\n${INCLUDE_LINE}\n`
    await writeFile(MAIN_CONFIG_PATH, newConfig, 'utf-8')
    console.log('Disabled letterboxing')
    console.log(`Include commented: // ${INCLUDE_LINE}`)
  }
}

export async function createLetterboxConfigIfNotExists(): Promise<void> {
  try {
    await readFile(LETTERBOX_CONFIG_PATH, 'utf-8')
    console.log('Letterbox config already exists')
  } catch {
    const defaultConfig = `// Letterboxing configuration
layout {
    struts {
        top 64
        bottom 64
    }
}`
    await mkdir(LETTERBOX_DIR, { recursive: true })
    await writeFile(LETTERBOX_CONFIG_PATH, defaultConfig, 'utf-8')
    console.log('Created letterbox config with defaults')
  }
}
