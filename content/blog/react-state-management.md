+++
title = "Les gestionnaires d'état dans React"
date = 2022-09-21
description = "Redux, Context, MobX, Zustand, Recoil, je choisis quoi ?!"

[extra]
featured = "react.jpg"
imageType = ""
+++

**Si vous avez même ne serait-ce qu'une petite expérience en React, vous avez forcément déjà entendu parler de Redux. Vu que tout le monde en parle et qu'il est même souvent noté en pré-requis sur les offres d'emploi, on se sent souvent un peu à la ramasse quand on ne sait pas s'en servir. Pourtant il a beaucoup de concurrents aujourd'hui qui sont tout aussi légitimes. Alors, on se fait un petit comparatif des gestionnaires d'état ? En fin d'article, on verra si Redux est si essentiel que ça !**

## Qu'est-ce qu'un "gestionnaire d'état" ou "state manager" ?

Pour bien comprendre ce qu'est un gestionnaire d'état, il faut déjà comprendre ce qu'est un état, ou _state_ en React. Le _state_ est simplement la méthode utilisée par React pour gérer vos structures de données, ou si vous préférez, vos variables. Le problème, c'est que de base, votre _state_ React est _scoped_ (délimité) dans les composants, et ne peut pas en sortir. Il y a quand même un moyen de le passer à d'autres composants, en utilisant le concept de _props_. Mais du coup, on se retrouve des fois avec un _state_ tout au début de notre arborescence de composants (exemple dans notre App.js), avec le besoin de faire passer ce fameux _state_ plus bas dans notre arborescence. Pour faire ça, deux options :

- Passer le _state_ en _props_ de chaque composant, un par un, jusqu'à arriver au bon. _Oui, ça a l'air répétif et fatigant._
- Utiliser un gestionnaire d'état pour appeler notre _state_ directement dans le composant souhaité.

L'intérêt d'un gestionnaire d'état est donc de pouvoir déclarer, modifier et accéder à un _state_ depuis n'importe quel composant de notre application.

## Les "anciens"

Dans le domaine du _state management_, il y a deux anciens : Redux et MobX. Les deux répondent à la même problématique : proposer des structures de données flexibles, et accessibles à tout instant dans une application, pas forcément qu'en JS d'ailleurs. Les deux se différencient essentiellement sur leur utilisation. Certains aiment MobX, d'autres aiment Redux. A quel moment Redux a-t-il pris l'ascendant ? Sans doute parce que l'un de ses créateurs, Dan Abramov, était aussi à l'origine de Facebook et... React. Il paraissait donc logique de se lancer dans Redux quand on venait tout juste de se lancer dans React. Du moins, c'était le cas il y a plusieurs années.

Le fonctionnement de ces "anciens" se base sur un système d'actions, qui déclenchent des _reducers_, et ces actions peuvent être déclenchées depuis n'importe quel endroit de notre application. De nouveaux concepts, qui étaient un peu indigestes au premier abord, surtout après avoir passé du temps à comprendre React. C'est pour cette raison que les "nouveaux" ont tenté d'apporter un peu de simplicité là-dedans !

## Les "nouveaux"

On peut considérer que le premier "nouveau" dans le domaine du _state management_ venait de... React lui-même. Précisément de la grosse update 16.3.0 qui date de 2018. Ce dernier ne nécessitait pas d'installer autre chose que la dernière version de React. On peut donc en bénéficier sur de nouveaux projets, et la plupart du temps, ça fait le job ! Pas besoin de se compliquer l'existence avec des actions ou _reducers_, ce qui en fait un outil idéal pour des _global states_ très simples. Le souci du contexte, c'est qu'il ne peut stocker qu'une valeur seule, et pas gérer un jeu de données complexes. Donc dans des applications plus compliquées, on oublie React Context...

J'en ai testé deux autres, qui sont Recoil et Zustand :

### Recoil

