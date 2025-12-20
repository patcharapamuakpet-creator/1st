// เปลี่ยนรหัสผ่านตรงนี้ได้เลยครับ
const SECRET_PASSWORD = "231267"; 

function checkPassword() {
    const input = document.getElementById('passwordInput').value;
    const wrongOverlay = document.getElementById('wrong-overlay');
    
    if (input === SECRET_PASSWORD) {
        document.getElementById('login-page').style.display = 'none';
        document.getElementById('gallery-page').style.display = 'flex';
        // เลื่อนหน้าจอไปด้านบนสุด
        window.scrollTo(0, 0);
    } else {
        // ถ้ารหัสผิด แสดงกากบาท
        wrongOverlay.style.display = 'flex';
        setTimeout(() => {
            wrongOverlay.style.display = 'none';
            document.getElementById('passwordInput').value = ""; // ล้างรหัสที่ผิด
        }, 1500);
    }
}

function goToVideo() {
    document.getElementById('gallery-page').style.display = 'none';
    const videoPage = document.getElementById('video-page');
    videoPage.style.display = 'flex';
    
    // สั่งวิดีโอเล่นอัตโนมัติ
    const video = document.getElementById('myVideo');
    video.play().catch(error => {
        console.log("Playback was prevented. User needs to click play.");
    });
    window.scrollTo(0, 0);
}

// เพิ่มฟังก์ชันให้กด Enter เพื่อ Login ได้
document.getElementById('passwordInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        checkPassword();
    }
});