-- Database: student_management
-- Student Management System - UAS Pemrograman Dasar
-- Rusyda Nuron - 2025806041 - TI 2 Pagi

CREATE DATABASE IF NOT EXISTS student_management;
USE student_management;

-- --------------------------------------------------------
-- Tabel: kelas
-- --------------------------------------------------------
CREATE TABLE kelas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama_kelas VARCHAR(100) NOT NULL,
    wali_kelas VARCHAR(100),
    foto VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- --------------------------------------------------------
-- Tabel: mahasiswa
-- --------------------------------------------------------
CREATE TABLE mahasiswa (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nim VARCHAR(20) NOT NULL UNIQUE,
    nama VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    jenis_kelamin ENUM('L', 'P') NOT NULL,
    kelas_id INT,
    foto VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (kelas_id) REFERENCES kelas(id) ON DELETE SET NULL
);

-- --------------------------------------------------------
-- Tabel: nilai
-- --------------------------------------------------------
CREATE TABLE nilai (
    id INT AUTO_INCREMENT PRIMARY KEY,
    mahasiswa_id INT NOT NULL,
    mata_kuliah VARCHAR(100) NOT NULL,
    nilai_angka DECIMAL(5,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (mahasiswa_id) REFERENCES mahasiswa(id) ON DELETE CASCADE
);

-- --------------------------------------------------------
-- Data dummy: kelas
-- --------------------------------------------------------
INSERT INTO kelas (nama_kelas, wali_kelas, foto) VALUES
('TI 2 Pagi', 'Rintis Mardika Sunarto', NULL),
('TI 2 Sore', 'Budi Santoso', NULL);

-- --------------------------------------------------------
-- Data dummy: mahasiswa
-- --------------------------------------------------------
INSERT INTO mahasiswa (nim, nama, email, jenis_kelamin, kelas_id, foto) VALUES
('2025806041', 'Rusyda Nuron', 'rusydanuron15@gmail.com', 'P', 1, NULL),
('2025806042', 'Contoh Mahasiswa', 'contoh@gmail.com', 'L', 1, NULL);

-- --------------------------------------------------------
-- Data dummy: nilai
-- --------------------------------------------------------
INSERT INTO nilai (mahasiswa_id, mata_kuliah, nilai_angka) VALUES
(1, 'Pemrograman Dasar', 88.00),
(1, 'Basis Data', 85.00),
(2, 'Pemrograman Dasar', 80.50);