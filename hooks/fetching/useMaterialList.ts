import useSWR from 'swr'
import { API_ENDPOINTS, API_URL } from '@/config/api-connections'
import { API_MaterialObject } from '@/config/interfaces'

function useMaterialList(
  userId: number,
  moduleId: number,
  userAccessToken: string
) {
  const config = {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + userAccessToken
    }
  }

  const fetcher = async (url: string) => {
    const response = await fetch(url, config)

    if (!response.ok) {
      const error = new Error(response.status.toString())
      throw error
    }

    const data = await response.json()

    // Order the list of materials according to their order property.
    data.sort((a: API_MaterialObject, b: API_MaterialObject) =>
      a.order > b.order ? 1 : -1
    )

    return data
  }

  const { data, error, isLoading } = useSWR(
    `${API_URL}/users/1/module/1/materials/`,
    fetcher
  )

  return {
    data,
    isLoading,
    error
  }
}

export default useMaterialList
