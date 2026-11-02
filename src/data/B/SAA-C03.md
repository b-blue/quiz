# AWS SAA-C03 Concepts — aligned to the exam guide

The four section names follow the exam guide's design domains (Secure 30%, Resilient 26%, High-Performing 24%, Cost-Optimized 20%). The study repository's service-family modules are source material; concepts are summarized and placed under the closest exam task.

## Content Domain 2: Design Resilient Architectures

### Messaging and Event Processing — Task 2.1

- Amazon SQS FIFO queues // Preserve strict message order within each message group; FIFO deduplication can suppress duplicate sends during its deduplication interval.
  - Batching // Multiple messages per API operation increases throughput; size batches to meet the required rate while respecting the queue's current throughput quota
- Amazon SQS standard queues // High-throughput queues with best-effort ordering and at-least-once delivery
- Amazon SQS buffering // Decouple producers from slower consumers; messages remain queued during traffic spikes or consumer outages and can be retried
- Amazon SQS dead-letter queue (DLQ) // Isolate messages that fail processing repeatedly for diagnosis or later handling
- SQS queue-based Auto Scaling // Scale consumers using backlog per instance, such as visible messages divided by the number of InService instances; target tracking can maintain an acceptable backlog
- Multi-stage SQS workflow // Use a separate queue between independently scalable processing stages; scale each worker fleet from its own queue depth
- AWS Lambda SQS event source mapping // Polls a queue and invokes a function with messages in batches; useful for serverless processing
- Amazon SNS // Push-based pub/sub and fan-out messaging; consumers do not poll an SNS topic

## Content Domain 1: Design Secure Architectures

### IAM and Application Security — Tasks 1.1–1.3

- IAM permissions boundary // Sets the maximum permissions a user or role can receive; effective permissions are the intersection of the boundary and attached permission policies
- IAM least privilege // Grant only the required actions on the narrowest resource ARN; for S3, bucket actions such as ListBucket use the bucket ARN, while object actions such as DeleteObject use `bucket-name/*`
- Cross-account IAM role // Let a trusted principal assume a role in the resource account and use that role's permissions; direct cross-account resource access instead requires authorization on both the caller and resource sides.
- IAM policy `aws:SourceIp` condition // Evaluates the caller's source IP, not the public or private IP assigned to a resource being created
- IAM groups // Attach a policy once to a group and manage access by adding or removing users
- API Gateway resource policy // Restrict API invocation by principal, source IP range, or other supported conditions; API Gateway itself is not placed in a customer subnet or protected by a security group
- Cross-account access credentials // Prefer assumed roles and short-lived credentials over sharing long-term IAM user keys
- IAM database authentication // Use short-lived authentication tokens for supported RDS engines and grant the workload role the required database-connect permission
- AWS WAF rate-based rule // Limit or block web requests that exceed a configured request rate; WAF can protect supported resources including CloudFront, ALB, and API Gateway

## Content Domain 3: Design High-Performing Architectures

### VPC and Hybrid Networking — Task 3.4

- Internet Gateway connectivity // An internet-facing instance needs a route to an Internet Gateway, a public address, and network controls that permit the traffic
- PrivateLink // Consumer-initiated private access to a supported service through an interface endpoint; avoids broad VPC-to-VPC network exposure
- S3 gateway VPC endpoint // Route VPC-to-S3 traffic privately without an internet or NAT gateway; associate it with route tables and restrict access with endpoint, IAM, or bucket policies
- NAT Gateway high availability // Place a public NAT Gateway in each AZ used by private workloads and route each AZ to its local gateway
- VPC peering // Direct connectivity between two VPCs; peering is non-transitive, so a hub-and-spoke peering layout does not provide spoke-to-spoke routing
- AWS Transit Gateway // Scalable hub for connecting many VPCs and on-premises networks; supports transitive routing subject to route-table configuration
- AWS Global Accelerator // Use static anycast IPs and the AWS global network to improve access to regional TCP/UDP endpoints, including non-cacheable traffic
- AWS Resource Access Manager (RAM) subnet sharing // Share subnets across accounts in an organization so resources can be deployed into a centrally managed VPC
- AWS Direct Connect Gateway // Associate multiple regional virtual private gateways with Direct Connect for hybrid connectivity across regions
- Direct Connect public VIF // Reach public AWS service endpoints, such as S3, from on-premises over Direct Connect
- Direct Connect private VIF // Connect to a VPC through a virtual private gateway; it is not a direct association to an arbitrary VPC in another region
- Transit Gateway VPN ECMP // Multiple dynamic Site-to-Site VPN tunnels can provide aggregate throughput beyond a single tunnel's limit
- Private IP for same-VPC/AZ workloads // Prefer private addresses for internal instance-to-instance traffic to avoid unnecessary public-path data transfer
- Amazon CloudFront // CDN for cacheable and dynamic HTTP(S) content; it is not a general UDP accelerator
- Route 53 private hosted zone prerequisites // Enable VPC DNS resolution (`enableDnsSupport`) and DNS hostnames (`enableDnsHostnames`) for associated VPCs

