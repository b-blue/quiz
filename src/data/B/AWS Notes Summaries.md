# AWS Notes Summaries

## AWS Global Infrastructure Hierarchy Summary

1. Regions (3+ AZs) // Geographic areas made up of 3 or more isolated, physically separate Availability Zones
2. Availability Zones (1+ DCs) // Areas inside Regions made of one or more discrete data centers

## AWS Global Services

- AWS IAM (Identity and Access Management) // Access management
- Amazon CloudFront // Content delivery network
- Amazon Route 53 // DNS routing
- AWS WAF (Web Application Firewall) // Application firewall

## Cloud Computing Benefits Summary

- Agility // Quickly spin up resources as needed
- Elasticity // Provision amount of resources needed; scale up and down as needed
- Cost Savings // Trade fixed expenses for variable expenses
- Deploy Globally in Minutes // Global infrastructure means apps can be closer to end users, reducing latency
- IAAS (Infrastructure As A Service) // Access to networking features, computers (virtual or on dedicated hardware), data storage; think Ec2
- PAAS (Platform As A Service) // Deployment and management concerns without concern for underlying infrastructure; think Elastic Beanstalk
- SAAS (Software As A Service) // Complete product is run and managed by the service provider without concern for maintenance or infrastructure; think Amazon Rekognition

## Other Concepts

- Reliability // System recovery from disruptions; describes ability of system to recover from infrastructure or service disruptions, by dynamically acquiring computing resources to meet demand, and mitigate disruptions
- Resiliency // System recovery from attacks or failures; concerns the ability of a system to recover from a failure induced by the load (data or network), by hardware or software failures, or by attacks on the system itself.
- Durability // Data preservation and quality; refers to the ability of a system to assure data is stored and data remains consistently on the system as long as it is not changed by legitimate access; that is, data should not become corrupted or disappear from the cloud because of a system malfunction

## Three Fundamental Drivers of Cost on AWS

- Compute
- Storage
- Outbound Data Transfer

## Six Advantages of Cloud Computing

- Trade capital expense for variable expense
- Benefit from massive economies of scale
- Stop guessing capacity
- Increase speed and agility
- Stop spending money running and maintaining data centers
- Go global in minutes

## Six Pillars of Well-Architected Framework

- Operational Excellence
- Security
- Reliability
- Performance Efficiency
- Cost Optimization
- Sustainability

## AWS Cloud Transformation Phases Summary

- Envision Phase // Demonstrate how cloud accelerates business outcomes
- Align Phase // Identify capability gaps across CAF perspectives, surfacing stakeholder concerns
- Launch Phase // Deliver pilot initiatives; demonstrate incremental business value
- Scale Phase // Expand production pilots and business value; ensure cloud investments pay off

## AWS Cloud Adoption Framework Perspectives Capabilities Summary

- Business Capabilities // Strategy management; portfolio management; innovation management; product management; strategic partnership; data monetization; business insights; data science
- People Capabilities // Culture evolution; transformational leadership; cloud fluency; workforce transformation; change acceleration; organization design; organizational alignment
- Governance Capabilities // Program and project management; benefits management; risk management; cloud financial management; application portfolio management; data governance; data curation
- Platform Capabilities // Platform architecture; data architecture; platform engineering; data engineering; provisioning and orchestration; mordern application development; CI/CD
- Security Capabilities // Security governance; security assistance; identity and access management; threat detection; vulnerability management; infrastructure protection; data protection; application security; incident response
- Operations Capabilities // Observability; event management/AIOps; incident and problem management; change and release management; performance and capacity management; configuration management; patch management; availability and continuity management; application management

## AWS Cloud Adoption Framework Perspectives Stakeholders Summary

- Business Perspective // Stakeholders include CEO, CFO, COO, CIO, and CTO
- People Perspective // Stakeholders include CIO, COO, CTO, Cloud Director, and cross-functional/enterprise-wide leaders
- Governance Perspective // Stakeholders include Chief Transformation Officer, CIO, CTO, CFO, Chief Data Officer, Chief Risk Officer
- Platform Perspective // Stakeholders include CTO, technology leaders, architects and engineers
- Security Perspective // Stakeholders include Chief Information Security Officer, Chief Compliance Officer, internal audit leaders, security architects and engineers
- Operations Perspective // Stakeholders include infrastructure and operations leaders, site reliability engineers, information technology service managers

