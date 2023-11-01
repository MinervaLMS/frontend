'use client'

import { SWRConfig } from 'swr'

interface SWRFetchConfigProps {
  children: React.ReactNode;
}

function SWRFetchConfig({ children }: SWRFetchConfigProps) {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false
      }}
    >
      {children} 
    </SWRConfig>
  );
}

export default SWRFetchConfig;