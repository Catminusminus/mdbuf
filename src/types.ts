export type Item = {
  raw: string;
  html: string;
  id: string;
  updatedAt: number;
};

export type ItemWithOutline = Item & {
  outline: Array<any>;
};

export type EditorMode = "textarea" | "codemirror" | "monaco";
export type ToolMode = "preview" | "outline" | "help" | "recorder" | "share";

export type AppState = {
  wordCount: number;
  raw: string;
  html: string;
  outline: Array<any>;
  showPreview: boolean;
  toolMode: ToolMode;
  editorMode: EditorMode;
};
