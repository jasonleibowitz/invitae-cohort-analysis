// modules
import React, { PureComponent, Fragment } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { css } from 'emotion';

// data
import { purgeDatabase } from '../actions/base';
import { fetchCohortAnalysis } from '../actions/cohortAnalysis';
import { fetchCustomers, seedCustomers } from '../actions/customers';
import { fetchOrders, seedOrders } from '../actions/orders';
import { didPurgeDBSucceed, isPurgeDBInProgress } from '../reducers/base';
import {
  didCohortAnalysisRequestSucceed,
  getCohortAnalysis,
  isCohortAnalysisRequestInProgress,
} from '../reducers/cohortAnalysis';
import {
  didCustomerRequestSucceeded,
  isCustomerRequestInProgress,
  getNumCustomers,
} from '../reducers/customers';
import {
  didOrderRequestSucceeded,
  isOrderRequestInProgress,
  getNumOrders,
} from '../reducers/orders';

// utils
import { getHomepageLoadingText } from '../utils/ui';

// components
import Button from '../components/Button';
import CohortGraph from '../components/CohortGraph';
import DownloadAsCSV from '../components/DownloadAsCSV';
import FileUpload from '../components/FileUpload';
import Loading from '../components/Loading';
import Title from '../components/Typography/Title';

const containerStyles = css`
  padding: 20px;
`;

const downloadStyles = css`
  margin-left: 15px;
`;

class Home extends PureComponent {
  static propTypes = {
    cohortAnalysis: ImmutablePropTypes.list,
    didCohortAnalysisRequestSucceed: PropTypes.bool.isRequired,
    didCustomerRequestSucceeded: PropTypes.bool.isRequired,
    didOrderRequestSucceeded: PropTypes.bool.isRequired,
    didPurgeDBSucceed: PropTypes.bool.isRequired,
    fetchCohortAnalysis: PropTypes.func.isRequired,
    fetchCustomers: PropTypes.func.isRequired,
    isCohortAnalysisRequestInProgress: PropTypes.bool.isRequired,
    isCustomerRequestInProgress: PropTypes.bool.isRequired,
    isOrderRequestInProgress: PropTypes.bool.isRequired,
    isPurgeDBInProgress: PropTypes.bool.isRequired,
    numCustomers: PropTypes.number,
    numOrders: PropTypes.number,
    purgeDatabase: PropTypes.func.isRequired,
    seedCustomers: PropTypes.func.isRequired,
    seedOrders: PropTypes.func.isRequired,
  };

  static defaultProps = {
    numCustomers: null,
    numOrders: null,
  }

  state = {
    customersUploaded: false,
    ordersUploaded: false,
  };

  componentWillMount() {
    const { fetchCustomers } = this.props;
    fetchCustomers();
  }

  componentWillReceiveProps({
    didCohortAnalysisRequestSucceed,
    didCustomerRequestSucceeded,
    didOrderRequestSucceeded,
    fetchCohortAnalysis,
    fetchOrders,
    numCustomers,
    numOrders,
  }) {
    const {
      didCustomerRequestSucceeded: prevDidCustomerRequestSucceeded,
    } = this.props;
    const customerRequestChanged = didCustomerRequestSucceeded !== prevDidCustomerRequestSucceeded;

    if ((didCustomerRequestSucceeded && customerRequestChanged) && !didOrderRequestSucceeded) {
      fetchOrders();
    }

    if (didCustomerRequestSucceeded && didOrderRequestSucceeded && numCustomers && numOrders && !didCohortAnalysisRequestSucceed) {
      fetchCohortAnalysis();
    }
  }

  handleCustomersDropped = (customersJSON) => {
    const { seedCustomers } = this.props;
    seedCustomers(customersJSON);
  };

  handleOrdersDropped = (ordersJSON) => {
    const { seedOrders } = this.props;
    seedOrders(ordersJSON);
  };

  render() {
    const {
      cohortAnalysis,
      isCohortAnalysisRequestInProgress,
      isCustomerRequestInProgress,
      isOrderRequestInProgress,
      isPurgeDBInProgress,
      numCustomers,
      numOrders,
      purgeDatabase,
    } = this.props;

    return (
      <div className={containerStyles}>
        {
          (isCustomerRequestInProgress || isOrderRequestInProgress || isCohortAnalysisRequestInProgress || isPurgeDBInProgress) &&
          <Loading loadingText={getHomepageLoadingText({ isCustomerRequestInProgress, isOrderRequestInProgress, isCohortAnalysisRequestInProgress, isPurgeDBInProgress })} />
        }
        <Title>Invitae Cohort Analysis</Title>

        <FileUpload
          description="Drag your customers csv here, or click to display the file dialog."
          onDrop={this.handleCustomersDropped}
          uploaded={numCustomers > 0}
          uploadedText={`${numCustomers} customers uploaded!`}
        />

        <FileUpload
          disabled={numCustomers === 0}
          description="Drag your orders csv here, or click to display the file dialog."
          onDrop={this.handleOrdersDropped}
          uploaded={numOrders > 0}
          uploadedText={`${numOrders} orders uploaded!`}
        />

        {!(numCustomers === 0 && numOrders === 0) && <Button onClick={purgeDatabase} type={Button.Types.Warning}>Start Over</Button>}
        {cohortAnalysis && (
          <Fragment>
            <DownloadAsCSV className={downloadStyles} data={cohortAnalysis}>Download as CSV</DownloadAsCSV>
            <CohortGraph data={cohortAnalysis} />
          </Fragment>
        )}
      </div>
    );
  }
}

export default connect(createStructuredSelector({
  cohortAnalysis: getCohortAnalysis,
  didCohortAnalysisRequestSucceed,
  didCustomerRequestSucceeded,
  didOrderRequestSucceeded,
  didPurgeDBSucceed,
  isCohortAnalysisRequestInProgress,
  isCustomerRequestInProgress,
  isOrderRequestInProgress,
  isPurgeDBInProgress,
  numCustomers: getNumCustomers,
  numOrders: getNumOrders,
}), {
  fetchCohortAnalysis,
  fetchCustomers,
  fetchOrders,
  purgeDatabase,
  seedCustomers,
  seedOrders,
})(Home);