## Content Domain 3: Design High-Performing Architectures

### EC2, Load Balancing, and Scaling — Task 3.2

- EC2 Instance Store // Host-attached temporary block storage; cannot be detached and attached elsewhere, is cleared on stop/hibernate/termination, and is not preserved in an AMI
- EC2 user data // Bootstrap scripts or cloud-init directives run on first launch by default
- EC2 reboot alarm action // CloudWatch can reboot an instance after an instance status-check failure; recover actions are for system status-check failures
- EC2 Auto Scaling Standby // Temporarily remove an instance from service for maintenance while keeping it in the group, then return it to service
- Auto Scaling `ReplaceUnhealthy` process // Suspend replacement during maintenance if appropriate; after resuming, unhealthy instances may be replaced
- Auto Scaling health checks // Grace periods delay replacement after launch; configure ELB health checks if the group should act on load-balancer health status
- Predictive scaling // Forecast recurring demand from historical patterns; combine with dynamic target tracking to handle unexpected real-time changes
- Target tracking vs. step/scheduled scaling // Target tracking adjusts capacity to maintain a metric target; step scaling responds in increments to alarm breaches; scheduled scaling handles known time-based changes
- Spot request types // Persistent requests reopen after interruption; stopping a Spot Instance does not reopen the request until it is started
- Canceling a Spot request // Cancelling the request does not automatically terminate its running instance
- Spot Fleet // Can maintain target capacity by replacing terminated Spot Instances
- Application Load Balancer (ALB) path routing // Route HTTP(S) requests to target groups based on URL paths; also supports host, header, method, query-string, and source-IP conditions
- Network Load Balancer (NLB) // Layer 4 TCP/UDP load balancer with static IP addresses; useful for protocols such as SSH and workloads that require fixed IPs
- Cross-zone load balancing // When enabled, distribute traffic across targets in all enabled AZs; when disabled, each load-balancer node routes only to targets in its AZ
- ECS Service Auto Scaling // Scale task count using service metrics such as average CPU or memory utilization
- ECS/EKS with Fargate // Run containerized workloads without managing EC2 worker instances
- EC2 tenancy // Dedicated tenancy can be selected on the launch template or inherited from the VPC; either setting to dedicated results in dedicated instances
- EC2 cluster placement group // Place instances close together within one AZ for low-latency, high-throughput inter-node communication
- EC2 Elastic Fabric Adapter (EFA) // Enhanced networking for tightly coupled HPC and ML workloads, including OS-bypass communication
- Detailed CloudWatch monitoring // EC2 detailed monitoring publishes metrics at 1-minute intervals rather than the 5-minute basic interval

## Content Domain 4: Design Cost-Optimized Architectures

### Storage, Backup, and Data Protection — Task 4.1

