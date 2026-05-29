const Database = require("better-sqlite3");
const path = require("path");

const db = new Database(path.join(__dirname, "birdlexicon.db"));

console.log("🔄 Resetting database...");

// Disable foreign keys temporarily
db.pragma("foreign_keys = OFF");

// Delete all data from tables (in correct order to avoid foreign key conflicts)
db.prepare("DELETE FROM ForumPost").run();
db.prepare("DELETE FROM ForumThread").run();
db.prepare("DELETE FROM BirdImage").run();
db.prepare("DELETE FROM Bird").run();
db.prepare("DELETE FROM Habitat").run();

// Reset AUTOINCREMENT counters
db.prepare("DELETE FROM sqlite_sequence WHERE name = 'Habitat'").run();
db.prepare("DELETE FROM sqlite_sequence WHERE name = 'Bird'").run();
db.prepare("DELETE FROM sqlite_sequence WHERE name = 'BirdImage'").run();
db.prepare("DELETE FROM sqlite_sequence WHERE name = 'ForumThread'").run();
db.prepare("DELETE FROM sqlite_sequence WHERE name = 'ForumPost'").run();

// Insert test data for Habitat
db.prepare("INSERT INTO Habitat (HabitatID, HabitatName) VALUES (1, 'Wald')").run();
db.prepare("INSERT INTO Habitat (HabitatID, HabitatName) VALUES (2, 'Stadt')").run();
db.prepare("INSERT INTO Habitat (HabitatID, HabitatName) VALUES (3, 'Wasser')").run();

// Insert test data for Bird
db.prepare(`INSERT INTO Bird (BirdID, CommonName, ScientificName, Height, Weight, HabitatID, AverageAge, Description)
    VALUES (1, 'Rotkehlchen', 'Erithacus rubecula', 14.0, 22.0, 1, 1, 'Das Rotkehlchen ist eine Vogelart aus der Familie der Fliegenschnäpper.')`).run();
db.prepare(`INSERT INTO Bird (BirdID, CommonName, ScientificName, Height, Weight, HabitatID, AverageAge, Description)
    VALUES (2, 'Rotmilan', 'Milvus milvus', 66.0, 1300.0, 1, 6, 'Der Rotmilan ist ein Greifvogel aus der Familie der Habichtartigen.')`).run();
db.prepare(`INSERT INTO Bird (BirdID, CommonName, ScientificName, Height, Weight, HabitatID, AverageAge, Description)
    VALUES (3, 'Amsel', 'Turdus merula', 25.0, 112.0, 1, 4, 'Die Amsel ist eine Vogelart aus der Familie der Drosseln.')`).run();
db.prepare(`INSERT INTO Bird (BirdID, CommonName, ScientificName, Height, Weight, HabitatID, AverageAge, Description)
    VALUES (4, 'Graureiher', 'Ardea cinerea', 98.0, 2000.0, 1, 15, 'Der Graureiher ist eine Vogelart aus der Ordnung Pelecaniformes.')`).run();
db.prepare(`INSERT INTO Bird (BirdID, CommonName, ScientificName, Height, Weight, HabitatID, AverageAge, Description)
    VALUES (5, 'Kohlmeise', 'Parus major', 15.0, 22.0, 2, 2, 'Die Kohlmeise ist eine Vogelart aus der Familie der Meisen.')`).run();
db.prepare(`INSERT INTO Bird (BirdID, CommonName, ScientificName, Height, Weight, HabitatID, AverageAge, Description)
    VALUES (6, 'Kolkrabe', 'Corvus corax', 64.0, 1500.0, 2, 15, 'Der Kolkrabe ist eine Singvogelart aus der Familie der Rabenvögel.')`).run();
db.prepare(`INSERT INTO Bird (BirdID, CommonName, ScientificName, Height, Weight, HabitatID, AverageAge, Description)
    VALUES (7, 'Buntspecht', 'Dendrocopos major', 24.0, 90.0, 1, 5, 'Der Buntspecht ist eine Vogelart aus der Familie der Spechte.')`).run();
db.prepare(`INSERT INTO Bird (BirdID, CommonName, ScientificName, Height, Weight, HabitatID, AverageAge, Description)
    VALUES (8, 'Stockente', 'Anas platyrhynchos', 60.0, 1400.0, 3, 5, 'Die Stockente ist eine Vogelart aus der Familie der Entenvögel.')`).run();
