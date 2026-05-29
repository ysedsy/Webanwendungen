PRAGMA foreign_keys = OFF;
-- BEGIN TRANSACTION;
-- funktioniert im Query Tool von DB Browser for SQLite

-- Tabellen leeren
DELETE FROM "ForumPost";
DELETE FROM "ForumThread";
DELETE FROM "BirdImage";
DELETE FROM "Bird";
DELETE FROM "Habitat";

-- AUTOINCREMENT-Zähler zurücksetzen
DELETE FROM sqlite_sequence WHERE name = 'Habitat';
DELETE FROM sqlite_sequence WHERE name = 'Bird';
DELETE FROM sqlite_sequence WHERE name = 'BirdImage';
DELETE FROM sqlite_sequence WHERE name = 'ForumThread';
DELETE FROM sqlite_sequence WHERE name = 'ForumPost';

-- Daten für Habitat
INSERT INTO "Habitat" ("HabitatID", "HabitatName") VALUES (1, 'Wald');
INSERT INTO "Habitat" ("HabitatID", "HabitatName") VALUES (2, 'Stadt');
INSERT INTO "Habitat" ("HabitatID", "HabitatName") VALUES (3, 'Wasser');

-- Daten für Bird
INSERT INTO "Bird" ("BirdID", "CommonName", "ScientificName", "Height", "Weight", "HabitatID", "AverageAge", "Description") VALUES (1, 'Rotkehlchen', 'Erithacus rubecula', 14.0, 22.0, 1, 1, 'Das Rotkehlchen (Erithacus rubecula) ist eine Vogelart aus der Familie der Fliegenschnäpper (Muscicapidae). Es besiedelt Nordafrika, Europa und Kleinasien sowie die Mittelmeerinseln. Seine Nahrung besteht vor allem aus Insekten, kleinen Spinnen, Würmern und Schnecken. Sein Gesang beginnt etwa eine Stunde vor Sonnenaufgang und ist bis in die Dämmerung fast das ganze Jahr über zu hören. Die Art gilt derzeit als ungefährdet.

Das Rotkehlchen war in Deutschland 1992 und 2021[1][2] und in der Schweiz 2025 „Vogel des Jahres“.

Wegen seiner oft geringen Fluchtdistanz, seines Erscheinungsbilds und seiner Häufigkeit ist das Rotkehlchen ein besonderer Sympathieträger. In Christuslegenden steht es Jesus in besonderen Momenten und im Sterben tröstend bei. Zudem wird es als inoffizieller Nationalvogel Großbritanniens mit Weihnachten in Verbindung gebracht. Es hat bei der Entdeckung und wissenschaftlichen Anerkennung des Magnetsinns eine wichtige Rolle gespielt.');
INSERT INTO "Bird" ("BirdID", "CommonName", "ScientificName", "Height", "Weight", "HabitatID", "AverageAge", "Description") VALUES (2, 'Rotmilan', 'Milvus milvus', 66.0, 1300.0, 1, 6, 'Der Rotmilan (Milvus milvus), auch Roter Milan, Gabelweih(e) oder Königsweih(e) genannt, ist eine Greifvogelart aus der Familie der Habichtartigen (Accipitridae). Der gut mäusebussardgroße, lang- und schmalflügelige Greifvogel hat seinen Verbreitungsschwerpunkt in Deutschland. Fast der gesamte Weltbestand ist in Europa beheimatet; nur wenige Rotmilane brüten auch in Nordwestafrika.

Charakteristisch für diesen eleganten Flieger sind der gegabelte Schwanz sowie die markanten weißen Flügelfelder vor den tief gefingerten schwarzen Handschwingen.

Rotmilane sind Teilzieher. Die meisten Vögel Mitteleuropas verlassen im Spätherbst ihre Brutgebiete und ziehen nach Südwesten ab. Sie bleiben meist in Südwesteuropa, nur sehr wenige ziehen weiter bis in die Sahelgebiete Afrikas. In zunehmender Zahl versuchen Rotmilane auch in ihren mitteleuropäischen Brutgebieten zu überwintern.

Rotmilane ernähren sich überwiegend von Kleinsäugern, Wirbellosen, Amphibien sowie kleineren Vögeln und Aas.');
INSERT INTO "Bird" ("BirdID", "CommonName", "ScientificName", "Height", "Weight", "HabitatID", "AverageAge", "Description") VALUES (3, 'Amsel', 'Turdus merula', 25.0, 112.0, 1, 4, 'Die Amsel (Turdus merula) oder Schwarzdrossel, manchmal Kohlamsel oder Schwarzamsel, ist eine Vogelart aus der Familie der Drosseln (Turdidae). In Europa ist die Amsel der am weitesten verbreitete Vertreter dieser Familie und zugleich einer der bekanntesten Vögel überhaupt. Ihre Körperlänge liegt zwischen 24 und 27 Zentimetern. Die Männchen sind schwarz gefärbt und haben einen gelben Schnabel, das Gefieder der Weibchen ist größtenteils dunkelbraun. Der melodiöse und laut vorgetragene Reviergesang der Männchen ist in Mitteleuropa hauptsächlich zwischen Anfang März und Ende Juli zu hören und kann bereits vor der Morgendämmerung beginnen.

Das Brutgebiet in Europa weist außer dem hohen Norden und dem äußersten Südosten keine größeren Verbreitungslücken auf. Darüber hinaus kommt die Amsel in Teilen Nordafrikas und Asiens vor. In Australien und Neuseeland wurde sie eingebürgert. In Mitteleuropa verlässt ein Teil der Vögel im Winter das Brutgebiet und zieht nach Südeuropa oder Nordafrika.

Ursprünglich war die Amsel ein Vogel des Waldes, wo sie auch heute noch anzutreffen ist. Im 19. Jahrhundert begann sie über siedlungsnahe Parks und Gärten bis in die Stadtzentren vorzudringen und ist zum Kulturfolger geworden. Ihre Nahrung suchen Amseln vorwiegend am Boden. Sie ernähren sich überwiegend von tierischer Nahrung, meist Regenwürmer oder Käfer. Abhängig von der Verfügbarkeit steigt der Anteil gefressener Beeren und Früchte. Amseln sind Freibrüter und nisten vorwiegend in Bäumen und Sträuchern.');
INSERT INTO "Bird" ("BirdID", "CommonName", "ScientificName", "Height", "Weight", "HabitatID", "AverageAge", "Description") VALUES (4, 'Graureiher', 'Ardea cinerea', 98.0, '2000.0', 1, 15, 'Der Graureiher (Ardea cinerea), auch Fischreiher genannt, ist eine Vogelart aus der Ordnung Pelecaniformes. Er ist in Eurasien und Afrika weit verbreitet und häufig. Weltweit werden vier Unterarten unterschieden. In Mitteleuropa ist er mit der Nominatform Ardea cinerea cinerea vertreten.');
INSERT INTO "Bird" ("BirdID", "CommonName", "ScientificName", "Height", "Weight", "HabitatID", "AverageAge", "Description") VALUES (5, 'Kohlmeise', 'Parus major', 15.0, 22.0, 2, 2, 'Die Kohlmeise (Parus major) ist eine Vogelart aus der Familie der Meisen (Paridae). Sie ist die größte und am weitesten verbreitete Meisenart in Europa. Darüber hinaus erstreckt sich ihr Verbreitungsgebiet über den Nahen Osten und durch die gemäßigte Zone Asiens bis nach Fernost.');
INSERT INTO "Bird" ("BirdID", "CommonName", "ScientificName", "Height", "Weight", "HabitatID", "AverageAge", "Description") VALUES (6, 'Kolkrabe', 'Corvus corax', 64.0, 1500.0, 2, 15, 'Der Kolkrabe (Corvus corax) ist eine Singvogelart aus der Familie der Rabenvögel (Corvidae). Durch menschliche Verfolgung waren Kolkraben bis 1940 in weiten Teilen Mitteleuropas ausgerottet und haben sich danach durch nachlassende Verfolgung wieder ausgebreitet. Der wissenschaftliche Name Corvus corax setzt sich aus dem lateinischen Corvus und dem griechischen Corax zusammen, beides bedeutet „Rabe“. Kolk, die erste Silbe seines seit dem 16. Jahrhundert bezeugten deutschen Namens, ist vermutlich lautmalerischen Ursprungs, ahmt also den Ruf des Vogels nach.');
INSERT INTO "Bird" ("BirdID", "CommonName", "ScientificName", "Height", "Weight", "HabitatID", "AverageAge", "Description") VALUES (7, 'Buntspecht', 'Dendrocopos major', 24.0, 90.0, 1, 5, 'Der Buntspecht (Dendrocopos major, Syn.: Picoides major) ist eine Vogelart aus der Familie der Spechte (Picidae). Buntspechte besiedeln große Teile des nördlichen Eurasiens sowie Nordafrika und bewohnen Wälder fast jeder Art sowie Parks und baumreiche Gärten. Die Nahrung wird in allen Strata des Waldes (mit Ausnahme des Waldbodens) gesucht, jedoch vor allem in den Baumkronen. Sie besteht sowohl aus tierischen Anteilen als auch, vor allem im Winter, aus pflanzlichem Material. Das Nahrungsspektrum ist sehr breit und umfasst verschiedenste Insekten und andere Wirbellose ebenso wie kleine Wirbeltiere und Vogeleier, Samen, Beeren und andere Früchte sowie Baumsäfte.

Die Art ist häufig und der Bestand nimmt zumindest in Europa zu. Der Buntspecht wird von der IUCN daher als nicht gefährdet (Least Concern) eingestuft.');
INSERT INTO "Bird" ("BirdID", "CommonName", "ScientificName", "Height", "Weight", "HabitatID", "AverageAge", "Description") VALUES (8, 'Stockente', 'Anas platyrhynchos', 60.0, 1400.0, 3, 5, 'Die Stockente (Anas platyrhynchos) ist eine Vogelart aus der Familie der Entenvögel (Anatidae).

Die Stockente ist die größte und am häufigsten vorkommende Schwimmente Europas und die Stammform der Hausente. Ausgewachsene Männchen im Balzkleid sind mit ihrem grünmetallischen Kopf, dem gelben Schnabel und dem weißen Halsring unverwechselbar, die Weibchen sind unscheinbarer hellbraun mit orangefarbenem Schnabel.

Stockenten kommen im größten Teil Eurasiens, im äußersten Norden Afrikas sowie in weiten Teilen Nordamerikas vor und sind in Neuseeland und Australien als Brutvogel eingeführt worden. Ihre Häufigkeit ist darauf zurückzuführen, dass sie sowohl bei der Wahl ihrer Brutplätze als auch ihrer Aufenthaltsorte wenig anspruchsvoll sind, sofern irgendeine Art von Gewässer vorhanden ist.');
INSERT INTO "Bird" ("BirdID", "CommonName", "ScientificName", "Height", "Weight", "HabitatID", "AverageAge", "Description") VALUES (9, 'Uhu', 'Bubo bubo', 75.0, 3000.0, 1, 20, 'Der Uhu (Bubo bubo) ist eine Vogelart aus der Gattung der Uhus (Bubo), die zur Ordnung der Eulen (Strigiformes) gehört. Uhus haben einen massigen Körper und einen auffällig dicken Kopf mit Federohren. Die Augen sind orangegelb. Das Gefieder weist dunkle Längs- und Querzeichnungen auf. Brust und Bauch sind dabei heller als die Rückseite.

Der Uhu ist ein Raub- und Standvogel, der bevorzugt in reich strukturierten Landschaften jagt. In Mitteleuropa brütet die Art vor allem in den Alpen sowie den Mittelgebirgen, daneben haben Uhus hier in den letzten Jahrzehnten aber auch das Flachland wieder besiedelt. Die Brutplätze finden sich vor allem in Felswänden und Steilhängen und in alten Greifvogelhorsten, seltener an Gebäuden oder auf dem Boden.');

-- Daten für BirdImage
INSERT INTO "BirdImage" ("ImageID", "BirdID", "ImagePath", "IsMainImage") VALUES (6, 1, '\images\birds\Rotkehlchen.jpg', 1);
INSERT INTO "BirdImage" ("ImageID", "BirdID", "ImagePath", "IsMainImage") VALUES (8, 2, '\images\birds\Rotmilan.jpg', 1);
INSERT INTO "BirdImage" ("ImageID", "BirdID", "ImagePath", "IsMainImage") VALUES (9, 3, '\images\birds\Amsel.jpg', 1);
INSERT INTO "BirdImage" ("ImageID", "BirdID", "ImagePath", "IsMainImage") VALUES (10, 4, '\images\birds\Graureiher.jpg', 1);
INSERT INTO "BirdImage" ("ImageID", "BirdID", "ImagePath", "IsMainImage") VALUES (11, 5, '\images\birds\Kohlmeise.jpg', 1);
INSERT INTO "BirdImage" ("ImageID", "BirdID", "ImagePath", "IsMainImage") VALUES (12, 6, '\images\birds\Kolkrabe.jpg', 1);
INSERT INTO "BirdImage" ("ImageID", "BirdID", "ImagePath", "IsMainImage") VALUES (13, 7, '\images\birds\Buntspecht.jpg', 1);
INSERT INTO "BirdImage" ("ImageID", "BirdID", "ImagePath", "IsMainImage") VALUES (14, 8, '\images\birds\Stockente.jpg', 1);
INSERT INTO "BirdImage" ("ImageID", "BirdID", "ImagePath", "IsMainImage") VALUES (15, 9, '\images\birds\Uhu.jpg', 1);

-- Daten für ForumThread
INSERT INTO "ForumThread" ("ThreadID", "ThreadTitle") VALUES (12, 'Turmfalke Sichtung in Balingen');
INSERT INTO "ForumThread" ("ThreadID", "ThreadTitle") VALUES (13, 'Redet bitte Deutsch im Forum!');
INSERT INTO "ForumThread" ("ThreadID", "ThreadTitle") VALUES (14, 'Drei Graureiher im Wollried');
INSERT INTO "ForumThread" ("ThreadID", "ThreadTitle") VALUES (15, 'Blaukehlchen am Federseesteg');

-- Daten für ForumPost
INSERT INTO "ForumPost" ("PostID", "UserName", "PostText", "DateCreated", "ThreadID", "ParentID") VALUES (22, 'TurmiTim', 'Habe heute einen Turmfalken in Balingen gesehen', '2026-05-13 15:16:17', 12, NULL);
INSERT INTO "ForumPost" ("PostID", "UserName", "PostText", "DateCreated", "ThreadID", "ParentID") VALUES (23, 'Tommo', 'Wirklich? Wo hast Du den gesehen', '2026-05-13 15:16:38', 12, 22);
INSERT INTO "ForumPost" ("PostID", "UserName", "PostText", "DateCreated", "ThreadID", "ParentID") VALUES (24, 'GabyGraugans', 'Sag mal wo', '2026-05-13 15:17:00', 12, 22);
INSERT INTO "ForumPost" ("PostID", "UserName", "PostText", "DateCreated", "ThreadID", "ParentID") VALUES (25, 'TurmiTim', 'Es war beim Bauernhof in Frommern', '2026-05-13 15:17:41', 12, 23);
INSERT INTO "ForumPost" ("PostID", "UserName", "PostText", "DateCreated", "ThreadID", "ParentID") VALUES (26, 'TurmiTim', 'Genauer gesagt bei Bauer Herbert in der roten Scheune', '2026-05-13 15:18:12', 12, 25);
INSERT INTO "ForumPost" ("PostID", "UserName", "PostText", "DateCreated", "ThreadID", "ParentID") VALUES (27, 'Tommo', 'Alles klar Danke :)', '2026-05-13 15:18:42', 12, 25);
INSERT INTO "ForumPost" ("PostID", "UserName", "PostText", "DateCreated", "ThreadID", "ParentID") VALUES (28, 'Tommo', 'Ich habe in letzter Zeit viele Angelsächsiche Kollegen in ihrer Muttersprache schreiben sehen. Lasst das Bitte hier wird Deutsch gesprochen!', '2026-05-13 15:20:30', 13, NULL);
INSERT INTO "ForumPost" ("PostID", "UserName", "PostText", "DateCreated", "ThreadID", "ParentID") VALUES (29, 'JoeHiden', 'Sorry', '2026-05-13 15:22:05', 13, 28);
INSERT INTO "ForumPost" ("PostID", "UserName", "PostText", "DateCreated", "ThreadID", "ParentID") VALUES (30, 'JeremyBliss', 'Sorry mein Freund', '2026-05-13 15:22:33', 13, 28);
INSERT INTO "ForumPost" ("PostID", "UserName", "PostText", "DateCreated", "ThreadID", "ParentID") VALUES (31, 'Rollo23', 'Habe heute morgen 3 Graureiher am Anfang des Gottlieber Wegs gesehen.', '2026-05-13 15:42:03', 14, NULL);
INSERT INTO "ForumPost" ("PostID", "UserName", "PostText", "DateCreated", "ThreadID", "ParentID") VALUES (32, 'Gundula', 'Da war ich heute morgen auch. Aber ich meine einer von Ihnen war ein Purpurreiher', '2026-05-13 15:42:33', 14, 31);
INSERT INTO "ForumPost" ("PostID", "UserName", "PostText", "DateCreated", "ThreadID", "ParentID") VALUES (33, 'Rollo23', 'Das glaube ich nicht, ich bin mir sicher, dass es Graureiher waren.', '2026-05-13 15:42:58', 14, 32);
INSERT INTO "ForumPost" ("PostID", "UserName", "PostText", "DateCreated", "ThreadID", "ParentID") VALUES (34, 'Gundula', 'Doch ganz sicher!', '2026-05-13 15:43:28', 14, 33);
INSERT INTO "ForumPost" ("PostID", "UserName", "PostText", "DateCreated", "ThreadID", "ParentID") VALUES (35, 'Hans15', 'Ich habe auch einen Purpurreiher gesehen!', '2026-05-13 15:44:10', 14, 32);
INSERT INTO "ForumPost" ("PostID", "UserName", "PostText", "DateCreated", "ThreadID", "ParentID") VALUES (36, 'TurmiTim', 'Zu welcher Uhrzeit war das genau?', '2026-05-13 15:44:47', 14, 31);
INSERT INTO "ForumPost" ("PostID", "UserName", "PostText", "DateCreated", "ThreadID", "ParentID") VALUES (37, 'Rollo23', 'So gegen 7Uhr', '2026-05-13 15:45:00', 14, 36);
INSERT INTO "ForumPost" ("PostID", "UserName", "PostText", "DateCreated", "ThreadID", "ParentID") VALUES (38, 'FederLisa', 'Hey Leute, habe heut morgen ein Blaukelchen vom Federseesteg aus beobachtet. Vielleicht ist es noch da', '2026-05-13 15:46:18', 15, NULL);
INSERT INTO "ForumPost" ("PostID", "UserName", "PostText", "DateCreated", "ThreadID", "ParentID") VALUES (39, 'Rollo23', 'Danke für die Info, werde dem nachgehen', '2026-05-13 15:47:46', 15, 38);
INSERT INTO "ForumPost" ("PostID", "UserName", "PostText", "DateCreated", "ThreadID", "ParentID") VALUES (40, 'TurmiTim', 'Sehr cool, zum Federsee gehe ich nächste Woche. Hoffentlich ist es noch da.', '2026-05-13 15:48:21', 15, 38);
INSERT INTO "ForumPost" ("PostID", "UserName", "PostText", "DateCreated", "ThreadID", "ParentID") VALUES (41, 'TurmiTim', 'Das wäre für mich ein Lifer!', '2026-05-13 15:49:31', 15, 40);
INSERT INTO "ForumPost" ("PostID", "UserName", "PostText", "DateCreated", "ThreadID", "ParentID") VALUES (42, 'JonathanBlaumerle', 'Den hatte ich auch schon gesehen, schöner Vogel.', '2026-05-13 15:51:38', 15, 38);

-- COMMIT;
PRAGMA foreign_keys = ON;
