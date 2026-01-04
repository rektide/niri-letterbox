import { xdgConfig, xdgConfigDirectories } from 'xdg-basedir'

const NIRI_CONFIG_NAME = 'config.kdl'

export function getNiriConfigPath(customPath?: string): string {
  if (customPath) {
    return customPath
  }

  const configDir = xdgConfig || (xdgConfigDirectories[0] as string | undefined)
  
  if (configDir) {
    return `${configDir}/niri/${NIRI_CONFIG_NAME}`
  }

  throw new Error('Unable to determine XDG config directory')
}

export function getNiriConfigDir(): string | undefined {
  return xdgConfig || (xdgConfigDirectories[0] as string | undefined)
}
