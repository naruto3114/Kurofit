import p_img1 from './p_img1.png'
import p_img2_1 from './p_img2_1.png'
import p_img2_2 from './p_img2_2.png'
import p_img2_3 from './p_img2_3.png'
import p_img2_4 from './p_img2_4.png'
import p_img3 from './p_img3.png'
import p_img4 from './p_img4.png'
import p_img5 from './p_img5.png'
import p_img6 from './p_img6.png'
import p_img7 from './p_img7.png'
import p_img8 from './p_img8.png'
import p_img9 from './p_img9.png'
import p_img10 from './p_img10.png'
import p_img11 from './p_img11.png'
import p_img12 from './p_img12.png'
import p_img13 from './p_img13.png'
import p_img14 from './p_img14.png'
import p_img15 from './p_img15.png'
import p_img16 from './p_img16.png'
import p_img17 from './p_img17.png'
import p_img18 from './p_img18.png'
import p_img19 from './p_img19.png'
import p_img20 from './p_img20.png'
// import p_img21 from './p_img21.png'
// import p_img22 from './p_img22.png'
// import p_img23 from './p_img23.png'
// import p_img24 from './p_img24.png'
// import p_img25 from './p_img25.png'
// import p_img26 from './p_img26.png'
// import p_img27 from './p_img27.png'
// import p_img28 from './p_img28.png'
// import p_img29 from './p_img29.png'
// import p_img30 from './p_img30.png'
// import p_img31 from './p_img31.png'
// import p_img32 from './p_img32.png'
// import p_img33 from './p_img33.png'
// import p_img34 from './p_img34.png'
// import p_img35 from './p_img35.png'
// import p_img36 from './p_img36.png'
// import p_img37 from './p_img37.png'
// import p_img38 from './p_img38.png'
// import p_img39 from './p_img39.png'
// import p_img40 from './p_img40.png'
// import p_img41 from './p_img41.png'
// import p_img42 from './p_img42.png'
// import p_img43 from './p_img43.png'
// import p_img44 from './p_img44.png'
// import p_img45 from './p_img45.png'
// import p_img46 from './p_img46.png'
// import p_img47 from './p_img47.png'
// import p_img48 from './p_img48.png'
// import p_img49 from './p_img49.png'
// import p_img50 from './p_img50.png'
// import p_img51 from './p_img51.png'
// import p_img52 from './p_img52.png'

import pic from './pic.jpg'
import men from './men.jpg'
import women from './women.jpg'
import img3 from './3.png'
import img4 from './4.png'
import img5 from './5.png'

import logo from './logo.png'
import hero_img from './hero_img.png'
import cart_icon from './cart_icon.png'
import bin_icon from './bin_icon.png'
import dropdown_icon from './dropdown_icon.png'
import exchange_icon from './exchange_icon.png'
import profile_icon from './profile_icon.png'
import quality_icon from './quality_icon.png'
import search_icon from './search_icon.png'
import star_dull_icon from './star_dull_icon.png'
import star_icon from './star_icon.png'
import support_img from './support_img.png'
import menu_icon from './menu_icon.png'
import about_img from './about_img.png'
import contact_img from './contact_img.png'
import razorpay_logo from './razorpay_logo.png'
import stripe_logo from './stripe_logo.png'
import cross_icon from './cross_icon.png'
import hero from './hero.png'
import hero1 from './hero1.png'
import topwear from './topwear.png'
import bottemwear from './bottemwear.png'
import hoodie from './hoodie.png'
import oversize from './oversize.png'

// Hero slideshow aliases
const hero_1 = img3
const hero_2 = img4
const hero_3 = img5

export const assets = {
    logo,
    hero_img,
    cart_icon,
    dropdown_icon,
    exchange_icon,
    profile_icon,
    quality_icon,
    search_icon,
    star_dull_icon,
    star_icon,
    bin_icon,
    support_img,
    menu_icon,
    about_img,
    contact_img,
    razorpay_logo,
    stripe_logo,
    cross_icon,
    pic,
    men,
    women,
    hero,
    hero1,
    hero_1,
    hero_2,
    hero_3,
    topwear,
    bottemwear,
    hoodie,
    oversize
}

