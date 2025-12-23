// --- 1. ตั้งค่าข้อมูลพื้นฐาน ---
const targetDate = new Date(2025, 11, 23, 0, 0, 0).getTime(); 
const CORRECT_PASSWORD = "231267";

// ข้อมูลแต่ละเดือน (แยกรูปเล็ก thumb และรูปที่จะให้เด้งขึ้นมา full)
const monthsData = [
    { title: "ตอนชั้นจีบเธอ", thumb: "img0.jpg", full: "v0.jpg",},
    { title: "เดือนที่  1", thumb: "img1.jpg", full: "v1.jpg",},
    { title: "เดือนที่ 2", thumb: "img2.jpg", full: "v2.jpg", },
    { title: "เดือนที่ 3", thumb: "img3.jpg", full: "v3.jpg",},
    { title: "เดือนที่ 4", thumb: "img4.jpg", full: "v4.jpg", },
    { title: "เดือนที่ 5", thumb: "img5.jpg", full: "v5.jpg",},
    { title: "เดือนที่ 6", thumb: "img6.jpg", full: "v6.jpg",  },
    { title: "เดือนที่ 7", thumb: "img7.jpg", full: "v7.jpg",  },
    { title: "เดือนที่ 8", thumb: "img8.jpg", full: "v8.jpg",},
    { title: "เดือนที่ 9", thumb: "img9.jpg", full: "v9.jpg",},
    { title: "เดือนที่ 10", thumb: "img10.jpg", full: "v10.jpg",},
    { title: "เดือนที่ 11", thumb: "img11.jpg", full: "v11.jpg",},
    { title: "เดือนที่ 12", thumb: "img12.jpg", full: "v12.jpg", }
];

// --- 2. ระบบนับถอยหลัง ---
function updateTimer() {
    const now = new Date().getTime();
    const diff = targetDate - now;
    const btn = document.getElementById('entry-btn');

    if (diff > 0) {
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);
        
        document.getElementById('days').innerText = d;
        document.getElementById('hours').innerText = h;
        document.getElementById('minutes').innerText = m;
        document.getElementById('seconds').innerText = s;
        btn.style.opacity = "0.5";
    } else {
        document.getElementById('countdown-title').innerText = "ถึงเวลาแล้วเปิดได้จ้า ❤️";
        btn.style.opacity = "1";
    }
}
setInterval(updateTimer, 1000);
updateTimer();

// --- 3. ระบบการเปลี่ยนหน้าและ Login ---
function goToLogin() {
    if (new Date().getTime() < targetDate) {
        alert("ยังไม่ถึงเวลาเลย รออีกนิดนะ! ❤️");
    } else {
        document.getElementById('countdown-page').style.display = 'none';
        document.getElementById('login-page').style.display = 'flex';
    }
}

function checkPassword() {
    const pass = document.getElementById('passwordInput').value;
    if (pass === CORRECT_PASSWORD) {
        document.getElementById('bgMusic').play(); // เพลงหลักเริ่มเล่นและเล่นยาวไปเลย
        document.getElementById('login-page').style.display = 'none';
        document.getElementById('loading-page').style.display = 'flex';
        setTimeout(showGallery, 3000);
    } else {
        document.getElementById('wrong-overlay').style.display = 'flex';
        setTimeout(() => { document.getElementById('wrong-overlay').style.display = 'none'; }, 1200);
    }
}

// --- 4. ระบบ Gallery ---
function showGallery() {
    document.getElementById('loading-page').style.display = 'none';
    document.getElementById('gallery-page').style.display = 'flex';
    const grid = document.getElementById('galleryGrid');
    grid.innerHTML = ""; 
    
    monthsData.forEach((item) => {
        const card = document.createElement('div');
        card.className = 'img-card';
        // คลิกแล้วเปิดรูปขยาย (item.full) โดยเพลงหลักไม่หยุด
        card.onclick = () => openMonthModal(item.full, item.title);
        card.innerHTML = `<img src="${item.thumb}"><p>${item.title}</p>`;
        grid.appendChild(card);
    });
}

// --- 5. ระบบ Modal (แสดงรูปขยาย - ไม่มีเพลงแยก) ---
function openMonthModal(fullImgSrc, title) {
    const modal = document.getElementById('monthModal');
    const modalContent = document.querySelector('.modal-content');
    
    // แสดงแค่หัวข้อและรูปขยาย (ไม่มีแท็ก audio/video)
    modalContent.innerHTML = `
        <span class="close-btn" onclick="closeMonthModal()">&times;</span>
        <h2 id="modalTitle" style="color:#ff4d6d; margin-bottom:15px;">${title}</h2>
        <img src="${fullImgSrc}" style="width:100%; border-radius:15px; box-shadow: 0 5px 20px rgba(0,0,0,0.3);">
    `;
    
    modal.style.display = 'flex';
}

function closeMonthModal() {
    document.getElementById('monthModal').style.display = 'none';
}

// --- 6. หน้าวิดีโอสุดท้าย ---
function goToFinalVideo() {
    document.getElementById('gallery-page').style.display = 'none';
    document.getElementById('video-page').style.display = 'flex';
    // เบาเสียงเพลงหลักลงเพื่อให้ได้ยินเสียงวิดีโอชัดขึ้น
    document.getElementById('bgMusic').volume = 0.2; 
    document.getElementById('finalVideo').play();
}