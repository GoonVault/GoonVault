import React, { createContext, useContext, useState } from "react";

interface LayoutContextType {
  columnsPerRow: number;
  setColumnsPerRow: (columns: number) => void;
  getTileDimensions: () => { width: number; height: number };
}

const LayoutContext = createContext<LayoutContextType | null>(null);

export const LayoutProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [columnsPerRow, setColumnsPerRow] = useState(4);

  const getTileDimensions = () => {
    // Account for window width minus some padding and gaps
    const availableWidth = window.innerWidth - 48; // 24px padding on each side
    const gapWidth = (columnsPerRow - 1) * 16; // 16px gap between tiles
    const tileWidth = Math.floor((availableWidth - gapWidth) / columnsPerRow);
    // Maintain 16:9 aspect ratio for tiles
    const tileHeight = Math.floor(tileWidth * (9 / 16));

    return { width: tileWidth, height: tileHeight };
  };

  return (
    <LayoutContext.Provider
      value={{
        columnsPerRow,
        setColumnsPerRow,
        getTileDimensions,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }
  return context;
};
