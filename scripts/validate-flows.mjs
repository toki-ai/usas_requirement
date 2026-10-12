import { featureFlows } from '../src/plan/flows/registry.ts'
import { validateFlow } from '../src/plan/flows/validate.ts'

let failed = false
const ids = new Set()
for (const [featureId, flows] of Object.entries(featureFlows)) {
  for (const flow of flows ?? []) {
    const errors = validateFlow(flow)
    if (ids.has(flow.id)) errors.push(`Flow id "${flow.id}" bị trùng.`)
    ids.add(flow.id)
    if (errors.length === 0) {
      console.log(`ok   ${featureId} / ${flow.id} (${flow.nodes.length} nodes, ${flow.edges.length} edges)`)
      continue
    }
    failed = true
    console.error(`fail ${featureId} / ${flow.id}`)
    for (const error of errors) console.error(`  - ${error}`)
  }
}
process.exit(failed ? 1 : 0)
