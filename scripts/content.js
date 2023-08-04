const waitForElementByQuery = (selector) => {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

const observeUrlChange = () => {
  let oldHref = document.location.href;
  const body = document.querySelector("body");
  const observer = new MutationObserver(mutations => {
    if (oldHref !== document.location.href) {
      oldHref = document.location.href;
      main();
    }
  });
  observer.observe(body, { childList: true, subtree: true });
};

const main = () => {
    waitForElementByQuery("#movie_player > div.ytp-player-content.ytp-iv-player-content > div")
        .then(profilePic => profilePic.remove())
};

window.onload = observeUrlChange;
main();