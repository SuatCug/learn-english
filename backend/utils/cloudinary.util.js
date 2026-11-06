// Cloudinary'ye imzalı yükleme (SDK'sız). Sadece yükleme scriptleri kullanır; sunucu çalışırken gerekmez.
// Gerekenler (backend/.env): CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
const crypto = require('crypto');
const path = require('path');

const getConfig = () => {
  const { CLOUDINARY_CLOUD_NAME: cloudName, CLOUDINARY_API_KEY: apiKey, CLOUDINARY_API_SECRET: apiSecret } = process.env;
  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error('backend/.env içinde CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY ve CLOUDINARY_API_SECRET tanımlı olmalı.');
  }
  return { cloudName, apiKey, apiSecret };
};

const sign = (params, apiSecret) => {
  const toSign = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join('&');
  return crypto.createHash('sha1').update(toSign + apiSecret).digest('hex');
};

// resourceType: 'image' veya ses/video için 'video'. Aynı publicId tekrar yüklenirse üzerine yazılır.
const uploadToCloudinary = async ({ buffer, fileName, publicId, resourceType = 'image' }) => {
  const { cloudName, apiKey, apiSecret } = getConfig();
  const params = { invalidate: 'true', overwrite: 'true', public_id: publicId, timestamp: Math.floor(Date.now() / 1000) };

  const form = new FormData();
  Object.entries(params).forEach(([key, value]) => form.append(key, String(value)));
  form.append('api_key', apiKey);
  form.append('signature', sign(params, apiSecret));
  form.append('file', new Blob([buffer]), path.basename(fileName));

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`, {
    method: 'POST',
    body: form,
  });
  const body = await res.json();
  if (!res.ok) throw new Error(body?.error?.message || `HTTP ${res.status}`);
  return body;
};

module.exports = { getConfig, uploadToCloudinary };
