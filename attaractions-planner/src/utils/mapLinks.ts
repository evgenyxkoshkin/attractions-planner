export const generateMapLinks = (latitude: number, longitude: number) => {
    const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    const yandexMapsLink = `https://yandex.ru/maps/?ll=${longitude}%2C${latitude}&z=15`;
  
    return { googleMapsLink, yandexMapsLink };
  };