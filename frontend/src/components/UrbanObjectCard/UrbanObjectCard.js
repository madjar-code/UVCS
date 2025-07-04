import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PinIcon from '../../assets/icons/general/pin.svg';
import TimeIcon from '../../assets/icons/general/time.svg';
import VersionIcon from '../../assets/icons/general/version.svg';
import UoTypeIcon from '../../assets/icons/general/type.svg';
import UoOwnershipIcon from '../../assets/icons/general/ownership.svg';
import StatusIcon from '../../assets/icons/general/status.svg';
import CopyLinkIcon from '../../assets/icons/ui/copy-link.svg';
import SeeDetailsIcon from '../../assets/icons/ui/see-details.svg';


const UrbanObjectCard = ({ result }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handleCopyLink = () => {
    // Implementation for copying link
    console.log(`Copying link for ${result.name}`);
    setMenuOpen(false);
  };
  
  const handleSeeDetails = () => {
    navigate(`/detail/${result.id}`);
    setMenuOpen(false);
  };

  const handleCardClick = () => {
    navigate(`/detail/${result.id}`);
  };

  return (
    <ItemCard onClick={handleCardClick}>
      <ItemImage src={result.image} />

      <RightWrapper>
        <ItemContent>
        <ItemHeader>
          <ItemTitle>{result.name}</ItemTitle>
          <div ref={menuRef}>
            <MenuButton onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(!menuOpen);
            }}>⋯</MenuButton>
            {menuOpen && (
              <MenuDropdown>
                <MenuItem onClick={handleCopyLink}>
                  <Icon src={CopyLinkIcon} alt="Copy Link" />
                  copy link
                </MenuItem>
                <MenuItem onClick={handleSeeDetails}>
                  <Icon src={SeeDetailsIcon} alt="See Details" />
                  see details
                </MenuItem>
              </MenuDropdown>
            )}
          </div>
        </ItemHeader>

        {result.address && (
          <InfoRow>
            <IconImg src={PinIcon} alt="Location" />
            <InfoText>{result.address}</InfoText>
          </InfoRow>
        )}

        {result.date && (
          <InfoRow>
            <IconImg src={TimeIcon} alt="Date" />
            <InfoText>{result.date}</InfoText>
          </InfoRow>
        )}

        {result.floors && (
          <InfoRow>
            <IconImg src={VersionIcon} alt="Floors" />
            <InfoText>{result.floors}</InfoText>
          </InfoRow>
        )}
      </ItemContent>

      <TagsContainer>
        {result.type && (
          <Tag $bgColor="var(--color-gray-3)">
            <TagIcon src={UoTypeIcon} alt="Type" />
            {result.type}
          </Tag>
        )}
        {result.ownership && (
          <Tag $bgColor="var(--color-gray-3)">
            <TagIcon src={UoOwnershipIcon} alt="Ownership" />
            {result.ownership}
          </Tag>
        )}
        {result.status && (
          <Tag
            $bgColor={result.status === 'destroying' ? 'var(--color-red-1)' :
                    result.status === 'changing' ? 'var(--color-purple)' :
                    'var(--color-gray-3)'}
          >
            <TagIcon src={StatusIcon} alt="Status" />
            {result.status}
          </Tag>
        )}
      </TagsContainer>
      </RightWrapper>
    </ItemCard>
  )
}

const ItemCard = styled.div`
  display: flex;
  gap: 18px;
  width: 590px;
  position: relative;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border-radius: 8px;
  padding: 8px;
  margin: -8px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`

const ItemImage = styled.div`
  width: 240px;
  height: 160px;
  background-color: var(--color-gray-3);
  border-radius: 4px;
  flex-shrink: 0;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
`

const ItemContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
  position: relative;
`

const ItemTitle = styled.h3`
  font-size: 17px;
  font-weight: 600;
  color: var(--color-white);
  margin: 0;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  color: var(--color-gray-1);
  cursor: pointer;
  font-size: 16px;
  padding: 4px 8px;
  
  &:hover {
    color: var(--color-white);
  }
`;

const MenuDropdown = styled.div`
  position: absolute;
  top: 30px;
  right: 0;
  background-color: var(--color-gray-3);
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  z-index: 10;
  width: 180px;
  overflow: hidden;
`;

const MenuItem = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  background: none;
  border: none;
  text-align: left;
  color: var(--color-white);
  font-size: 12px;
  cursor: pointer;
  padding: 8px;
  
  &:hover {
    background-color: var(--color-gray-2);
  }
  
  svg {
    width: 18px;
    height: 18px;
  }
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 6px;
`;

const InfoText = styled.span`
  /* color: var(--color-gray-1); */
  opacity: 0.5;
  font-size: 13px;
`;

const TagsContainer = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  align-items: center;
  position: absolute;
  bottom: 0;
  right: 0;
`;

const Tag = styled.span`
  padding: 3px 8px;
  border-radius: 5px;
  font-size: 11px;
  background-color: ${props => props.$bgColor || 'var(--color-gray-3)'};
  color: white;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const TagIcon = styled.img`
  width: 12px;
  height: 12px;
`;

const RightWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const IconImg = styled.img`
  width: 15px;
  height: 15px;
  margin-right: var(--spacing-xs);
`;

const Icon = styled.img`
  width: 18px;
  height: 18px;
`;


export default UrbanObjectCard
