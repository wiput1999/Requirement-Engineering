import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { Button } from 'semantic-ui-react'
import RecordRTC from 'recordrtc'
import axios from 'axios'

const Container = styled.div`
  width: 100%;
  position: sticky;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  top: 0;
  z-index: 9999;
  background-color: #444;
`

const Result = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  z-index: 10000;
  background-color: #fff;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ResultContainer = styled.div`
  width: 90%;
`

const ResultBar = styled.div(props => ({
  width: '100%',
  display: 'grid',
  height: '50px',
  gridTemplateColumns: `repeat(${props.size}, 1fr)`,
  border: '1px solid'
}))

const ResultBox = styled.div(props => {

  switch (props.emotion) {
    case 'Angry':
      return {
        backgroundColor: 'red'
      }
    case 'Disgust':
      return {
        backgroundColor: 'orange'
      }
    case 'Fear':
      return {
        backgroundColor: 'blue'
      }
    case 'Happy':
      return {
        backgroundColor: 'green'
      }
    case 'Neutral':
      return {
        backgroundColor: 'grey'
      }
    case 'Sad':
      return {
        backgroundColor: 'black'
      }
    case 'Surprise':
      return {
        backgroundColor: 'yellow'
      }
    default:
      return {
        backgroundColor: 'white'
      }
  }
})

const TopMenu = () => {
  const videoElem = useRef()
  const screenElem = useRef()
  const resultElem = useRef()

  const [result, setResult] = useState([])
  const [showResult, setShowResult] = useState(false)

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
      recordVideo = RecordRTC(stream, { type: 'video' });
      videoElem.current.srcObject = stream
      recordVideo.startRecording();
    });

    captureDisplayMedia().then((stream) => {
      screenRecording = RecordRTC(stream, { type: 'video' })
      screenElem.current.srcObject = stream
      screenRecording.startRecording()
    })

  }

  const stopCapture = () => {
    recordVideo.stopRecording(async () => {
      const formData = new FormData();
      const blob = await recordVideo.getBlob()
      formData.append('video', blob, 'video.webm')
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }

      const result = await axios.post('/emotion', formData, config)

      setResult(result.data)
      setShowResult(true)

      resultElem.current.src = URL.createObjectURL(blob)
    })

    screenRecording.stopRecording(() => {

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
      {showResult && <Result>
        <ResultContainer>
          <center>
            <video ref={resultElem} controls></video>
          </center>
          <ResultBar size={result.length}>
            {result.map((e, i) => <ResultBox key={i} emotion={e}></ResultBox>)}
          </ResultBar>
        </ResultContainer>
      </Result>}
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
