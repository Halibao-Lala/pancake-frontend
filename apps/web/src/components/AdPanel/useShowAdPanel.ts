import { atom, useAtom } from 'jotai'

const showAdPanelAtom = atom<boolean>(true)

export const useShowAdPanel = () => useAtom(showAdPanelAtom)
