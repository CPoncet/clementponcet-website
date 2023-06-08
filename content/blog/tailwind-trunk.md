+++
title = "Ajouter Tailwind à Trunk sur un framework frontend Rust"
date = 2023-06-08
description = "Un workflow de développement CSS confortable pour frameworks frontend Rust avec la puissance de Tailwind."

[extra]
featured = "tailwindcss.svg"
imageType = "logo"
+++

**Si comme moi vous êtes en pleine expérimentation de Rust côté frontend, via l'utilisation de frameworks tels que Leptos, Dioxus ou Yew, vous avez peut-être ressenti le besoin d'intégrer TailwindCSS, non sans difficulté. Je vous montre comment configurer tout ça.**

## TailwindCSS oui, sans Node.js c'est mieux

Ici je choisis d'utiliser le [CLI standalone de TailwindCSS](https://tailwindcss.com/blog/standalone-cli). Libre à vous d'utiliser le process traditionnel pour installer TailwindCSS. Je n'ai pas envie d'utiliser NPM dans mon projet.

N'oubliez pas d'ajouter le CLI à votre variable d'environnement PATH, sans quoi vous ne pourrez pas l'exécuter partout dans votre terminal.

Ensuite, on utilise la commande suivante pour initialiser un fichier `tailwind.config.js` à la racine de notre projet. Pour les allergiques aux fichiers `.js`, désolé, il n'y pas mieux pour l'instant.

<pre>
  <code class="language-sh">
    tailwind init
  </code>
</pre>

Modifiez ce fichier `tailwind.config.js` comme ci-dessous :

<pre>
  <code class="language-js">
    /** @type {import('tailwindcss').Config} */
    module.exports = {
      content: ['./src/**/*.rs'],
      theme: {
        extend: {},
      },
      plugins: [require('@tailwindcss/typography')],
    };
  </code>
</pre>

Ces lignes vont vous permettre de customiser votre Tailwind, ci-dessus je demande à ce qu'il scanne les fichiers `.rs` pour qu'il puisse utiliser les classes déclarées dans ces fichiers. Ne pas hésiter à adapter en fonction des fichiers de votre projet.
J'ai aussi glissé le plugin `@tailwindcss/typography` pour avoir des tailles de titre par défaut. La doc de ce plugin [ici](https://tailwindcss.com/docs/typography-plugin).

Ensuite, je crée à la racine de mon projet un fichier `tailwind.css` dans lequel j'insère :

<pre>
  <code class="language-css">
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
  </code>
</pre>

Ce fichier va nous servir à alimenter un fichier de sortie qui contiendra toutes les classes Tailwind qu'on utilise dans notre projet.

## Configurer Trunk pour inclure Tailwind dans son build

Lorsque Trunk démarre votre frontend via la commande `trunk serve`, il s'occupe de construire un bundle à l'image d'un Webpack ou Vite en JS. On peut tout à fait configurer ce qu'il fait lors du build, notamment pour y inclure le build d'un autre tool tel que Tailwind.

A la racine du projet, créer un fichier `Trunk.toml` et y insérer :

<pre>
  <code class="language-sh">
    [[hooks]]
    stage = "build"
    command = "sh"
    command_arguments = ["-c", "tailwindcss -i tailwind.css -o styles/main.css"]
  </code>
</pre>

Ici on stipule à Trunk qu'on souhaite ajouter une action à l'étape du `build`. Cette étape est une commande shell qui lance le build de Tailwind. Le côté intéressant c'est que cette commande sera lancée à chaque fois qu'il y a une modification dans les fichiers du projet.

Ensuite il n'y a plus qu'à ajouter le fichier CSS mouliné par Tailwind dans le fichier index.html à la racine du projet :

<pre>
  <code class="language-html">
    &lt;link data-trunk rel="css" href="styles/main.css"&gt;
  </code>
</pre>

And voilà, on a un build fonctionnel de Trunk & Tailwind, qui se met à jour à chaque modification de fichier. On peut donc bosser tranquillement sur notre frontend sans se prendre la tête, et la prochaine fois que l'on revient dans le projet, il n'y a qu'une commande à lancer, plutôt que deux, dans le terminal. Not bad !
