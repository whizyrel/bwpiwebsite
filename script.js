{
  const {navigator} = window;
  const btnSelector = '.__section--find__on__map';
  // use browser location api to collect location
  // pass into url

  const startLocationService = (cb) => {
    if (navigator) {
      navigator
          .geolocation
          .getCurrentPosition((pos) => {
            cb(null, pos);
          }, (err) => {
            if (err) {
              cb(`
                  You have denied this service: ${err}
                `,
              null
              );
              return;
            }
          }, {
            enableHighAccuracy: true,
            maximumAge: Number.POSITIVE_INFINITY,
          });
      return;
    }

    cb(new Error(
        `
        Your browser does not support this Service.
        Consider updating or using a modern browser.
        `
    ), null);
  };

  const module = (() => {
    const initListener = (pos) => {
      const btnElement = document.querySelector(btnSelector);
      const lat = 7.375319;
      const lng = 3.863821;
      const origin = {_lat: pos.coords.latitude, _lng: pos.coords.longitude};
      const travelMode = 'driving';

      const apiUrl = `https://www.google.com/maps/dir/?api=1&origin=${origin._lat},${origin._lng}&destination=${lat},${lng}&travelmode=${travelMode}`;
      // eslint-disable-next-line max-len
      // `origin=${origin._lat},${origin._lng}??dir_action=navigation&?waypoint=Challenge%20Mokola%20Apata

      btnElement.addEventListener('click', (e) => {
        // any possible apple appearance
        if (
          (navigator.platform.includes('IPhone')) ||
          (navigator.platform.includes('IPad')) ||
          (navigator.platform.includes('IPod')) ||
          (navigator.platform.includes('Mac')) ||
          (navigator.platform.includes('Apple')) ||
          (navigator.platform.includes('Darwin'))
        ) {
          window.open(apiUrl.replace('https', 'maps'));
          /* `maps://maps.google.com/maps?daddr=${lat},${lng}&amp;ll=` */
        } else {
          /* else use Google */
          window.open(apiUrl);
          /* `https://maps.google.com/maps?daddr=${lat},${lng}&amp;ll=` */
        }
      });
    };

    return {
      init: () => {
        startLocationService((err, pos) => {
          if (err) {
            alert(err.message);
            return;
          }
          initListener(pos);
        });
      },
    };
  })();

  module.init();
}
