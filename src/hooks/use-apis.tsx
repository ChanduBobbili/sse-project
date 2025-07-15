import api from '@/lib/api'
import { DEFAULT_IMAGES } from '@/lib/defaults'
import type { IMAGE } from '@/lib/types'
import { useSuspenseQuery } from '@tanstack/react-query'

export default function useApis() {
  const useGetImages = () => {
    return useSuspenseQuery<Array<IMAGE>>({
      queryKey: ['get-images'],
      queryFn: async () => {
        try {
          const { data } = await api.get<Array<IMAGE>>('/images')
          return data
        } catch (error) {
          console.error(error)
          return DEFAULT_IMAGES
        }
      },
    })
  }

  const useGetImageById = (imageId: string) => {
    return useSuspenseQuery<IMAGE>({
      queryKey: ['get-image-by-id', imageId],
      queryFn: async () => {
        try {
          const { data } = await api.get<IMAGE>(`/images/${imageId}`)
          return data
        } catch (error) {
          console.error(error)
          return DEFAULT_IMAGES[0]
        }
      },
    })
  }

  return { useGetImages, useGetImageById }
}
