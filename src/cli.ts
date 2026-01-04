#!/usr/bin/env node
import { cli } from 'gunshi'

cli(process.argv.slice(2), async () => {
  return 'niri-letterbox - CLI tool for adjusting letterboxing on niri display outputs'
}, {
  name: 'niri-letterbox',
  description: 'CLI tool for adjusting letterboxing on niri display outputs',
  version: '1.0.0'
})
