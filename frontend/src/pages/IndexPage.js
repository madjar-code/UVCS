import { useState, useEffect, useRef, useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import styled from 'styled-components'
import MapComponent from '../components/Map/MapComponent'
import SearchResultCard from '../components/UrbanObjectCard/UrbanObjectCard'
import Header from '../components/Header/Header'
import SearchIcon from '../assets/icons/ui/search.svg'
import ArrowUpIcon from '../assets/icons/ui/arrow-up.svg'


const IndexPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [searchName, setSearchName] = useState(searchParams.get('name') || '');
  const [searchType, setSearchType] = useState(searchParams.get('type') || 'any');
  const [searchStatus, setSearchStatus] = useState(searchParams.get('status') || 'any');
  const [searchOwnership, setSearchOwnership] = useState(searchParams.get('ownership') || 'any');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const currentPage = parseInt(searchParams.get('page')) || 1;
  const leftPanelRef = useRef(null);

  const ITEMS_PER_PAGE = 20;

  useEffect(() => {
    const handleScroll = () => {
      if (leftPanelRef.current) {
        setShowScrollTop(leftPanelRef.current.scrollTop > 100);
      }
    };

    const leftPanel = leftPanelRef.current;
    if (leftPanel) {
      leftPanel.addEventListener('scroll', handleScroll);
      return () => leftPanel.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const scrollToTop = () => {
    if (leftPanelRef.current) {
      leftPanelRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  const searchResults = useMemo(() => {
    const baseResults = [
      {
        id: 1,
        name: 'The "Romashka" Building',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=240&h=160&fit=crop&crop=center',
        address: '454 Park Avenue, Chisinau',
        date: '19/04/2023',
        floors: 16,
        type: 'building',
        ownership: 'governmental',
        status: 'destroying',
        coordinates: [47.0105, 28.8638]
      },
      {
        id: 2,
        name: 'Water Tower',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=240&h=160&fit=crop&crop=center',
        address: '12 Park Avenue, Chisinau',
        date: '18/04/2023',
        floors: 30,
        type: 'museum',
        ownership: 'governmental',
        status: 'changing',
        coordinates: [47.0265, 28.8413]
      },
      {
        id: 3,
        name: 'Artcor Building',
        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=240&h=160&fit=crop&crop=center',
        address: '3101 August Street, 15',
        date: '11/09/2019',
        floors: 3,
        type: 'building',
        ownership: 'private',
        status: 'regular',
        coordinates: [47.0186, 28.8497]
      },
      {
        id: 4,
        name: 'Central Library',
        image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=240&h=160&fit=crop&crop=center',
        address: '25 Stefan cel Mare Boulevard',
        date: '15/03/2022',
        floors: 5,
        type: 'library',
        ownership: 'governmental',
        status: 'regular',
        coordinates: [47.0245, 28.8322]
      },
      {
        id: 5,
        name: 'Modern Office Complex',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=240&h=160&fit=crop&crop=center',
        address: '100 Business Street',
        date: '22/08/2023',
        floors: 12,
        type: 'office',
        ownership: 'private',
        status: 'changing',
        coordinates: [47.0156, 28.8574]
      }
    ];

    // Generate 50 items for pagination demonstration
    const results = [];
    for (let i = 0; i < 50; i++) {
      const baseItem = baseResults[i % baseResults.length];
      // Generate slightly different coordinates for each item (within Chisinau area)
      // Using seeded random based on index to ensure consistency
      const seed = i * 12345; // Simple seed based on index
      const latOffset = ((seed % 1000) / 1000 - 0.5) * 0.02; // ±0.01 degrees
      const lngOffset = (((seed * 7) % 1000) / 1000 - 0.5) * 0.02; // ±0.01 degrees

      results.push({
        ...baseItem,
        id: i + 1,
        name: `${baseItem.name} ${i + 1}`,
        address: `${baseItem.address} - Unit ${i + 1}`,
        coordinates: [
          baseItem.coordinates[0] + latOffset,
          baseItem.coordinates[1] + lngOffset
        ]
      });
    }
    return results;
  }, []); // Empty dependency array ensures this runs only once

  // Create applied filters state that only updates when search button is clicked
  const [appliedFilters, setAppliedFilters] = useState({
    name: searchParams.get('name') || '',
    type: searchParams.get('type') || 'any',
    status: searchParams.get('status') || 'any',
    ownership: searchParams.get('ownership') || 'any'
  });

  // Sync applied filters with URL params on mount and URL changes
  useEffect(() => {
    setAppliedFilters({
      name: searchParams.get('name') || '',
      type: searchParams.get('type') || 'any',
      status: searchParams.get('status') || 'any',
      ownership: searchParams.get('ownership') || 'any'
    });
  }, [searchParams]);

  // Filter results based on applied search criteria (not current form values)
  const filteredResults = searchResults.filter(result => {
    const nameMatch = appliedFilters.name === '' ||
      result.name.toLowerCase().includes(appliedFilters.name.toLowerCase());
    const typeMatch = appliedFilters.type === 'any' || result.type === appliedFilters.type;
    const statusMatch = appliedFilters.status === 'any' || result.status === appliedFilters.status;
    const ownershipMatch = appliedFilters.ownership === 'any' || result.ownership === appliedFilters.ownership;

    return nameMatch && typeMatch && statusMatch && ownershipMatch;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredResults.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentResults = filteredResults.slice(startIndex, endIndex);

  const updateURL = (newParams) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(newParams).forEach(([key, value]) => {
      if (value && value !== 'any' && value !== '') {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    setSearchParams(params);
  };

  const handlePageChange = (page) => {
    updateURL({ page: page.toString() });
    // Scroll to top of results when page changes
    if (leftPanelRef.current) {
      leftPanelRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSearch = () => {
    // Apply current form values as filters
    const newFilters = {
      name: searchName,
      type: searchType,
      status: searchStatus,
      ownership: searchOwnership
    };

    setAppliedFilters(newFilters);

    updateURL({
      ...newFilters,
      page: '1' // Reset to first page on new search
    });
  };

  return (
    <PageContainer>
      <Header />

      <MainContent>
        <LeftPanel ref={leftPanelRef}>
          <SearchTitle>Search results for Chisinau</SearchTitle>

          <SearchForm>
            <FormGroup>
              <Label>Name</Label>
              <Input
                type="text"
                placeholder="Urban Object Name or Code Address"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
              />
            </FormGroup>

            <FilterRow>
              <FormGroupSelect flex={2}>
                <Label>Type</Label>
                <Select
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                >
                  <option value="any">any</option>
                  <option value="building">building</option>
                  <option value="museum">museum</option>
                  <option value="library">library</option>
                  <option value="office">office</option>
                </Select>
              </FormGroupSelect>

              <FormGroupSelect flex={1}>
                <Label>Status</Label>
                <Select
                  value={searchStatus}
                  onChange={(e) => setSearchStatus(e.target.value)}
                >
                  <option value="any">any</option>
                  <option value="destroying">destroying</option>
                  <option value="changing">changing</option>
                  <option value="regular">regular</option>
                </Select>
              </FormGroupSelect>

              <FormGroupSelect flex={1.3}>
                <Label>Ownership</Label>
                <Select
                  value={searchOwnership}
                  onChange={(e) => setSearchOwnership(e.target.value)}
                >
                  <option value="any">any</option>
                  <option value="governmental">governmental</option>
                  <option value="private">private</option>
                </Select>
              </FormGroupSelect>

              <SearchButton onClick={handleSearch}>
                <SeachIcon src={SearchIcon} alt="Search" />
              </SearchButton>
            </FilterRow>
          </SearchForm>

          <ResultsContainer>
            <ResultsHeader>
              <ResultsCount>
                Showing {startIndex + 1}-{Math.min(endIndex, filteredResults.length)} of {filteredResults.length} results
                {filteredResults.length !== searchResults.length && (
                  <span> (filtered from {searchResults.length} total)</span>
                )}
              </ResultsCount>
            </ResultsHeader>

            {currentResults.map((result) => (
              <SearchResultCard
                key={result.id}
                result={result}
              />
            ))}

            {totalPages > 1 && (
              <PaginationContainer>
                <PaginationButton
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </PaginationButton>

                {/* Show page numbers with ellipsis for large page counts */}
                {totalPages <= 7 ? (
                  // Show all pages if 7 or fewer
                  Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PageButton
                      key={page}
                      onClick={() => handlePageChange(page)}
                      active={page === currentPage}
                    >
                      {page}
                    </PageButton>
                  ))
                ) : (
                  // Show abbreviated pagination for more than 7 pages
                  <>
                    {currentPage <= 4 ? (
                      <>
                        {[1, 2, 3, 4, 5].map((page) => (
                          <PageButton
                            key={page}
                            onClick={() => handlePageChange(page)}
                            active={page === currentPage}
                          >
                            {page}
                          </PageButton>
                        ))}
                        <span>...</span>
                        <PageButton onClick={() => handlePageChange(totalPages)}>
                          {totalPages}
                        </PageButton>
                      </>
                    ) : currentPage >= totalPages - 3 ? (
                      <>
                        <PageButton onClick={() => handlePageChange(1)}>1</PageButton>
                        <span>...</span>
                        {Array.from({ length: 5 }, (_, i) => totalPages - 4 + i).map((page) => (
                          <PageButton
                            key={page}
                            onClick={() => handlePageChange(page)}
                            active={page === currentPage}
                          >
                            {page}
                          </PageButton>
                        ))}
                      </>
                    ) : (
                      <>
                        <PageButton onClick={() => handlePageChange(1)}>1</PageButton>
                        <span>...</span>
                        {[currentPage - 1, currentPage, currentPage + 1].map((page) => (
                          <PageButton
                            key={page}
                            onClick={() => handlePageChange(page)}
                            active={page === currentPage}
                          >
                            {page}
                          </PageButton>
                        ))}
                        <span>...</span>
                        <PageButton onClick={() => handlePageChange(totalPages)}>
                          {totalPages}
                        </PageButton>
                      </>
                    )}
                  </>
                )}

                <PaginationButton
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </PaginationButton>
              </PaginationContainer>
            )}
          </ResultsContainer>
        </LeftPanel>

        <MapContainer>
          <MapComponent buildings={filteredResults} />
        </MapContainer>
      </MainContent>

      <ScrollTopButton
        onClick={scrollToTop}
        visible={showScrollTop}
      >
        <ScrollTopIcon src={ArrowUpIcon} alt="Scroll to top" />
      </ScrollTopButton>
    </PageContainer>
  )
}

const PageContainer = styled.div`
  height: calc(100vh - 53px);
  background-color: var(--color-background);
  color: var(--color-text);
  font-family: 'Raleway', sans-serif;
`

const MainContent = styled.div`
  display: flex;
  justify-content: center;
  height: calc(100vh - 53px);
  padding: 0 60px;
  /* background-color: red; */
`

const LeftPanel = styled.div`
  padding-top: 40px;
  overflow-y: auto;
  margin-right: 30px;
  /* background-color: green; */
`

const MapContainer = styled.div`
  width: 500px;
  margin-left: 30px;
  position: sticky;
  top: 0;
  /* background-color: blue; */
`

const SearchTitle = styled.h2`
  font-size: 18px;
  font-weight: var(--font-weight-medium);
  color: var(--color-white);
`

const SearchForm = styled.div`
  margin-bottom: 24px;
`

const FormGroup = styled.div`
  margin-bottom: 10px;
`

const Label = styled.label`
  display: block;
  font-size: 12px;
  color: var(--white);
  font-weight: var(--bold);
  margin-bottom: 6px;
`

const Input = styled.input`
  width: 590px;
  height: 30px;
  padding-left: 10px;
  background-color: var(--color-gray-4);
  border: 1px solid var(--color-gray-3);
  border-radius: 4px;
  color: var(--color-white);
  font-size: 12px;
  transition: var(--transition-default);

  &:focus {
    outline: none;
    border-color: var(--color-blue);
  }
`

const FilterRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 15px;
  width: 590px;
`

const FormGroupSelect = styled(FormGroup)`
  flex: ${props => props.flex || 1};
  margin-bottom: 0;
`

const Select = styled.select`
  width: 100%;
  height: 30px;
  padding-left: 10px;
  background-color: var(--color-gray-4);
  border: 1px solid var(--color-gray-3);
  border-radius: 4px;
  color: var(--color-white);
  font-size: 12px;
  transition: var(--transition-default);

  &:focus {
    outline: none;
    border-color: var(--color-blue);
  }

  &:hover {
    border-color: var(--color-blue);
  }
`

const SearchButton = styled.button`
  width: 78px;
  height: 30px;
  background-color: var(--color-blue);
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
`

const ResultsContainer = styled.div`
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 45px;
`

const SeachIcon = styled.img`
  margin-top: 5px;
  width: 18px;
  height: 18px;
`

const ScrollTopButton = styled.button`
  position: absolute;
  bottom: 30px;
  left: 30px;
  width: 40px;
  height: 40px;
  display: flex;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  background-color: var(--color-gray-3);
  cursor: pointer;
  border: none;
  z-index: 1000;
  opacity: ${props => props.visible ? 1 : 0};
  visibility: ${props => props.visible ? 'visible' : 'hidden'};
  transform: translateY(${props => props.visible ? 0 : '10px'});
  transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease, background-color 0.3s ease;
  
  &:hover {
    background-color: var(--color-gray-2);
    transform: translateY(-2px);
  }
`;

const ScrollTopIcon = styled.img`
  width: 20px;
  height: 20px;
`;

// Results and Pagination Styles
const ResultsHeader = styled.div`
  /* margin-bottom: 10px; */
`;

const ResultsCount = styled.div`
  font-size: 14px;
  color: var(--color-white);
  opacity: 0.8;

  span {}
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 40px;
  padding: 20px 0;

  span {
    color: var(--color-gray-1);
    padding: 8px 4px;
    font-size: 14px;
  }
`;

const PaginationButton = styled.button`
  padding: 8px 16px;
  background-color: var(--color-gray-3);
  color: var(--color-white);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background-color: var(--color-gray-2);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PageButton = styled.button`
  padding: 8px 12px;
  background-color: ${props => props.active ? 'var(--color-blue)' : 'var(--color-gray-3)'};
  color: var(--color-white);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  min-width: 40px;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.active ? 'var(--color-blue)' : 'var(--color-gray-2)'};
  }
`;

export default IndexPage