import React from 'react'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const apiKey = import.meta.env.VITE_EC_API_KEY

const ECOMMERCEAPI = createApi({
    reducerPath: 'ECOMMERCEAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://real-time-amazon-data.p.rapidapi.com',
        prepareHeaders: (headers) => {
            if (apiKey) { 
                
                headers.set('x-rapidapi-key', apiKey);
            }
            else {
                console.error('API key is not defined!');
            }

            return headers;
        }
    }),
    endpoints: (builder) => ({
        getDeal: builder.query({
            query: ({country, offSet, categories, star, price, discount}) => `/deals-v2?country=${country}&offset=${offSet}&categories=${categories}&min_product_star_rating=${star}&price_range=${price}&discount_range=${discount}`
        }),
        getDealProduct: builder.query({
            query: ({dealId, country, sortBy}) => `/deal-products?deal_id=${dealId}&country=${country}&sort_by=${sortBy}&page=1`
        }),
        getProductCategoryList: builder.query({
            query: ({country}) => `/product-category-list?country=${country}`
        }),
        getProducts: builder.query({
            query: ({asin, country, productCondition}) => {
                if (productCondition) {
                    return `/product-offers?asin=${asin}&country=${country}&product_condition=${productCondition}&limit=100&page=1`  
                }
                else {
                    return `/product-offers?asin=${asin}&country=${country}&limit=100&page=1`
                }
            },
            keepUnusedDataFor: 0
        }),
        getProductDetail: builder.query({
            query: ({asin, country}) => `/product-details?asin=${asin}&country=${country}`,
            keepUnusedDataFor: 0
        }),
        getReview: builder.query({
            query: ({asin, country, sortBy, starRating, verifiedPurchaseOnly, page}) => `/product-reviews?asin=${asin}&country=${country}&sort_by=${sortBy}&star_rating=${starRating}&verified_purchases_only=${verifiedPurchaseOnly}&page=${page}`
        }),
        getCategory: builder.query({
            query: ({categoryID, page, country, sortBy, productCondition}) => `/products-by-category?category_id=${categoryID}&page=${page}&country=${country}&sort_by=${sortBy}&product_condition=${productCondition}&is_prime=false`
        }),
        getSearch: builder.query({
            query: ({searchTerm, page, country, sortBy, productCondition}) => `/search?query=${encodeURIComponent(searchTerm)}&page=${page}&country=${country}&sort_by=${sortBy}&product_condition=${productCondition}&is_prime=false`
        })
    })
})

export const { useGetDealQuery, useGetDealProductQuery, useGetProductCategoryListQuery, useGetProductsQuery, useGetProductDetailQuery, useGetReviewQuery, useGetCategoryQuery, useGetSearchQuery } = ECOMMERCEAPI

export default ECOMMERCEAPI





