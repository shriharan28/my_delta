import { useState, useEffect } from 'react'
import axios from 'axios'
import './index.css' // Make sure we are importing the main CSS

function App() {
  const [places, setPlaces] = useState([])
  const [newPlace, setNewPlace] = useState({ name: '', description: '', district: '' })

  useEffect(() => {
    fetchPlaces()
  }, [])

  const fetchPlaces = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/places')
      setPlaces(response.data)
    } catch (error) {
      console.error("Error fetching places:", error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://127.0.0.1:8000/api/places', newPlace)
      setNewPlace({ name: '', description: '', district: '' })
      fetchPlaces()
    } catch (error) {
      console.error("Error adding place:", error)
    }
  }

  return (
    <div className="flex flex-col min-h-screen font-sans">
      
      {/* Hero Header */}
      <header className="bg-blue-900 text-white py-12 px-4 text-center shadow-md">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">My Delta App</h1>
        <p className="text-blue-200 text-lg">Welcome to the Cauvery Delta Region</p>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-6xl mx-auto p-6 md:p-8">
        
        {/* Add Place Form */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-700 mb-6 border-b-2 border-blue-100 pb-2 inline-block">
            Add Your Favorite Place
          </h2>
          <form 
            onSubmit={handleSubmit} 
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-4 max-w-lg"
          >
            <input 
              type="text" 
              placeholder="Place Name (e.g., Kallanai Dam)" 
              value={newPlace.name}
              onChange={(e) => setNewPlace({...newPlace, name: e.target.value})}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required 
            />
            <input 
              type="text" 
              placeholder="District (e.g., Trichy)" 
              value={newPlace.district}
              onChange={(e) => setNewPlace({...newPlace, district: e.target.value})}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required 
            />
            <textarea 
              placeholder="Why is this place special?" 
              value={newPlace.description}
              onChange={(e) => setNewPlace({...newPlace, description: e.target.value})}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition min-h-[100px]"
              required 
            />
            <button 
              type="submit"
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-lg transition shadow-sm mt-2"
            >
              Submit Place
            </button>
          </form>
        </section>

        {/* Forum Grid */}
        <section>
          <h2 className="text-2xl font-bold text-gray-700 mb-6 border-b-2 border-blue-100 pb-2 inline-block">
            Forum: Community Places
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {places.length === 0 ? (
              <p className="text-gray-500 italic col-span-full">Loading places or no places found...</p>
            ) : (
              places.map((place) => (
                <div key={place.id} className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-800 hover:shadow-md transition">
                  <h3 className="text-xl font-bold text-blue-900 mb-2">{place.name}</h3>
                  <p className="text-sm text-gray-500 mb-3 uppercase tracking-wider font-semibold">
                    📍 {place.district}
                  </p>
                  <p className="text-gray-700 leading-relaxed">{place.description}</p>
                </div>
              ))
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 text-center py-6 mt-auto">
        <p>
          Wanna contribute to this website?{' '}
          <a href="#" className="text-blue-400 hover:text-blue-300 underline transition">
            GitHub
          </a>
        </p>
      </footer>
    </div>
  )
}

export default App