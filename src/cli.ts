#!/usr/bin/env node
import { cli } from 'gunshi'
import { letterbox } from './commands/letterbox.ts'
import { showConfig } from './commands/show-config.ts'

const command = {
  name: 'niri-letterbox',
  description: 'CLI tool for adjusting letterboxing on niri display outputs',
  args: {
    size: {
      type: 'string',
      short: 's',
      description: 'Letterbox strut size as percentage (0-100)'
    }
  },
  run: async (ctx: any) => {
    if (ctx.values.size) {
      return await letterbox(ctx)
    }
    return 'niri-letterbox - CLI tool for adjusting letterboxing on niri display outputs\n\nUsage: niri-letterbox --size <percentage>\n\nRun "niri-letterbox show-config" to view current niri configuration.'
  }
}

cli(process.argv.slice(2), command, {
  name: 'niri-letterbox',
  version: '1.0.0',
  description: 'CLI tool for adjusting letterboxing on niri display outputs',
  subCommands: {
    'show-config': {
      name: 'show-config',
      description: 'Read and display current niri configuration',
      run: showConfig
    }
  }
}).catch(console.error)
