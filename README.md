
# Challenge de TRD

Este proyecto es una pequeña prueba técnica realizada para el **challenge de TRD**. En él se utilizan tecnologías como **Next.js** para el desarrollo del frontend, **Supabase** para la gestión de la base de datos y la autenticación, **Amazon S3** para el almacenamiento de archivos, y la **Open Meteo API** para obtener datos meteorológicos.

## Tecnologías utilizadas

- **Next.js**: Framework para React que permite el renderizado en el servidor y la generación de páginas estáticas.
- **Supabase**: Plataforma de backend como servicio (BaaS) que proporciona bases de datos, autenticación y almacenamiento.
- **Amazon S3**: Servicio de almacenamiento de objetos para almacenar y recuperar archivos.
- **Open Meteo API**: API para obtener datos meteorológicos gratuitos.
- **React**: Biblioteca de JavaScript para construir interfaces de usuario.
- **Tailwind CSS**: Framework de CSS para diseño rápido y responsivo.

## Requisitos previos

Antes de ejecutar el proyecto, asegúrate de tener los siguientes programas instalados:

- **Node.js** (version 16 o superior)
- **npm** o **yarn** (para gestionar las dependencias)
- Una cuenta en **Supabase** y **Amazon Web Services (AWS)** (para configurar la base de datos y el almacenamiento)

## Instrucciones para ejecutar el proyecto

1. **Clonar el repositorio**

   Primero, clona el repositorio a tu máquina local:

   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git
   cd tu-repositorio
   ```

2. **Instalar las dependencias**

   Instala las dependencias necesarias utilizando npm o yarn:

   ```bash
   npm install
   # o si prefieres usar yarn:
   yarn install
   ```

3. **Configurar variables de entorno**

   Crea un archivo `.env.local` en la raíz del proyecto y agrega las siguientes variables:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=<tu_url_de_supabase>
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<tu_clave_anonima_de_supabase>
   NEXT_PUBLIC_AWS_ACCESS_KEY_ID=<tu_access_key_de_aws>
   NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY=<tu_secret_access_key_de_aws>
   NEXT_PUBLIC_AWS_BUCKET_NAME=<tu_nombre_de_bucket_de_s3>
   OPEN_METEO_API_KEY=<tu_clave_de_api_de_open_meteo>
   ```

   Asegúrate de reemplazar los valores entre `< >` con los detalles correspondientes.

4. **Ejecutar el proyecto en desarrollo**

   Para iniciar el servidor de desarrollo, ejecuta:

   ```bash
   npm run dev
   # o si prefieres usar yarn:
   yarn dev
   ```

   El proyecto estará disponible en [http://localhost:3000](http://localhost:3000).

5. **Desplegar en producción**

   Si deseas desplegar el proyecto en producción, puedes ejecutar:

   ```bash
   npm run build
   npm run start
   # o si prefieres usar yarn:
   yarn build
   yarn start
   ```

## API utilizada

### **Supabase**

Supabase se utiliza para gestionar la base de datos y la autenticación de usuarios. Las credenciales necesarias se configuran en el archivo `.env.local`.

### **Amazon S3**

Amazon S3 se utiliza para almacenar archivos como imágenes. Las credenciales de AWS (access key y secret key) deben ser configuradas también en el archivo `.env.local`.

### **Open Meteo API**

La Open Meteo API se utiliza para obtener datos meteorológicos. Necesitarás una clave API, que puedes obtener en [Open Meteo API](https://open-meteo.com/) y configurarla en el archivo `.env.local`.

## Estructura del proyecto

- `pages/`: Contiene las rutas principales del proyecto.
- `components/`: Contiene los componentes reutilizables del proyecto.
- `lib/`: Contiene las funciones y configuraciones relacionadas con Supabase, S3 y la Open Meteo API.
- `public/`: Archivos estáticos como imágenes y fuentes.
- `styles/`: Archivos CSS (usando Tailwind CSS).

## Contribuciones

Las contribuciones son bienvenidas. Si tienes sugerencias o mejoras, siéntete libre de crear un Pull Request o abrir un Issue en el repositorio.

## Licencia

Este proyecto está bajo la Licencia MIT. Para más detalles, consulta el archivo [LICENSE](LICENSE).