- EFS Infrequent Access // Lower-cost EFS file storage for rarely accessed data that still needs immediate, POSIX/NFS file access; unlike S3, it remains a shared file system.
- Amazon FSx for Windows File Server // Managed Windows file shares with native SMB support and Active Directory integration.
- AWS Storage Gateway File Gateway // Hybrid file access for on-premises applications: expose S3-backed files over NFS or SMB and cache frequently accessed data locally.
- AWS Snowball Edge // Use a shipped physical device for large offline data transfers; import the data into S3, then apply lifecycle transitions to archive it.
- S3 lifecycle rules // Automatically transition objects between supported storage classes or expire them by age or other configured criteria; lifecycle rules alone do not make data immutable.
- S3 Standard-IA // For infrequently accessed data needing millisecond retrieval and multi-AZ resilience; retrieval charges and a 30-day minimum storage duration apply.
- S3 Glacier retrieval classes // S3 Glacier Instant Retrieval supports immediate access; Flexible Retrieval and Deep Archive require restore requests and tolerate retrieval delays.
- One-time S3 bucket copy // Use `aws s3 sync` for a one-time bulk copy; S3 Batch Replication is an option when existing objects need replication semantics.

## Content Domain 3: Design High-Performing Architectures

### Databases, Analytics, and Migration — Tasks 3.3 and 3.5

- Amazon ElastiCache for Redis // In-memory cache/store for low-latency, read-heavy, real-time workloads such as leaderboards, sessions, and geospatial lookups
- DynamoDB Accelerator (DAX) // Managed in-memory cache for DynamoDB read workloads; not a general-purpose cache for relational databases
- Amazon Athena // Run serverless SQL queries on S3 for ad hoc analysis; partitioning, compression, and columnar formats reduce data scanned
- Amazon Neptune // Managed graph database for highly connected data and relationship traversals
- Aurora Serverless // Automatically scales relational Aurora capacity for variable or intermittent workloads
- AWS DMS Serverless // Automatically provisions and scales replication compute for database migration and ongoing change data capture
- AWS SCT and DMS // Convert schemas and migrate data when moving between database engines
- Babelfish for Aurora PostgreSQL // Supports portions of SQL Server T-SQL and wire protocol to reduce application changes during SQL Server migration
- Amazon Redshift cold-data offload // Move infrequently queried data to S3 storage and query it with Athena when immediate ad hoc SQL access is needed

## Content Domain 2: Design Resilient Architectures

### Serverless Web and Content Delivery — Task 2.1

- Lambda and API Gateway // Serverless HTTP/API compute; API Gateway exposes Lambda functions, while Lambda scales with requests and supports provisioned concurrency to reduce cold-start impact
- EventBridge scheduled rule // Invoke serverless code on a recurring rate or cron schedule
- Lambda layers // Package reusable libraries and dependencies for use by multiple functions
- VPC-enabled Lambda internet access // A Lambda function attached to private VPC subnets needs a route through a NAT Gateway for public internet access; use VPC endpoints for supported private AWS service access
- Lambda monitoring // Alarm on concurrency and invocation metrics to detect unexpected spikes and manage cost

## Content Domain 4: Design Cost-Optimized Architectures

### Cost and Operations — Tasks 4.1–4.4

- Compute Savings Plans // Commit to an hourly spend for discounts across eligible EC2, Fargate, and Lambda usage, with more flexibility than EC2 Instance Savings Plans.
- SageMaker Savings Plans // Commitment-based discounts apply to eligible SageMaker machine-learning usage, separately from Compute Savings Plans.
- AWS Budgets Savings Plans coverage budget // Alert when the percentage of eligible usage covered by Savings Plans falls below a configured threshold.
- AWS CloudFormation // Infrastructure as code provisions and updates AWS resources from templates; the service adds no charge, but provisioned resources incur their normal charges.
- EBS volume selection // Choose general-purpose SSD (gp2/gp3) for broad workloads, Provisioned IOPS SSD for sustained I/O-intensive needs, and HDD types for throughput-oriented or cold data; gp2 bursts, while gp3 provisions performance independently of size.
- Cost of data egress // Co-locate chatty analytics clients with their data source when practical, avoiding transfer charges on large query results crossing Direct Connect or internet links.

## Content Domain 1: Design Secure Architectures

### Multi-account governance and secure workloads — Tasks 1.1–1.2

