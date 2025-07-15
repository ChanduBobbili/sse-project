import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="h-screen flex justify-center items-center">
      <Link
        to="/sse"
        className="text-2xl border p-3 rounded-2xl hover:text-white hover:bg-black hover:scale-105 transition-all duration-300 ease-in-out"
      >
        SSE layout
      </Link>
    </div>
  )
}
