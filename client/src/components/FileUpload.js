// modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import { css } from 'emotion';

// utils
import { parseCSVAsJSON } from '../utils/data';

const containerStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60%;
  height: 200px;
  margin: 0 auto;
  text-align: center;
  border: 2px dashed rgb(102, 102, 102);
  border-radius: 5px;

  &:not(:first-of-type) {
    margin-top: 20px;
  }
`;

export default class FileUpload extends PureComponent {
  static propTypes = {
    description: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    onDrop: PropTypes.func,
    uploaded: PropTypes.bool,
    uploadedText: PropTypes.string,
  };

  static defaultProps = {
    disabled: false,
    onDrop: () => {},
    uploaded: false,
    uploadedText: 'Uploaded!',
  };

  handleDrop = acceptedFiles => {
    const { onDrop } = this.props;
    const reader = new FileReader();
    reader.onload = () => {
      const data = parseCSVAsJSON(reader.result);
      onDrop(data);
    };

    reader.readAsBinaryString(acceptedFiles[0]);
  }

  render() {
    const { disabled, description, uploaded, uploadedText } = this.props;

    if (uploaded) {
      return (
        <p>{uploadedText}</p>
      )
    }

    return (
      <Dropzone
        acceptStyle={{
          border: '2px solid rgb(163, 211, 114)',
          backgroundColor: 'rgb(238, 238, 238)',
        }}
        className={containerStyles}
        disabled={disabled}
        disabledStyle={{
          opacity: '0.2',
        }}
        multiple={false}
        onDrop={this.handleDrop}
      >
        <p>{description}</p>
      </Dropzone>
    );
  }
}
