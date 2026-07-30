// File ini adalah "otak" frontend — menghubungkan tampilan (HTML) 
// dengan backend lewat Fetch API. Isinya: ambil data dari server, 
// tampilkan ke tabel, kirim data form (tambah/edit/hapus) termasuk
// upload foto, validasi input, search, filter kelas, pagination,
// export CSV, dark mode, loading spinner, dan toast notification.

const API_URL = 'http://localhost:3000/api';
const UPLOADS_URL = 'http://localhost:3000/uploads';

// ===== LOADING SPINNER & TOAST NOTIFICATION =====
const spinner = document.getElementById('loading-spinner');
const toastContainer = document.getElementById('toast-container');

const showSpinner = () => spinner.classList.remove('hidden');
const hideSpinner = () => spinner.classList.add('hidden');

const showToast = (message, type = 'success') => {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => toast.remove(), 300);
    }, 2500);
};

// Membuat elemen <img> atau placeholder untuk foto di tabel
const renderFoto = (filename) => {
    if (filename) {
        return `<img src="${UPLOADS_URL}/${filename}" class="foto-tabel" alt="Foto">`;
    }
    return `<span class="foto-placeholder">N/A</span>`;
};


// ===== ELEMEN MAHASISWA =====
const form = document.getElementById('mahasiswa-form');
const tbody = document.getElementById('mahasiswa-tbody');
const kelasSelect = document.getElementById('kelas_id');
const filterKelasSelect = document.getElementById('filter-kelas');
const formTitle = document.getElementById('form-title');
const submitBtn = document.getElementById('submit-btn');
const cancelBtn = document.getElementById('cancel-btn');
const mahasiswaIdField = document.getElementById('mahasiswa-id');
const fotoMahasiswaInput = document.getElementById('foto_mahasiswa');

// Elemen pagination
const prevPageBtn = document.getElementById('prev-page-btn');
const nextPageBtn = document.getElementById('next-page-btn');
const pageInfo = document.getElementById('page-info');

// Elemen export CSV
const exportCsvBtn = document.getElementById('export-csv-btn');

let allMahasiswa = [];
let currentFilteredData = [];
let currentPage = 1;
const ITEMS_PER_PAGE = 5;

// Ambil & render daftar kelas ke dropdown form mahasiswa DAN dropdown filter tabel
const loadKelas = async () => {
    try {
        const res = await fetch(`${API_URL}/kelas`);
        const data = await res.json();

        kelasSelect.innerHTML = '<option value="">-- Pilih Kelas --</option>';
        filterKelasSelect.innerHTML = '<option value="">-- Semua Kelas --</option>';

        data.forEach(kelas => {
            const option = document.createElement('option');
            option.value = kelas.id;
            option.textContent = kelas.nama_kelas;
            kelasSelect.appendChild(option);

            const filterOption = document.createElement('option');
            filterOption.value = kelas.id;
            filterOption.textContent = kelas.nama_kelas;
            filterKelasSelect.appendChild(filterOption);
        });
    } catch (error) {
        console.error('Gagal memuat kelas:', error);
        showToast('Gagal memuat daftar kelas', 'error');
    }
};

// Menampilkan data mahasiswa ke tabel
const renderMahasiswaTable = (data) => {
    tbody.innerHTML = '';
    data.forEach(m => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${renderFoto(m.foto)}</td>
            <td>${m.nim}</td>
            <td>${m.nama}</td>
            <td>${m.email || '-'}</td>
            <td>${m.jenis_kelamin}</td>
            <td>${m.nama_kelas || '-'}</td>
            <td>
                <button class="btn-edit" data-id="${m.id}">Edit</button>
                <button class="btn-delete" data-id="${m.id}">Hapus</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
};

const renderPage = () => {
    const totalPages = Math.max(1, Math.ceil(currentFilteredData.length / ITEMS_PER_PAGE));
    if (currentPage > totalPages) currentPage = totalPages;

    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const pageData = currentFilteredData.slice(start, end);

    renderMahasiswaTable(pageData);

    pageInfo.textContent = `Halaman ${currentPage} dari ${totalPages}`;
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage === totalPages;
};

prevPageBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        renderPage();
    }
});

nextPageBtn.addEventListener('click', () => {
    const totalPages = Math.ceil(currentFilteredData.length / ITEMS_PER_PAGE);
    if (currentPage < totalPages) {
        currentPage++;
        renderPage();
    }
});

