# 🚂 Guía Completa: Despliegue en Railway

## 📋 Resumen
Este documento explica paso a paso cómo desplegar tu sistema de Registro de Asistencias SENA en Railway para que sea accesible desde internet.

---

## ✅ Pre-requisitos

Antes de empezar, asegúrate de tener:
- ✅ Cuenta de GitHub (con el proyecto ya subido)
- ✅ Git instalado en tu computadora
- ✅ Node.js instalado (versión 16 o superior)
- ✅ El proyecto funcionando localmente

---

## 🎯 PASO 1: Crear cuenta en Railway

1. Ve a **https://railway.app**
2. Click en **"Start a New Project"**
3. Inicia sesión con tu cuenta de **GitHub**
4. Autoriza a Railway para acceder a tus repositorios

---

## 🎯 PASO 2: Crear proyecto desde GitHub

1. En Railway, click en **"Deploy from GitHub repo"**
2. Busca y selecciona tu repositorio: **`edwinraq/registro-asistencias-`**
3. Click en **"Deploy Now"**
4. Railway detectará automáticamente que es un proyecto Node.js y comenzará a construirlo

**⏱️ Espera 1-2 minutos** mientras Railway clona tu código y lo prepara.

---

## 🎯 PASO 3: Agregar Base de Datos MySQL

Tu aplicación necesita una base de datos MySQL para funcionar.

1. En la vista **"Architecture"** de tu proyecto, click en **"+ New"** (botón morado arriba a la derecha)
2. Selecciona **"Database"**
3. Click en **"Add MySQL"**
4. Railway creará automáticamente una base de datos MySQL
5. Verás un nuevo cuadro llamado **"MySQL"** conectado a tu servicio con una flecha

**⏱️ Espera 30 segundos** mientras la base de datos se crea.

---

## 🎯 PASO 4: Configurar Variables de Entorno

Las variables de entorno le dicen a tu aplicación cómo conectarse a la base de datos.

### 4.1 En tu servicio Node.js:

1. Click en el cuadro de tu servicio (el que dice **"registro-asistencia-docentes"**)
2. Ve a la pestaña **"Variables"**
3. Click en **"+ New Variable"**
4. Agrega esta variable:
   - **Nombre:** `DATABASE_URL`
   - **Valor:** `${{MySQL.DATABASE_URL}}`

**⚠️ IMPORTANTE:** Escribe `${{MySQL.DATABASE_URL}}` exactamente así, incluyendo las llaves `{{}}`. Railway lo reemplazará automáticamente con la URL real de tu base de datos.

5. La aplicación se redesplegará automáticamente

---

## 🎯 PASO 5: Obtener URL Pública

Para que tu aplicación sea accesible desde internet:

1. Click en tu servicio **"registro-asistencia-docentes"**
2. Ve a la pestaña **"Settings"**
3. Busca la sección **"Networking"**
4. Click en **"Generate Domain"**
5. Railway te dará una URL como:
   ```
   https://registro-asistencia-docentes-production-8200.up.railway.app
   ```

**🎉 ¡Esta es tu URL pública!** Cópiala y compártela con quien necesites.

---

## 🎯 PASO 6: Verificar que Funciona

1. Abre la URL que Railway te dio
2. Deberías ver la página de inicio de sesión con diseño verde SENA
3. Prueba iniciar sesión con:
   - **Admin:** usuario `admin` / contraseña `1234`
   - **Vigilante:** usuario `vigilante` / contraseña `1234`

Si todo está correcto, verás el dashboard correspondiente.

---

## 🔄 Cómo Actualizar tu Aplicación

Cada vez que hagas cambios en tu código y los subas a GitHub, Railway actualizará automáticamente:

### En tu computadora:

```powershell
# 1. Hacer cambios en tu código
# 2. Guardar archivos
# 3. Subir a GitHub
git add .
git commit -m "Descripción de tus cambios"
git push origin main
```

**⏱️ Espera 1-2 minutos** y Railway desplegará automáticamente los cambios. No necesitas hacer nada más.

---

## 📊 Monitorear tu Aplicación

### Ver Logs (errores o mensajes):
1. Railway → Tu servicio → **"Deployments"**
2. Click en el último deployment
3. Click en **"View logs"**
4. Verás todos los mensajes del servidor

### Ver Variables:
1. Railway → Tu servicio → **"Variables"**
2. Aquí puedes ver/editar las variables de entorno

### Ver Base de Datos:
1. Railway → **"MySQL"** → **"Data"**
2. Puedes ver las tablas y datos
3. Pestaña **"Connect"** tiene las credenciales si necesitas conectarte desde otro lugar

---

## 💰 Costos

Railway ofrece:
- **$5 USD gratis al mes** en tu cuenta nueva
- Tu aplicación pequeña consume aproximadamente **$3-4 USD/mes**
- **El primer mes es gratis**
- Después, puedes agregar una tarjeta de crédito para continuar

