function hitungEstimasi() {
    // Mengambil nilai dari input HTML
    const layanan = document.getElementById("layanan") ? document.getElementById("layanan").value : "";
    const beratInput = document.getElementById("berat");
    const berat = beratInput ? (parseFloat(beratInput.value) || 0) : 0;
    
    let hargaPerKg = 0;

    // Logika penentuan harga berdasarkan pilihan layanan
    if (layanan === "kiloan") {
        hargaPerKg = 6000;
    } else if (layanan === "express") {
        hargaPerKg = 9000;
    } else if (layanan === "setrika") {
        hargaPerKg = 5000;
    } else if (layanan === "bedcover" || layanan.includes("Bed Cover")) {
        hargaPerKg = 15000;
    } else {
        // Jika value di option berupa angka harga langsung
        hargaPerKg = parseFloat(layanan) || 6000;
    }

    const total = hargaPerKg * berat;
    
    // Format rupiah
    const totalFormatted = "Rp " + total.toLocaleString("id-ID");

    // Cari ID 'total' ATAU 'total-harga' biar dua-duanya aman
    const elemTotal = document.getElementById("total") || document.getElementById("total-harga");
    if (elemTotal) {
        elemTotal.innerText = totalFormatted;
    }

    // Update Link WA
    const waBtn = document.getElementById("wa-link");
    if (waBtn) {
        const pesan = `Halo Laundry God, saya mau pesan ${layanan} (${berat} kg). Total estimasi: ${totalFormatted}`;
        waBtn.href = `https://wa.me/6283187521130?text=${encodeURIComponent(pesan)}`;
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

