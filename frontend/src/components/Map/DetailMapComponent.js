import React, { useEffect, useRef, memo } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import styled from 'styled-components'

// Fix for default markers in Leaflet with Webpack
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
})

const DetailMapComponent = ({ building }) => {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)

  useEffect(() => {
    if (!mapRef.current) return

    // Initialize map only once
    if (!mapInstanceRef.current) {
      const buildingCoords = building?.coordinates || [47.0105, 28.8638] // Default to Chisinau

      const map = L.map(mapRef.current, {
        center: buildingCoords,
        zoom: 16,
        zoomControl: true,
        scrollWheelZoom: true,
        doubleClickZoom: true,
        dragging: true
      })

      // Add tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map)

      mapInstanceRef.current = map
    }

    // Update marker and popup when building data changes
    if (mapInstanceRef.current) {
      // Clear existing markers
      mapInstanceRef.current.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          mapInstanceRef.current.removeLayer(layer)
        }
      })

      // Add new marker
      const buildingCoords = building?.coordinates || [47.0105, 28.8638]
      const marker = L.marker(buildingCoords).addTo(mapInstanceRef.current)

      if (building?.name) {
        marker.bindPopup(`
          <div style="font-family: 'Raleway', sans-serif;">
            <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 500;">${building.name}</h3>
            <p style="margin: 0; font-size: 12px; color: #666;">${building.address || 'Address not available'}</p>
          </div>
        `)
      }

      // Update map center if coordinates changed
      mapInstanceRef.current.setView(buildingCoords, 16)
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [building?.coordinates, building?.name, building?.address])

  return <MapContainer ref={mapRef} />
}

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
  
  .leaflet-container {
    background-color: var(--color-gray-4);
  }
  
  .leaflet-control-zoom {
    border: none;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
  
  .leaflet-control-zoom a {
    background-color: var(--color-gray-4);
    color: var(--color-white);
    border: none;
    
    &:hover {
      background-color: var(--color-gray-3);
    }
  }
  
  .leaflet-popup-content-wrapper {
    background-color: var(--color-gray-4);
    color: var(--color-white);
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
  
  .leaflet-popup-tip {
    background-color: var(--color-gray-4);
  }
`

export default memo(DetailMapComponent)
