import React, { useState, useRef, useEffect } from 'react'
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
  const [buildingData, setBuildingData] = useState({
    id: id ? Number(id) : null,
    name: '',
    address: '',
    coordinates: null,
    author: '',
    history: [],
    changes: [],
  })

  // API base URL (set REACT_APP_API_BASE to override, e.g., http://localhost:8000)
  const API_BASE = (process.env.REACT_APP_API_BASE || '').replace(/\/+$/, '')

  useEffect(() => {
    let isCancelled = false
    async function load() {
      try {
        const resp = await fetch(`${API_BASE}/api/v1/urban-objects/${id}`)
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`)
        const data = await resp.json()

        const versions = Array.isArray(data.versions) ? data.versions : []
        // Ensure newest-first (desc by start date)
        const versionsSorted = versions.slice().sort((a, b) => {
          const da = a?.dates?.start ? new Date(a.dates.start) : new Date(0)
          const db = b?.dates?.start ? new Date(b.dates.start) : new Date(0)
          return db - da
        })
        const history = versionsSorted.map((v) => ({
          id: v.id,
          title: v.title,
          status: v.status,
          version: String(v.number),
          type: v.type || data.type || '',
          ownership: v.ownership,
          address: v.address,
          dates: v.dates || { start: null, end: null },
          description: v.description,
          images: Array.isArray(v.images) ? v.images : [],
        }))

        const changes = Array.isArray(data.changes) ? data.changes : []
        const author = (changes[0]?.author) || ''
        const coordinates = Array.isArray(data.coordinates) && data.coordinates.length === 2 ? data.coordinates : null

        if (!isCancelled) {
          setBuildingData({
            id: data.id,
            name: data.name,
            address: data.address,
            coordinates,
            author,
            history,
            changes,
          })
          setActiveVersionIndex(0)
          setActiveImageIndex(0)
        }
      } catch (e) {
        console.error('Failed to load detail', e)
        if (!isCancelled) {
          setBuildingData((prev) => ({ ...prev, history: [], changes: [] }))
        }
      }
    }
    if (id) load()
    return () => { isCancelled = true }
  }, [id, API_BASE])

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
    const ui = mapChangeToUI(change)
    setSelectedChange({ ...change, ui: { ...(change.ui || {}), time_interval_text: ui.timeIntervalText } })
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
  }, [activeVersionIndex, hasImages, activeVersionData.images?.length, activeImageIndex])


  // Helpers to work with Urban Changes (connectors)
  const findChangeBetween = (vIdA, vIdB) => {
    const list = buildingData?.changes || []
    return (
      list.find(
        (c) =>
          (c.from_version_id === vIdA && c.to_version_id === vIdB) ||
          (c.from_version_id === vIdB && c.to_version_id === vIdA)
      ) || null
    )
  }

  const formatDate = (iso) => {
    if (!iso) return '-'
    const d = new Date(iso)
    if (Number.isNaN(d.getTime())) return ''
    const dd = String(d.getDate()).padStart(2, '0')
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const yyyy = d.getFullYear()
    return `${dd}/${mm}/${yyyy}`
  }

  const daysBetween = (a, b) => {
    const d1 = a ? new Date(a) : null
    const d2 = b ? new Date(b) : null
    if (!d1 || !d2 || Number.isNaN(d1.getTime()) || Number.isNaN(d2.getTime())) return null
    const diff = Math.abs(d2 - d1)
    return Math.round(diff / (1000 * 60 * 60 * 24))
  }

  const getChangeColor = (type) => {
    const t = (type || '').toLowerCase()
    if (t.includes('creation')) return '#28a745' // green
    if (t.includes('modification')) return '#6c757d' // gray
    if (t.includes('deletion')) return '#dc3545' // red
    return '#6c757d' // gray fallback
  }

  const mapChangeToUI = (change) => {
    if (!change) return { color: '#6c757d', statusDate: '', timeIntervalText: '' }
    const color = getChangeColor(change.type)
    const start = change.dates?.start
    const end = change.dates?.end
    const statusDate = [formatDate(start), formatDate(end)].filter(Boolean).join(' - ')
    const days = daysBetween(start, end)
    const timeIntervalText = days != null ? `${days} days` : ''
    return { color, statusDate, timeIntervalText }
  }

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
                <></>
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
                  <S.DateValue>{formatDate(activeVersionData.dates?.start)}</S.DateValue>
                </S.DateContent>
              </S.DateItem>

              <S.DateItem>
                <S.InfoIcon>
                  <img src={DateIcon} alt="End Date" />
                </S.InfoIcon>
                <S.DateContent>
                  <S.DateLabel>End Date</S.DateLabel>
                  <S.DateValue>{formatDate(activeVersionData.dates?.end)}</S.DateValue>
                </S.DateContent>
              </S.DateItem>

              <S.DateItem>
                <S.InfoIcon>
                  <img src={DurationIcon} alt="Time Interval" />
                </S.InfoIcon>
                <S.DateContent>
                  <S.DateLabel>Time Interval</S.DateLabel>
                  <S.DateValue>{(() => { const d = daysBetween(activeVersionData.dates?.start, activeVersionData.dates?.end); return d != null ? `${d} days` : '-' })()}</S.DateValue>
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
          {(() => {
            if (!buildingData.history || buildingData.history.length === 0) return null
            const latest = buildingData.history[0]
            const headChange = latest ? (buildingData.changes || []).find(
              (c) => c && c.from_version_id === latest.id && (c.to_version_id === null || c.to_version_id === undefined)
            ) : null
            if (!headChange) return null
            const ui = mapChangeToUI(headChange)
            return (
              <S.HistoryConnector onClick={() => handleChangeClick(headChange)}>
                <S.TypeBadge color={ui.color}>{headChange.type}</S.TypeBadge>
                <S.ConnectorLine />
                <S.StatusDate>{ui.statusDate}</S.StatusDate>
              </S.HistoryConnector>
            )
          })()}

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
                  {`status: ${String(item.status || '').toLowerCase()}`}
                </S.StatusInfo>
              </S.HistoryItem>

              {index < buildingData.history.length - 1 && (() => {
                const next = buildingData.history[index + 1]
                const change = next ? findChangeBetween(item.id, next.id) : null
                const ui = change ? mapChangeToUI(change) : { color: '#6c757d', statusDate: '' }
                return (
                  <S.HistoryConnector onClick={() => change && handleChangeClick(change)}>
                    <S.TypeBadge color={ui.color}>
                      {change?.type || item.type}
                    </S.TypeBadge>
                    <S.ConnectorLine />
                    <S.StatusDate>{ui.statusDate}</S.StatusDate>
                  </S.HistoryConnector>
                )
              })()}
            </React.Fragment>
          ))}

          {(() => {
            if (!buildingData.history || buildingData.history.length === 0) return null
            const earliest = buildingData.history[buildingData.history.length - 1]
            const tailChange = earliest ? (buildingData.changes || []).find(
              (c) => c && c.to_version_id === earliest.id && (c.from_version_id === null || c.from_version_id === undefined)
            ) : null
            if (!tailChange) return null
            const ui = mapChangeToUI(tailChange)
            return (
              <S.HistoryConnector onClick={() => handleChangeClick(tailChange)}>
                <S.TypeBadge color={ui.color}>{tailChange.type}</S.TypeBadge>
                <S.ConnectorLine />
                <S.StatusDate>{ui.statusDate}</S.StatusDate>
              </S.HistoryConnector>
            )
          })()}
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