// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App'

// // import * as React from 'react'
// import { ChakraProvider } from '@chakra-ui/react'
// //import './page/locales/config'
// import './page/locales/index'
// ReactDOM.createRoot(document.getElementById('root')).render(

//   <React.StrictMode>
//       <ChakraProvider>
//     <App />
//     </ChakraProvider>
//   </React.StrictMode>


// )



import React from 'react';
import App from './App';
import './page/locales/index'
import theme from '@chakra-ui/theme';
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <ChakraProvider theme={theme}><App />
  </ChakraProvider>);

// ReactDOM.render(
//   <ChakraProvider theme={theme}>
//     <App />
//   </ChakraProvider>,
//   document.getElementById('root')
// );
