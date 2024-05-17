import { Text, View, StyleSheet, Pressable, ScrollView } from "react-native";
import React, { Component } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";

export default function PrivacyPolicyScreen({ navigation }) {
  return (
    <View style={styles.container}>
    <View style={styles.headerBar}>
      <MaterialIcons
        name="arrow-back"
        size={24}
        color="black"
        onPress={() => navigation.goBack()}
      />
      <Text style={{ marginLeft: 10 }}>Datenschutz</Text>
    </View>
    <ScrollView style={{ padding: 10 }}>
      <Text style={styles.headers}>Präambel</Text>
      <Text style={styles.text}>
        Mit der folgenden Datenschutzerklärung möchten wir Sie darüber
        aufklären, welche Arten Ihrer personenbezogenen Daten (nachfolgend auch
        kurz als "Daten" bezeichnet) wir zu welchen Zwecken und in welchem
        Umfang verarbeiten. Die Datenschutzerklärung gilt für alle von uns
        durchgeführten Verarbeitungen personenbezogener Daten, sowohl im Rahmen
        der Erbringung unserer Leistungen als auch insbesondere auf unseren
        Webseiten, in mobilen Applikationen sowie innerhalb externer
        Onlinepräsenzen, wie z. B. unserer Social-Media-Profile (nachfolgend
        zusammenfassend bezeichnet als "Onlineangebot"). Die verwendeten
        Begriffe sind nicht geschlechtsspezifisch.
      </Text>
      <Text style={styles.headers}>Präambel</Text>
      <Text style={styles.text}>
        Mit der folgenden Datenschutzerklärung möchten wir Sie darüber
        aufklären, welche Arten Ihrer personenbezogenen Daten (nachfolgend auch
        kurz als "Daten" bezeichnet) wir zu welchen Zwecken und in welchem
        Umfang im Rahmen der Bereitstellung unserer Applikation verarbeiten. Die
        verwendeten Begriffe sind nicht geschlechtsspezifisch. Stand: 24. April
        2024
      </Text>
      <Text style={styles.headers}>Verantwortlicher</Text>
      <Text style={styles.contactText}>
        SFZ Förderzentrum gGmbH {"\n"}
        Flemmingstraße 8c {"\n"}
        09116 Chemnitz {"\n"}
        Deutschland {"\n"}
        E-Mail-Adresse: Tim.Schulz@dekra.com {"\n"}
        Telefon: +49 (0)341 2593947 {"\n"}
        Impressum: https://www.sfz-chemnitz.de/datenschutzerklaerung/ {"\n"}
      </Text>
      <Text style={styles.subheader}>Kontakt Datenschutzbeauftragter</Text>
      <Text style={styles.text}>Tim.Schulz@dekra.com</Text>
      <Text style={styles.subheader}>Übersicht der Verarbeitungen</Text>
      <Text style={styles.text}>
        Die nachfolgende Übersicht fasst die Arten der verarbeiteten Daten und
        die Zwecke ihrer Verarbeitung zusammen und verweist auf die betroffenen
        Personen.
      </Text>
      <Text style={styles.subheader}>Arten der verarbeiteten Daten</Text>
      <Text style={styles.text}>
        Standortdaten.
        Nutzungsdaten.
        Meta-, Kommunikations- und Verfahrensdaten.
      </Text>
      <Text style={styles.subheader}>Kategorien betroffener Personen</Text>
      <Text style={styles.text}>Kommunikationspartner. Nutzer.</Text>
      <Text style={styles.subheader}>Zwecke der Verarbeitung</Text>
      <Text style={styles.text}>
        Bereitstellung unseres Onlineangebotes und Nutzerfreundlichkeit.
      </Text>
      <Text style={styles.subheader}>Maßgebliche Rechtsgrundlagen</Text>
      <Text style={styles.text}>
        Maßgebliche Rechtsgrundlagen nach der DSGVO: Im Folgenden erhalten Sie
        eine Übersicht der Rechtsgrundlagen der DSGVO, auf deren Basis wir
        personenbezogene Daten verarbeiten. Bitte nehmen Sie zur Kenntnis, dass
        neben den Regelungen der DSGVO nationale Datenschutzvorgaben in Ihrem
        bzw. unserem Wohn- oder Sitzland gelten können. Sollten ferner im
        Einzelfall speziellere Rechtsgrundlagen maßgeblich sein, teilen wir
        Ihnen diese in der Datenschutzerklärung mit. Einwilligung (Art. 6 Abs. 1
        S. 1 lit. a) DSGVO) - Die betroffene Person hat ihre Einwilligung in die
        Verarbeitung der sie betreffenden personenbezogenen Daten für einen
        spezifischen Zweck oder mehrere bestimmte Zwecke gegeben.
        Vertragserfüllung und vorvertragliche Anfragen (Art. 6 Abs. 1 S. 1 lit.
        b) DSGVO) - Die Verarbeitung ist für die Erfüllung eines Vertrags,
        dessen Vertragspartei die betroffene Person ist, oder zur Durchführung
        vorvertraglicher Maßnahmen erforderlich, die auf Anfrage der betroffenen
        Person erfolgen. Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f)
        DSGVO) - die Verarbeitung ist zur Wahrung der berechtigten Interessen
        des Verantwortlichen oder eines Dritten notwendig, vorausgesetzt, dass
        die Interessen, Grundrechte und Grundfreiheiten der betroffenen Person,
        die den Schutz personenbezogener Daten verlangen, nicht überwiegen.
        Nationale Datenschutzregelungen in Deutschland: Zusätzlich zu den
        Datenschutzregelungen der DSGVO gelten nationale Regelungen zum
        Datenschutz in Deutschland. Hierzu gehört insbesondere das Gesetz zum
        Schutz vor Missbrauch personenbezogener Daten bei der Datenverarbeitung
        (Bundesdatenschutzgesetz – BDSG). Das BDSG enthält insbesondere
        Spezialregelungen zum Recht auf Auskunft, zum Recht auf Löschung, zum
        Widerspruchsrecht, zur Verarbeitung besonderer Kategorien
        personenbezogener Daten, zur Verarbeitung für andere Zwecke und zur
        Übermittlung sowie automatisierten Entscheidungsfindung im Einzelfall
        einschließlich Profiling. Ferner können Landesdatenschutzgesetze der
        einzelnen Bundesländer zur Anwendung gelangen. Hinweis auf Geltung DSGVO
        und Schweizer DSG: Diese Datenschutzhinweise dienen sowohl der
        Informationserteilung nach dem schweizerischen Bundesgesetz über den
        Datenschutz (Schweizer DSG) als auch nach der Datenschutzgrundverordnung
        (DSGVO). Aus diesem Grund bitten wir Sie zu beachten, dass aufgrund der
        breiteren räumlichen Anwendung und Verständlichkeit die Begriffe der
        DSGVO verwendet werden. Insbesondere statt der im Schweizer DSG
        verwendeten Begriffe „Bearbeitung" von „Personendaten", "überwiegendes
        Interesse" und "besonders schützenswerte Personendaten" werden die in
        der DSGVO verwendeten Begriffe „Verarbeitung" von „personenbezogenen
        Daten" sowie "berechtigtes Interesse" und "besondere Kategorien von
        Daten" verwendet. Die gesetzliche Bedeutung der Begriffe wird jedoch im
        Rahmen der Geltung des Schweizer DSG weiterhin nach dem Schweizer DSG
        bestimmt.
      </Text>
      <Text style={styles.subheader}>Sicherheitsmaßnahmen</Text>
      <Text style={styles.text}>
        Wir treffen nach Maßgabe der gesetzlichen Vorgaben unter
        Berücksichtigung des Stands der Technik, der Implementierungskosten und
        der Art, des Umfangs, der Umstände und der Zwecke der Verarbeitung sowie
        der unterschiedlichen Eintrittswahrscheinlichkeiten und des Ausmaßes der
        Bedrohung der Rechte und Freiheiten natürlicher Personen geeignete
        technische und organisatorische Maßnahmen, um ein dem Risiko
        angemessenes Schutzniveau zu gewährleisten. Zu den Maßnahmen gehören
        insbesondere die Sicherung der Vertraulichkeit, Integrität und
        Verfügbarkeit von Daten durch Kontrolle des physischen und
        elektronischen Zugangs zu den Daten als auch des sie betreffenden
        Zugriffs, der Eingabe, der Weitergabe, der Sicherung der Verfügbarkeit
        und ihrer Trennung. Des Weiteren haben wir Verfahren eingerichtet, die
        eine Wahrnehmung von Betroffenenrechten, die Löschung von Daten und
        Reaktionen auf die Gefährdung der Daten gewährleisten. Ferner
        berücksichtigen wir den Schutz personenbezogener Daten bereits bei der
        Entwicklung bzw. Auswahl von Hardware, Software sowie Verfahren
        entsprechend dem Prinzip des Datenschutzes, durch Technikgestaltung und
        durch datenschutzfreundliche Voreinstellungen. Sicherung von
        Online-Verbindungen durch TLS-/SSL-Verschlüsselungstechnologie (HTTPS):
        Um die Daten der Nutzer, die über unsere Online-Dienste übertragen
        werden, vor unerlaubten Zugriffen zu schützen, setzen wir auf die
        TLS-/SSL-Verschlüsselungstechnologie. Secure Sockets Layer (SSL) und
        Transport Layer Security (TLS) sind die Eckpfeiler der sicheren
        Datenübertragung im Internet. Diese Technologien verschlüsseln die
        Informationen, die zwischen der Website oder App und dem Browser des
        Nutzers (oder zwischen zwei Servern) übertragen werden, wodurch die
        Daten vor unbefugtem Zugriff geschützt sind. TLS, als die
        weiterentwickelte und sicherere Version von SSL, gewährleistet, dass
        alle Datenübertragungen den höchsten Sicherheitsstandards entsprechen.
        Wenn eine Website durch ein SSL-/TLS-Zertifikat gesichert ist, wird dies
        durch die Anzeige von HTTPS in der URL signalisiert. Dies dient als ein
        Indikator für die Nutzer, dass ihre Daten sicher und verschlüsselt
        übertragen werden.
      </Text>
      <Text style={styles.subheader}>
        Übermittlung von personenbezogenen Daten
      </Text>
      <Text style={styles.text}>
        Im Rahmen unserer Verarbeitung von personenbezogenen Daten kommt es vor,
        dass diese an andere Stellen, Unternehmen, rechtlich selbstständige
        Organisationseinheiten oder Personen übermittelt beziehungsweise ihnen
        gegenüber offengelegt werden. Zu den Empfängern dieser Daten können z.
        B. mit IT-Aufgaben beauftragte Dienstleister gehören oder Anbieter von
        Diensten und Inhalten, die in eine Website eingebunden sind. In solchen
        Fall beachten wir die gesetzlichen Vorgaben und schließen insbesondere
        entsprechende Verträge bzw. Vereinbarungen, die dem Schutz Ihrer Daten
        dienen, mit den Empfängern Ihrer Daten ab. Datenübermittlung innerhalb
        der Organisation: Datenübermittlung innerhalb der Unternehmensgruppe:
        Wir können personenbezogene Daten an andere Unternehmen innerhalb
        unserer Unternehmensgruppe übermitteln oder ihnen den Zugriff darauf
        gewähren. Sofern die Datenweitergabe zu administrativen Zwecken erfolgt,
        beruht sie auf unseren berechtigten unternehmerischen und
        betriebswirtschaftlichen Interessen oder erfolgt, sofern sie zur
        Erfüllung unserer vertragsbezogenen Verpflichtungen erforderlich ist
        beziehungsweise wenn eine Einwilligung der Betroffenen oder eine
        gesetzliche Erlaubnis vorliegt.
      </Text>
      <Text style={styles.subheader}>Internationale Datentransfers</Text>
      <Text style={styles.text}>
        Datenverarbeitung in Drittländern: Sofern wir Daten in einem Drittland
        (d. h., außerhalb der Europäischen Union (EU), des Europäischen
        Wirtschaftsraums (EWR)) verarbeiten oder die Verarbeitung im Rahmen der
        Inanspruchnahme von Diensten Dritter oder der Offenlegung bzw.
        Übermittlung von Daten an andere Personen, Stellen oder Unternehmen
        stattfindet, erfolgt dies nur im Einklang mit den gesetzlichen Vorgaben.
        Sofern das Datenschutzniveau in dem Drittland mittels eines
        Angemessenheitsbeschlusses anerkannt wurde (Art. 45 DSGVO), dient dieser
        als Grundlage des Datentransfers. Im Übrigen erfolgen Datentransfers nur
        dann, wenn das Datenschutzniveau anderweitig gesichert ist, insbesondere
        durch Standardvertragsklauseln (Art. 46 Abs. 2 lit. c) DSGVO),
        ausdrückliche Einwilligung oder im Fall vertraglicher oder gesetzlich
        erforderlicher Übermittlung (Art. 49 Abs. 1 DSGVO). Im Übrigen teilen
        wir Ihnen die Grundlagen der Drittlandübermittlung bei den einzelnen
        Anbietern aus dem Drittland mit, wobei die Angemessenheitsbeschlüsse als
        Grundlagen vorrangig gelten. Informationen zu Drittlandtransfers und
        vorliegenden Angemessenheitsbeschlüssen können dem Informationsangebot
        der EU-Kommission entnommen werden:
        https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection_en?prefLang=de.
        EU-US Trans-Atlantic Data Privacy Framework: Im Rahmen des sogenannten
        „Data Privacy Framework" (DPF) hat die EU-Kommission das
        Datenschutzniveau ebenfalls für bestimmte Unternehmen aus den USA im
        Rahmen der Angemessenheitsbeschlusses vom 10.07.2023 als sicher
        anerkannt. Die Liste der zertifizierten Unternehmen als auch weitere
        Informationen zu dem DPF können Sie der Website des Handelsministeriums
        der USA unter https://www.dataprivacyframework.gov/ (in Englisch)
        entnehmen. Wir informieren Sie im Rahmen der Datenschutzhinweise, welche
        von uns eingesetzten Diensteanbieter unter dem Data Privacy Framework
        zertifiziert sind.
      </Text>
      <Text style={styles.subheader}>Aufbewahrung und Löschung von Daten</Text>
      <Text style={styles.text}>
        Wir löschen personenbezogene Daten, die wir verarbeiten, gemäß den
        gesetzlichen Bestimmungen, sobald die zugrundeliegenden Einwilligungen
        widerrufen werden oder keine weiteren rechtlichen Grundlagen für die
        Verarbeitung bestehen. Dies betrifft Fälle, in denen der ursprüngliche
        Verarbeitungszweck entfällt oder die Daten nicht mehr benötigt werden.
        Ausnahmen von dieser Regelung bestehen, wenn gesetzliche Pflichten oder
        besondere Interessen eine längere Aufbewahrung oder Archivierung der
        Daten erfordern. Insbesondere müssen Daten, die aus handels- oder
        steuerrechtlichen Gründen aufbewahrt werden müssen oder deren
        Speicherung notwendig ist zur Rechtsverfolgung oder zum Schutz der
        Rechte anderer natürlicher oder juristischer Personen, entsprechend
        archiviert werden. Unsere Datenschutzhinweise enthalten zusätzliche
        Informationen zur Aufbewahrung und Löschung von Daten, die speziell für
        bestimmte Verarbeitungsprozesse gelten. Bei mehreren Angaben zur
        Aufbewahrungsdauer oder Löschungsfristen eines Datums, ist stets die
        längste Frist maßgeblich. Beginnt eine Frist nicht ausdrücklich zu einem
        bestimmten Datum und beträgt sie mindestens ein Jahr, so startet sie
        automatisch am Ende des Kalenderjahres, in dem das fristauslösende
        Ereignis eingetreten ist. Daten, die nicht mehr für den ursprünglich
        vorgesehenen Zweck, sondern aufgrund gesetzlicher Vorgaben oder anderer
        Gründe aufbewahrt werden, verarbeiten wir ausschließlich zu den Gründen,
        die ihre Aufbewahrung rechtfertigen. Weitere Hinweise zu
        Verarbeitungsprozessen, Verfahren und Diensten: Aufbewahrung und
        Löschung von Daten (Deutschland): Die folgenden allgemeinen Fristen
        gelten für die Aufbewahrung und Archivierung nach deutschem Recht: 10
        Jahre - Aufbewahrungsfrist für Bücher und Aufzeichnungen,
        Jahresabschlüsse, Inventare, Lageberichte, Eröffnungsbilanz sowie die zu
        ihrem Verständnis erforderlichen Arbeitsanweisungen und sonstigen
        Organisationsunterlagen, Buchungsbelege und Rechnungen (§ 147 Abs. 3 i.
        V. m. Abs. 1 Nr. 1, 4 und 4a AO, § 14b Abs. 1 UStG, § 257 Abs. 1 Nr. 1
        u. 4, Abs. 4 HGB). 6 Jahre - Übrige Geschäftsunterlagen: empfangene
        Handels- oder Geschäftsbriefe, Wiedergaben der abgesandten Handels- oder
        Geschäftsbriefe, sonstige Unterlagen, soweit sie für die Besteuerung von
        Bedeutung sind, z. B. Stundenlohnzettel, Betriebsabrechnungsbögen,
        Kalkulationsunterlagen, Preisauszeichnungen, aber auch
        Lohnabrechnungsunterlagen, soweit sie nicht bereits Buchungsbelege sind
        und Kassenstreifen (§ 147 Abs. 3 i. V. m. Abs. 1 Nr. 2, 3, 5 AO, § 257
        Abs. 1 Nr. 2 u. 3, Abs. 4 HGB). 3 Jahre - Daten, die erforderlich sind,
        um potenzielle Gewährleistungs- und Schadensersatzansprüche oder
        ähnliche vertragliche Ansprüche und Rechte zu berücksichtigen sowie
        damit verbundene Anfragen zu bearbeiten, basierend auf früheren
        Geschäftserfahrungen und üblichen Branchenpraktiken, werden für die
        Dauer der regulären gesetzlichen Verjährungsfrist von drei Jahren
        gespeichert (§§ 195, 199 BGB).
      </Text>
      <Text style={styles.subheader}>Rechte der betroffenen Personen</Text>
      <Text style={styles.text}>
        Rechte der betroffenen Personen aus der DSGVO: Ihnen stehen als
        Betroffene nach der DSGVO verschiedene Rechte zu, die sich insbesondere
        aus Art. 15 bis 21 DSGVO ergeben: Widerspruchsrecht: Sie haben das
        Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben,
        jederzeit gegen die Verarbeitung der Sie betreffenden personenbezogenen
        Daten, die aufgrund von Art. 6 Abs. 1 lit. e oder f DSGVO erfolgt,
        Widerspruch einzulegen; dies gilt auch für ein auf diese Bestimmungen
        gestütztes Profiling. Werden die Sie betreffenden personenbezogenen
        Daten verarbeitet, um Direktwerbung zu betreiben, haben Sie das Recht,
        jederzeit Widerspruch gegen die Verarbeitung der Sie betreffenden
        personenbezogenen Daten zum Zwecke derartiger Werbung einzulegen; dies
        gilt auch für das Profiling, soweit es mit solcher Direktwerbung in
        Verbindung steht. Widerrufsrecht bei Einwilligungen: Sie haben das
        Recht, erteilte Einwilligungen jederzeit zu widerrufen. Auskunftsrecht:
        Sie haben das Recht, eine Bestätigung darüber zu verlangen, ob
        betreffende Daten verarbeitet werden und auf Auskunft über diese Daten
        sowie auf weitere Informationen und Kopie der Daten entsprechend den
        gesetzlichen Vorgaben. Recht auf Berichtigung: Sie haben entsprechend
        den gesetzlichen Vorgaben das Recht, die Vervollständigung der Sie
        betreffenden Daten oder die Berichtigung der Sie betreffenden
        unrichtigen Daten zu verlangen. Recht auf Löschung und Einschränkung der
        Verarbeitung: Sie haben nach Maßgabe der gesetzlichen Vorgaben das
        Recht, zu verlangen, dass Sie betreffende Daten unverzüglich gelöscht
        werden, bzw. alternativ nach Maßgabe der gesetzlichen Vorgaben eine
        Einschränkung der Verarbeitung der Daten zu verlangen. Recht auf
        Datenübertragbarkeit: Sie haben das Recht, Sie betreffende Daten, die
        Sie uns bereitgestellt haben, nach Maßgabe der gesetzlichen Vorgaben in
        einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten
        oder deren Übermittlung an einen anderen Verantwortlichen zu fordern.
        Beschwerde bei Aufsichtsbehörde: Sie haben unbeschadet eines
        anderweitigen verwaltungsrechtlichen oder gerichtlichen Rechtsbehelfs
        das Recht auf Beschwerde bei einer Aufsichtsbehörde, insbesondere in dem
        Mitgliedstaat ihres gewöhnlichen Aufenthaltsorts, ihres Arbeitsplatzes
        oder des Orts des mutmaßlichen Verstoßes, wenn Sie der Ansicht sind,
        dass die Verarbeitung der Sie betreffenden personenbezogenen Daten gegen
        die Vorgaben der DSGVO verstößt.
      </Text>
      <Text style={styles.subheader}>Push-Nachrichten</Text>
      <Text style={styles.text}>
        Mit der Zustimmung der Nutzer, können wir den Nutzern so genannte
        "Push-Benachrichtigungen" zusenden. Dabei handelt es sich um
        Nachrichten, die auf den Bildschirmen, Endgeräten oder in Browsern der
        Nutzer angezeigt werden, auch wenn unser Onlinedienst gerade nicht aktiv
        genutzt wird. Um sich für die Push-Nachrichten anzumelden, müssen Nutzer
        die Abfrage ihres Browsers bzw. Endgerätes zum Erhalt der
        Push-Nachrichten bestätigen. Dieser Zustimmungsprozess wird dokumentiert
        und gespeichert. Die Speicherung ist erforderlich, um zu erkennen, ob
        Nutzer dem Empfang der Push-Nachrichten zugestimmt haben sowie um die
        Zustimmung nachweisen zu können. Zu diesen Zwecken wird ein pseudonymer
        Identifikator des Browsers (sog. "Push-Token") oder die Geräte-ID eines
        Endgerätes gespeichert. Die Push-Nachrichten können zum einen für die
        Erfüllung von vertraglichen Pflichten erforderlich sein (z. B. für die
        Nutzung unseres Onlineangebotes relevante technische und
        organisatorische Informationen) und - Dieser Textbereich muss mit einer
        Premium Lizenz freischaltet werden.Inhalte: "Technische Hinweise und
        Änderungen unserer Applikation sowie ihrer Funktionen." Verarbeitete
        Datenarten: Nutzungsdaten (z. B. Seitenaufrufe und Verweildauer,
        Klickpfade, Nutzungsintensität und -frequenz, verwendete Gerätetypen und
        Betriebssysteme, Interaktionen mit - Dieser Textbereich muss mit einer
        Premium Lizenz freischaltet werden. - premiumtext premiumtext
        premiumtext premiumtext premiumtext ). Meta-, Kommunikations- und
        Verfahrensdaten (z. B. IP-Adressen, Zeitangaben, Identifikationsnummern,
        beteiligte - Dieser Textbereich muss mit einer Premium Lizenz
        freischaltet werden. - premiumtext premiumtext premiumtext ). Betroffene
        Personen: Kommunikationspartner. Zwecke der Verarbeitung: Bereitstellung
        unseres Onlineangebotes und Nutzerfreundlichkeit. Rechtsgrundlagen:
        Einwilligung (Art. 6 Abs. 1 S. 1 lit. a) DSGVO). Vertragserfüllung und
        vorvertragliche Anfragen (Art. 6 Abs. 1 S. 1 lit. b) DSGVO).
      </Text>
      <Text style={styles.subheader}>
        Plug-ins und eingebettete Funktionen sowie Inhalte
      </Text>
      <Text style={styles.text}>
        Wir binden Funktions- und Inhaltselemente in unser Onlineangebot ein,
        die von den Servern ihrer jeweiligen Anbieter (nachfolgend als
        „Drittanbieter" bezeichnet) bezogen werden. Dabei kann es sich zum
        Beispiel um Grafiken, Videos oder Stadtpläne handeln (nachfolgend
        einheitlich als „Inhalte" bezeichnet). Die Einbindung setzt immer
        voraus, dass die Drittanbieter dieser Inhalte die IP-Adresse der Nutzer
        verarbeiten, da sie ohne IP-Adresse die Inhalte nicht an deren Browser
        senden könnten. Die IP-Adresse ist damit für die Darstellung dieser
        Inhalte oder Funktionen erforderlich. Wir bemühen uns, nur solche
        Inhalte zu verwenden, deren jeweilige Anbieter die IP-Adresse lediglich
        zur Auslieferung der Inhalte anzuwenden. Drittanbieter können ferner
        sogenannte Pixel-Tags (unsichtbare Grafiken, auch als „Web Beacons"
        bezeichnet) für statistische oder Marketingzwecke einsetzen. Durch die
        „Pixel-Tags" können Informationen, wie etwa der Besucherverkehr auf den
        Seiten dieser Website, ausgewertet werden. Die pseudonymen Informationen
        können darüber hinaus in Cookies auf dem Gerät der Nutzer gespeichert
        werden und unter anderem technische Auskünfte zum Browser und zum
        Betriebssystem, zu verweisenden Websites, zur Besuchszeit sowie weitere
        Angaben zur Nutzung unseres Onlineangebots enthalten, aber auch mit
        solchen Informationen aus anderen Quellen verbunden werden. Hinweise zu
        Rechtsgrundlagen: Sofern wir die Nutzer um ihre Einwilligung in den
        Einsatz der Drittanbieter bitten, stellt die Rechtsgrundlage der
        Datenverarbeitung die Erlaubnis dar. Ansonsten werden die Nutzerdaten
        auf Grundlage unserer berechtigten Interessen (d. h. Interesse an
        effizienten, wirtschaftlichen und empfängerfreundlichen Leistungen)
        verarbeitet. In diesem Zusammenhang möchten wir Sie auch auf die
        Informationen zur Verwendung von Cookies in dieser Datenschutzerklärung
        hinweisen. Verarbeitete Datenarten: Nutzungsdaten (z. B. Seitenaufrufe
        und Verweildauer, Klickpfade, Nutzungsintensität und -frequenz,
        verwendete Gerätetypen und Betriebssysteme, Interaktionen mit Inhalten
        und Funktionen); Meta-, Kommunikations- und Verfahrensdaten (z. B.
        IP-Adressen, Zeitangaben, Identifikationsnummern, beteiligte Personen).
        Standortdaten (Angaben zur geografischen Position eines Gerätes oder
        einer Person). Betroffene Personen: Nutzer (z. B. Webseitenbesucher,
        Nutzer von Onlinediensten). Zwecke der Verarbeitung: Bereitstellung
        unseres Onlineangebotes und Nutzerfreundlichkeit. Rechtsgrundlagen:
        Einwilligung (Art. 6 Abs. 1 S. 1 lit. a) DSGVO). Berechtigte Interessen
        (Art. 6 Abs. 1 S. 1 lit. f) DSGVO).
      </Text>
      <Text style={styles.subheader}>
        Weitere Hinweise zu Verarbeitungsprozessen, Verfahren und Diensten:
      </Text>
      <Text style={styles.text}>
        Einbindung von Drittsoftware, Skripten oder Frameworks (z. B. jQuery):
        Wir binden in unser Onlineangebot Software ein, die wir von Servern
        anderer Anbieter abrufen (z. B. Funktions-Bibliotheken, die wir zwecks
        Darstellung oder Nutzerfreundlichkeit unseres Onlineangebotes
        verwenden). Hierbei erheben die jeweiligen Anbieter die IP-Adresse der
        Nutzer und können diese zu Zwecken der Übermittlung der Software an den
        Browser der Nutzer sowie zu Zwecken der Sicherheit, als auch zur
        Auswertung und Optimierung ihres Angebotes verarbeiten. - Wir binden in
        unser Onlineangebot Software ein, die wir von Servern anderer Anbieter
        abrufen (z. B. Funktions-Bibliotheken, die wir zwecks Darstellung oder
        Nutzerfreundlichkeit unseres Onlineangebotes verwenden). Hierbei erheben
        die jeweiligen Anbieter die IP-Adresse der Nutzer und können diese zu
        Zwecken der Übermittlung der Software an den Browser der Nutzer sowie zu
        Zwecken der Sicherheit, als auch zur Auswertung und Optimierung ihres
        Angebotes verarbeiten; Rechtsgrundlagen: Berechtigte Interessen (Art. 6
        Abs. 1 S. 1 lit. f) DSGVO). Google Maps: Wir binden die Landkarten des
        Dienstes "Google Maps" des Anbieters Google ein. Zu den verarbeiteten
        Daten können insbesondere IP-Adressen und Standortdaten der Nutzer
        gehören; Dienstanbieter: Google Cloud EMEA Limited, 70 Sir John
        Rogerson’s Quay, Dublin 2, Irland; Rechtsgrundlagen: Einwilligung (Art.
        6 Abs. 1 S. 1 lit. a) DSGVO); Website: https://mapsplatform.google.com/;
        Datenschutzerklärung: https://policies.google.com/privacy. Grundlage
        Drittlandtransfers: Data Privacy Framework (DPF).
      </Text>
      <Text style={styles.subheader}>Änderung und Aktualisierung</Text>
      <Text style={styles.text}>
        Wir bitten Sie, sich regelmäßig über den Inhalt unserer
        Datenschutzerklärung zu informieren. Wir passen die Datenschutzerklärung
        an, sobald die Änderungen der von uns durchgeführten Datenverarbeitungen
        dies erforderlich machen. Wir informieren Sie, sobald durch die
        Änderungen eine Mitwirkungshandlung Ihrerseits (z. B. Einwilligung) oder
        eine sonstige individuelle Benachrichtigung erforderlich wird. Sofern
        wir in dieser Datenschutzerklärung Adressen und Kontaktinformationen von
        Unternehmen und Organisationen angeben, bitten wir zu beachten, dass die
        Adressen sich über die Zeit ändern können und bitten die Angaben vor
        Kontaktaufnahme zu prüfen.
      </Text>
      <Text style={styles.subheader}>Begriffsdefinitionen</Text>
      <Text style={styles.text}>
        In diesem Abschnitt erhalten Sie eine Übersicht über die in dieser
        Datenschutzerklärung verwendeten Begrifflichkeiten. Soweit die
        Begrifflichkeiten gesetzlich definiert sind, gelten deren gesetzliche
        Definitionen. Die nachfolgenden Erläuterungen sollen dagegen vor allem
        dem Verständnis dienen. Meta-, Kommunikations- und Verfahrensdaten:
        Meta-, Kommunikations- und Verfahrensdaten sind Kategorien, die
        Informationen über die Art und Weise enthalten, wie Daten verarbeitet,
        übermittelt und verwaltet werden. Meta-Daten, auch bekannt als Daten
        über Daten, umfassen Informationen, die den Kontext, die Herkunft und
        die Struktur anderer Daten beschreiben. Sie können Angaben zur
        Dateigröße, dem Erstellungsdatum, dem Autor eines Dokuments und den
        Änderungshistorien beinhalten. Kommunikationsdaten erfassen den
        Austausch von Informationen zwischen Nutzern über verschiedene Kanäle,
        wie E-Mail-Verkehr, Anrufprotokolle, Nachrichten in sozialen Netzwerken
        und Chat-Verläufe, inklusive der beteiligten Personen, Zeitstempel und
        Übertragungswege. Verfahrensdaten beschreiben die Prozesse und Abläufe
        innerhalb von Systemen oder Organisationen, einschließlich
        Workflow-Dokumentationen, Protokolle von Transaktionen und Aktivitäten,
        sowie Audit-Logs, die zur Nachverfolgung und Überprüfung von Vorgängen
        verwendet werden. Nutzungsdaten: Nutzungsdaten beziehen sich auf
        Informationen, die erfassen, wie Nutzer mit digitalen Produkten,
        Dienstleistungen oder Plattformen interagieren. Diese Daten umfassen
        eine breite Palette von Informationen, die aufzeigen, wie Nutzer
        Anwendungen nutzen, welche Funktionen sie bevorzugen, wie lange sie auf
        bestimmten Seiten verweilen und über welche Pfade sie durch eine
        Anwendung navigieren. Nutzungsdaten können auch die Häufigkeit der
        Nutzung, Zeitstempel von Aktivitäten, IP-Adressen, Geräteinformationen
        und Standortdaten einschließen. Sie sind besonders wertvoll für die
        Analyse des Nutzerverhaltens, die Optimierung von Benutzererfahrungen,
        das Personalisieren von Inhalten und das Verbessern von Produkten oder
        Dienstleistungen. Darüber hinaus spielen Nutzungsdaten eine
        entscheidende Rolle beim Erkennen von Trends, Vorlieben und möglichen
        Problembereichen innerhalb digitaler Angebote Personenbezogene Daten:
        "Personenbezogene Daten" sind alle Informationen, die sich auf eine
        identifizierte oder identifizierbare natürliche Person (im Folgenden
        "betroffene Person") beziehen; als identifizierbar wird eine natürliche
        Person angesehen, die direkt oder indirekt, insbesondere mittels
        Zuordnung zu einer Kennung wie einem Namen, zu einer Kennnummer, zu
        Standortdaten, zu einer Online-Kennung (z. B. Cookie) oder zu einem oder
        mehreren besonderen Merkmalen identifiziert werden kann, die Ausdruck
        der physischen, physiologischen, genetischen, psychischen,
        wirtschaftlichen, kulturellen oder sozialen Identität dieser natürlichen
        Person sind. Standortdaten: Standortdaten entstehen, wenn sich ein
        mobiles Gerät (oder ein anderes Gerät mit den technischen
        Voraussetzungen einer Standortbestimmung) mit einer Funkzelle, einem
        WLAN oder ähnlichen technischen Mitteln und Funktionen der
        Standortbestimmung, verbindet. Standortdaten dienen der Angabe, an
        welcher geografisch bestimmbaren Position der Erde sich das jeweilige
        Gerät befindet. Standortdaten können z. B. eingesetzt werden, um
        Kartenfunktionen oder andere von einem Ort abhängige Informationen
        darzustellen. Verantwortlicher: Als "Verantwortlicher" wird die
        natürliche oder juristische Person, Behörde, Einrichtung oder andere
        Stelle, die allein oder gemeinsam mit anderen über die Zwecke und Mittel
        der Verarbeitung von personenbezogenen Daten entscheidet, bezeichnet.
        Verarbeitung: "Verarbeitung" ist jeder mit oder ohne Hilfe
        automatisierter Verfahren ausgeführte Vorgang oder jede solche
        Vorgangsreihe im Zusammenhang mit personenbezogenen Daten. Der Begriff
        reicht weit und umfasst praktisch jeden Umgang mit Daten, sei es das
        Erheben, das Auswerten, das Speichern, das Übermitteln oder das Löschen.
        Erstellt mit kostenlosem Datenschutz-Generator.de von Dr. Thomas
        Schwenke
      </Text>
    </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#313335",
  },
  headerBar: {
    backgroundColor: "#ffc107",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  subheader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  headers: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  text: {
    fontSize: 16,
    color: "#fff",
    alignSelf: "center",
    marginBottom: 50,
  },
  contactText: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 50,
  },  
  button: {
    padding: 10,
    margin: 10,
    backgroundColor: "#f0f0f0",
  },
});