## AWS Account Credit Application Order

- Credits are applied in the following order
	- Soonest expiring
	- Least number of applicable products
	- Oldest credit

## OSI Layer Architecture Summary

- Layer 7 // Application Layer (HTTP, HTTPS requests occur here / AWS WAF applies here)
- Layer 6 // Presentation Layer
- Layer 5 // Session Layer
- Layer 4 // Transport Layer (TCP, UDP data transmission occurs here / AWS Shield applies here)
- Layer 3 // Network Layer (Physical movement through network determined / AWS Shield applies here)
- Layer 2 // Data Link Layer 
- Layer 1 // Physical Layer

## Cloud Migration - The 7 R's Summary
- Retire // Turn things off if you don't need them
- Retain // Do nothing for now
- Relocate // Move apps from on-prem to Cloud version, or EC2 instances between VPC, regions, etc.
- Rehost ("Lift and shift") // Simple migrations via re-hosting on AWS, or migrate machines to AWS cloud
- Replatform ("Lift and reshape") // Leverage cloud optimizations such as migrating database to RDS or app to Elastic Beanstalk
- Repurchase ("Drop and shop") // Move to different product while also moving to cloud (e.g., HR -> Workday)
- Refactor/Re-architect // Reimagine application architecture using cloud native features (move to serverless, etc.)

## Reservations to Optimize Costs Summary

_A three-year term is always more cost-effective than a one-year term_  
_Within a given term, all upfront is more cost effective than partial upfront, and partial upfront is more cost-effective than no upfront_

- EC2 // Reserved Instances (RI); discount applied to running on-demand instances
- DynamoDB // Reserved Capacity; if predicting read/write throughput is possible, savings are significant over normal provisioned capacity
- ElastiCache // Reserved Nodes; low, one-time payment for each cache node to reserve, discounts hourly charge for node
- RDS // Reserved Instances (RI); no upfront, partial upfront, all upfront with all reserved instance types available
- Redshift // Reserved Nodes; commit to paying for 1- or 3-year duration

## Encryption by Default Summary

- AWS S3 // All S3 buckets are encrypted by default; objects also encrypted server-side by default with SSE-S3 keys
- AWS Storage Gateway // All data transferred between gateway and AWS storage is encrypted with SSL by default
- CloudTrail Logs // Log files delivered to S3 bucket from CloudTrail have SSE-S3 server-side encryption by default
- EFS // Optional, user-enabled encryption in-flight and encryption at-rest available
- EBS // Optional, user-enabled encryption in-flight and encryption at-rest available
- RDS // Additional feature requiring user to enable
- Redshift // Optional setting

## Multi-AZ Deployments vs Multi-Region Deployments vs Read Replicas Summary

- Multi-AZ Deployments // High availability; span at least two AZs in a region
- Multi-Region Deployments // Disaster recovery, local performance; each region can have a multi-AZ deployment
- Read Replicas // Scalability; can be within AZ, cross-AZ or cross-region

## Storage Gateways Summary

- AWS Storage Gateways // Bridge between on-prem and cloud data; used for disaster recoverr, backup & restore, on-prem caching
- AWS File Gateway // Recent data cached in file gateway; plug app server into S3 gateway piped to non-Glacier S3 bucket
- AWS Volume Gateway // Block storage; cached volumes provide low latency access to recent data; stored volumes keep entire dataset on-prem with scheduled backups to S3
- AWS Tape Gateway // Used for physical tapes; Virtual Tape Library (VTL) backed by S3 and Glacier

## S3 Storage Retrieval by Storage Class Summary

- _Because S3 buckets are regional, all S3 Storage Classes store data in a minimum of 3 AZs_
- _S3 Intelligent Tiering can move objects between tiers based on usage_

