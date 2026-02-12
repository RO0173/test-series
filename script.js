const url = "https://opensheet.elk.sh/2PACX-1vQvwixEYytjBhZvE1jQW-oiDW8m3u0f5H2E-0av0brpRO7oFM6LjCdy9CsRV2Nzjz-tA6pefwbN-va0/Sheet1";

fetch(url)
.then(r => r.json())
.then(data => {
  document.body.innerHTML = "<pre>" + JSON.stringify(data[0], null, 2) + "</pre>";
});


