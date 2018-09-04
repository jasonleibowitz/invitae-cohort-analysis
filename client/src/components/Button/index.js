import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './styles';

export default function Button({
  children,
  className,
  onClick,
  href,
  type,
  ...rest,
}) {
  if (href) {
    return (
      <a
        className={classnames(styles.linkStyles, type.className, className)}
        href={href}
        {...rest}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      className={classnames(styles.buttonStyles, type.className, className)}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}

Button.Types = {
  Default: {
    className: null,
  },
  Warning: {
    className: styles.warningButton,
  },
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  href: PropTypes.string,
  type: PropTypes.oneOf(Object.values(Button.Types)),
};

Button.defaultProps = {
  onClick: () => {},
  href: null,
  type: Button.Types.Default,
};