import { ComponentViewerProps } from "./ComponentViewer";

export interface ComponentLibrary {
  [key: string]: React.FC<any>;
}

export * from "./ComponentViewer";
export * from "./parsedComponent";
