import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/contactUs')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/contactUs"!</div>
}
