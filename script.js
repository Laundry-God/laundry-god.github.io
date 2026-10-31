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
        
    }, 10000);
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
// 8. ALUR FINAL: KLIK WA -> MUNCUL TOMBOL KONFIRMASI & TOAST NAMA USER -> KE WA
// ==========================================
document.addEventListener("DOMContentLoaded", function() {
    const waEstimasiBtn = document.getElementById("wa-link");
    
    // Bikin elemen tombol konfirmasi secara otomatis lewat JS biar gak usah edit HTML
    let btnKonfirmasiInline = document.getElementById("btnKonfirmasiInline");
    if (!btnKonfirmasiInline && waEstimasiBtn) {
        btnKonfirmasiInline = document.createElement("button");
        btnKonfirmasiInline.id = "btnKonfirmasiInline";
        btnKonfirmasiInline.innerText = "✅ KONFIRMASI KE WA";
        btnKonfirmasiInline.style.cssText = `
            display: none;
            width: 100%;
            margin-top: 10px;
            background-color: #16a34a;
            color: white;
            border: none;
            padding: 12px;
            border-radius: 10px;
            font-weight: bold;
            font-size: 1rem;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(22, 163, 74, 0.3);
        `;
        // Selipkan tepat di bawah tombol WA utama
        waEstimasiBtn.parentNode.insertBefore(btnKonfirmasiInline, waEstimasiBtn.nextSibling);
    }

    if (waEstimasiBtn && btnKonfirmasiInline) {
        // LANGKAH 1: User pencet tombol 'pesan hasil estimasi via WA'
        waEstimasiBtn.addEventListener('click', function(e) {
            e.preventDefault(); // Tahan biar gak langsung ke WA

            const savedName = localStorage.getItem('user_laundry_name') || 'Yusnan';
            const selectLayanan = document.getElementById("layanan");
            const inputBerat = document.getElementById("berat");

            const namaLayanan = selectLayanan ? selectLayanan.options[selectLayanan.selectedIndex].text.split('-')[0].trim() : "Layanan";
            const berat = inputBerat ? inputBerat.value : "1";

            // LANGKAH 2: Tombol KONFIRMASI muncul
            btnKonfirmasiInline.style.display = "block";
            btnKonfirmasiInline.innerText = `✅ KONFIRMASI KE WA (${savedName})`;
            btnKonfirmasiInline.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

            // LANGKAH 3: Pop-up "user baru saja memesan..." muncul di bawah
            const toast = document.getElementById("toast");
            const namaEl = document.getElementById("toast-nama");
            const pesananEl = document.getElementById("toast-pesanan");

            if (toast && namaEl && pesananEl) {
                namaEl.innerText = savedName;
                pesananEl.innerText = `Baru saja memesan ${namaLayanan} ${berat}kg`;
                toast.classList.add("show");

                // Biarkan pop-up nangkring selama 6 detik
                setTimeout(() => {
                    toast.classList.remove("show");
                }, 6000);
            }
        });

        // LANGKAH 4: Pas user pencet tombol KONFIRMASI -> Baru beneran menuju ke WA
        btnKonfirmasiInline.addEventListener('click', function() {
            const selectLayanan = document.getElementById("layanan");
            const inputBerat = document.getElementById("berat");

            const namaLayanan = selectLayanan ? selectLayanan.options[selectLayanan.selectedIndex].text : "Layanan";
            const berat = inputBerat ? inputBerat.value : "1";
            const totalElem = document.getElementById("total-harga");
            const totalFormatted = totalElem ? totalElem.innerText : "Rp 0";
            const savedName = localStorage.getItem('user_laundry_name') || 'Yusnan';

            const nomorWA = "6283187521130";
            const pesan = `Halo Laundry God, saya ${savedName} mau pesan:\n- Layanan: ${namaLayanan}\n- Berat: ${berat} kg\n- ${totalFormatted}`;
            
            // Gas buka WhatsApp
            window.open(`https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`, '_blank');
            
            // Sembunyikan lagi tombol konfirmasinya
            btnKonfirmasiInline.style.display = "none";
        });
    }
});
