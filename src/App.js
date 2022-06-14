import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { lazy, Suspense } from "react"

import { AppHeader } from "./components/appHeader/AppHeader"
import { Spinner } from "./components/spinner/Spinner"

const MainPage = lazy(() => import('./components/pages/MainPage'))
const ComicsPage = lazy(() => import('./components/pages/ComicsPage'))
const SinglePage = lazy(() => import('./components/pages/SinglePage'))
const SingleComicLayout = lazy(() => import('./components/pages/singleComicLayout/SingleComicLayout'))
const SingleCharacterLayout = lazy(() => import('./components/pages/singleCharacterLayout/SingleCharacterLayout'))
const Page404 = lazy(() => import('./components/pages/404'))

export const App = () => {
  
    return (
      <Router>
        <div className="app">
        <AppHeader />
        
        <main>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path='/character/:id' element={<SinglePage Component={SingleCharacterLayout} dataType='character'/>}/>
            <Route path="/comics" element={<ComicsPage />} />
            <Route path='/comics/:id' element={<SinglePage Component={SingleComicLayout} dataType='comic'/>}/>
            
            <Route path="*" element={<Page404 />}/>
          </Routes>
        </Suspense>
        </main>

      </div>
      </Router>
    )
}