- Service Control Policies (SCPs) // Set maximum permissions for member accounts; they do not grant permissions and do not restrict the management account
- SCP and IAM evaluation // A member-account action must be allowed by both IAM permissions and the applicable SCP, with explicit denies taking precedence
- AWS Control Tower // Establish a governed multi-account landing zone with account provisioning and preventive/detective guardrails
- AWS CloudFormation StackSets // Deploy a common CloudFormation template across multiple accounts and Regions for centrally managed infrastructure
- IAM policy evaluation // An explicit deny overrides an allow; absent an applicable allow, access is implicitly denied
- AWS shared responsibility model // AWS secures the cloud infrastructure; customers remain responsible for in-cloud identities, data, configurations, and workload controls according to service type
- IAM role for an AWS workload // Use temporary role credentials for EC2, Lambda, and cross-account access instead of embedding long-lived keys
- Root user protection // Enable MFA, avoid routine use, and reserve root credentials for tasks that require them
- IAM Identity Center federation // Provide workforce single sign-on and centrally assign access across AWS accounts and applications
- Security groups and network ACLs // Security groups are stateful instance-level allow lists; network ACLs are stateless subnet-level allow/deny lists and need return-path rules
- AWS WAF and Shield // Use WAF rules for HTTP(S) request filtering and rate limiting; Shield provides managed DDoS protection at the network and application edge
- AWS Firewall Manager // Centrally manage supported WAF, Shield Advanced, Network Firewall, and security-group policies across an organization
- AWS Systems Manager Session Manager // Obtain auditable shell access to managed instances without opening inbound SSH or maintaining bastion hosts
- IAM Access Advisor and credential report // Access Advisor shows service-last-accessed information for least-privilege reviews; the credential report audits account IAM credential status
- AWS Secrets Manager versus Parameter Store // Use Secrets Manager when managed secret rotation is required; Parameter Store is suited to hierarchical configuration and SecureString parameters

### Data security controls — Task 1.3

- AWS KMS envelope encryption // Encrypt bulk data with a data key and protect that data key with a KMS key; KMS direct encryption is for small payloads
- AWS KMS versus CloudHSM // KMS provides managed key operations; CloudHSM offers dedicated, customer-controlled HSM hardware for workloads requiring that control model
- S3 Object Lock Compliance mode // Enforce retention that cannot be bypassed, including by the account root user, for the locked retention period
- S3 Object Lock Governance mode // Permit specially authorized users to bypass retention when the request and policy allow it
- AWS Backup Vault Lock // Enforce immutable backup retention controls on a backup vault, distinct from S3 Object Lock and Glacier Vault Lock
- S3 Glacier Vault Lock // Enforce an immutable vault policy for long-term Glacier archives; it is separate from S3 Object Lock and AWS Backup Vault Lock
- S3 SSE-KMS Bucket Keys // Reduce S3-to-KMS requests and associated KMS request costs, potentially by up to 99%, while retaining SSE-KMS encryption.
- KMS multi-Region keys // Related regional KMS keys share key material and key ID for multi-Region encryption workflows, while each key remains a regional resource
- RDS encryption at rest // To encrypt an unencrypted DB instance, create and encrypt a snapshot copy, restore a new instance, then migrate clients
- RDS SSL/TLS // Encrypt database connections in transit; this does not replace encryption at rest or database authorization
- CloudFront Origin Access Control (OAC) // Restrict a private S3 origin so CloudFront can access it through signed origin requests authorized by the bucket policy
- CloudFront signed URLs and signed cookies // Grant time-limited access to private content; use URLs for individual files or cookies for groups of files
- AWS Certificate Manager and CloudFront // A certificate attached to a CloudFront distribution must be available in `us-east-1`
- Amazon Macie // Discover and classify sensitive data in S3 and generate findings for investigation
- Amazon GuardDuty // Detect suspicious activity using sources such as CloudTrail events, VPC Flow Logs, and DNS logs
- Amazon Inspector // Assess supported compute resources and container images for software vulnerabilities and exposure
- AWS Security Hub // Aggregate security findings and security-standard checks from services such as GuardDuty, Inspector, and Macie
- CloudTrail versus CloudWatch versus Config // CloudTrail records API activity, CloudWatch observes metrics/logs, and Config tracks resource configuration and compliance

