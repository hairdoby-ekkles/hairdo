// --- KONFIGURASI GALERI LOKAL ---
const totalImages = 38; 
const imageExtension = '.png'; 

const galleryContainer = document.getElementById('gallery');
const imgNumberBox = document.getElementById('imgNumberBox');

// Membuat elemen gambar secara otomatis berdasarkan konfigurasi di atas
for (let i = 1; i <= totalImages; i++) {
    const slideDiv = document.createElement('div');
    slideDiv.className = 'insta-slide';
    
    const img = document.createElement('img');
    img.src = `gallery/${i}${imageExtension}`;
    img.alt = `Hairdo ${i}`;
    
    slideDiv.appendChild(img);
    galleryContainer.appendChild(slideDiv);
}

// LOGIKA PERGANTIAN OTOMATIS
let slideIndex = 0;
showSlides();

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("insta-slide");
    
    if (slides.length === 0) return; 

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none"; 
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}   
    slides[slideIndex-1].style.display = "block"; 
    
    // Update angka pada kotak indikator menjadi format 2 digit (misal: 01, 02, dst)
    imgNumberBox.textContent = slideIndex.toString().padStart(2, '0');
    
    setTimeout(showSlides, 5000);
}

// LOGIKA LOGO UTAMA BERGESER KE ATAS MENGIKUTI SCROLL HALAMAN
const logo = document.getElementById('logo');
const waLogo = document.getElementById('waLogo');

// Fungsi untuk menghitung dan mengatur posisi horizontal kotak nomor gambar
function adjustNumberBoxLeftPosition() {
    const galleryRect = galleryContainer.getBoundingClientRect();
    const mmToPx = 3.78;
    const targetLeft = galleryRect.left - (15 * mmToPx) - (5 * mmToPx);
    
    // Pengaman Handphone (Cellphone)
    if (targetLeft < 0 || window.innerWidth < 1160) {
        imgNumberBox.style.left = `5mm`;
    } else {
        imgNumberBox.style.left = `${targetLeft}px`;
    }
}

// Jalankan fungsi saat load pertama dan ketika window di-resize
adjustNumberBoxLeftPosition();
window.addEventListener('resize', adjustNumberBoxLeftPosition);

window.addEventListener('scroll', () => {
    let scrollTop = window.scrollY;
    // Logo utama bergeser ke atas
    logo.style.transform = `translateY(-${scrollTop}px)`;

    // LOGIKA DETEKSI POSISI STRUKTURAL UNTUK WA LOGO & KOTAK NOMOR GAMBAR
    const galleryRect = galleryContainer.getBoundingClientRect();
    
    // Jalankan penyesuaian horizontal saat scroll agar posisi kiri tetap konsisten
    adjustNumberBoxLeftPosition();

    // Batas bawah (base) dari gallery container relatif terhadap viewport
    const galleryBase = galleryRect.bottom;
    const viewportHeight = window.innerHeight;
    
    // Konversi mm ke pixel kasar untuk kalkulasi (1mm ~ 3.78px)
    const mmToPx = 3.78; 
    const defaultBottomPx = 3 * mmToPx;
    
    // Hitung di mana posisi bottom waLogo seharusnya jika tidak diinterupsi scroll
    const currentWaBase = viewportHeight - defaultBottomPx;

    // Jika base melewati atau sejajar dengan base dari galleryContainer saat scroll ke bawah
    if (currentWaBase >= galleryBase) {
        const targetBottom = viewportHeight - galleryBase + (3 * mmToPx);
        waLogo.style.bottom = `${targetBottom}px`;
        imgNumberBox.style.bottom = `${targetBottom}px`; 
    } else {
        // Kembali ke posisi default awal 3mm jika belum mencapai batas bawah galeri
        waLogo.style.bottom = `3mm`;
        imgNumberBox.style.bottom = `3mm`; 
    }
});

// LOGIKA KLIK LOGO UTAMA: Memantul turun 5mm sesaat, lalu pindah halaman
logo.addEventListener('click', () => {
    logo.classList.add('logo-bounce-active');
    setTimeout(() => {
        logo.classList.remove('logo-bounce-active');
        window.location.href = "https://aban-007.github.io/hairdo-by-ekkles/booking-system.html";
    }, 300);
});

// LOGIKA KLIK WA LOGO: Memantul naik 5mm sesaat lalu kirim pesan WA baru
waLogo.addEventListener('click', (e) => {
    e.preventDefault(); // Mencegah link langsung terbuka sebelum animasi selesai
    waLogo.classList.add('wa-bounce-active');
    
    setTimeout(() => {
        waLogo.classList.remove('wa-bounce-active');
        // Teks pesan yang sudah di-encode dengan aman untuk URL
        const pesan = encodeURIComponent("Halo Kak saya sudah tekan tombol putih kiri atas, isi Form sudah saya kirim juga saya tunggu kabarnya yaa Kak Terima Kasih");
        window.open(`https://wa.me/6281314798161?text=${pesan}`, '_blank');
    }, 300);
});

// LOGIKA KLIK KOTAK NOMOR
imgNumberBox.addEventListener('click', () => {
    imgNumberBox.classList.add('wa-bounce-active');
    setTimeout(() => {
        imgNumberBox.classList.remove('wa-bounce-active');
    }, 300);
});