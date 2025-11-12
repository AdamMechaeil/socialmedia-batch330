import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"

export function OTPModal({value,setValue,open,setOpen,handleSubmit,loading}) {
    return (
        <Dialog open={open} setOpen={setOpen}>
            <DialogContent className="sm:max-w-md [&>button]:hidden">
                <DialogHeader>
                    <DialogTitle>OTP!</DialogTitle>
                </DialogHeader>
                <div className="flex items-center gap-2">
                    <div className="grid flex-1 gap-2">
                        <Label className="sr-only">
                            OTP
                        </Label>
                        <InputOTP maxLength={6} value={value.otp}
                            onChange={(value) => {
                                setValue(prev=>{
                                    return{
                                        ...prev,otp:value
                                    }
                                })
                            }}>
                            <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                        </InputOTP>
                    </div>
                </div>
                <DialogFooter className="sm:justify-start">
                        <Button disabled={value?.otp?.length!=6&&loading?true:false} type="submit" className="" onClick={()=>{
                            handleSubmit()
                        }}>Submit OTP</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

