import React, { Component } from 'react';
import { connect } from 'react-redux';

// Components
import Button from 'reactstrap/lib/Button';
import Progress from 'reactstrap/lib/Progress';

// Lib
import UploadManager from '../../../lib/upload-manager';

// CSS
import CSSModules from 'react-css-modules';
import styles from './styles.scss';

function FN() {}

@CSSModules(styles, { allowMultiple: true })
export default class Klass extends Component {
  static defaultProps = {
    resourceType: 'auto',
    onUploadStart: FN,
    onUploadEnd: FN,
    onUploadError: FN
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (this.inputFile) {
      let props = this.props;
      this.uploader = new UploadManager({
        uploadUrl: `https://api.cloudinary.com/v1_1/${props.cloudName}/${props.resourceType}/upload`,
        input: this.inputFile,
        maxSimultaneousUploads: 1,
        data: { upload_preset: props.uploadPreset },
        onFileAdded: (upload) => {
          this.setState({ error: false });

          upload.on('start', () => {
            props.onUploadStart();
            this.setState({ progress: 0 });
          }).on('progress', (progress, fileSize, uploadedBytes) => {
            this.setState({ progress: Math.floor(progress) });
          }).on('end', (data) => {
            this.setState({ progress: null });
            props.onUploadEnd(data);
          }).on('error', (error) => {
            this.setState({ error: true });
            props.onUploadError();
          });
        }
      });
    }
  }

  render() {
    let state = this.state;

    return (
      <div className="uploader">
        <div styleName="upload-input">
          <Button color={this.props.btnColor || 'secondary'}>{this.props.btnText}</Button>
          <input ref={input => this.inputFile = input} type="file" />
        </div>
        { null != state.progress ? <Progress value={state.progress}>{state.progress}%</Progress> : '' }
        { state.error ? this.props.errorMsg : '' }
      </div>
    )
  }
}

