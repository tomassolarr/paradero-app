import { useState, useEffect } from 'react'
import './App.css'
import InfoParadero from './infoparadero'
import ParaderoFavorito from './BotonFavorito.jsx'
import ListaFavoritos from './listafavoritos.jsx'
import { useParams, useNavigate } from "react-router-dom";

function App() {
  
  const [paraderos, setParaderos] = useState([])
  const [searchP, setSearchP] = useState('')
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSearchP = (event) =>{
    setSearchP(event.target.value)
  }
  
  const busquedaParadero = async () => {
    if (!searchP.trim()) return;
    setCargando(true); 
    setError("");
    
    try {
      const response = await fetch(`https://api.xor.cl/red/bus-stop/${searchP}`);
      if (!response.ok) throw new Error();
      const datos = await response.json();
      setParaderos([datos]);
      navigate(`/${datos.id}`);
    } catch {
      setError("La API de paraderos no está disponible.");
      setParaderos([]);
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    if (id) {
      fetch(`https://api.xor.cl/red/bus-stop/${id}`)
        .then((r) => r.json())
        .then((datos) => {
          setParaderos([datos])
        })
        .catch(() => {
          setError("La API de paraderos no está disponible.");
          setParaderos([]);
        });
    }
  }, [id]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      busquedaParadero();
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>🚏 Paraderos Chile</h1>
        <p>Consulta el estado de tu paradero en tiempo real</p>
      </header>

      <div className="buscador">
        <div className="buscador-input-group">
          <input 
            value={searchP}
            onChange={handleSearchP}
            onKeyDown={handleKeyPress}
            placeholder="Ingresa el número del paradero..."
          />
          <button onClick={busquedaParadero} disabled={cargando}>
            {cargando ? "Cargando..." : "Buscar"}
          </button>
        </div>
      </div>

      {error && (
        <div className="error-container">
          <p className="error">{error}</p>
          <p className="error-link">
            Puedes ver el código fuente en: <a href="https://github.com/tu-usuario/paradero-app" target="_blank" rel="noopener noreferrer">https://github.com/tu-usuario/paradero-app</a>
          </p>
        </div>
      )}
      
      <ListaFavoritos />

      {cargando && (
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Consultando información del paradero...</p>
        </div>
      )}

      <div className="paraderos-grid">
        {paraderos.map(paradero => (
          <div key={paradero.id} className='paradero-card'>
            <div className='paradero-header'>
              <div className='paradero-info'>
                <h3>{paradero.name}</h3>
                <div className='paradero-meta'>
                  <span className='paradero-id'>{paradero.id}</span>
                  <span className='paradero-status'>{paradero.status_description}</span>
                </div>
              </div>
              <ParaderoFavorito paraderoId={paradero.id} />
            </div>
            
            {paradero.services && paradero.services.map(service=>(
              <InfoParadero
                key={service.id} 
                info={service}
                status={service.status_description}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
