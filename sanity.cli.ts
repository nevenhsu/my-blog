/* eslint-disable no-process-env */
import { loadEnvConfig } from '@next/env'
import { defineCliConfig } from 'sanity/cli'
import { publicEnv } from '@/utils/env'

loadEnvConfig(__dirname, publicEnv.isDev, { info: () => null, error: console.error })

const { projectId, dataset } = publicEnv.sanity

export default defineCliConfig({ api: { projectId, dataset } })
