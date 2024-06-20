var data = {
  to: '2347880234567',
  from: 'talert',
  sms: 'Hi there, testing Termii',
  type: 'plain',
  api_key: 'Your API key',
  channel: 'generic',
  media: {
    url: 'https://media.example.com/file',
    caption: 'your media file',
  },
};

var datas = JSON.stringify(data);

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener('readystatechange', function () {
  if (this.readyState === 4) {
    console.log(this.responseText);
  }
});

xhr.open('POST', 'https://base_url/api/sms/send');
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.setRequestHeader('Content-Type', 'application/json');

xhr.send(datas);
