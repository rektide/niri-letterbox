import { getNiriConfigPath } from '../config.ts'

export async function letterbox(ctx: any): Promise<void> {
  const size = ctx.values.size
  const configPath = getNiriConfigPath()
  
  if (!size) {
    console.log('Letterbox command - size option required')
    console.log(`Will modify: ${configPath}`)
    return
  }
  
  console.log(`Letterbox command with size: ${size}%`)
  console.log(`Will modify: ${configPath}`)
  
  // TODO: Validate percentage (0-100)
  // TODO: Parse and modify config file
  // TODO: Apply struts based on size percentage
}
