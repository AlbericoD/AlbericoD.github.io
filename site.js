/* Lightweight PostHog measurement for the public product site.
 * - Uses the existing PostHog project with a dedicated `site_surface` property.
 * - Captures one manual $pageview per page plus explicit download/store clicks.
 * - Does not enable autocapture, session replay, surveys, or user identification.
 * - Preserves installer URLs and never delays navigation.
 */
(() => {
  const POSTHOG_TOKEN = 'phc_nNggHUKxUudbRaEtLNcwqXcq4NgtM6CBTdiqgDZ7hFaq';
  const POSTHOG_HOST = 'https://us.i.posthog.com';
  const SITE_SURFACE = 'albericod_github_pages';

  function installPostHogStub() {
    const existing = window.posthog;
    if (existing?.__SV) return existing;

    const posthog = (window.posthog = existing || []);
    posthog._i = posthog._i || [];

    posthog.init = function init(token, config, name) {
      function queueMethod(target, method) {
        target[method] = function queuedMethod() {
          target.push([method].concat(Array.prototype.slice.call(arguments)));
        };
      }

      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.crossOrigin = 'anonymous';
      script.async = true;
      script.src = `${config.api_host.replace('.i.posthog.com', '-assets.i.posthog.com')}/static/array.js`;

      const firstScript = document.getElementsByTagName('script')[0];
      firstScript.parentNode.insertBefore(script, firstScript);

      const target = name ? (posthog[name] = []) : posthog;
      const instanceName = name || 'posthog';
      target.people = target.people || [];
      target.toString = function toString(short) {
        let value = 'posthog';
        if (instanceName !== 'posthog') value += `.${instanceName}`;
        if (!short) value += ' (stub)';
        return value;
      };
      target.people.toString = function peopleToString() {
        return `${target.toString(1)}.people (stub)`;
      };

      [
        'capture',
        'identify',
        'reset',
        'opt_in_capturing',
        'opt_out_capturing',
        'on',
        'register',
        'unregister',
        'set_config',
      ].forEach((method) => queueMethod(target, method));

      posthog._i.push([token, config, name]);
    };

    posthog.__SV = 1;
    return posthog;
  }

  function currentAppSlug() {
    const match = location.pathname.match(
      /^\/(deeprivals|roblox-backpack-tracker|economy-tool|fortmapp)(?:\/|$)/
    );
    return match?.[1] || undefined;
  }

  function currentPageType() {
    if (location.pathname === '/') return 'home';
    if (
      location.pathname.includes('marvel-rivals-hero-switch-recommendations') ||
      location.pathname.includes('cs2-safe-drop-calculator')
    ) {
      return 'guide';
    }
    return 'product';
  }

  const posthog = installPostHogStub();
  posthog.init(POSTHOG_TOKEN, {
    api_host: POSTHOG_HOST,
    defaults: '2026-05-30',
    autocapture: false,
    capture_pageview: false,
    capture_pageleave: false,
    disable_session_recording: true,
    disable_surveys: true,
    disable_product_tours: true,
    disable_web_experiments: true,
    disable_external_dependency_loading: true,
    persistence: 'localStorage',
    persistence_name: 'albericod_site_posthog',
    person_profiles: 'identified_only',
    ip: false,
  });

  const pageProperties = {
    site_surface: SITE_SURFACE,
    page_path: location.pathname,
    page_type: currentPageType(),
  };
  const appSlug = currentAppSlug();
  if (appSlug) pageProperties.app_slug = appSlug;

  posthog.capture('$pageview', pageProperties);

  window.addEventListener('site:conversion', (event) => {
    const detail = event.detail;
    if (!detail?.event) return;

    posthog.capture(detail.event, {
      site_surface: SITE_SURFACE,
      app_slug: detail.app_slug,
      placement: detail.placement,
      page_path: detail.page_path,
      page_type: currentPageType(),
      link_url: detail.link_url,
    });
  });

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