## Content Domain 2: Design Resilient Architectures

### Availability, backup, and disaster recovery — Task 2.2

- Recovery Time Objective (RTO) // The maximum acceptable time to restore a workload after disruption
- Recovery Point Objective (RPO) // The maximum acceptable amount of data loss measured as time since the last recoverable point
- Backup and restore DR // Lowest-cost approach when longer recovery times are acceptable; restore infrastructure and data after an incident
- Pilot light DR // Keep core data or services replicated and ready, then provision the rest of the stack during recovery
- Warm standby DR // Keep a reduced-capacity copy of the complete workload running and scale it up during recovery
- Multi-site active-active DR // Run production capacity in multiple sites and route users to healthy sites for the lowest recovery time at the highest cost
- AWS Backup plans and vaults // Centrally schedule supported-resource backups with retention, lifecycle, and copy actions
- AWS Backup service selection // Use AWS Backup for centralized cross-service policy and copy management; service-native backups can suit isolated workloads
- Cross-account and cross-Region backup // Copy recovery points to a separate account or Region to reduce the impact of account compromise or regional failure
- AWS Backup policies with Organizations // Centrally apply backup plans to selected organization accounts and resources
- S3 replication // Replication requires versioning on source and destination; live replication covers new objects, while Batch Replication can copy eligible existing objects
- RDS Multi-AZ deployment // Provide managed high availability and failover; a traditional standby is not a read-scaling endpoint
- Aurora Global Database // Replicate Aurora data across Regions for low-lag regional disaster recovery and managed failover options
- DynamoDB point-in-time recovery (PITR) // Restore a table to a selected point within the configured backup retention window
- DynamoDB deletion protection // Block accidental table deletion; enable PITR separately for recoverability
- DynamoDB global tables // Replicate table data across Regions as a multi-Region, multi-active table to support local reads and writes and regional resilience.
- AWS Step Functions // Orchestrate multi-step serverless workflows with task, choice, parallel, wait, and retry behavior
- Step Functions Standard versus Express // Standard workflows suit long-running auditable executions; Express workflows suit short-duration, high-volume processing
- ElastiCache Multi-AZ failover // Use Multi-AZ and automatic failover to improve cache availability; read replicas alone primarily add read capacity
- Availability Zone capacity planning // Distribute sufficient baseline capacity across AZs to meet minimum service needs during an AZ outage
- Multi-AZ minimum capacity // Place enough instances across AZs to retain required capacity after an AZ failure; use the smallest safe baseline and scale out as demand rises

## Content Domain 3: Design High-Performing Architectures

### Elastic compute and storage — Tasks 3.1–3.2

- EC2 instance family selection // Match compute-, memory-, storage-, or accelerator-optimized families to the workload bottleneck
- EC2 purchasing options // Use On-Demand for flexible short-term capacity, commitments for steady usage, and interruptible Spot capacity for fault-tolerant work
- EC2 placement groups // Use cluster placement for low-latency communication, spread for isolated critical instances, or partition for large distributed systems
- EC2 Auto Scaling policy selection // Target tracking maintains a metric target, step scaling reacts to alarm breaches, and scheduled scaling handles known demand patterns
- EC2 Auto Scaling health checks // Configure load-balancer health checks when unhealthy targets should be replaced; use grace periods to avoid premature replacement
- Application Load Balancer versus Network Load Balancer // ALB routes HTTP(S) at Layer 7 using request attributes; NLB handles Layer 4 TCP/UDP and supports static IPs
- ECS, EKS, and Fargate // ECS and EKS orchestrate containers; Fargate runs supported container tasks without managing EC2 worker instances
- AWS Batch // Schedule batch jobs and provision compute capacity appropriate to queued workloads
- EFS mount targets // Create mount targets in the AZs where clients run and prefer the local-AZ target to reduce latency and cross-AZ transfer
- EFS throughput modes // Use bursting for workloads tied to stored data, provisioned for a set throughput, or elastic for automatically scaling throughput.
- S3 multipart upload // Upload large objects in parallel parts and retry failed parts independently to improve throughput and resilience
- S3 byte-range GET // Fetch only a requested portion of an object, enabling parallel or partial reads
- S3 Transfer Acceleration // Use AWS edge networking to speed long-distance uploads to S3 when the extra transfer charge is justified
- Amazon CloudFront caching // Cache HTTP(S) content near viewers to reduce origin load and improve global delivery performance
- Amazon S3 and CloudFront static delivery // Store static assets in S3 and cache them globally with CloudFront to reduce origin load and viewer latency
- AWS Outposts and Wavelength // Use Outposts for AWS infrastructure in customer facilities and Wavelength Zones for eligible low-latency 5G edge workloads