- Amazon S3 Standard // Frequently accessed data
- Amazon S3 Standard - Infrequent Access // Less costly than Standard; less frequent access, rapid retrieval
- Amazon S3 One Zone - Infrequent Access (S3 One Zone - IA) // 20% less cost than S3 Standard-IA; Less frequent access but rapid retrieval
- Amazon S3 Glacier - Instant Retrieval // Archived data, retrieved in milliseconds
- Amazon S3 Glacier - Flexible Retrieval // Archived data, retrieval times between 1m-12h
- Amazon S3 Glacier - Deep Archive // Archived data, retrieval time between 12h-48h

## AWS Route 53 Routing Policies Summary

- Simple Routing // For single resource performing a given domain function; web server to serve content for example.com website
- Failover Routing // Configure active-passive failover
- Geolocation Routing // User location determines routing
- Latency Routing // With resources in multiple AWS regions, route traffic to region with lowest latency
- Multivalue Answer Routing // Use when Route 53s response to DNS queries with up to 8 healthy records is desired
- Weighted Routing // Route traffic to multiple resources in proportions specified

## IAM Policy Architecture

- Version // Version of policy language to use
- Statement
  - Sid (optional) // Statement ID can differentiate statements
  - Effect // Allow or Deny
  - Principal (optional) // Required if policy is resource-based to indicate whose access is described here
  - Action // List of actions the policy allows or denies
  - Resource (optional) // Required if policy is permissions-based, specifies resources to which policy applies
  - Condition (optional) // Specify circumstances under which this policy grants permission

---

## IAM Summary

_IAM is free to use_

- Users // Mapped to physical users, have password for AWS Console
- Groups // Contains users exclusively
- Policies // JSON document outlining permissions for users or groups
- Roles // Used for EC2 Instances or AWS Services
- Security // MFA + Password Policy
- AWS CLI // Manage AWS services using the command line
- AWS SDK // Manage your AWS services using a programming language
- Access Keys // Access AWS using CLI or SDK
- IAM Credential Report // Lists all account's users and status of their credentials 
- IAM Access Advisor // Shows service permissions granted to a user and when they were last accessed

## EC2 Summary 

- EC2 Instance // AMI (OS) + Instance Size (CPU + RAM) + Storage + Security Groups + EC2 User Data
- Security Groups // Firewall attached to the EC2 Instance
- EC2 User Data // Script launched at first start of an instance
- SSH // Start terminal into EC2 Instance on port 22
- EC2 Instance Role // Link to IAM Roles
- On-Demand Instances // Short workload, predictable pricing, pay by the second
- Spot Instances // Short workloads, cheap, can lose instances (less reliable than on-demand)
- Dedicated Hosts // Most expensive; physical server booked; good for server-bound software licenses
- Dedicated Instance // No other customers share hardware
- Capacity Reservations // Reserve capacity in specific AZ for any duration
- Reserved Instances (RIs) // Maximum 72% billing discount applied to on-demand instances; 1- or 3-year terms; for long workloads; convertible RIs with flexible instances exist
- Savings Plans // 1- or 3-year terms; commitment to amount of usage; good for long workloads

## EC2 Instance Summary

- EBS (Elastic Block Store) Volumes // Network drives attached to one EC2 instance at a time; mapped to availability zones; can use EBS Snapshots for backups/transfer of EBS Volumes across AZ; persist after EC2 instance is terminated
- EBS Snapshots // Stored incrementally; users billed only for changed blocks stored
- AMI (Amazon Machine Image) // Create ready-to-use EC2 instances with our customizations in place
- EC2 Image Builder // Automatically build, test, distribute AMIs
- EC2 Instance Store // High performance hardware disk attached to our EC2 instance; lost if our instance is stopped/terminated
- EFS // Network file system, can be attached to hundreds of instances in the same region; works across AZs
- EFS-IA // Cost-optimized storage clas for infrequently accessed files
- FSx for Windows // Network file system for Windows servers
- FSx for Lustre // High performance computing Linux file system

## ELB & ASG Summary

