const express = require('express');
const router = express.Router();

// Mock Data for now instead of MongoDB for speed and ease of setup
const cars = [
    {
        id: 1,
        name: 'Tata Sierra',
        price: '₹11.49 - 21.29 Lakh*',
        category: 'SUV',
        image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Tata/Sierra/9664/1673426210080/front-left-side-47.jpg'
    },
    {
        id: 2,
        name: 'Tata Punch',
        price: '₹5.65 - 10.60 Lakh*',
        category: 'SUV',
        image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Tata/Punch/10681/1691392713058/front-left-side-47.jpg'
    },
    {
        id: 3,
        name: 'Hyundai Creta',
        price: '₹10.91 - 20.06 Lakh*',
        category: 'SUV',
        image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Hyundai/Creta/11075/1705465218824/front-left-side-47.jpg'
    },
    {
        id: 4,
        name: 'Maruti Suzuki FRONX',
        price: '₹6.85 - 11.98 Lakh*',
        category: 'SUV',
        image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Maruti/Fronx/9243/1682330752538/front-left-side-47.jpg'
    },
    {
        id: 5,
        name: 'Maruti Swift',
        price: '₹5.99 - 9.03 Lakh*',
        category: 'Hatchback',
        image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Maruti/Swift/10406/1715243141443/front-left-side-47.jpg'
    },
    {
        id: 6,
        name: 'Honda City',
        price: '₹11.63 - 16.11 Lakh*',
        category: 'Sedan',
        image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Honda/City/9710/1677755106263/front-left-side-47.jpg'
    }
];

// GET all cars
router.get('/', (req, res) => {
    res.json(cars);
});

// GET cars by category
router.get('/category/:category', (req, res) => {
    const category = req.params.category;
    const filteredCars = cars.filter(car => car.category.toLowerCase() === category.toLowerCase());
    res.json(filteredCars);
});

module.exports = router;
