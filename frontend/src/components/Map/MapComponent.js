import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styled from 'styled-components';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const MapWrapper = styled.div`
  width: 500px;
  height: calc(100vh - 53px);
  padding-top: 20px;
  padding-bottom: 20px;
  position: relative;
`;

const StyledMapContainer = styled(MapContainer)`
  height: 100%;
  width: 100%;
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

  .leaflet-popup {
    z-index: 1000 !important;
  }
`;

const LoadingContainer = styled.div`
  width: 500px;
  height: 100%;
  display: flex;
  padding-top: 20px;
  padding-bottom: 20px;
  justify-content: center;
  align-items: center;
`;

const LoadingWrapper = styled.div`
  background-color: var(--color-gray-3);
  color: var(--color-gray-1);
  font-size: 16px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ControlsContainer = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const MapAttribution = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  align-self: flex-end;
`;

const MapDataAttribution = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 10px;
  align-self: flex-end;
`;

const PopupContent = styled.div`
`;

const PopupTitle = styled.h3`
  margin: 0 0 8px 0;
  color: var(--color-white);
  font-size: 14px;
  font-weight: 500;
`;

const PopupDescription = styled.p`
  margin: 0;
  color: #666;
  font-size: 12px;
`;

const MapComponent = ({ buildings = [] }) => {
  const [isLoading, setIsLoading] = useState(true);

  // Default center coordinates (Chisinau, Moldova - Stephen the Great Central Park area)
  const defaultCenter = [47.0246, 28.8329];
  const defaultZoom = 12;

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <LoadingContainer>
        <LoadingWrapper>
          Loading map...
        </LoadingWrapper>
      </LoadingContainer>
    );
  }

  return (
    <MapWrapper>
      <StyledMapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        zoomControl={true}
      >
        {/* Use light theme tiles */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          maxZoom={20}
        />

        {buildings.map((building) => (
          <Marker
            key={building.id}
            position={building.coordinates}
          >
            <Popup>
              <PopupContent>
                <PopupTitle>{building.name}</PopupTitle>
                <PopupDescription>{building.address}</PopupDescription>
              </PopupContent>
            </Popup>
          </Marker>
        ))}
      </StyledMapContainer>

      {/* Zoom Controls positioned like Google Maps */}
      <ControlsContainer>
        {/* Google Maps attribution */}
        {/* <MapAttribution>Google</MapAttribution> */}
        {/* <MapDataAttribution>Map data ©2025</MapDataAttribution> */}
      </ControlsContainer>
    </MapWrapper>
  );
};

export default MapComponent;
