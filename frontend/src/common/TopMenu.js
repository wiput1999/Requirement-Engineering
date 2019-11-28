import React, { useRef } from 'react'
import styled from 'styled-components'
import { Button } from 'semantic-ui-react'
import StreamDisplay from 'stream-display';


const Container = styled.div`
  width: 100%;
  position: sticky;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  top: 0;
  background-color: #444;
`

const TopMenu = () => {
  const videoElem = useRef()

  const displayMediaOptions = {
    video: {
      cursor: 'never'
    },
    audio: false
  }

  const dumpOptionsInfo = () => {
    const videoTrack = videoElem.current.srcObject.getVideoTracks()[0];
    console.log(videoTrack)

    console.info("Track settings:");
    console.info(JSON.stringify(videoTrack.getSettings(), null, 2));
    console.info("Track constraints:");
    console.info(JSON.stringify(videoTrack.getConstraints(), null, 2));
  }

  // const startCapture = async () => {
  //   try {
  //     const mediaDevices = navigator.mediaDevices
  //     videoElem.current.srcObject = await mediaDevices.getDisplayMedia(
  //       displayMediaOptions
  //     )
  //     dumpOptionsInfo()
  //   } catch (err) {
  //     console.error('Error: ' + err)
  //   }
  // }

  const startCapture = async () => {
    const processImageData = imageData => {
      console.log(imageData)
    };
    const stream = new StreamDisplay(processImageData);

    await stream.startCapture();
    setTimeout(() => {
      stream.stopCapture();
    }, 5000)
  }

  const stopCapture = evt => {
    const srcObject = videoElem.current.srcObject
    if (srcObject) {
      const tracks = srcObject.getTracks()

      tracks.forEach(track => track.stop())
      videoElem.current.srcObject = null
    }
  }

  return (
    <>
      <Container>
        <div>
          <Button primary onClick={() => startCapture()}>Start</Button>
        </div>
        <div>
          <Button color='youtube' onClick={() => stopCapture()}>Stop</Button>
        </div>
      </Container>
      <video ref={videoElem} style={{ display: 'none' }} autoPlay></video>
    </>
  )
}

export default TopMenu
