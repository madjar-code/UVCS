import React, { useState, useMemo, useRef, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Header/Header'
import DetailMapComponent from '../components/Map/DetailMapComponent'
import UrbanChangePopup from '../components/UrbanChangePopup/UrbanChangePopup'
import PinIcon from '../assets/icons/general/pin.svg'
import PersonIcon from '../assets/icons/detail/person.svg'
import StatusIcon from '../assets/icons/detail/status.svg'
import OwnershipIcon from '../assets/icons/detail/ownership.svg'
import TypeIcon from '../assets/icons/detail/type.svg'
import VersionIcon from '../assets/icons/detail/version.svg'
import DateIcon from '../assets/icons/detail/date.svg'
import DurationIcon from '../assets/icons/detail/duration.svg'

// Import history icons
import HistoryStatusIcon from '../assets/icons/history/status.svg'
import HistoryVersionIcon from '../assets/icons/history/version.svg'

// Import styled components
import * as S from './DetailPage.styled'

const DetailPage = () => {
  const { id } = useParams()
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [isChangePopupOpen, setIsChangePopupOpen] = useState(false)
  const [selectedChange, setSelectedChange] = useState(null)
  const [activeVersionIndex, setActiveVersionIndex] = useState(0)
  const galleryRef = useRef(null)
  const buildingData = useMemo(() => ({
    id: 1,
    name: 'The "Romashka" Building',
    address: '454 Park Avenue, Chisinau',
    coordinates: [47.0105, 28.8638], // Chisinau coordinates
    author: 'Ivan Magjar',
    history: [
      {
        title: 'UOV Title',
        status: 'Destroying',
        version: '10',
        statusText: 'status: destroying',
        color: '#dc3545',
        statusDate: '12/01/2024 - 17/05/2025',
        type: 'Building',
        ownership: 'Governmental',
        startDate: '15/01/2025',
        endDate: '17/05/2025',
        timeInterval: '120 days',
        description: `Latest version: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus euismod neque lobortis tincidunt molestie, est massa elementum felis, sed sodales velit ante et libero. Nullam maximus nunc at velit tempor, ut rutrum mauris rutrum. This building is currently being destroyed as part of urban renewal project. The demolition process started in January 2025 and is expected to complete by May 2025.`,
        images: [
          {
            full: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop&crop=center',
            main: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=650&h=300&fit=crop&crop=center',
            thumb: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=80&fit=crop&crop=center'
          },
          {
            full: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop&crop=center',
            main: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=650&h=300&fit=crop&crop=center',
            thumb: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&h=80&fit=crop&crop=center'
          },
          {
            full: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=800&fit=crop&crop=center',
            main: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=650&h=300&fit=crop&crop=center',
            thumb: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=100&h=80&fit=crop&crop=center'
          },
          {
            full: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&h=800&fit=crop&crop=center',
            main: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=650&h=300&fit=crop&crop=center',
            thumb: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=100&h=80&fit=crop&crop=center'
          }
        ]
      },
      {
        title: 'UOV Title',
        status: 'Modification',
        version: '9',
        statusText: 'status: changed',
        color: '#6f42c1',
        statusDate: '10/08/2024 - 12/01/2024',
        type: 'Building',
        ownership: 'Governmental',
        startDate: '10/08/2024',
        endDate: '12/01/2024',
        timeInterval: '155 days',
        description: `Version 9: This version shows the building during modification phase. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Major renovations were undertaken including facade improvements, interior restructuring, and modernization of utilities. The modification work was completed successfully in early 2024.`,
        images: [
          {
            full: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=800&fit=crop&crop=center',
            main: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=650&h=300&fit=crop&crop=center',
            thumb: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=100&h=80&fit=crop&crop=center'
          },
          {
            full: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&h=800&fit=crop&crop=center',
            main: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=650&h=300&fit=crop&crop=center',
            thumb: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=100&h=80&fit=crop&crop=center'
          },
          {
            full: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop&crop=center',
            main: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=650&h=300&fit=crop&crop=center',
            thumb: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&h=80&fit=crop&crop=center'
          }
        ]
      },
      {
        title: 'UOV Title',
        status: 'Construction',
        version: '8',
        statusText: 'status: construction',
        color: '#28a745',
        statusDate: '15/03/2024 - 10/08/2024',
        type: 'Building',
        ownership: 'Private',
        startDate: '15/03/2024',
        endDate: '10/08/2024',
        timeInterval: '148 days',
        description: `Version 8: Original construction phase of the building. Lorem ipsum dolor sit amet, consectetur adipiscing elit. This was the initial construction period when the building was first erected. The construction followed modern architectural standards and was completed on schedule.`,
        images: [
          {
            full: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&h=800&fit=crop&crop=center',
            main: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=650&h=300&fit=crop&crop=center',
            thumb: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=100&h=80&fit=crop&crop=center'
          },
          {
            full: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop&crop=center',
            main: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=650&h=300&fit=crop&crop=center',
            thumb: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=80&fit=crop&crop=center'
          }
        ]
      }
    ]
  }), [])

  const getActiveVersionData = () => {
    const activeVersion = buildingData.history[activeVersionIndex]
    if (!activeVersion) return buildingData

    return {
      ...buildingData,
      ...activeVersion,
      // Keep the base building info that doesn't change between versions
      id: buildingData.id,
      name: buildingData.name,
      address: buildingData.address,
      coordinates: buildingData.coordinates,
      author: buildingData.author
    }
  }

  const activeVersionData = getActiveVersionData()

  // Safety check for images
  const hasImages = activeVersionData.images && activeVersionData.images.length > 0
  const safeImageIndex = hasImages ? Math.min(activeImageIndex, activeVersionData.images.length - 1) : 0

  const handleThumbnailClick = (index) => {
    if (hasImages && index >= 0 && index < activeVersionData.images.length) {
      setActiveImageIndex(index)
    }
  }

  const handleMainImageClick = () => {
    if (hasImages) {
      setIsGalleryOpen(true)
    }
  }

  const closeGallery = () => {
    setIsGalleryOpen(false)
  }

  const nextImage = () => {
    if (hasImages && activeVersionData.images.length > 1) {
      setActiveImageIndex((prev) => {
        const nextIndex = (prev + 1) % activeVersionData.images.length
        return nextIndex
      })
    }
  }

  const prevImage = () => {
    if (hasImages && activeVersionData.images.length > 1) {
      setActiveImageIndex((prev) => {
        const prevIndex = (prev - 1 + activeVersionData.images.length) % activeVersionData.images.length
        return prevIndex
      })
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'ArrowRight') nextImage()
    if (e.key === 'ArrowLeft') prevImage()
    if (e.key === 'Escape') closeGallery()
  }

  const handleChangeClick = (change) => {
    setSelectedChange(change)
    setIsChangePopupOpen(true)
  }

  const handleVersionClick = (versionIndex) => {
    setActiveVersionIndex(versionIndex)
    // Reset image index when switching versions to avoid out-of-bounds errors
    setActiveImageIndex(0)
    // Close gallery if it's open to prevent confusion
    setIsGalleryOpen(false)
  }

  const closeChangePopup = () => {
    setIsChangePopupOpen(false)
    setSelectedChange(null)
  }

  useEffect(() => {
    if (isGalleryOpen && galleryRef.current) {
      galleryRef.current.focus()
    }
  }, [isGalleryOpen])

  // Reset image index if it's out of bounds for the current version
  useEffect(() => {
    if (hasImages) {
      if (activeImageIndex >= activeVersionData.images.length) {
        setActiveImageIndex(0)
      }
    } else {
      // If no images, ensure index is 0
      setActiveImageIndex(0)
    }
  }, [activeVersionIndex, hasImages, activeVersionData.images?.length])

  // Separate effect to handle image index bounds without causing infinite loops
  useEffect(() => {
    if (hasImages && activeImageIndex >= activeVersionData.images.length) {
      setActiveImageIndex(Math.max(0, activeVersionData.images.length - 1))
    }
  }, [activeImageIndex, hasImages, activeVersionData.images?.length])


  return (
    <S.PageContainer>
      <Header />

      <S.MainContent>
        <S.LeftPanel>
          <S.ImageSection>
            <S.MainImageContainer>
              {hasImages ? (
                <S.MainImage
                  src={activeVersionData.images[safeImageIndex].main}
                  alt={activeVersionData.name}
                  onClick={handleMainImageClick}
                />
              ) : (
                <S.MainImage
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=650&h=300&fit=crop&crop=center"
                  alt={activeVersionData.name}
                  onClick={handleMainImageClick}
                />
              )}
            </S.MainImageContainer>

            <S.ThumbnailContainer>
              {hasImages && activeVersionData.images.slice(0, 3).map((image, index) => (
                <S.ThumbnailWrapper key={index}>
                  <S.Thumbnail
                    src={image.thumb}
                    alt={`Thumbnail ${index + 1}`}
                    active={index === activeImageIndex}
                    onClick={() => handleThumbnailClick(index)}
                  />
                  {index === 2 && activeVersionData.images.length > 3 && (
                    <S.ThumbnailOverlay onClick={handleMainImageClick}>
                      +{activeVersionData.images.length - 2}
                    </S.ThumbnailOverlay>
                  )}
                </S.ThumbnailWrapper>
              ))}
            </S.ThumbnailContainer>
          </S.ImageSection>

          <S.InfoSection>
            <S.BuildingTitle>{activeVersionData.name}</S.BuildingTitle>
            <S.AddressContainer>
              <S.AddressIcon src={PinIcon} alt="Location" />
              <S.Address>{activeVersionData.address}</S.Address>
            </S.AddressContainer>
            <S.Author>
              <S.AuthorIcon src={PersonIcon} alt="Author" />
              {activeVersionData.author}
            </S.Author>
          </S.InfoSection>

          <S.DescriptionSection>
            <S.Description>{activeVersionData.description}</S.Description>
          </S.DescriptionSection>
        </S.LeftPanel>

        <S.RightPanel>
          <S.GeneralSection>
            <S.SectionTitle>General</S.SectionTitle>
            <S.InfoGrid>
              <S.InfoItem>
                <S.InfoIcon>
                  <img src={TypeIcon} alt="Type" />
                </S.InfoIcon>
                <S.InfoContent>
                  <S.InfoLabel>Type</S.InfoLabel>
                  <S.InfoValue>{activeVersionData.type}</S.InfoValue>
                </S.InfoContent>
              </S.InfoItem>

              <S.InfoItem>
                <S.InfoIcon>
                  <img src={VersionIcon} alt="Version" />
                </S.InfoIcon>
                <S.InfoContent>
                  <S.InfoLabel>Number of Version</S.InfoLabel>
                  <S.InfoValue>{activeVersionData.version}</S.InfoValue>
                </S.InfoContent>
              </S.InfoItem>

              <S.InfoItem>
                <S.InfoIcon>
                  <img src={StatusIcon} alt="Status" />
                </S.InfoIcon>
                <S.InfoContent>
                  <S.InfoLabel>Current Status</S.InfoLabel>
                  <S.InfoValue>{activeVersionData.status}</S.InfoValue>
                </S.InfoContent>
              </S.InfoItem>

              <S.InfoItem>
                <S.InfoIcon>
                  <img src={OwnershipIcon} alt="Ownership" />
                </S.InfoIcon>
                <S.InfoContent>
                  <S.InfoLabel>Ownership Type</S.InfoLabel>
                  <S.InfoValue>{activeVersionData.ownership}</S.InfoValue>
                </S.InfoContent>
              </S.InfoItem>
            </S.InfoGrid>
          </S.GeneralSection>

          <S.DatesSection>
            <S.SectionTitle>Dates</S.SectionTitle>
            <S.DateGrid>
              <S.DateItem>
                <S.InfoIcon>
                  <img src={DateIcon} alt="Start Date" />
                </S.InfoIcon>
                <S.DateContent>
                  <S.DateLabel>Start Date</S.DateLabel>
                  <S.DateValue>{activeVersionData.startDate}</S.DateValue>
                </S.DateContent>
              </S.DateItem>

              <S.DateItem>
                <S.InfoIcon>
                  <img src={DateIcon} alt="End Date" />
                </S.InfoIcon>
                <S.DateContent>
                  <S.DateLabel>End Date</S.DateLabel>
                  <S.DateValue>{activeVersionData.endDate}</S.DateValue>
                </S.DateContent>
              </S.DateItem>

              <S.DateItem>
                <S.InfoIcon>
                  <img src={DurationIcon} alt="Time Interval" />
                </S.InfoIcon>
                <S.DateContent>
                  <S.DateLabel>Time Interval</S.DateLabel>
                  <S.DateValue>{activeVersionData.timeInterval}</S.DateValue>
                </S.DateContent>
              </S.DateItem>
            </S.DateGrid>
          </S.DatesSection>

          <S.LocationSection>
            <S.SectionTitle>Location</S.SectionTitle>
            <S.MapContainer>
              <DetailMapComponent building={activeVersionData} />
            </S.MapContainer>
          </S.LocationSection>
        </S.RightPanel>
      </S.MainContent>

      <S.HistorySection>
        <S.HistoryTitle>History of Changes</S.HistoryTitle>
        <S.HistoryList>
          {buildingData.history.map((item, index) => (
            <React.Fragment key={index}>
              <S.HistoryItem
                active={index === activeVersionIndex}
                onClick={() => handleVersionClick(index)}
              >
                <S.HistoryItemTitle>{item.title}</S.HistoryItemTitle>
                <S.VersionInfo>
                  <img src={HistoryVersionIcon} alt="Version" />
                  version {item.version}
                </S.VersionInfo>
                <S.StatusInfo>
                  <img src={HistoryStatusIcon} alt="Status" />
                  {item.statusText}
                </S.StatusInfo>
              </S.HistoryItem>

              {index < buildingData.history.length - 1 && (
                <S.HistoryConnector onClick={() => handleChangeClick(item)}>
                  <S.StatusBadge color={item.color}>
                    {item.status}
                  </S.StatusBadge>
                  <S.ConnectorLine />
                  <S.StatusDate>{item.statusDate}</S.StatusDate>
                </S.HistoryConnector>
              )}
            </React.Fragment>
          ))}
        </S.HistoryList>
      </S.HistorySection>

      {isGalleryOpen && hasImages && (
        <S.GalleryModal ref={galleryRef} onClick={closeGallery} onKeyDown={handleKeyPress} tabIndex={0}>
          <S.CloseButton onClick={(e) => { e.stopPropagation(); closeGallery(); }}>×</S.CloseButton>
          <S.GalleryContent onClick={(e) => e.stopPropagation()}>

            <S.GalleryImageContainer>
              {activeVersionData.images.length > 1 && (
                <S.PrevButton onClick={prevImage} disabled={activeVersionData.images.length <= 1}>‹</S.PrevButton>
              )}
              <S.GalleryImage
                src={activeVersionData.images[safeImageIndex].full}
                alt={`${activeVersionData.name} - Image ${safeImageIndex + 1} of ${activeVersionData.images.length}`}
              />
              {activeVersionData.images.length > 1 && (
                <S.NextButton onClick={nextImage} disabled={activeVersionData.images.length <= 1}>›</S.NextButton>
              )}
            </S.GalleryImageContainer>

            {activeVersionData.images.length > 1 && (
              <S.ImageCounter>
                {safeImageIndex + 1} / {activeVersionData.images.length}
              </S.ImageCounter>
            )}

            <S.GalleryThumbnails>
              {activeVersionData.images.map((image, index) => (
                <S.GalleryThumbnail
                  key={index}
                  src={image.thumb}
                  alt={`Thumbnail ${index + 1}`}
                  active={index === safeImageIndex}
                  onClick={() => handleThumbnailClick(index)}
                />
              ))}
            </S.GalleryThumbnails>
          </S.GalleryContent>
        </S.GalleryModal>
      )}

      <UrbanChangePopup
        isOpen={isChangePopupOpen}
        change={selectedChange}
        onClose={closeChangePopup}
      />
    </S.PageContainer>
  )
}

export default DetailPage