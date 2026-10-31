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
        
        // Kalau geser dikit aja, anggap lagi nge-drag
        if (Math.abs(currentTouchX) > 5 || Math.abs(currentTouchY) > 5) {
            isDragging = true;
            e.preventDefault(); // Biar layar nggak ikut ke-scroll
            
            currentX = currentTouchX;
            currentY = currentTouchY;
            
            // Pake translate3d biar dibantu GPU (hasilnya 60fps halus banget)
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
        // Kalau abis digeser, jangan buka WA
        if (isDragging) {
            e.preventDefault();
        }
    });
}

// --- 6. BIKIN POP-UP ORDERAN MUNCUL TERUS TIAP 8 DETIK ---
function mulaiToastOtomatis() {
    const toast = document.getElementById("toast");
    const namaEl = document.getElementById("toast-nama");
    const pesananEl = document.getElementById("toast-pesanan");
    
    // Data dummy biar kelihatan rame
    const daftarNama = ["Ahmad (Bandung)", "Rizky (Sukajadi)", "Siti (Coblong)", "Budi (Dago)", "Dewi (Lengkong)"];
    const daftarPesanan = ["Baru saja memesan Cuci Kiloan 4kg", "Baru saja memesan Cuci + Setrika 6kg", "Baru saja memesan Bed Cover Super", "Baru saja memesan Cuci Kiloan 3kg"];
    
    if(!toast) return;

    setInterval(() => {
        // Acak nama dan pesanan
        const randomNama = daftarNama[Math.floor(Math.random() * daftarNama.length)];
        const randomPesanan = daftarPesanan[Math.floor(Math.random() * daftarPesanan.length)];
        
        namaEl.innerText = randomNama;
        pesananEl.innerText = randomPesanan;
        
        // Munculkan pop-up
        toast.classList.add("show");
        
        // Sembunyikan lagi setelah 4 detik
        setTimeout(() => {
            toast.classList.remove("show");
        }, 4000);
        
    }, 8000); // Looping terjadi setiap 8 detik
}

// Pastikan dipanggil saat web diload
document.addEventListener("DOMContentLoaded", function() {
    mulaiToastOtomatis();
    
});


// --- 7. LOGIKA ACCORDION FAQ (BUKA TUTUP) ---
function initAccordionFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        item.addEventListener('click', function() {
            // Tutup FAQ lain jika ingin satu per satu yang terbuka (opsional)
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            // Buka atau tutup FAQ yang diklik
            this.classList.toggle('active');
        });
    });
}

// Panggil fungsi saat web siap
document.addEventListener("DOMContentLoaded", function() {
    initAccordionFAQ();
});

document.addEventListener('DOMContentLoaded', () => {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const userDropdown = document.getElementById('userDropdown');
  const inputNamaUser = document.getElementById('inputNamaUser');
  const btnSimpanNama = document.getElementById('btnSimpanNama');
  
  // 1. Load Nama Terakhir dari LocalStorage
  if (localStorage.getItem('user_laundry_name')) {
    inputNamaUser.value = localStorage.getItem('user_laundry_name');
  }

  // 2. Toggle Buka / Tutup Dropdown Garis Tiga
  if (hamburgerBtn && userDropdown) {
    hamburgerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      userDropdown.classList.toggle('active');
    });

    // Klik luar dropdown buat nutup
    document.addEventListener('click', (e) => {
      if (!userDropdown.contains(e.target) && !hamburgerBtn.contains(e.target)) {
        userDropdown.classList.remove('active');
      }
    });
  }

  // 3. Simpan Nama
  if (btnSimpanNama) {
    btnSimpanNama.addEventListener('click', () => {
      const nama = inputNamaUser.value.trim();
      if (nama) {
        localStorage.setItem('user_laundry_name', nama);
        alert(`Nama '${nama}' berhasil disimpan!`);
        userDropdown.classList.remove('active');
      } else {
        alert('Masukkan nama kamu dulu bro!');
      }
    });
  }

  // 4. Trigger Pop-Up Notifikasi Pas Klik "Pesan Hasil Estimasi via WA"
  const btnPesanWA = document.querySelector('.estimasi-section button, #btnPesanWA, [class*="btn-pesan"]'); 
  // Adjust selector di atas sesuai class/id tombol WA lu di HTML

  if (btnPesanWA) {
    btnPesanWA.addEventListener('click', () => {
      const savedName = localStorage.getItem('user_laundry_name') || 'Kamu';
      const selectLayanan = document.querySelector('select');
      const inputBerat = document.querySelector('input[type="number"]');

      const namaLayanan = selectLayanan ? selectLayanan.options[selectLayanan.selectedIndex].text.split('-')[0].trim() : 'Laundry';
      const berat = inputBerat ? inputBerat.value : '1';

      // Panggil fungsi Notifikasi Live Toast lu dengan nama user
      if (typeof showToastNotification === 'function') {
        showToastNotification(savedName, `Baru saja memesan ${namaLayanan} ${berat}kg`);
      } else if (typeof showToast === 'function') {
        showToast(`${savedName} baru saja memesan ${namaLayanan} ${berat}kg`);
      }
    });
  }
});
