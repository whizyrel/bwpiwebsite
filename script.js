{
  const btnSelector = '.__section--find__on__map';

  const module = (() => {
    const initListener = () => {
      const btnElement = document.querySelector(btnSelector);
      const lat = 7.375313;
      const lng = 3.863821;

      btnElement.addEventListener('click', (e) => {
        console.log({e});

        if (
          (navigator.platform.indexOf('iPhone') != -1) ||
          (navigator.platform.indexOf('iPad') != -1) ||
          (navigator.platform.indexOf('iPod') != -1)
        ) {
          window.open(`maps://maps.google.com/maps?daddr=${lat},${lng}&amp;ll=`);
        } else {
          /* else use Google */
          window.open(`https://maps.google.com/maps?daddr=${lat},${lng}&amp;ll=`);
        }
      });
    };

    return {
      init: initListener,
    };
  })();

  module.init();
}