Côté Recoil, on a quelque chose de très simple, qui s'intègre plutôt bien à React. Recoil introduit la notion d'_atom_, qui est une sorte de variable, mais que l'on va pouvoir faire évoluer tout au long de notre application. On peut comparer ces _atoms_ à des sortes de "variables globales à l'application" (en espérant que ce soit parlant). L'autre intérêt, c'est de pouvoir manipuler ces _atoms_ avec du code synchrone comme asynchrone. Enfin, Recoil se base sur la fonctionnalité de Hook React, qui, il faut le dire, est bien agréable à utiliser.

<pre>
  <code class="language-js">
  // Vous déclarez votre atom dans un fichier séparé
    const textState = atom({
      key: 'textState',
      default: '',
    });

    function CharacterCounter() {
      return (
        &lt;div>
          &lt;TextInput />
          &lt;CharacterCount />
        &lt;/div>
      );
    }

  // Vous l'appelez dans un composant, l'affichez et le faites évoluer comme vous voulez
  function TextInput() {
    const [text, setText] = useRecoilState(textState);

    const onChange = (event) => {
      setText(event.target.value);
    };

    return (
      &lt;div>
        &lt;input type="text" value={text} onChange={onChange} />
        &lt;br /> {/* Pas beau */}
        Echo: {text}
      &lt;/div>
    );
  }
  </code>
</pre>

<p class="caption">Un exemple d'utilisation basique de Recoil, d'après un exemple extrait de leur site</p>

### Zustand

Zustand, quant à lui, est beaucoup plus direct dans son approche. Il ne vous abreuve pas de nouveau concept ou appellation (ici pas de _reducer_, _atom_ et autre _context_). Ici, il faut juste comprendre qu'on déclare nos données & méthodes pour modifier ces données au même endroit, puis on peut faire appel à ces différentes propriétés directement depuis nos composants grâce à un hook dédié.

<pre>
  <code class="language-js">
  // Vous déclarez votre store dans un fichier séparé, où vous précisez directement vos variables et vos fonctions
    const useBearStore = create((set) => ({
      bears: 0,
      increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
      removeAllBears: () => set({ bears: 0 }),
    }))

    // Pour l'afficher dans un composant, c'est simple comme deux lignes...
    function BearCounter() {
      const bears = useBearStore((state) => state.bears)
      return <h1>{bears} around here ...</h1>
    }

    // Vous pouvez aussi déclencher une fonction en aussi peu de lignes
    function Controls() {
      const increasePopulation = useBearStore((state) => state.increasePopulation)
      return <button onClick={increasePopulation}>one up</button>
    }
  </code>
</pre>

<p class="caption">Un exemple d'utilisation basique de Zustand, d'après un exemple extrait de leur repository GitHub</p>

## Alors, et Redux dans tout ça ? Je n'ai plus besoin de l'apprendre ?

Je ne vais pas répondre directement à cette question car c'est avant tout à vous de prendre la décision, comme quand vous avez choisi de prendre React, ou un autre, comme framework principal. Ce qui est sûr, c'est que Redux est encore bien implanté, d'autant qu'il s'est adapté à la concurrence et propose aujourd'hui une version beaucoup plus simple qu'auparavant, grâce au fameux _@reduxjs/toolkit_. D'ailleurs, je trouve que Redux toolkit ressemble étrangement à Zustand au niveau du fonctionnement, même si Redux embarque encore beaucoup de code superflu à mon goût. Ce qui fait de Redux encore un incontournable, c'est surtout que vos collègues séniors le connaissent mieux car il y a fort à parier que c'est avec cette librairie qu'ils ont commencé le _state management_. Mais ça ne veut pas dire que vous ne pouvez pas en utiliser un autre. Testez tous ces gestionnaires d'état dans des projets perso, puis voyez celui que vous préférez. Pour ma part, je peux travailler sur Redux, mais je préfère travailler avec Zustand, et sur des projets complexes, Zustand est tout à fait capable de rivaliser !