// {
//     "status": "OK",
//     "request_id": "d608be12-7acb-4a80-bb5f-16d2f9d09222",
//     "parameters": {
//       "asin": "B07ZPKBL9V",
//       "country": "US"
//     },
//     "data": {
//       "asin": "B07ZPKBL9V",
//       "product_title": "Apple iPhone 11, 64GB, (PRODUCT)RED - Fully Unlocked (Renewed)",
//       "product_price": "$218.99",
//       "product_original_price": null,
//       "currency": "USD",
//       "country": "US",
//       "product_byline": "Visit the Amazon Renewed Store",
//       "product_star_rating": "4.2",
//       "product_num_ratings": 50925,
//       "product_url": "https://www.amazon.com/dp/B07ZPKBL9V",
//       "product_photo": "https://m.media-amazon.com/images/I/510Fpe16MoL._AC_SL1000_.jpg",
//       "product_num_offers": 58,
//       "product_availability": "Only 15 left in stock - order soon.",
//       "is_best_seller": false,
//       "is_amazon_choice": false,
//       "is_prime": false,
//       "climate_pledge_friendly": true,
//       "sales_volume": "1K+ bought in past month",
//       "about_product": [
//         "This phone is unlocked and compatible with any carrier of choice on GSM and CDMA networks (e.g. AT&T, T-Mobile, Sprint, Verizon, US Cellular, Cricket, Metro, Tracfone, Mint Mobile, etc.).",
//         "Tested for battery health and guaranteed to have a minimum battery capacity of 80%.",
//         "Successfully passed a full diagnostic test which ensures like-new functionality and removal of any prior-user personal information."
//       ],
//       "product_description": "The iPhone 11 features a 6.1-inch LCD display that Apple calls a \"Liquid Retina HD Display.\" It features a 1792 x 828 resolution at 326ppi, a 1400:1 contrast ratio, 625 nits max brightness, True Tone support for adjusting the white balance to the ambient lighting, and wide color support for true-to-life colors. The iPhone 11 is available in six different colors: White, Black, Yellow, (PRODUCT)RED, Purple, and Green.",
//       "product_information": {
//         "Product Dimensions": "7 x 5 x 4 inches",
//         "Item Weight": "6.7 ounces",
//         "ASIN": "B07ZPKBL9V",
//         "Item model number": "iPhone 11",
//         "Batteries": "1 Lithium Ion batteries required. (included)",
//         "Best Sellers Rank": "#3 in Amazon Renewed (See Top 100 in Amazon Renewed)   #2 in Renewed Smartphones",
//         "Is Discontinued By Manufacturer": "No",
//         "OS": "iOS 16",
//         "RAM": "4 GB",
//         "Wireless communication technologies": "Cellular",
//         "Connectivity technologies": "Bluetooth, Wi-Fi, USB, NFC",
//         "GPS": "True",
//         "Special features": "Built-In GPS",
//         "Other display features": "Wireless",
//         "Human Interface Input": "Touchscreen",
//         "Other camera features": "Front, Rear",
//         "Form Factor": "Smartphone",
//         "Color": "Red",
//         "Battery Power Rating": "3600",
//         "Whats in the box": "Apple iPhone, USB Data Cable",
//         "Manufacturer": "Apple Computer",
//         "Date First Available": "October 28, 2019",
//         "Memory Storage Capacity": "64 GB",
//         "Standing screen display size": "6.1 Inches",
//         "Ram Memory Installed Size": "4 GB",
//         "Weight": "0.19 Kilograms"
//       },
//       "product_photos": [
//         "https://m.media-amazon.com/images/I/510Fpe16MoL._AC_SL1000_.jpg",
//         "https://m.media-amazon.com/images/I/41UR9-reUEL._AC_SL1000_.jpg",
//         "https://m.media-amazon.com/images/I/51rNY4vxAEL._AC_SL1000_.jpg",
//         "https://m.media-amazon.com/images/I/51Kc-ZDAS8L._AC_SL1500_.jpg",
//         "https://m.media-amazon.com/images/I/61mQXbbJdRL._AC_SL1500_.jpg",
//         "https://m.media-amazon.com/images/I/61CJFIYcr1L._AC_SL1392_.jpg",
//         "https://m.media-amazon.com/images/I/41iMRb9fHIL._AC_.jpg",
//         "https://m.media-amazon.com/images/I/510Fpe16MoL._AC_SL1000_.jpg",
//         "https://m.media-amazon.com/images/I/41UR9-reUEL._AC_SL1000_.jpg"
//       ],
//       "product_details": {
//         "Brand": "Apple",
//         "Operating System": "iOS 16",
//         "Ram Memory Installed Size": "4 GB",
//         "Memory Storage Capacity": "64 GB",
//         "Screen Size": "6.1 Inches",
//         "Model Name": "iPhone 11",
//         "Wireless Carrier": "Unlocked",
//         "Cellular Technology": "GSM, EDGE, UMTS, HSPA, HSDPA, CDMA, EV-DO, LTE",
//         "Connectivity Technology": "Bluetooth, Wi-Fi, USB, NFC",
//         "Color": "Red"
//       },
//       "customers_say": "Customers like the performance and value of the cellular phone. For example, they mention it works great, is perfectly usable, and a smart and cost-effective choice for those seeking a high-quality luxury phone at a budget price. That said, some complain about the charging and sound quality. Opinions are mixed on quality, scratching, and security.",
//       "delivery": "FREE delivery Thursday, September 5. Details Or fastest delivery September 13 - 19",
//       "primary_delivery_time": "Thursday, September 5",
//       "category_path": [
//         {
//           "id": "2335752011",
//           "name": "Cell Phones & Accessories",
//           "link": "https://www.amazon.com/cell-phones-service-plans-accessories/b/ref=dp_bc_aui_C_1?ie=UTF8&node=2335752011"
//         },
//         {
//           "id": "7072561011",
//           "name": "Cell Phones",
//           "link": "https://www.amazon.com/cell-phone-devices/b/ref=dp_bc_aui_C_2?ie=UTF8&node=7072561011"
//         }
//       ],
//       "product_variations": {
//         "size": [
//           {
//             "asin": "B07ZPKBL9V",
//             "value": "64GB",
//             "is_available": true
//           },
//           {
//             "asin": "B07ZPKG5TG",
//             "value": "128GB",
//             "is_available": true
//           },
//           {
//             "asin": "B07ZPJQ413",
//             "value": "256GB",
//             "is_available": true
//           }
//         ],
//         "color": [
//           {
//             "asin": "B07ZPKN6YR",
//             "value": "Black",
//             "photo": "https://m.media-amazon.com/images/I/41GWVG6QBCL.jpg",
//             "is_available": true
//           },
//           {
//             "asin": "B07ZPHSHPG",
//             "value": "Green",
//             "photo": "https://m.media-amazon.com/images/I/418IA10aM7L.jpg",
//             "is_available": true
//           },
//           {
//             "asin": "B07ZPKF8RG",
//             "value": "Purple",
//             "photo": "https://m.media-amazon.com/images/I/414bhOEGiuL.jpg",
//             "is_available": true
//           },
//           {
//             "asin": "B07ZPKBL9V",
//             "value": "Red",
//             "photo": "https://m.media-amazon.com/images/I/41iMRb9fHIL.jpg",
//             "is_available": true
//           },
//           {
//             "asin": "B07ZPJW2XH",
//             "value": "White",
//             "photo": "https://m.media-amazon.com/images/I/21fd2Lvn5NL.jpg",
//             "is_available": true
//           },
//           {
//             "asin": "B07ZPJ8YZ6",
//             "value": "Yellow",
//             "photo": "https://m.media-amazon.com/images/I/411vw3p0RKL.jpg",
//             "is_available": true
//           }
//         ],
//         "service_provider": [
//           {
//             "asin": "B081Y51RLQ",
//             "value": "AT&T",
//             "is_available": true
//           },
//           {
//             "asin": "B08GQ78WVZ",
//             "value": "GSM Carriers",
//             "is_available": true
//           },
//           {
//             "asin": "B084HLTH28",
//             "value": "T-Mobile",
//             "is_available": true
//           },
//           {
//             "asin": "B07ZPKBL9V",
//             "value": "Unlocked",
//             "is_available": true
//           },
//           {
//             "asin": "B084GYQ983",
//             "value": "Verizon",
//             "is_available": true
//           }
//         ]
//       }
//     }
//   }






