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
