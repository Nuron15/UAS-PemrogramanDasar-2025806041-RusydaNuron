# Student Management System

Aplikasi web untuk mengelola data mahasiswa, kelas, dan nilai — dibangun sebagai proyek UAS Pemrograman Dasar.

**Nama**: Rusyda Nuron
**NIM**: 2025806041
**Kelas**: TI 2 Pagi
**Tema**: Student Management System (Pilihan #6)

## Deskripsi

Aplikasi ini memungkinkan pengelolaan data mahasiswa dan kelas secara penuh (CRUD), dengan relasi antar tabel (kelas → mahasiswa → nilai), REST API, serta berbagai fitur tambahan untuk meningkatkan pengalaman pengguna.

## Fitur

### Fitur Utama
- CRUD lengkap untuk data **Mahasiswa** (tambah, lihat, edit, hapus)
- CRUD lengkap untuk data **Kelas** (tambah, lihat, edit, hapus)
- Relasi antar tabel: `kelas` → `mahasiswa` → `nilai`
- Validasi form (field wajib, format email, dsb.)

### Fitur Tambahan (Kreativitas)
- **Search** — pencarian mahasiswa berdasarkan nama/NIM secara langsung (live search)
- **Filter** — menyaring data mahasiswa berdasarkan kelas
- **Pagination** — navigasi data mahasiswa per halaman
- **Export CSV** — mengunduh data mahasiswa (sesuai hasil filter/pencarian aktif) ke file CSV
- **Upload Gambar** — foto profil mahasiswa dan foto/logo kelas
- **Dashboard Statistik** — ringkasan total mahasiswa, total kelas, dan rata-rata nilai secara real-time
- **Dark Mode** — tampilan gelap yang bisa diaktifkan/nonaktifkan
- **Toast Notification** — notifikasi non-blocking pengganti `alert()` bawaan browser
- **Loading Spinner** — indikator visual saat data sedang dimuat
- **Responsive Design** — tampilan menyesuaikan di layar mobile
- **Animasi** — transisi halus pada notifikasi dan indikator loading

## Teknologi

- **Backend**: Node.js, Express.js
- **Database**: MySQL (mysql2)
- **Frontend**: HTML, CSS, JavaScript (vanilla)
- **Upload File**: Multer
- **Lainnya**: dotenv, cors

## Struktur Project

```
UAS-PemrogramanDasar-2025806041-RusydaNuron/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── mahasiswaController.js
│   │   └── kelasController.js
│   ├── middleware/
│   │   └── upload.js
│   ├── models/
│   │   ├── mahasiswaModel.js
│   │   └── kelasModel.js
│   ├── routes/
│   │   ├── mahasiswaRoutes.js
│   │   ├── kelasRoutes.js
│   │   └── statsRoutes.js
│   ├── app.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── assets/
│   │   ├── logo.svg
│   │   └── favicon.svg
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── app.js
│   ├── uploads/
│   │   └── (folder penyimpanan foto yang diupload pengguna)
│   └── index.html
├── database/
│   └── database.sql
├── screenshots/
│   ├── dashboard-light.png
│   ├── dashboard-dark.png
│   ├── database-phpmyadmin.png
│   ├── form-kelas.png
│   ├── tabel-mahasiswa.png
│   ├── filter-pagination.png
│   └── upload-gambar.png
├── .gitignore
├── LICENSE
└── README.md
```

## Cara Menjalankan

1. **Clone repository**
   ```bash
   git clone https://github.com/Nuron15/UAS-PemrogramanDasar-2025806041-RusydaNuron.git
   cd UAS-PemrogramanDasar-2025806041-RusydaNuron
   ```

2. **Import database**
   - Buka phpMyAdmin, buat database baru bernama `student_management`
   - Import file `database/database.sql`

3. **Setup backend**
   ```bash
   cd backend
   npm install
   ```
   - Copy `.env.example` menjadi `.env`, sesuaikan isinya dengan konfigurasi database lokal
   - Jalankan server:
   ```bash
   node app.js
   ```
   - Server akan berjalan di `http://localhost:3000`

4. **Jalankan frontend**
   - Buka file `frontend/index.html` langsung di browser

## Endpoint API

| Method | Endpoint | Keterangan |
|--------|----------|------------|
| GET | `/api/mahasiswa` | Ambil semua data mahasiswa |
| GET | `/api/mahasiswa/:id` | Ambil data mahasiswa berdasarkan ID |
| POST | `/api/mahasiswa` | Tambah mahasiswa baru (mendukung upload foto) |
| PUT | `/api/mahasiswa/:id` | Update data mahasiswa (mendukung upload foto) |
| DELETE | `/api/mahasiswa/:id` | Hapus data mahasiswa |
| GET | `/api/kelas` | Ambil semua data kelas |
| GET | `/api/kelas/:id` | Ambil data kelas berdasarkan ID |
| POST | `/api/kelas` | Tambah kelas baru (mendukung upload foto) |
| PUT | `/api/kelas/:id` | Update data kelas (mendukung upload foto) |
| DELETE | `/api/kelas/:id` | Hapus data kelas |
| GET | `/api/stats` | Ambil ringkasan statistik (total mahasiswa, total kelas, rata-rata nilai) |

## Screenshot

### Dashboard (Light Mode)
![Dashboard Light](screenshots/dashboard-light.png)

### Dashboard (Dark Mode)
![Dashboard Dark](screenshots/dashboard-dark.png)

### Struktur Database
![Database](screenshots/database-phpmyadmin.png)

### Form Kelas
![Form Kelas](screenshots/form-kelas.png)

### Tabel Mahasiswa
![Tabel Mahasiswa](screenshots/tabel-mahasiswa.png)

### Filter & Pagination
![Filter Pagination](screenshots/filter-pagination.png)

### Upload Gambar
![Upload Gambar](screenshots/upload-gambar.png)

## Repository

https://github.com/Nuron15/UAS-PemrogramanDasar-2025806041-RusydaNuron
