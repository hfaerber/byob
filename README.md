# BYOB - Build Your Own Beer Database?

## Mod 4 - Solo Project

Using node.js with express to build a RESTful api backend server with various endpoints.

## Endpoints  
All endpoints are prefixed with `/api/v1`.
/* indicates an optional key in the required request body


| Purpose | URL | Verb | Request Body | Sample Success Response |
|----|----|----|----|----|
| Get all breweries |`/breweries`| GET | N/A | `{breweries: [{}, {}, ...]}`   [See example](#all_breweries) |
| Get specific brewery |`/breweries/:id`| GET | N/A | `{}` [See example](#one_brewery) |
| Get all beers for specific brewery |`/breweries/:id/beers`| GET | N/A | `{beers: [{}, {}, ...]}`    [See example](#all_beers_by_brewery) |
| Get specific beer |`/beers/:id`| GET | N/A | `{}`  [See example](#one_beer) |
| Post brewery |`/breweries`| POST | `{name: <String>, city: <String>, state: <String>, *country: <String>, *phone: <String>, *website: <String>}` | `{}` [See example](#post_brewery) |
| Post beer |`/breweries/:id/beers`| POST | `{name: <String>, brewery_id: <Number>, *abv: <Number>}` | `{}` [See example](#post_beer) |
| Delete beer |`/beers/:id'| DELETE | N/A | `Beer id <id> has been removed successfully`    [See example](#delete_brewery) |


##### <a name="all_breweries"></a> GET all breweries
- Path: `/api/v1/breweries`
- Sample Response:  
`{
  "breweries":
  [ {
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
        "id": 662,
        "name": "Angelic Brewing",
        "city": "Madison",
        "state": "Wisconsin",
        "country": "United States",
        "phone": "1-608-257-2707",
        "website": "",
        "created_at": "2020-01-30T00:22:47.867Z",
        "updated_at": "2020-01-30T00:22:47.867Z"
    },  
    ...... ]
}`

##### <a name="one_brewery"></a> GET specific brewery
- Path: `/api/v1/breweries/:id`
- Sample Response:  
`{
    "id": 649,
    "name": "Aksarben Brewing (BOP)",
    "city": "Omaha",
    "state": "Nebraska",
    "country": "United States",
    "phone": "",
    "website": "",
    "created_at": "2020-01-30T00:22:47.859Z",
    "updated_at": "2020-01-30T00:22:47.859Z"
}`

##### <a name="all_beers_by_brewery"></a> GET all beers for specific brewery
- Path: `/api/v1/breweries/id/beers`
- Sample Response:  
`{
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
}`

##### <a name="one-beer"></a> GET specific beer
- Path: `/api/v1/beers/:id`
- Sample Response:  
`{
  "id": 15,
  "name": "Abita Light Beer",
  "brewery_id": 648,
  "abv": "0"
}`

##### <a name="post_brewery"></a> POST a brewery
  - Path: `/api/v1/breweries`
  - `<*>` indicates an optional key in the required request body
  - Sample Request Body:  
`{
  name: "Jarvis Blargis Brewing",
  city: "Tiffin",
  state: "Ohio",
  *country: "United States",
  *phone: "419-867-5309",
  *website: "www.jarvisblargisbrewing.com"
}`
  - Sample Response:  
`{
    "id": [
        1296
    ]
}`

##### <a name="post_beer"></a> POST a beer
  - Path: `/api/v1/breweries/:id/beers`
  - `<*>` indicates an optional key in the required request body
  - Sample Request Body:  
`{
  name: "Jarvis Blargis Brewing",
  *abv: 5.4
}`
  - Sample Response:  
`{
  "id": [
  2900
  ]
}`

##### <a name="delete_beer"></a> DELETE a beer
  - Path: `/api/v1/beers/:id`
  - Sample Request Body: N/A
  - Sample Response:  
`Beer id <id> has been removed successfully`
