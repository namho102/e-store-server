var tableData =  [{
                id: 0,
                name: 'Acer Aspire E 15 E5-575-33BM',
                category: 'Computers',
                brand: 'Acer',
                stockStatus: 'In stock',
                price: "$355",
                imgURL: "https://images-na.ssl-images-amazon.com/images/I/711XyKNjr6L._SL1331_.jpg"
            }, {
                id: 1,
                name: 'HP Notebook 15-ay011nr',
                category: 'Computers',
                brand: 'HP',
                stockStatus: 'Out of stock',
                price: "$549",
                imgURL: "https://images-na.ssl-images-amazon.com/images/I/714TSsHtZNL._SL1500_.jpg"
            }, {
                id: 2,
                name: 'NETGEAR Nighthawk AC1750',
                category: 'Computers',
                brand: 'NETGEAR',
                stockStatus: 'In stock',
                price: "$109",
                imgURL: "https://images-na.ssl-images-amazon.com/images/I/91-tQAAX4jL._SL1500_.jpg"
            }, {
                id: 3,
                name: 'CYBERPOWERPC Gamer Xtreme VR GXiVR8020A Gaming Desktop',
                category: 'Computers',
                brand: 'CYBERPOWERPC',
                stockStatus: 'In stock',
                price: "$719",
                imgURL: "https://images-na.ssl-images-amazon.com/images/I/81nmXFn%2BbDL._SL1500_.jpg"
            }, {
                id: 4,
                name: 'Apple 42mm Smart Watch',
                category: 'Cell Phones',
                brand: 'Apple',
                stockStatus: 'Out of stock',
                price: "$275",
                imgURL: "https://images-na.ssl-images-amazon.com/images/I/61WzbpVKIdL._SL1500_.jpg"
            }, {
                id: 5,
                name: 'Samsung Galaxy S7 ',
                category: 'Cell Phones',
                brand: 'Samsung',
                stockStatus: 'In stock',
                price: "$599",
                imgURL: "https://images-na.ssl-images-amazon.com/images/I/71xmfDEzOuL._SL1500_.jpg"
            }, {
                id: 6,
                name: 'LG Electronics 65UH8500 65-Inch 4K Smart TV',
                category: 'TV',
                brand: 'Samsung',
                stockStatus: 'In stock',
                price: "$1670",
                imgURL: "https://images-na.ssl-images-amazon.com/images/I/91P76LdcFOL._SL1500_.jpg"
            }, {
                id: 7,
                name: 'Apple iPhone 7 128GB',
                category: 'Cell Phones',
                brand: 'Apple',
                stockStatus: 'In stock',
                price: "$576",
                imgURL: "http://pisces.bbystatic.com/image2/BestBuy_US/images/products/5581/5581593_sd.jpg;maxHeight=1000;maxWidth=1000"
            }]

for (var item of tableData) {
  console.log(JSON.stringify(item));
}
