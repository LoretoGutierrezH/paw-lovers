export const formattingDate = (doc) => {
  console.log("Leyendo timestamp", doc.data());
  const formattedDate = doc.data().timestamp.toDate().toString();
  const splitDate = formattedDate.split(" ");
  // console.log(splitDate[1], splitDate[2], splitDate[3], splitDate[4]);
  let month;
  switch (splitDate[1]) {
    case 'Jan':
      month = "Enero";
      break;
    case 'Feb':
      month = "Febrero";
      break;
    case 'Mar':
      month = "Marzo";
      break;
    case 'Apr':
      month = "Abril";
      break;
    case 'May':
      month = "Mayo";
      break;
    case 'Jun':
      month = "Junio";
      break;
    case 'Jul':
      month = "Julio";
      break;
    case 'Aug':
      month = "Agosto";
      break;
    case 'Sep':
      month = "Septiembre";
      break;
    case 'Oct':
      month = "Octubre";
      break;
    case 'Nov':
      month = "Noviembre";
      break;
    case 'Dec':
      month = "Dicimebre";
      break;
    default:
      month = "Mes";
  }
  return `${splitDate[2]} de ${month} del ${splitDate[3]} a las ${splitDate[4]}`;
};
