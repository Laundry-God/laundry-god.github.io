// --- LOGIKA KALKULATOR ESTIMASI ---
function hitungEstimasi() {
    const layanan = document.getElementById("layanan").value;
    const berat = parseFloat(document.getElementById("berat").value) || 0;
    let hargaPerKg = 0;

    if (layanan === "kiloan") {
        hargaPerKg = 6000;
    } else if (layanan === "express") {
        hargaPerKg = 9000;
    } else if (layanan === "setrika") {
        hargaPerKg = 5000;
    }

    const total = hargaPerKg * berat;
    document.getElementById("total-harga").innerText = "Rp " + total.toLocaleString("id-ID");

    // Link WhatsApp Dinamis
    const waBtn = document.getElementById("wa-link");
    if (waBtn) {
        const pesan = `Halo Laundry God, saya mau pesan ${layanan} dengan berat ${berat} kg. Total estimasi: Rp ${total.toLocaleString("id-ID")}`;
        waBtn.href = `https://wa.me/6283187521130?text=${encodeURIComponent(pesan)}`;
    }
}

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

