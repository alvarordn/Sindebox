function getValues() {    

    const x = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
    const y = [0.001, 0.001, 0.001, 0.001, 0.001, 0.009, 0.61, 1.26, 1.88, 2.33, 2.6, 2.7, 2.6, 2.33, 1.88, 1.26, 0.61, 0.009, 0.001, 0.001, 0.001, 0.001, 0.001, 0.001].map(value => (value * 1.5));
    const z = [0.78, 0.76, 0.75, 0.75, 0.78, 0.84, 0.91, 0.95, 0.96, 0.97, 0.97, 0.97, 0.97, 0.95, 0.93, 0.94, 0.95, 0.97, 0.98, 1.00, 1.00, 0.92, 0.84, 0.9].map(value => (value * 2));
    const k = [79.51, 94.85, 91.15, 82, 89.95, 73, 82, 98.2, 74.77, 64.9, 35.69, 35.02, 35.01, 35.01, 35, 35, 35, 35.02, 48.99, 77, 105, 117.41, 116.81, 105.45].map(value => (value / 1000));
    
    const format_to_plot = (x_values, y_values, z_values, k_values) => {
        const data_to_chart = x_values.map((x_value, index) => ({
            Hora: x_value,
            Generación: y_values[index],
            Carga: z_values[index],
            Precio: k_values[index],
        }));        
        return data_to_chart;
    };

    return format_to_plot(x, y, z, k);
}

export default getValues;