import { api } from "@/lib/axios";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import {useState, useEffect} from "react"

interface IPrompts {
    id:string;
    title:string;
    template:string;
}

interface PompotSelectProps {
    onPromptSelected: (template:string) => void
}

export function PromptSelect(props:PompotSelectProps){

    const [prompts, setPrompts] = useState<IPrompts[] | null>(null)

    useEffect(() => {
        api.get("/prompts").then(response => {
            setPrompts(response.data)
        })
    }, [])

    function handlePromptSelected(promptId:string){
        const selectedPrompt = prompts?.find(prompt => prompt.id === promptId)

        if(!selectedPrompt) return  
        
        return props.onPromptSelected(selectedPrompt.template)
    }

    return(
        <Select onValueChange={handlePromptSelected}>
            <SelectTrigger>
            <SelectValue placeholder="Selecione um prompt"/>
            </SelectTrigger>
            <SelectContent>
            {
                prompts?.map((content) => (
                    <SelectItem key={content.id} value={content.id}>
                        {content.title}
                    </SelectItem>
                ))
            }
            </SelectContent>
        </Select>
    )
}