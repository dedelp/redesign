import * as React from "react";
import { Block, BlockLibrary, BlockViewerProps } from "./block";
import { ParsedComponent } from "./component/parsedComponent";
import { ComponentLibrary, ComponentViewerProps } from "./component";
import { PageViewerProps } from "./page";
import { ContentFragmentViewerProps } from "./content/ContentFragmentViewer";
type SelectComponentAction = {
    type: "select_component";
    component: ParsedComponent | undefined;
};
type UpdateDoc = {
    type: "update_doc";
    doc?: Block[];
};
type Action = SelectComponentAction | UpdateDoc;
type Dispatch = (action: Action) => void;
type State = {
    selectedComponent?: ParsedComponent;
    doc?: Block[];
    contexts?: React.FC<{
        children: React.ReactNode;
    }>[];
    componentLibrary: ComponentLibrary;
    blockLibrary: BlockLibrary;
    blockViewer: React.FC<BlockViewerProps>;
    contentFragmentViewer: React.FC<ContentFragmentViewerProps>;
    componentViewer: React.FC<ComponentViewerProps>;
    pageViewer: React.FC<PageViewerProps>;
};
type RedesignProviderProps = {
    contexts?: React.FC<{
        children: React.ReactNode;
    }>[];
    children: React.ReactNode;
    componentLibrary: ComponentLibrary;
    blockLibrary: BlockLibrary;
    blockViewer?: React.FC<BlockViewerProps>;
    componentViewer?: React.FC<ComponentViewerProps>;
    contentFragmentViewer?: React.FC<ContentFragmentViewerProps>;
    pageViewer?: React.FC<PageViewerProps>;
};
declare function RedesignProvider({ children, componentLibrary, blockLibrary, blockViewer, componentViewer, contentFragmentViewer, pageViewer, contexts, }: RedesignProviderProps): JSX.Element;
declare function useRedesignContext(): {
    state: State;
    dispatch: Dispatch;
};
export { RedesignProvider, useRedesignContext };
//# sourceMappingURL=redesignContext.d.ts.map