import { signup } from "@/app/Services/Auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useContext, useState } from "react"
import { OTPModal } from "../UI/OTPModal"
import { sendOTP, verifyOTP } from "@/app/Services/OTP"
import { Loader } from '@mantine/core';
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog"
import { AuthContext } from "@/app/Context/Authcontext"
import { useRouter } from "next/navigation"

export const Signup = ({setMode}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    profilePicture: ""
  })
  const [otp, setOtp] = useState({})
  const [open, setOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false)
  const {dispatch} = useContext(AuthContext);
  const router = useRouter()
  async function handleSubmit() {
    try {
      setLoading(true);
      let formFields = new FormData();
      for (let key in formData) {
        formFields.append(key, formData[key])
      }
      const res = await signup(formFields)
      if (res.session) {
        setOtp(prev => {
          return {
            ...prev, sessionId: res.session
          }
        })
        setOpen(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);

    }
  }

  async function handleSubmitOtp() {
    try {
      setLoading(true)
      const res = await verifyOTP({
        ...otp, email: formData.email
      })
      if (res.error == 401) {
        toast(res.msg)

      } else if (res.error == 400) {
        setOpen(false)
        setOtp({})
        setDialogOpen(true);
      } else {
        dispatch({
          type:"SIGN_IN",
          payload:res
        })
        setOpen(false)
        setOtp({})
        setDialogOpen(false);
        router.push("/")
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }

  async function resendOtpHandler() {
    try {
      setDialogOpen(false);
      setLoading(true);
      const res = await sendOTP({ email: formData.email })
      setOtp(prev => {
        return {
          ...prev, sessionId: res.session
        }
      })
      setOpen(true);
    } catch (error) {
      // toast(error)
      console.log(error);
    } finally {
      setLoading(false)
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
          <Label htmlFor="name">Name</Label>
          <Input className="border-2 border-gray-300" type="text" id="name" onChange={(e) => {
            setFormData(prev => {
              return { ...prev, name: e.target.value }
            })
          }} />
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
          <Label htmlFor="phone">Phone</Label>
          <Input className="border-2 border-gray-300" type="text" id="phone" onChange={(e) => {
            setFormData(prev => {
              return { ...prev, phone: e.target.value }
            })
          }} />
          <Label htmlFor="picture">Picture</Label>
          <Input className="border-2 border-gray-300" id="picture" type="file" onChange={(e) => {
            setFormData(prev => {
              return { ...prev, profilePicture: e.target.files[0] }
            })
          }} />
          <Button disabled={loading} onClick={() => {
            handleSubmit()
          }}>Sign Up!</Button>
          <Button variant="link" onClick={()=>{
            setMode("signin")
          }}>Already have an account? Signin!</Button>
          <OTPModal value={otp} setValue={setOtp} open={open} setOpen={setOpen} handleSubmit={handleSubmitOtp} loading={loading} />
          <AlertDialog open={dialogOpen} setOpen={setDialogOpen}>
            {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>No more Attempts left</AlertDialogTitle>
                <AlertDialogDescription>
                  You have to resend the OTP!
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <Button onClick={() => {
                  resendOtpHandler()
                }}>Resend</Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </>
  )
}
