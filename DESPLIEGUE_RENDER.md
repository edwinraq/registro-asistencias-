# 🚀 Guía de Despliegue en Render - Registro Asistencia Docentes

## ❌ Problema Actual
El deploy falló porque Render necesita una **base de datos MySQL en la nube**. Tu proyecto usa MySQL pero solo está configurado para localhost.

---

## ✅ SOLUCIÓN: Usar Railway (MÁS FÁCIL que Render)

Railway permite desplegar Node.js + MySQL juntos automáticamente.

### 📋 PASO A PASO - RAILWAY

#### 1️⃣ Crear cuenta en Railway
- Ve a: **https://railway.app**
- Haz clic en **"Start a New Project"**
- Inicia sesión con tu cuenta de GitHub

#### 2️⃣ Crear nuevo proyecto
- Click en **"Deploy from GitHub repo"**
- Selecciona tu repositorio: **`edwinraq/registro-asistencias-`**
- Railway detectará automáticamente que es un proyecto Node.js

#### 3️⃣ Agregar MySQL al proyecto
- En tu proyecto de Railway, haz clic en **"+ New"**
- Selecciona **"Database"** → **"Add MySQL"**
- Railway creará automáticamente la base de datos

#### 4️⃣ Conectar la base de datos
Railway te dará estas variables automáticamente:
```
MYSQLHOST=containers-us-west-123.railway.app
MYSQLPORT=6789
MYSQLUSER=root
MYSQLPASSWORD=abc123xyz
MYSQLDATABASE=railway
```

#### 5️⃣ Configurar variables de entorno en tu servicio
- Haz clic en tu servicio Node.js
- Ve a **"Variables"**
- Agrega estas variables (Railway las detecta automáticamente de MySQL):
  ```
  DB_HOST=${{MySQL.MYSQLHOST}}
  DB_PORT=${{MySQL.MYSQLPORT}}
  DB_USER=${{MySQL.MYSQLUSER}}
  DB_PASSWORD=${{MySQL.MYSQLPASSWORD}}
  DB_NAME=${{MySQL.MYSQLDATABASE}}
  PORT=3000
  NODE_ENV=production
  ```

#### 6️⃣ Importar la base de datos
**Opción A - Desde Railway CLI:**
```bash
# Instalar Railway CLI
npm i -g @railway/cli

# Login
railway login

# Conectar al proyecto
railway link

# Importar SQL
railway run mysql -u root -p$MYSQLPASSWORD -h $MYSQLHOST -P $MYSQLPORT $MYSQLDATABASE < database/registro_asistencia.sql
```

**Opción B - MySQL Workbench (MÁS FÁCIL):**
1. Abre MySQL Workbench
2. Crea nueva conexión:
   - **Hostname:** El valor de `MYSQLHOST` de Railway
   - **Port:** El valor de `MYSQLPORT`
   - **Username:** `root`
   - **Password:** El valor de `MYSQLPASSWORD`
3. Conecta y ejecuta el script `database/registro_asistencia.sql`

#### 7️⃣ Deploy automático
- Railway desplegará automáticamente
- Te dará una URL pública como: `https://registro-asistencias-production.up.railway.app`

#### 8️⃣ Probar tu aplicación
- Abre la URL que te dio Railway
- Deberías ver tu página de inicio de sesión
- Credenciales:
  - Admin: `admin` / `1234`
  - Vigilante: `vigilante` / `1234`

---

## 🔧 ALTERNATIVA: Arreglar Render (MÁS COMPLICADO)

Si prefieres usar Render, necesitas:

### Paso 1: Crear base de datos MySQL externa
Opciones gratuitas:
- **FreeSQLDatabase.com** (MySQL gratis)
- **Aiven.io** (30 días gratis)
- **PlanetScale** (hobby plan gratis)

### Paso 2: Modificar tu código
Actualizar `config/database.js` para usar variables de entorno:

```javascript
const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'registro_asistencia',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool.promise();
```

### Paso 3: Configurar variables en Render
En tu Web Service de Render:
- Ve a **"Environment"**
- Agrega:
  ```
  DB_HOST=tu-host-mysql.com
  DB_PORT=3306
  DB_USER=tu_usuario
  DB_PASSWORD=tu_password
  DB_NAME=registro_asistencia
  PORT=3000
  ```

### Paso 4: Eliminar render.yaml
Render no necesita este archivo si configuras manualmente.

---

## ⚡ RECOMENDACIÓN FINAL

**USA RAILWAY** → Es más fácil porque:
- ✅ MySQL incluido gratis
- ✅ Deploy automático
- ✅ No necesitas configurar nada complejo
- ✅ Todo en una sola plataforma

**Render es mejor SI:**
- Ya tienes una base de datos MySQL en otro lugar
- Quieres más control sobre la configuración

---

## 🆘 Solución de Problemas

### Error: "Cannot connect to database"
- Verifica que las variables de entorno estén correctas
- Asegúrate de haber importado el SQL
- Revisa que el firewall de la BD permita conexiones externas

### Error: "Application failed to respond"
- Verifica que `PORT` esté en las variables de entorno
- Asegúrate de que `index.js` use `process.env.PORT`

### La página carga pero no hay usuarios
- No has importado el archivo SQL a la base de datos
- Ejecuta `database/registro_asistencia.sql` en tu BD

---

## 📞 Siguiente Paso

**¿Qué prefieres?**
1. ⭐ **Railway** (recomendado) - Más fácil, todo incluido
2. 🔧 **Render** - Necesitas crear BD externa primero

Dime cuál eliges y te guío paso a paso.