### Scalable network architectures — Task 3.4

- AWS Site-to-Site VPN versus Direct Connect // VPN provides encrypted connectivity over the internet quickly; Direct Connect provides a private dedicated path with longer provisioning lead time
- AWS Transit Gateway versus VPC peering // Transit Gateway supports hub-and-spoke transitive routing; VPC peering is direct and non-transitive
- VPC endpoint selection // Gateway endpoints provide private S3/DynamoDB routes through route tables; interface endpoints use private ENIs and PrivateLink
- Route 53 failover routing // Pair primary/secondary records with health checks to direct DNS responses toward healthy endpoints
- Route 53 latency routing // Direct users to the Region with the lowest measured latency when that best meets the workload requirement

### Database and data-ingestion performance — Tasks 3.3 and 3.5
- RDS read replicas // Use asynchronous replicas to scale read-heavy relational workloads; promotion is possible but requires a failover plan

- Amazon Kinesis Data Streams // Retain ordered streaming records for independent consumers that need real-time processing or replay
- Kinesis on-demand capacity // Let a stream adapt capacity to variable traffic without manual shard management
- Kinesis enhanced fan-out // Give registered stream consumers dedicated per-shard read throughput when multiple consumers process records concurrently
- Kinesis producer batching // Batch records to reduce request overhead and improve producer throughput efficiency
- Amazon Data Firehose // Buffer, optionally transform, and deliver streaming data to supported destinations without managing stream shards
- Kinesis Data Analytics // Process streaming records with managed analytics when near-real-time transformation or insights are required
- AWS DMS S3-to-Kinesis integration // Feed existing S3 data and ongoing changes into a stream when building a custom bridge is unnecessary
- Amazon DataSync // Automate accelerated transfers among on-premises storage and supported AWS storage services; schedule recurring jobs when needed
- DataSync to EFS over Direct Connect // Use an on-premises DataSync agent and private connectivity for recurring transfers into EFS
- AWS Transfer Family // Provide managed SFTP, FTPS, or FTP endpoints backed by services such as S3 or EFS
- AWS Database Migration Service (DMS) // Migrate databases while the source remains available and replicate ongoing changes when configured for CDC
- AWS Application Migration Service (MGN) // Rehost supported server workloads to AWS using continuous block-level replication and a controlled cutover
- AWS Schema Conversion Tool (SCT) // Convert schemas for heterogeneous database-engine migrations; homogeneous migrations generally do not require engine conversion
- Six migration strategies (6 Rs) // Rehost, replatform, repurchase, refactor/re-architect, retain, and retire describe common application migration choices
- AWS Glue and Data Catalog // Discover schemas and run managed ETL while maintaining metadata used by analytics services
- AWS Lake Formation // Simplify data-lake setup and apply centralized, fine-grained data permissions
- Amazon EMR // Run managed big-data frameworks such as Spark for distributed data processing
- Amazon Redshift and Spectrum // Use Redshift for analytical warehousing and Spectrum to query supported data in S3 without first loading it
- Amazon OpenSearch Service // Support managed search, log analytics, and operational search use cases
- Amazon Quick // Use managed business-intelligence capabilities to build visualizations from supported data sources
- Amazon Comprehend custom entity recognition // Use managed NLP to identify domain-specific entities in text rather than operating a custom model
- Database read scaling and caching // Use read replicas for supported relational read workloads, ElastiCache for general-purpose low-latency caching, and DAX for DynamoDB reads

## Content Domain 4: Design Cost-Optimized Architectures

