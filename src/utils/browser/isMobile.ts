interface IsMobile {
    [key: string]: () => boolean
}

const agent = typeof navigator !== 'undefined'
  ? navigator.userAgent : '';

const isMobile = {
  android: () => /android/i.test(agent),
  blackBerry: () => /blackberry/i.test(agent),
  iOS: () => /iphone|ipod/i.test(agent),
  opera: () => /opera mini/i.test(agent),
  windows: () => /iemobile/i.test(agent),
  any: () => (isMobile.android() || isMobile.blackBerry() || isMobile.iOS() || isMobile.opera() || isMobile.windows()),
  tablet: () => /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/i.test(agent),
  standaloneMode: () => window.matchMedia('(display-mode: standalone)').matches
} as IsMobile;

export default isMobile;
