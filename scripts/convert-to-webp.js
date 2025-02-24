const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imageDir = 'images';
const images = [
    'Hero_Desktop.jpg',
    'Hero_Tablet.jpg',
    'Hero_Mobile.jpg',
    'vr1.jpg',
    'vr2.jpg',
    'vr3.jpg',
];

images.forEach((image) => {
    sharp(path.join(imageDir, image))
        .webp({ quality: 80 }) // 품질 설정 (0-100)
        .toFile(path.join(imageDir, image.replace('.jpg', '.webp')))
        .then((info) => console.log(`Converted ${image} to WebP`))
        .catch((err) => console.error(`Error converting ${image}:`, err));
});
