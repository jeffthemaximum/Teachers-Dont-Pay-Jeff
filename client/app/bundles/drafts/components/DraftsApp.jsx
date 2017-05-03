import React from 'react';
import ReactOnRails from 'react-on-rails';
import axios from 'axios';

import BaseComponent from 'libs/components/BaseComponent';

import { EditorState, convertToRaw } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import basicTextStylePlugin from '../plugins/basicTextStylePlugin';

class MyEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty(),
    };

    /* Create an array of plugins to be passed to `Editor` */
    this.plugins = [
      basicTextStylePlugin,
    ];

    this.onSave = () => {
      var content = this.state.editorState.getCurrentContent();
      var raw = convertToRaw(content);
      console.log(raw);
    };
  }

  componentDidMount() {
    this.focus();
  }

  onChange = (editorState) => {
    this.setState({
      editorState,
    });
  }

  focus = () => {
    this.editor.focus();
  }

  handleBeforeInput(str) {
    const { editorState } = this.state;
    /* Get the selection */
    const selection = editorState.getSelection();

    /* Get the current block */
    const currentBlock = editorState.getCurrentContent()
      .getBlockForKey(selection.getStartKey());
    const blockType = currentBlock.getType();
    const blockLength = currentBlock.getLength();
    if (blockLength === 1 && currentBlock.getText() === '[') {
      this.onChange(resetBlockType(editorState, blockType !== TODO_BLOCK ? TODO_BLOCK : 'unstyled'));
      return true;
    }
    return false;
  }

  render() {
    const { editorState } = this.state;
    return (
      <div className="editor" onClick={this.focus}>
        <Editor
          editorState={editorState}
          onChange={this.onChange}
          plugins={this.plugins} // Pass the plugins to the Editor
          ref={(element) => { this.editor = element; }}
          placeholder="Tell your story"
          spellCheck
        />
        <button onClick={this.onSave}>Save</button>
      </div>
    );
  }
}

export default MyEditor;