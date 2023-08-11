import React from "react";

export default function ResetPassword({
  params,
}: {
  params: { userId: string; token: string };
}) {
  return (
    <>
      <p>User id: {params.userId}</p>
      <p>Token: {params.token}</p>
    </>
  );
}
