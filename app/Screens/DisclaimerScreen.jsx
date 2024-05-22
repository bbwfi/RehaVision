import { Text, View, StyleSheet, Pressable, ScrollView } from "react-native";
import React, { Component } from "react";
import { MaterialIcons } from "@expo/vector-icons";

export default function DisclaimerScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.headerBar}>
      <Pressable onPress={() => navigation.goBack()} style={{ padding: 10 }}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </Pressable>
        <Text style={{ marginLeft: 10 }}>Disclaimer</Text>
      </View>
      <ScrollView style={{ padding: 10} }>
        <Text style={styles.headers}>Auslegung</Text>
        <Text style={styles.text}>
          Auslegung Die Wörter, deren Anfangsbuchstabe großgeschrieben ist,
          haben Bedeutungen gemäß den folgenden Bedingungen. Die folgenden
          Definitionen gelten unabhängig davon, ob sie im Singular oder im
          Plural erscheinen.
        </Text>
        <Text style={styles.headers}>Definitionen</Text>
        <Text style={styles.text}>
          Für die Zwecke dieses Haftungsausschlusses: Unternehmen (im Folgenden
          als "das Unternehmen", "Wir", "Uns" oder "Unser" bezeichnet) bezieht
          sich auf SFZ Förderzentrum gGmbH, 8c Flemmingstraße, Chemnitz 09116.
          Dienstleistung bezieht sich auf die Anwendung. Du bezeichnet die
          Person, die auf den Dienst zugreift, oder das Unternehmen oder eine
          andere juristische Person, die die Person, die auf den Dienst zugreift
          oder ihn nutzt, vertritt. Anwendung bezeichnet das von dir
          heruntergeladene Softwareprogramm des Unternehmens auf einem
          elektronischen Gerät namens RehaVision.
        </Text>
        <Text style={styles.headers}>Haftungsausschluss</Text>
        <Text style={styles.text}>
          Die auf dem Dienst enthaltenen Informationen dienen nur zu allgemeinen
          Informationszwecken. Das Unternehmen übernimmt keine Verantwortung für
          Fehler oder Auslassungen in den Inhalten des Dienstes. In keinem Fall
          haftet das Unternehmen für besondere, direkte, indirekte, Folge- oder
          zufällige Schäden oder für irgendwelche Schäden, die sich aus oder im
          Zusammenhang mit der Nutzung des Dienstes oder der Inhalte des
          Dienstes ergeben, sei es in einer vertraglichen Handlung,
          Fahrlässigkeit oder einem anderen deliktischen Handeln. Das
          Unternehmen behält sich das Recht vor, jederzeit und ohne vorherige
          Ankündigung Ergänzungen, Löschungen oder Änderungen an den Inhalten
          des Dienstes vorzunehmen. Dieser Haftungsausschluss wurde mit Hilfe
          des Haftungsausschluss-Generators erstellt. Das Unternehmen garantiert
          nicht, dass der Dienst frei von Viren oder anderen schädlichen
          Komponenten ist.
        </Text>
        <Text style={styles.headers}>Haftungsausschluss für externe Links</Text>
        <Text style={styles.text}>
          Der Dienst kann Links zu externen Websites enthalten, die nicht vom
          Unternehmen bereitgestellt oder gewartet werden oder in irgendeiner
          Weise mit dem Unternehmen verbunden sind. Bitte beachte, dass das
          Unternehmen nicht für die Genauigkeit, Relevanz, Aktualität oder
          Vollständigkeit von Informationen auf diesen externen Websites
          garantiert.
        </Text>
        <Text style={styles.headers}>Haftungsausschluss für Fehler und Auslassungen</Text>
        <Text style={styles.text}>
          Die vom Dienst bereitgestellten Informationen dienen nur zur
          allgemeinen Orientierung zu interessierenden Themen. Selbst wenn das
          Unternehmen alle Vorsichtsmaßnahmen trifft, um sicherzustellen, dass
          der Inhalt des Dienstes sowohl aktuell als auch korrekt ist, können
          Fehler auftreten. Zudem kann es aufgrund der sich ändernden Natur von
          Gesetzen, Regeln und Vorschriften zu Verzögerungen, Auslassungen oder
          Ungenauigkeiten in den auf dem Dienst enthaltenen Informationen
          kommen. Das Unternehmen ist nicht verantwortlich für Fehler oder
          Auslassungen oder für die Ergebnisse, die sich aus der Verwendung
          dieser Informationen ergeben.
        </Text>
        <Text style={styles.headers}>Haftungsausschluss für faire Nutzung</Text>
        <Text style={styles.text}>
          Das Unternehmen kann urheberrechtlich geschütztes Material verwenden,
          das nicht immer vom Urheberrechtsinhaber ausdrücklich genehmigt wurde.
          Das Unternehmen stellt solches Material für Kritik, Kommentare,
          Nachrichtenberichterstattung, Lehre, Stipendium oder Forschung zur
          Verfügung. Das Unternehmen ist der Ansicht, dass dies eine "faire
          Nutzung" eines solchen urheberrechtlich geschützten Materials gemäß
          Abschnitt 107 des Urheberrechtsgesetzes der Vereinigten Staaten
          darstellt. Wenn du urheberrechtlich geschütztes Material aus dem
          Dienst für deine eigenen Zwecke verwenden möchtest, die über die faire
          Nutzung hinausgehen, musst du die Genehmigung des
          Urheberrechtsinhabers einholen.
        </Text>
        <Text style={styles.headers}>Haftungsausschluss für geäußerte Ansichten</Text>
        <Text style={styles.text}>
          Der Dienst kann Ansichten und Meinungen enthalten, die denen der
          Autoren entsprechen und nicht unbedingt der offiziellen Politik oder
          Position anderer Autoren, Behörden, Organisationen, Arbeitgeber oder
          Unternehmen, einschließlich des Unternehmens, entsprechen. Die von
          Benutzern veröffentlichten Kommentare liegen in deren alleiniger
          Verantwortung, und die Benutzer tragen die volle Verantwortung,
          Haftung und Schuld für jegliche Verleumdung oder Rechtsstreitigkeiten,
          die sich aus etwas ergeben, was in einem Kommentar geschrieben wurde
          oder als direktes Ergebnis dessen geschrieben wurde. Das Unternehmen
          haftet nicht für Kommentare von Benutzern und behält sich das Recht
          vor, jeden Kommentar aus irgendeinem Grund zu löschen.
        </Text>
        <Text style={styles.headers}>Haftungsausschluss für keine Verantwortung</Text>
        <Text style={styles.text}>
          Die Informationen auf dem Dienst werden mit dem Verständnis
          bereitgestellt, dass das Unternehmen hiermit keine rechtliche,
          Buchhaltungs-, Steuer- oder andere professionelle Beratungs- und
          Dienstleistungen erbringt. Es sollte daher nicht als Ersatz für eine
          Beratung durch professionelle Buchhalter, Steuerberater, Rechtsanwälte
          oder andere kompetente Berater verwendet werden. In keinem Fall haften
          das Unternehmen oder seine Lieferanten für besondere, zufällige,
          indirekte oder Folgeschäden, die sich aus oder im Zusammenhang mit
          deinem Zugriff oder deiner Nutzung oder Unfähigkeit, auf den Dienst
          zuzugreifen oder ihn zu nutzen, ergeben.
        </Text>
        <Text style={styles.headers}>Auf eigene Gefahr verwenden Haftungsausschluss</Text>
        <Text style={styles.text}>
          Alle Informationen im Dienst werden "wie besehen" bereitgestellt, ohne
          Garantie für Vollständigkeit, Richtigkeit, Aktualität oder die
          Ergebnisse, die sich aus der Verwendung dieser Informationen ergeben,
          und ohne jegliche Gewährleistung, ausdrücklich oder implizit,
          einschließlich, aber nicht beschränkt auf Garantien für Leistung,
          Handelsüblichkeit und Eignung für einen bestimmten Zweck. Das
          Unternehmen haftet dir oder anderen Personen nicht für Entscheidungen,
          die auf den Informationen des Dienstes beruhen, oder für etwaige
          daraus resultierende, besondere oder ähnliche Schäden, selbst wenn auf
          die Möglichkeit solcher Schäden hingewiesen wurde.
        </Text>
        <Text style={styles.headers}>Kontaktiere uns</Text>
        <Text style={styles.text}>
          Wenn du Fragen zu diesem Haftungsausschluss hast, kannst du uns wie
          folgt kontaktieren: Per E-Mail: kontakt@bbw-fi.de
        </Text>
      </ScrollView>
    </View>
  );
}

//
// The above code will render a simple disclaimer screen with the text "DisclaimerScreen".
//
// The `StyleSheet.apply` function is used to apply the styles to the components in the screen.
//
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
  headers: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  text: {
    fontSize: 16,
    color: "#fff",
    alignSelf: "center",
    marginBottom: 50
  },
  button: {
    padding: 10,
    margin: 10,
    backgroundColor: "#f0f0f0",
  },
});
