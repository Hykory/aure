# Notre jardin secret

Une expérience romantique interactive et responsive conçue avec Next.js, React, TypeScript, Tailwind CSS, Framer Motion et Lucide React.

## Lancer le site

```bash
pnpm install
pnpm dev
```

Le site est ensuite disponible à l’adresse indiquée dans le terminal. Pour vérifier la version de production :

```bash
pnpm build
```

## Personnaliser le contenu

Tout le contenu important se trouve dans `app/data/siteConfig.ts` :

- `recipientName` et `senderName` : les deux prénoms ;
- `passcode` : le code secret à quatre chiffres (actuellement `0000`) ;
- `relationshipStartDate` : la date ISO utilisée par le compteur (actuellement le 19 janvier 2026 à 2 h 47) ;
- `heroTitle`, `heroMessage` et `eyebrow` : les textes d’accueil ;
- `loveLetter` : la date, le titre, les paragraphes et la signature ;
- `playlists` : les titres, descriptions, couleurs et liens Spotify ;
- `timerMessage` : le message sous le compteur.

## Remplacer la photo du puzzle

1. Créez le dossier `public/images` s’il n’existe pas.
2. Ajoutez une image carrée nommée `puzzle.jpg` (idéalement 1200 × 1200 px, compressée).
3. Dans `app/data/siteConfig.ts`, vérifiez que `puzzleImage` indique `"/images/puzzle.jpg"`.
4. Modifiez aussi `puzzleImageAlt` pour décrire la photo.

La photo actuelle a été recadrée au format carré afin que les seize tuiles restent régulières.

## Réinitialiser la progression

Le site mémorise localement le déverrouillage, la réussite du puzzle et la préférence de mouvement. Le bouton « Reverrouiller » redemande le code sans supprimer la réussite du puzzle. Pour une remise à zéro complète, effacez les données locales du site dans le navigateur.

## Déploiement

Le projet est prêt pour Sites et produit une sortie compatible Cloudflare/Vercel. Les données restent dans le navigateur : aucune base de données n’est nécessaire.

### Mettre le site en ligne avec Railway

Le dépôt contient déjà `Dockerfile`, `.dockerignore` et `railway.toml`. Railway utilisera automatiquement le port public qu’il fournit et vérifiera la page d’accueil avant d’activer une nouvelle version.

1. Placez ce projet dans un dépôt GitHub.
2. Dans Railway, choisissez **New Project**, puis **Deploy from GitHub repo**.
3. Sélectionnez le dépôt et attendez que le déploiement affiche **Active**.
4. Dans le service, ouvrez **Settings → Networking**, puis choisissez **Generate Domain**.
5. Ouvrez l’adresse `https://…up.railway.app` obtenue pour vérifier le site.

Après chaque modification envoyée sur la branche liée, Railway reconstruira et republiera automatiquement le site. Une fois l’adresse publique créée, elle peut être transformée en code QR.
