import { Separator } from "@radix-ui/react-separator";
import { Button } from "./components/ui/button";
import { Github, FileVideo, Upload, Wand2 } from "lucide-react";
import { Textarea } from "./components/ui/textarea";
import { Label } from "./components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select";
import { Slider } from "./components/ui/slider";

export function App() {
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
            />
            <Textarea 
              placeholder="Resultado gerado pela ia..." 
              readOnly
              className="resize-none p-4 leading-relaxed"
            />
          </div>
          <p className="text-small text-muted-foreground">Lembre-se: Voce pode utilizar a variavel no seu prompt...</p>
        </div>
        <aside className="w-96 space-y-6">
          <form className="space-y-6">
            <label 
              htmlFor="video"
              className="border flex rounded-md aspect-video cursor-pointer border-dashed text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-primary/5"
            >
              <FileVideo className="w-4 h-4"/>
              Selecione um video 
            </label>
            <input type="file" id="video" accept="video/mp4" className="sr-only"/>
            <Separator/>
            <div className="space-y-1 flex flex-col gap-2">
              <Label htmlFor="transcription_prompt">Prompt de transcricao</Label>
              <Textarea 
                id="transcription_prompt" 
                className="min-h-20 leading-relaxed "
                placeholder="inclua palavras chaves mencionada no video separadas por virgula"
              />

              <Button type="submit" className="w-full ">
                Carregar video
                <Upload/>
              </Button>
            </div>
          </form>

          <Separator/>

          <form className="space-y-6">
            <div className="space-y-6">
                <Label>Prompt</Label>
                <Select >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um prompt"/>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="title">Titulo do youtube</SelectItem>
                    <SelectItem value="description">Descricao do youtube</SelectItem>
                  </SelectContent>
                </Select>
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
                />
                <span className="block text-xs text-muted-foreground italic leading-relaxed">Valores mais altos tendem a deixar o resultado mais criativos e com possiveis erro</span>
              </div>
              <Separator/>
              <Button type="submit" className="w-full">
                Executar
                <Wand2 className="w-4 h-4 ml-2"/>
              </Button>
          </form>
        </aside>
      </main>
    </div>
  )
}


