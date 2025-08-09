import { notFound } from "next/navigation";
import { projects } from "@/lib/projects";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

type ProjectPageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    return {
      title: "Projet non trouvé",
    };
  }

  return {
    title: project.title,
    description: project.longDescription,
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
       <div className="mb-8">
        <Button asChild variant="outline">
          <Link href="/#projets">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux projets
          </Link>
        </Button>
      </div>
      <div className="bg-card rounded-lg shadow-lg overflow-hidden">
        <div className="aspect-video relative">
            <Image
            src={project.imageUrl}
            alt={`Image du projet ${project.title}`}
            fill
            className="object-cover"
            data-ai-hint={project.dataAiHint}
            priority
            />
        </div>
        <div className="p-6 md:p-8">
            <h1 className="font-headline text-3xl md:text-4xl font-bold text-primary mb-2">{project.title}</h1>
            <p className="text-muted-foreground text-lg mb-6">{project.description}</p>
            
            <div className="mb-6">
                <h2 className="font-headline text-xl font-semibold mb-3">À propos de ce projet</h2>
                <p className="text-foreground/90 whitespace-pre-line">{project.longDescription}</p>
            </div>

            <div className="mb-6">
                <h2 className="font-headline text-xl font-semibold mb-3">Technologies utilisées</h2>
                <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                    <Badge key={tech.name} variant="secondary" className="flex items-center gap-1.5 py-1 px-2 text-sm">
                        <tech.icon className="h-4 w-4" />
                        <span>{tech.name}</span>
                    </Badge>
                    ))}
                </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4 border-t">
                {project.liveLink && (
                    <Button asChild>
                        <Link href={project.liveLink} target="_blank">
                        <ExternalLink className="mr-2 h-4 w-4" /> Voir le site en direct
                        </Link>
                    </Button>
                )}
                {project.repoLink && (
                    <Button asChild variant="secondary">
                        <Link href={project.repoLink} target="_blank">
                        <Github className="mr-2 h-4 w-4" /> Voir le code source
                        </Link>
                    </Button>
                )}
            </div>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
    return projects.map((project) => ({
      slug: project.slug,
    }));
}
