import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/readmore')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/"!</div>
}
