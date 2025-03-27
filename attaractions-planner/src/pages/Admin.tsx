import { observer } from "mobx-react-lite";
import { Table, Button, TextInput, Select } from "@gravity-ui/uikit";
import { useState } from "react";
import placesStore from "../store/placesStore";
import { Link } from "react-router-dom";

const Admin = observer(() => {
  const [newPlace, setNewPlace] = useState({
    name: "",
    description: "",
    imageUrl: "",
    location: "",
    latitude: "",
    longitude: "",
    rating: "3",
  });

  const handleAddPlace = () => {
    if (!newPlace.name || !newPlace.location) return;

    placesStore.addPlace({
      name: newPlace.name,
      description: newPlace.description,
      imageUrl: newPlace.imageUrl,
      location: newPlace.location,
      latitude: parseFloat(newPlace.latitude),
      longitude: parseFloat(newPlace.longitude),
      rating: Number(newPlace.rating),
    });

    setNewPlace({ name: "", description: "", imageUrl: "", location: "", latitude: "", longitude: "", rating: "3" });
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Режим администратора</h1>

      {/* Форма добавления */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <TextInput placeholder="Название" style={{ margin: '0 16px 10px 0', flexGrow: 1 }} value={newPlace.name} onChange={(e) => setNewPlace({ ...newPlace, name: e.target.value })} />
        <TextInput placeholder="Местоположение" style={{ margin: '0 16px 10px 0', flexGrow: 1 }} value={newPlace.location} onChange={(e) => setNewPlace({ ...newPlace, location: e.target.value })} />
        <TextInput placeholder="Широта" style={{ margin: '0 16px 10px 0', flexGrow: 1 }} value={newPlace.latitude} onChange={(e) => setNewPlace({ ...newPlace, latitude: e.target.value })} />
        <TextInput placeholder="Долгота" style={{ margin: '0 16px 10px 0', flexGrow: 1 }} value={newPlace.longitude} onChange={(e) => setNewPlace({ ...newPlace, longitude: e.target.value })} />
        <TextInput placeholder="Фото (URL)" style={{ margin: '0 16px 10px 0', flexGrow: 1 }} value={newPlace.imageUrl} onChange={(e) => setNewPlace({ ...newPlace, imageUrl: e.target.value })} />
        <div style={{ margin: '0 16px 10px 0', flexGrow: 1 }}>
          <Select
            options={[
              { value: "1", content: "1" },
              { value: "2", content: "2" },
              { value: "3", content: "3" },
              { value: "4", content: "4" },
              { value: "5", content: "5" },
            ]}
            value={[newPlace.rating]}
            onUpdate={(value) => setNewPlace({ ...newPlace, rating: value[0] })}
          />
        </div>
        <Button view="action" onClick={handleAddPlace}>Добавить</Button>
      </div>

      {/* Таблица достопримечательностей */}
      <Table
        columns={[
          { id: "name", name: "Название" },
          { id: "location", name: "Местоположение" },
          { id: "status", name: "Статус" },
          { id: "actions", name: "Действия" },
        ]}
        data={placesStore.places.map((place) => ({
          ...place,
          actions: (
            <>
              <Button view="flat" size="s" onClick={() => placesStore.toggleStatus(place.id)}>
                {place.status === "В планах" ? "✅ Осмотрена" : "🔄 В планах"}
              </Button>
              <Button view="flat" size="s" onClick={() => placesStore.removePlace(place.id)}>
                ❌ Удалить
              </Button>
            </>
          ),
        }))}
      />

      <Link to="/">
        <Button view="action" className="mt-4">Назад</Button>
      </Link>
    </div>
  );
});

export default Admin;