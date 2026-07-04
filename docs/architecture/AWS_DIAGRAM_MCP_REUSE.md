# AWS Diagram MCP

Este repo usa el wrapper global `aws-diagram-mcp-generate` para generar diagramas con `awslabs.aws-diagram-mcp-server` desde cualquier sesion o repo.

El wrapper esta instalado en `/home/luizplayero/.local/bin/aws-diagram-mcp-generate` y resuelve salidas relativas contra el directorio actual.

Regenerar los diagramas de Casa Lucho:

```bash
aws-diagram-mcp-generate docs/architecture/casa_lucho_aws_diagram_mcp_basic.py docs/images/ARQUITECTURA_INFRAESTRUCTURA_AWS_CASA_LUCHO_MCP_BASIC
aws-diagram-mcp-generate docs/architecture/casa_lucho_aws_diagram_mcp_detailed.py docs/images/ARQUITECTURA_INFRAESTRUCTURA_AWS_CASA_LUCHO_MCP_DETAILED
```

Guia global reutilizable:

```bash
/home/luizplayero/.config/opencode/AWS_DIAGRAM_MCP_REUSE.md
```