### Cost-aware storage, compute, and network choices — Tasks 4.1–4.4

- S3 Intelligent-Tiering // Automatically moves eligible objects between access tiers as patterns change; monitoring and automation charges apply, and optional archive tiers may require restore requests.
- EBS General Purpose SSD versus Provisioned IOPS SSD // Use general-purpose SSD for broad workloads; choose Provisioned IOPS SSD when sustained, I/O-intensive performance justifies its higher cost.
- EC2 Savings Plans versus Reserved Instances // Compare the broader eligible-usage flexibility of Compute Savings Plans with EC2-only Reserved Instance discounts; match the commitment to predictable workload and required discount.
- Spot Instances // Use discounted spare EC2 capacity for workloads that can checkpoint, retry, or tolerate interruption; interruption notices are typically provided two minutes ahead when possible.
- AWS Cost Explorer // Explore historical and forecasted costs and review commitment purchase recommendations.
- AWS Budgets // Set cost, usage, or commitment thresholds and alert or take configured actions when actual or forecasted values cross them.
- AWS Cost and Usage Report // Export detailed billing and usage records, commonly to S3, for granular analysis with tools such as Athena.
- Cost allocation tags // Apply consistent project, team, or environment tags to resources and activate them for cost attribution in billing tools.
- AWS Compute Optimizer // Analyze utilization metrics to recommend right-sizing for supported compute and storage resources; it does not itself change resources.
- VPC endpoint and NAT cost tradeoff // For private AWS-service access, compare endpoint hourly and data-processing charges with NAT Gateway processing and transfer charges at expected traffic volume.
- AWS Organizations consolidated billing // Consolidate member-account bills; eligible volume pricing and Savings Plans or Reserved Instance benefits may be shared across accounts, subject to benefit-sharing settings.
- EC2 and Auto Scaling right-sizing // Use workload metrics to choose instance sizes and minimum capacity that meet demand and failure requirements without paying for idle headroom.

## Content Domain 1: Design Secure Architectures

### Practice-test additions — Task 1.2

- Route 53 Resolver inbound and outbound endpoints // Use inbound endpoints for on-premises DNS queries into a VPC and outbound endpoints with forwarding rules for VPC queries to on-premises DNS.
- AWS WAF geographic match rule // Use a geographic match statement in a web ACL to allow or block web requests based on the country of origin.
- Amazon Security Lake // Automatically centralize security data from AWS, on-premises, and third-party sources in an S3-based data lake normalized to OCSF.
- AWS Organizations tag policy // Standardize tags across accounts by defining required tag keys, capitalization, and allowed values; tag policies alone do not prevent untagged resource creation.
- AWS Config managed rules // Continuously evaluate recorded resource configurations against managed or custom rules and retain configuration history for compliance review.
- Amazon S3 Access Points // Create named network and policy entry points to a shared S3 bucket, each with access controls tailored to an application or user group.

## Content Domain 1: Design Secure Architectures

### Practice-test additions — Task 1.3

- AWS IAM Access Analyzer // Analyze resource-based policies to identify access granted to principals outside an account or organization and generate findings.
- S3 SSE-KMS encryption // Use server-side encryption with a KMS key for S3 objects when managed key control and auditable key-use events are required.

## Content Domain 1: Design Secure Architectures

### Practice-test additions — Task 1.1

- IAM Roles for Service Accounts (IRSA) // Associate a Kubernetes service account with an IAM role so Pods receive temporary AWS credentials with permissions scoped to that workload.

## Content Domain 2: Design Resilient Architectures

### Practice-test additions — Task 2.1

- Amazon MQ // A managed Apache ActiveMQ or RabbitMQ broker, useful for migrating broker-based applications with minimal changes.
- SQS delay queues // Delay queues postpone when newly sent messages become visible to consumers, for up to 15 minutes; visibility timeout starts after a message is received.

## Content Domain 2: Design Resilient Architectures

### Practice-test additions — Task 2.2

- Amazon RDS storage autoscaling // Automatically increase allocated database storage as free space runs low, up to a configured maximum, without changing the DB instance class.

## Content Domain 3: Design High-Performing Architectures

