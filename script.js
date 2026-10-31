// 1. FUNGSI HITUNG ESTIMASI DAN UPDATE LINK WA
function hitungEstimasi() {
    const selectLayanan = document.getElementById("layanan");
    const inputBerat = document.getElementById("berat");
    
    const namaLayanan = selectLayanan ? selectLayanan.options[selectLayanan.selectedIndex].text : "Layanan";
    const harga = parseFloat(selectLayanan.value) || 0;
    const berat = parseFloat(inputBerat.value) || 0;

    const total = harga * berat;
    const totalFormatted = "Rp " + total.toLocaleString("id-ID");

    const totalElem = document.getElementById("total-harga");
    if (totalElem) {
        totalElem.innerText = "Total Estimasi: " + totalFormatted;
    }

    const waBtn = document.getElementById("wa-link");
    if (waBtn) {
        const nomorWA = "6283187521130"; // WA SUDAH FIX DI SINI
        const pesan = `Halo Laundry God, saya mau pesan:\n- Layanan: ${namaLayanan}\n- Berat: ${berat} kg\n- Total Estimasi: ${totalFormatted}`;
        waBtn.href = `https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`;
    }
}

// 2. FUNGSI KLIK KARTU LANGSUNG PILIH HARGA
function pilihLayanan(nilaiHarga) {
    const selectLayanan = document.getElementById("layanan");
    if (selectLayanan) {
        selectLayanan.value = nilaiHarga;
        hitungEstimasi(); 
        
        // Auto scroll turun ke kalkulator
        const areaCalc = document.getElementById("area-kalkulator");
        if (areaCalc) {
            areaCalc.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
}

// 3. FUNGSI JAM OPERASIONAL
function cekJamOperasional() {
    const statusElem = document.getElementById("status-buka");
    if (!statusElem) return;

    const jam = new Date().getHours();
    if (jam >= 8 && jam < 20) {
        statusElem.innerText = "🟢 Buka Hari Ini";
        statusElem.style.backgroundColor = "#dcfce7";
        statusElem.style.color = "#166534";
    } else {
        statusElem.innerText = "🔴 Tutup — Buka Jam 08.00";
        statusElem.style.backgroundColor = "#fee2e2";
        statusElem.style.color = "#991b1b";
    }
}

// 4. FUNGSI TOAST NOTIFIKASI MUNCUL HILANG DUMMY
function munculkanToast() {
    const toast = document.getElementById("toast");
    if (toast) {
        toast.classList.add("show");
        setTimeout(() => {
            toast.classList.remove("show");
        }, 4000); // Hilang setelah 4 detik
    }
}

// JALANKAN SEMUA SAAT WEB DIBUKA
document.addEventListener("DOMContentLoaded", function() {
    hitungEstimasi();
    cekJamOperasional();
    
    // Toast muncul 3 detik setelah web dibuka pertama kali
    setTimeout(munculkanToast, 3000);
});

// --- 5. BIKIN TOMBOL WA DIGESER SUPER SMOOTH (60FPS GPU ACCELERATED) ---
const waBtn = document.getElementById("btn-float-wa");
let isDragging = false;
let currentX = 0, currentY = 0;
let initialX = 0, initialY = 0;
let xOffset = 0, yOffset = 0;

if (waBtn) {
    waBtn.addEventListener('touchstart', function(e) {
        initialX = e.touches[0].clientX - xOffset;
        initialY = e.touches[0].clientY - yOffset;
        isDragging = false;
    }, { passive: false });

    waBtn.addEventListener('touchmove', function(e) {
        let currentTouchX = e.touches[0].clientX - initialX;
        let currentTouchY = e.touches[0].clientY - initialY;
        
        if (Math.abs(currentTouchX) > 5 || Math.abs(currentTouchY) > 5) {
            isDragging = true;
            e.preventDefault();
            
            currentX = currentTouchX;
            currentY = currentTouchY;
            
            waBtn.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
        }
    }, { passive: false });

    waBtn.addEventListener('touchend', function(e) {
        initialX = currentX;
        initialY = currentY;
        xOffset = currentX;
        yOffset = currentY;
    });

    waBtn.addEventListener('click', function(e) {
        if (isDragging) {
            e.preventDefault();
        }
    });
}

// --- 6. BIKIN POP-UP ORDERAN MUNCUL TERUS TIAP 8 DETIK (MURNI NAMA DUMMY ACAK) ---
function mulaiToastOtomatis() {
    const toast = document.getElementById("toast");
    const namaEl = document.getElementById("toast-nama");
    const pesananEl = document.getElementById("toast-pesanan");
    
    const daftarNama = ["Ahmad (Bandung)", "Rizky (Sukajadi)", "Siti (Coblong)", "Budi (Dago)", "Dewi (Lengkong)"];
    const daftarPesanan = ["Baru saja memesan Cuci Kiloan 4kg", "Baru saja memesan Cuci + Setrika 6kg", "Baru saja memesan Bed Cover Super", "Baru saja memesan Cuci Kiloan 3kg"];
    
    if(!toast) return;

    setInterval(() => {
        // Murni pakai acakan dummy bawaan biar gak ganggu nama user
        const randomNama = daftarNama[Math.floor(Math.random() * daftarNama.length)];
        const randomPesanan = daftarPesanan[Math.floor(Math.random() * daftarPesanan.length)];
        
        if (namaEl) namaEl.innerText = randomNama;
        if (pesananEl) pesananEl.innerText = randomPesanan;
        
        toast.classList.add("show");
        
        setTimeout(() => {
            toast.classList.remove("show");
        }, 8000);
        
    }, 8000);
}

document.addEventListener("DOMContentLoaded", function() {
    mulaiToastOtomatis();
});

// --- 7. LOGIKA ACCORDION FAQ (BUKA TUTUP) ---
function initAccordionFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        item.addEventListener('click', function() {
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            this.classList.toggle('active');
        });
    });
}

