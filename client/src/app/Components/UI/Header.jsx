"use client"
import { Button } from "@mantine/core"
import logo from "../../../../public/logo.png"
import { useContext } from "react"
import { AuthContext } from "@/app/Context/Authcontext"
import { useRouter } from "next/navigation"
export const Header = () => {
  const {AuthState,dispatch} = useContext(AuthContext);
  const router=useRouter();
  function logout(){
    try {
      dispatch({
        type:"SIGN_OUT"
      })
      router.push("/Auth")
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <div className="flex justify-between pt-1 pb-2 ps-3 pe-3">
        <div>
          <img src={logo.src} alt="" className="h-15 cursor-pointer" />
        </div>
        <div className="flex items-center">
          <div className="me-3 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="rgba(0,0,255,0.6)" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
            </svg>
          </div>
          <div className="me-3 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="rgba(0,0,255,0.6)" className="bi bi-person-plus-fill" viewBox="0 0 16 16">
              <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
              <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5" />
            </svg>
          </div>
          <div className="cursor-pointer">
            <Button variant="outline" color="gray" size="sm" radius="md" onClick={()=>{
              logout()
            }}>Logout</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
