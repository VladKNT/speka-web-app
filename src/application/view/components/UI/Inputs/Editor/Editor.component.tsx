import React, { Component, ReactNode } from "react";

// @ts-ignore
import { CKEditor } from "@ckeditor/ckeditor5-react";
// @ts-ignore
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { TCallback } from "../../../../../../resources/types/common.type";
import { TCKEditorCallback } from "../../../../../../resources/types/ckedtitor.type";

export interface IEditorOwnProps {
  config?: any;
  data?: string;
  disabled?: boolean;
  onReady?: TCallback;
  onBlur?: TCKEditorCallback;
  onFocus?: TCKEditorCallback;
  onChange?: TCKEditorCallback;
}

export interface IEditorInjectedProps {}
export interface IEditorProps extends IEditorOwnProps, IEditorInjectedProps {}

class Editor extends Component<IEditorProps> {
  render(): ReactNode {
    return (
      <CKEditor editor={ClassicEditor} {...this.props} />
    );
  }
}

export default Editor;
