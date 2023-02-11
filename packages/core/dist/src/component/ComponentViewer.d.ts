/// <reference types="react" />
import { ComponentLibrary } from ".";
import { ContentFragment } from "../content";
import { ParsedComponent } from "./parsedComponent";
export type ComponentViewerProps = {
    errors?: Record<string, string | undefined>;
    onSubmit?: any;
    setData?: any;
    component: ParsedComponent;
};
export type HasChildren = {
    children?: ContentFragment;
};
export declare function renderChildren(value: ContentFragment | undefined, props: any): string | JSX.Element[] | undefined;
export declare const componentClasses: Record<string, string>;
export declare const getComponentTypeName: (elm: ParsedComponent, Components: ComponentLibrary) => string;
export declare const getComponentType: (type: string, Components: ComponentLibrary) => import("react").FC<any>;
export declare function ComponentWrapper({ children, component, }: {
    children: React.ReactNode;
    component: ParsedComponent;
}): JSX.Element;
export declare function ComponentViewer(props: ComponentViewerProps): JSX.Element | null;
//# sourceMappingURL=ComponentViewer.d.ts.map