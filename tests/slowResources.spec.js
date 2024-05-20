// request for document
fetch("https://the-internet.herokuapp.com/slow", {
    "headers": {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language": "uk,uk-UA;q=0.9,en-US;q=0.8,en;q=0.7,ru;q=0.6",
        "cache-control": "max-age=0",
        "sec-ch-ua": "\"Google Chrome\";v=\"125\", \"Chromium\";v=\"125\", \"Not.A/Brand\";v=\"24\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "same-origin",
        "sec-fetch-user": "?1",
        "sec-gpc": "1",
        "upgrade-insecure-requests": "1",
        "cookie": "optimizelySegments=%7B%7D; optimizelyEndUserId=oeu1711113653779r0.16328650464993388; page_visit_count=60; viewedOuibounceModal=true; optimizelyBuckets=%7B%7D; rack.session=BAh7CUkiD3Nlc3Npb25faWQGOgZFVEkiRWMyZDljOGYwNjBhNGMyYmY4YzY0%0ANWM3MTFmZTAyZmYwODg2NDg1Y2U1NTMwYTQwMzE1ZWVhY2Y5NWQ5ZDNlYmMG%0AOwBGSSIJY3NyZgY7AEZJIiU5MzA4OWE2ZDFkNzQ3ODNlZGEzOWE3NTk1N2M5%0AN2QyMgY7AEZJIg10cmFja2luZwY7AEZ7B0kiFEhUVFBfVVNFUl9BR0VOVAY7%0AAFRJIi1kYTRhNTBkOGM0OTc0ZmQ5Njg3YzdmMTk3ZTc5MDE0OWIzZWM4ZjRl%0ABjsARkkiGUhUVFBfQUNDRVBUX0xBTkdVQUdFBjsAVEkiLTE5OWI2MmZhNTM1%0AZTk0MmZlMTg0MmIxN2U1NGJkOWIzY2M3MjkwYzMGOwBGSSIKZmxhc2gGOwBG%0AewA%3D%0A--a7df35709955cfe924c928c812d27063100d1e4b; optimizelyPendingLogEvents=%5B%22n%3Dhttps%253A%252F%252Fthe-internet.herokuapp.com%252Fslow%26u%3Doeu1711113653779r0.16328650464993388%26wxhr%3Dtrue%26t%3D1716213023837%26f%3D298349752%2C318188263%22%5D",
        "Referer": "https://the-internet.herokuapp.com/",
        "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": null,
    "method": "GET"
});
// slow request on the page
fetch("https://the-internet.herokuapp.com/slow_external", {
    "headers": {
        "accept": "*/*",
        "accept-language": "uk,uk-UA;q=0.9,en-US;q=0.8,en;q=0.7,ru;q=0.6",
        "sec-ch-ua": "\"Google Chrome\";v=\"125\", \"Chromium\";v=\"125\", \"Not.A/Brand\";v=\"24\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "sec-gpc": "1",
        "x-requested-with": "XMLHttpRequest",
        "cookie": "optimizelySegments=%7B%7D; optimizelyEndUserId=oeu1711113653779r0.16328650464993388; page_visit_count=60; viewedOuibounceModal=true; optimizelyBuckets=%7B%7D; rack.session=BAh7CUkiD3Nlc3Npb25faWQGOgZFVEkiRWMyZDljOGYwNjBhNGMyYmY4YzY0%0ANWM3MTFmZTAyZmYwODg2NDg1Y2U1NTMwYTQwMzE1ZWVhY2Y5NWQ5ZDNlYmMG%0AOwBGSSIJY3NyZgY7AEZJIiU5MzA4OWE2ZDFkNzQ3ODNlZGEzOWE3NTk1N2M5%0AN2QyMgY7AEZJIg10cmFja2luZwY7AEZ7B0kiFEhUVFBfVVNFUl9BR0VOVAY7%0AAFRJIi1kYTRhNTBkOGM0OTc0ZmQ5Njg3YzdmMTk3ZTc5MDE0OWIzZWM4ZjRl%0ABjsARkkiGUhUVFBfQUNDRVBUX0xBTkdVQUdFBjsAVEkiLTE5OWI2MmZhNTM1%0AZTk0MmZlMTg0MmIxN2U1NGJkOWIzY2M3MjkwYzMGOwBGSSIKZmxhc2gGOwBG%0AewA%3D%0A--a7df35709955cfe924c928c812d27063100d1e4b; optimizelyPendingLogEvents=%5B%22n%3Dhttps%253A%252F%252Fthe-internet.herokuapp.com%252Fslow%26u%3Doeu1711113653779r0.16328650464993388%26wxhr%3Dtrue%26t%3D1716213030668%26f%3D298349752%2C318188263%22%2C%22n%3Dhttps%253A%252F%252Fthe-internet.herokuapp.com%252Fslow%26u%3Doeu1711113653779r0.16328650464993388%26wxhr%3Dtrue%26t%3D1716213023837%26f%3D298349752%2C318188263%22%5D",
        "Referer": "https://the-internet.herokuapp.com/slow",
        "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": null,
    "method": "GET"
});