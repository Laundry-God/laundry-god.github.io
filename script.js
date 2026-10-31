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

// --- 5. BIKIN TOMBOL WA BISA DIGESER (DRAGGABLE DI HP) ---
const waBtn = document.getElementById("btn-float-wa");
let isDragging = false;
let startX, startY, initialX, initialY;

if (waBtn) {
    waBtn.addEventListener('touchstart', function(e) {
        isDragging = false;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        initialX = waBtn.offsetLeft;
        initialY = waBtn.offsetTop;
    }, { passive: true });

    waBtn.addEventListener('touchmove', function(e) {
        let moveX = e.touches[0].clientX - startX;
        let moveY = e.touches[0].clientY - startY;
        
        // Kalau jari ngegeser lebih dari 10px, eksekusi pindah posisi
        if (Math.abs(moveX) > 10 || Math.abs(moveY) > 10) {
            isDragging = true;
            e.preventDefault(); // Tahan layar biar gak ikut ke-scroll
            waBtn.style.left = (initialX + moveX) + "px";
            waBtn.style.top = (initialY + moveY) + "px";
            waBtn.style.bottom = "auto";
            waBtn.style.right = "auto";
        }
    }, { passive: false });

    // Cegah buka WA kalau niatnya cuma ngegeser tombol
    waBtn.addEventListener('touchend', function(e) {
        if (isDragging) e.preventDefault(); 
    });
    waBtn.addEventListener('click', function(e) {
        if (isDragging) e.preventDefault();
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
