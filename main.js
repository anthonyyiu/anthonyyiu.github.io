// External link confirmation
document.addEventListener('click', function (e) {
  const anchor = e.target.closest('a');
  if (!anchor) return;
  
  const href = anchor.getAttribute('href');
  if (!href) return;
  
  // Check if link is external
  const isExternal = href.startsWith('http://') || href.startsWith('https://') || href.startsWith('www.');
  
  if (isExternal) {
    const proceed = confirm('You are about to leave this website. Continue?');
    if (!proceed) {
      e.preventDefault();
    }
  }
});