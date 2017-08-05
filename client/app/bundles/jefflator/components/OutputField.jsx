import React from 'react';

const OutputField = React.createClass({

  render(){
    return(
      <div>

        { this.props.data.submitting ?

          <div className="form-group" dangerouslySetInnerHTML={{ __html: this.props.loadingGifTag }} />

          :

          <div className="form-group">
            <label for ="description"> Translated text</label>
            <textarea  value={this.props.data.translatedText} className="form-control" id="description" placeholder="Translated text will show up here">
              {this.props.data.translatedText}
            </textarea>
          </div>

        }

      </div>
    )
  }

});

module.exports = OutputField;