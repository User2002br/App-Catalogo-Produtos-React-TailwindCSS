import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Cria a raiz da aplicação React e renderiza o componente principal 'App'.
createRoot(document.getElementById("root")!).render(<App />);