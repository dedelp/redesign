import { Block } from ".";
import { useRedesignContext } from "../redesignContext";

export type BlockViewerProps = {
  block: Block;
};

export const BlockViewer: React.FC<BlockViewerProps> = ({ block }) => {
  const {
    state: { contentFragmentViewer: ContentFragmentViewer },
  } = useRedesignContext();
  return (
    <>
      {block.type == "RedesignBlock"
        ? block.children?.map((c, ix) => (
            <ContentFragmentViewer key={ix} fragment={c} />
          ))
        : block.content}
    </>
  );
};
