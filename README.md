## Opis
Ten projekt służy do generowania pliku HTML z artykułem, który jest przekształcany z tekstu wprowadzonego przez użytkownika. Artykuł jest następnie zapisywany w dwóch plikach:

artykul.html – zawiera tylko przekształcony artykuł w formacie HTML.
podglad.html – zawiera artykuł wstawiony do szablonu HTML, gotowy do podglądu.
Projekt wykorzystuje OpenAI API do przekształcania artykułów w format HTML oraz Node.js do zarządzania plikami i generowania wyników.


## Uruchomienie lokalnie

Sklonuj projekt

```bash
  git clone https://github.com/Maciej-Lask/Maciej-Laskowski-Oxido-Task.git
```

Zainstaluj zależności

```bash
  npm install
```

Uruchom aplikację, aby wygenerować nowy artykuł i podgląd

```bash
  node app.js
```


Po uruchomieniu aplikacji, wynikiem będą dwa pliki:

artykul.html – plik z artykułem w HTML

podglad.html – plik, który łączy artykuł z szablonem HTML i jest gotowy do podglądu.

Możesz otworzyć plik podglad.html, aby zobaczyć wynikowy artykuł z szablonem.