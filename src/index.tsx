import { createRoot } from 'react-dom/client'

import '@models/init'
import EntryPoint from '@layout/EntryPoint'

createRoot(document.getElementById('root')!).render(<EntryPoint />)
