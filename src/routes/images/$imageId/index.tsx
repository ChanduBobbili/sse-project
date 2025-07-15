import useApis from '@/hooks/use-apis'
import useSSE from '@/hooks/use-sse'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/images/$imageId/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { imageId } = Route.useParams()
  const { useGetImageById } = useApis()
  const { data } = useGetImageById(imageId)

  const { data: sseData, error, loading } = useSSE(`/images/${imageId}`)

  return (
    <div className="w-full flex flex-col gap-2">
      <img
        src={data.image_url}
        alt={data.title}
        className="w-full h-96 object-cover"
      />
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {sseData && <div>{sseData}</div>}
    </div>
  )
}
