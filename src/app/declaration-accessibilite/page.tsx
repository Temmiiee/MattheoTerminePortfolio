import { type Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Déclaration d\'accessibilité',
    description: 'Déclaration d\'accessibilité du portfolio de Matthéo, intégrateur web freelance.',
    robots: {
        index: false,
        follow: true,
    },
};

export default function AccessibilityDeclaration() {
    return (
        <article className="prose prose-lg mx-auto max-w-4xl py-12">
            <h1>Déclaration d’accessibilité</h1>
            <p>
                Matthéo s’engage à rendre son site internet accessible conformément au référentiel général d’amélioration de l’accessibilité (RGAA).
            </p>
            <p>
                La présente déclaration d’accessibilité s’applique au site portfolio de Matthéo.
            </p>

            <h2>État de conformité</h2>
            <p>
                Ce site est en conformité totale avec le référentiel général d’amélioration de l’accessibilité (RGAA), version 4.1.
            </p>
            
            <p>
              Les tests ont été effectués avec les combinaisons de navigateurs et lecteurs d'écran suivantes :
            </p>
            <ul>
                <li>Firefox et NVDA</li>
                <li>Chrome et JAWS</li>
                <li>Safari et VoiceOver</li>
            </ul>

            <h2>Contenus non accessibles</h2>
            <p>
                L'ensemble des contenus du site sont accessibles.
            </p>

            <h2>Établissement de cette déclaration d’accessibilité</h2>
            <p>
                Cette déclaration a été établie le 10 août 2024.
            </p>

            <h2>Retour d’information et contact</h2>
            <p>
                Si vous n’arrivez pas à accéder à un contenu ou à un service, vous pouvez contacter le responsable du site pour être orienté vers une alternative accessible ou obtenir le contenu sous une autre forme.
            </p>
            <p>
                Utilisez le <Link href="/#contact">formulaire de contact</Link> pour nous le signaler.
            </p>

            <h2>Voies de recours</h2>
            <p>
                Cette procédure est à utiliser dans le cas suivant.
            </p>
            <p>
                Vous avez signalé au responsable du site internet un défaut d’accessibilité qui vous empêche d’accéder à un contenu ou à un des services du portail et vous n’avez pas obtenu de réponse satisfaisante.
            </p>
            <ul>
                <li>Écrire un message au <a href="https://formulaire.defenseurdesdroits.fr/" target="_blank" rel="noopener noreferrer">Défenseur des droits</a></li>
                <li>Contacter le délégué du <a href="https://www.defenseurdesdroits.fr/saisir/delegues" target="_blank" rel="noopener noreferrer">Défenseur des droits dans votre région</a></li>
                <li>Envoyer un courrier par la poste (gratuit, ne pas mettre de timbre) :<br />
                    Défenseur des droits<br />
                    Libre réponse 71120<br />
                    75342 Paris CEDEX 07
                </li>
            </ul>
        </article>
    );
}
