
import React, { Component, ReactNode } from "react";

// @ts-ignore-start
import { CKEditor } from "@ckeditor/ckeditor5-react";
// @ts-ignore
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
// @ts-ignore
import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
// @ts-ignore
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
// @ts-ignore
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
// @ts-ignore
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
// @ts-ignore
import Underline from "@ckeditor/ckeditor5-basic-styles/src/underline";
// @ts-ignore
import Strikethrough from "@ckeditor/ckeditor5-basic-styles/src/strikethrough";
// @ts-ignore
import Code from "@ckeditor/ckeditor5-basic-styles/src/code";
// @ts-ignore
import Subscript from "@ckeditor/ckeditor5-basic-styles/src/subscript";
// @ts-ignore
import Superscript from "@ckeditor/ckeditor5-basic-styles/src/superscript";
// @ts-ignore
import FontColor from "@ckeditor/ckeditor5-font/src/fontcolor";
// @ts-ignore
import FontBackgroundColor from "@ckeditor/ckeditor5-font/src/fontbackgroundcolor";

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

const editorConfiguration = {
  plugins: [
    Essentials,
    Bold,
    Italic,
    Underline,
    Strikethrough,
    Code,
    Subscript,
    Superscript,
    Paragraph,
    FontColor,
    FontBackgroundColor,
  ],
  toolbar: [
    "undo",
    "redo",
    "|",
    "bold",
    "italic",
    "underline",
    "strikethrough",
    "code",
    "subscript",
    "superscript",
    "|",
    "fontBackgroundColor",
  ],
};


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
        <CKEditor {...editorProps} config={editorConfiguration} editor={ClassicEditor} onChange={this.onChange} />
      </div>
    );
  }
}

export default Editor;
