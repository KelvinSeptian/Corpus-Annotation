import React, {useState} from 'react'

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './App.css';

function App() {
  const [video, setVideo] = useState();
  const [annotations, setAnnotations] = useState([]);
  const [input, setInput] = useState('');
  const [errors, setErrors] = useState({
    emptyInput: false
  });
  const [transcript, setTranscript] = useState([]);

  function handleChange(e) {
    let file = e.target.files[0];

    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setVideo(reader.result);
    };
  }

  function handleClick() {
    if(input === '') {
      setErrors(prev => ({...prev, emptyInput: true }))
      return;
    }

    let temp = [...annotations];

    temp.push(input)

    setAnnotations(temp);
  }

  function handleChangeTranscript(annotation) {
    let temp = [...transcript];

    temp.push({ 
      annotation: annotation, 
      timestamp: document.getElementsByClassName('video')[0].currentTime 
    })

    setTranscript(temp);
  }

  console.log(transcript);

  function convertToCSVFormat() {
    let result = '';

    transcript.forEach(element => {
      result += (`${element.annotation},${element.timestamp}\n`);
    });

    return result;
  }

  function downloadCSV() {
    const element = document.createElement("a");

    let text = convertToCSVFormat();

    const file = new Blob([text], { type: 'text/csv' });
    element.href = URL.createObjectURL(file);
    element.download = "myFile.csv";
    document.body.appendChild(element);
    element.click();
  }

  return (
    <div className="App">
      <header>Corpus Annotation</header>
      <main className="main">
        {
          video === null || video === undefined?
          (
            <div className="upload-video-container">
              <label htmlFor='upload-video' className="upload-video-label">Upload your video here</label>
              <input id="upload-video" type="file" accept="video/*" onChange={handleChange} />
            </div>
          )
          :
          (
            <React.Fragment>
              <section className='left'>
                <video className='video' width={640} height={400} src={video} controls />
                <div className='btn_group'>
                  <label htmlFor='upload-video-button' className="upload-video-button">Change your video here</label>
                  <input id="upload-video-button" type="file" accept="video/*" onChange={handleChange} />
                  <button className='upload-video-button' onClick={downloadCSV}>
                    Download dataset (.csv)
                  </button>
                </div>
                <div className="transcript">
                  {transcript.map(element => (
                    <div>{element.annotation} {element.timestamp}</div>
                  ))}
                </div>
              </section>
              <section className='right'>
                <div className='input-group'>
                  <TextField 
                    placeholder='Enter desired annotation' 
                    onChange={(e) => setInput(e.target.value)}
                    error={errors.emptyInput}
                    helperText={errors.emptyInput && 'This field cannot be empty'}
                    sx={{ width: 300 }}
                  />
                  <Button 
                    variant="contained" 
                    sx={{ marginLeft: '30px', height: 55 }} 
                    onClick={handleClick}
                  >
                    Add annotation
                  </Button>
                </div>
                <div className="options">
                  {
                    annotations.map((annotation) => (
                      <Button 
                        variant="contained" 
                        size="large"
                        onClick={() => handleChangeTranscript(annotation)}
                      >
                        {annotation}
                      </Button>
                    ))
                  }
                </div>
              </section>
            </React.Fragment>
          )
        }
      </main>
    </div>
  );
}

export default App;
