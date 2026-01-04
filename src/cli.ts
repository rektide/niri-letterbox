#!/usr/bin/env node
import { cli } from 'gunshi'
import { showConfig } from './commands/show-config.ts'

const command = {
  name: 'niri-letterbox',
  description: 'CLI tool for adjusting letterboxing on niri display outputs',
  run: async (_ctx: any) => {
    return 'niri-letterbox - CLI tool for adjusting letterboxing on niri display outputs\n\nRun "niri-letterbox show-config" to view current niri configuration.'
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
