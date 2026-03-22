import styled from 'styled-components'

// Main Layout Components
export const PageContainer = styled.div`
  min-height: 100vh;
  background-color: var(--color-background);
  color: var(--color-text);
  font-family: 'Raleway', sans-serif;
`

export const MainContent = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 60px;
  gap: 50px;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0 20px;
    gap: 20px;
  }
`

export const LeftPanel = styled.div`
  width: 650px;
  padding: 45px 0;

  @media (max-width: 768px) {
    width: 100%;
    padding: 20px 0;
  }
`

export const RightPanel = styled.div`
  width: 450px;
  padding: 45px 0;

  @media (max-width: 768px) {
    width: 100%;
    padding: 20px 0;
  }
`

// Image Section Components
export const ImageSection = styled.div`
  margin-bottom: 70px;
  width: 100%;
  display: flex;
  gap: 15px;

  @media (max-width: 768px) {
    flex-direction: column;
    margin-bottom: 40px;
  }
`

export const MainImageContainer = styled.div`
  width: 470px;
  height: 300px;
  border-radius: 8px;
  overflow: hidden;
  position: relative;

  @media (max-width: 768px) {
    width: 100%;
    height: 250px;
  }
`

export const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.02);
  }
`

export const ThumbnailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 160px;

  @media (max-width: 768px) {
    flex-direction: row;
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    align-items: flex-start;
    padding: 5px 0;

    &::-webkit-scrollbar {
      height: 4px;
    }
    &::-webkit-scrollbar-thumb {
      background: var(--color-gray-3);
      border-radius: 10px;
    }
  }
`

export const ThumbnailWrapper = styled.div`
  position: relative;
  width: 160px;
  height: 90px;

  @media (max-width: 768px) {
    min-width: 120px;
    height: 80px;
  }
`

export const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: ${props => props.active ? '2px solid var(--color-blue)' : 'none'};

  &:hover {
    opacity: 0.8;
    /* transform: scale(1.05); */
  }
`

export const ThumbnailOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
  font-weight: var(--font-weight-medium);
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`

// Info Section Components
export const InfoSection = styled.div`
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
`

export const BuildingTitle = styled.h1`
  font-size: 24px;
  font-weight: var(--font-weight-medium);
  margin: 0 0 8px 0;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`

export const AddressContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 8px 0;
`

export const AddressIcon = styled.img`
  width: 16px;
  height: 16px;
`

export const AuthorIcon = styled.img`
  margin-right: 6px;
`

export const Address = styled.p`
  font-size: 14px;
  /* color: var(--color-white); */
  margin: 0;
  opacity: 0.8;
`

export const Author = styled.div`
  font-size: 14px;
  width: 165px;
  height: 80px;
  border-radius: 5px;
  cursor: pointer;
  background-color: var(--color-gray-3);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 0;
  opacity: 0.6;
  position: absolute;
  right: 0;
  top: 0;

  @media (max-width: 768px) {
    position: static;
    width: 100%;
    margin-top: 15px;
  }
`

export const DescriptionSection = styled.div`
  margin-bottom: 20px;
`

export const Description = styled.p`
  font-size: 14px;
  line-height: 1.6;
  margin: 0;
  opacity: 0.9;
`

// History Section Components
export const HistorySection = styled.div`
  max-width: 1150px;
  margin: 0 auto 40px auto;

  @media (max-width: 768px) {
    margin: 0 20px 30px 20px;
  }
`

export const HistoryTitle = styled.h2`
  font-size: 18px;
  font-weight: var(--font-weight-medium);
  color: var(--color-white);
  margin: 0 0 20px 0;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`

export const HistoryList = styled.div`
  display: flex;
  gap: 15px;
  align-items: flex-start;
  justify-content: flex-start;

  @media (max-width: 768px) {
    overflow-x: auto;
    padding-bottom: 10px;
  }
`

export const HistoryItem = styled.div`
  background-color: ${props => props.active ? 'var(--color-blue)' : 'var(--color-gray-4)'};
  padding: 10px;
  width: 180px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid ${props => props.active ? 'var(--color-blue)' : 'var(--color-gray-1)'};

  &:hover {
    background-color: ${props => props.active ? 'var(--color-blue)' : 'var(--color-gray-3)'};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    min-width: 160px;
  }
`

export const HistoryItemTitle = styled.h3`
  font-size: 14px;
  text-align: center;
  font-weight: var(--font-weight-medium);
  color: var(--color-white);
  margin: 0;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const HistoryConnector = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 120px;
  gap: 8px;
  cursor: pointer;

  @media (max-width: 768px) {
    min-width: 100px;
  }
`

export const TypeBadge = styled.div`
  background-color: ${props => props.color || 'var(--color-gray-3)'};
  color: white;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: var(--font-weight-medium);
  text-align: center;
  white-space: nowrap;
`

