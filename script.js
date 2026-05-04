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
      
      const dangerous = /(<\s*\/?\s*(script|iframe|object|embed|link|style|svg|math|base|form|img|video|audio)|on\w+\s*=|javascript\s*:|data\s*:|vbscript\s*:|expression\s*\(|url\s*\(|alert\s*\(|prompt\s*\(|confirm\s*\(|eval\s*\(|set(timeout|interval)\s*\(|Function\s*\(|document\.(cookie|domain|write)|window\.location|&#|%3c|%3e|\\x|\\u)/i;
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