- Agility // Quickly spin up and deploy resources in the cloud
- Elasticity // Provision resources based on actual need; scale resources up and down to fit needs
- Vertical Scalability (Scaling up or down) // Think elasticity; Allocate more or less resources (CPU, RAM) to one instance
- Horizontal Scalabililty (Scaling out or in) // Think elasticity; increase or decrease number of instances; duplicating resources, implies distributed systems
- High Availability // Running an app/system in at least 2 AZs
- Elastic Load Balancers (ELB) // Distribute traffic across backend EC2 instances; can be multi-AZ; supports health checks
  - Application Load Balancer // Layer 7; application layer
  - Network Load Balancer // Layer 4; network layer; ultra-high performance; allows for TCP
  - Gateway Load Balancer // Layer 3
  - Classic Load Balancer // L4 + L7; retired in 2023
- Auto Scaling Groups (ASG) // Free to use; implements elasticity based on demand on system; can be multi-AZ; integrated with ELB; cannot change instance types

## S3 Summary

_Outbound data tranfers to the Internet from all AWS regions is billed at a tiered, region-specific rate_
_Inbound data tranfers into AWS regions from the Internet is free_

- Buckets // Global unique names; tied to region; best thought of as folders in file directory analogy
- Objects // Contents of buckets; best thought of as files in file directory analogy
- Security // IAM policy; S3 bucket policy; S3 encryption
- Websites // Host static website on S3
- Versioning // Multiple versions for files; prevent accidental deletes
- Replication // Same-region or cross-region; must enable versioning
- Storage Classes // Lifecycle rules can move objects between storage classes
  - Amazon S3 Standard - General Purpose
  - Amazon S3 Standard - Infrequent Access (IA)
  - Amazon S3 One Zone - Infrequent Access
  - Amazon S3 Glacier - Instant Retrieval
  - Amazon S3 Glacier - Flexible Retrieval
  - Amazon S3 Glacier - Deep Archive // retrieve data in 12 or 48 hours
- Snowball // Import data into S3 through physical device; example of edge computing
- Storage Gateway // Hybrid solution to extend on-prem storage to S3
- S3 Replication // Versioning must be enabled in source and destination buckets; asynchronous copying; cross-region replication (CRR) or same-region replication (SRR)
- S3 CRR (Cross-Region Replication) // Copy bucket contents across regions; meet compliance requirements; minimize latency; increase operational efficiency
- S3 SRR (Same-Region Replication) // Copy bucket contents within region; aggregate logs; configure live replication between prod and test accounts; abide by data sovereignty laws


## Databases & Analytics Summary in AWS Summary

- RDS (Relational Database Service) // OLTP; Managed DB service using SQL as query language; Postgres; MySQL; Oracle; MariaDB; Microsoft SQL Server
- Aurora // AWS implementation of PostgreSQL or MySQL as AuroraDb; "cloud-optimized" versions of same
- DocumentDb // AWS implementation of MongoDb (NoSQL database)
- Athena // Serverless query service to analyze data stored in Amazon S3 using SQL language
- DynamoDb // Serverless; fully managed NoSQL database replicated across 3 AZs; distributed "serverless database"; not relational database
- DynamodDb Accelerator - DAX // Fully managed in-memory cache for DynamoDb only
- DynamoDb Global Tables // Makes DynamoDb table accessible in multiple regions; active-active replication enables read/write to any AWS region
- ElastiCache // AWS fully managed Redis or Memcached equivalent; in-memory database for read-intensive workloads
- Relational Databases (OLTP / Online Transaction Processing) // RDS & Aurora (SQL)
- Warehouse (OLAP / Online Analytical Processing) // Redshift (SQL)
- EMR (Elastic MapReduce) // Creates Hadoop clusters of hundreds of Ec2 instances to process big datasets
- QuickSight // Serverless ML-powered business intelligence service to create interactive dashboards
- Neptune // Graph database, highly available
- Timestream // Time series database
- QLDB (Quantum Ledger Database) // Review history of all changes made to application data over time; immutable
- Amazon Managed Blockchain // Join public blockchain networks or create scalable private network
- AWS Glue // Serverless ETL (extract, transform, load); prepare data for analytics
- DMS (Database Migration Service) // Homogenous or heterogenous migrations supported; source DB is available during migration

## Other Compute Summary 

- Docker // Like ECS; run applications using containers
- ECS (Elastic Container Service) // Like Docker; run applications on EC2 instances
- AWS Fargate // Serverless; run Docker containers without provisioning infrastructure
- ECR (Elastic Container Registry) // Like DockerHub; private Docker image repository
- AWS Batch // Run batch jobs on AWS across managed EC2 instances
- Lightsail // Predictable and low pricing for simple, preconfigured apps and database stacks

