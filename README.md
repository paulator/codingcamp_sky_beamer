# SKY BEAMER

In diesem Repository ist der Code aus dem CodingCamp Teens der Gruppe
*Sky Beamer* vom Oktober 2024.

## Projektstruktur

* Im Ordner `html` liegt der HTML Quellcode für den Client (index.html) und für
den Beamer (backend.html)
* Im Ordner `nodejs` liegt der code für den nodejs Server.
* Im Ordner `nginx-alpine-ssl` liegen die Konfigurationsfiles für den nginx

## Docker Image

Für eine leichtere Verwendung wurde der Code noch in einen Docker-Container
eingepackt. Dazu muss auf dem Raspi oder auf dem Rechner, wo der nginx laufen
soll Docker installiert sein.

* Das Docker Image kann mit `docker build . -t skybeamer` erzeugt werden.
* Danach kann der Container mit dem Kommando `docker run -it -d -p 80:80 -p
443:443 --name skybeamer skybeamer` gestartet werden.

In das Docker Image werden alle Dateien (html, nodejs etc.) gepackt, der nginx
konfiguriert und das selbstsignierte Zertifikat hinterlegt. Der Port 443 und 80
werden exposed und sind nach dem Start unter https://localhost erreichbar.

Es sind folgende URLs vorhanden:
Für Schüler (Clients): https://localhost
Für den Beamer (Backend): https://localhost/backend.html

Localhost kann natürlich ersetzt werden durch die IP Adresse des Raspery Pi
Servers.