exportCsvBtn.addEventListener('click', () => {
    if (currentFilteredData.length === 0) {
        showToast('Tidak ada data untuk diexport', 'error');
        return;
    }

    const headers = ['NIM', 'Nama', 'Email', 'Jenis Kelamin', 'Kelas'];
    const rows = currentFilteredData.map(m => [
        m.nim,
        m.nama,
        m.email || '',
        m.jenis_kelamin,
        m.nama_kelas || ''
    ]);

    let csvContent = 'sep=,\n' + headers.join(',') + '\n';
    rows.forEach(row => {
        const escapedRow = row.map(field => `"${String(field).replace(/"/g, '""')}"`);
        csvContent += escapedRow.join(',') + '\n';
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `data_mahasiswa_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);

    showToast('Data berhasil diexport');
});

const loadMahasiswa = async () => {
    showSpinner();
    try {
        const res = await fetch(`${API_URL}/mahasiswa`);
        allMahasiswa = await res.json();
        currentFilteredData = allMahasiswa;
        currentPage = 1;
        renderPage();
    } catch (error) {
        console.error('Gagal memuat mahasiswa:', error);
        showToast('Gagal memuat data mahasiswa', 'error');
    } finally {
        hideSpinner();
    }
};

const applyFilters = () => {
    const keyword = document.getElementById('search-mahasiswa').value.toLowerCase();
    const kelasId = filterKelasSelect.value;

    let filtered = allMahasiswa.filter(m =>
        m.nama.toLowerCase().includes(keyword) || m.nim.toLowerCase().includes(keyword)
    );

    if (kelasId) {
        filtered = filtered.filter(m => String(m.kelas_id) === kelasId);
    }

    currentFilteredData = filtered;
    currentPage = 1;
    renderPage();
};

document.getElementById('search-mahasiswa').addEventListener('input', applyFilters);
filterKelasSelect.addEventListener('change', applyFilters);

const validateForm = () => {
    let valid = true;
    document.querySelectorAll('#mahasiswa-form .error-text').forEach(el => el.textContent = '');

    const nim = document.getElementById('nim').value.trim();
    const nama = document.getElementById('nama').value.trim();
    const email = document.getElementById('email').value.trim();

    if (!nim) {
        document.getElementById('error-nim').textContent = 'NIM wajib diisi';
        valid = false;
    }
    if (!nama) {
        document.getElementById('error-nama').textContent = 'Nama wajib diisi';
        valid = false;
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        document.getElementById('error-email').textContent = 'Format email tidak valid';
        valid = false;
    }

    return valid;
};

const resetForm = () => {
    form.reset();
    mahasiswaIdField.value = '';
    formTitle.textContent = 'Tambah Mahasiswa';
    submitBtn.textContent = 'Simpan';
};

// Submit form mahasiswa pakai FormData supaya bisa kirim file foto sekaligus
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append('nim', document.getElementById('nim').value.trim());
    formData.append('nama', document.getElementById('nama').value.trim());
    formData.append('email', document.getElementById('email').value.trim());
    formData.append('jenis_kelamin', document.getElementById('jenis_kelamin').value);
    formData.append('kelas_id', document.getElementById('kelas_id').value || '');
    if (fotoMahasiswaInput.files[0]) {
        formData.append('foto', fotoMahasiswaInput.files[0]);
    }

    const id = mahasiswaIdField.value;
    showSpinner();

    try {
        if (id) {
            await fetch(`${API_URL}/mahasiswa/${id}`, { method: 'PUT', body: formData });
            showToast('Mahasiswa berhasil diupdate');
        } else {
            await fetch(`${API_URL}/mahasiswa`, { method: 'POST', body: formData });
            showToast('Mahasiswa berhasil ditambahkan');
        }
        resetForm();
        loadMahasiswa();
        loadStats();
    } catch (error) {
        showToast('Gagal menyimpan data: ' + error.message, 'error');
    } finally {
        hideSpinner();
    }
});

tbody.addEventListener('click', async (e) => {
    const id = e.target.dataset.id;
    if (!id) return;

    if (e.target.classList.contains('btn-delete')) {
        if (!confirm('Yakin hapus mahasiswa ini?')) return;
        showSpinner();
        try {
            await fetch(`${API_URL}/mahasiswa/${id}`, { method: 'DELETE' });
            showToast('Mahasiswa berhasil dihapus');
            loadMahasiswa();
            loadStats();
        } catch (error) {
            showToast('Gagal menghapus data: ' + error.message, 'error');
        } finally {
            hideSpinner();
        }
    }

    if (e.target.classList.contains('btn-edit')) {
        try {
            const res = await fetch(`${API_URL}/mahasiswa/${id}`);
            const data = await res.json();

            mahasiswaIdField.value = data.id;
            document.getElementById('nim').value = data.nim;
            document.getElementById('nama').value = data.nama;
            document.getElementById('email').value = data.email || '';
            document.getElementById('jenis_kelamin').value = data.jenis_kelamin;
            document.getElementById('kelas_id').value = data.kelas_id || '';

            formTitle.textContent = 'Edit Mahasiswa';
            submitBtn.textContent = 'Update';
        } catch (error) {
            showToast('Gagal memuat data: ' + error.message, 'error');
        }
    }
});

cancelBtn.addEventListener('click', resetForm);


// ===== ELEMEN KELAS =====
const kelasForm = document.getElementById('kelas-form');
const kelasTbody = document.getElementById('kelas-tbody');
const kelasFormTitle = document.getElementById('kelas-form-title');
const kelasSubmitBtn = document.getElementById('kelas-submit-btn');
const kelasCancelBtn = document.getElementById('kelas-cancel-btn');
const kelasIdField = document.getElementById('kelas-id');
const fotoKelasInput = document.getElementById('foto_kelas');

const loadKelasTable = async () => {
    showSpinner();
    try {
        const res = await fetch(`${API_URL}/kelas`);
        const data = await res.json();
        kelasTbody.innerHTML = '';

        data.forEach(k => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${renderFoto(k.foto)}</td>
                <td>${k.nama_kelas}</td>
                <td>${k.wali_kelas || '-'}</td>
                <td>
                    <button class="btn-edit-kelas" data-id="${k.id}">Edit</button>
                    <button class="btn-delete-kelas" data-id="${k.id}">Hapus</button>
                </td>
            `;
            kelasTbody.appendChild(tr);
        });
    } catch (error) {
        console.error('Gagal memuat kelas:', error);
        showToast('Gagal memuat data kelas', 'error');
    } finally {
        hideSpinner();
    }
};

