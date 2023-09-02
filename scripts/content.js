/** Clicks all "play" buttons on the page. */
function playAll(root) {
  root.querySelectorAll('button').forEach(button => {
    const hash = new URL(button.querySelector('use')?.getAttribute('href'), window.location).hash;
    if (hash === '#24-filled-play-usage') {
      console.log('[wyze-autoplay] Auto-playing', button.parentElement); 
      button.click();
    }
  });
}

/** Watch the page for new elements and play them. */
new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    mutation.addedNodes.forEach(node => {
      if (node instanceof HTMLElement) {
        playAll(node);
      }
    });
  });
}).observe(document.body, { childList: true, subtree: true });

/** Redirect from error page to view page. */
if (window.location.pathname === '/api/auth/error') {
  window.location.pathname = '/';
}
