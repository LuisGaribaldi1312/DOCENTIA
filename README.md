# 🎓 DOCENTIA - Portal & PWA de Empleo para Maestros

**DOCENTIA** es una plataforma vertical especializada en la publicación y postulación de vacantes laborales para docentes y profesores, diseñada para escuelas e instituciones de todos los niveles educativos (públicas y privadas).

Cuenta con soporte para **Progressive Web App (PWA)** instalable como aplicación nativa en **Android** y **iOS**.

---

## 🌟 Características Principales

### 🏫 Para Escuelas e Instituciones Educativas (Públicas y Privadas)
* **Publicación Estructurada de Vacantes:**
  * **Nivel Educativo:** Preescolar, Primaria, Secundaria, Bachillerato, Universidad, Posgrado, Educación Especial e Idiomas.
  * **Asignaturas / Materias:** Definición exacta de áreas curriculares (STEAM, Humanidades, Lenguas, etc.).
  * **Régimen de Contratación:**
    * *Planta Permanente / Base Definitiva*
    * *Por Contrato por Tiempo Determinado (Ciclo escolar / Semestre)*
    * *Por Honorarios / Hora Clase*
  * **Duración de la Contratación:** Temporalidad explícita para máxima transparencia.
  * **Remuneración:** Salarios mínimos y máximos por periodicidad (mensual, quincenal, hora clase).
  * **Checklist Documental Obligatorio:** Selección interactiva de los documentos requeridos (Título, Cédula Profesional, CV, Carta de Antecedentes No Penales, Certificaciones TOEFL/CENNI, etc.).
* **Panel ATS Escolar:** Gestión del ciclo de selección de los docentes (Recibida, En Revisión, Convocatoria a Clase Muestra, Entrevista, Aceptado).

### 👨‍🏫 Para Profesores y Docentes
* **Registro Completo:**
  * Correo electrónico, número de teléfono / WhatsApp.
  * Dirección completa y lugar de residencia (Estado, Municipio, Código Postal).
  * Cédula profesional, grado académico máximo y años de experiencia docente.
* **Expediente Digital Docente:**
  * Almacén de documentos digitales (PDFs de títulos, cédulas, antecedentes y certificaciones).
  * Postulación en 1 clic adjuntando automáticamente los documentos que cada escuela solicita.
* **Docente SOS (Bolsa de Interinatos Express):**
  * Alertas inmediatas para cobertura de vacantes urgentes, incapacidades y suplencias en menos de 48 horas.
* **Buscador con Filtros Especializados:** Por nivel educativo, cercanía geográfica, régimen de contratación y salario.

---

## 📱 Experiencia PWA (Progressive Web App)
* **Instalable en Android:** Mediante banner automático con integración directa al sistema operativo.
* **Instalable en iOS:** Mediante Safari (*Compartir > Agregar a pantalla de inicio*).
* **Soporte Offline & Caché Rápida:** Mediante Service Workers y Web App Manifest (`manifest.json`).

---

## 🛠️ Tecnologías Utilizadas
* **Frontend:** Next.js 14 (App Router) + React 18 + TypeScript
* **Estilos:** Tailwind CSS con diseño adaptativo mobile-first
* **Iconografía:** Lucide React
* **PWA:** Web App Manifest + Service Worker + Iconos adaptativos
* **Despliegue:** Vercel (CI/CD automático desde GitHub)

---

## 🚀 Despliegue y Ejecución Local

```bash
# 1. Clonar el repositorio
git clone https://github.com/LuisGaribaldi1312/DOCENTIA.git
cd DOCENTIA

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev

# 4. Compilar para producción
npm run build
npm start
```
