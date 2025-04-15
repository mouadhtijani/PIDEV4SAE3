const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const vapidKeys = {
  publicKey: 'REMPLACE_CECI_PAR_TA_CLÉ_PUBLIQUE',
  privateKey: 'REMPLACE_CECI_PAR_TA_CLÉ_PRIVÉE',
};

webpush.setVapidDetails(
  'mailto:ton@email.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

const subscriptions = [];

app.post('/api/subscribe', (req, res) => {
  const subscription = req.body;
  subscriptions.push(subscription);
  console.log('✅ Nouvel abonnement reçu.');
  res.status(201).json({});
});

app.post('/api/notify', (req, res) => {
  const payload = JSON.stringify({
    title: '📍 Événement proche !',
    body: req.body.message || 'Un événement arrive bientôt !',
  });

  subscriptions.forEach(sub => {
    webpush.sendNotification(sub, payload).catch(err => console.error(err));
  });

  res.status(200).json({ message: 'Notifications envoyées à tous les abonnés.' });
});

app.listen(3000, () => {
  console.log('🚀 Serveur Web Push actif sur http://localhost:3000');
});
