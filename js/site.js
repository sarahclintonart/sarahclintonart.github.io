// Lightbox for any element marked data-lb (with data-full and data-cap)
(function () {
  const lb = document.getElementById('lb');
  if (!lb) return;
  const items = Array.from(document.querySelectorAll('[data-lb]'));
  const im = document.getElementById('lb-img'), cap = document.getElementById('lb-cap');
  let cur = 0;
  function show(i) {
    cur = (i + items.length) % items.length;
    const el = items[cur];
    im.src = el.dataset.full;
    im.alt = (el.querySelector('img') || {}).alt || '';
    cap.innerHTML = el.dataset.cap || '';
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function close() { lb.classList.remove('open'); im.src = ''; document.body.style.overflow = ''; }
  items.forEach((el, i) => el.addEventListener('click', ev => {
    if (ev.target.closest('a')) return; // let links (like "Contact me") work
    show(i);
  }));
  document.getElementById('lb-close').addEventListener('click', close);
  document.getElementById('lb-prev').addEventListener('click', () => show(cur - 1));
  document.getElementById('lb-next').addEventListener('click', () => show(cur + 1));
  lb.addEventListener('click', ev => { if (ev.target === lb) close(); });
  document.addEventListener('keydown', ev => {
    if (!lb.classList.contains('open')) return;
    if (ev.key === 'Escape') close();
    if (ev.key === 'ArrowRight') show(cur + 1);
    if (ev.key === 'ArrowLeft') show(cur - 1);
  });
})();
