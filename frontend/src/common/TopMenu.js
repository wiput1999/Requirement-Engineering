import React, { useRef } from 'react'
import styled from 'styled-components'
import { Button } from 'semantic-ui-react'
import RecordRTC from 'recordrtc'

const Container = styled.div`
  width: 100%;
  position: sticky;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  top: 0;
  z-index: 9999;
  background-color: #444;
`

const TopMenu = () => {
  const videoElem = useRef()
  const screenElem = useRef()

  let recordVideo = null
  let screenRecording = null

  const captureUserMedia = (callback) => {
    var params = { audio: false, video: true };

    navigator.getUserMedia(params, callback, (error) => {
      alert(JSON.stringify(error));
    });
  };

  const captureDisplayMedia = async () => {
    const displayMediaOptions = {
      video: {
        cursor: "never"
      },
      audio: false
    };

    const stream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions)

    return stream
  };

  const startCapture = async () => {
    captureUserMedia((stream) => {
      recordVideo = RecordRTC(stream, { type: 'video', mimeType: 'video/mp4' });
      videoElem.current.srcObject = stream
      recordVideo.startRecording();
    });

    captureDisplayMedia().then((stream) => {
      screenRecording = RecordRTC(stream, { type: 'video', mimeType: 'video/mp4' })
      screenElem.current.srcObject = stream
      screenRecording.startRecording()
    })

  }

  const stopCapture = () => {
    recordVideo.stopRecording(() => {
      console.log(recordVideo.getBlob())
    })

    screenRecording.stopRecording(() => {
      console.log(screenRecording.getBlob())
    })

    let webcamTracks = videoElem.current.srcObject.getTracks();
    let screenTracks = screenElem.current.srcObject.getTracks();

    if (webcamTracks && screenTracks) {
      webcamTracks.forEach(track => track.stop());
      videoElem.current.srcObject = null;
      screenTracks.forEach(track => track.stop());
      screenElem.current.srcObject = null;
    }
  }

  return (
    <>
      <Container>
        <div>
          <Button primary onClick={() => startCapture()}>Start</Button>
          <Button color='youtube' onClick={() => stopCapture()}>Stop</Button>
        </div>
        <div>
          <video ref={videoElem} style={{ maxHeight: '50px' }} autoPlay></video>
        </div>
        <div>
          <video ref={screenElem} style={{ maxHeight: '50px' }} autoPlay></video>
        </div>
      </Container>
    </>
  )
}

export default TopMenu
