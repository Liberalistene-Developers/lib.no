import {Mission} from '/react4xp/common/Mission/Mission';

interface MissionItem {
  description?: string;
  image?: {
    url?: string;
  };
  title?: string;
}

export interface MissionsBlockProps {
  items?: MissionItem[];
}

export const MissionsBlock = ({
  items = []
}: MissionsBlockProps) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-row gap-y-5 gap-x-5 flex-wrap my-5 [&>*]:w-[calc(50%-10px)] mobile:flex-col mobile:flex-nowrap mobile:[&>*]:w-full">
      {items && items.map((item) => (<Mission key={item.title} {...item} />))}
    </div>
  );
};
