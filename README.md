# proyecto-app - Version B

Proyecto Node.js mínimo usado como caso práctico para el ejercicio de la
**Semana 2** del curso *Despliegue de Aplicaciones*. Sirve para poner en
práctica, sobre código real, todo lo visto en clase: Git Flow, Pull
Requests, resolución de conflictos, versionado semántico y releases — y
además da un adelanto de la Unidad III (CI/CD) automatizando ese último
paso con **GitHub Actions**.

## Requisitos

- Node.js 18 o superior
- Una cuenta de GitHub y un repositorio remoto vacío

## Estructura

```
proyecto-app/
├─ src/
│  └─ greet.js              # lógica de la aplicación
├─ bin/
│  └─ cli.js                # punto de entrada ejecutable
├─ test/
│  └─ greet.test.js         # pruebas unitarias (node:test)
├─ .github/
│  └─ workflows/
│     ├─ ci.yml             # pruebas en cada push / Pull Request
│     └─ release.yml        # release automática al publicar un tag
├─ package.json
├─ CHANGELOG.md
└─ README.md
```

## Uso local

```bash
npm install
npm start -- "Luis"     # ejecuta la CLI
npm test                # corre las pruebas
```

## Flujo de trabajo (resumen de los pasos 1-6 de la Semana 2)

1. **Inicializar el repositorio**: crear `main` y `develop`, subir este
   proyecto como commit inicial.
2. **Desarrollar en paralelo**: cada integrante trabaja una función
   pequeña en su propia rama `feature/*` (por ejemplo, agregar un
   parámetro nuevo a `greet`, o un segundo comando en la CLI).
3. **Integrar con Pull Request**: cada `feature/*` se fusiona a
   `develop` mediante un PR revisado por otro integrante.
4. **Resolver un conflicto**: si dos `feature/*` tocan el mismo
   archivo (por ejemplo `src/greet.js`), se resuelve el conflicto en
   equipo antes de continuar.
5. **Preparar una release**: crear `release/1.0.0` desde `develop` y
   fusionarla a `main` y `develop`.
6. **Etiquetar y liberar**: en vez de `git tag` manual, aquí se usa
   `npm version` (ver siguiente sección), que automatiza el commit, el
   tag y además dispara la release por GitHub Actions.

## Automatización con GitHub Actions

Este proyecto incluye dos workflows:

- **`ci.yml`** — corre `npm test` en cada `push` y en cada Pull Request
  hacia `develop` o `main`. Es el control de calidad antes de fusionar
  (igual que revisar manualmente, pero automático y obligatorio).
- **`release.yml`** — se activa solo cuando se publica un tag con
  forma `vX.Y.Z`. Vuelve a correr las pruebas y, si pasan, empaqueta el
  proyecto y crea automáticamente una **Release** en GitHub con notas
  de cambios generadas a partir de los Pull Requests fusionados.

### Cómo disparar una release

```bash
git checkout main
git pull origin main

# npm version actualiza package.json, crea el commit "0.1.0 -> 1.0.0"
# y el tag v1.0.0 en un solo paso (alternativa a git tag -a manual)
npm version 1.0.0 -m "release: v%s"

# sube el commit y el tag juntos
git push --follow-tags
```

A partir de ahí no se hace nada más a mano: en la pestaña **Actions**
del repositorio aparecerá el workflow **Release** ejecutándose, y al
terminar (uno o dos minutos), la nueva versión aparece publicada en la
pestaña **Releases** del repositorio, con el `.tgz` del paquete
adjunto y el changelog generado automáticamente.

## Extensiones sugeridas (para ir más allá)

- Publicar también el paquete en el registro de **npm** con
  `npm publish`, agregando el token como secreto `NPM_TOKEN`.
- Agregar un paso de **lint** (ESLint) o de **cobertura de pruebas**
  al workflow `ci.yml`, tal como se vería en la Unidad II del curso.
- Adaptar `release.yml` para desplegar automáticamente a un servicio
  (Render, Railway, un VPS) después de crear la Release.
