var xhr = new XMLHttpRequest()
xhr.open(
  'GET',
  'http://localhost:3002/',
  true
)
xhr.send()

xhr.onreadystatechange = () => {
  if (xhr.readyState != 4) {
    return
  }
  if (xhr.status === 200) {
    response = JSON.parse(xhr.responseText)

    parseFileSystem(response)
    
  } else {
    console.log('err', xhr.responseText)
  }
}

function parseFileSystem(response) {
    response.forEach(element => {
        console.log(element)

        if(element.type == "dir"){
            
        }
    });
}