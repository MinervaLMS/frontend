import useSWR from "swr"
import { API_ENDPOINTS } from "@/config/api-connections";

function useCourseMaterial (materialID: string | string[], userAccessToken: string) {
  const config = {
    method: "GET",
    headers: {
      Authorization: "Bearer " + userAccessToken,
    },
  };

  const fetcher = async (url: string) => {
    const response = await fetch(url, config);

    if (!response.ok) {
      const error = new Error(response.status.toString())
      throw error
    }

    return response.json()
  }

  const { data, error, isLoading } = useSWR(`${API_ENDPOINTS.MATERIAL}${materialID}/`, fetcher)

  return {
      materialData: data,
      isLoading,
      error: error
  }
}

export default useCourseMaterial