db.prepare(`INSERT INTO Bird (BirdID, CommonName, ScientificName, Height, Weight, HabitatID, AverageAge, Description)
    VALUES (9, 'Uhu', 'Bubo bubo', 75.0, 3000.0, 1, 20, 'Der Uhu ist eine Vogelart aus der Gattung der Uhus.')`).run();

// Insert test data for BirdImage
db.prepare("INSERT INTO BirdImage (ImageID, BirdID, ImagePath, IsMainImage) VALUES (6, 1, '\\images\\birds\\Rotkehlchen.jpg', 1)").run();
db.prepare("INSERT INTO BirdImage (ImageID, BirdID, ImagePath, IsMainImage) VALUES (8, 2, '\\images\\birds\\Rotmilan.jpg', 1)").run();
db.prepare("INSERT INTO BirdImage (ImageID, BirdID, ImagePath, IsMainImage) VALUES (9, 3, '\\images\\birds\\Amsel.jpg', 1)").run();
db.prepare("INSERT INTO BirdImage (ImageID, BirdID, ImagePath, IsMainImage) VALUES (10, 4, '\\images\\birds\\Graureiher.jpg', 1)").run();
db.prepare("INSERT INTO BirdImage (ImageID, BirdID, ImagePath, IsMainImage) VALUES (11, 5, '\\images\\birds\\Kohlmeise.jpg', 1)").run();
db.prepare("INSERT INTO BirdImage (ImageID, BirdID, ImagePath, IsMainImage) VALUES (12, 6, '\\images\\birds\\Kolkrabe.jpg', 1)").run();
db.prepare("INSERT INTO BirdImage (ImageID, BirdID, ImagePath, IsMainImage) VALUES (13, 7, '\\images\\birds\\Buntspecht.jpg', 1)").run();
db.prepare("INSERT INTO BirdImage (ImageID, BirdID, ImagePath, IsMainImage) VALUES (14, 8, '\\images\\birds\\Stockente.jpg', 1)").run();
db.prepare("INSERT INTO BirdImage (ImageID, BirdID, ImagePath, IsMainImage) VALUES (15, 9, '\\images\\birds\\Uhu.jpg', 1)").run();

// Insert test data for ForumThread
db.prepare("INSERT INTO ForumThread (ThreadID, ThreadTitle) VALUES (12, 'Turmfalke Sichtung in Balingen')").run();
db.prepare("INSERT INTO ForumThread (ThreadID, ThreadTitle) VALUES (13, 'Redet bitte Deutsch im Forum!')").run();
db.prepare("INSERT INTO ForumThread (ThreadID, ThreadTitle) VALUES (14, 'Drei Graureiher im Wollried')").run();
db.prepare("INSERT INTO ForumThread (ThreadID, ThreadTitle) VALUES (15, 'Blaukehlchen am Federseesteg')").run();

