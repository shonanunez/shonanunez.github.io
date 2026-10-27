(() => {
  document.querySelectorAll('[data-current-year]').forEach(element => {
    element.textContent = String(new Date().getFullYear());
  });
  document.querySelectorAll('[data-video]').forEach(link => {
    link.addEventListener('click', event => {
      // Preserve modified clicks and the ordinary link when JavaScript is unavailable.
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      const frame = document.createElement('iframe');
      frame.src = `https://www.youtube-nocookie.com/embed/${link.dataset.video}?autoplay=1&playsinline=1`;
      frame.title = 'Poppello: Your Bubble Break — short video';
      frame.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
      frame.allowFullscreen = true;
      frame.referrerPolicy = 'strict-origin-when-cross-origin';
      frame.tabIndex = 0;
      link.replaceWith(frame);
      frame.focus();
    });
  });
  document.querySelectorAll('[data-app-tabs]').forEach(container => {
    const tablist = container.querySelector('.app-tabs');
    const tabs = Array.from(tablist.querySelectorAll('a'));
    const panels = tabs.map(tab => document.getElementById(tab.getAttribute('aria-controls')));
    tablist.setAttribute('role', 'tablist');
    tabs.forEach(tab => tab.setAttribute('role', 'tab'));
    panels.forEach(panel => {
      panel.setAttribute('role', 'tabpanel');
      panel.tabIndex = 0;
    });
    const select = (index, focus = false, updateAddress = false) => {
      tabs.forEach((tab, i) => {
        tab.setAttribute('aria-selected', String(i === index));
        tab.tabIndex = i === index ? 0 : -1;
        panels[i].hidden = i !== index;
      });
      if (focus) tabs[index].focus();
      if (updateAddress) history.replaceState(null, '', tabs[index].getAttribute('href'));
    };
    const indexFromAddress = () => Math.max(0, panels.findIndex(panel => `#${panel.id}` === location.hash));
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', event => {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        select(index, false, true);
      });
      tab.addEventListener('keydown', event => {
        const target = {ArrowRight: (index + 1) % tabs.length, ArrowLeft: (index + tabs.length - 1) % tabs.length, Home: 0, End: tabs.length - 1}[event.key];
        if (target === undefined) return;
        event.preventDefault();
        select(target, true, true);
      });
    });
    select(indexFromAddress());
    window.addEventListener('hashchange', () => select(indexFromAddress()));
  });
  document.querySelectorAll('[data-gallery], [data-app-showcase]').forEach(gallery => {
    const isShowcase = gallery.hasAttribute('data-app-showcase');
    const track = gallery.querySelector(isShowcase ? '.app-track' : '.screenshot-track');
    const slides = Array.from(track.children);
    const previous = gallery.querySelector(isShowcase ? '[data-app-previous]' : '[data-previous]');
    const next = gallery.querySelector(isShowcase ? '[data-app-next]' : '[data-next]');
    const status = gallery.querySelector(isShowcase ? '[data-app-status]' : '[data-status]');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const positions = () => slides.map(slide => slide.offsetLeft - slides[0].offsetLeft);
    const nearest = () => positions().reduce((best, position, index, all) =>
      Math.abs(position - track.scrollLeft) < Math.abs(all[best] - track.scrollLeft) ? index : best, 0);
    const move = target => track.scrollTo({
      left: target,
      behavior: reducedMotion.matches ? 'instant' : 'smooth'
    });
    const step = direction => move(positions()[Math.max(0, Math.min(slides.length - 1, nearest() + direction))]);
    const update = () => {
      const max = track.scrollWidth - track.clientWidth;
      previous.disabled = track.scrollLeft <= 2;
      next.disabled = track.scrollLeft >= max - 2;
      const bounds = track.getBoundingClientRect();
      const visible = slides.map((slide, i) => ({i, rect: slide.getBoundingClientRect()}))
        .filter(({rect}) => rect.left >= bounds.left - 2 && rect.right <= bounds.right + 2);
      const first = visible.length ? visible[0].i + 1 : nearest() + 1;
      const last = visible.length ? visible[visible.length - 1].i + 1 : first;
      if (isShowcase) {
        const index = nearest();
        status.textContent = `App ${index + 1} of ${slides.length}`;
        gallery.querySelector('[data-current-app]').textContent = slides[index].dataset.appLabel;
        gallery.querySelector('[data-app-counter]').textContent = `${String(index + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
        return;
      }
      status.textContent = `Screenshot${last > first ? 's' : ''} ${first}${last > first ? `–${last}` : ''} of ${slides.length}`;
    };
    previous.addEventListener('click', () => step(-1));
    next.addEventListener('click', () => step(1));
    track.addEventListener('keydown', event => {
      if (event.target !== track) return;
      const actions = {ArrowLeft: () => step(-1), ArrowRight: () => step(1), Home: () => move(0), End: () => move(track.scrollWidth)};
      if (actions[event.key]) {event.preventDefault(); actions[event.key]();}
    });
    let timer;
    track.addEventListener('scroll', () => {clearTimeout(timer); timer = setTimeout(update, 120);}, {passive:true});
    new ResizeObserver(update).observe(track);
    gallery.querySelector('.carousel-controls').hidden = false;
    update();
  });
})();
