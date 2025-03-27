import { observer } from "mobx-react-lite";
import { Table, Button, TextInput, Select } from "@gravity-ui/uikit";
import placesStore from "../store/placesStore";
import { Link } from "react-router-dom";
import { generateMapLinks } from "../utils/mapLinks";
import { useState } from "react";

const Home = observer(() => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "В планах" | "Осмотрена">("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Фильтрация и сортировка данных
  const filteredPlaces = placesStore.places
    .filter((place) => place.name.toLowerCase().includes(search.toLowerCase()))
    .filter((place) => (statusFilter === "all" ? true : place.status === statusFilter))
    .sort((a, b) => (sortOrder === "asc" ? a.rating - b.rating : b.rating - a.rating));

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Список достопримечательностей</h1>
      
      <p className="mb-2">Всего достопримечательностей: {filteredPlaces.length}</p>

      {/* Поиск и фильтрация */}
      <div className="flex mb-6" style={{ gap: '16px' }}>
        <TextInput
          placeholder="🔍 Поиск по названию"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ margin: '0 16px 10px 0', flexGrow: 1 }}
        />

        <div style={{ width: '200px', margin: '0 0 10px 0' }}>
          <Select
            options={[
              { value: "all", content: "Все" },
              { value: "В планах", content: "В планах" },
              { value: "Осмотрена", content: "Осмотрена" },
            ]}
            value={[statusFilter]}
            onUpdate={(value) => setStatusFilter(value[0] as "all" | "В планах" | "Осмотрена")}
          />
        </div>

        <div style={{ width: '200px' }}>
          <Select
            options={[
              { value: "asc", content: "⭐ По возрастанию" },
              { value: "desc", content: "⭐ По убыванию" },
            ]}
            value={[sortOrder]}
            onUpdate={(value) => setSortOrder(value[0] as "asc" | "desc")}
          />
        </div>
      </div>

      {/* Таблица с данными */}
      <div style={{ marginTop: '16px' }}>
        <Table
          columns={[
            { id: "name", name: "Название" },
            { id: "location", name: "Местоположение" },
            { id: "status", name: "Статус" },
            { id: "rating", name: "⭐ Рейтинг" },
            { id: "map", name: "Карта" },
          ]}
          data={filteredPlaces.map((place) => {
            const { googleMapsLink, yandexMapsLink } = generateMapLinks(place.latitude, place.longitude);
            return {
              ...place,
              map: (
                <>
                  <a href={googleMapsLink} target="_blank" rel="noopener noreferrer">🌍 Google</a> |  
                  <a href={yandexMapsLink} target="_blank" rel="noopener noreferrer">🗺️ Яндекс</a>
                </>
              ),
            };
          })}
        />
      </div>

      {/* Ссылка на режим администратора */}
      <Link to="/admin">
        <Button view="action" style={{ marginTop: '24px' }}>
          Режим администратора
        </Button>
      </Link>
    </div>
  );
});

export default Home;
