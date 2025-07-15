import useApis from '@/hooks/use-apis'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/images/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { useGetImages } = useApis()
  const { data } = useGetImages()
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-8">
      {data.map((image) => (
        <Link
          to="/images/$imageId"
          params={{ imageId: image.id }}
          key={image.id}
        >
          <img
            src={image.image_url}
            alt={image.title}
            className="w-full h-96 object-cover hover:scale-105 transition-all duration-300 ease-in-out hover:rounded-xl rounded"
          />
        </Link>
      ))}
    </div>
  )
}
