let graficaTorta;

function calcularGasto() {
  // Obtén los valores de los campos de entrada
  let consumo = parseFloat(document.getElementById("consumo").value);  // Consumo en kWh
  let costo = parseFloat(document.getElementById("costo").value);      // Costo del kWh
  let personas = parseInt(document.getElementById("personas").value); // Número de personas en el hogar

  // Verifica que los valores sean válidos
  if (!isNaN(consumo) && !isNaN(costo) && !isNaN(personas) && personas > 0) {
    let total = consumo * costo; // Calcula el gasto total
    document.getElementById("total").value = total.toFixed(2);

    // Datos para la gráfica
    let gastoPromedioPorPersona = total / personas; // Calcula el gasto promedio por persona
    let consumoTotal = consumo * personas;          // Total del consumo
    let totalCosto = total;                         // Costo total

    // Actualiza la gráfica con los nuevos datos
    actualizarGrafica([consumoTotal, totalCosto, gastoPromedioPorPersona]);
  } else {
    document.getElementById("total").value = "Valores no válidos";
    actualizarGrafica([0, 0, 0]); // Limpia la gráfica si los valores no son válidos
  }
}

function actualizarGrafica(datos) {
  const ctx = document.getElementById("graficoTorta").getContext("2d");

  // Destruir la gráfica previa si ya existe
  if (graficaTorta) {
    graficaTorta.destroy();
  }

  // Crear nueva gráfica
  graficaTorta = new Chart(ctx, {
    type: "pie", // Tipo de gráfica (torta)
    data: {
      labels: ["Consumo Total (kWh)", "Costo Total ($)", "Gasto Promedio por Persona ($)"],
      datasets: [
        {
          data: datos, // Datos que calculamos
          backgroundColor: ["#CDD973", "#43732D", "#6C9A47"], // Colores para cada segmento
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          align: 'center',
          labels: {
            color: '#ffffff',
            font: {
              size: 12,
              family: 'Arial',
              weight: 'bold',
            },
          },
        },
        datalabels: {
          color: '#ffffff',
          font: {
            size: 12,
            family: 'Arial',
            weight: 'bold',
          },
          formatter: (value, ctx) => {
            const total = ctx.chart.data.datasets[0].data.reduce((acc, val) => acc + val, 0);
            const index = ctx.dataIndex;
            if (index === 0) {
              return `${value.toFixed(0)} kWh`;
            } else if (index === 1) {
              return `$${Math.round(value).toLocaleString()}`;
            } else if (index === 2) {
              return `$${Math.round(value).toLocaleString()}`; 
            }
          },
        },
      },
    },
    plugins: [ChartDataLabels] // Asegúrate de que el plugin ChartDataLabels esté incluido
  });
}

let slideIndex = 0;

function moveSlide(direction) {
  const slider = document.querySelector('.slider-container');
  const slides = document.querySelectorAll('.slider-container img');
  const totalSlides = slides.length;

  slideIndex = (slideIndex + direction + totalSlides) % totalSlides;
  slider.style.transform = `translateX(-${slideIndex * 100}%)`;
}