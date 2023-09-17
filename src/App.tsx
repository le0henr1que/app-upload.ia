import { Separator } from "@radix-ui/react-separator";
import { Button } from "./components/ui/button";
import { Github, FileVideo, Upload, Wand2 } from "lucide-react";
import { Textarea } from "./components/ui/textarea";
import { Label } from "./components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select";
import { Slider } from "./components/ui/slider";
import { VideoInputForm } from "./components/video-input-form";
import { PromptSelect } from "./components/prompt-select";
import {useState} from "react"
import { useCompletion } from "ai/react"

export function App() {
  const [temperature, setTemperature] = useState<number>(0.5)
  const [videoId, setVideoId] = useState<string | null>(null)

 

  const {
    input, 
    setInput, 
    handleInputChange, 
    handleSubmit, 
    completion, 
    isLoading
  } = useCompletion({
    api:'http://localhost:3333/ai/complete', 
    body:{
      videoId, 
      temperature, 

    }, 
    headers:{
      'Content-type':'application/json',
    }
  })

  return (
    <div className="min-h-screen flex flex-col">
      <div className="px-6 py-3 flex items-center justify-between border-b">

        <h1 className="text-xl font-bold">upload.ai</h1>

        <div className="gap-5 flex row items-center">
          <span className="text-sm text-muted-foreground">
            Desenvolvido com ❤️ no nlw da Rocketseat
          </span>
          
          <Separator orientation="vertical" className="h-6"/>

          <Button variant="outline">
            <Github className="mr-2"/>
            Github 
          </Button>

        </div>
      </div>

      <main className="flex-1 p-6 flex gap-6">
        <div className="flex flex-col flex-1 gap-4">
          <div className="grid grid-rows-2 gap-4 flex-1">
            <Textarea 
              placeholder="Inclua o prompt para ia"
              className="resize-none p-4 leading-relaxed"
              value={input}
              onChange={handleInputChange}
            />
            <Textarea 
              placeholder="Resultado gerado pela ia..." 
              readOnly
              className="resize-none p-4 leading-relaxed"
              value={completion}
            />
          </div>
          <p className="text-small text-muted-foreground">Lembre-se: Voce pode utilizar a variavel no seu prompt...</p>
        </div>
        <aside className="w-96 space-y-6">

          <VideoInputForm onVideoUploaded={setVideoId}/>
          
          <Separator/>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-6">
                <Label>Prompt</Label>
                <PromptSelect onPromptSelected={setInput}/>
              </div>
              <Separator/>
              <div className="space-y-6">
                <Label>Modelo</Label>
                <Select disabled defaultValue="gpt3.5">
                  <SelectTrigger>
                    <SelectValue/>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gpt3.5">GPT 3.5-turbo 16k</SelectItem>
                  </SelectContent>
                </Select>
                <span className="block text-xs text-muted-foreground italic">Voce podera customizar essa opcao em breve</span>
              </div>
              <Separator/>
              <div className="space-y-6">
                <Label>Temperatura</Label>
                <Slider
                  min={0}
                  max={1}
                  step={0.1}
                  value={[temperature]}
                  onValueChange={value => setTemperature(value[0])}
                />
                <span className="block text-xs text-muted-foreground italic leading-relaxed">Valores mais altos tendem a deixar o resultado mais criativos e com possiveis erro</span>
              </div>
              <Separator/>
              <Button disabled={isLoading} type="submit" className="w-full">
                Executar
                <Wand2 className="w-4 h-4 ml-2"/>
              </Button>
          </form>
        </aside>
      </main>
    </div>
  )
}


