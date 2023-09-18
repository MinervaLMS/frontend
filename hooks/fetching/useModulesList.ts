import useSWR from "swr"
import { API_ENDPOINTS } from "@/config/api-connections";
import { API_ModuleObject } from "@/config/interfaces";

function useModulesList (courseAlias: string, userAccessToken: string) {
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

    const data = await response.json()

    // Order the list of modules according to their order property.
    data.sort((a: API_ModuleObject, b: API_ModuleObject) =>
      a.order > b.order ? 1 : -1
    );

    return data
  }

  const { data, error, isLoading } = useSWR(`${API_ENDPOINTS.COURSE}${courseAlias}${API_ENDPOINTS.MODULES}`, fetcher)

  return {
      modulesList: data,
      isLoading,
      error: error
  }
}

export default useModulesList