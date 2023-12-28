import { Inter, Raleway, Roboto_Mono} from "next/font/google"

export const robotoMono = Roboto_Mono({
    weight: ["300", "400", "500", "700"],
    style: ["normal", "italic"],
    subsets: ["latin"]
})

const raleway = Raleway({
    weight: ["300", "400", "500", "700"],
    style: ["normal", "italic"],
    subsets: ["latin"],
  });

  const inter = Inter({
    weight: ["300", "400", "500", "700"],
    style: ["normal"],
    subsets: ["latin"],
  }); 

const typography = {
    fontFamily: inter.style.fontFamily,
    fontSize: 13,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
    h1: {
        fontSize: '2rem',
        fontWeight: 600,
        lineHeight: 1.25,
    },
    h2: {
        fontSize: '1.75rem',
        fontWeight: 600,
        lineHeight: 1.25,
    },
    h3: {
        fontSize: '1.5rem',
        fontWeight: 500,
        lineHeight: 1.25,
        fontFamily: raleway.style.fontFamily,
    },
    h4: {
        fontSize: '1.125rem',
        fontWeight: 500,
        lineHeight: 1.25,
        fontFamily: robotoMono.style.fontFamily,
    },
    h5: {
        fontSize: '1.0625rem',
        fontWeight: 500,
        lineHeight: 1.25,
    },
    h6: {
        fontSize: '1rem',
        fontWeight: 500,
        lineHeight: 1.25, 
        fontFamily: robotoMono.style.fontFamily,
    },
    overline: {
        fontWeight: 600,
    },
    button: {
        fontWeight: 600,
        fontFamily: robotoMono.style.fontFamily,
    },
    subtitle1: {
        fontFamily: robotoMono.style.fontFamily,
    },
    
}

export default typography;

