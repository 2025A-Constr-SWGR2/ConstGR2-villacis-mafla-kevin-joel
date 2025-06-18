# 🧪 Medidor de Alcohol en la Sangre (BAC)

Este proyecto es una aplicación web sencilla desarrollada en HTML, CSS y JavaScript para calcular el nivel estimado de alcohol en sangre (BAC) usando la fórmula de Widmark.

---

## 🎯 Objetivo del ejercicio

Desarrollar un aplicativo pequeño aplicando **principios de Clean Code en JavaScript**, según las buenas prácticas documentadas en el repositorio:  
🔗 [https://github.com/andersontr15/clean-code-javascript-es](https://github.com/andersontr15/clean-code-javascript-es)

---

## 🧠 Conceptos de Clean Code aplicados

| Concepto aplicable según Clean Code JS                      | Archivo       | Cómo se aplicó concretamente                                                                 |
|-------------------------------------------------------------|---------------|---------------------------------------------------------------------------------------------|
| **Nombres significativos**                                  | `script.js`   | Variables como `pesoKg`, `sexo`, `gramosAlcohol`, `bac` y funciones como `calcularBAC()`    |
| **Funciones pequeñas**                                      | `script.js`   | Cada función hace una única cosa (`calcularBAC`, `mostrarResultado`)                        |
| **Evitar valores mágicos**                                  | `script.js`   | Se define un objeto `GENDER_RATIOS` para los coeficientes de distribución por sexo          |
| **Separación de responsabilidades (SRP)**                   | `script.js`   | El cálculo del BAC no modifica directamente el DOM                                          |
| **Evitar comentarios innecesarios (código autoexplicativo)**| `script.js`   | El uso de nombres claros eliminó la necesidad de comentarios explicativos                   |
| **Evitar efectos secundarios inesperados**                  | `script.js`   | Las funciones no cambian valores fuera de su contexto, siguen el principio de pureza        |
| **Código limpio y consistente**                             | `style.css`   | Clases bien nombradas (`form-group`, `container`), uso consistente de márgenes y espaciado  |
| **Separación de estructura y estilo**                       | `index.html`, `style.css` | El HTML contiene solo estructura; los estilos están en un archivo separado                  |

---

## 🧪 Cómo probar el proyecto

1. Instala el servidor local si no lo tienes:
   ```bash
   npm install -g http-server
