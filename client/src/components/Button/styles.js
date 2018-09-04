import { css } from 'emotion';

const baseStyles = css`
  display: inline-block;
  background: rgb(7, 135, 178);
  font-size: 18px;
  padding: 10px 20px;
  border-radius: 3px;
  color: #FFF;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.3);
  cursor: pointer;
  border: 0;
  width: 200px;
  text-align: center;
`;

const buttonStyles = css`
  ${baseStyles}
  -webkit-appearance: none;
`;

const linkStyles = css`
  ${baseStyles}
  text-decoration: none;
`;

const warningButton = css`
  background: rgb(199, 59, 66);
`;

export default {
  buttonStyles,
  linkStyles,
  warningButton,
};