## AWS Lambda Summary 

- AWS Lambda // Serverless; FAAS (Function As A Service); run functions on-demand; billed by time run x RAM provisioned and by number of invocations; invocations capped at 15 minutes in length; use API Gateway to expose Lambda functions as HTTP API

## Deployment Summary

- CloudFormation (AWS) // Like Terraform; infrastructure as code, works with almost all AWS resources; repeat across regions and accounts
- Elastic Beanstalk (AWS) // Platform as a Service, limited to certain programming languages or Docker; PHP, Java, .NET, Node, Python, etc.; Deploy code consistently with known architecture (ALB + EC2 + RDS)
- CodeDeploy (Hybrid) // Deploy and upgrade application onto servers
- Systems Manager (Hybrid) // Patch, configure, run commands at scale
- Systems Manager Session Manager // Fully managed, browser-based shell and CLI; access across instances
- CodeCommit // Store code in private git repo
- CodeBuild // Build and test code in AWS
- CodeDeploy // Deploy code onto servers
- CodePipeline // Orchestration of pipeline (CICD)
- CodeArtifact // Store packages/dependencies on AWS
- AWS CDK // Define cloud infra using specific programming language

## Cloud Monitoring Summary

- CloudWatch // Resource performance monitoring, events and alerts
	- CloudWatch Metrics // Monitor performance of AWS services and billing metrics
	- CloudWatch Alarms // Automate notifications, perform EC2 actions, notify to SNS based on metric
	- CloudWatch Logs // Collect log files from EC2 instances, on-prem servers, Lambda functions
	- EventBridge // Scheduling processes; react to events in AWS, or trigger a rule/process on a schedule using Amazon EventBridge Scheduler
- CloudTrail // Account-specific activity and audit; audit API calls made within your AWS account, investigate after the fact
  - CloudTrail Insights // Automated analysis of CloudTrail events
- X-Ray // Trace requests made through your distributed applications, investigate in real-time
- AWS Health Dashboard // Status of all AWS services across all regions
- AWS Account Health Dashboard // AWS events that impact your infrastructure
- Amazon CodeGuru // Automated code reviews, application performance recommendations

## VPC Summary

- VPC (Virtual Private Cloud) // Spans all AZs in region; provisioned logically isolated section of AWS cloud in which to launch resources in virtual network; can create subnets, select IP address range, and configure routing and network gateways; cannot connect on-prem network to cloud
  - Internet Gateway // Connects VPC to public internet, provides Internet access to VPC
  - VPC Peering // Connect two VPCs with non-overlapping IP ranges, nontransitive
  - Transit Gateway // Connect thousands of VPC and on-premises networks together
  - VPC Endpoints // Provide private access to AWS services within VPC: two types are interface endpoints and gateway endpoints
    - VPC Gateway Endpoint // AWS S3 & DynamoDb only; gateway specified by user as target for route in route table for traffic bound to AWS service
    - VPC Interface Endpoint // All other AWS services (includes S3); elastic network interface with private subnet IP; entry point for traffic to supported AWS service
  - PrivateLink // Private connection to service in a 3rd party VPC
  - VPC Flow Logs // Network traffic logs
- Subnets // Spans one AZ in region; part of a VPC; tied to AZ, represents network partition of VPC
  - NAT Gateway (AWS Managed) & NAT Instances (Self-managed) // Give internet access to private subnets
  - NACL (Network Access Control List) // Stateless, subnet rules for inbound and outbound; IP addresses only, supports DENY and ALLOW rules
  - Security Groups // Stateful, operate at EC2 Instance level or ENI level; IP addresses and other security groups, ALLOW rules only
- AWS VPN // Establish secure connection from on-prem, remote offices or client devices to AWS global network; consists of Site-to-site VPN or Client VPN
  - Site-to-Site VPN // VPN over public internet between on-premises DC and AWS
  - Client VPN // OpenVPN connection from your computer into your VPC
- Direct Connect // Direct private connection from on-prem straight to AWS, public internet not involved
- Elastic IP // Fixed public IPV4, ongoing cost if not in-use

