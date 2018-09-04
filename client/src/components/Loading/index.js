// modules
import React from 'react';
import PropTypes from 'prop-types';

// images
import logo from '../../styles/images/logo.png';

// styles
import styles from './styles';

export default function Loading({ loadingText }) {
  return (
    <div className={styles.containerStyles}>
      <div className={styles.contentStyles}>
        <img alt="Invitae Logo" className={styles.imageStyles} src={logo} />
        <h3>{ loadingText }</h3>
      </div>
    </div>
  );
};

Loading.propTypes = {
  loadingText: PropTypes.string,
};

Loading.defaultProps = {
  loadingText: 'Please Wait...',
};
