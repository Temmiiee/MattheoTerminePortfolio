import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@/lib/projects";
import { Badge } from "@/components/ui/badge";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col group">
      <div className="aspect-video overflow-hidden">
        <Image
          src={project.imageUrl}
          alt={`Image du projet ${project.title}`}
          width={600}
          height={400}
          data-ai-hint={project.dataAiHint}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">
          {project.title}
        </CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col flex-grow">
        <div className="mb-4">
            <h4 className="font-semibold text-sm mb-2">Technologies</h4>
             <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Badge key={tech.name} variant="secondary" className="flex items-center gap-1.5 py-1 px-2">
                   <tech.icon className="h-4 w-4" />
                  <span>{tech.name}</span>
                </Badge>
              ))}
            </div>
        </div>
        <p className="text-muted-foreground text-sm mb-4 flex-grow">{project.longDescription}</p>
        <div className="flex gap-2 mt-auto">
            {project.liveLink && (
            <Button asChild variant="outline" size="sm">
                <Link href={project.liveLink} target="_blank">
                <ExternalLink className="mr-2 h-4 w-4" /> Voir le site
                </Link>
            </Button>
            )}
            {project.repoLink && (
            <Button asChild variant="outline" size="sm">
                <Link href={project.repoLink} target="_blank">
                <Github className="mr-2 h-4 w-4" /> Code source
                </Link>
            </Button>
            )}
        </div>
      </CardContent>
    </Card>
  );
}