document.addEventListener("DOMContentLoaded", function() {
    initAccordionFAQ();
});

// ==========================================
// 8. LOGIKA NAMA USER (CUMA MUNCUL PAS KLIK WA ESTIMASI)
// ==========================================
document.addEventListener("DOMContentLoaded", function() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const userDropdown = document.getElementById('userDropdown');
    const inputNamaUser = document.getElementById('inputNamaUser');
    const btnSimpanNama = document.getElementById('btnSimpanNama');

    // Auto load nama terakhir yang diisi ke kolom input
    if (inputNamaUser && localStorage.getItem('user_laundry_name')) {
        inputNamaUser.value = localStorage.getItem('user_laundry_name');
    }

    // Toggle Menu Garis Tiga
    if (hamburgerBtn && userDropdown) {
        hamburgerBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            userDropdown.classList.toggle('active');
        });

        document.addEventListener('click', function(e) {
            if (!userDropdown.contains(e.target) && !hamburgerBtn.contains(e.target)) {
                userDropdown.classList.remove('active');
            }
        });
    }

    // Simpan Nama (Hanya Simpan ke Memori & Tutup Menu)
    if (btnSimpanNama) {
        btnSimpanNama.addEventListener('click', function() {
            const nama = inputNamaUser.value.trim();
            if (nama) {
                localStorage.setItem('user_laundry_name', nama);
                alert(`Nama '${nama}' berhasil disimpan!`);
                if (userDropdown) userDropdown.classList.remove('active');
            } else {
                alert('Isi nama kamu dulu, bro!');
            }
        });
    }

        // EKSEKUSI: HANYA PAS KLIK TOMBOL "Pesan Hasil Estimasi via WA" TOAST NAMA MUNCUL!
    const waEstimasiBtn = document.getElementById("wa-link");
    if (waEstimasiBtn) {
        waEstimasiBtn.addEventListener('click', function() {
            const savedName = localStorage.getItem('user_laundry_name') || 'Yoga';
            const selectLayanan = document.getElementById("layanan");
            const inputBerat = document.getElementById("berat");

            const namaLayanan = selectLayanan ? selectLayanan.options[selectLayanan.selectedIndex].text.split('-')[0].trim() : "Layanan";
            const berat = inputBerat ? inputBerat.value : "1";

            const toast = document.getElementById("toast");
            const namaEl = document.getElementById("toast-nama");
            const pesananEl = document.getElementById("toast-pesanan");

            if (toast && namaEl && pesananEl) {
                namaEl.innerText = savedName;
                pesananEl.innerText = `Baru saja memesan ${namaLayanan} ${berat}kg`;
                
                // Tampilkan toast
                toast.classList.add("show");

                // Gua ubah jadi 8000ms (8 detik) biar makin lama keliatan!
                setTimeout(() => {
                    toast.classList.remove("show");
                }, 8000);
            }
        });
    }