---

## Shared Responsibility Model

- AWS Responsibility // Security OF the Cloud
  - Protecting infrastructure (hardward, software, facilities and network) that runs all AWS Services
  - Managed services like S3, DynamoDb, RDS, etc.
- Customer Responsibility // Security IN the Cloud
  - For EC2 Instance, customer is responsible for management of
    - Guest OS, including security patching and updates
    - Firewall & network configuration
    - IAM 
    - Encryption; encrypting application data
- Shared Controls
  - Patch management
  - Configuration management
  - Awareness and training

## RDS Example of Shared Responsibility Model

- AWS Responsibility
  - Manage underlying EC2 Instance, disable SSH access
  - Automated DB patching
  - Automated OS patching
  - Audit underlying instance and disks, guarantee functionality
- Your Responsibility
  - Check ports / IP / security group inbound rules in DB's security group
  - In-database user creation, permissions
  - Create database with or without public access
  - Ensure parameter groups or DB is configured to only allow SSL connections

## S3 Example of Shared Responsibility Model

- AWS Responsibility
  - Guarantee storage is unlimited
  - Gurantee data is encrypted
  - Ensure separation of data between customers
  - Ensure AWS employees cannot access data
- Your Responsibility
  - Bucket configuration
  - Bucket policy / public settings
  - IAM user and roles
	- Enabling encryption

## Security and Compliance Summary

- Shared responsibility on AWS
- Shield // Automatic DDoS Protection + 24/7 support for advanced
  - Shield Standard // Enabled for all customers at no cost; protects against typical DDoS attacks
  - Shield Advanced // Additional fee; 24x7 DDoS response team on standby; detailed real-time metrics and reports available
- WAF // Firewall to filter incoming requests based on rules
  - Protects against common web exploits affecting availability, compromising security, or consume excessive resources
- KMS // Encryption keys managed by AWS
- CloudHSM (Hardware Security Module) // Hardware encryption, we manage encryption keys
- AWS Certificate Manager // Provision, manage, deploy SSL/TLS Certificates
- Artifact // Get access to compliance reports like PCI, ISO, etc.
- GuardDuty // Protects AWS Account by checking VPC, DNS & CloudTrail logs to assess malicious activity/unauthorized behavior
- Inspector // Automated protection of EC2 instances, ECR images and Lambda functions against exposure, vulnerabilities and deviations from best practices; also tests network accessibility of EC2 instances and security state of apps running on instances
- Network Firewall // Protect VPC against network attacks
- Config // Track config changes and compliance against rules
- Macie // Find sensitive data (ex: PII or personally identificable information) in Amazon S3 buckets
- CloudTrail // Account-specific activity and audit; track API calls made by users within account
- AWS Security Hub // Gather security findings from multiple AWS accounts
- Amazon Detective // Find the root cause of security issues or suspicious activities
- AWS Abuse // Report AWS Resources used for abusive or illegal purposes
- Root User Privileges // 
  - Change account settings
  - Close your AWS account
  - Change or cancel your AWS support plan
  - Register as a seller in the Reserved Instance Marketplace
- IAM Access Analyzer // Identify which resources shares externally outside zone of trust
- Firewall Manager // Manage security rules across an Organization (WAF, Shield, etc...)
- AWS Secrets Manager // Rotate, manage and retrieve database credentials, API keys, etc. throughout lifecycle

---

## Machine Learning Summary

- Rekognition // Face detection, labeling, celebrity recognition
- Transcribe // Audio to text (subtitles)
- Polly // Text to audio
- Translate // Translations
- Lex // Build conversational chatbots
- Connect // Cloud contact center
- Comprehend // Natural language processing to find meaning, insights in text
- SageMaker // Machine Learning (build, train, deploy) for every developer and data scientist
- Kendra // ML-powered search engine
- Personalize // Real-time personalized recommendations
- Textract // Detect text and data in documents

---

## AWS Support Plans

### Basic Support Plan
- Customer Service & Communities // 24x7 access to customer service, documentation, white papers and support forums
- AWS Trusted Advisor // Access to 7 core Trusted Advisor checks and guidance to provision resources following best practices
- AWS Personal Health Dashboard // Personalized view of health of AWS services, alerts when resources are impacted

