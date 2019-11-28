import React, { useRef } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  position: sticky;
  top: 0;
  height: 100px;
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
    const videoTrack = videoElem.srcObject.getVideoTracks()[0];
    console.log(videoTrack)

    console.info("Track settings:");
    console.info(JSON.stringify(videoTrack.getSettings(), null, 2));
    console.info("Track constraints:");
    console.info(JSON.stringify(videoTrack.getConstraints(), null, 2));
  }

  const startCapture = async () => {
    try {
      const mediaDevices = navigator.mediaDevices
      videoElem.current.srcObject = await mediaDevices.getDisplayMedia(
        displayMediaOptions
      )
      dumpOptionsInfo()
    } catch (err) {
      console.error('Error: ' + err)
    }
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
    <Container>
      <p onClick={() => startCapture()}>Start</p>
      <p onClick={() => stopCapture()}>Stop</p>
      <video ref={videoElem} autoPlay></video>
    </Container>
  )
}

export default TopMenu
