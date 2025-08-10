import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import type { Project } from "@/lib/projects";
import { Badge } from "@/components/ui/badge";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="h-full overflow-hidden transition-all duration-300 group relative flex flex-col min-h-[450px] justify-end p-6 text-white">
      <div className="absolute inset-0 z-0">
         <Image
          src={project.imageUrl}
          alt={`Image du projet ${project.title}`}
          fill
          data-ai-hint={project.dataAiHint}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
      </div>
     
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech) => (
            <Badge key={tech.name} variant="secondary" className="bg-white/20 text-white border-0 backdrop-blur-sm">
                <tech.icon className="h-4 w-4 mr-1.5" />
                <span>{tech.name}</span>
            </Badge>
            ))}
        </div>

        <div className="flex-grow">
            <h3 className="font-headline text-3xl font-bold">{project.title}</h3>
            <p className="mt-2 text-white/80">{project.description}</p>
        </div>

        <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
             <div className="flex gap-2">
                {project.liveLink && (
                    <Button asChild variant="outline" size="sm" className="bg-transparent border-white text-white hover:bg-white hover:text-black">
                        <Link href={project.liveLink} target="_blank">
                            <ExternalLink className="mr-2 h-4 w-4" /> Voir le site
                        </Link>
                    </Button>
                )}
                {project.repoLink && (
                    <Button asChild variant="outline" size="sm" className="bg-transparent border-white text-white hover:bg-white hover:text-black">
                        <Link href={project.repoLink} target="_blank">
                            <Github className="mr-2 h-4 w-4" /> Code source
                        </Link>
                    </Button>
                )}
            </div>
            <p className="text-white/70 text-sm mt-4">{project.longDescription}</p>
        </div>
      </div>
    </Card>
  );
}
