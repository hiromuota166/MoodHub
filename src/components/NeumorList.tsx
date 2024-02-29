import { ReactNode } from "react";

interface NeumourListProps<T> {
  items: T[];
  // eslint-disable-next-line no-unused-vars
  renderItem: (item: T) => ReactNode;
}

function NeumourList<T>({ items, renderItem }: NeumourListProps<T>) {
  const render = renderItem;

  return (
    <div className="bg-background  shadow-boxOut my-8 rounded-2xl">
      <ul className="divide-y divide-slate-200">
        {items.map((item, i) => {
          return (
            <li key={i} className="px-4 text-font text-2xl text-center">
              {render(item)}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default NeumourList;