### Developer Support Plan
- All Basic Support Plan Features plus...
- Business Hours Email Access // To Cloud Support Associates (unlimited cases / unlimited contacts)
  - Case severity / response times
    - General Guidance // Within 24 business hours
    - System Impairments // Within 12 business hours

## Business Support Plan (24/7) 

- Intended for use with production workloads
- AWS Trusted Advisor // Full set of checks and API access
- 24x7 phone, email and chat access to Cloud Support Engineers
  - Unlimited cases / unlimited contacts
  - Access to Infrastructure Event Management for additional fee
  - Case severity / response times
    - General Guidance // Within 24 business hours
    - System Impairments // Within 12 business hours
    - Production system impaired // Within four hours
    - Production system down // Within the hour

## Enterprise On-Ramp Support Plan (24/7) 

- Intended for use with production or business critical workloads
- All of Business Support Plan plus...
- Access to pool of Technical Account Managers (TAM)
- Concierge Support Team // For billing and account best practices
- Infrastructure Event Management, Well-Architected & Operations Reviews
  - Case severity / response times
    - General Guidance // Within 24 business hours
    - System Impairments // Within 12 business hours
    - Production system impaired // Within four hours
    - Production system down // Within the hour
		- Business-critical system down // Within a half hour

## Enterprise Support Plan (24/7)

- Intended for use with mission-critical workloads
- All of Business Support Plan plus...
- Access to designated Technical Account Manager (TAM)
- Concierge Support Team // For billing and account best practices
- Infrastructure Event Management, Well-Architected & Operations Reviews
- Access to AWS Incident Detection and Response (for additional fee)
  - Case severity / response times
    - General Guidance // Within 24 business hours
    - System Impairments // Within 12 business hours
    - Production system impaired // Within four hours
    - Production system down // Within the hour
		- Business-critical system down // Within fifteen minutes

## Account Best Practices Summary

- Organizations // Centrally manage billing; control access, compliance and security; share resources across AWS accounts; automate account creation; create groups of accounts to reflect business needs; apply governance policies to groups
- SCP (Service Control Policies) // Restrict account power (affects root user, unlike IAM)
- AWS Control Tower // Easily setup multiple accounts with best-practices
- Use Tags & Cost Allocation Tags // Easy management and billing (!)
- IAM Guidelines // MFA, least-privilege, password policy, password rotation
- Config // Resource-specific change history, audit and compliance; record all resources' configurations & compliance, over time
- CloudFormation // Like Terraform; deploy stacks across accounts or across regions
- Trusted Advisor // High-level AWS account assessment provides insights, support plan adapted to your needs; helps provision resources following best practices for cost optimization, performance, security, fault tolerance, and service limits; full set of checks on Business or Enterprise Support Plan
- S3 or CloudWatch Logs // Destination for service logs or access logs
- CloudTrail // Account-specific activity and audit; record API calls made within your account
- AWS Service Catalog // Users and organizations can create and manage catalogs of IT services approved for use on AWS; virtual machine images, servers, software
- APN (AWS Partner Network) Consulting Partner // Professional services firm to help customers design, architect, build, migrate and manage workloads on AWS
- APN (AWS Partner Network) Technology Partner // Provide hardware, connectivity services, or software solutions hosted on or integrated with AWS Cloud
- If your account is compromised // Change root password; delete and rotate all passwords / keys; contact AWS support

## Billing Summary

- Compute Optimizer // Uses machine learning to recommend optimal resource configurations to reduce cost; applies to some types of Ec2 instances, EC2 auto scaling groups, EBS volumes, and Lamda functions
- Simple Monthly Calculator / Pricing Calculator // Determine cost of services on AWS
- Billing Dashboard // High level overview
- Cost Allocation Tags // Tag resources to create detailed reports; each tag key must be unique, and each tag key can have only one value; user must activate AWS-generated and user-defined tags separately to appear in Cost Explorer or reports
- Cost Explorer // View current usage in detail and forecast future usage
- Cost and Usage Reports // Most comprehensive billing dataset; more involved than Cost Explorer
- Billing Alarms // In `us-east-1`, track overall and per-service billing
  - Only sends alerts when costs and usage actually exceed budget
