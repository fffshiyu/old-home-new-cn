document.addEventListener('DOMContentLoaded',function(){
  // Loader
  const loader=document.getElementById('site-loader');
  const progressBar=document.querySelector('.loader-progress-bar');
  const barFill=document.querySelector('.loader-fill');
  let p=0; let timer;
  const tick=()=>{
    p=Math.min(100,p+5);
    if(barFill){ barFill.style.width=p+'%'; progressBar.setAttribute('aria-valuenow', String(p)); }
    if(p<100){ timer=setTimeout(tick, 60); }
  };
  const hideLoader=()=>{
    if(timer) clearTimeout(timer);
    loader && loader.classList.add('hidden');
  };
  tick();
  setTimeout(hideLoader, 1800);

  // Mobile nav
  const toggle=document.querySelector('.nav-toggle');
  const nav=document.querySelector('.main-nav');
  toggle && toggle.addEventListener('click',()=>{
    nav.classList.toggle('open');
  });

  // Active link highlight
  const links=[...document.querySelectorAll('.main-nav a[href^="#"]')];
  const onScroll=()=>{
    const y=window.scrollY+100;
    links.forEach(a=>{
      const id=a.getAttribute('href');
      const el=id && document.querySelector(id);
      if(!el) return;
      const {top,height}=el.getBoundingClientRect();
      const absTop=top+window.scrollY;
      if(y>=absTop && y<absTop+height){
        links.forEach(x=>x.classList.remove('active'));
        a.classList.add('active');
      }
    });
  };
  window.addEventListener('scroll',onScroll); onScroll();

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{
      const id=a.getAttribute('href');
      if(!id || id==='#') return;
      const target=document.querySelector(id);
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth'});
        nav.classList.remove('open'); // 隐藏导航菜单
      }
    });
  });

  // Language switch mock
  const lang=document.querySelector('.lang');
  const langBtn=document.querySelector('.lang-current');
  const langMenu=document.querySelector('.lang-menu');
  langBtn && langBtn.addEventListener('click',()=>{
    lang.classList.toggle('open');
    langBtn.setAttribute('aria-expanded', String(lang.classList.contains('open')));
  });
  document.addEventListener('click',e=>{
    if(lang && !lang.contains(e.target)) lang.classList.remove('open');
  });
  langMenu && langMenu.querySelectorAll('button').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const code=btn.getAttribute('data-lang');
      if(code==='de'){ langBtn.textContent='de_DE_formal DE'; document.documentElement.lang='de-DE'; }
      else { langBtn.textContent='en_GB EN'; document.documentElement.lang='en-GB'; }
      lang.classList.remove('open');
    });
  });

  // Contact form - 使用FormSubmit服务处理表单提交
  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');
  const successModal = document.getElementById('successModal');
  
  // 关闭弹窗函数
  window.closeModal = function() {
    successModal.classList.remove('show');
  };
  
  if (contactForm) {
    // 表单提交处理
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault(); // 阻止默认提交
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.textContent;
      submitBtn.textContent = '发送中...';
      submitBtn.disabled = true;
      
      // 显示临时消息
      formMessage.textContent = '正在提交表单...';
      formMessage.className = 'form-message success';
      formMessage.style.display = 'block';
      
      // 获取表单数据
      const formData = new FormData(contactForm);
      
      // 创建一个隐藏的iframe来提交表单
      const iframe = document.createElement('iframe');
      iframe.name = 'hidden-iframe';
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
      
      // 设置表单目标为iframe
      contactForm.target = 'hidden-iframe';
      
      // 监听iframe加载事件
      iframe.onload = function() {
        // 成功处理
        console.log('表单提交成功');
        contactForm.reset();
        formMessage.style.display = 'none';
        
        // 显示成功弹窗
        successModal.classList.add('show');
        
        // 恢复按钮状态
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
        
        // 移除iframe
        setTimeout(() => {
          document.body.removeChild(iframe);
        }, 500);
      };
      
      // 提交表单
      contactForm.submit();
      
      // 处理可能的错误
      setTimeout(() => {
        if (submitBtn.disabled) {
          // 如果5秒后按钮仍然禁用，认为提交可能失败
          console.error('表单提交可能失败');
          formMessage.textContent = '发送失败，请稍后再试。';
          formMessage.className = 'form-message error';
          submitBtn.textContent = originalBtnText;
          submitBtn.disabled = false;
        }
      }, 5000);
    });
  }
});