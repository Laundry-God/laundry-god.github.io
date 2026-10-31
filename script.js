function hitungEstimasi() {
    // 1. Ambil elemen input
    const selectLayanan = document.getElementById("layanan");
    const inputBerat = document.getElementById("berat");
    
    // Ambil teks nama layanan yang dipilih (misal: "Cuci Kiloan")
    const namaLayanan = selectLayanan ? selectLayanan.options[selectLayanan.selectedIndex].text : "Layanan";
    const harga = parseFloat(selectLayanan.value) || 0;
    const berat = parseFloat(inputBerat.value) || 0;

    // 2. Hitung Total
    const total = harga * berat;
    const totalFormatted = "Rp " + total.toLocaleString("id-ID");

    // 3. Tampilkan Total di Web
    const totalElem = document.getElementById("total-harga");
    if (totalElem) {
        totalElem.innerText = "Total Estimasi: " + totalFormatted;
    }

    // 4. Update Link Tombol WA Dinamis
    const waBtn = document.getElementById("wa-link");
    if (waBtn) {
        // GANTI nomor 6281234567890 di bawah ini dengan nomor WA laundry lu yang asli!
        const nomorWA = "6283187521130"; 
        
        const pesan = `Halo Laundry God, saya mau pesan:\n- Layanan: ${namaLayanan}\n- Berat: ${berat} kg\n- Total Estimasi: ${totalFormatted}`;
        
        // Pasang link WA yang valid
        waBtn.href = `https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`;
    }
}

// Jalankan sekali saat halaman pertama kali selesai dimuat
document.addEventListener("DOMContentLoaded", hitungEstimasi);

// Pasang Event Listener otomatis biar pas ngetik angka langsung berubah
document.addEventListener("DOMContentLoaded", function() {
    const inputBerat = document.getElementById("berat");
    const selectLayanan = document.getElementById("layanan");

    if (inputBerat) {
        inputBerat.addEventListener("input", hitungEstimasi);
    }
    if (selectLayanan) {
        selectLayanan.addEventListener("change", hitungEstimasi);
    }
});


// --- LOGIKA NOTIFIKASI DUMMY (TOAST) ---
const dataPesanan = [
    { nama: "Budi (Coblong)", pesanan: "Baru saja memesan Cuci Kiloan 4kg" },
    { nama: "Siti (Dago)", pesanan: "Baru saja memesan Bed Cover Super" },
    { nama: "Rian (Sukajadi)", pesanan: "Baru saja memesan Cuci + Setrika 6kg" },
    { nama: "Dewi (Lengkong)", pesanan: "Baru saja memesan Cuci Sepatu Sneaker" }
];

function tampilkanToast() {
    const toast = document.getElementById("toast");
    const namaElem = document.getElementById("toast-nama");
    const pesananElem = document.getElementById("toast-pesanan");

    if (!toast || !namaElem || !pesananElem) return;

    const acak = dataPesanan[Math.floor(Math.random() * dataPesanan.length)];
    
    namaElem.innerText = acak.nama;
    pesananElem.innerText = acak.pesanan;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 4000);
}

// Jalankan Notifikasi Otomatis
setTimeout(tampilkanToast, 3000);
setInterval(tampilkanToast, 10000);

