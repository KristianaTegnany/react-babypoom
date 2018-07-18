import React, { Component } from 'react'
import { connect } from 'react-redux'

import { defineMessages } from 'react-intl'

// Components
import Button from 'reactstrap/lib/Button'
import Progress from 'reactstrap/lib/Progress'
import Modal from 'reactstrap/lib/Modal'
import ModalHeader from 'reactstrap/lib/ModalHeader'
import ModalBody from 'reactstrap/lib/ModalBody'
import ModalFooter from 'reactstrap/lib/ModalFooter'

// i18n
import t from '../../i18n/i18n'
import FORM_MSG from '../../i18n/messages/form'

// Lib
import UploadManager from '../../../lib/upload-manager'

// CSS
import styles from './styles.scss'

function FN() {}

let IMG_DIM = 650

export default class Klass extends Component {
  static WEBCAM_SUPPORT =
    'undefined' !== typeof navigator &&
    navigator.mediaDevices &&
    navigator.mediaDevices.getUserMedia &&
    // No need to access the webcam on mobile or tablet, input file + capture is ok
    !navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i)

  static defaultProps = {
    resourceType: 'auto',
    onUploadStart: FN,
    onUploadEnd: FN,
    onUploadError: FN,
  }

  constructor(props) {
    super(props)
    this.state = {
      cameraModal: false,
      loadingCam: true,
      snap: false,
    }

    this.uploadFile = ::this.uploadFile
    this.videoPlay = ::this.videoPlay
    this.uploadCameraPicture = ::this.uploadCameraPicture
    this.takePicture = ::this.takePicture
    this.showCameraModal = ::this.showCameraModal
    this.closeCameraModal = ::this.closeCameraModal

    this.uploader = new UploadManager({
      uploadUrl: `https://api.cloudinary.com/v1_1/${props.cloudName}/${props.resourceType}/upload`,
      maxSimultaneousUploads: 1,
      data: { upload_preset: props.uploadPreset },
      onFileAdded: upload => {
        this.setState({ error: false })

        upload
          .on('start', () => {
            props.onUploadStart()
            this.setState({ progress: 0 })
          })
          .on('progress', (progress, fileSize, uploadedBytes) => {
            this.setState({ progress: Math.floor(progress) })
          })
          .on('end', data => {
            this.setState({ progress: null })
            props.onUploadEnd(data)
          })
          .on('error', error => {
            this.setState({ error: true })
            props.onUploadError()
          })
      },
    })

    this.initCamera()
  }

  initCamera() {
    if ('undefined' !== typeof navigator) {
      this.mediaDevices = navigator.mediaDevices || navigator
      this.mediaDevices.getMedia =
        this.mediaDevices.getUserMedia ||
        this.mediaDevices.webkitGetUserMedia ||
        this.mediaDevices.mozGetUserMedia ||
        this.mediaDevices.msGetUserMedia
      this.canvas = document.createElement('canvas')
      this.streaming = false
    }
  }

  uploadFile(e) {
    this.uploader.processFiles(e.target.files)
  }

  closeCameraModal() {
    if (this.stream && this.stream.getTracks) {
      this.stream.getTracks().forEach(track => track.stop())
    }
    this.setState({ snap: false, cameraModal: false })
  }

  showCameraModal() {
    this.setState({ cameraModal: true, loadingCam: true })
    navigator.mediaDevices
      .getUserMedia({
        video: true,
      })
      .then(stream => {
        this.stream = stream
        this.setState({ loadingCam: false })
        this.videoElt.src = (window.URL || window.webkitURL).createObjectURL(stream)
        this.videoElt.play()
      })
    // err => {
    //   this.toggleCameraModal(false)
    //   this.setState({ error: true })
    // }
    // )
  }

  videoPlay(e) {
    if (!this.streaming) {
      this.videoElt.setAttribute('width', '')
      let ratio = this.videoElt.videoWidth / this.videoElt.videoHeight
      let height = this.videoElt.clientWidth / ratio
      this.videoElt.setAttribute('height', height)
      let imgDim = Math.min(IMG_DIM, this.videoElt.videoWidth, this.videoElt.videoHeight)
      let canvasDim = [imgDim * ratio, imgDim]
      if (ratio < 1) canvasDim.reverse()
      this.canvas.setAttribute('width', canvasDim[0])
      this.canvas.setAttribute('height', canvasDim[1])
      this.streaming = true
    }
  }

  takePicture() {
    this.canvas
      .getContext('2d')
      .drawImage(this.videoElt, 0, 0, this.canvas.getAttribute('width'), this.canvas.getAttribute('height'))
    this.setState({ snap: true })
    this.photoElt.setAttribute('src', this.canvas.toDataURL('image/jpeg'))
  }

  uploadCameraPicture() {
    this.canvas.toBlob(blob => this.uploader.processFiles([blob]), 'image/jpeg', 90)
    this.closeCameraModal()
  }

  render() {
    let state = this.state

    return (
      <div>
        <div styleName="upload-input">
          <Button color={this.props.btnColor || 'secondary'}>{t(FORM_MSG.form_image_import)}</Button>
          <input onChange={this.uploadFile} type="file" accept="image/*" />
        </div>
        {null != state.progress && (
          <Progress styleName="progress" value={state.progress}>
            {state.progress}%
          </Progress>
        )}
        {this.constructor.WEBCAM_SUPPORT && (
          <Button styleName="camera-input" color={this.props.btnColor || 'secondary'} onClick={this.showCameraModal}>
            {t(FORM_MSG.form_image_capture)}
          </Button>
        )}
        {state.error ? this.props.errorMsg : ''}
        <Modal size="md" isOpen={this.state.cameraModal} toggle={this.closeCameraModal}>
          <ModalHeader className="modal-primary" toggle={this.closeCameraModal}>
            {t(FORM_MSG.form_image_capture)}
          </ModalHeader>
          <ModalBody styleName="modal">
            <div style={{ display: state.loadingCam ? 'none' : '' }}>
              <img styleName="img" ref={elt => (this.photoElt = elt)} style={{ display: state.snap ? '' : 'none' }} />
              <video
                styleName="video"
                ref={elt => (this.videoElt = elt)}
                style={{ display: state.snap ? 'none' : '' }}
                onLoadedMetadata={this.videoPlay}
              />
            </div>
          </ModalBody>
          <ModalFooter styleName="modal-footer">
            {state.snap ? (
              <div>
                <Button color={'app'} onClick={() => this.setState({ snap: false })}>
                  {t(MSG.take_another_pic)}
                </Button>
                <Button color={'primary'} onClick={this.uploadCameraPicture}>
                  {t(MSG.use_pic)}
                </Button>
              </div>
            ) : (
              <Button color={'primary'} onClick={this.takePicture}>
                {t(MSG.take_pic)}
              </Button>
            )}
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

const MSG = defineMessages({
  import_pic_from_camera: {
    id: 'webcam.import_pic_from_camera',
    defaultMessage: 'Importer une photo depuis la camera',
  },
  take_another_pic: {
    id: 'webcam.take_another_pic',
    defaultMessage: 'Prendre une autre photo',
  },
  use_pic: {
    id: 'webcam.use_pic',
    defaultMessage: 'Utiliser cette photo',
  },
  take_pic: {
    id: 'webcam.take_pic',
    defaultMessage: 'Prendre une photo',
  },
})
