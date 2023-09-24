import React from "react";
import useSWR from "swr"
import { API_ENDPOINTS } from "@/config/api-connections";

function useConfirmAccount (userID: string, userToken: string, ) {
  const config = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  const fetcher = async (url: string) => {
    const response = await fetch(url, config);

    if (!response.ok) {
      const error = new Error(response.status.toString())
      throw error
    }

    return response.status
  }

  const { data, error, isLoading } = useSWR(`${API_ENDPOINTS.CONFIRM_ACCOUNT}${userID}/${userToken}`, fetcher)

  return {
      data,
      isLoading,
      error
  }
}

export default useConfirmAccount;