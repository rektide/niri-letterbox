import { parse, format, Node } from '@bgotink/kdl'
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { join } from 'node:path'
import { getNiriConfigDir } from '../config.ts'

const LETTERBOX_DIR = join(getNiriConfigDir() || '', 'letterbox')
const LETTERBOX_CONFIG_PATH = join(LETTERBOX_DIR, 'letterbox.kdl')

function parseSize(sizeStr: string): number {
  const size = parseInt(sizeStr, 10)
  if (isNaN(size)) {
    throw new Error('Size must be a valid number')
  }
  if (size < 0 || size > 100) {
    throw new Error('Size percentage must be between 0 and 100')
  }
  return size
}

async function ensureLetterboxConfigExists(): Promise<void> {
  try {
    await readFile(LETTERBOX_CONFIG_PATH, 'utf-8')
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
  }
}

export async function letterbox(ctx: any): Promise<void> {
  const sizeStr = ctx.values.size
  
  if (!sizeStr) {
    console.error('Error: --size option is required')
    console.error('Usage: niri-letterbox --size <percentage>')
    process.exit(1)
  }
  
  const size = parseSize(sizeStr)
  const configPath = getNiriConfigDir() || ''
  
  console.log(`Setting letterbox size to ${size}%`)
  console.log(`Letterbox config: ${LETTERBOX_CONFIG_PATH}`)
  
  await ensureLetterboxConfigExists()
  
  let _mainConfig = ''
  try {
    _mainConfig = await readFile(join(configPath, 'config.kdl'), 'utf-8')
  } catch {
    return
  }
  
  
  
  let letterboxLayout: Node | null = null
  try {
    const letterboxConfig = await readFile(LETTERBOX_CONFIG_PATH, 'utf-8')
    letterboxLayout = parse(letterboxConfig).nodes[0]
  } catch {
  }
  
  if (letterboxLayout) {
    const strutsNode = letterboxLayout.children?.nodes.find((node: Node) => 
      node.name?.name === 'struts'
    )
    
    if (strutsNode) {
      const topEntry = strutsNode.entries?.find((entry: any) => entry.name === 'top')
      const bottomEntry = strutsNode.entries?.find((entry: any) => entry.name === 'bottom')
      
      if (topEntry) {
        topEntry.value = { type: 'value', value: size } as any
      }
      if (bottomEntry) {
        bottomEntry.value = { type: 'value', value: size } as any
      }
      
      await writeFile(LETTERBOX_CONFIG_PATH, format(letterboxLayout), 'utf-8')
      console.log('✓ Updated letterbox.kdl with new strut size')
    }
  }
}
