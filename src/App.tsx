import { useState } from 'react'
import Navbar from './components/navbar'
import Footer from './components/footer'
import HomeSection from './sections/Home'
import CatalogSection from './sections/Catalog'
import Chatbot from './components/chatbot'
import './App.css'
import './index.css'

type Section = 'home' | 'catalog' | 'support'

function App() {
  const [currentSection, setCurrentSection] = useState<Section>('home')

  const renderSection = () => {
    switch (currentSection) {
      case 'home':
        return <HomeSection />
      case 'catalog':
        return <CatalogSection />
      case 'support':
        return <Chatbot />
      default:
        return <HomeSection />
    }
  }

  return (
    <div className="app">
      <Navbar 
        currentSection={currentSection} 
        onSectionChange={setCurrentSection} 
      />
      <div className="main-content">
        {renderSection()}
      </div>
      <Footer />
    </div>
  )
}

export default App
