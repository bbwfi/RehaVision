# RehaVision

Dieses Projekt ist eine Geocaching-Android-Anwendung, die mit Typescript und Firebase erstellt wird.
Es ermöglicht Benutzern, nach Geocaches auf dem SFZ Gelände zu suchen.

Geocaching ist eine Schnitzeljagd mit GPS-Geräten oder Smartphones. In einem bestimmten Gebiet werden sogenannte Caches (Behälter) versteckt, die du mithilfe von Hinweisen und Koordinaten finden musst.

- Spaß und Bewegung: Geocaching kombiniert Sport mit Rätselspaß und fördert gleichzeitig deine Fitness.
- Teamwork: Suche gemeinsam mit Freunden und Familie nach den Caches und stärke den Zusammenhalt.
- Erkundung: Entdecke neue Orte und Sehenswürdigkeiten in deiner Umgebung.
- Frische Luft: Genieße die Natur und bewege dich an der frischen Luft.



---
### Voraussetzungen
- Android Studio: https://developer.android.com/studio (Dieses Projekt erfordert Android Studio für die Emulation, nicht für die Entwicklung)
- Node.js und npm: https://nodejs.org/en/download
- Ein Firebase-Projekt: https://console.firebase.google.com/
- Expo: https://expo.dev
- IDE Nachwahl
---
### Emulator einrichten:
- Start Android Studio und erstelle eine neue VM.
- Links oben Menu öffnen
- Tools -> Device Manager -> Plus Symbol
- Bei der Auswahl der Hardware empfehle ich Pixel 8 Pro
- Installieren eines System Images nachwahl
---
> [!IMPORTANT]
> ### System/Nutzer Variablen Erstellen
> - Systemsteurung->System->Sicherheit->System->Erweiterte Systemeinstellung->Systemeigenschaft->Leistung->Umgebungsvariablen
> - Neue Variable erstellen, in appdata unter Local->Android->SDK->Emulator den Pfad kopieren und in der Variable einfügen.
> - Link zu einem Video mit als Guide: https://youtu.be/InVMrjx49DM?si=cT6Clbv3pZtUyp3e
---
### Console und Expo Commands
```diff
npm install expo

npx expo start
```
```diff
? /? displays most commands of expo
a /a starts/installs the program on Android, only when Emulated Device is launched
```
