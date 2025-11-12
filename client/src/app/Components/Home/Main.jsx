import { useAuthWrapper } from '@/app/Utils/VerifyLoginHook'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const Main = () => {
  return (
    <div></div>
  )
}

export default useAuthWrapper(Main)