- Budgets // More advanced than Billing Alarms, track usages, costs, RI, and get alerts; sends alerts as CloudWatch Billing Alarms and also when cost and usage are forecast to exceed budget; four budget types are Cost Budget, Usage Budget, Reservation Budget, and Savings Plans Budget
- Savings Plans // Easy way to save based on long-term usage of AWS
- Cost Anomaly Detection // Detect unusual spends with machine learning
- Service Quotas // Notify when you're close to a service quote threshold

---

## Advanced Identity Summary 

- IAM // Identity and Access Management 
- IAM Identity Center // One login for multiple AWS accounts and applications
- Organizations // Manage multiple accounts
- Security Token Service (STS) // Temporary, limited privileges credentials to access AWS resources
- Cognito // Create a database of users for your mobile & web applications
  - Also add user sign-up, sign-in and access control to web/mobile apps
- Directory Services // Integrate Microsoft Active Directory (AD) in AWS

---

## Other Services Summary

- Amazon Workspaces // Desktop as a Service to provision Windows or Linux desktops
  - Eliminate management of on-premise VDI (Virtual Desktop Infrastructure)
- Amazon AppStream 2.0 // Desktop Application Streaming service delivered from within a web browser
	- Configurable compared to Workspaces
- IOT Core // Connect IoT devices to AWS Cloud, serverless
- Elastic Transcoder // Converts media files stored in S3 into media file formats required by consumer playback devices
- AWS AppSync // Store and sync data across mobile and web apps in real time with GraphQL
- AWS Amplify // Set of tools and services to develop and deploy full-stack web and mobile apps
- AWS Infrastructure Composer // Visually design and build serverless apps quickly on AWS
- AWS Device Farm // Fully managed service to concurrently test web and mobile apps against desktop browsers, real mobile devices, tablets, etc.
- AWS Backup // Centrally manage and automated backups across AWS services, can be scheduled and restored
- AWS Elastic Disaster Recovery (DRS) // Quickly recover physical, virtual and cloud-based servers into AWS with continuous block-level replication for servers
- AWS DataSync // Move lots of data from on-prem to AWS, supports scheduling, replication is incremental after first load
- AWS Application Discovery Service // Plan migration projects by gathering info about on-prem data centers and dependency mapping
  - AWS Agentless Discovery Connector // VM inventory, config, performance history
  - AWS Application Discovery Agent // System config, perofmrance, processes, details of network connections between systems
  - View results in AWS Migration Hub
- AWS Application Migration Service // Rehost solution simplifies migration apps to AWS
- AWS Migration Evaluator // Builds data-driven business case for migration to AWS with baseline of current architecture
- AWS Migration Hub // Central location collects servers and app inventory data for assessing, planning, tracking mgirations to AWS
  - AWS Migration Hub Orchestrator // Provides pre-build templates to save time
  - Status updates from Application Migration Service and Database Migration Service 
- AWS Fault Injection Simulator // Chaos engineering, runs fault injection experiments on AWS workloads
- AWS Step Functions // Serverless visual workflow to orchestrate lambda functions
- AWS Ground Station // Fully managed service to control satellite communications, process data, scale satellite operations
- AWS Pinpoint // Scalable two-way (outbound/inbound) marketing communications service
- AWS Global Accelerator // Availability and performance improvements; uses AWS global network to optimize path from users to applications; traffic improvements up to 60%
- Amazon MQ // Fully managed message broker service for RabbitMQ or ActiveMQ
- AWS Marketplace // Any AWS account can be buyer (subscriber); register AWS account to become a seller (provider); digital catalog with thousands of software listings from independent software vendors; simplifies finding, testing, buying and deploying software to run on AWS
- AWS OpsWorks // Configuration management service that provides managed instances of Chef and Puppet to automate how servers are configured, deployed and managed across EC2 instances or on-prem
- AWS Knowledge Center // Troubleshooting starting point; contains most frequent & common questions and request, and AWS-provided solutions for the same
- AWS Support Center // Hub for managing your support cases; Developer Support Plans and higher can chat or call engineers; Enterprise-level customers have dedicated TAM