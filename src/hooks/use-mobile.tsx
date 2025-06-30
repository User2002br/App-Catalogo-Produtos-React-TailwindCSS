import * as React from "react"

// Ponto de quebra para considerar a tela como mobile
const MOBILE_BREAKPOINT = 768

/**
 * Hook customizado que retorna `true` se a largura da janela for menor que o `MOBILE_BREAKPOINT`.
 * Ele ouve as mudanças no tamanho da janela para atualizar o estado.
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}
