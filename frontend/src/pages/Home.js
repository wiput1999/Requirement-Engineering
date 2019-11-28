import React from 'react'
import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Segment,
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import mediaParagraph from '../assets/media-paragraph.png'
import paragraph from '../assets/paragraph.png'
import logo from '../assets/logo.png'

const Home = () => (
  <div>
    <Menu inverted>
      <Container>
        <Menu.Item as='a' header>
          <Image size='mini' src={logo} style={{ marginRight: '1.5em' }} />
          Lorem Service
        </Menu.Item>
        <Menu.Item as='a'>Home</Menu.Item>

        <Dropdown item simple text='About'>
          <Dropdown.Menu>
            <Dropdown.Item>Investor</Dropdown.Item>
            <Dropdown.Item>Accounting</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </Menu>

    <Container text style={{ marginTop: '6em' }}>
      <Header as='h1'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</Header>

      <Image src={mediaParagraph} style={{ marginTop: '2em' }} />
      <Image src={paragraph} style={{ marginTop: '2em' }} />
      <Image src={paragraph} style={{ marginTop: '2em' }} />
      <Image src={paragraph} style={{ marginTop: '2em' }} />
      <Image src={paragraph} style={{ marginTop: '2em' }} />
      <Image src={paragraph} style={{ marginTop: '2em' }} />
      <Image src={paragraph} style={{ marginTop: '2em' }} />
    </Container>

    <Segment inverted vertical style={{ margin: '5em 0em 0em', padding: '5em 0em' }}>
      <Container textAlign='center'>
        <Grid divided inverted stackable>
          <Grid.Column width={3}>
            <Header inverted as='h4' content='Group 1' />
            <List link inverted>
              <List.Item as='a'>Link One</List.Item>
              <List.Item as='a'>Link Two</List.Item>
              <List.Item as='a'>Link Three</List.Item>
              <List.Item as='a'>Link Four</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={3}>
            <Header inverted as='h4' content='Group 2' />
            <List link inverted>
              <List.Item as='a'>Link One</List.Item>
              <List.Item as='a'>Link Two</List.Item>
              <List.Item as='a'>Link Three</List.Item>
              <List.Item as='a'>Link Four</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={3}>
            <Header inverted as='h4' content='Group 3' />
            <List link inverted>
              <List.Item as='a'>Link One</List.Item>
              <List.Item as='a'>Link Two</List.Item>
              <List.Item as='a'>Link Three</List.Item>
              <List.Item as='a'>Link Four</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={7}>
            <Header inverted as='h4' content='Footer Header' />
            <p>
              Extra space for a call to action inside the footer that could help re-engage users.
            </p>
          </Grid.Column>
        </Grid>

        <Divider inverted section />
        <Image centered size='mini' src={logo} />
        <List horizontal inverted divided link size='small'>
          <List.Item>
            <Link to="/login">
              Portal Login
          </Link>
          </List.Item>
          <List.Item as='a' href='#'>
            Contact Us
          </List.Item>
          <List.Item as='a' href='#'>
            Terms and Conditions
          </List.Item>
          <List.Item as='a' href='#'>
            Privacy Policy
          </List.Item>
        </List>
      </Container>
    </Segment>
  </div>
)

export default Home