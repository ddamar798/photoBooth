// Mendapatkan elemen dari DOM
const video = document.getElementById('video'); // Elemen video untuk webcam
const canvas = document.getElementById('canvas'); // Kanvas untuk menyimpan foto
const captureButton = document.getElementById('capture'); // Tombol ambil foto
const saveButton = document.getElementById('save'); // Tombol simpan foto
const templateSelect = document.getElementById('templateSelect'); // Dropdown pemilihan template
const photo = document.getElementById('photo'); // Elemen gambar untuk pratinjau
const preview = document.getElementById('preview'); // Kontainer pratinjau
const ctx = canvas.getContext('2d'); // Konteks 2D untuk kanvas

// Fungsi untuk memulai webcam
async function startWebcam() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true }); // Meminta akses webcam
        video.srcObject = stream; // Menetapkan stream webcam ke elemen video
    } catch (err) {
        console.error("Error mengakses webcam:", err); // Menangani error jika webcam tidak tersedia
        alert("Tidak dapat mengakses webcam. Pastikan webcam tersedia dan izinkan akses.");
    }
}

// Mengatur ukuran kanvas sama dengan video
function setCanvasSize() {
    canvas.width = video.videoWidth; // Menetapkan lebar kanvas
    canvas.height = video.videoHeight; // Menetapkan tinggi kanvas 
}

// Fungsi untuk mengambil foto
function capturePhoto() {
    setCanvasSize(); // Mengatur ukuran kanvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height); // Menggambar frame video ke kanvas
    const template = templateSelect.value; // Mendapatkan template yang dipilih
    if (template !== 'none') {
        applyTemplate(template); // Menerapkan template jika dipilih
    } else {
        photo.src = canvas.toDataURL('image/png'); // Menampilkan foto di pratinjau tanpa template
        preview.classList.remove('hidden'); // Menampilkan pratinjau
        saveButton.classList.remove('hidden'); // Menampilkan tombol simpan
    }
}

// Fungsi untuk menerapkan template
function applyTemplate(templatePath) {
    const templateImg = new Image(); // Membuat objek gambar untuk template
    templateImg.src = templatePath; // Mengatur sumber gambar template
    templateImg.onload = () => {
        setCanvasSize(); // Mengatur ulang ukuran kanvas
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height); // Menggambar frame video
        ctx.drawImage(templateImg, 0, 0, canvas.width, canvas.height); // Menggambar template di atasnya
        photo.src = canvas.toDataURL('image/png'); // Menampilkan hasil di pratinjau
        preview.classList.remove('hidden'); // Menampilkan pratinjau
        saveButton.classList.remove('hidden'); // Menampilkan tombol simpan
    };
}

// Fungsi untuk menyimpan foto
function savePhoto() {
    const link = document.createElement('a'); // Membuat elemen link untuk unduhan
    link.href = photo.src; // Menetapkan sumber gambar ke link
    link.download = 'photobooth.png'; // Nama file untuk unduhan
    link.click(); // Memicu unduhan
}

// Menambahkan event listener untuk tombol ambil foto
captureButton.addEventListener('click', capturePhoto); // Memanggil fungsi capturePhoto saat tombol diklik

// Menambahkan event listener untuk tombol simpan
saveButton.addEventListener('click', savePhoto); // Memanggil fungsi savePhoto saat tombol diklik

// Memulai webcam saat halaman dimuat
startWebcam();