import type { PortfolioConfig } from '../types/portfolio';

/**
 * ============================================================================
 * PORTFOLIO CONFIGURATION — LANKA SANYASI PATRUDU
 * ============================================================================
 * Populated directly from the uploaded resume and portrait photograph.
 * Edit any field below to refine framing, add project screenshots, or add
 * genuine testimonials.
 * ============================================================================
 */
export const portfolioConfig: PortfolioConfig = {
  profile: {
    brandName: 'Sanyasi Patrudu',
    brandSubtitle: 'Azure Data Engineer | Gen AI',
    brandMonogram: 'LP',
    firstName: 'Lanka Sanyasi',
    lastName: 'Patrudu',
    availabilityText: 'Available for Data Engineering & Gen AI roles',
    greeting: "Hey there! I'm",
    roles: [
      'Azure Data Engineer',
      'Databricks & PySpark Engineer',
      'Cloud & Gen AI Builder',
    ],
    heroIntro:
      'Azure Data Engineer with 4.7 years of IT experience designing scalable cloud ETL/ELT pipelines, Medallion lakehouses, real-time streaming architectures, and governed analytics platforms across Azure, Databricks, Synapse, Microsoft Fabric, and Snowflake.',
    codeSnippet: {
      name: 'Lanka Sanyasi Patrudu',
      role: 'Azure Data Engineer',
      passion: 'Cloud Data & Gen AI',
    },
    /**
     * HERO PORTRAIT IMAGE SETTINGS
     * Tuned focal point & zoom to frame the face and upper torso cleanly inside
     * the circular DevPort hero portrait without stretching.
     */
    heroPhoto: {
      src: '/assets/aistudio/Sunlit_Portrait_on_a_Modern_Walkway_95a64b14.png',
      alt: 'Portrait of Lanka Sanyasi Patrudu',
      objectPositionX: 57,
      objectPositionY: 26,
      scale: 1.52,
    },
    aboutPhoto: {
      src: '/assets/aistudio/Sunlit_Portrait_on_a_Modern_Walkway_95a64b14.png',
      alt: 'Lanka Sanyasi Patrudu portrait',
      objectPositionX: 56,
      objectPositionY: 22,
      scale: 1.12,
    },
    /**
     * HERO TECHNOLOGY BADGES — Core stack from resume
     */
    heroBadges: [
      { label: 'Azure ADF', variant: 'blue' },
      { label: 'Databricks', variant: 'pink' },
      { label: 'PySpark', variant: 'yellow' },
      { label: 'MS Fabric', variant: 'cyan' },
      { label: 'Python & SQL', variant: 'green' },
      { label: 'Gen AI / RAG', variant: 'purple' },
    ],
    /**
     * FLOATING HERO STATS CARDS — Grounded strictly in resume facts
     */
    heroStats: [
      {
        id: 'projects',
        value: '3',
        label: 'Enterprise Roles',
        accent: 'blue-purple',
      },
      {
        id: 'experience',
        value: '4.7 Yrs',
        label: 'IT Experience',
        accent: 'pink-purple',
      },
    ],
    aboutHeadlineAccent: 'About Me',
    aboutSubtitle:
      'Building reliable, high-performance cloud data platforms that power business intelligence, governance, and enterprise AI readiness.',
    biography: [
      'I am an Azure Data Engineer based in Hyderabad, India with 4.7 years of IT experience architecting and implementing scalable cloud-based data solutions. My core strength spans Azure Data Factory (ADF), Azure Databricks, Azure Synapse Analytics, ADLS Gen2, Microsoft Fabric, Snowflake, Python, SQL, and PySpark for high-throughput batch and real-time ETL/ELT pipelines.',
      'Across enterprise data lakes and warehouses, I design Bronze-Silver-Gold Medallion architectures, Star and Snowflake schemas, Unity Catalog and Microsoft Purview governance, and automated CI/CD workflows with Azure DevOps, Docker, Kubernetes (AKS), and Terraform. I also bring foundational hands-on familiarity with Azure ML and Generative AI concepts including RAG, Embeddings, Vector Search, LangChain, LangGraph, and MCP.',
    ],
    backgroundHighlights: [
      { label: 'Core Specialization', value: 'Azure Data Engineering & Microsoft Fabric' },
      { label: 'Architecture Focus', value: 'Medallion Lakehouse, Batch & Real-Time Streaming' },
      { label: 'DevOps & Governance', value: 'Azure DevOps, AKS, Terraform, Purview & Unity Catalog' },
      { label: 'Emerging Focus', value: 'Generative AI, RAG, Embeddings & Azure ML' },
    ],
    location: 'Hyderabad, India',
    phone: '+91 8121801983',
    email: 'sanyasipatrudulanka@gmail.com',
    resumeUrl: '/assets/aistudio/Lanka_ADE_._dbb23365.pdf',
    resumeFileName: 'Lanka_Sanyasi_Patrudu_Azure_Data_Engineer_Resume.pdf',
  },

  services: [
    {
      id: 'service-etl-lakehouse',
      title: 'Cloud ETL/ELT & Medallion Lakehouses',
      description:
        'Architecting scalable Bronze, Silver, and Gold pipelines using Azure Data Factory, Azure Databricks, ADLS Gen2, PySpark, and Apache Airflow DAGs.',
      icon: 'layers',
      accent: 'blue',
      deliverables: [
        'Parameterized ADF Ingestion',
        'Incremental Loads, CDC & SCD Type 1/2',
        'Spark & SQL Performance Tuning',
      ],
    },
    {
      id: 'service-warehouse-bi',
      title: 'Microsoft Fabric, Synapse & Snowflake',
      description:
        'Designing enterprise data warehouses and Microsoft Fabric Lakehouses with Star and Snowflake schemas ready for Power BI and executive reporting.',
      icon: 'database',
      accent: 'purple',
      deliverables: [
        'Microsoft Fabric & OneLake Integration',
        'Synapse Analytics & Snowflake ELT',
        'Fact & Dimension Data Modeling',
      ],
    },
    {
      id: 'service-streaming-devops',
      title: 'Real-Time Streaming, Governance & CI/CD',
      description:
        'Building high-volume streaming pipelines with Event Hubs and Kafka, secured by Unity Catalog, Purview, RBAC, and automated cloud deployments.',
      icon: 'shield',
      accent: 'pink',
      deliverables: [
        'Event Hubs, Kafka & Stream Analytics',
        'Unity Catalog, Purview & Key Vault',
        'Azure DevOps, Docker, AKS & Terraform',
      ],
    },
  ],

  /**
   * TECHNICAL SKILLS — Directly sourced from resume (no fabricated percentages)
   */
  skills: [
    {
      id: 'skill-adf',
      name: 'Azure Data Factory (ADF)',
      category: 'Azure & Big Data',
      focus: 'Parameterized ETL/ELT orchestration & on-prem/API ingestion',
      icon: 'layers',
      accent: 'blue',
    },
    {
      id: 'skill-databricks',
      name: 'Azure Databricks & Spark',
      category: 'Azure & Big Data',
      focus: 'PySpark notebooks, Medallion layers & cluster optimization',
      icon: 'zap',
      accent: 'pink',
    },
    {
      id: 'skill-fabric',
      name: 'Microsoft Fabric & OneLake',
      category: 'Azure & Big Data',
      focus: 'Data Factory, Lakehouse & Data Warehouse integration',
      icon: 'cpu',
      accent: 'cyan',
    },
    {
      id: 'skill-synapse-adls',
      name: 'Synapse Analytics & ADLS Gen2',
      category: 'Azure & Big Data',
      focus: 'Centralized data lakes, SQL stored procedures & BI datasets',
      icon: 'database',
      accent: 'indigo',
    },
    {
      id: 'skill-streaming',
      name: 'Event Hubs, Kafka & Airflow',
      category: 'Azure & Big Data',
      focus: 'Real-time streaming pipelines & Airflow DAG workflow automation',
      icon: 'globe',
      accent: 'purple',
    },
    {
      id: 'skill-governance',
      name: 'Unity Catalog & MS Purview',
      category: 'Azure & Big Data',
      focus: 'Data lineage, cataloging, RBAC & Azure Key Vault security',
      icon: 'shield',
      accent: 'green',
    },
    {
      id: 'skill-python-pyspark',
      name: 'Python & PySpark',
      category: 'Languages & Databases',
      focus: 'Distributed data cleansing, joins & business-rule pipelines',
      icon: 'code',
      accent: 'yellow',
    },
    {
      id: 'skill-sql-snowflake',
      name: 'SQL, Snowflake & Azure SQL',
      category: 'Languages & Databases',
      focus: 'Star/Snowflake schemas, query tuning, SQL Server & MySQL',
      icon: 'server',
      accent: 'blue',
    },
    {
      id: 'skill-powerbi',
      name: 'Power BI & Analytics Modeling',
      category: 'Languages & Databases',
      focus: 'Reporting-ready fact/dimension models & BI enablement',
      icon: 'layout',
      accent: 'orange',
    },
    {
      id: 'skill-devops',
      name: 'Azure DevOps, Git & GitHub Actions',
      category: 'DevOps & Monitoring',
      focus: 'Automated CI/CD pipelines & release engineering',
      icon: 'git-branch',
      accent: 'purple',
    },
    {
      id: 'skill-containers-iac',
      name: 'Docker, Kubernetes (AKS) & Terraform',
      category: 'DevOps & Monitoring',
      focus: 'Containerized deployments & Infrastructure as Code',
      icon: 'terminal',
      accent: 'cyan',
    },
    {
      id: 'skill-monitoring',
      name: 'Azure Monitor, Prometheus & Grafana',
      category: 'DevOps & Monitoring',
      focus: 'Log Analytics, pipeline health tracking & issue resolution',
      icon: 'shield',
      accent: 'green',
    },
    {
      id: 'skill-genai-rag',
      name: 'LLMs, RAG, Embeddings & Vector Search',
      category: 'AI & Gen AI',
      focus: 'Enterprise Generative AI concepts & retrieval workflows',
      icon: 'sparkles',
      accent: 'pink',
    },
    {
      id: 'skill-openai-langchain',
      name: 'Azure OpenAI, LangChain & LangGraph',
      category: 'AI & Gen AI',
      focus: 'AI orchestration frameworks & OpenAI model integration',
      icon: 'cpu',
      accent: 'indigo',
    },
    {
      id: 'skill-mcp-ml',
      name: 'MCP, Azure ML & Amazon SageMaker',
      category: 'AI & Gen AI',
      focus: 'Model Context Protocol & classification/regression ML workflows',
      icon: 'zap',
      accent: 'yellow',
    },
  ],

  /**
   * FEATURED DATA ENGINEERING WORK — Strictly grounded in resume experience
   * Add architecture diagrams or screenshots in `coverImage` and `screenshots` anytime.
   */
  projects: [
    {
      id: 'proj-medallion-fabric',
      title: 'Medallion Lakehouse & Real-Time Streaming Platform',
      category: 'Cloud Lakehouse',
      summary:
        'Enterprise ETL/ELT and streaming data platform integrating Azure Data Factory, Databricks, ADLS Gen2, Microsoft Fabric OneLake, Event Hubs, and Kafka.',
      fullDescription:
        'Engineered at Finite HR & IT Solutions (April 2025 – Present). Built parameterized ADF pipelines ingesting data from SQL databases, REST APIs, and on-premises systems into an ADLS Gen2 Bronze-Silver-Gold Medallion Architecture. Combined Databricks PySpark notebooks with CDC and SCD Type 1/2 incremental processing, Microsoft Fabric Lakehouse/OneLake, real-time Event Hubs & Kafka streams, Unity Catalog & Microsoft Purview governance, and Synapse Analytics Star/Snowflake models automated via Azure DevOps, Docker, AKS, and Terraform.',
      technologies: [
        'Azure Data Factory',
        'Databricks',
        'Microsoft Fabric',
        'PySpark',
        'Event Hubs & Kafka',
        'Unity Catalog',
      ],
      highlights: [
        'Designed Bronze, Silver, and Gold Medallion layers in ADLS Gen2 with CDC and SCD Type 1/2 incremental loads',
        'Developed Microsoft Fabric Lakehouse and OneLake workflows alongside Synapse Analytics Star & Snowflake schemas',
        'Implemented data governance, lineage, access control, and cataloging with Unity Catalog and Microsoft Purview',
        'Automated cloud deployments using Azure DevOps, Docker, Kubernetes (AKS), and Terraform CI/CD practices',
      ],
      githubUrl: '',
      liveDemoUrl: '',
      coverImage: {
        src: '',
        alt: 'Medallion Lakehouse and Real-Time Streaming architecture preview',
        objectPositionX: 50,
        objectPositionY: 50,
        scale: 1,
      },
      screenshots: [
        {
          src: '',
          caption: 'Medallion Architecture (Bronze → Silver → Gold) on ADLS Gen2 & Azure Databricks',
        },
        {
          src: '',
          caption: 'Governance & CI/CD pipeline: Unity Catalog, Microsoft Purview, Azure DevOps & Terraform',
        },
      ],
      statusLabel: 'Finite HR & IT Solutions',
    },
    {
      id: 'proj-migration-snowflake',
      title: 'Legacy ETL Cloud Migration & Snowflake / Synapse DW',
      category: 'Cloud Migration',
      summary:
        'End-to-end migration of legacy ETL workloads to Azure Cloud with optimized Databricks Spark clusters, Snowflake data warehousing, and Azure Stream Analytics.',
      fullDescription:
        'Delivered at Cynosure Software Solutions (Jan 2023 – March 2025). Migrated legacy ETL pipelines to Azure Data Factory, Azure Databricks, and ADLS Gen2 following Medallion Architecture principles. Built high-performance analytical warehouses in Snowflake, Azure Synapse Analytics, and Azure SQL Database, integrated real-time ingestion with Event Hubs and Stream Analytics, tuned Spark jobs and clusters for cost and speed, secured access with RBAC and Azure Key Vault, and monitored production health using Azure Monitor and Log Analytics.',
      technologies: [
        'Azure ADF',
        'Azure Databricks',
        'Snowflake',
        'Azure Synapse',
        'Stream Analytics',
        'Key Vault & RBAC',
      ],
      highlights: [
        'Migrated legacy on-prem ETL workflows into scalable Bronze, Silver, and Gold Azure cloud pipelines',
        'Designed Snowflake and Azure Synapse Analytics data warehouses for enterprise analytics and reporting',
        'Optimized Databricks Spark jobs and cluster configurations to boost throughput and reduce compute costs',
        'Configured Azure RBAC, Key Vault security, Azure DevOps CI/CD releases, and Azure Monitor / Log Analytics',
      ],
      githubUrl: '',
      liveDemoUrl: '',
      coverImage: {
        src: '',
        alt: 'Legacy ETL Cloud Migration and Snowflake Data Warehouse overview',
        objectPositionX: 50,
        objectPositionY: 50,
        scale: 1,
      },
      screenshots: [
        {
          src: '',
          caption: 'Legacy ETL to Azure Cloud & Medallion Lakehouse migration architecture',
        },
        {
          src: '',
          caption: 'Snowflake & Synapse analytical layer with RBAC, Key Vault, and Azure Monitor',
        },
      ],
      statusLabel: 'Cynosure Software Solutions',
    },
    {
      id: 'proj-datalake-ha',
      title: 'Governed Azure Data Lake & High-Availability DB Ops',
      category: 'Data Lake & DBA',
      summary:
        'Streamlined data integration with Azure Databricks, Azure Data Lake, and Microsoft Purview alongside SQL performance tuning and HA/DR operations.',
      fullDescription:
        'Implemented at Villageminds Private Limited (Apr 2022 – Dec 2022). Built an integrated Azure Data Lake solution powered by Azure Databricks and Microsoft Purview while ensuring enterprise database reliability through backup/restoration strategies, replication, high availability, disaster recovery, SQL query & execution-plan tuning, role-based security policies, and technical operational runbooks.',
      technologies: [
        'Azure Databricks',
        'Azure Data Lake',
        'Microsoft Purview',
        'SQL Server',
        'MySQL',
        'HA / DR',
      ],
      highlights: [
        'Implemented an Azure Data Lake solution using Azure Databricks, Data Lake Storage, and Microsoft Purview',
        'Diagnosed performance bottlenecks and optimized SQL queries and execution plans for application teams',
        'Engineered database replication, backup/restoration, high availability, and disaster recovery procedures',
        'Managed database users, roles, privileges, security policies, and operational/technical runbooks',
      ],
      githubUrl: '',
      liveDemoUrl: '',
      coverImage: {
        src: '',
        alt: 'Azure Data Lake and High-Availability Database operations overview',
        objectPositionX: 50,
        objectPositionY: 50,
        scale: 1,
      },
      screenshots: [
        {
          src: '',
          caption: 'Azure Data Lake, Databricks & Microsoft Purview data integration pipeline',
        },
        {
          src: '',
          caption: 'Database reliability: SQL execution-plan tuning, HA/DR, replication & runbooks',
        },
      ],
      statusLabel: 'Villageminds Pvt. Ltd.',
    },
  ],

  /**
   * PROFESSIONAL EXPERIENCE — Exact roles and dates from resume
   */
  experience: [
    {
      id: 'exp-finite',
      role: 'Data Engineer',
      organization: 'Finite HR & IT Solutions',
      period: 'April 2025 – Present',
      location: 'Hyderabad, India',
      description:
        'Developing scalable ETL/ELT and real-time streaming pipelines across Azure Data Factory, Databricks, Synapse Analytics, Microsoft Fabric, Python, SQL, and PySpark.',
      highlights: [
        'Built parameterized ADF pipelines ingesting SQL databases, REST APIs, and on-premises systems into ADLS Gen2 Bronze/Silver/Gold Medallion layers.',
        'Developed Databricks notebooks implementing cleansing, business rules, incremental loads, CDC, and SCD Type 1 & Type 2.',
        'Built Microsoft Fabric Lakehouse & OneLake pipelines, Synapse Star/Snowflake schemas, and Event Hubs/Kafka real-time streams.',
        'Implemented Unity Catalog & Microsoft Purview governance and automated deployments with Azure DevOps, Docker, Kubernetes (AKS), and Terraform.',
      ],
    },
    {
      id: 'exp-cynosure',
      role: 'Data Engineer',
      organization: 'Cynosure Software Solutions',
      period: 'Jan 2023 – March 2025',
      location: 'Hyderabad, India',
      description:
        'Led legacy ETL migrations to Azure Cloud, Medallion architecture design, Snowflake & Synapse warehousing, and Databricks Spark optimization.',
      highlights: [
        'Migrated legacy ETL workflows to Azure using ADF, Azure Databricks, and ADLS Gen2 with Bronze, Silver, and Gold layers.',
        'Built real-time ingestion with Event Hubs, ADF, and Azure Stream Analytics; developed Snowflake and Azure Synapse data warehouses.',
        'Optimized Databricks Spark jobs and cluster configurations to improve performance and reduce cloud costs.',
        'Configured Azure RBAC, Azure Key Vault, Azure DevOps CI/CD pipelines, and production monitoring via Azure Monitor & Log Analytics.',
      ],
    },
    {
      id: 'exp-villageminds',
      role: 'Software Engineer',
      organization: 'Villageminds Private Limited',
      period: 'Apr 2022 – Dec 2022',
      location: 'Hyderabad, India',
      description:
        'Implemented Azure Data Lake solutions with Databricks and Microsoft Purview while managing enterprise database health, security, and high availability.',
      highlights: [
        'Implemented a data lake solution using Azure Databricks, Azure Data Lake, and Microsoft Purview to streamline data integration.',
        'Monitored database health, resolved bottlenecks, and optimized SQL queries and execution plans for business application teams.',
        'Implemented backup/restoration, replication, high availability, disaster recovery, and role-based database security policies.',
        'Maintained comprehensive database documentation, recovery plans, and operational/technical runbooks.',
      ],
    },
  ],

  /**
   * EDUCATION — Exact degree from resume
   */
  education: [
    {
      id: 'edu-btech',
      degree: 'Bachelor of Technology (B.Tech)',
      institution: 'Avanthi Institute of Engineering and Technology',
      period: 'B.Tech Graduate',
      location: 'India',
      details:
        'Undergraduate engineering degree building core foundations in computer science, databases, programming, and software systems.',
    },
  ],

  /**
   * TESTIMONIALS — Kept empty so no fabricated reviews appear.
   * Add genuine recommendations here to automatically reveal the Testimonials section.
   */
  testimonials: [],

  socialLinks: [
    {
      id: 'social-email',
      platform: 'email',
      label: 'Email',
      url: 'mailto:sanyasipatrudulanka@gmail.com',
    },
    {
      id: 'social-github',
      platform: 'github',
      label: 'GitHub',
      url: 'https://github.com',
    },
    {
      id: 'social-linkedin',
      platform: 'linkedin',
      label: 'LinkedIn',
      url: 'https://linkedin.com',
    },
    {
      id: 'social-projects',
      platform: 'website',
      label: 'Projects',
      url: '#projects',
    },
  ],

  contact: {
    headingAccent: 'In Touch',
    subtitle:
      'Open to Azure Data Engineering, Microsoft Fabric, Databricks, Snowflake, and Generative AI data platform opportunities. Reach out directly below.',
    recipientEmail: 'sanyasipatrudulanka@gmail.com',
    formEndpoint: '',
    responseNote:
      'Direct contact: sanyasipatrudulanka@gmail.com · +91 8121801983 (Hyderabad, India). Optional Formspree/Web3Forms endpoint can be configured in src/config/portfolioConfig.ts.',
  },
};
