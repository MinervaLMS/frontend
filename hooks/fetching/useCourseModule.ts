import useSWR from "swr"
import { API_ENDPOINTS } from "@/config/api-connections";

function useCourseModule (moduleID: number, userAccessToken: string) {
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

  const { data, error, isLoading } = useSWR(`${API_ENDPOINTS.MODULE}${moduleID}/`, fetcher)

  return {
      moduleData: data,
      isLoading,
      error: error
  }
}

export default useCourseModule