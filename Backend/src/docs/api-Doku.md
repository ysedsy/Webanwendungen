# Dokumentation der API

## Swagger / OpenAPI

Die Swagger/OpenAPI-Beschreibung liegt in [openapi.yaml](openapi.yaml).

# Vogel Datenbank

## `GET /api/birds`

Gibt eine Liste mit `.json`-Containern zurück, die Daten zu **allen** Vögeln aus der Datenbank enthalten:

```json
[
    {
        "BirdID":1,
        "CommonName":"Europäischer Robin",
        "ScientificName":"Erithacus rubecula",
        "Height":14,
        "Weight":0.02,
        "AverageAge":2,
        "Description":"Klein, orange-brüstiger Singvogel häufig in Europa.",
        "HabitatID":1,
        "HabitatName":"Forest",
        "ImagePath":"/images/birds/European_Robin.jpg"
    },

    {
        ...
    },  ...
]
```

## `GET /api/birds/:id`

Gibt **einen** `.json`-Containern zurück, der Daten zu **diesem** Vogel aus der Datenbank enthält:

```json
{
    "BirdID":1,
    "CommonName":"Europäischer Robin",
    "ScientificName":"Erithacus rubecula",
    "Height":14,
    "Weight":0.02,
    "AverageAge":2,
    "Description":"Klein, orange-brüstiger Singvogel häufig in Europa.",
    "HabitatID":1,
    "HabitatName":"Forest",
    "ImagePath":"/images/birds/European_Robin.jpg"
}
```

## `GET /api/birds/search/:keyword`

Gibt eine Liste mit `.json`-Containern zurück, die Daten zu **bestimmten** Vögeln aus der Datenbank enthalten, **die mit dem keyword matchen**:

```json
[
    {
        "BirdID":1,
        "CommonName":"Europäischer Robin",
        "ScientificName":"Erithacus rubecula",
        "Height":14,
        "Weight":0.02,
        "AverageAge":2,
        "Description":"Klein, orange-brüstiger Singvogel häufig in Europa.",
        "HabitatID":1,
        "HabitatName":"Forest",
        "ImagePath":"/images/birds/European_Robin.jpg"
    },

    {
        ...
    },  ...
]
```

## `GET /api/habitats`

Liefert eine **Liste** mit `.json`-Containern aller Habitate zurück. 



----

# Forum Datenbank


## `GET /api/threads`

Liefert eine Liste mit **allen** Threads:

```json
[
    {
        ThreadID: 9,
        ThreadTitle: "Titel" 
    },
    {
        ThreadID: 9,
        ThreadTitle: "Titel" 
    },
    ...
]
```

## `GET /api/threads/:id`

Liefert ein `.json`-Container mit allen Posts, die unter einem Thread abgesetzt wurden:


```json

{
    "ThreadID":9,
    "ThreadTitle":"Thread for reply test",
    "posts":
    [
        {
            "PostID":12,
            "UserName":"Tester",
            "PostText":"First post.",
            "DateCreated":"2026-05-06 12:54:03",
            "ThreadID":9,
            "ParentID":null
        },
        {
            "PostID":13,
            "UserName":"ReplyUser",
            "PostText":"This is a reply.",
            "DateCreated":"2026-05-06 12:54:03",
            "ThreadID":9,
            "ParentID":null
        }
    ]
}
```


## `POST /api/threads`

...



## `POST /api/threads/:id/posts`

...