---

## 🆘 Solución de Problemas

### ❌ "Application failed to respond"
**Causa:** La aplicación no puede conectarse a la base de datos o hay un error en el código.

**Solución:**
1. Verifica que `DATABASE_URL` esté configurada en Variables
2. Verifica que el valor sea exactamente: `${{MySQL.DATABASE_URL}}`
3. Revisa los logs para ver el error específico

### ❌ "Error al conectar con el servidor" en el login
**Causa:** El frontend está intentando conectarse a localhost en lugar del servidor de Railway.

**Solución:**
- Ya está resuelto: las URLs son relativas (`/api/login` en lugar de `http://localhost:3000/api/login`)
- Si editaste algún archivo HTML y pusiste `localhost`, cámbialo a ruta relativa y sube los cambios

### ❌ No hay usuarios en la base de datos
**Causa:** Las tablas no se crearon automáticamente.

**Solución:**
- El código en `index.js` crea las tablas automáticamente al iniciar
- Revisa los logs, debería decir "✅ Tablas creadas/verificadas"
- Si no aparece, hay un error de conexión a la base de datos

### ❌ La aplicación funciona pero los cambios no se ven
**Causa:** Railway aún no desplegó los últimos cambios de GitHub.

**Solución:**
1. Verifica que hiciste `git push origin main`
2. En Railway → Deployments → verifica que el último commit sea el tuyo
3. Espera a que termine de desplegar (icono verde ✓)
4. Recarga la página con Ctrl+F5 (recarga forzada)

---

## 📁 Estructura del Proyecto

```
registro-asistencias-/
├── config/
│   └── database.js          # Configuración de MySQL
├── database/
│   └── registro_asistencia.sql  # Script SQL de backup
├── public/                  # Frontend (HTML, CSS, JS)
│   ├── assets/
│   │   ├── foto sena.png
│   │   └── edificio.jpg
│   ├── css/
│   │   └── style.css        # Estilos globales SENA
│   ├── iniciosesion.html    # Login principal
│   ├── administrador.html   # Panel admin
│   ├── vigilante.html       # Panel vigilante
│   ├── asistencias.html
│   ├── registros.html
│   ├── creacionperfil.html
│   ├── codigoqr.html
│   └── pantallainstru.html
├── src/
│   ├── controllers/         # Lógica de negocio
│   │   ├── authController.js
│   │   ├── instructoresController.js
│   │   └── asistenciasController.js
│   └── routes/              # Rutas de la API
│       ├── authRoutes.js
│       ├── instructoresRoutes.js
│       └── asistenciasRoutes.js
├── .gitignore               # Archivos ignorados por Git
├── index.js                 # Servidor principal
├── package.json             # Dependencias del proyecto
└── README.md                # Documentación
```

---

## 🔐 Credenciales por Defecto

Las tablas se crean automáticamente con estos usuarios:

| Rol         | Usuario    | Contraseña |
|-------------|------------|------------|
| Admin       | admin      | 1234       |
| Vigilante   | vigilante  | 1234       |

**⚠️ IMPORTANTE:** Cambia estas contraseñas en producción por seguridad.

---

## 🎨 Características Implementadas

✅ Sistema de login con roles (Admin, Vigilante, Instructor)  
✅ Dashboard con avatares de iniciales  
✅ Registro de entrada/salida de instructores  
✅ Gestión de instructores (crear, listar, editar)  
✅ Visualización de asistencias  
✅ Diseño verde con tema SENA  
✅ Botón cerrar sesión en todas las pantallas  
✅ Responsive (se adapta a móviles)  

---

## 📞 Contacto y Soporte

Si tienes problemas:
1. Revisa esta guía completa
2. Verifica los logs en Railway
3. Asegúrate de que todos los pasos se completaron correctamente

---

## 🎓 Resumen Rápido (Checklist)

Para desplegar desde cero en Railway:

- [ ] 1. Crear cuenta en Railway con GitHub
- [ ] 2. Deploy from GitHub repo
- [ ] 3. Agregar base de datos MySQL (+ New → Database → MySQL)
- [ ] 4. Agregar variable `DATABASE_URL` = `${{MySQL.DATABASE_URL}}`
- [ ] 5. Generar dominio público (Settings → Networking → Generate Domain)
- [ ] 6. Abrir URL y probar login con admin/1234
- [ ] 7. ✅ ¡Listo! Tu app está en internet

---

## 🚀 ¡Eso es todo!

Tu aplicación de Registro de Asistencias SENA está ahora desplegada y accesible desde cualquier lugar del mundo. Solo comparte la URL que Railway te dio.

**URL de ejemplo:**  
`https://registro-asistencia-docentes-production-8200.up.railway.app`

**Recuerda:** Cada vez que hagas `git push`, Railway actualizará automáticamente tu aplicación. ¡No necesitas hacer nada más!
