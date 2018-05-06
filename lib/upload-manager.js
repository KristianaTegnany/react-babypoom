
const FN = function() {};


export default class UploadManager {
  constructor(options) {
    // dropContainer
    // input
    // data
    // key
    // maxSimultaneousUploads
    // onFileAdded
    // uploadUrl
    Object.assign(this, {
      maxSimultaneousUploads: -1,
      onFileAdded: FN,
    }, options);
    this.uploadsQueue = [];
    this.activeUploads = 0;
    this.initialize();
  }

  initialize() {
    let dropContainer = this.dropContainer;
    let input = this.input;

    let cancelEvent = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };

    let dragOverOnClass = (e) => {
      cancelEvent(e);
      dropContainer.classList.add('drag-over');
    };

    let dragOverOffClass = (e) => {
      cancelEvent(e);
      dropContainer.classList.remove('drag-over');
    };

    if (dropContainer) {
      dropContainer.addEventListener('dragenter', dragOverOnClass, false);
      dropContainer.addEventListener('dragover',  dragOverOnClass, false);
      dropContainer.addEventListener('dragleave', dragOverOffClass, false);

      dropContainer.addEventListener('drop', (e) => {
        cancelEvent(e);
        dragOverOffClass(e);
        this.processFiles(e.dataTransfer.files);
      }, false);
    }

    if (input) {
      input.addEventListener('change', (e) => this.processFiles(e.target.files), false);
    }
  }

  processFiles(files) {
    [...files].forEach(file => {
      if (!file.size) {
        // TODO
        return alert('Files with files size zero cannot be uploaded or multiple file uploads are not supported by your browser');
      }
      this.processFile(new FileUpload(file));
    });
  }

  processFile(upload) {
    this.onFileAdded(upload);

    if (this.getSignature) {
      this.getSignature((data) => {
        this.ajaxUpload(upload, data);
      });
    } else {
      this.ajaxUpload(upload);
    }
  }

  ajaxUpload(upload, data={}) {
    // Queue upload if maximum simultaneous uploads reached:
    if (this.activeUploads === this.maxSimultaneousUploads) {
      return this.uploadsQueue.push(upload);
    }

    let file = upload.file;
    data = { ...this.data, ...data };

    ++this.activeUploads;

    let xhr = new window.XMLHttpRequest();
    let formData = new window.FormData();
    let fileName = file.name;

    xhr.open('POST', this.uploadUrl);
    xhr.setRequestHeader('Accept', 'application/json, text/javascript', '*/*');
    let headers = this.headers || {};
    Object.keys(headers).forEach((name) => {
      let value = headers[name];
      if ('function' === typeof value) {
        value = value();
      }
      xhr.setRequestHeader(name, value);
    });

    let xhrUpload = xhr.upload;
    // Triggered when upload starts:
    xhrUpload.onloadstart = () => {
      // File size is not reported during start!
      upload.onStart();
    };

    // Triggered many times during upload:
    xhrUpload.onprogress = (event) => {
      if (!event.lengthComputable) {
        return;
      }
      // Update file size because it might be bigger than reported by the fileSize:
      upload.onProgress(event.total, event.loaded);
    };

    xhr.onloadend = (event) => {
      --this.activeUploads;

      if (404 === xhr.status) {
        upload.onError('Upload failed: ', upload.fileName);
      } else {
        let json;
        try { json = JSON.parse(xhr.responseText) } catch(e) { json = {}; }
        upload.onEnd(json);
      }
      this.onUploadComplete();
    };

    // Triggered when upload fails:
    xhrUpload.onerror = () => {
      upload.onError('Upload failed: ', upload.fileName);
    };

    // Append additional data if provided:
    if (data) {
      Object.keys(data).forEach(prop => {
        formData.append(prop, data[prop]);
      })
    }

    // Append file data:
    formData.append(this.key || 'file', file);

    // Initiate upload:
    xhr.send(formData);
  }

  onUploadComplete() {
    // Check if there are any uploads left in a queue:
    if (this.uploadsQueue.length) {
      this.ajaxUpload(this.uploadsQueue.shift());
    }
  }
}

class FileUpload {
  constructor(file) {
    this.file = file;
    this.fileName = file.name;
    this.fileSize = file.size;
    this.uploadedBytes = 0;
    this.eventHandlers = {};
  }

  on(eventName, handler) {
    this.eventHandlers[eventName] = handler;
    return this;
  }

  onStart() {
    (this.eventHandlers.start || FN)();
  }

  onProgress(fileSize, uploadedBytes) {
    let progress = uploadedBytes / fileSize * 100;
    (this.eventHandlers.progress || FN)(progress, fileSize, uploadedBytes);
  }

  onError(error) {
    (this.eventHandlers.error || FN)(error);
  }

  onEnd(data) {
    this.file = null;
    (this.eventHandlers.end || FN)(data);
  }
}





