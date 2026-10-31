function hitungEstimasi() {
    // Ambil harga dari dropdown
    const harga = parseFloat(document.getElementById("layanan").value) || 0;
    
    // Ambil berat dari input box
    const berat = parseFloat(document.getElementById("berat").value) || 0;

    // Hitung Total
    const total = harga * berat;

    // Tampilkan ke teks HTML id="total-harga"
    const totalElem = document.getElementById("total-harga");
    if (totalElem) {
        totalElem.innerText = "Total Estimasi: Rp " + total.toLocaleString("id-ID");
    }
}

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

