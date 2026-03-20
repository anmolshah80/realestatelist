const CSV_FILE_PATH = '/data/zillow-properties-listing-information.csv';

const CSV_FILE_NAME = 'zillow-properties-listing-information.csv';

const CSV_EXAMPLE_DATA = {
  address:
    '{"city":"Vista","state":"CA","streetAddress":"349 Yacon St","zipcode":"92083"}',
  bedrooms: '3',
  bathrooms: '1.5',
  price: '768800',
  yearBuilt: '1957',
  listingDataSource: 'Legacy',
  longitude: '-117.26301',
  latitude: '33.199516',
  livingArea: '1552',
  currency: 'USD',
  dateSoldString: '11/13/2003',
  country: 'USA',
  photoCount: '1',
  livingAreaUnits: 'Square Feet',
  description:
    'This 1552 square foot single family home has 3 bedrooms and 1.5 bathrooms. This home is located at 349 Yacon St, Vista, CA 92083.',
  daysOnZillow: '7569',
  brokerageName: '',
  propertyTypeDimension: 'Single Family',
  photos:
    '[{"mixedSources":{"jpeg":[{"url":"https://maps.googleapis.com/maps/api/streetview?location=349+Yacon+St%2C+Vista%2C+CA+92083&size=192x144&key=AIzaSyARFMLB1na-BBWf7_R3-5YOQQaHqEJf6RQ&source=outdoor&&signature=Efw2pebmFxJVjhSoGlKcRYsq0Wo=","width":192},{"url":"https://maps.googleapis.com/maps/api/streetview?location=349+Yacon+St%2C+Vista%2C+CA+92083&size=384x288&key=AIzaSyARFMLB1na-BBWf7_R3-5YOQQaHqEJf6RQ&source=outdoor&&signature=wSJ3t99-RP1YKcPSsRi6N3NKyMc=","width":384},{"url":"https://maps.googleapis.com/maps/api/streetview?location=349+Yacon+St%2C+Vista%2C+CA+92083&size=576x432&key=AIzaSyARFMLB1na-BBWf7_R3-5YOQQaHqEJf6RQ&source=outdoor&&signature=aW7rqeUTWi0F_g1eqWDQhWbvA1o=","width":576},{"url":"https://maps.googleapis.com/maps/api/streetview?location=349+Yacon+St%2C+Vista%2C+CA+92083&size=768x576&key=AIzaSyARFMLB1na-BBWf7_R3-5YOQQaHqEJf6RQ&source=outdoor&&signature=78yjduPhvzBn3EeDlra0zyR2YTs=","width":768},{"url":"https://maps.googleapis.com/maps/api/streetview?location=349+Yacon+St%2C+Vista%2C+CA+92083&size=960x720&key=AIzaSyARFMLB1na-BBWf7_R3-5YOQQaHqEJf6RQ&source=outdoor&&signature=r8z8qL-0WytYg9eTwlLOIdKoIF0=","width":960},{"url":"https://maps.googleapis.com/maps/api/streetview?location=349+Yacon+St%2C+Vista%2C+CA+92083&size=1152x864&key=AIzaSyARFMLB1na-BBWf7_R3-5YOQQaHqEJf6RQ&source=outdoor&&signature=KReD7vEAJIu-MLkxsO9lg8z7Aqk=","width":1152},{"url":"https://maps.googleapis.com/maps/api/streetview?location=349+Yacon+St%2C+Vista%2C+CA+92083&size=1344x1008&key=AIzaSyARFMLB1na-BBWf7_R3-5YOQQaHqEJf6RQ&source=outdoor&&signature=gEritn2vFUKJg-BHJRoae3KLcRA=","width":1344},{"url":"https://maps.googleapis.com/maps/api/streetview?location=349+Yacon+St%2C+Vista%2C+CA+92083&size=1536x1152&key=AIzaSyARFMLB1na-BBWf7_R3-5YOQQaHqEJf6RQ&source=outdoor&&signature=SrfJCEXm79bnaMYCNFmaXtjKMM8=","width":1536}]}}]',
  url: 'https://www.zillow.com/homedetails/349-Yacon-St-Vista-CA-92083/16610100_zpid/',
  isFeatured: 'FALSE',
  interior:
    '{"bedrooms_and_bathrooms":{"bathrooms":1,"bedrooms":3,"half_bathroom":"null"},"other_interior_features":"Total interior livable area :1,552 sqft"}',
  tag: 'Off market',
};

export { CSV_FILE_PATH, CSV_FILE_NAME, CSV_EXAMPLE_DATA };
