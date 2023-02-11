/// <reference types="react" />
import { ContentFragment } from "../content";
export interface BlockLibrary {
    [key: string]: Block;
}
export type Block = {
    type: "ReactNode";
    content: React.ReactNode;
} | {
    type: "RedesignBlock";
    children?: ContentFragment[];
};
export * from "./BlockViewer";
//# sourceMappingURL=index.d.ts.map