export const ConnectorLine = styled.div`
  width: 2px;
  height: 30px;
  background-color: var(--color-gray-3);
`

export const StatusDate = styled.div`
  font-size: 10px;
  color: var(--color-white);
  opacity: 0.7;
  text-align: center;
  white-space: nowrap;
`

export const VersionInfo = styled.span`
  font-size: 12px;
  color: var(--color-white);
  opacity: 0.7;
  display: flex;
  align-items: center;
  gap: 6px;

  img {
    width: 14px;
    height: 14px;
  }
`

export const StatusInfo = styled.span`
  font-size: 12px;
  color: var(--color-white);
  opacity: 0.7;
  display: flex;
  align-items: center;
  gap: 6px;

  img {
    width: 14px;
    height: 14px;
  }
`

// Right Panel Styles
export const GeneralSection = styled.div`
  margin-bottom: 30px;
`

export const SectionTitle = styled.h2`
  font-size: 16px;
  font-weight: var(--font-weight-medium);
  color: var(--color-white);
  margin: 0 0 15px 0;
`

export const InfoGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 17px;
  background-color: var(--color-gray-3);
  padding: 20px;
  border-radius: 10px;
`

export const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

export const InfoIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;

  img {
    width: 25px;
    height: 25px;
  }
`

export const InfoContent = styled.div`
  flex: 1;
`

export const InfoLabel = styled.div`
  font-size: 12px;
  color: var(--color-white);
  opacity: 0.7;
`

export const InfoValue = styled.div`
  font-size: 14px;
  color: var(--color-white);
  font-weight: var(--font-weight-medium);
`

export const DatesSection = styled.div`
  margin-bottom: 30px;
`

export const DateGrid = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  background-color: var(--color-gray-3);
  padding: 20px;
  border-radius: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
  }
`

export const DateItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
`

export const DateContent = styled.div`
  flex: 1;
`

export const DateLabel = styled.div`
  font-size: 12px;
  color: var(--color-white);
  opacity: 0.7;
`

export const DateValue = styled.div`
  font-size: 14px;
  color: var(--color-white);
  font-weight: var(--font-weight-medium);
`

export const LocationSection = styled.div`
  margin-bottom: 30px;
`

export const MapContainer = styled.div`
  width: 100%;
  height: 200px;
  border-radius: 8px;
  overflow: hidden;
  background-color: var(--color-gray-4);
`

// Gallery Modal Styles
export const GalleryModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

export const GalleryContent = styled.div`
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  cursor: default;

  @media (max-width: 768px) {
    max-width: 100vw;
    max-height: 100vh;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`

export const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 40px;
  border: none;
  color: white;
  width: 40px;
  height: 40px;
  padding-bottom: 4px;
  cursor: pointer;
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;

  @media (max-width: 768px) {
    top: 10px;
    right: 10px;
    font-size: 32px;
    width: 36px;
    height: 36px;
  }
`

export const GalleryImageContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const GalleryImage = styled.img`
  max-width: 80vw;
  max-height: 70vh;
  object-fit: contain;
  border-radius: 8px;

  @media (max-width: 768px) {
    max-width: 100vw;
    max-height: 60vh;
    border-radius: 0;
  }
`

export const PrevButton = styled.button`
  position: absolute;
  left: -60px;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding-bottom: 5px;
  padding-right: 5px;
  font-size: 40px;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.3);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    left: 10px;
    font-size: 32px;
    width: 40px;
    height: 40px;
    background: rgba(0, 0, 0, 0.6);
  }
`

export const NextButton = styled.button`
  position: absolute;
  right: -60px;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding-bottom: 5px;
  padding-left: 5px;
  font-size: 40px;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.3);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    right: 10px;
    font-size: 32px;
    width: 40px;
    height: 40px;
    background: rgba(0, 0, 0, 0.6);
  }
`

export const GalleryThumbnails = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
  max-width: 80vw;
  overflow-x: auto;

  @media (max-width: 768px) {
    max-width: 100vw;
    padding: 0 10px;
    gap: 8px;
    margin-top: 15px;
  }
`

export const GalleryThumbnail = styled.img`
  width: 60px;
  height: 48px;
  object-fit: cover;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: ${props => props.active ? '2px solid var(--color-blue)' : 'none'};

  &:hover {
    /* transform: scale(1.1); */
    ${props => !props.active && 'border: 2px solid var(--color-blue);'}
  }

  @media (max-width: 768px) {
    width: 50px;
    height: 40px;
  }
`

export const ImageCounter = styled.div`
  color: white;
  font-size: 14px;
  text-align: center;
  margin-top: 10px;
  opacity: 0.8;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 4px 12px;
  border-radius: 12px;
  display: inline-block;

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 3px 10px;
    margin-top: 8px;
  }
`
