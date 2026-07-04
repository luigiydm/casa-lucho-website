# Source code passed to awslabs.aws-diagram-mcp-server generate_diagram.
# The MCP runtime preloads Diagram, Cluster, Edge and icon classes.
with Diagram("Casa Lucho - AWS + Cloudflare Static Web Hosting Detallado", show=False, direction="LR", graph_attr={"fontsize": "20", "splines": "spline", "pad": "0.35", "nodesep": "0.55", "ranksep": "0.85"}):
    visitantes = Users("Visitantes\nhttps://casa-lucho.com")

    cf = Cloudflare("Cloudflare\nDNS + CDN + SSL/TLS\nCache + DDoS/security")

    with Cluster("AWS Cloud - us-east-1"):
        assets = S3("Static assets\nindex.html\nCSS / JS / imagenes")
        s3 = SimpleStorageServiceS3BucketWithObjects("S3 Bucket\ncasa-lucho.com\nWebsite hosting")
        policy = IAMPermissions("Bucket Policy\nAllowCloudflareOnly\ns3:GetObject")
        allow = IAMPermissions("Allow\nSourceIp Cloudflare")
        deny = IAMPermissions("Deny\nDirect S3 = 403")
        assets >> Edge(label="objetos") >> s3 >> Edge(label="valida") >> policy
        allow >> policy
        deny >> policy

    source = Blank("website_temp/\nHTML/CSS/JS")
    terraform = CommandLineInterface("Terraform IaC\nS3 + website config\npolicy")
    awscli = CommandLineInterface("AWS CLI\ns3 sync --delete")
    metricas = Blank("GTM + GA4\nLighthouse 98/100\nLCP 1.4s\nCosto minimo")

    visitantes >> Edge(label="HTTPS") >> cf >> Edge(label="cache MISS -> origin") >> s3
    cf >> Edge(color="#f97316", label="Source IP Cloudflare") >> allow
    visitantes >> Edge(color="#dc2626", style="dashed", label="direct origin blocked") >> deny
    source >> terraform >> awscli >> Edge(color="#2563eb", label="deploy") >> s3
    terraform >> Edge(label="terraform apply") >> policy
    cf >> Edge(style="dotted", label="tracking / performance") >> metricas
