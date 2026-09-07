/* Optional measurement hook. No analytics service is loaded by this site.
 * An installed measurement adapter may listen for site:conversion.
 * Events do not rewrite installer URLs, prevent navigation or imply an install.
 */
(() => {
  document.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;
    const link = event.target.closest('a[data-event][data-app]');
    if (!link) return;
    const detail = {
      event: link.dataset.event,
      app_slug: link.dataset.app,
      placement: link.dataset.placement,
      page_path: location.pathname,
      link_url: link.href,
    };
    window.dispatchEvent(new CustomEvent('site:conversion', { detail }));
  });
})();