const validateKelasForm = () => {
    let valid = true;
    document.getElementById('error-nama_kelas').textContent = '';

    const namaKelas = document.getElementById('nama_kelas').value.trim();
    if (!namaKelas) {
        document.getElementById('error-nama_kelas').textContent = 'Nama kelas wajib diisi';
        valid = false;
    }
    return valid;
};

const resetKelasForm = () => {
    kelasForm.reset();
    kelasIdField.value = '';
    kelasFormTitle.textContent = 'Tambah Kelas';
    kelasSubmitBtn.textContent = 'Simpan';
};

// Submit form kelas pakai FormData supaya bisa kirim file foto sekaligus
kelasForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validateKelasForm()) return;

    const formData = new FormData();
    formData.append('nama_kelas', document.getElementById('nama_kelas').value.trim());
    formData.append('wali_kelas', document.getElementById('wali_kelas').value.trim());
    if (fotoKelasInput.files[0]) {
        formData.append('foto', fotoKelasInput.files[0]);
    }

    const id = kelasIdField.value;
    showSpinner();

    try {
        if (id) {
            await fetch(`${API_URL}/kelas/${id}`, { method: 'PUT', body: formData });
            showToast('Kelas berhasil diupdate');
        } else {
            await fetch(`${API_URL}/kelas`, { method: 'POST', body: formData });
            showToast('Kelas berhasil ditambahkan');
        }
        resetKelasForm();
        loadKelasTable();
        loadKelas();
        loadStats();
    } catch (error) {
        showToast('Gagal menyimpan data kelas: ' + error.message, 'error');
    } finally {
        hideSpinner();
    }
});

kelasTbody.addEventListener('click', async (e) => {
    const id = e.target.dataset.id;
    if (!id) return;

    if (e.target.classList.contains('btn-delete-kelas')) {
        if (!confirm('Yakin hapus kelas ini? Mahasiswa di kelas ini akan kehilangan referensi kelasnya.')) return;
        showSpinner();
        try {
            await fetch(`${API_URL}/kelas/${id}`, { method: 'DELETE' });
            showToast('Kelas berhasil dihapus');
            loadKelasTable();
            loadKelas();
            loadMahasiswa();
            loadStats();
        } catch (error) {
            showToast('Gagal menghapus kelas: ' + error.message, 'error');
        } finally {
            hideSpinner();
        }
    }

    if (e.target.classList.contains('btn-edit-kelas')) {
        try {
            const res = await fetch(`${API_URL}/kelas/${id}`);
            const data = await res.json();

            kelasIdField.value = data.id;
            document.getElementById('nama_kelas').value = data.nama_kelas;
            document.getElementById('wali_kelas').value = data.wali_kelas || '';

            kelasFormTitle.textContent = 'Edit Kelas';
            kelasSubmitBtn.textContent = 'Update';
        } catch (error) {
            showToast('Gagal memuat data kelas: ' + error.message, 'error');
        }
    }
});

kelasCancelBtn.addEventListener('click', resetKelasForm);


// ===== DASHBOARD STATISTIK =====
const loadStats = async () => {
    try {
        const res = await fetch(`${API_URL}/stats`);
        const data = await res.json();
        document.getElementById('stat-mahasiswa').textContent = data.total_mahasiswa;
        document.getElementById('stat-kelas').textContent = data.total_kelas;
        document.getElementById('stat-rata-nilai').textContent = data.rata_nilai;
    } catch (error) {
        console.error('Gagal memuat statistik:', error);
    }
};


// ===== DARK MODE =====
const darkModeToggle = document.getElementById('dark-mode-toggle');
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    darkModeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});


// ===== INISIALISASI =====
loadKelas();
loadMahasiswa();
loadKelasTable();
loadStats();