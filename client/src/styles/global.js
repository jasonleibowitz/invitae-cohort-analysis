import { injectGlobal } from 'emotion';

export default injectGlobal`
  * {
    box-sizing: border-box;
    font-family: Helvetica;
  };

  html,
  body {
    margin: 0;
  }
`;