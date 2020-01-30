## BYOB - Build Your Own Beer Database?

### Mod 4 - Solo Project

Using node.js with express to build a RESTful api backend server with various endpoints.

#### Endpoints  

##### GET all breweries
- Path: '/api/v1/breweries'
- Sample Response:
{
  "breweries": [
    {
        "id": 647,
        "name": "Aberdeen Brewing",
        "city": "Valparaiso",
        "state": "Indiana",
        "country": "United States",
        "phone": "(219) 548-3300",
        "website": "",
        "created_at": "2020-01-30T00:22:47.839Z",
        "updated_at": "2020-01-30T00:22:47.839Z"
    },
    {
      ...
    },
    {
        "id": 662,
        "name": "Angelic Brewing",
        "city": "Madison",
        "state": "Wisconsin",
        "country": "United States",
        "phone": "1-608-257-2707",
        "website": "",
        "created_at": "2020-01-30T00:22:47.867Z",
        "updated_at": "2020-01-30T00:22:47.867Z"
    }
  ]
}


##### GET specific breweries
- Path: '/api/v1/breweries/:id'
- Sample Response:
{
    "id": 649,
    "name": "Aksarben Brewing (BOP)",
    "city": "Omaha",
    "state": "Nebraska",
    "country": "United States",
    "phone": "",
    "website": "",
    "created_at": "2020-01-30T00:22:47.859Z",
    "updated_at": "2020-01-30T00:22:47.859Z"
}



##### GET all beers for specific brewery
- Path: '/api/v1/breweries/649/beers'
- Sample Response:
{
    "beers": [
        {
            "id": 35,
            "name": "Bavarian Bock",
            "brewery_id": 649,
            "abv": "0"
        },
        {
            "id": 36,
            "name": "Heater",
            "brewery_id": 649,
            "abv": "0"
        },
        {
            "id": 33,
            "name": "Bourbon Imperial Stout",
            "brewery_id": 649,
            "abv": "0"
        },
        {
            "id": 34,
            "name": "Witbier",
            "brewery_id": 649,
            "abv": "0"
        },
        {
            "id": 38,
            "name": "Brout",
            "brewery_id": 649,
            "abv": "0"
        },
        {
            "id": 37,
            "name": "Harvest Brown",
            "brewery_id": 649,
            "abv": "0"
        }
    ]
}
