import { AuthContext } from "@/app/Context/Authcontext"
import { createPost } from "@/app/Services/Post"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader } from "@mantine/core"
import { useContext, useState } from "react"
const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    caption: "",
    tags: []
  })
  const [loading, setLoading] = useState(false)

  const {AuthState} = useContext(AuthContext)

  async function handleSubmit() {
    try {
      setLoading(true)
       let formFields = new FormData();
      for (let key in formData) {
        formFields.append(key, formData[key])
      }
      const status = await createPost(formFields,AuthState)
      if(status==200){
        console.log("Created");
        
      }

    } catch (error) {
      console.log(error);
    }finally{
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
      <div className='bg-black'>
        <div className="flex items-center justify-center h-dvh">
          <div className="bg-muted-foreground border-2 border-gray-500 
      rounded-md grid w-full max-w-sm items-center gap-3 my-auto  p-8">
            <Label htmlFor="title">Title</Label>
            <Input className="border-2 border-gray-300" type="text" id="title" onChange={(e) => {
              setFormData(prev => {
                return { ...prev, title: e.target.value }
              })
            }} />
            <Label htmlFor="caption">Caption</Label>
            <Input className="border-2 border-gray-300" type="text" id="caption" onChange={(e) => {
              setFormData(prev => {
                return { ...prev, caption: e.target.value }
              })
            }} />
            <Label htmlFor="tags">Tags</Label>
            <Input className="border-2 border-gray-300 placeholder:text-black-foreground" type="text" id="tags" placeholder="Type comma separated" onChange={(e) => {
              setFormData(prev => {
                return { ...prev, tags: e.target.value.split(",") }
              })
            }} />
            <Label htmlFor="image">Image</Label>
            <Input className="border-2 border-gray-300" id="image" type="file" onChange={(e) => {
              setFormData(prev => {
                return { ...prev, image: e.target.files[0] }
              })
            }} />
            <Button disabled={loading} onClick={() => {
              handleSubmit()
            }}>Create Post!</Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreatePost