import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/sse/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/sse/"!</div>
}
