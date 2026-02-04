import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/sub-trabalho')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/sub-trabalho"!</div>
}