// Insert test data for ForumPost
db.prepare("INSERT INTO ForumPost (PostID, UserName, PostText, DateCreated, ThreadID, ParentID) VALUES (22, 'TurmiTim', 'Habe heute einen Turmfalken in Balingen gesehen', '2026-05-13 15:16:17', 12, NULL)").run();
db.prepare("INSERT INTO ForumPost (PostID, UserName, PostText, DateCreated, ThreadID, ParentID) VALUES (23, 'Tommo', 'Wirklich? Wo hast Du den gesehen', '2026-05-13 15:16:38', 12, 22)").run();
db.prepare("INSERT INTO ForumPost (PostID, UserName, PostText, DateCreated, ThreadID, ParentID) VALUES (24, 'GabyGraugans', 'Sag mal wo', '2026-05-13 15:17:00', 12, 22)").run();
db.prepare("INSERT INTO ForumPost (PostID, UserName, PostText, DateCreated, ThreadID, ParentID) VALUES (25, 'TurmiTim', 'Es war beim Bauernhof in Frommern', '2026-05-13 15:17:41', 12, 23)").run();
db.prepare("INSERT INTO ForumPost (PostID, UserName, PostText, DateCreated, ThreadID, ParentID) VALUES (26, 'TurmiTim', 'Genauer gesagt bei Bauer Herbert in der roten Scheune', '2026-05-13 15:18:12', 12, 25)").run();
db.prepare("INSERT INTO ForumPost (PostID, UserName, PostText, DateCreated, ThreadID, ParentID) VALUES (27, 'Tommo', 'Alles klar Danke :)', '2026-05-13 15:18:42', 12, 25)").run();
db.prepare("INSERT INTO ForumPost (PostID, UserName, PostText, DateCreated, ThreadID, ParentID) VALUES (28, 'Tommo', 'Ich habe in letzter Zeit viele Angelsächsiche Kollegen in ihrer Muttersprache schreiben sehen. Lasst das Bitte hier wird Deutsch gesprochen!', '2026-05-13 15:20:30', 13, NULL)").run();
db.prepare("INSERT INTO ForumPost (PostID, UserName, PostText, DateCreated, ThreadID, ParentID) VALUES (29, 'JoeHiden', 'Sorry', '2026-05-13 15:22:05', 13, 28)").run();
db.prepare("INSERT INTO ForumPost (PostID, UserName, PostText, DateCreated, ThreadID, ParentID) VALUES (30, 'JeremyBliss', 'Sorry mein Freund', '2026-05-13 15:22:33', 13, 28)").run();
db.prepare("INSERT INTO ForumPost (PostID, UserName, PostText, DateCreated, ThreadID, ParentID) VALUES (31, 'Rollo23', 'Habe heute morgen 3 Graureiher am Anfang des Gottlieber Wegs gesehen.', '2026-05-13 15:42:03', 14, NULL)").run();
db.prepare("INSERT INTO ForumPost (PostID, UserName, PostText, DateCreated, ThreadID, ParentID) VALUES (32, 'Gundula', 'Da war ich heute morgen auch. Aber ich meine einer von Ihnen war ein Purpurreiher', '2026-05-13 15:42:33', 14, 31)").run();
db.prepare("INSERT INTO ForumPost (PostID, UserName, PostText, DateCreated, ThreadID, ParentID) VALUES (33, 'Rollo23', 'Das glaube ich nicht, ich bin mir sicher, dass es Graureiher waren.', '2026-05-13 15:42:58', 14, 32)").run();
db.prepare("INSERT INTO ForumPost (PostID, UserName, PostText, DateCreated, ThreadID, ParentID) VALUES (34, 'Gundula', 'Doch ganz sicher!', '2026-05-13 15:43:28', 14, 33)").run();
db.prepare("INSERT INTO ForumPost (PostID, UserName, PostText, DateCreated, ThreadID, ParentID) VALUES (35, 'Hans15', 'Ich habe auch einen Purpurreiher gesehen!', '2026-05-13 15:44:10', 14, 32)").run();
db.prepare("INSERT INTO ForumPost (PostID, UserName, PostText, DateCreated, ThreadID, ParentID) VALUES (36, 'TurmiTim', 'Zu welcher Uhrzeit war das genau?', '2026-05-13 15:44:47', 14, 31)").run();
db.prepare("INSERT INTO ForumPost (PostID, UserName, PostText, DateCreated, ThreadID, ParentID) VALUES (37, 'Rollo23', 'So gegen 7Uhr', '2026-05-13 15:45:00', 14, 36)").run();
db.prepare("INSERT INTO ForumPost (PostID, UserName, PostText, DateCreated, ThreadID, ParentID) VALUES (38, 'FederLisa', 'Hey Leute, habe heut morgen ein Blaukelchen vom Federseesteg aus beobachtet. Vielleicht ist es noch da', '2026-05-13 15:46:18', 15, NULL)").run();
db.prepare("INSERT INTO ForumPost (PostID, UserName, PostText, DateCreated, ThreadID, ParentID) VALUES (39, 'Rollo23', 'Danke für die Info, werde dem nachgehen', '2026-05-13 15:47:46', 15, 38)").run();
db.prepare("INSERT INTO ForumPost (PostID, UserName, PostText, DateCreated, ThreadID, ParentID) VALUES (40, 'TurmiTim', 'Sehr cool, zum Federsee gehe ich nächste Woche. Hoffentlich ist es noch da.', '2026-05-13 15:48:21', 15, 38)").run();
db.prepare("INSERT INTO ForumPost (PostID, UserName, PostText, DateCreated, ThreadID, ParentID) VALUES (41, 'TurmiTim', 'Das wäre für mich ein Lifer!', '2026-05-13 15:49:31', 15, 40)").run();
db.prepare("INSERT INTO ForumPost (PostID, UserName, PostText, DateCreated, ThreadID, ParentID) VALUES (42, 'JonathanBlaumerle', 'Den hatte ich auch schon gesehen, schöner Vogel.', '2026-05-13 15:51:38', 15, 38)").run();

// Re-enable foreign keys
db.pragma("foreign_keys = ON");

db.close();

console.log("✅ Database reset complete!");
