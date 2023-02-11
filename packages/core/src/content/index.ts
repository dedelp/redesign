import { ParsedComponent } from "../component/parsedComponent";

export type ContentFragment =
  | string
  | ParsedComponent
  | (string | ParsedComponent)[];
