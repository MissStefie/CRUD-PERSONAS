export const DEPARTMENTS = {
  1: "Asunción",
  2: "Alto Paraná",
  3: "Amambay",
  4: "Boquerón",
  5: "Caaguazú",
  6: "Caazapá",
  7: "Central",
  8: "Concepción",
  9: "Cordillera",
  10: "Guairá",
  11: "Itapúa",
  12: "Misiones",
  13: "Paraguarí",
  14: "Pte. Hayes",
  15: "San Pedro",
  16: "Alto Paraguay",
  17: "Ñeembucú",
};

export const CITIES = {
  //Asunción
  1: "Asunción",
  //Alto Paraná
  2: "Ciudad del Este",
  3: "Hernandarias",
  4: "Minga Guazú",
  5: "Presidente Franco",
  6: "Salto del Guairá",
  //Amambay
  7: "Pedro Juan Caballero",
  8: "Capitán Bado",
  //Boquerón
  9: "Filadelfia",
  10: "Loma Plata",
  //Caaguazú
  11: "Caaguazú",
  12: "Coronel Oviedo",
  //Caazapá
  13: "Caazapá",
  14: "Yuty",
  15: "Ñumí",
  //Central
  16: "Luque",
  17: "San Lorenzo",
  18: "Capiatá",
  19: "Fernando de la Mora",
  20: "Villa Elisa",
  //Concepción
  21: "Concepción",
  22: "San Carlos del Apa",
  //Cordillera
  23: "Altos",
  24: "Atyrá",
  25: "Yaguarón",
  //Guairá
  26: "Villarrica",
  27: "Paraguarí",
  //Itapúa
  28: "Encarnación",
  29: "José Leandro Oviedo",
  //Misiones
  30: "San Ignacio",
  31: "Ayolas",
  //Paraguarí
  32: "Paraguarí",
  33: "Carapeguá",
  //Presidente Hayes
  34: "Villa Hayes",
  35: "Concepción",
  //San Pedro
  36: "San Pedro",
  37: "General Aquino",
  //Alto Paraguay
  38: "Fuerte Olimpo",
  //Ñeembucú
  39: "Pilar",
};

export function getDepartmentName(departmentId) {
  return DEPARTMENTS[departmentId] || "Desconocido";
}

export function getCityName(cityId) {
  return CITIES[cityId] || "Desconocido";
}
