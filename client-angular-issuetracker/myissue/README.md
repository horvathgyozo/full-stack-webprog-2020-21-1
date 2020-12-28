# Angular futtatás + deployment rövid leírás

## Fejlesztési célú futtatás

A NodeJS csomagok telepítését követően (`npm install`) lokálisan futtatható az alkalmazás, amit a `ng serve` parancs kiadásával indíthatunk.
A böngészőben a `http://localhost:4200/` címen megtekinthető az alkalmazás.
Ekkor az esetleges módosítások elvégzését követően a compile ismételten megtörténik, így szinte azonnal látható a módosítás eredménye.

## Deployment megvalósítás GitHub + Travis CI + Heroku alkalmazásával

### Express integrálás

A Heroku-n webszerver céljait az Express fogja betölteni, így annak telepítésével és konfigurálásával kezdünk.

Telepítéshez az alkalmazás gyökér könyvtárában adjuk ki a `npm install --save express` parancsot, ezáltal települ az Express és függőségeknél megjelenik a `package.json` állományban.

Hozzuk létre a `server.js` állományt, ami az Express megvalósítását viszi végbe. (Részletek az általam készített `server.js` -ben.)

A `package.json` -ben végezzük el a az alábbi módosításokat:
- alapértelmezett indítási parancs az Express servert indítsa: `"start": "ng serve"` -> `"start": "node server.js"`
- `"postinstall": "ng build --aot --prod"` build indítás
- `engines` blokk hozzáadása az általunk használt NodeJS és NPM verzióinak megfelelően

(Ezek definiálására a `.travis.yml` állományban is lehetőség van.)

### Heroku projekt létrehozás

Heroku-n hozzuk létre a projektet, amit megtehetünk a Heroku UI-on vagy Heroku CLI segítségével, majd mentsük le az API-key -t.

### Travis CI

Hozzuk a `.travis.yml` fájlt! (Részletek az általam készített `.travis.yml` -ben!)

A Travis CI felületén kössük aktiváljuk a GitHub projektünket.
Adjuk meg a Heroku APY-key -t változónak a projektünk beállításaiban.

### Próbáljuk ki!

Ezek után MASTER branchre történő push esetén elindul a pipeline, végül pedig kikerül a Heroku-ra az app.

### Megjegyzések

A Herocu CLI -al Travis nélkül közvetlenül is kitehetjük az appot, viszont abban az esetben a `dev-dependencies` -ből a `dependencies` -be kell áthelyezni az Angular CLI-t.
