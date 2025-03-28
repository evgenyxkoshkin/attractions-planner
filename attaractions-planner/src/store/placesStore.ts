import { makeAutoObservable } from "mobx";

// Определяем интерфейс достопримечательности
export interface Place {
  id: string;
  name: string;
  description: string;
  addedAt: string;
  rating: number;
  imageUrl: string;
  location: string;
  latitude: number;
  longitude: number;
  status: "В планах" | "Осмотрена";
}


class PlacesStore {
  places: Place[] = [
    {
      id: crypto.randomUUID(),
      name: "Лувр",
      description: "Один из крупнейших музеев мира, расположенный в Париже.",
      addedAt: new Date().toISOString(),
      rating: 5,
      imageUrl: "https://static.tildacdn.com/tild3930-6161-4565-a166-336363343834/1.png",
      location: "Париж, Франция",
      latitude: 48.8606,
      longitude: 2.3376,
      status: "В планах"
    },
    {
      id: crypto.randomUUID(),
      name: "Статуя Свободы",
      description: "Один из самых известных символов США.",
      addedAt: new Date().toISOString(),
      rating: 5,
      imageUrl: "https://cdn.radiosputnik.ru/images/153244/87/1532448703_0:0:3146:1771_1920x0_80_0_0_90915ec2e9d4cca752e0c0361f8300fc.jpg",
      location: "Нью-Йорк, США",
      latitude: 40.6892,
      longitude: -74.0445,
      status: "В планах"
    },
    {
      id: crypto.randomUUID(),
      name: "Большой каньон",
      description: "Огромный каньон в США, одна из главных природных достопримечательностей.",
      addedAt: new Date().toISOString(),
      rating: 4,
      imageUrl: "https://pohcdn.com/sites/default/files/styles/paragraph__hero_banner__hb_image__1880bp/public/hero_banner/grand-canyon-2.jpg",
      location: "Аризона, США",
      latitude: 36.1069,
      longitude: -112.1129,
      status: "В планах"
    },
    {
      id: crypto.randomUUID(),
      name: "Собор Святого Петра",
      description: "Главный католический храм в Ватикане.",
      addedAt: new Date().toISOString(),
      rating: 5,
      imageUrl: "https://39rim.ru/wp-content/uploads/2015/01/Sobor-Svatogo-petra-3.jpg",
      location: "Ватикан",
      latitude: 41.9029,
      longitude: 12.4534,
      status: "В планах"
    },
    {
      id: crypto.randomUUID(),
      name: "Гора Фудзи",
      description: "Самая высокая гора Японии, известный символ страны.",
      addedAt: new Date().toISOString(),
      rating: 5,
      imageUrl: "https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcTlq5txLtbc8YxU4DFgLMJG1zPJCzZUdjLmam3fP1DHaEjcG0NW0nGP82f6NPZkcdNHSc_42pqclODquUo-QJcrhKCvLET3047JbWncng",
      location: "Япония",
      latitude: 35.3606,
      longitude: 138.7274,
      status: "В планах"
    },
    {
      id: crypto.randomUUID(),
      name: "Колизей",
      description: "Древний амфитеатр в Риме, одно из чудес света.",
      addedAt: new Date().toISOString(),
      rating: 4,
      imageUrl: "https://7d9e88a8-f178-4098-bea5-48d960920605.selcdn.net/583665dc-c63e-4d7e-bdc4-c80bfad7756a/-/format/webp/-/resize/1300x/",
      location: "Рим, Италия",
      latitude: 41.8902,
      longitude: 12.4922,
      status: "В планах"
    },
    {
      id: crypto.randomUUID(),
      name: "Мачу-Пикчу",
      description: "Древний город инков в горах Перу.",
      addedAt: new Date().toISOString(),
      rating: 5,
      imageUrl: "https://a.travelcdn.mts.ru/travel-media/machu_pikchu_2_0bf8b83f06.jpg",
      location: "Перу",
      latitude: -13.1631,
      longitude: -72.5450,
      status: "В планах"
    },
    {
      id: crypto.randomUUID(),
      name: "Оперный театр в Сиднее",
      description: "Знаменитое архитектурное сооружение в Австралии.",
      addedAt: new Date().toISOString(),
      rating: 4,
      imageUrl: "https://www.classicalmusicnews.ru/wp-content/uploads/2016/08/Sidnejski.jpg",
      location: "Сидней, Австралия",
      latitude: -33.8568,
      longitude: 151.2153,
      status: "В планах"
    }
  ];

  constructor() {
    makeAutoObservable(this);
  }

  // Добавление новой достопримечательности
  addPlace(place: Omit<Place, "id" | "addedAt" | "status">) {
    const newPlace: Place = {
      ...place,
      id: crypto.randomUUID(),
      addedAt: new Date().toISOString(),
      status: "В планах",
    };
    this.places.push(newPlace);
  }

  // Удаление достопримечательности
  removePlace(id: string) {
    this.places = this.places.filter((place) => place.id !== id);
  }

  // Редактирование достопримечательности
  editPlace(updatedPlace: Place) {
    const index = this.places.findIndex((p) => p.id === updatedPlace.id);
    if (index !== -1) {
      this.places[index] = updatedPlace;
    }
  }

  // Получение количества достопримечательностей
  get count() {
    return this.places.length;
  }

  // Переключение статуса (В планах / Осмотрена)
  toggleStatus(id: string) {
    const place = this.places.find((p) => p.id === id);
    if (place) {
      place.status = place.status === "В планах" ? "Осмотрена" : "В планах";
    }
  }
}

// Создаем и экспортируем экземпляр Store
const placesStore = new PlacesStore();
export default placesStore;
