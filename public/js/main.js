document.getElementById("btn").addEventListener("click", request);

function request() {
  let data = document.getElementById("URL").value;

  fetch("http://localhost:3000", {
    method: "POST",
    body: JSON.stringify({ userInfo: data }),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      document.getElementById("json").innerHTML = JSON.stringify(data);
    });
}
