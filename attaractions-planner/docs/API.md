# Документация к API

## API

### 1. Получить список достопримечательностей  
Метод: `GET`  
URL: `/places`  
Ответ:  
```json
[
  {
    "id": "1",
    "name": "Place 1",
    "location": "City 1",
    "status": "В планах",
    "rating": 4,
    "imageUrl": "https://example.com/image.jpg"
  }
]
```

### 2. Получить информацию о достопримечательности  
Метод: `GET`  
URL: `/places/{id}`  
Ответ:  
```json
{
  "id": "1",
  "name": "Place 1",
  "location": "City 1",
  "status": "В планах",
  "rating": 4,
  "imageUrl": "https://example.com/image.jpg"
}
```

### 3. Добавить достопримечательность  
Метод: `POST`  
URL: `/places`  
Тело запроса:  
```json
{
  "name": "New Place",
  "location": "New City",
  "status": "В планах",
  "rating": 3,
  "imageUrl": "https://example.com/image.jpg"
}
```
Ответ:  
```json
{
  "id": "2",
  "name": "New Place",
  "location": "New City",
  "status": "В планах",
  "rating": 3,
  "imageUrl": "https://example.com/image.jpg"
}
```

### 4. Обновить информацию о достопримечательности  
Метод: `PUT`  
URL: `/places/{id}`  
Тело запроса:  
```json
{
  "name": "Updated Place",
  "location": "Updated City",
  "status": "Осмотрена",
  "rating": 5,
  "imageUrl": "https://example.com/updated-image.jpg"
}
```
Ответ:  
```json
{
  "id": "1",
  "name": "Updated Place",
  "location": "Updated City",
  "status": "Осмотрена",
  "rating": 5,
  "imageUrl": "https://example.com/updated-image.jpg"
}
```

### 5. Удалить достопримечательность  
Метод: `DELETE`  
URL: `/places/{id}`  
Ответ:  
```json
{
  "message": "Place successfully deleted"
}
```