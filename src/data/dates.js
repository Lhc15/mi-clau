// ─── Restaurantes para la cita del domingo ───────────────────────────────────

export const restaurants = [
  {
    id: 'sushi-buffet',
    name: 'Sushi Buffet',
    subtitle: 'Alicante Center',
    tag: 'Buffet libre',
    tagColor: 'amber',
    price: '~19 €',
    priceLabel: 'persona (fin de semana)',
    type: 'buffet',
    emoji: '🍣',
    gradient: 'linear-gradient(135deg, #1a1208 0%, #2a1f0e 50%, #1f1810 100%)',
    accentColor: '#c9a96e',
    description:
      'Come todo lo que quieras. Sushi, makis, nigiris, gyozas, temaki... Un festín sin límite en pleno centro comercial. Ideal para ponerse hasta arriba sin remordimientos.',
    vibe: 'Noche relajada · Sin límite · Puro disfrute',
    mapsUrl: 'https://maps.app.goo.gl/bvBEZXEc6jn3cdtC9',
    details: [
      { icon: '🍱', label: 'Buffet libre — todo incluido' },
      { icon: '💰', label: '~19 €/persona · bebida aparte' },
      { icon: '📍', label: 'Alicante Center' },
    ],
  },
  {
    id: 'wayu-luceros',
    name: 'Wayu Luceros',
    subtitle: 'Plaza de Luceros',
    tag: 'Carta',
    tagColor: 'green',
    price: '~25–35 €',
    priceLabel: 'persona con bebida',
    type: 'carta',
    emoji: '🥩',
    gradient: 'linear-gradient(135deg, #0f180f 0%, #162012 50%, #111a11 100%)',
    accentColor: '#7aab7a',
    description:
      'Barbacoa de carne a la brasa en el corazón de Alicante. Cortes seleccionados, fuego lento y ambiente íntimo. Para una noche tranquila con buena carne y buen vino.',
    vibe: 'Cena íntima · Centro de Alicante · Parrilla',
    mapsUrl: 'https://maps.app.goo.gl/MeDyG9ah1FFLsngs8',
    details: [
      { icon: '🔥', label: 'Carne a la brasa · à la carta' },
      { icon: '💰', label: '~25–35 €/persona con bebida' },
      { icon: '📍', label: 'Junto a Plaza de Luceros' },
    ],
  },
  {
    id: 'wayu-puerto',
    name: 'Wayu Puerto',
    subtitle: 'Puerto de Alicante',
    tag: 'Premium',
    tagColor: 'purple',
    price: '~40–60 €',
    priceLabel: 'persona · experiencia completa',
    type: 'premium',
    emoji: '⚓️',
    gradient: 'linear-gradient(135deg, #0d0d1a 0%, #15152a 50%, #101020 100%)',
    accentColor: '#9b8fd4',
    description:
      'La versión de lujo. Carne premium con vistas al puerto deportivo. Para las noches en que nos sentimos chicas pudientes. Ambiente elegante, servicio impecable.',
    vibe: 'Noche de lujo · Vistas al mar · Experiencia',
    mapsUrl: 'https://maps.app.goo.gl/xZyhs2EmqaQwYznA6',
    details: [
      { icon: '✨', label: 'Experiencia premium · carta selecta' },
      { icon: '💰', label: '~40–60 €/persona' },
      { icon: '📍', label: 'Puerto de Alicante' },
    ],
  },
]

// ─── Citas ────────────────────────────────────────────────────────────────────

export const dates = [
  {
    id: 'cena-domingo',
    title: 'Cena del domingo',
    subtitle: '¿A dónde vamos?',
    date: 'Este domingo',
    status: 'open', // open | decided | past
    type: 'restaurant-vote',
    emoji: '🍽',
    description: 'Tengo tres opciones pensadas para nosotras. Elige la que más te apetezca.',
    restaurants,
  },
]
