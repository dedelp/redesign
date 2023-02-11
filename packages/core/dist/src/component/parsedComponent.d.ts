/// <reference types="react" />
export interface ParsedComponent {
    children?: React.ReactNode;
    type: string;
    propsSchema: {};
    path: string;
    props: Record<string, any>;
    position?: {
        start: number;
        end: number;
    };
}
//# sourceMappingURL=parsedComponent.d.ts.map