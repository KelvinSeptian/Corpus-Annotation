const BASE_URL = 'http:/localhost:8000'

export const sendVideo = async (data) => {
  console.log(data)
  let response = await fetch('http://localhost:8000/send-file', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({ data: data })
  })
  .then(res => res.json())
  .catch(function (error) {
    console.log(error);
  });
  
  return await response;
};

export const retrieveTranscript = async (id) => {
  console.log(id);

  let response = await fetch(`http://localhost:8000/retrieve-transcript/${id}`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "GET"
  })
  .then(res => res.json())
  .catch(function (error) {
    console.log(error);
  });

  return await response
};

export const retrieveVTT = async (id) => {
  let response = await fetch(`http://localhost:8000/retrieve-vtt/${id}`,
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "GET",
    })
    .then(res => {
      return res.json()
    })
    .catch(function (error) {
      console.log(error);
    });

  console.log(response);

  return await response;
}