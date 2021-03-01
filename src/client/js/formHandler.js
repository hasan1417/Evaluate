
function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value

    Client.checkForName(formText)

    postData('http://localhost:8081/data', {webUrl: formText})
    .then(function(data){
    const allData= data.results;
    const receivedData = {
        agreement: results.agreement,
        confidence: results.confidence,
        irony: results.irony,
        subjectivity: results.subjectivity
    }
    updateUI(receivedData)
    })
}

const updateUI = function(data){
    document.getElementById('results').innerHTML=JSON.stringify(data);
}

const postData = async function(url = '', data = {}){
    const response = await fetch('http://localhost:8081/data', {
        method: 'POST',
        credentials: "same-origin",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    });
    try{
        const data = await response.json();
        return data;
    } catch(error){
        console.log("Error:" + error)
    }
}

export { handleSubmit }
