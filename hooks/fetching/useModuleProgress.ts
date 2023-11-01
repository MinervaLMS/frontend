import useSWR from "swr"
import { API_ENDPOINTS, API_STATUS_CODE } from "@/config/api-connections";

function useModuleProgress (moduleId: number, userId: string, userAccessToken: string) {
  const createProgress = async () => {
    console.log("Creating progress to module with id: " + moduleId);
    try {
      let config = {
        method: "POST",
        headers: {
          Authorization: "Bearer " + userAccessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({"module_id": moduleId, "user_id": userId}),
      };

      let response = await fetch(
        `${API_ENDPOINTS.PROGRESS}create/`,
        config
      );
      return response.ok;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const config = {
    method: "GET",
    headers: {
      Authorization: "Bearer " + userAccessToken,
    },
  };

  const fetcher = async (url: string) => {
    const response = await fetch(url, config);
    if (response.status == API_STATUS_CODE.NOT_FOUND) {
      const progress = await createProgress(); 
      if (!progress) {
        const error = new Error(API_STATUS_CODE.BAD_REQUEST.toString())
        throw error
      }
      const newResponse = await fetch(url, config);
      if (!newResponse.ok) {
        const error = new Error(newResponse.status.toString())
        throw error
      }
      return newResponse.json()
    } else {
      if (!response.ok) {
        const error = new Error(response.status.toString())
        throw error
      }
      return response.json()
    }
  }

  const { data, error, isLoading } = useSWR(`${API_ENDPOINTS.PROGRESS}${moduleId}/${userId}/`, fetcher)

  return {
      data,
      isLoading,
      error
  }
}

export default useModuleProgress