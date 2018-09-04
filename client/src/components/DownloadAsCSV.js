// modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { List } from 'immutable';

// utils
import { parseJSONAsCSV } from '../utils/data';

// components
import Button from '../components/Button';

export default class DownloadAsCSV extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    data: ImmutablePropTypes.list,
  };

  static defaultProps = {
    className: null,
    data: new List(),
  };

  state = {
    csv: null,
  };

  componentWillMount() {
    const { data } = this.props;
    const csv = parseJSONAsCSV(data);
    this.setState({ csv });
  }

  render() {
    const { children, className } = this.props;
    return (
      <Button
        className={className}
        download="cohortAnalysis.csv"
        href={encodeURI(this.state.csv)}
      >
        {children}
      </Button>
    )
  }
}