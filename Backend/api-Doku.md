# Dokumentation der API

## `/api/birds`

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

Liefert eine Liste mit `.json`-Containern aller Habitate zurück. 






## `/api/threads`





## `/api/threads/:id`








