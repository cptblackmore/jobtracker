export const fonts = [
  {
    fontFamily: 'Mulish',
    src: "url('/fonts/Mulish-Light.woff2') format('woff2')",
    fontWeight: 300,
    fontStyle: 'normal',
  },
  {
    fontFamily: 'Mulish',
    src: "url('/fonts/Mulish-Regular.woff2') format('woff2')",
    fontWeight: 400,
    fontStyle: 'normal',
  },
  {
    fontFamily: 'Mulish',
    src: "url('/fonts/Mulish-Medium.woff2') format('woff2')",
    fontWeight: 500,
    fontStyle: 'normal',
  },
  {
    fontFamily: 'Mulish',
    src: "url('/fonts/Mulish-Bold.woff2') format('woff2')",
    fontWeight: 700,
    fontStyle: 'normal',
  },
  {
    fontFamily: 'Montserrat',
    src: "url('/fonts/Montserrat-Regular.woff2') format('woff2')",
    fontWeight: 400,
    fontStyle: 'normal',
  },
  {
    fontFamily: 'Montserrat',
    src: "url('/fonts/Montserrat-Medium.woff2') format('woff2')",
    fontWeight: 500,
    fontStyle: 'normal',
  },
  {
    fontFamily: 'Montserrat',
    src: "url('/fonts/Montserrat-Bold.woff2') format('woff2')",
    fontWeight: 700,
    fontStyle: 'normal',
  },
  {
    fontFamily: 'Space Mono',
    src: "url('/fonts/SpaceMono-Regular.woff2') format('woff2')",
    fontWeight: 400,
    fontStyle: 'normal',
  },
  {
    fontFamily: 'Space Mono',
    src: "url('/fonts/SpaceMono-Bold.woff2') format('woff2')",
    fontWeight: 700,
    fontStyle: 'normal',
  },
].map((font) => ({'@font-face': font}));
