import React from 'react';
import ReactDOM from 'react-dom';

Array.prototype.sum = function (prop) {
    var total = 0
    for ( var i = 0, _len = this.length; i < _len; i++ ) {
        total += this[i][prop]
    }
    return total
}

var DocumentItem = React.createClass({

  propTypes: {
    document: React.PropTypes.object.isRequired
  },

  render: function() {
    return (
      <li>
        <a href={this.props.document.downloadUrl}>{this.props.document.upload_file_name}</a>
      </li>
    )
  }

});

var DocumentsList = React.createClass({

  propTypes: {
    documents: React.PropTypes.array.isRequired
  },

  render: function() {
    var documentItems = _.map(this.props.documents, function(document) {
      return <DocumentItem key={document.id} document={document} />;
    });

    return (
      <ul>
        {documentItems}
      </ul>
    )
  }

});

var FileInput = React.createClass({

  API_PATH_PREFIX: '/api/v1',

  // propTypes: {
  //   onCreateDocument: React.PropTypes.func.isRequired
  // },

  getInitialState: function() {
    return {
      errors: null,
      percentLoaded: null,
      downloadUrl: null,
    }
  },

  saveResource(file, downloadUrl, callbacks) {
    this.setState({downloadUrl: downloadUrl});
    return $.ajax({
      url:      this.API_PATH_PREFIX + '/documents',
      type:     'POST',
      dataType: 'json',
      data: {
        document: {
          direct_upload_url:   downloadUrl,
          upload_file_name:    file.name,
          upload_content_type: file.type,
          upload_file_size:    file.size
        }
      }
    });
  },

  uploadFile(file, uploadUrl, contentType, callbacks) {
    var deferred = $.Deferred();

    var xhr = new XMLHttpRequest();
    xhr.open('PUT', uploadUrl, true);
    xhr.setRequestHeader('Content-Type', contentType);

    xhr.onload = function() {
      if (xhr.status === 200) {
        callbacks.onProgress(file, file.size);
        deferred.resolve(uploadUrl.split('?')[0]);
      } else {
        deferred.reject(xhr);
      }
    };

    xhr.onerror = function() {
      deferred.reject(xhr);
    };

    xhr.upload.onprogress = function(e) {
      if (e.lengthComputable) {
        callbacks.onProgress(file, e.loaded);
      }
    };

    xhr.send(file);

    return deferred.promise();
  },

  getSignedUploadUrl(file) {
    return $.ajax({
      url:      this.API_PATH_PREFIX + '/uploads',
      type:     'POST',
      dataType: 'json',
      data: {
        upload: { filename: file.name }
      }
    });
  },

  createResource(file, callbacks){
    return this.getSignedUploadUrl(file)
    .then(function(data) {
      return this.uploadFile(file, data.upload.url, data.upload.content_type, callbacks);
    }.bind(this))
    .then(function(downloadUrl) {
      return this.saveResource(file, downloadUrl, callbacks);
    }.bind(this));
  },

  handleUploadFiles: function(e) {

    this.uploads = _.map(e.target.files, function(file) {
      return { name: file.name, size: file.size, loaded: 0 }
    });

    var _this = this;

    _.each(e.target.files, function(file) {
      this.createResource(file, { onProgress: this.handleProgress })
      .then(function(data) {
        this.handleResourceCreated(file, data.document);
      }.bind(this))
      .fail(function(xhr) {
        this.handleError(file, xhr);
      }.bind(this));
    }.bind(this));
  },

  handleProgress: function(file, loaded) {

    let upload = _.find(this.uploads, { name: file.name });
    if (upload) { upload.loaded = loaded; }

    this.setState({
      percentLoaded: Math.round((this.uploads.sum('loaded') / this.uploads.sum('size')) * 100) + '%'
    });
  },

  handleError: function(file, xhr) {
    this.setState({ errors: file.name + ' failed to upload' });
  },

  handleCreateDocument: function(document) {
    document.downloadUrl = this.state.downloadUrl;
    // TODO handle uploading multiple documents to an event
    // make an array of documents on eventForm
    // send array to server
    // iterate over array on server and connect each
    this.props.updateEventFormStateWithDocument(document);
  },

  handleResourceCreated: function(file, document) {
    this.uploads.splice(this.uploads.indexOf(file.name), 1);
    if (!this.uploads.length) {
      ReactDOM.findDOMNode(this.refs.fileElement).value = null;
      this.setState({
        percentLoaded: null
      });
    }

    this.handleCreateDocument(document);
  },

  render: function() {
    return (
      <div>
        <DocumentsList documents={this.props.documents} />
        <input ref="fileElement" type="file" accept="image/*" multiple={true} onChange={this.handleUploadFiles} />
        <span>{this.state.percentLoaded}</span>
        <span>{this.state.errors}</span>
      </div>
    )
  }
});

module.exports = FileInput;