### Practice-test additions — Task 3.2

- EC2 hibernation // Hibernation saves RAM contents to the encrypted EBS root volume and restores running processes on start; the instance must meet hibernation prerequisites.
- Auto Scaling AZ rebalancing // When an Auto Scaling group is uneven across Availability Zones, it launches replacement capacity before terminating instances to rebalance distribution.
- Auto Scaling on SQS backlog // Scale worker capacity using backlog per instance, commonly ApproximateNumberOfMessages divided by the number of running instances.
- EBS Fast Snapshot Restore // Fast Snapshot Restore initializes volumes created from a snapshot so they deliver full provisioned performance immediately.
- EBS Fast Snapshot Restore // Make volumes created from a snapshot fully initialized at provisioned performance immediately after creation.
- S3 per-prefix request performance // Distribute high request rates across multiple object key prefixes to scale S3 request throughput.

## Content Domain 3: Design High-Performing Architectures

### Practice-test additions — Task 3.4

- NAT instance capabilities // A self-managed EC2 NAT instance can support port forwarding and security groups and can be used as a bastion, but requires customer-managed availability and scaling.
- Availability Zone IDs // AZ IDs identify the same physical Availability Zone consistently across accounts; AZ names can map to different physical zones in different accounts.
- Route 53 geoproximity routing // Route 53 geoproximity routes based on resource and user locations; a bias expands or shrinks the geographic area serving a resource.

## Content Domain 3: Design High-Performing Architectures

### Practice-test additions — Task 3.3

- Amazon RDS Proxy // RDS Proxy pools and shares database connections, reducing connection pressure and improving application resilience during failover.
- Aurora Replicas // Aurora Replicas share the cluster volume, provide read scaling with low replication lag, and can be added automatically with Aurora Auto Scaling.
- Amazon Aurora Global Database // Replicate an Aurora cluster across Regions for low-latency local reads and cross-Region disaster recovery.
- Amazon RDS Proxy // Pool and reuse database connections to improve application scalability and resilience for supported relational databases.
- Amazon Aurora Replicas // Scale Aurora reads with replicas that share the cluster volume and can be added automatically as demand changes.
- Amazon Redshift Serverless // Run and scale a Redshift data warehouse without provisioning or managing a fixed cluster.
- Aurora I/O-Optimized // Choose Aurora storage pricing without per-I/O charges for applications with high or unpredictable database I/O.
- DynamoDB on-demand capacity mode // Pay per request and let DynamoDB adapt read/write capacity for unpredictable workloads without capacity planning.

## Content Domain 3: Design High-Performing Architectures

### Practice-test additions — Task 3.1

- Amazon FSx for Lustre // Provide a high-performance parallel file system for compute-intensive workloads, with optional linkage to S3 data.

## Content Domain 4: Design Cost-Optimized Architectures

### Practice-test additions — Task 4.1

- S3 Standard // General-purpose object storage for frequently accessed data; no retrieval charge or minimum storage duration applies.
- S3 One Zone-IA // Lower-cost S3 storage for infrequently accessed, noncritical or recreatable data kept in one Availability Zone; it is less resilient than multi-AZ classes.
- AWS Storage Gateway cached volumes // Present iSCSI block volumes to on-premises applications, keep frequently accessed data in a local cache, and store primary volume data in S3.
- S3 Storage Class Analysis // Analyze object access patterns to recommend when data may move from S3 Standard to S3 Standard-IA; it does not automatically transition objects.

## Content Domain 4: Design Cost-Optimized Architectures

### Practice-test additions — Tasks 4.2–4.4

- AWS Cost Anomaly Detection // Use machine learning to identify unusual spending patterns and alert stakeholders without requiring a fixed spend threshold.
- AWS Cost Optimization Hub // Consolidate and prioritize cost-saving recommendations from AWS services and accounts, including rightsizing and idle-resource opportunities.

## Content Domain 4: Design Cost-Optimized Architectures

### Practice-test additions — Task 4.2

- EC2 Dedicated Hosts // Reserve a physical EC2 server for one customer to gain host-level visibility and support eligible server-bound software licenses.
