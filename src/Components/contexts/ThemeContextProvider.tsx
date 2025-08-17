'use client'
import { Theme } from "@radix-ui/themes";
import React, { createContext, ReactNode, useContext, useState } from "react";

export const ThemeContext = createContext<{
  isDark : boolean,
  setIsDark : ((x : boolean)=> void) 
}>({
   isDark : true,
   setIsDark: () => {},
});

export default function ThemeContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isDark, setIsDark] = useState(true);

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark}}>
      <Theme appearance={isDark ? "dark" : "light"}>{children}</Theme>
    </ThemeContext.Provider>
  );
}



export function useThemeContext() {
  return useContext( ThemeContext);
}