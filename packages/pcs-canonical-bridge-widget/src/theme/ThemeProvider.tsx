import { ChakraProvider, createLocalStorageManager, theme } from '@chakra-ui/react'
import { useTheme } from 'styled-components'

interface ThemeProviderProps {
  children: React.ReactNode
}

export const colorModeManager = createLocalStorageManager(`pcsb-color-mode`)

const customTheme = {
  ...theme,
  // breakpoints: {
  //   ...theme.breakpoints,
  //   lg: '1080px',
  // },
  config: {
    ...theme.config,
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  styles: {
    global: () => ({
      '.bccb-widget-transfer-widget': {
        fontFamily: "'Kanit', -apple-system, Microsoft YaHei, sans-serif",
      },
    }),
  },
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const styledTheme = useTheme()
  console.log('styledTheme', styledTheme)
  return (
    <ChakraProvider
      colorModeManager={colorModeManager}
      theme={customTheme}
      toastOptions={{
        defaultOptions: {
          position: 'top',
        },
      }}
    >
      {children}
    </ChakraProvider>
  )
}
