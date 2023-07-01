import { ReactNode, createContext, useContext, useCallback, useState, useMemo } from 'react'

type DOMRefContextProps<T extends HTMLElement> = {
  DOMref: Record<string, T>
  setRef: (node: T | null) => void
}

export const DOMRefContext = createContext<DOMRefContextProps<any>>({
  DOMref: {},
  setRef: () => {},
})

function DOMRefProvider<T extends HTMLElement>({ children }: { children: ReactNode }) {
  const [DOMref, setRefState] = useState<Record<string, T>>({})

  const setRef = useCallback((node: T | null) => {
    if (node) {
      setRefState((prevRefState) => ({
        ...prevRefState,
        [node.id]: node,
      }))
    }
  }, [])

  const value = useMemo(
    () => ({
      DOMref,
      setRef,
    }),
    [DOMref, setRef],
  )

  return <DOMRefContext.Provider value={value}>{children}</DOMRefContext.Provider>
}

export default DOMRefProvider

export function useDOMRef<T extends HTMLElement>() {
  const context = useContext(DOMRefContext) as unknown as DOMRefContextProps<T>

  if (!context) {
    throw new Error(
      `The \`useDOMRef\` hook must be used inside the <DOMRefProvider> component's context.`,
    )
  }

  return context
}
