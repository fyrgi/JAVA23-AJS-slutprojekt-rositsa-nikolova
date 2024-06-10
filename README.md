Final project of the course Advanced JavaScript with React.
The course is part of the education at Malmö Grit Academy in the education Java development 2023.

Scrum board beskrivning

Ett mini scrum board där varje användare (utan inlogg) kan skriva uppgift och fördela det till respektive avdelning t e UX, eller Dev. Uppgiften består av text.
När uppgiften läggs för den status To Do direkt och hamnar under kolumnen för To Do uppgifter. Förutom status sätts en datum och tid när uppgiften skapas. En To do uppgift innebär att den inte är fördelad till någon person. Personerna är ren text och hämtas inte från en databas, dvs att allt möjligt text kan finnas där. Blir det fördelad till en person byter den status till In progress. En ny datum sätts men förra datumet sparas också. Datumen finns i firebase. Uppgiften hamnar under In progress kolumnen och dess utsikt ändras med namnet på personen samt det nya datumet kan ses. Man kan trycka på en knapp för att markera uppgiften som färdig. Gör det användaren så byter uppgiften status till done och ett datum för completed sparas i firebase. Här ska användaren kunna radera uppgiften genom att trycka på en knapp.

Som extra förutom datumet kan användaren bestämma att ge tillbaka uppgiften t e om den har inte godkändes eller något mer finns kvar att göras. Det gör användaren genom en knapp som heter Return. Då hamnar uppgiften igen i In progress kolumnen med förra utsikten. Här sparas bara det senaste datumet under assigned i firebase. Det finn inte något sätt att se att uppgiften har inte varit godkänd. Man kan markera uppgiften som Done och sen returnera den obegränsade gånger.

En liten ektra är att istället för att radera en uppgift vilket ska ta uppgiften bort från firebase kan man Archivera den. Då är det mer spårbar. På det här steget under uppgifterna som finns i Archive kolumnen kan användaren fortfarande helt radera den från firebase genom knappen Delete. För att se Archive kolumnen måste användaren trycka på checkboxen under Add task formen.

Scrum board är byggd med React, HTML, CSS och JavaScript med användning av Firebase och publicerad på github pages.
https://fyrgi.github.io/JAVA23-AJS-slutprojekt-rositsa-nikolova/?authuser=5
