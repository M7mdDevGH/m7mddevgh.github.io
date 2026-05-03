document.addEventListener("DOMContentLoaded", function() {
  
  const btn = document.getElementById('demoBtn');
  const inputEl = document.getElementById('demoInput');
  const result = document.getElementById('demoResult');
  
  if (btn) {
    btn.addEventListener('click', function() {
      
      const input = inputEl.value;
      
      result.textContent = '';
      result.className = 'demo-result';
      
      if (!input.trim()) {
        result.className += ' danger';
        result.textContent = '⚠️ أدخل نصاً للفحص';
        return;
      }
      
      const dangerous = /<script|javascript:|onerror=|onload=|onclick=/i;
      
      if (dangerous.test(input)) {
        result.className += ' danger';
        result.textContent = '🚫 تم اكتشاف كود خبيث! تم تطهير النص: ' + sanitize(input);
      } else {
        result.className += ' safe';
        result.textContent = '✅ النص آمن: ' + sanitize(input);
      }
      
    });
  }
  
  if (inputEl) {
    inputEl.value = '<script>alert("XSS")</script>';
  }
  
});

function sanitize(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}