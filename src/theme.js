// import { createTheme } from '@mui/material/styles';
import { blue, grey, lightBlue } from '@mui/material/colors';

// export const theme = createTheme({
//     palette: {
//         primary: {
//             main: blue[500]
//         },
//         secondary: {
//             main: lightBlue[800],
//             midNightBlue: "#003366"
//         }
//     }
// });

export const themeColors = (mode) => ({
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                // palette values for light mode
                primary: {
                    main: "#003366",
                    white: "#fff",
                    dark: "#2d2d2d",
                    text: "#fff",
                    icon:"#fff",
                    // nav:"#53B982"
                    nav:"#fff",
                    oth:"#fff"
                },
                secondary: {
                    main: lightBlue[800],
                    midNightBlue: "#003366",
                    white:"#fff"
                },
                
                background: {
                    default: "#003366",
                },
                text: {
                    primary: '#fff',
                    secondary: grey[100],
                },
            }
            : {
                // palette values for dark mode
                primary: {
                    dark:"#fff",
                    main: "#fff",
                    white: "#003366",
                    text: "#fff",
                    icon:"#2d2d2d",
                    nav:"#003366",
                    oth:"#2d2d2d"


                },
                secondary: {
                    main: blue[700],
                    midNightBlue: "#2196f3",
                    white:"#2d2d2d"

                },
                background: {
                    default: "#fff",
                },
                text: {
                    primary: '#2d2d2d',
                    secondary: grey[100],
                },
            }),
    },
});