export const products = [
    {
        _id: "aaaaa",
        name: "Naruto T-Shirt",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 1999,
        image: [p_img1],
        category: "Men",
        subCategory: "Topwear",
        sizes: ["S", "M", "L"],
        date: 1716634345448,
        bestseller: true,
        limitedDrop: true,
        rating: 4.5,
        sales: 253},
    {
        _id: "aaaab",
        name: "Naruto-flame T-Shirt",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 2549,
        image: [p_img2_1, p_img2_2, p_img2_3, p_img2_4],
        category: "Men",
        subCategory: "Topwear",
        sizes: ["M", "L", "XL"],
        date: 1716621345448,
        bestseller: true,
        limitedDrop: true,
        rating: 3.6,
        sales: 218},
    {
        _id: "aaaac",
        name: "Naruto Obito T-Shirt",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 2999,
        image: [p_img3],
        category: "Men",
        subCategory: "Topwear",
        sizes: ["S", "L", "XL"],
        date: 1716234545448,
        bestseller: true,
        limitedDrop: true,
        rating: 4.0,
        sales: 515},
    {
        _id: "aaaad",
        name: "Demon-Slayer T-Shirt",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 1559,
        image: [p_img4],
        category: "Men",
        subCategory: "Topwear",
        sizes: ["S", "M", "XXL"],
        date: 1716621345448,
        bestseller: true,
        limitedDrop: true,
        rating: 3.6,
        sales: 349},
    {
        _id: "aaaae",
        name: "Naruto T-Shirt",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 1349,
        image: [p_img5],
        category: "Men",
        subCategory: "Topwear",
        sizes: ["M", "L", "XL"],
        date: 1716622345448,
        bestseller: true,
        rating: 3.9,
        sales: 531},
    {
        _id: "aaaaf",
        name: "One-Piece T-Shirt",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 1459,
        image: [p_img6],
        category: "Men",
        subCategory: "Topwear",
        sizes: ["S", "L", "XL"],
        date: 1716623423448,
        bestseller: true,
        rating: 3.7,
        sales: 164},
    {
        _id: "aaaag",
        name: "Demon-Slayer T-Shirt",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 1999,
        image: [p_img7],
        category: "Men",
        subCategory: "Bottomwear",
        sizes: ["S", "L", "XL"],
        date: 1716621542448,
        bestseller: false,
        rating: 3.7,
        sales: 252},
    {
        _id: "aaaah",
        name: "Demon-Slayer T-Shirt",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 1499,
        image: [p_img8],
        category: "Men",
        subCategory: "Topwear",
        sizes: ["S", "M", "L", "XL"],
        date: 1716622345448,
        bestseller: false,
        rating: 3.8,
        sales: 459},
    {
        _id: "aaaai",
        name: "One-Piece T-Shirt",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 1999,
        image: [p_img9],
        category: "Men",
        subCategory: "Topwear",
        sizes: ["M", "L", "XL"],
        date: 1716621235448,
        bestseller: false,
        rating: 4.4,
        sales: 86},
    {
        _id: "aaaaj",
        name: "Naruto Manga Panel Oversized Shirt",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 1699,
        image: [p_img10],
        category: "Men",
        subCategory: "Bottomwear",
        sizes: ["S", "L", "XL"],
        date: 1716622235448,
        bestseller: false,
        rating: 4.4,
        sales: 438},
    {
        _id: "aaaak",
        name: "Futuristic Blueprint Back Print Oversized T-Shirt",
        description: "Premium oversized T-shirt featuring a futuristic rocket blueprint back print. Made with heavy-gauge cotton for a structured streetwear fit.",
        price: 1499,
        image: [p_img11],
        category: "Men",
        subCategory: "Topwear",
        sizes: ["S", "M", "L", "XL"],
        bestseller: true,
        limitedDrop: true,
        rating: 3.8,
        sales: 491},

    {
        _id: "aaaal",
        name: "T-Shirt",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 1599,
        image: [p_img12],
        category: "Men",
        subCategory: "Topwear",
        sizes: ["S", "M", "L", "XL"],
        date: 1716624445448,
        bestseller: false,
        rating: 4.8,
        sales: 279},
    {
        _id: "aaaam",
        name: "T-Shirt",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 1399,
        image: [p_img13],
        category: "Men",
        subCategory: "Topwear",
        sizes: ["S", "M", "L", "XL"],
        date: 1716625545448,
        bestseller: false,
        rating: 4.6,
        sales: 189},
    {
        _id: "aaaan",
        name: "Akatsuki T-Shirt",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 1699,
        image: [p_img14],
        category: "Men",
        subCategory: "Topwear",
        sizes: ["S", "M", "L", "XL"],
        date: 1716626645448,
        bestseller: false,
        rating: 4.8,
        sales: 219},
    {
        _id: "aaaao",
        name: "Naruot T-Shirt",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 1499,
        image: [p_img15],
        category: "Men",
        subCategory: "Bottomwear",
        sizes: ["S", "M", "L", "XL"],
        date: 1716627745448,
        bestseller: false,
        rating: 4.2,
        sales: 549},
    {
        _id: "aaaap",
        name: "Attck-on-Titans T-shirt",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 1799,
        image: [p_img16],
        category: "Men",
        subCategory: "Topwear",
        sizes: ["S", "M", "L", "XL"],
        date: 1716628845448,
        bestseller: false,
        rating: 4.1,
        sales: 455},
    {
        _id: "aaaaq",
        name: "curege-the-cowerd T-Shirt",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 1599,
        image: [p_img17],
        category: "Men",
        subCategory: "Bottomwear",
        sizes: ["S", "M", "L", "XL"],
        date: 1716629945448,
        bestseller: false,
        rating: 4.4,
        sales: 143},
    {
        _id: "aaaar",
        name: "Boy Round Neck Pure Cotton T-shirt",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 1899,
        image: [p_img18],
        category: "Men",
        subCategory: "Topwear",
        sizes: ["S", "M", "L", "XL"],
        date: 1716631045448,
        bestseller: false,
        rating: 4.5,
        sales: 85},
    {
        _id: "aaaas",
        name: "Boy Round Neck Pure Cotton T-shirt",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 1699,
        image: [p_img19],
        category: "Men",
        subCategory: "Topwear",
        sizes: ["S", "M", "L", "XL"],
        date: 1716632145448,
        bestseller: false,
        rating: 4.5,
        sales: 484},
    {
        _id: "aaaat",
        name: "tshirt",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 1999,
        image: [p_img20],
        category: "Men",
        subCategory: "Bottomwear",
        sizes: ["S", "M", "L", "XL", "XXL"],
        date: 1716633245448,
        bestseller: false,
        rating: 4.5,
        sales: 225},
    // {
    //     _id: "aaaau",
    //     name: "Women Zip-Front Relaxed Fit Jacket",
    //     description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    //     price: 170,
    //     image: [p_img21],
    //     category: "Women",
    //     subCategory: "Winterwear",
    //     sizes: ["S", "M", "L", "XL"],
    //     date: 1716634345448,
    //     bestseller: false,
    //     rating: ,
    //     sales: 
    // },
    // {
    //     _id: "aaaav",
    //     name: "Women Palazzo Pants with Waist Belt",
    //     description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    //     price: 200,
    //     image: [p_img22],
    //     category: "Women",
    //     subCategory: "Bottomwear",
    //     sizes: ["S", "M", "L", "XL"],
    //     date: 1716635445448,
    //     bestseller: false,
    //     rating: ,
    //     sales: 
    // },
    // {
    //     _id: "aaaaw",
    //     name: "Boy Round Neck Pure Cotton T-shirt",
    //     description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    //     price: 180,
    //     image: [p_img23],
    //     category: "Kids",
    //     subCategory: "Topwear",
    //     sizes: ["S", "M", "L", "XL"],
    //     date: 1716636545448,
    //     bestseller: false,
    //     rating: ,
    //     sales: 
    // },
    // {
    //     _id: "aaaax",
    //     name: "Boy Round Neck Pure Cotton T-shirt",
    //     description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    //     price: 210,
    //     image: [p_img24],
    //     category: "Kids",
    //     subCategory: "Topwear",
    //     sizes: ["S", "M", "L", "XL"],
    //     date: 1716637645448,
    //     bestseller: false,
    //     rating: ,
    //     sales: 
    // },
    // {
    //     _id: "aaaay",
    //     name: "Girls Round Neck Cotton Top",
    //     description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    //     price: 190,
    //     image: [p_img25],
    //     category: "Kids",
    //     subCategory: "Topwear",
    //     sizes: ["S", "M", "L", "XL"],
    //     date: 1716638745448,
    //     bestseller: false,
    //     rating: ,
    //     sales: 
    // },
    // {
    //     _id: "aaaaz",
    //     name: "Women Zip-Front Relaxed Fit Jacket",
    //     description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    //     price: 220,
    //     image: [p_img26],
    //     category: "Women",
    //     subCategory: "Winterwear",
    //     sizes: ["S", "M", "L", "XL"],
    //     date: 1716639845448,
    //     bestseller: false,
    //     rating: ,
    //     sales: 
    // },
    // {
    //     _id: "aaaba",
    //     name: "Girls Round Neck Cotton Top",
    //     description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    //     price: 200,
    //     image: [p_img27],
    //     category: "Kids",
    //     subCategory: "Topwear",
    //     sizes: ["S", "M", "L", "XL"],
    //     date: 1716640945448,
    //     bestseller: false,
    //     rating: ,
    //     sales: 
    // },
    // {
    //     _id: "aaabb",
    //     name: "Men Slim Fit Relaxed Denim Jacket",
    //     description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    //     price: 230,
    //     image: [p_img28],
    //     category: "Men",
    //     subCategory: "Winterwear",
    //     sizes: ["S", "M", "L", "XL"],
    //     date: 1716642045448,
    //     bestseller: false,
    //     rating: ,
    //     sales: 
    // },
    // {
    //     _id: "aaabc",
    //     name: "Women Round Neck Cotton Top",
    //     description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    //     price: 210,
    //     image: [p_img29],
    //     category: "Women",
    //     subCategory: "Topwear",
    //     sizes: ["S", "M", "L", "XL"],
    //     date: 1716643145448,
    //     bestseller: false,
    //     rating: ,
    //     sales: 
    // },
    // {
    //     _id: "aaabd",
    //     name: "Girls Round Neck Cotton Top",
    //     description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    //     price: 240,
    //     image: [p_img30],
    //     category: "Kids",
    //     subCategory: "Topwear",
    //     sizes: ["S", "M", "L", "XL"],
    //     date: 1716644245448,
    //     bestseller: false,
    //     rating: ,
    //     sales: 
    // },
    // {
    //     _id: "aaabe",
    //     name: "Men Round Neck Pure Cotton T-shirt",
    //     description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    //     price: 220,
    //     image: [p_img31],
    //     category: "Men",
    //     subCategory: "Topwear",
    //     sizes: ["S", "M", "L", "XL"],
    //     date: 1716645345448,
    //     bestseller: false,
    //     rating: ,
    //     sales: 
    // },
    // {
    //     _id: "aaabf",
    //     name: "Men Round Neck Pure Cotton T-shirt",
    //     description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    //     price: 250,
    //     image: [p_img32],
    //     category: "Men",
    //     subCategory: "Topwear",
    //     sizes: ["S", "M", "L", "XL"],
    //     date: 1716646445448,
    //     bestseller: false,
    //     rating: ,
    //     sales: 
    // },
    // {
    //     _id: "aaabg",
    //     name: "Girls Round Neck Cotton Top",
    //     description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    //     price: 230,
    //     image: [p_img33],
    //     category: "Kids",
    //     subCategory: "Topwear",
    //     sizes: ["S", "M", "L", "XL"],
    //     date: 1716647545448,
    //     bestseller: false,
    //     rating: ,
    //     sales: 
    // },
    // {
    //     _id: "aaabh",
    //     name: "Women Round Neck Cotton Top",
    //     description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    //     price: 260,
    //     image: [p_img34],
    //     category: "Women",
    //     subCategory: "Topwear",
    //     sizes: ["S", "M", "L", "XL"],
    //     date: 1716648645448,
    //     bestseller: false,
    //     rating: ,
    //     sales: 
    // },
    // {
    //     _id: "aaabi",
    //     name: "Women Zip-Front Relaxed Fit Jacket",
    //     description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    //     price: 240,
    //     image: [p_img35],
    //     category: "Women",
    //     subCategory: "Winterwear",
    //     sizes: ["S", "M", "L", "XL"],
    //     date: 1716649745448,
    //     bestseller: false,
    //     rating: ,
    //     sales: 
    // },
    // {
    //     _id: "aaabj",
    //     name: "Women Zip-Front Relaxed Fit Jacket",
    //     description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    //     price: 270,
    //     image: [p_img36],
    //     category: "Women",
    //     subCategory: "Winterwear",
    //     sizes: ["S", "M", "L", "XL"],
    //     date: 1716650845448,
    //     bestseller: false,
    //     rating: ,
    //     sales: 
    // },
    // {
    //     _id: "aaabk",
    //     name: "Women Round Neck Cotton Top",
    //     description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    //     price: 250,
    //     image: [p_img37],
    //     category: "Women",
    //     subCategory: "Topwear",
    //     sizes: ["S", "M", "L", "XL"],
    //     date: 1716651945448,
    //     bestseller: false,
    //     rating: ,
    //     sales: 
    // },
    // {
    //     _id: "aaabl",
    //     name: "Men Round Neck Pure Cotton T-shirt",
    //     description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    //     price: 280,
    //     image: [p_img38],
    //     category: "Men",
    //     subCategory: "Topwear",
    //     sizes: ["S", "M", "L", "XL"],
    //     date: 1716653045448,
    //     bestseller: false,
    //     rating: ,
    //     sales: 
    // },
    // {
    //     _id: "aaabm",
    //     name: "Men Printed Plain Cotton Shirt",
    //     description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    //     price: 260,
    //     image: [p_img39],
    //     category: "Men",
    //     subCategory: "Topwear",
    //     sizes: ["S", "M", "L", "XL"],
    //     date: 1716654145448,
    //     bestseller: false,
    //     rating: ,
    //     sales: 
    // },
    // {
    //     _id: "aaabn",
    //     name: "Men Slim Fit Relaxed Denim Jacket",
    //     description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    //     price: 290,
    //     image: [p_img40],
    //     category: "Men",
    //     subCategory: "Winterwear",
    //     sizes: ["S", "M", "L", "XL"],
    //     date: 1716655245448,
    //     bestseller: false,
    //     rating: ,
    //     sales: 
    // },
    // {
    //     _id: "aaabo",
    //     name: "Men Round Neck Pure Cotton T-shirt",
    //     description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    //     price: 270,
    //     image: [p_img41],
    //     category: "Men",
    //     subCategory: "Topwear",
    //     sizes: ["S", "M", "L", "XL"],
    //     date: 1716656345448,
    //     bestseller: false,
    //     rating: ,
    //     sales: 
    // },
    // {
    //     _id: "aaabp",
    //     name: "Boy Round Neck Pure Cotton T-shirt",
    //     description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    //     price: 300,
    //     image: [p_img42],
    //     category: "Kids",
    //     subCategory: "Topwear",
    //     sizes: ["S", "M", "L", "XL"],
    //     date: 1716657445448,
    //     bestseller: false,
    //     rating: ,
    //     sales: 
    // },
    // {
    //     _id: "aaabq",
    //     name: "Kid Tapered Slim Fit Trouser",
    //     description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    //     price: 280,
    //     image: [p_img43],
    //     category: "Kids",
    //     subCategory: "Bottomwear",
    //     sizes: ["S", "M", "L", "XL"],
    //     date: 1716658545448,
    //     bestseller: false,
    //     rating: ,
    //     sales: 
    // },
    // {
    //     _id: "aaabr",
    //     name: "Women Zip-Front Relaxed Fit Jacket",
    //     description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    //     price: 310,
    //     image: [p_img44],
    //     category: "Women",
    //     subCategory: "Winterwear",
    //     sizes: ["S", "M", "L", "XL"],
    //     date: 1716659645448,
    //     bestseller: false,
    //     rating: ,
    //     sales: 
    // },
    // {
    //     _id: "aaabs",
    //     name: "Men Slim Fit Relaxed Denim Jacket",
    //     description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    //     price: 290,
    //     image: [p_img45],
    //     category: "Men",
    //     subCategory: "Winterwear",
    //     sizes: ["S", "M", "L", "XL"],
    //     date: 1716660745448,
    //     bestseller: false,
    //     rating: ,
    //     sales: 
    // },
    // {
    //     _id: "aaabt",
    //     name: "Men Slim Fit Relaxed Denim Jacket",
    //     description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    //     price: 320,
    //     image: [p_img46],
    //     category: "Men",
    //     subCategory: "Winterwear",
    //     sizes: ["S", "M", "L", "XL"],
    //     date: 1716661845448,
    //     bestseller: false,
    //     rating: ,
    //     sales: 
    // },
    // {
    //     _id: "aaabu",
    //     name: "Kid Tapered Slim Fit Trouser",
    //     description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    //     price: 300,
    //     image: [p_img47],
    //     category: "Kids",
    //     subCategory: "Bottomwear",
    //     sizes: ["S", "M", "L", "XL"],
    //     date: 1716662945448,
    //     bestseller: false,
    //     rating: ,
    //     sales: 
    // },
    // {
    //     _id: "aaabv",
    //     name: "Men Slim Fit Relaxed Denim Jacket",
    //     description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    //     price: 330,
    //     image: [p_img48],
    //     category: "Men",
    //     subCategory: "Winterwear",
    //     sizes: ["S", "M", "L", "XL"],
    //     date: 1716664045448,
    //     bestseller: false,
    //     rating: ,
    //     sales: 
    // },
    // {
    //     _id: "aaabw",
    //     name: "Kid Tapered Slim Fit Trouser",
    //     description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    //     price: 310,
    //     image: [p_img49],
    //     category: "Kids",
    //     subCategory: "Bottomwear",
    //     sizes: ["S", "M", "L", "XL"],
    //     date: 1716665145448,
    //     bestseller: false,
    //     rating: ,
    //     sales: 
    // },
    // {
    //     _id: "aaabx",
    //     name: "Kid Tapered Slim Fit Trouser",
    //     description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    //     price: 340,
    //     image: [p_img50],
    //     category: "Kids",
    //     subCategory: "Bottomwear",
    //     sizes: ["S", "M", "L", "XL"],
    //     date: 1716666245448, bestseller: false,
    //     rating: ,
    //     sales: 
    // },
    // {
    //     _id: "aaaby",
    //     name: "Women Zip-Front Relaxed Fit Jacket",
    //     description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    //     price: 320,
    //     image: [p_img51],
    //     category: "Women",
    //     subCategory: "Winterwear",
    //     sizes: ["S", "M", "L", "XL"],
    //     date: 1716667345448,
    //     bestseller: false,
    //     rating: ,
    //     sales: 
    // },
    // {
    //     _id: "aaabz",
    //     name: "Men Slim Fit Relaxed Denim Jacket",
    //     description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    //     price: 350,
    //     image: [p_img52],
    //     category: "Men",
    //     subCategory: "Winterwear",
    //     sizes: ["S", "M", "L", "XL"],
    //     date: 1716668445448,
    //     bestseller: false,
    //     rating: ,
    //     sales: 
    // },

]