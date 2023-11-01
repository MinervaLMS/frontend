import useSWR from "swr"
import { API_ENDPOINTS, API_STATUS_CODE } from "@/config/api-connections";

function useModuleAccess (moduleId: number, userId: string, userAccessToken: string) {

  const config = { method: "GET", headers: { Authorization: "Bearer " + userAccessToken } };

  const fetcher = async (url: string) => {
    const response = await fetch(url, config);

    if (response.status == API_STATUS_CODE.NOT_FOUND) {
      const error = new Error(API_STATUS_CODE.NOT_FOUND.toString())
      throw error
    } else {
      if (!response.ok) {
        const error = new Error(response.status.toString())
        throw error
      }
      return await response.json()
    }
  }

  const { data, error, isLoading } = useSWR(`${API_ENDPOINTS.ACCESS_MODULE}${userId}/${moduleId}/access/`, fetcher)

  return {
    data,
    isLoading,
    error
  }
}

export default useModuleAccess