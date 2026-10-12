import { aiForecastFlow, aiScholarshipFlow, aiTuningFlow } from './ai.ts'
import { applicationFlow } from './application.ts'
import { coinFlow } from './coin.ts'
import { journeyFlow } from './journey.ts'
import { newsfeedFlow } from './newsfeed.ts'
import { entryTestFlow, extracurricularFlow, telesaleFlow } from './other.ts'
import { tutorFlow } from './tutor.ts'
import type { FeatureFlow } from './types.ts'

// Keyed by the section 3 feature heading id. Imports keep the .ts extension so scripts/validate-flows.mjs can load them in Node.
export const featureFlows: Partial<Record<string, FeatureFlow[]>> = {
  'goi-ba-tier': [journeyFlow],
  'application-management': [applicationFlow],
  'coin-system-mission': [coinFlow],
  tutor: [tutorFlow],
  newsfeed: [newsfeedFlow],
  'ai-application': [aiTuningFlow, aiForecastFlow, aiScholarshipFlow],
  'feature-other': [telesaleFlow, extracurricularFlow, entryTestFlow],
}
