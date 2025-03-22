import React, { createContext, useState, ReactNode, useEffect } from "react";

interface Props {
  children: ReactNode;
}

interface AppContext {
  filteredState: string[];
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
}

interface Filter {
  searchText: string;
  rating: string; // Add rating property
}

const AppContext = createContext<AppContext>({} as AppContext);

export const AppProvider = ({ children }: Props) => {
  const [filter, setFilter] = useState<Filter>({ searchText: "", rating: "" });
  const [state, setState] = useState([
    `B:\\PMV\\Let Me Keep My Socks On _67cb57d30c984c9d500fb5bb.mp4`,
    "B:\\PMV\\TREAT ME LIKE A SLUT - BBC PMV_67c9f370a114785c745c49f9.mp4",
    `B:\\PMV\\Fly Away - Remake_67b003e6a3670735224f53f9.mp4`,
    `B:\\PMV\\Hot Girl Mashup 10_65de67004fd7f5f5d64b8c98.mp4`,
    `B:\\PMV\\65a99e930d956f1c951bd8eb.mp4`,
    `B:\\PMV\\65a99e990d956f1c951bd8ec.mp4`,
    `B:\\PMV\\65a99e830d956f1c951bd8ea.mp4`,
    `B:\\PMV\\65a99e7c0d956f1c951bd8e9.mp4`,
    `B:\\PMV\\65a99e720d956f1c951bd8e7.mp4`,
    `B:\\PMV\\65a99e770d956f1c951bd8e8.mp4`,
    `B:\\PMV\\65a99e6d0d956f1c951bd8e6.mp4`,
    `B:\\PMV\\65a99e660d956f1c951bd8e5.mp4`,
    `B:\\PMV\\take it off_67bc17d80ad6d3c1d2af6539.mp4`,
    `B:\\PMV\\Try Not to Cum 4K 60FPS_67b5fbb3a5121fc1682e4c07 (1).mp4`,
    `B:\\PMV\\Hot Girl X-Mas - A Non-Nude Christmas PMV_6761a31c93b0de704c5943fb.mp4`,
    `B:\\PMV\\n a i l s d o n e l o n g - by helpless oblongata_672fb77503ea1664779fff9c.mp4`,
    `B:\\PMV\\stardust - by helpless oblongata_6761a1df47bf4f1ebcd4a140.mp4`,
    `B:\\PMV\\drip - by helpless oblongata_67893435e84743c588786bbd.mp4`,
    `B:\\PMV\\stardust - by helpless oblongata_6761a1df47bf4f1ebcd4a140.mp4`,
    `B:\\PMV\\NNN_67b2bad040afea774d121e2d.mp4`,
    `B:\\PMV\\You'll Love It - Goon PMV_67b5286da367073522e43f2e.mp4`,
    `B:\\PMV\\Slut Awakening Split Screen PMV _67b23ce0a367073522507368.mp4`,
    `B:\\PMV\\TikTok & Goon 18(nn vertical)_67ba17f240afea774d4ddd31.mp4`,
    `B:\\PMV\\JOON GOON FUEL - Asian PMV_666d1d3e11d53a2f7f252e01.mp4`,
    `B:\\PMV\\659a01b5e43d685238f775b7.mp4`,
    `B:\\PMV\\65a70ffe90be8822f6a50647 (1).mp4`,
    `B:\\PMV\\65a70ffe90be8822f6a50647.mp4`,
  ]);
  const [filteredState, setFilteredState] = useState<string[]>(state);

  useEffect(() => {
    const filtered = state.filter(
      (x) =>
        (filter.searchText
          ? x.toLowerCase().includes(filter.searchText.toLowerCase())
          : true) && (filter.rating ? x.includes(filter.rating) : true) // Add rating filter logic
    );
    console.log(filtered.length);
    setFilteredState(filtered);
  }, [state, filter]);

  return (
    <AppContext.Provider value={{ filteredState, filter, setFilter }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext }; // Ensure this line is present
