import { observer } from "mobx-react-lite";
import { Table, Button, TextInput, Select, TextArea } from "@gravity-ui/uikit";
import { useState, useEffect } from "react";
import placesStore, { Place } from "../store/placesStore";
import { Link } from "react-router-dom";

const Admin = observer(() => {
  const [formState, setFormState] = useState({
    name: "",
    description: "",
    imageUrl: "",
    location: "",
    latitude: "",
    longitude: "",
    rating: "3",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [editingPlace, setEditingPlace] = useState<Place | null>(null);

  // Валидация формы
  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formState.name.trim()) newErrors.name = "Название обязательно";
    if (!formState.location.trim()) newErrors.location = "Местоположение обязательно";
    if (!formState.latitude.trim() || isNaN(Number(formState.latitude))) newErrors.latitude = "Широта должна быть числом";
    if (!formState.longitude.trim() || isNaN(Number(formState.longitude))) newErrors.longitude = "Долгота должна быть числом";
    if (!formState.rating || isNaN(Number(formState.rating))) newErrors.rating = "Рейтинг должен быть числом";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (editingPlace) {
      setFormState({
        name: editingPlace.name,
        description: editingPlace.description,
        imageUrl: editingPlace.imageUrl,
        location: editingPlace.location,
        latitude: editingPlace.latitude.toString(),
        longitude: editingPlace.longitude.toString(),
        rating: editingPlace.rating.toString(),
      });
    } else {
      setFormState({
        name: "",
        description: "",
        imageUrl: "",
        location: "",
        latitude: "",
        longitude: "",
        rating: "3",
      });
    }
    setErrors({});
  }, [editingPlace]);

  const handleSubmitPlace = () => {
    if (!validate()) return;

    const baseData = {
      name: formState.name.trim(),
      description: formState.description.trim(),
      imageUrl: formState.imageUrl.trim(),
      location: formState.location.trim(),
      latitude: parseFloat(formState.latitude),
      longitude: parseFloat(formState.longitude),
      rating: Number(formState.rating),
    };

    if (editingPlace) {
      placesStore.editPlace({ ...editingPlace, ...baseData });
      setEditingPlace(null);
    } else {
      placesStore.addPlace(baseData);
    }

    setFormState({
      name: "",
      description: "",
      imageUrl: "",
      location: "",
      latitude: "",
      longitude: "",
      rating: "3",
    });
    setErrors({});
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-20">Режим администратора</h1>

      {/* Форма добавления или редактирования */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <TextInput
            placeholder="Название"
            value={formState.name}
            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
            style={{ marginBottom: "10px" }}
          />
          {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
        </div>

        <div>
          <TextArea
            placeholder="Местоположение"
            value={formState.location}
            onChange={(e) => setFormState({ ...formState, location: e.target.value })}
            style={{ marginBottom: "10px" }}
          />
          {errors.location && <div className="text-red-500 text-sm">{errors.location}</div>}
        </div>

        <div>
          <TextInput
            placeholder="Широта"
            value={formState.latitude}
            onChange={(e) => setFormState({ ...formState, latitude: e.target.value })}
            style={{ marginBottom: "10px" }}
          />
          {errors.latitude && <div className="text-red-500 text-sm">{errors.latitude}</div>}
        </div>

        <div>
          <TextInput
            placeholder="Долгота"
            value={formState.longitude}
            onChange={(e) => setFormState({ ...formState, longitude: e.target.value })}
            style={{ marginBottom: "10px" }}
          />
          {errors.longitude && <div className="text-red-500 text-sm">{errors.longitude}</div>}
        </div>

        <TextInput
          placeholder="Фото (URL)"
          value={formState.imageUrl}
          onChange={(e) => setFormState({ ...formState, imageUrl: e.target.value })}
          style={{ marginBottom: "10px" }}
        />

        <TextInput
          placeholder="Описание"
          value={formState.description}
          onChange={(e) => setFormState({ ...formState, description: e.target.value })}
          style={{ marginBottom: "10px" }}
        />

        <div style={{ marginBottom: "10px" }}> 
          <Select
            options={[
              { value: "1", content: "1" },
              { value: "2", content: "2" },
              { value: "3", content: "3" },
              { value: "4", content: "4" },
              { value: "5", content: "5" },
            ]}
            value={[formState.rating]}
            onUpdate={(value) => setFormState({ ...formState, rating: value[0] })}
          />
          {errors.rating && <div className="text-red-500 text-sm">{errors.rating}</div>}
        </div>

        <div className="flex items-end gap-2" style={{ margin: "20px 0" }}>
          <Button view="action" onClick={handleSubmitPlace}>
            {editingPlace ? "💾 Сохранить изменения" : "➕ Добавить"}
          </Button>
          {editingPlace && (
            <Button view="normal" onClick={() => setEditingPlace(null)} style={{ marginLeft: "10px" }}>
              ✖️ Отмена
            </Button>
          )}
        </div>
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
            <div className="flex gap-2">
              <Button view="flat" size="s" onClick={() => placesStore.toggleStatus(place.id)}>
                {place.status === "В планах" ? "✅ Осмотрена" : "🔄 В планах"}
              </Button>
              <Button
                view="flat"
                size="s"
                onClick={() => {
                  if (window.confirm("Вы уверены, что хотите удалить эту достопримечательность?")) {
                    placesStore.removePlace(place.id);
                  }
                }}
              >
                ❌ Удалить
              </Button>
              <Button view="flat-secondary" size="s" onClick={() => setEditingPlace(place)}>
                ✏️ Редактировать
              </Button>
            </div>
          ),
        }))}
      />

      <Link to="/">
        <Button view="action" className="mt-4" style={{ margin: "10px 0" }}>
          Назад
        </Button>
      </Link>
    </div>
  );
});

export default Admin;
