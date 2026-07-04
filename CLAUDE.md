# Casa Lucho - Sitio Web

## Proyecto
Sitio web estático (onepage) para Casa Lucho, negocio de pintura de casas en CABA con 30+ años de experiencia. Hosteado en AWS S3 detrás de Cloudflare CDN.

## Estructura
- `website_temp/` — Carpeta de trabajo con el sitio actual (esta es la que se deploya)
- `website/` — Vacía (no usar)
- `terraform/` — IaC para el bucket S3 y políticas
- `docs/` — Imágenes de documentación

## Stack
- HTML/CSS/JS vanilla con Bootstrap 5, AOS, GLightbox, Swiper
- AWS S3 (bucket: `casa-lucho.com`, profile: `casa-lucho`, region: `us-east-1`)
- Cloudflare (CDN + SSL)
- Google Tag Manager: `GTM-NV3NRXHN`
- Google Analytics 4: `G-K264K144GQ`

## Deploy
```bash
aws s3 sync website_temp/ s3://casa-lucho.com/ --profile casa-lucho --delete
```
Después de cada deploy: **purgear cache en Cloudflare** (Dashboard -> Caching -> Purge Everything).

## Contacto del negocio
- WhatsApp: 5491144052868
- Instagram: https://www.instagram.com/casaluchopintura
- Zona: Caballito, CABA
