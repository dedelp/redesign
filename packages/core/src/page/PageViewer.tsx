import { Page } from ".";
import { useRedesignContext } from "../..";

export type PageViewerProps = {
  page: Page;
};

export const PageViewer: React.FC<PageViewerProps> = ({ page }) => {
  const {
    state: { blockViewer: BlockViewer, blockLibrary },
  } = useRedesignContext();
  return (
    <>
      Page
      {page.blocks?.map((name, ix) => {
        const block = blockLibrary?.[name];
        return block ? (
          <BlockViewer key={ix} block={block} />
        ) : (
          <>Cannot find {name}</>
        );
      })}
    </>
  );
};
