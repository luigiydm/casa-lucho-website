# Source code passed to awslabs.aws-diagram-mcp-server generate_diagram.
# The MCP runtime preloads Diagram, Cluster, Edge and icon classes.
with Diagram("Casa Lucho - Hosting web optimizado con AWS y Cloudflare", show=False, direction="LR", graph_attr={"fontsize": "20", "splines": "spline", "pad": "0.4", "nodesep": "0.65", "ranksep": "0.9"}):
    visitantes = Users("Visitantes\nDesktop / mobile")
    cloudflare = Cloudflare("Cloudflare\nDNS + CDN + SSL/TLS")

    with Cluster("AWS Cloud - us-east-1"):
        s3 = SimpleStorageServiceS3BucketWithObjects("S3 Bucket\ncasa-lucho.com\nStatic website hosting")
        policy = IAMPermissions("Bucket Policy\nAllowCloudflareOnly\nSource IP ranges")
        content = S3("Contenido estatico\nindex.html + assets\nimagenes optimizadas")

    deploy = CommandLineInterface("Terraform + AWS CLI\naws s3 sync website_temp/\ns3://casa-lucho.com/")
    resultados = Blank("Resultados\nLighthouse 98/100\nLCP 1.4s\nFree tier + Cloudflare free")

    visitantes >> Edge(label="HTTPS") >> cloudflare >> Edge(label="cache miss / origin") >> s3 >> Edge(label="validacion") >> policy
    deploy >> Edge(label="deploy") >> s3
    deploy >> Edge(label="terraform apply") >> policy
    content >> Edge(label="archivos estaticos") >> s3
    visitantes >> Edge(color="red", style="dashed", label="acceso directo S3 => 403") >> policy
    cloudflare >> Edge(style="dotted", label="cache + seguridad") >> resultados
