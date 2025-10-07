// 申请样品页面JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const sampleRequestForm = document.getElementById('sampleRequestForm');
    const successModal = document.getElementById('successModal');
    const formTargetIframe = document.getElementById('form-target');
    
    // 关闭弹窗函数
    window.closeModal = function() {
        if (successModal) {
            successModal.classList.remove('show');
        }
    };
    
    if (sampleRequestForm && formTargetIframe) {
        formTargetIframe.onload = function() {
            setTimeout(() => {
                if (successModal) {
                    successModal.classList.add('show');
                }
                sampleRequestForm.reset();
                const submitBtn = sampleRequestForm.querySelector('button[type="submit"]');
                submitBtn.textContent = '立即申请样品';
                submitBtn.disabled = false;
            }, 1000);
        };
    
        sampleRequestForm.addEventListener('submit', function(e) {
            const submitBtn = sampleRequestForm.querySelector('button[type="submit"]');
            submitBtn.textContent = '提交中...';
            submitBtn.disabled = true;
        });
    }
    
    // 步骤动画效果
    const processSteps = document.querySelectorAll('.process-step');
    if (processSteps.length > 0) {
        processSteps.forEach((step, index) => {
            setTimeout(() => {
                step.style.opacity = '1';
                step.style.transform = 'translateY(0)';
            }, 200 * (index + 1));
        });
    }
});

// 关闭弹窗函数
function closeModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.remove('show');
    }
}
