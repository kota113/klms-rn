import {defaultConfig} from "@tamagui/config/v4";
import {createTamagui} from "tamagui";

const customThemes = {
  ...defaultConfig.themes,
  light: {
    ...defaultConfig.themes.light,
    background: '#f0f0f0', // 背景色を上書き
    color: '#333333',      // テキスト色を上書き
  },
  dark: {
    ...defaultConfig.themes.dark,
    background: '#1a1a1a', // 背景色を上書き
    color: '#e0e0e0',      // テキスト色を上書き
  },
};

export const config = createTamagui({
  ...defaultConfig,
  themes: customThemes,
});
