import React from 'react'
import styled from 'styled-components'

// Import popup icons
import typePopupIcon from '../../assets/icons/popup/type.svg'
import statusPopupIcon from '../../assets/icons/popup/status.svg'
import authorPopupIcon from '../../assets/icons/popup/author.svg'
import datePopupIcon from '../../assets/icons/popup/date.svg'
import durationPopupIcon from '../../assets/icons/popup/duration.svg'
import closeButtonIcon from '../../assets/icons/ui/close.svg'

const UrbanChangePopup = ({ isOpen, change, onClose }) => {
  if (!isOpen || !change) return null

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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus euismod, neque lobortis
          tincidunt malesuada, est massa elementum felis, quis sodales velit ante et libero. Nullam
          maximus nunc velit, malesuada, non semper ipsum luctus. Suspendisse eu magna risus. Ut ac
          feugiat leo, cursus posuere felis. Nulla magna justo, sodales nec congue ac, auctor id enim.
          Curabitur interdum augue vel justo elementum, vel maximus nibh faucibus. Proin convallis nibh
          tellus, nec blandit mi placerat in. Interdum et malesuada fames ac ante ipsum primis in faucibus.
          Maecenas in ex quis enim eleifend finibus. Aenean venenatis, nunc at mollis tincidunt, risus metus
          scelerisque odio, eget volutpat ex lorem id tellus. Vestibulum viverra eleifend enim eu placerat.
          Duis bibendum, lacus ac semper porttitor, nulla diam mollis libero, a lacinia diam urna at augue.
          Sed in quam mattis, bibendum sapien et, ullamcorper dolor. Sed dignissim
        </ChangePopupDescription>

        <ChangePopupSections>
          <ChangePopupSection>
            <ChangePopupSectionTitle>General</ChangePopupSectionTitle>
            <ChangePopupInfo>
              <ChangePopupInfoItem>
                <img src={typePopupIcon} alt="Type" />
                <div>
                  <span>Type</span>
                  <span>destroying</span>
                </div>
              </ChangePopupInfoItem>
              <ChangePopupInfoItem>
                <img src={statusPopupIcon} alt="Status" />
                <div>
                  <span>Status</span>
                  <span>in progress</span>
                </div>
              </ChangePopupInfoItem>
              <ChangePopupInfoItem>
                <img src={authorPopupIcon} alt="Author" />
                <div>
                  <span>Author</span>
                  <span>Ivan Madjar</span>
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
                  <span>12/01/2025</span>
                </div>
              </ChangePopupInfoItem>
              <ChangePopupInfoItem>
                <img src={datePopupIcon} alt="End Date" />
                <div>
                  <span>End Date</span>
                  <span>17/05/2025</span>
                </div>
              </ChangePopupInfoItem>
              <ChangePopupInfoItem>
                <img src={durationPopupIcon} alt="Time Interval" />
                <div>
                  <span>Time Interval</span>
                  <span>120 days</span>
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
    width: 16px;
    height: 16px;
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
