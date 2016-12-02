Help John
===================

## Qu'est ce que c'est ?

Des dizaines de millions de personnes fuient actuellement les conflits ou les persécutions dans le monde entier, se retrouvant ainsi loin de leur foyer. 

Les camps de réfugiés dans lesquels ils se retrouvent manquent cruellement de ressources.

HelpJohn facilite la répartition des dons entre les différents camps en fonction de leurs besoins.

HelpJohn est disponible sur le web à l'adresse https://helpjohn.xyz et sous forme d'application desktop (téléchargeable depuis le site)


[<img src="http://i.imgur.com/FrbueZp.jpg" />](http://i.imgur.com/FrbueZp.jpg)
[<img src="http://i.imgur.com/cjlxrf3.png" />](http://i.imgur.com/cjlxrf3.png)

## Comment ca marche ?
### En tant que donateur
Sur la page d'accueil, l'IA (John Doe) vous propose de faire un don au camp de réfugiés de votre choix.
Vous pouvez naviguer et voir les différents besoins des camps sur la carte interactive.

Dans une version plus avancée l'IA vous aidera à choisir à qui faire un don en prenant en compte les besoins les plus urgents.

### En tant que manager de camp
Vous pouvez vous logger en cliquant sur le bouton connexion en haut à droite (Voir login/mdp ci-dessous).
Vous pouvez ensuite exprimer les différents besoins de vos installations grâce à la liste de gauche.

| email | mot de passe |
|----|----|
| aurel@paris.com | paris |
| david@calais.com | calais |
| antoine@vienne.com | vienne |

## Build web app

`$ npm install`

`$ bower install`

`$ npm run build`

Installer l'API https://github.com/bitonic-team/helpjohn-api

## Build Desktop app

`$ npm install`

`$ bower install`

`$ electron-packager . helpjohn --all --version 1.4.10`

Win64 : http://helpjohn.xyz/download/helpjohn.exe

Linux64 : http://helpjohn.xyz/download/helpjohn

## Client technologies
ReactJs

Redux

Webpack

Electron

## Server technologies
OS : Ubuntu 16.04

Reverse proxy server: Nginx 1.10

Server : Nodejs 7.1 (+ Express)

SSL Certificate : Let’s Encrypt

BDD : Mysql 5.7

## Security

Nous avons suivi la méthodologie OWASP, une référence dans le domaine de la sécurité des applications web.

Voir notre testing checklist http://helpjohn.xyz/download/Oswap_testing_checklist.pdf

Configuration du serveur http://helpjohn.xyz/download/nginx_conf
# API

Voir l'API REST : https://github.com/bitonic-team/helpjohn-api
