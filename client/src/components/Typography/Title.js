import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';

const containerStyles = css`
  font-size: 48px;
  text-align: center;
  margin: 0 0 20px;
`;

export default function Title({ children }) {
  return (
    <h1 className={containerStyles}>{children}</h1>
  )
}

Title.propTypes = {
  children: PropTypes.node.isRequired,
};
