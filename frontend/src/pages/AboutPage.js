import styled from 'styled-components'
import Header from '../components/Header/Header'

const AboutPage = () => {
  return (
    <>
      <Header />
      <Container>
        <Content>
          <Title>About UVCS</Title>
          <Description>
            Urban Visualization and Cataloging System (UVCS) is a platform for managing 
            and visualizing urban objects in Chisinau, Moldova.
          </Description>
          <Section>
            <SectionTitle>What we offer</SectionTitle>
            <List>
              <ListItem>Interactive map visualization of urban objects</ListItem>
              <ListItem>Comprehensive search and filtering capabilities</ListItem>
              <ListItem>Detailed information and documentation for each object</ListItem>
              <ListItem>Photo galleries and visual documentation</ListItem>
            </List>
          </Section>

          <Section>
            <SectionTitle>Purpose</SectionTitle>
            <Text>
              This system helps citizens, researchers, and city planners to explore
              and understand the urban landscape of Chisinau. Whether you're looking
              for information about a specific building, park, or monument, UVCS
              provides easy access to comprehensive data.
            </Text>
          </Section>
        </Content>
      </Container>
    </>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  min-height: calc(100vh - 53px);
  padding: 60px 20px;
  background-color: var(--color-gray-5);
`

const Content = styled.div`
  max-width: 800px;
  width: 100%;
`

const Title = styled.h1`
  font-size: 36px;
  font-weight: var(--font-weight-medium);
  color: var(--color-white);
  margin: 0 0 20px 0;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`

const Description = styled.p`
  font-size: 18px;
  line-height: 1.6;
  color: var(--color-gray-1);
  margin: 0 0 40px 0;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`

const Section = styled.div`
  margin-bottom: 30px;
`

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: var(--font-weight-medium);
  color: var(--color-white);
  margin: 0 0 15px 0;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

const ListItem = styled.li`
  font-size: 16px;
  line-height: 1.8;
  color: var(--color-gray-1);
  padding-left: 20px;
  position: relative;

  &:before {
    content: '•';
    position: absolute;
    left: 0;
    color: var(--color-blue);
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`

const Text = styled.p`
  font-size: 16px;
  line-height: 1.7;
  color: var(--color-gray-1);
  margin: 0;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`

export default AboutPage

