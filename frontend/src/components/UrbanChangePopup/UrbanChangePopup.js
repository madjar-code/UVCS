import React from 'react'
import styled from 'styled-components'

// Import popup icons
import typePopupIconCreation from '../../assets/icons/popup/type_creation.svg'
import typePopupIconDeletion from '../../assets/icons/popup/type_deletion.svg'
import typePopupIconModification from '../../assets/icons/popup/type_modification.svg'
import statusPopupIcon from '../../assets/icons/popup/status.svg'
import authorPopupIcon from '../../assets/icons/popup/author.svg'
import datePopupIcon from '../../assets/icons/popup/date.svg'
import durationPopupIcon from '../../assets/icons/popup/duration.svg'
import closeButtonIcon from '../../assets/icons/ui/close.svg'

const UrbanChangePopup = ({ isOpen, change, onClose }) => {
  if (!isOpen || !change) return null

  const fmt = (iso) => {
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
    if (!d1 || !d2 || Number.isNaN(d1.getTime()) || Number.isNaN(d2.getTime())) return '-'
    const diff = Math.abs(d2 - d1)
    return `${Math.round(diff / (1000 * 60 * 60 * 24))} days`
  }

  const typeFilter = (t) => {
    console.log(t)
    const v = String(t || '').toLowerCase()
    if (v === 'creation') return typePopupIconCreation
    if (v === 'deletion') return typePopupIconDeletion
    if (v === 'modification') return typePopupIconModification
    return 'none'
  }

  return (
    <ChangePopupModal onClick={onClose}>
      <ChangePopupContent onClick={(e) => e.stopPropagation()}>
        <ChangePopupHeader>
          <ChangePopupTitle>{change.title}</ChangePopupTitle>
          <CloseButton onClick={onClose}>
            <img src={closeButtonIcon} alt="Close" />
          </CloseButton>
        </ChangePopupHeader>

        <ChangePopupDescription>
          {change.description || ''}
        </ChangePopupDescription>

        <ChangePopupSections>
          <ChangePopupSection>
            <ChangePopupSectionTitle>General</ChangePopupSectionTitle>
            <ChangePopupInfo>
              <ChangePopupInfoItem>
                <img src={typeFilter(change.type)} alt="Type"/>
                <div>
                  <span>Type</span>
                  <span>{String(change.type || '').toLowerCase()}</span>
                </div>
              </ChangePopupInfoItem>
              <ChangePopupInfoItem>
                <img src={statusPopupIcon} alt="Status" />
                <div>
                  <span>Status</span>
                  <span>{String(change.status || '').toLowerCase()}</span>
                </div>
              </ChangePopupInfoItem>
              <ChangePopupInfoItem>
                <img src={authorPopupIcon} alt="Author" />
                <div>
                  <span>Author</span>
                  <span>{change.author || '-'}</span>
                </div>
              </ChangePopupInfoItem>
            </ChangePopupInfo>
          </ChangePopupSection>

          <ChangePopupSection>
            <ChangePopupSectionTitle>Dates</ChangePopupSectionTitle>
            <ChangePopupInfo>
              <ChangePopupInfoItem>
                <img src={datePopupIcon} alt="Start Date" />
                <div>
                  <span>Start Date</span>
                  <span>{fmt(change?.dates?.start)}</span>
                </div>
              </ChangePopupInfoItem>
              <ChangePopupInfoItem>
                <img src={datePopupIcon} alt="End Date" />
                <div>
                  <span>End Date</span>
                  <span>{fmt(change?.dates?.end)}</span>
                </div>
              </ChangePopupInfoItem>
              <ChangePopupInfoItem>
                <img src={durationPopupIcon} alt="Time Interval" />
                <div>
                  <span>Time Interval</span>
                  <span>{change?.ui?.time_interval_text || daysBetween(change?.dates?.start, change?.dates?.end)}</span>
                </div>
              </ChangePopupInfoItem>
            </ChangePopupInfo>
          </ChangePopupSection>
        </ChangePopupSections>
      </ChangePopupContent>
    </ChangePopupModal>
  )
}

// Styled Components
const ChangePopupModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

const ChangePopupContent = styled.div`
  background-color: var(--color-gray-3);
  border-radius: 10px;
  padding: 20px;
  width: 90%;
  width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  color: white;
`

const ChangePopupHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`

const ChangePopupTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  color: white;
`

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    margin-top: -15px;
    width: 18px;
    height: 18px;
  }
`

const ChangePopupDescription = styled.p`
  opacity: 0.8;
`

const ChangePopupSections = styled.div`
  display: flex;
  gap: 24px;
  /* padding: 0 24px 24px 24px; */
`

const ChangePopupSection = styled.div`
  flex: 1;
`

const ChangePopupSectionTitle = styled.h3`
  font-size: 16px;
  font-weight: var(--font-weight-semibold);
  margin-bottom: 10px;
`

const ChangePopupInfo = styled.div`
  background-color: #2a2a2a;
  background-color: var(--color-dark);
  border-radius: 8px;
  padding: 14px;
`

const ChangePopupInfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  &:last-child {
    margin-bottom: 0;
  }
  img {
    width: 20px;
    height: 20px;
  }
  div {
    display: flex;
    flex-direction: column;

    span:first-child {
      opacity: 0.7;
    }
  }
`

export default UrbanChangePopup
