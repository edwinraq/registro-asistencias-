# 🚂 Despliegue en Railway - Paso a Paso

## 1️⃣ Crear cuenta (2 minutos)
1. Ve a: **https://railway.app**
2. Click en **"Start a New Project"**
3. Inicia sesión con GitHub
4. Autoriza el acceso a tus repositorios

---

## 2️⃣ Crear proyecto desde GitHub (1 minuto)
1. En Railway, click en **"Deploy from GitHub repo"**
2. Busca y selecciona: **`edwinraq/registro-asistencias-`**
3. Click en **"Deploy Now"**
4. Railway empezará a desplegar automáticamente

---

## 3️⃣ Agregar MySQL (30 segundos)
1. En la vista de tu proyecto, click en **"+ New"** (arriba a la derecha)
2. Selecciona **"Database"**
3. Click en **"Add MySQL"**
4. Railway creará la base de datos automáticamente

---

## 4️⃣ Configurar variables de entorno (2 minutos)

### En tu servicio Node.js:
1. Click en el servicio **"registro-asistencias-"**
2. Ve a la pestaña **"Variables"**
3. Click en **"+ New Variable"** y agrega estas **una por una**:

```
DB_HOST=${{MySQL.MYSQLHOST}}
DB_PORT=${{MySQL.MYSQLPORT}}
DB_USER=${{MySQL.MYSQLUSER}}
DB_PASSWORD=${{MySQL.MYSQLPASSWORD}}
DB_NAME=${{MySQL.MYSQLDATABASE}}
PORT=3000
NODE_ENV=production
```

**IMPORTANTE:** Railway autocompleta las variables de MySQL con `${{MySQL.VARIABLE}}` - úsalas tal cual.

4. Click en **"Deploy"** para reiniciar con las nuevas variables

---

## 5️⃣ Importar la base de datos (3 minutos)

### Opción A - MySQL Workbench (MÁS FÁCIL):

1. En Railway, click en tu base de datos **MySQL**
2. Ve a **"Connect"** y copia las credenciales:
   - **Host**: `containers-us-west-xxx.railway.app`
   - **Port**: `6543` (ejemplo)
   - **User**: `root`
   - **Password**: `abc123xyz` (ejemplo)
   - **Database**: `railway`

3. Abre **MySQL Workbench**
4. Click en **"+"** para nueva conexión
5. Configura:
   - **Connection Name**: Railway - Asistencias
   - **Hostname**: (pega el host de Railway)
   - **Port**: (pega el puerto)
   - **Username**: `root`
   - **Password**: Click en "Store in Keychain" y pega la password

6. Click en **"Test Connection"** → debe decir "Successfully made the MySQL connection"
7. Click en **"OK"**
8. Abre la conexión
9. Ve a **File → Open SQL Script**
10. Selecciona: `C:\Users\user\Desktop\proyectoaleja\database\registro_asistencia.sql`
11. Click en el ⚡ rayo para ejecutar
12. Verifica que se crearon las tablas y datos

### Opción B - Desde Railway CLI:
```powershell
# Instalar Railway CLI
npm i -g @railway/cli

# Login
railway login

# Vincular proyecto
railway link

# Importar SQL (ajusta las credenciales)
railway run -- mysql -h $MYSQLHOST -P $MYSQLPORT -u root -p$MYSQLPASSWORD $MYSQLDATABASE < database/registro_asistencia.sql
```

---

## 6️⃣ Obtener URL pública (10 segundos)
1. En Railway, click en tu servicio Node.js
2. Ve a **"Settings"**
3. Busca **"Networking"** → **"Generate Domain"**
4. Railway te dará una URL como: `https://registro-asistencias-production.up.railway.app`

---

## 7️⃣ Probar tu aplicación (1 minuto)
1. Abre la URL que te dio Railway
2. Deberías ver la página de inicio de sesión con diseño SENA verde
3. Prueba las credenciales:
   - **Admin**: usuario `admin` / contraseña `1234`
   - **Vigilante**: usuario `vigilante` / contraseña `1234`

---

## ✅ CHECKLIST FINAL

- [ ] Proyecto desplegado en Railway
- [ ] Base de datos MySQL creada
- [ ] Variables de entorno configuradas (7 variables)
- [ ] SQL importado con éxito
- [ ] URL pública generada
- [ ] Login funciona con admin/1234
- [ ] Dashboard muestra instructores

---

## 🆘 Solución de Problemas

### Error: "Application failed to respond"
**Causa**: Variables de entorno no configuradas correctamente
**Solución**: 
1. Ve a Variables en Railway
2. Verifica que todas las 7 variables estén ahí
3. Asegúrate de usar `${{MySQL.VARIABLE}}` exactamente
4. Redeploy

### Error: "Cannot connect to database"
**Causa**: Base de datos no tiene las tablas
**Solución**: Importa el SQL usando MySQL Workbench (Paso 5)

### La página muestra pero no hay usuarios
**Causa**: SQL no se importó correctamente
**Solución**: 
1. Conéctate con MySQL Workbench
2. Ejecuta: `SELECT * FROM usuarios;`
3. Si está vacío, vuelve a importar el SQL

### Variables de entorno no aparecen
**Causa**: No vinculaste correctamente MySQL con Node.js
**Solución**:
1. Verifica que MySQL y tu servicio estén en el MISMO proyecto
2. Usa la sintaxis `${{MySQL.VARIABLE}}`
3. Railway las conectará automáticamente

---

## 📱 Compartir tu aplicación

Una vez desplegado, solo comparte la URL:
```
https://tu-proyecto.up.railway.app
```

Cualquier persona con esa URL podrá acceder desde cualquier navegador, celular o computadora.

---

## 💰 Costos

Railway ofrece:
- **$5 USD de crédito gratis al mes**
- Tu proyecto pequeño consume ~$3-4 USD/mes
- **Primer mes gratis** con la cuenta nueva

---

**¿Listo para empezar? Ve a https://railway.app y sigue el Paso 1**
