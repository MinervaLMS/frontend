import useSWR from "swr"
import { API_ENDPOINTS, API_STATUS_CODE } from "@/config/api-connections";
import { API_ModuleListProgressObject, API_ModuleObject } from "@/config/interfaces";

function useModulesListProgress (userId: string, courseAlias: string, userAccessToken: string) {
  const createProgress = async (moduleId: number) => {
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

  const readModules = async () => {
    console.log("Creating progress to modules of course with alias: " + courseAlias);
    try {
      let response = await fetch(
        `${API_ENDPOINTS.COURSE}${courseAlias}${API_ENDPOINTS.MODULES}`,
        config
      );
      return response.json();
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const fetcher = async (url: string) => {
    const response = await fetch(url, config);
    if (response.status == API_STATUS_CODE.NOT_FOUND) {
      const modulesList = await readModules();
      if(!modulesList) {
        const error = new Error(API_STATUS_CODE.BAD_REQUEST.toString())
        throw error
      }
      modulesList.forEach((module: API_ModuleObject) => {
        const progress = createProgress(module.id);
        if (!progress) {
          const error = new Error(API_STATUS_CODE.BAD_REQUEST.toString())
          throw error
        }
      });
      const newResponse = await fetch(url, config);
      if (!newResponse.ok) {
        const error = new Error(newResponse.status.toString())
        throw error
      }

      const data = await newResponse.json()
      // Order the list of modules according to their order property.
      data.sort((a: API_ModuleListProgressObject, b: API_ModuleListProgressObject) =>
        a.order > b.order ? 1 : -1
      );
      return data
    } else {
      if (!response.ok) {
        const error = new Error(response.status.toString())
        throw error
      }

      const data = await response.json()
      // Order the list of modules according to their order property.
      data.sort((a: API_ModuleListProgressObject, b: API_ModuleListProgressObject) =>
        a.order > b.order ? 1 : -1
      );
      return data
    }
  }

  const { data, error, isLoading } = useSWR(`${API_ENDPOINTS.MODULE}progress/${userId}/${courseAlias}/`, fetcher)

  return {
      data,
      isLoading,
      error
  }
}

export default useModulesListProgress