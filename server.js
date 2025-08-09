const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

const roomsByCode = {}; // use Redis/DB in production

app.post('/register-room', (req, res) => {
  const { meetingCode, roomId } = req.body;
  if (!meetingCode || !roomId) return res.status(400).send({error:'missing'});
  roomsByCode[meetingCode] = roomId;
  console.log('registered', meetingCode, roomId);
  res.send({ ok: true });
});

app.get('/rooms/by-code/:code', (req, res) => {
  const id = roomsByCode[req.params.code];
  if (!id) return res.status(404).send({ error: 'not found' });
  res.send({ roomId: id });
});

app.use(express.static('public')); // optional: serve meeting.html for quick tests

app.listen(3000, ()=> console.log('server listening 3000'));
