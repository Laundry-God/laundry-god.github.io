// ==========================================
// LAUNDRY GOD - UTAMA & INTEGRASI FITUR NAMA
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  
  // ------------------------------------------
  // 1. HAMBURGER MENU & SIMPAN NAMA USER
  // ------------------------------------------
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const userDropdown = document.getElementById('userDropdown');
  const inputNamaUser = document.getElementById('inputNamaUser');
  const btnSimpanNama = document.getElementById('btnSimpanNama');

  // Load nama dari localStorage kalau pernah diset
  if (inputNamaUser && localStorage.getItem('user_laundry_name')) {
    inputNamaUser.value = localStorage.getItem('user_laundry_name');
  }

  // Toggle Buka/Tutup Menu Dropdown
  if (hamburgerBtn && userDropdown) {
    hamburgerBtn.style.cursor = 'pointer';
    hamburgerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      userDropdown.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
      if (!userDropdown.contains(e.target) && !hamburgerBtn.contains(e.target)) {
        userDropdown.classList.remove('active');
      }
    });
  }

  // Simpan Nama ke LocalStorage
  if (btnSimpanNama) {
    btnSimpanNama.addEventListener('click', () => {
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


  // ------------------------------------------
  // 2. KALKULATOR ESTIMASI HARGA
  // ------------------------------------------
  const selectLayanan = document.querySelector('select');
  const inputBerat = document.querySelector('input[type="number"]');
  const totalDisplay = document.querySelector('.total-biaya, .total, #totalEstimasi');

  function hitungTotal() {
    if (!selectLayanan || !inputBerat) return;

    let hargaPerUnit = 6000;
    const textOption = selectLayanan.options[selectLayanan.selectedIndex]?.text || '';

    if (textOption.includes('9.000') || textOption.toLowerCase().includes('setrika')) {
      hargaPerUnit = 9000;
    } else if (textOption.includes('15.000') || textOption.toLowerCase().includes('bed cover')) {
      hargaPerUnit = 15000;
    }

    const berat = parseFloat(inputBerat.value) || 1;
    const total = hargaPerUnit * berat;

    if (totalDisplay) {
      totalDisplay.innerText = `Total Estimasi: Rp ${total.toLocaleString('id-ID')}`;
    }
  }

  if (selectLayanan) selectLayanan.addEventListener('change', hitungTotal);
  if (inputBerat) inputBerat.addEventListener('input', hitungTotal);


  // ------------------------------------------
  // 3. PILIH PAKET (AUTO SCROLL KE KALKULATOR)
  // ------------------------------------------
  const cardButtons = document.querySelectorAll('.card, .btn-pilih');
  cardButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.card') || btn;
      const title = card.querySelector('h3')?.innerText.trim();
      const sectionEstimasi = document.querySelector('.estimasi-section, #Hitung-Estimasi') || selectLayanan;

      if (title && selectLayanan) {
        for (let option of selectLayanan.options) {
          if (option.text.toLowerCase().includes(title.toLowerCase())) {
            selectLayanan.value = option.value;
            break;
          }
        }
        hitungTotal();
      }

      if (sectionEstimasi) {
        sectionEstimasi.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  });


  // ------------------------------------------
  // 4. OVERRIDE TOMBOL WA & TRIGGER TOAST NAMA
  // ------------------------------------------
  const btnWA = document.querySelector('.estimasi-section a, .estimasi-section button, [href*="wa.me"], #btnPesanWA');

  if (btnWA) {
    btnWA.addEventListener('click', function() {
      const namaUser = localStorage.getItem('user_laundry_name') || 'Yoga';
      const txtLayanan = selectLayanan ? selectLayanan.options[selectLayanan.selectedIndex].text.split('-')[0].trim() : 'Laundry';
      const txtBerat = inputBerat ? inputBerat.value + 'kg' : '3kg';

      // Cari atau buat Toast Notifikasi
      let toastElem = document.querySelector('.notification-toast, [class*="toast"]');
      if (!toastElem) {
        toastElem = document.createElement('div');
        toastElem.className = 'notification-toast';
        document.body.appendChild(toastElem);
      }

      // Paksa ubah UI Toast dengan Nama User
      toastElem.innerHTML = `
        <div style="display:flex; align-items:center; gap:10px; background:#fff; padding:12px 16px; border-radius:12px; box-shadow:0 10px 25px rgba(0,0,0,0.15); border:1px solid #e2e8f0;">
          <span style="color:#22c55e; font-size:1.2rem;">🟢</span>
          <div style="text-align:left;">
            <strong style="color:#0f172a; font-size:0.875rem; display:block;">${namaUser}</strong>
            <small style="color:#64748b; font-size:0.75rem;">Baru saja memesan ${txtLayanan} ${txtBerat}</small>
          </div>
        </div>
      `;
      
      toastElem.style.position = 'fixed';
      toastElem.style.bottom = '80px';
      toastElem.style.left = '15px';
      toastElem.style.zIndex = '9998';
      toastElem.style.display = 'block';

      // Hilang otomatis setelah 4 detik
      setTimeout(() => {
        toastElem.style.display = 'none';
      }, 4000);
    });
  }


  // ------------------------------------------
  // 5. ACCORDION FAQ
  // ------------------------------------------
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        item.classList.toggle('active');
      });
    }
  });

});
          
