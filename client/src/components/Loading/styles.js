import { css, keyframes } from 'emotion';

const containerStyles = css`{
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.2);
}`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const contentStyles = css`{
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  right: 0;
  margin: 0 auto;
}`;

const imageStyles = css`{
  width: 350px;
  animation: ${spin} 5s linear infinite;
}`;

export default {
  containerStyles,
  contentStyles,
  imageStyles,
  spin,
};
