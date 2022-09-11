+++
title = "SurrealDB : un nouveau type de base de données"
date = 2022-09-11
description = "Un mélange entre SQL, Graph et Documents, avec un déploiement facilité."

[extra]
featured = "surrealdb.svg"
imageType = "logo"
+++

**Parmi mes récentes découvertes figure SurrealDB, que j'ai aperçu en scrollant mon fil Reddit (d'ailleurs si vous n'avez pas Reddit, sachez que c'est un super outil de veille !). C'est un projet qui me paraît assez innovant dans le domaine des bases de données, un domaine qui n'évolue pas beaucoup dans le sens où la plupart des applications tournent toujours avec des bases de données SQL. Ce n'est pas que le SQL n'est pas bon, c'est juste que parfois, pour bénéficier de son système de relations, il impose de devoir créer des modèles très complexes sans forcément de grande justification. De plus, ces modèles complexes sont souvent aussi moins performants.**

## Quel est son intérêt ?

SurrealDB est une alliance entre les tables, les graphes et les documents. Pour simplifier, on pourrait dire qu'il est **un combo de MySQL, Neo4J et MongoDB**. Cela vous permet notamment de pouvoir utiliser vos bases de données à la volée mais aussi de manière structurée. Tout ceci en évitant des _queries_ complexes avec des `JOIN` partout. En plus, SurrealDB vous permet de bénéficier de vos connaissances en SQL car son _query language_ est basé sur le SQL.

<pre>
  <code class="language-sql">
    -- Create a 'user' record
    CREATE user SET
      age = &lt;int&gt; 34,
      enabled = true,
      -- Store the current time
      created_at = time::now(),
      -- Specify embedded fields
      name.first = &quot;Tobie&quot;,
      name.last = &quot;Morgan Hitchcock&quot;,
      -- Add a field which is computed from other fields
      name.full = &lt;string&gt; string::join(' ', name.first, name.last),
      -- Add an array whose values point to other remote records
      friends = [user:gna732gnajan74hj, user:gna732gnajan74hj],
    ;
  </code>
</pre>

<p class="caption">Un exemple concret issu du site de SurrealDB</p>

L'un de ses autres avantages est de combiner la base de données telle qu'on la connaît, mais aussi une couche API pour interagir avec la BDD, ainsi qu'une couche de sécurité / permissions pour gérer les accès. Ce qui impliquerait qu'il n'y ait plus besoin de créer une API pour interagir avec SurrealDB. Ce qui contraste complètement avec les autres types de bases de données ! Les couches base de données et API sont gérées par un schéma que vous spécifierez en amont. Ce qui a pour autre avantage de vous permettre de requêter directement votre base de données depuis vos différents frontends.

Vous n'avez pas envie d'apprendre le langage de Surreal pour interagir avec votre base de données ? Vous pouvez directement utiliser l'API embarquée REST pour faire vos opérations CRUD habituelles. En outre, les WebSockets sont supportés et GraphQL sera bientôt supporté également !

En termes de déploiement, la solution est simple à installer et peut s'utiliser de manière très basique (en mémoire sur votre machine) ou plus complexe (distribué sur plusieurs clusters).

Enfin, Surreal a été développé avec Rust, ce qui en fait un outil très performant et très sûr.

## Qu'est-ce qui peut m'empêcher de l'adopter ?

Bien sûr, il y a forcément un contrepoids à tous ces avantages. Déjà, bien que le projet embarque déjà beaucoup de fonctionnalités, il ne faut pas oublier qu'il reste moins mature que d'autres solutions de bases de données aujourd'hui en production dans de nombreuses applications. Il faudra donc privilégier son utilisation dans des projets d'essai ou qui n'impliquent pas d'être infaillibles.

En outre, au moment où j'écris cet article, son intégration dans les différents langages ou frameworks est encore assez faible. Côté server-side on compte Node.js, Golang, Rust et Deno. Côté client-side, WebAssembly, JavaScript et Ember.js. Vous devrez donc un peu batailler si vous voulez intégrer SurrealDB à votre projet, mais apporter votre contribution permettra de faire évoluer l'outil pour vous permettre de l'adopter définitivement un jour.

Le dernier frein, et pas des moindres, réside dans le fait qu'il faut apprendre un tout nouveau écosystème (encore une fois), vous l'approprier, et ça, eh bien... ça demande du temps !

## Mon avis

Je suis ravi de voir que le domaine des bases de données bouge. C'était déjà le cas il y a plusieurs années avec l'arrivée de MongoDB, ou encore plus récemment avec les bases de données de type graphe. Néanmoins, aucune de ces bases de données n'ont réellement su remplacer notre bon vieux SQL.

C'est là où SurrealDB attire l'attention ; le fait qu'il puisse réunir ces trois concepts de bases de données en un seul est alléchant. Il surfe sur la popularité de SQL en proposant un _query language_ proche de celui-ci. Il permet de structurer ou non les données, ce qui permet de se lancer dans un projet sans forcément avoir anticipé toutes ses contraintes (courant de nos jours).

Je n'ai pas testé SurrealDB sur un vrai projet, mais j'ai pu l'installer et le tester dans le terminal, interagir avec via Insomnia, et [j'ai réussi à l'intégrer au framework Rust Rocket](https://github.com/CPoncet/rocket-surrealdb-example).

## Vous voulez essayer ?

Rendez-vous sur [le site de SurrealDB](https://surrealdb.com/) où vous trouverez un quick start plutôt intuitif :-)