// export interface RootObject {
//     data:       Data;
//     parameters: Parameters;
//     request_id: string;
//     status:     string;
//    }
   
//    export interface Data {
//     about_product:           string[];
//     asin:                    string;
//     category_path:           CategoryPath[];
//     climate_pledge_friendly: boolean;
//     country:                 string;
//     currency:                string;
//     customers_say:           string;
//     delivery:                string;
//     is_amazon_choice:        boolean;
//     is_best_seller:          boolean;
//     is_prime:                boolean;
//     primary_delivery_time:   string;
//     product_availability:    string;
//     product_byline:          string;
//     product_description:     string;
//     product_details:         ProductDetails;
//     product_information:     ProductInformation;
//     product_num_offers:      number;
//     product_num_ratings:     number;
//     product_original_price:  null;
//     product_photo:           string;
//     product_photos:          string[];
//     product_price:           string;
//     product_star_rating:     string;
//     product_title:           string;
//     product_url:             string;
//     product_variations:      ProductVariations;
//     sales_volume:            string;
//    }
   
//    export interface CategoryPath {
//     id:   string;
//     link: string;
//     name: string;
//    }
   
//    export interface ProductDetails {
//     Brand:                       string;
//     "Cellular Technology":       string;
//     Color:                       string;
//     "Connectivity Technology":   string;
//     "Memory Storage Capacity":   string;
//     "Model Name":                string;
//     "Operating System":          string;
//     "Ram Memory Installed Size": string;
//     "Screen Size":               string;
//     "Wireless Carrier":          string;
//    }
   
//    export interface ProductInformation {
//     ASIN:                                  string;
//     Batteries:                             string;
//     "Battery Power Rating":                string;
//     "Best Sellers Rank":                   string;
//     Color:                                 string;
//     "Connectivity technologies":           string;
//     "Date First Available":                string;
//     "Form Factor":                         string;
//     GPS:                                   string;
//     "Human Interface Input":               string;
//     "Is Discontinued By Manufacturer":     string;
//     "Item Weight":                         string;
//     "Item model number":                   string;
//     Manufacturer:                          string;
//     "Memory Storage Capacity":             string;
//     OS:                                    string;
//     "Other camera features":               string;
//     "Other display features":              string;
//     "Product Dimensions":                  string;
//     RAM:                                   string;
//     "Ram Memory Installed Size":           string;
//     "Special features":                    string;
//     "Standing screen display size":        string;
//     Weight:                                string;
//     "Whats in the box":                    string;
//     "Wireless communication technologies": string;
//    }
   
//    export interface ProductVariations {
//     color:            Color[];
//     service_provider: Color[];
//     size:             Color[];
//    }
   
//    export interface Color {
//     asin:         string;
//     is_available: boolean;
//     photo?:       string;
//     value:        string;
//    }
   
//    export interface Parameters {
//     asin:    string;
//     country: string;
//    }
   