// 咨询页面JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // 页面加载时的简单动画效果
    const bookingCard = document.querySelector('.booking-card');
    if (bookingCard) {
        setTimeout(() => {
            bookingCard.style.opacity = '1';
        }, 300);
    }
    
    // 关闭弹窗函数
    window.closeModal = function() {
        const modal = document.getElementById('successModal');
        if (modal) {
            modal.classList.remove('show');
        }
    };
});