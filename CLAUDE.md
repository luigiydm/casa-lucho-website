# Casa Lucho - Sitio Web

## Proyecto
Sitio web estático (onepage) para Casa Lucho, negocio de pintura de casas en CABA con 30+ años de experiencia. Hosteado en Cloudflare Pages (proyecto `casa-lucho`, conectado a este repo).

## Estructura
- `website_temp/` — Carpeta de trabajo con el sitio actual (esta es la que se deploya)
- `website/` — Vacía (no usar)
- `terraform/` — IaC del hosting S3 anterior (histórico; los buckets ya no existen)
- `docs/` — Imágenes de documentación

## Stack
- HTML/CSS/JS vanilla con Bootstrap 5, AOS, GLightbox, Swiper
- Cloudflare Pages: proyecto `casa-lucho`, production branch `master`, output dir `website_temp`
- Dominios: casa-lucho.com y www (CNAME → `casa-lucho.pages.dev`, proxied)
- Google Tag Manager: `GTM-NV3NRXHN`
- Google Analytics 4: `G-K264K144GQ`

## Deploy
```bash
git push origin master
```
Cloudflare Pages buildea y publica solo (sin build command, sirve `website_temp/` tal cual). No hace falta purgar cache.

### Hosting anterior (hasta 2026-07-04)
AWS S3 (`s3://casa-lucho.com`) + bucket policy con IPs de Cloudflare. **Los buckets `casa-lucho.com` y `logs-casa-lucho` fueron eliminados el 2026-07-04**; el backup del sitio es este repo. NO deployar con `aws s3 sync`.

## Contacto del negocio
- WhatsApp: 5491144052868
- Instagram: https://www.instagram.com/casaluchopintura
- Zona: Caballito, CABA
