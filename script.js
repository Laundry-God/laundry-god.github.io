// ==========================================
// LAUNDRY GOD - FULL INTEGRATED & DRAGGABLE WA
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  
  // ------------------------------------------
  // 1. DATA CONFIG (GANTI NO WA LU DI SINI)
  // ------------------------------------------
  const NO_WA = '628123456789'; // <-- Ganti nomor WA lu (format 628xxx)

  // ------------------------------------------
  // 2. HAMBURGER MENU & SIMPAN NAMA USER
  // ------------------------------------------
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const userDropdown = document.getElementById('userDropdown');
  const inputNamaUser = document.getElementById('inputNamaUser');
  const btnSimpanNama = document.getElementById('btnSimpanNama');

  if (inputNamaUser && localStorage.getItem('user_laundry_name')) {
    inputNamaUser.value = localStorage.getItem('user_laundry_name');
  }

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
  // 3. KALKULATOR ESTIMASI HARGA
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
  // 4. AUTO SCROLL PILIH PAKET
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
  // 5. TOMBOL ESTIMASI VIA WA (TOAST + REDIRECT)
  // ------------------------------------------
  const btnPesanWA = document.querySelector('.estimasi-section button, .estimasi-section a, #btnPesanWA, [class*="btn-pesan"]');

  if (btnPesanWA) {
    btnPesanWA.addEventListener('click', (e) => {
      e.preventDefault();

      const namaUser = localStorage.getItem('user_laundry_name') || 'Yoga';
      const txtLayanan = selectLayanan ? selectLayanan.options[selectLayanan.selectedIndex].text.split('-')[0].trim() : 'Laundry';
      const txtBerat = inputBerat ? inputBerat.value : '3';
      const txtTotal = totalDisplay ? totalDisplay.innerText : '';

      // Tampilkan Toast Pop-up
      tampilkanToast(namaUser, `Baru saja memesan ${txtLayanan} (${txtBerat}kg/pcs)`);

      // Buat Format Pesan WhatsApp
      const textWA = `Halo Laundry God, saya ${namaUser} mau order:\n\n- Layanan: ${txtLayanan}\n- Berat/Jumlah: ${txtBerat} (kg/pcs)\n- ${txtTotal}\n\nMohon diproses ya!`;
      const urlWA = `https://wa.me/${NO_WA}?text=${encodeURIComponent(textWA)}`;

      // Buka WA setelah jeda 0.5 detik biar toast keburu keliatan
      setTimeout(() => {
        window.open(urlWA, '_blank');
      }, 500);
    });
  }

  // ------------------------------------------
  // 6. FUNGSI TAMPILKAN TOAST NOTIFIKASI
  // ------------------------------------------
  function tampilkanToast(nama, info) {
    let toast = document.querySelector('.notification-toast, [class*="toast"]');
    
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'notification-toast';
      document.body.appendChild(toast);
    }

    toast.innerHTML = `
      <div style="display:flex; align-items:center; gap:10px; background:#fff; padding:12px 16px; border-radius:12px; box-shadow:0 10px 25px rgba(0,0,0,0.15); border:1px solid #e2e8f0;">
        <span style="color:#22c55e; font-size:1.2rem;">🟢</span>
        <div style="text-align:left;">
          <strong style="color:#0f172a; font-size:0.875rem; display:block;">${nama}</strong>
          <small style="color:#64748b; font-size:0.75rem;">${info}</small>
        </div>
      </div>
    `;

    toast.style.position = 'fixed';
    toast.style.bottom = '85px';
    toast.style.left = '15px';
    toast.style.zIndex = '9998';
    toast.style.display = 'block';

    setTimeout(() => {
      toast.style.display = 'none';
    }, 4000);
  }

  // ------------------------------------------
  // 7. FITUR TOMBOL WA MELAYANG BISA DIGESER (DRAGGABLE)
  // ------------------------------------------
  const floatingWA = document.querySelector('a[href*="wa.me"]:not(.estimasi-section a), .floating-wa, [class*="whatsapp-float"]');

  if (floatingWA) {
    let isDragging = false;
    let currentX, currentY, initialX, initialY;
    let xOffset = 0, yOffset = 0;

    floatingWA.style.position = 'fixed';
    floatingWA.style.touchAction = 'none';

    // Touch Event (HP)
    floatingWA.addEventListener('touchstart', dragStart, { passive: false });
    floatingWA.addEventListener('touchend', dragEnd, { passive: false });
    floatingWA.addEventListener('touchmove', drag, { passive: false });

    // Mouse Event (Desktop)
    floatingWA.addEventListener('mousedown', dragStart);
    floatingWA.addEventListener('mouseup', dragEnd);
    floatingWA.addEventListener('mousemove', drag);

    function dragStart(e) {
      if (e.type === "touchstart") {
        initialX = e.touches[0].clientX - xOffset;
        initialY = e.touches[0].clientY - yOffset;
      } else {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
      }
      if (e.target === floatingWA || floatingWA.contains(e.target)) {
        isDragging = true;
      }
    }

    function dragEnd() {
      initialX = currentX;
      initialY = currentY;
      isDragging = false;
    }

    function drag(e) {
      if (isDragging) {
        e.preventDefault();
        if (e.type === "touchmove") {
          currentX = e.touches[0].clientX - initialX;
          currentY = e.touches[0].clientY - initialY;
        } else {
          currentX = e.clientX - initialX;
          currentY = e.clientY - initialY;
        }
        xOffset = currentX;
        yOffset = currentY;
        setTranslate(currentX, currentY, floatingWA);
      }
    }

    function setTranslate(xPos, yPos, el) {
      el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
    }
  }

  // ------------------------------------------
  // 8. ACCORDION FAQ
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
