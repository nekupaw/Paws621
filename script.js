// GCP-Projekt-ID und deinen Cloud Storage-Bucket-Namen hier eintragen
const projectId = 'paws621';
const bucketName = 'paws621stoarge'; // Korrigiere den Bucket-Namen hier

// GCP Storage-Client erstellen
const storage = new Storage({ projectId });

const fileInput = document.getElementById('fileInput');
const uploadStatus = document.getElementById('uploadStatus');

function uploadFile() {
    const file = fileInput.files[0];
    if (!file) {
        uploadStatus.textContent = 'Bitte wähle eine Datei aus.';
        return;
    }

    // Bucket-Referenz erstellen
    const bucket = storage.bucket(bucketName);

    // Datei-Referenz erstellen
    const fileRef = bucket.file(file.name);

    // Datei in den Bucket hochladen
    const blobStream = fileRef.createWriteStream();

    blobStream.on('error', (err) => {
        uploadStatus.textContent = `Fehler beim Hochladen: ${err.message}`;
    });

    blobStream.on('finish', () => {
        uploadStatus.textContent = 'Datei wurde erfolgreich hochgeladen.';
    });

    blobStream.end(file.buffer);
}
