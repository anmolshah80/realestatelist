const CSV_FILE_NAME = 'zillow-properties-listing-information.csv';

const CSV_EXAMPLE_DATA = {
  address:
    '{\"city\":\"Huntington Beach\",\"state\":\"CA\",\"streetAddress\":\"19411 Castlewood Cir\",\"zipcode\":\"92648\"}',
  bedrooms: '2',
  bathrooms: '3',
  price: '1475000',
  yearBuilt: '1988',
  listingDataSource: 'Phoenix',
  longitude: '-118.026474',
  latitude: '33.68005',
  livingArea: '2298',
  lotSize: '15752',
  currency: 'USD',
  dateSoldString: '7/29/2022',
  country: 'USA',
  livingAreaUnits: 'Square Feet',
  description:
    "JUST LISTED IN THE GUARD GATED COMMUNITY OF SEACLIFF ON THE GREENS!  This 500 model has a desirable corner lot.  Extremely light and bright  with 2298 square feet of living space with 2.5 baths, 2 full bedrooms + loft area and a office.  Master Bedroom has vaulted ceiling, walk-in closet and a separate wardrobe closet. Master bath has just been remodeled with soaking tub, dual sinks and vanity and wall in shower. The other bathrooms are also redone. Central vacuum, shutters thru out and updated window and sliders. There is a sound system thru out home and also on patio.  There is a spacious two car garage with lots of build-in cabinets.  Close proximity to the beach, Pacific City and restaurants.  Within walking distance to The Huntington Club, golf and tennis.  THIS ONE WON'T LAST!!",
  daysOnZillow: '719',
  brokerageName: 'Coldwell Banker Realty',
  propertyTypeDimension: 'Townhouse',
  photos:
    'https://photos.zillowstatic.com/fp/8e1d019842a60b2f6db1da1cf18a7cc3-cc_ft_1152.jpg',
  url: '',
  isFeatured: 'TRUE',
  interior:
    '{"bedrooms_and_bathrooms":{"bathrooms":2,"bedrooms":3,"full_bathrooms":2,"half_bathroom":"0"},"flooring":"Carpet, Laminate, Linoleum / Vinyl","heating":"Forced air, Electric, Gas","other_interior_features":"Total interior livable area :1,682 sqft"}',
  tag: 'Available',
  lastSoldPrice: '1475000',
  priceHistory:
    '[{"attributeSource":{"infoString2":"CRMLS","infoString3":"https://photos.zillowstatic.com/fp/9f61463932aa73f48f1ae3d056f0eb39-zillow_web_logo_inf_11.jpg"},"date":"2022-07-29","event":"Sold","postingIsRental":false,"price":1475000,"priceChangeRate":-1.601067378252168e-02,"pricePerSquareFoot":642,"showCountyLink":false,"source":"CRMLS","time":1659052800000},{"attributeSource":{"infoString2":"CRMLS","infoString3":"https://photos.zillowstatic.com/fp/9f61463932aa73f48f1ae3d056f0eb39-zillow_web_logo_inf_11.jpg"},"date":"2022-07-12","event":"Pending sale","postingIsRental":false,"price":1499000,"priceChangeRate":0,"pricePerSquareFoot":652,"showCountyLink":false,"source":"CRMLS","time":1657584000000},{"attributeSource":{"infoString2":"CRMLS","infoString3":"https://photos.zillowstatic.com/fp/9f61463932aa73f48f1ae3d056f0eb39-zillow_web_logo_inf_11.jpg"},"date":"2022-05-29","event":"Contingent","postingIsRental":false,"price":1499000,"priceChangeRate":0,"pricePerSquareFoot":652,"showCountyLink":false,"source":"CRMLS","time":1653782400000},{"attributeSource":{"infoString2":"CRMLS","infoString3":"https://photos.zillowstatic.com/fp/9f61463932aa73f48f1ae3d056f0eb39-zillow_web_logo_inf_11.jpg"},"date":"2022-05-27","event":"Price change","postingIsRental":false,"price":1499000,"priceChangeRate":-4.825396825396826e-02,"pricePerSquareFoot":652,"showCountyLink":false,"source":"CRMLS","time":1653609600000},{"attributeSource":{"infoString2":"CRMLS","infoString3":"https://photos.zillowstatic.com/fp/9f61463932aa73f48f1ae3d056f0eb39-zillow_web_logo_inf_11.jpg"},"date":"2022-05-13","event":"Listed for sale","postingIsRental":false,"price":1575000,"priceChangeRate":2.539325842696629e+00,"pricePerSquareFoot":685,"showCountyLink":false,"source":"CRMLS","time":1652400000000},{"attributeSource":{"infoString2":"Public Record"},"date":"1999-05-27","event":"Sold","postingIsRental":false,"price":445000,"priceChangeRate":3.650306748466258e-01,"pricePerSquareFoot":194,"showCountyLink":false,"source":"Public Record","time":927763200000},{"attributeSource":{"infoString2":"Public Record"},"date":"1997-12-31","event":"Sold","postingIsRental":false,"price":326000,"priceChangeRate":0,"pricePerSquareFoot":142,"showCountyLink":false,"source":"Public Record","time":883526400000}]',
};

const MAX_RESULTS_PER_PAGE = 6;

const PROPERTY_TYPES = [
  'Apartment',
  'Condo',
  'Manufactured',
  'Multi Family',
  'Single Family',
  'Townhouse',
];

const FALLBACK_ADDRESS = '7833 Marina Dr, Bridgeport, NY 13030';

const ADMIN_COOKIE_NAME = 'isAdminUser';

export {
  CSV_FILE_NAME,
  CSV_EXAMPLE_DATA,
  MAX_RESULTS_PER_PAGE,
  PROPERTY_TYPES,
  FALLBACK_ADDRESS,
  ADMIN_COOKIE_NAME,
};
