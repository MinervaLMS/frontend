import useSWR from "swr"
import { API_ENDPOINTS, API_STATUS_CODE } from "@/config/api-connections";

function useMaterialAccess (materialId: number, userId: string, userAccessToken: string) {
  const createAccess = async () => {
    console.log("Creating access to material with id: " + materialId);
    try {
      let config = {
        method: "POST",
        headers: {
          Authorization: "Bearer " + userAccessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({"material_id": materialId, "user_id": userId}),
      };

      let response = await fetch(
        `${API_ENDPOINTS.ACCESS}create/`,
        config
      );
      let data = await response.json();
      console.log(data);
      return data;
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
      const access = await createAccess();
      return access;
    }

    if (!response.ok) {
      const error = new Error(response.status.toString())
      throw error
    }

    return response.json()
  }

  const { data, error, isLoading } = useSWR(`${API_ENDPOINTS.ACCESS}${materialId}/${userId}/`, fetcher)

  return {
      data,
      isLoading,
      error
  }
}

export default useMaterialAccess