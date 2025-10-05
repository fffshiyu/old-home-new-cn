// 申请样品页面JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // 表单提交处理
    const sampleRequestForm = document.getElementById('sampleRequestForm');
    
    if (sampleRequestForm) {
        // 表单提交前显示加载状态
        sampleRequestForm.addEventListener('submit', function() {
            const submitBtn = sampleRequestForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = '提交中...';
            submitBtn.disabled = true;
            
            // FormSubmit会自动处理表单提交和重定向
            // 如果没有设置_next参数，会显示FormSubmit的默认成功页面
        });
    }
    
    // 步骤动画效果
    const processSteps = document.querySelectorAll('.process-step');
    if (processSteps.length > 0) {
        // 添加延迟动画效果
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
