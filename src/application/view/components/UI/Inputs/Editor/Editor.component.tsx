import React, { Component, ReactNode } from "react";

// @ts-ignore
import { CKEditor } from "@ckeditor/ckeditor5-react";
// @ts-ignore
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { TCKEditorCallback } from "../../../../../../resources/types/ckedtitor.type";
import { TCallback, TStringCallback } from "../../../../../../resources/types/common.type";

import "./Editor.style.scss";

export interface IEditorOwnProps {
  config?: any;
  data?: string;
  label: string;
  disabled?: boolean;
  onReady?: TCallback;
  onChange?: TStringCallback;
  onBlur?: TCKEditorCallback;
  onFocus?: TCKEditorCallback;
}

export interface IEditorInjectedProps {}
export interface IEditorProps extends IEditorOwnProps, IEditorInjectedProps {}

class Editor extends Component<IEditorProps> {
  onChange = (event: Event, editor: any): void => {
    const { onChange } = this.props;

    if (typeof onChange !== "undefined") {
      const value = editor.getData();
      onChange(value);
    }
  }

  render(): ReactNode {
    const { label, ...editorProps } = this.props;

    return (
      <div className="b-editor">
        <label className="editor-label">{label}</label>
        <CKEditor {...editorProps} editor={ClassicEditor} onChange={this.onChange} />
      </div>
    );
  }
}

export default Editor;
