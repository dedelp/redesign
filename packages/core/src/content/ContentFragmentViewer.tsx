import { ContentFragment } from ".";
import { useRedesignContext } from "../redesignContext";

export type ContentFragmentViewerProps = {
  fragment: ContentFragment;
  key: number;
};

export const ContentFragmentViewer: React.FC<{ fragment: ContentFragment }> = ({
  fragment,
}) => {
  const {
    state: { componentViewer: ComponentViewer },
  } = useRedesignContext();
  if (Array.isArray(fragment))
    return (
      <>
        {fragment.map((f, ix) => (
          <ContentFragmentViewer key={ix} fragment={f} />
        ))}
      </>
    );
  if (typeof fragment == "string") return <>{fragment}</>;
  return <ComponentViewer component={fragment} />;
};
