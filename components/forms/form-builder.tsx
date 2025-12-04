'use client'
import React, { FormEvent, useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'sonner'
import { Flag } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function FormBuilder() {
  const router  = useRouter();
const [isSubmiting,setIsSubmiting] = useState(false)
    const [form,setForm] = useState({

        title:"",
        description:"",
        questions:[{

            id:"1",
            text:"",
        },]
    })

    const addQuestion =()=>{

      setForm((prev)=>({

        ...prev, questions:[...prev.questions,{id:uuidv4(),text:""}]
      }))

    }

    const removeQuestion = (index:number)=>{

      if(form.questions.length >1){
        setForm(prev => ({
          ...prev, questions:prev.questions.filter((_,i)=>i!==index)
        }))
      }else{
        toast.error(" Form must have at least one question")
      }

    }
    const handelQuestionChange = (index:number , value:string)=>{
      const updateQuestion= [...form.questions];
      updateQuestion[index].text=value;
      setForm({...form,questions:updateQuestion});

    }

    const handelSubmit = async( e:FormEvent) =>{

      e.preventDefault();

      //validate form 
      if(!form.title.trim()){

        toast.error("Title is required")
        return
      }

      const emptyQuestion = form.questions.some((q)=>!q.text.trim());
      if(emptyQuestion){
           toast.error("All questions must have text");
           return
      }

      try{
        setIsSubmiting(true)

        // delay 
        await new Promise((resolve)=> setTimeout(resolve,2000));

        
      }catch{

      }finally{
        setIsSubmiting(false)
      }

    }
  return (
    <form  onSubmit={handelSubmit} className="space-y-8">
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Enter from title"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="description">Description(Optional)</Label>
          <Textarea
            id="title"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Enter from description"
            className="mt-1"
          />
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Questions</h3>

          <Button variant="outline" type="button" onClick={addQuestion}>
            {" "}
            Add Questoin
          </Button>
        </div>

        {form.questions.map((question, index) => (
          <div key={question.id} className="space-y-2 p-4 border rounded-md ">
            <div className="flex items-center justify-between">
              <Label htmlFor={`Question-${index}`}> Question {index + 1}</Label>

              <Button
                variant="ghost"
                size="sm"
                type="button"
                className="text-red-500 hover:text-red-700"
                onClick={()=> removeQuestion(index)}
              >
                {" "}
                remove
              </Button>
            </div>
            <Textarea id={`Question-${index}`} value={question.text} onChange={(e)=>{handelQuestionChange(index, e.target.value);}} placeholder='Enter your question ' className='mt-1'/>
          </div>
        ))}
      </div>

      <div className='flex justify-end gao-2'>

        <Button type='button' variant="outline" onClick={()=>router.back()} disabled={isSubmiting}> Cancel </Button>

        <Button type='submit'disabled={isSubmiting}>{isSubmiting ? "Saving...":"Create Form"}</Button>
      </div>
    </form>
  );
}
