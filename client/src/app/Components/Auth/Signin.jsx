import { signin } from "@/app/Services/Auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useContext, useState } from "react"
import { Loader } from '@mantine/core';
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { AuthContext } from "@/app/Context/Authcontext"

export const Signin = ({setMode}) => {
   const [formData, setFormData] = useState({
      email: "",
      password: ""
    })
    const [loading, setLoading] = useState(false)
    const {dispatch} = useContext(AuthContext);
    const router = useRouter()

    async function handleSubmit() {
    try {
      setLoading(true)
      const res = await signin(formData)
      if(res.error==401){
         toast(res.msg)
      }else if(res.error==404){
         toast(res.msg)
      }else{
        dispatch({
          type:"SIGN_IN",
          payload:res
        })
        router.push("/Feed")
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);

    }
  }

  return (
    <>
    {
        loading ? <div
          className="fixed left-0 flex justify-center items-center h-[100vh] w-[100vw] z-1">
          <div className="bg-white p-3 rounded-2xl">
            <Loader color="black" size="xl" type="dots" />
          </div>
        </div> : <></>
      }
      <div className="flex items-center justify-center h-dvh">
        <div className="bg-muted-foreground border-2 border-gray-500 
          rounded-md grid w-full max-w-sm items-center gap-3 my-auto  p-8">
          <Label htmlFor="email">Email</Label>
          <Input className="border-2 border-gray-300" type="email" id="email" onChange={(e) => {
            setFormData(prev => {
              return { ...prev, email: e.target.value }
            })
          }} />
          <Label htmlFor="password">Password</Label>
          <Input className="border-2 border-gray-300" type="password" id="password" onChange={(e) => {
            setFormData(prev => {
              return { ...prev, password: e.target.value }
            })
          }} />
           <Button disabled={loading} onClick={() => {
            handleSubmit()
          }}>Sign In!</Button>
          <Button variant="link" onClick={()=>{
            setMode("signup")
          }}>Dont have an account? Signup!</Button>
        </div>
      </div>
    </>
  )
}
