import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import config from "../config/config";

export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}

      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Editor
            apiKey={config.tyniMCE_ApiKey}
            initialValue={defaultValue}
            init={{
              initialValue: defaultValue,
              height: 500,
              menubar: false,
              plugins: ["redo", "undo", "forecolor"],
              toolbar: "undo redo| bold italic forecolor",
              file_picker_types: "",
              paste_block_drop: true,
              // content_style:
              //   "body { font-family:Helvetica,Arial,sans-serif; font-size:14px;  direction: ltr; }",
            }}
            onEditorChange={(content, editor) => {
              onChange(content);
            }}
          />
        )}
      />
    </div>
  );
}
