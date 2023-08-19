const main = () => {
  waitForElementsByClassName("annotation").then((elements) => {
    Array.from(elements).forEach((element) => {
      element.remove();
    });
  });
};

const waitForElementsByClassName = (className) => {
  return new Promise((resolve) => {
    if (document.getElementsByClassName(className).length > 0) {
      return resolve(document.getElementsByClassName(className));
    }

    const observer = new MutationObserver(() => {
      if (document.getElementsByClassName(className).length > 0) {
        resolve(document.getElementsByClassName(className));
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
};

window.onload = () => {
  let oldHref = document.location.href;
  const body = document.querySelector("body");
  const observer = new MutationObserver(() => {
    if (oldHref !== document.location.href) {
      oldHref = document.location.href;
      main();
    }
  });
  observer.observe(body, { childList: true, subtree: true });
};

main();
