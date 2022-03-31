import React, { FC, createContext, useState } from 'react';
import {
    defaultTheme,
    woodenTheme
} from 'src/constant';
interface ThemeProps {
    borderColor: string;
    whiteGrid: string;
    blackGrid: string;
    whitePieceColor: string;
    blackPieceColor: string;
    gridSize: number;
    fontSize: number;
}
interface ThemeContextProps {
    theme: ThemeProps;
    selectTheme: (t: string) => void;
}
export const ThemeContext = createContext<ThemeContextProps>({} as ThemeContextProps);

const ThemeContenxtProvider: FC = ({ children }) => {
    const [theme, setTheme] = useState<ThemeProps>(defaultTheme);
    return <ThemeContext.Provider
        value={{
            theme,
            selectTheme: (t: string) => {
                switch (t) {
                    case 'wooden':
                        setTheme(woodenTheme);
                        break;
                    default:
                        setTheme(defaultTheme);
                        break;
                }
            },
        }}
    >
        {children}
    </ThemeContext.Provider>

};
export default ThemeContenxtProvider;
