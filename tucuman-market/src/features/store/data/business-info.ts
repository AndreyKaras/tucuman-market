export const businessInfo = {
  address: "Av. Ejemplo 1234, San Miguel de Tucumán, Tucumán",
  contact: {
    email: {
      display: "hola@tucumanmarket.example",
      href: "mailto:hola@tucumanmarket.example",
    },
    instagram: {
      display: "@tucumanmarket.demo",
      href: "https://www.instagram.com/tucumanmarket.demo",
    },
    phone: {
      display: "+54 381 000-0000",
      href: "tel:+543810000000",
    },
    whatsapp: {
      display: "+54 9 381 000-0000",
      href: "https://wa.me/5493810000000",
    },
  },
  hours: [
    { key: "weekdays", value: "09:00–13:00 / 17:00–21:00" },
    { key: "saturday", value: "09:00–14:00" },
    { key: "sundayHolidays", value: null },
  ],
  name: "Tucumán Market",
  pickupPreparation: "30–60 min",
} as const;
