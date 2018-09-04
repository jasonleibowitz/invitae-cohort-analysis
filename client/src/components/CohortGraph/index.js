import React, { PureComponent } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Graph from 'react-cohort-graph';
import { List } from 'immutable';

import styles from './styles';

export default class CohortGraph extends PureComponent {
  componentWillMount() {
    const { data } = this.props;
    const parsedData = data.sort((a, b) => a.get('cohortKey').localeCompare(b.get('cohortKey'))).reduce((result, cohort) => {
      const orderArr = cohort.get('orders').map(o => o.get('numOrders'));
      result[cohort.get('dateRange')] = [cohort.get('numCustomers'), ...orderArr];
      return result;
    }, {});

    this.setState({ parsedData });
  }

  state = {
    parsedData: null,
  };

  render() {
    const { parsedData } = this.state;

    return (
      <div>
        <h2 className={styles.title}>Overall Orders by Week</h2>
        <Graph
          data={{
            weeks: parsedData,
          }}
        />
      </div>
    );
  }
}

CohortGraph.propTypes = {
  data: ImmutablePropTypes.list,
};

CohortGraph.defaultProps = {
  data: new List(),
}