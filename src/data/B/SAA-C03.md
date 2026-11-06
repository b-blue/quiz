# AWS SAA-C03 Study Guide

Organized by AWS product: each service appears once, with its definitions, features, limits and exam cues as bullets.

## Compute

### Amazon EC2


Amazon Elastic Compute Cloud provides resizable virtual machines with control over operating system, CPU, memory, storage, and networking. Choose EC2 when an application needs server-level control, custom software, or long-running compute.

#### What it is
- **Infrastructure as a service**: AWS supplies virtual machines; you choose and manage the OS, applications, and instance configuration.
- EC2 commonly combines with **EBS or instance store** for storage, **Elastic Load Balancing** to distribute traffic, and **Amazon EC2 Auto Scaling** to adjust fleet size.
- Instances run in a selected **Region and Availability Zone** and can use Linux, Windows, or macOS images where supported.

#### Instance types
- Instance names encode **family, generation, and size**; for example, `m5.2xlarge` is an M-family, fifth-generation, 2xlarge instance.
- **General purpose** M/T instances balance CPU, memory, and networking for web servers, application servers, and development environments.
- **Compute optimized** C instances suit CPU-bound work such as batch processing, media transcoding, scientific modeling, high-performance web servers, and gaming.
- **Memory optimized** R/X instances suit in-memory databases, caches, large data sets, and real-time analytics.
- **Storage optimized** I/D/H instances emphasize high local-storage I/O for NoSQL or OLTP databases, data warehouses, and distributed file systems.
- **Accelerated computing** instances use GPUs or other specialized accelerators for machine learning, graphics, and parallel processing; **HPC optimized** instances target tightly coupled high-performance computing.
- **Burstable T instances** accumulate CPU credits while below their baseline and spend credits to burst above it; sustained CPU use can exhaust credits or incur surplus-credit charges in Unlimited mode.
- **Nitro System** offloads virtualization, storage, and networking functions to dedicated hardware and supports high I/O performance, bare-metal options, and hardware-based security.

#### Purchase options and capacity
- **On-Demand** has no term or upfront commitment and is suitable for short-lived, unpredictable, or interruption-intolerant workloads; Linux and Windows instances are generally billed per second with a 60-second minimum, while some licensed OS charges are hourly.
- **Standard Reserved Instances** commit for **1 or 3 years** to matching attributes and can discount steady-state use by up to **72%** versus On-Demand; Regional reservations provide billing flexibility, while Zonal reservations also reserve capacity in one AZ.
- **Convertible Reserved Instances** can be exchanged for different instance families, operating systems, or tenancy, with less discount than Standard RIs (up to **66%** in the course comparison); RIs are billing discounts, not automatically capacity reservations unless Zonal.
- **Savings Plans** commit to a steady hourly spend for **1 or 3 years** and can discount eligible use by up to **72%**; an EC2 Instance Savings Plan is tied to an instance family and Region but allows size, OS, and tenancy flexibility, while a Compute Savings Plan is broader.
- **Spot Instances** use spare capacity and can cost up to **90% less** than On-Demand; use them for fault-tolerant, distributed, batch, or flexible-time work, not critical uninterrupted services or databases. A one-time request is fulfilled once, while a persistent request can be reopened after interruption; canceling a request does not terminate an already-running instance.
- A Spot interruption can give a **two-minute warning** before stop or termination; design jobs for interruption and checkpoint/retry. Spot Fleets can combine Spot and optional On-Demand capacity across pools and optimize for lowest price, diversification, capacity, or price-capacity (the recommended general strategy).
- **Dedicated Hosts** reserve a physical server for your use, provide visibility/control over placement, and support socket/core-based BYOL licensing and compliance; they are usually the most expensive option and can be On-Demand or Reserved, with 1- or 3-year reservations offering up to 70% off in the course comparison.
- **Dedicated Instances** run on hardware dedicated to one account but may share it with that account's other instances; placement is not controlled and can change after stop/start, and they generally cost less than Dedicated Hosts when host-level placement and license visibility are unnecessary.
- **Capacity Reservations** reserve matching On-Demand capacity (including instance type and platform) in a specific AZ for any duration and can be created or canceled at any time; they have no discount and are billed at On-Demand rates even when unused, but can combine with RIs or Savings Plans for discounts.

#### Networking and security
- A **security group** is a stateful, instance-level virtual firewall containing allow rules for inbound and outbound traffic; inbound is blocked by default and outbound is allowed by default until changed.
- Security groups can be attached to multiple instances, reference other security groups, and permit IPv4/IPv6 CIDRs; they are scoped to a VPC and Region, and blocked packets do not reach the instance.
- Common ports: **22 SSH/SFTP**, **21 FTP**, **80 HTTP**, **443 HTTPS**, and **3389 RDP**; a timeout often points to network filtering, while connection-refused usually means the application or listener is not running.
- An **ENI** is a movable virtual network card in one AZ with private IPv4 addresses, security groups, a MAC address, and optional public IPv4/Elastic IP addressing; attaching a prepared ENI to another instance can support failover.
- **ENA / Enhanced Networking** provides higher bandwidth and lower latency through network-interface hardware offload; **EFA** adds OS-bypass communication for tightly coupled HPC and machine-learning workloads.
- **Instance store** is fast, host-attached ephemeral storage suited to cache or scratch data; it cannot be detached and moved, is not captured in an AMI, and should not be the only copy of durable data. An instance's auto-assigned public IPv4 can change after stop/start; an **Elastic IP** is a static public IPv4 address that can be remapped to another instance, but avoid it when DNS or a load balancer is a better design. The default account quota is **5 Elastic IPs** and can be raised by request.
- **IMDS** provides instance-local metadata and temporary credentials; prefer **IMDSv2**, which requires a session token, and do not expose metadata endpoints to untrusted workloads.
- An **instance profile** associates an IAM role with an EC2 instance so applications can obtain temporary credentials instead of embedding long-lived access keys.

#### Images, bootstrap, and lifecycle
- An **AMI** is a Region-scoped machine image containing an OS and optional software/configuration; public, private, and Marketplace AMIs can launch instances, and an AMI can be copied to another Region.
- Creating an AMI from an instance after stopping it for data integrity captures its configuration and creates EBS snapshots, enabling repeatable launches and faster bootstrapping from a prebuilt image.
- **User data** runs bootstrap commands as root, typically only on first boot; use it for initial setup such as installing packages, updates, or common files.
- **Stop** preserves EBS data for a later start; termination deletes EBS volumes whose DeleteOnTermination setting is enabled (the root volume is enabled by default).
- **Hibernate** writes memory state to an encrypted EBS root volume so the OS and applications resume without a full initialization; supported configurations require EBS-backed encrypted root storage, RAM below **150 GB**, and hibernation for no more than **60 days**.
- Hibernation supports selected instance families (including **C3/C4/C5, I3, M3/M4, R3/R4, and T2/T3**) and Amazon Linux, Ubuntu, RHEL, CentOS, and Windows AMIs; RAM must be no greater than **150 GiB**, and the encrypted EBS root volume must have enough space for its memory image. It is available with On-Demand, Reserved, and Spot instances, but not bare-metal sizes.

#### Placement groups
- A **Cluster** placement group packs instances in one AZ for low latency and high throughput; with Enhanced Networking, inter-instance bandwidth can reach **10 Gbps** in the course examples, but an AZ failure can affect the whole group.
- A **Spread** placement group places instances on distinct underlying hardware, can span AZs, and is limited to **7 instances per AZ per group**; use it for a small number of critical, failure-isolated instances.
- A **Partition** placement group separates racks into partitions, supports up to **7 partitions per AZ** and hundreds of instances, can span AZs, and exposes partition information through metadata; use it for distributed systems such as Kafka, Cassandra, or HDFS.

#### Availability and recovery
- **Instance status checks** cover both instance reachability (OS/software/network configuration) and system reachability (underlying AWS host/network); inspect the failed layer before troubleshooting.
- **System status-check auto recovery** can move a supported EBS-backed instance to healthy hardware while retaining its instance ID, private and Elastic IP addresses, metadata, and public IPv4; it does not preserve RAM and does not apply to instance-store-backed instances. A **reboot alarm action** addresses instance status-check failures instead of moving the instance to new hardware.
- An instance status-check failure generally requires guest OS or application remediation; automatic recovery targets eligible underlying-system failures, not every unhealthy application.

#### Compared with
- Use **AWS Lambda** for short event-driven functions without server management, **AWS Batch** for queued jobs with flexible runtimes and no Lambda execution-time ceiling, and **AWS Fargate** for containers without managing hosts.
- Use **Amazon Lightsail** for a simpler bundled VPS experience, and **AWS Elastic Beanstalk** when deploying application code through a managed platform that provisions common EC2 infrastructure.
- **See also:** Amazon EC2 Auto Scaling, Elastic Load Balancing, Amazon ECS, Amazon EKS, AWS Batch

### Amazon EC2 Auto Scaling


Amazon EC2 Auto Scaling maintains an EC2 fleet at a desired capacity and scales it in response to demand or schedules. Choose it for resilient, elastic EC2 fleets that must recover unhealthy instances and balance capacity across AZs.

#### What it is
- An **Auto Scaling group (ASG)** defines minimum, desired, and maximum capacity, launches EC2 instances to meet desired capacity, and replaces instances it considers unhealthy.
- ASGs can automatically register instances with a load balancer and distribute the fleet across selected subnets/AZs; the service has no separate charge beyond its AWS resources.
- A **launch template** specifies AMI, instance type, user data, EBS volumes, security groups, key pair, IAM instance profile, network/subnets, and other launch settings; it supports versioning and overrides for mixed instance groups. Older launch configurations are deprecated in favor of launch templates.

#### Scaling policies
- **Target tracking** adjusts capacity to keep a metric near a target, such as average CPU utilization or ALB requests per target; it is the simplest dynamic policy for maintaining a stable metric.
- **Step scaling** responds to CloudWatch alarm thresholds with different capacity changes for different levels of demand; **simple scaling** is an older alarm-based option.
- **Scheduled scaling** changes minimum, maximum, or desired capacity at known times; **predictive scaling** forecasts recurring future demand and schedules capacity in advance, and can be combined with dynamic scaling.
- Useful signals include average CPU, network throughput, custom CloudWatch metrics, and **ALB RequestCountPerTarget**; pick a metric that reflects application load rather than an unrelated resource.
- **Cooldown** allows launched/terminated instances and metrics to stabilize before another simple scaling action; the default cooldown is **300 seconds**. Target tracking and step scaling use instance warmup behavior rather than the simple-scaling cooldown.

#### Health and lifecycle
- EC2 health checks detect instance/host problems; enabling **ELB health checks** also lets the group replace an instance the load balancer marks unhealthy.
- The **health-check grace period** lets a newly launched instance finish startup before ASG health evaluation; set it to match real application initialization time.
- **Lifecycle hooks** pause launch or termination in a wait state so automation can install software, register, drain connections, or save state before the instance proceeds; heartbeats can extend the wait within the hook's configured timeout.
- **Instance refresh** replaces instances in a rolling manner after a launch-template or AMI update; configure minimum healthy capacity, instance warmup, checkpoints, and optional rollback to control risk.
- **Warm pools** keep initialized stopped, hibernated, or running instances ready to enter the group, reducing scale-out startup latency at additional storage/compute cost.

#### Balancing and termination
- **AZ rebalancing** redistributes instances when the group becomes uneven across AZs, including after capacity changes; it launches replacement capacity before terminating instances in overrepresented AZs to preserve availability, unlike unhealthy-instance replacement which terminates the unhealthy instance first.
- The **termination policy** selects which instances to remove during scale-in; the default first selects an AZ with the most instances and generally chooses an instance using the oldest launch template/configuration in that AZ, helping rebalance the fleet.
- **Standby** places an instance in the group but removes it from service so it can be patched or investigated; suspended processes can selectively pause actions such as ReplaceUnhealthy.
- **See also:** Amazon EC2, Elastic Load Balancing

### Elastic Load Balancing


Elastic Load Balancing distributes incoming connections across healthy targets and provides a managed, highly available endpoint. Choose a load balancer to spread traffic, perform health checks and TLS termination, and integrate with EC2 Auto Scaling, ECS, ACM, CloudWatch, Route 53, and WAF.

#### What it is
- A **listener** accepts a protocol/port and applies a default action plus optional rules; a **target group** contains registered destinations and its own health-check configuration.
- Load balancers can be **internet-facing or internal**; AWS manages the load balancer fleet, maintenance, and availability, while you configure listeners, targets, routing, and security.
- Health checks probe a configured protocol, port, and path; unhealthy targets stop receiving new traffic until healthy again.

#### Application Load Balancer
- **Application Load Balancer (ALB)** operates at Layer 7 for HTTP/HTTPS and supports HTTP/2, WebSockets, redirects, and content-based listener rules.
- ALB rules can route on **host, path, HTTP headers, query strings, and source IP**, making ALB a strong fit for microservices, web apps, and container services.
- ALB target groups support EC2 instances, ECS tasks, private IP addresses, and **Lambda functions**; ALB translates HTTP requests into Lambda JSON events and can use dynamic port mapping for ECS.
- ALB supports **AWS WAF**, security groups, and multiple target groups; HTTPS listeners can authenticate users with Amazon Cognito before forwarding, and health checks are configured at target-group level.
- The target application does not directly see the original client connection; ALB provides the client address and request details in **X-Forwarded-For**, **X-Forwarded-Port**, and **X-Forwarded-Proto** headers.

#### Network Load Balancer
- **Network Load Balancer (NLB)** operates at Layer 4 for TCP, TLS, UDP, and TCP_UDP traffic and targets very high throughput with very low latency.
- NLB provides a **static IP address per AZ** and supports an Elastic IP per enabled AZ, useful for IP allowlists and fixed-address requirements.
- NLB target groups support instances, private IP addresses, and an ALB; health checks can use TCP, HTTP, or HTTPS.
- NLB supports **Proxy Protocol v2** for passing connection metadata to targets that need it; configure target software to parse the protocol where enabled.
- NLB can use security groups when created with security groups; one created without them cannot later have security groups attached.

#### Gateway Load Balancer
- **Gateway Load Balancer (GWLB)** operates at Layer 3 and combines a transparent network gateway with load balancing for third-party virtual appliances.
- GWLB distributes IP traffic to fleets such as firewalls, intrusion detection/prevention, and deep packet inspection appliances using **GENEVE on port 6081**.
- GWLB target groups accept instances or private IP addresses; route tables steer traffic through the gateway for inspection and onward forwarding.

#### Classic Load Balancer
- **Classic Load Balancer (CLB)** is the legacy generation; it supports TCP/SSL at Layer 4 and HTTP/HTTPS at Layer 7 with TCP/HTTP health checks.
- CLB has a fixed AWS hostname and supports only one SSL certificate, so it lacks newer ALB host/path rules and multi-certificate SNI behavior; prefer ALB or NLB for new designs.

#### Shared features and selection
- **Sticky sessions** use cookies to send a client repeatedly to the same target; they can preserve target-local session state but may create uneven load. ALB/CLB duration cookies are named **AWSALB/AWSELB**; ALB application cookies include **AWSALBAPP**, and custom target-generated cookie names must not use reserved ELB names. The cookie expiration can be configured.
- - **Security groups** — For a public application, the load balancer security group admits client traffic while target security groups should admit application traffic only from the load balancer security group.
- **Cross-zone load balancing** distributes each node's requests across targets in all enabled AZs; it is enabled by default for ALB (disable at target-group level), disabled by default for NLB/GWLB/CLB, and enabling it incurs inter-AZ data charges for NLB/GWLB but not ALB/CLB in the course behavior.
- **Connection draining / deregistration delay** stops new requests to a deregistering target while existing requests finish; the configurable period is **1-3600 seconds** and defaults to **300 seconds** for the classic/ALB/NLB behavior described in the course.
- TLS listeners use an **X.509 certificate** managed by ACM or uploaded by you; HTTPS listeners need a default certificate and can attach additional certificates.
- **SNI** lets one listener choose the right certificate from the requested hostname; ALB and NLB support multiple certificates with SNI, while CLB does not.
- Choose **ALB** for HTTP-aware routing, **NLB** for static IPs, TCP/UDP, and extreme performance, and **GWLB** for transparent network appliance inspection; CLB is mainly encountered in legacy systems.
- **See also:** Amazon EC2, Amazon EC2 Auto Scaling, AWS WAF, AWS Certificate Manager

### AWS Lambda


AWS Lambda runs code on demand without managing servers and scales with event volume. Choose it for short, event-driven functions and service integrations; use containers or EC2 for long-running work, arbitrary runtimes, or greater host control.

#### What it is
- **Function as a service**: upload code or a supported container image, configure memory, timeout, and an execution role, then invoke it directly or from an event source.
- Lambda scales execution environments automatically and charges mainly for requests and execution duration; adding memory also increases allocated CPU and network performance. The course pricing example includes **1 million requests and 400,000 GB-seconds per month** in its free tier, then **$0.20 per million requests** plus duration charges metered in **1-ms increments** (the example rate is **$1 per 600,000 GB-seconds**; rates vary by architecture and Region).
- Supported managed runtimes include Node.js, Python, Java, .NET, and Ruby; custom runtimes use the Lambda Runtime API. CloudWatch provides execution metrics, logs, alarms, and monitoring integrations.

#### Limits and deployment
- Memory is configurable from **128 MB to 10,240 MB** in 1-MB increments, and a single invocation can run for at most **900 seconds (15 minutes)**.
- Ephemeral `/tmp` storage is configurable from **512 MB to 10,240 MB**; environment variables are limited to **4 KB**.
- A direct ZIP upload is limited to **50 MB compressed**; the uncompressed package plus layers is limited to **250 MB**. Container images can be up to **10 GB** and must implement the Lambda Runtime API.
- Synchronous request and response payloads are normally limited to **6 MB** each; asynchronous invocation payloads are limited to **1 MB**. Event-source-specific batch and record limits also apply.
- Lambda has a default regional concurrency quota of **1,000** concurrent executions, adjustable by request; each account's available unreserved concurrency is shared across functions.
- Function code runs in a managed execution environment; Lambda is not a fit for indefinitely running processes or arbitrary Docker images that do not implement its runtime interface.

#### Invocation and event sources
- **Synchronous invocation** (for example API Gateway, ALB, Function URLs, or SDK calls) waits for the function response and returns execution errors to the caller; callers control their own retry behavior.
- **Asynchronous invocation** (for example S3, SNS, or EventBridge) queues an event and returns before execution; Lambda retries function errors by default and can deliver exhausted events to a dead-letter queue or destination.
- **Event source mappings** poll services such as SQS, Kinesis Data Streams, DynamoDB Streams, and Kafka, batch records, and invoke the function; successful records are checkpointed or deleted according to the source.
- For an SQS mapping, messages are deleted after successful processing; failures become visible for retry after the visibility timeout and can use queue redrive/DLQ policies, so handlers should be idempotent.
- **S3, EventBridge, and SNS** are push-based asynchronous sources, whereas SQS/Kinesis/DynamoDB Streams mappings poll the source; the invocation model affects ordering, retries, and scaling. Other common integrations include API Gateway, CloudFront, Cognito, and CloudWatch Logs/Events; an S3 upload can trigger thumbnail creation and metadata writes to DynamoDB.

#### Errors and delivery
- Asynchronous function errors are retried **twice by default**; throttling and system errors may be retried for up to **6 hours**, with backoff, before expiry or failure handling.
- An asynchronous **DLQ** receives failed event payloads; **destinations** can route success or failure invocation records to services such as SQS, SNS, EventBridge, or another Lambda. Synchronous throttles are returned to the caller as **HTTP 429**; asynchronous failures are queued for retry.
- Event source mappings have source-specific retry, visibility, checkpoint, and redrive behavior; configure partial batch responses where supported to avoid retrying already successful records.
- Lambda handlers should be **idempotent** because events may be delivered more than once, and asynchronous retries can reprocess work.

#### Concurrency and latency
- **Reserved concurrency** sets a function's concurrency ceiling and reserves that amount from the account pool, isolating capacity and limiting downstream pressure; excess synchronous requests are throttled.
- **Provisioned concurrency** keeps a configured number of execution environments initialized to reduce cold-start latency; it incurs charges while provisioned and can be scaled by Application Auto Scaling.
- A **cold start** initializes a new environment, loads code, and runs initialization outside the handler; smaller packages and initialization work reduce its impact.
- **SnapStart** publishes a snapshot of initialized memory/disk state for supported runtimes, reducing initialization latency without a full cold start; the course examples cite Java, Python, and .NET and up to **10x** faster startup at no additional SnapStart charge.

#### Versions, aliases, and shared code
- A **published version** is an immutable snapshot of function code and configuration; `$LATEST` remains the mutable working version.
- An **alias** is a stable named pointer to a version and can split traffic between versions for gradual rollout or rollback.
- **Lambda layers** package shared libraries or other dependencies for reuse; a function can attach up to **5 layers**, mounted under `/opt`, and layer contents count toward deployment-size limits.
- **Function URLs** provide a built-in HTTPS endpoint for a function, with `AWS_IAM` or `NONE` authentication; use API Gateway when richer API management, authorization, or request transformation is required.

#### Security, networking, and databases
- The **execution role** grants the running function permission to call AWS services; a trigger or caller may separately need a resource-based policy allowing invocation. Cross-account S3 access requires both the function role and bucket policy to allow the requested access.
- By default a function runs outside your VPC and cannot reach private VPC resources; configure VPC ID, subnets, and security groups to access private RDS, ElastiCache, or internal load balancers.
- VPC attachment creates network interfaces in selected subnets; private-subnet internet access requires NAT or an appropriate endpoint, and the function's security group must allow traffic to the destination.
- Lambda functions that open many database connections can overwhelm RDS; **RDS Proxy** pools and reuses connections and requires the function to reach the proxy in the VPC.
- RDS for PostgreSQL and Aurora MySQL can invoke Lambda for database-event workflows when outbound connectivity and both IAM/resource-based permissions are configured.

#### Edge computing
- **CloudFront Functions** are lightweight JavaScript handlers for viewer request/response events, with sub-millisecond execution and very high request rates; use them for header, URL, cookie, and cache-key changes.
- **Lambda@Edge** uses Node.js or Python for viewer and origin request/response events and supports longer-running logic, network access, and larger packages; author the function in **us-east-1** for CloudFront replication.
- CloudFront Functions cannot access the network, filesystem, or request body; they have sub-millisecond execution, a **2 MB** memory limit, and a **10 KB** package limit. Lambda@Edge supports network/filesystem/body access and viewer plus origin events, with **5-10 seconds** execution and packages of roughly **1-50 MB**; it has higher latency/cost and lower scale than CloudFront Functions.
- **See also:** Amazon EC2, Amazon API Gateway, Amazon S3, Amazon SQS, Amazon ECS, Amazon RDS Proxy

### AWS Batch


AWS Batch schedules and runs large numbers of batch jobs using managed compute environments. Choose it for queued, finite jobs whose compute needs vary or whose runtime exceeds Lambda's limits.

#### What it is
- A **job definition** describes the container image, resources, and job settings; a **job queue** holds work and a **compute environment** supplies capacity.
- Batch schedules dependencies and priorities, provisions suitable compute, and can use EC2, Spot Instances, or Fargate-backed environments; jobs commonly run as ECS/EKS tasks.
- Jobs have a start and finish rather than continuously serving requests; packaged Docker runtimes can use EBS or instance-store disk and have no Lambda-style 15-minute timeout.
- Use Spot for interruption-tolerant work and On-Demand/Fargate for jobs that require more predictable availability; implement retries/checkpointing for interrupted work.
- AWS Batch can run **hundreds of thousands of jobs** at scale. Common workloads include data processing, scientific modeling, media processing, and scheduled file transformations; Batch handles scheduling and capacity rather than application-specific job logic.
- **See also:** Amazon EC2, Amazon ECS, Amazon EKS, AWS Lambda, AWS Fargate

### AWS Elastic Beanstalk


AWS Elastic Beanstalk deploys application code through a managed application platform while exposing the underlying AWS configuration. Choose it when you want AWS to provision common web-application components without writing their orchestration yourself.

#### What it is
- Beanstalk manages capacity provisioning, load balancing, scaling, instance configuration, and application health monitoring using resources such as EC2, Auto Scaling, ELB, and optionally RDS.
- The service itself has no additional charge; you pay for the EC2, load balancer, database, and other resources it creates.
- An **application** groups environments, versions, and configurations; an **application version** is a code iteration, and an **environment** runs one application version at a time.
- **Web server environments** serve requests through a load balancer or single instance; **worker environments** consume SQS messages and can scale based on queue depth.
- A single-instance environment suits development; a load-balanced Auto Scaling environment suits production and high availability.
- Supported platforms include Go, Java, .NET, Node.js, PHP, Python, Ruby, and Docker variants; platform versions and deployment options depend on the chosen platform.
- Developers remain responsible for application code and can customize underlying resources; Beanstalk is not a fully serverless runtime and does not remove all infrastructure decisions.
- **See also:** Amazon EC2, Amazon EC2 Auto Scaling, Elastic Load Balancing, Amazon SQS

### Amazon Lightsail


Amazon Lightsail packages virtual servers and common application infrastructure into a simplified, predictable-price service. Choose it for small websites, development, and simple workloads that do not need the full EC2 configuration surface.

#### What it is
- Lightsail provides bundled virtual private servers (instances) with plans that include a set amount of compute, SSD storage, and data transfer; plan features and prices vary by Region.
- Blueprints and preconfigured applications make it quick to launch common operating systems and web stacks; optional services include managed databases, containers, block storage, snapshots, DNS, static IPs, and load balancers.
- Lightsail manages much of the networking and server setup, while instance-level OS patching and application administration remain the customer's responsibility.
- Use EC2 for specialized instance families, detailed networking/IAM controls, large-scale architectures, or precise placement and capacity needs; Lightsail instances can be connected to or migrated toward broader AWS services.
- **See also:** Amazon EC2, AWS Elastic Beanstalk

### AWS Outposts, Local Zones, and Wavelength


These AWS infrastructure extensions place selected services closer to users, on-premises systems, or 5G devices. Outposts examples include EC2, EBS, S3, EKS, ECS, RDS, and EMR; choose the option based on whether the requirement is a customer data center, a metro area, or a carrier edge.

#### What it is
- **AWS Outposts** installs AWS-managed infrastructure in a customer's data center, extending supported AWS services and APIs on premises for low-latency access, local processing, data residency, and migration; the customer remains responsible for physical security and site readiness.
- **AWS Local Zones** extend selected compute, storage, and other services into a metro area to serve latency-sensitive users or workloads that need data processing near a city but do not require a customer-owned data center.
- **AWS Wavelength** embeds AWS infrastructure in telecommunications providers' 5G networks so mobile applications can reach compute with very low latency without leaving the carrier network.
- The three options provide subsets of regional AWS services, not every service or feature; verify supported services and locations before designing a workload.
- **See also:** Amazon EC2, Amazon ECS, Amazon EKS

### AWS Serverless Application Model (SAM)


AWS SAM is an open-source framework for defining and deploying serverless applications as infrastructure as code. Choose it to simplify repeatable CloudFormation deployments of Lambda-centric applications.

#### What it is
- A SAM template extends **AWS CloudFormation** with concise resource types for functions, APIs, and other serverless components; a transform expands the shorthand into CloudFormation resources.
- The **SAM CLI** can build, test, invoke, and package applications locally or for deployment, including container-based local testing for supported runtimes.
- SAM deploys through CloudFormation, so stacks, change sets, IAM permissions, and CloudFormation rollback behavior apply.
- **See also:** AWS Lambda, Amazon API Gateway, AWS CloudFormation

### Choosing a compute service


Choose the service that best matches the control, runtime, duration, and operational effort the workload requires.

#### Exam cues
- Choose **Amazon EC2** when the requirement names OS/host control, persistent server processes, custom software, or a specific instance family, placement, or purchase model.
- Choose **Amazon EC2 Auto Scaling** with EC2 when capacity must track demand, recover failed instances, or remain balanced across AZs; use a load balancer when requests must reach only healthy targets.
- Choose **AWS Lambda** for short, event-driven code with automatic scaling and no server management; choose **AWS Batch** for queued, finite jobs with long runtimes or arbitrary container runtimes.
- Choose **Amazon ECS** for AWS-native container orchestration and **Amazon EKS** when Kubernetes API compatibility or existing Kubernetes operations are required.
- Choose **AWS Fargate** when ECS/EKS containers should run without provisioning worker instances; choose EC2 launch types when host access, specialized hardware, or cost control requires managing nodes.
- Choose **AWS Elastic Beanstalk** for managed deployment of conventional application code, **Amazon Lightsail** for a straightforward bundled VPS, and **AWS App Runner** for a managed web app/API from source or a container image.
- Choose **AWS Outposts** for AWS services in a customer's data center, **Local Zones** for metro-area latency, and **Wavelength** for 5G carrier-edge applications.
- **See also:** Amazon EC2, Amazon EC2 Auto Scaling, AWS Lambda, AWS Batch, Amazon ECS, Amazon EKS

## Containers

### Amazon ECS


Amazon Elastic Container Service is AWS's managed container orchestrator for scheduling and operating containerized applications. Choose it for AWS-native task and service management, with either customer-managed EC2 capacity or serverless Fargate capacity.

#### What it is
- An **ECS cluster** is a logical grouping of capacity; a **task definition** specifies one or more containers, image, CPU/memory, ports, logging, volumes, and IAM settings.
- A **task** is a running instance of a task definition; an ECS **service** maintains a desired number of tasks and replaces failed tasks.
- With the **EC2 launch type**, you provision EC2 instances and run the ECS agent on each host; AWS schedules and starts/stops containers, but you own host patching and capacity.
- With the **Fargate launch type**, define task CPU and memory and AWS runs tasks without customer-managed EC2 hosts; scale by changing the task count.

#### Identity and access
- The **task role** is assumed by application code inside a task and grants access to services such as S3 or DynamoDB; it is set in the task definition and can differ by service.
- The **task execution role** is used by ECS/Fargate agents to pull images from ECR, send logs to CloudWatch Logs, and retrieve referenced secrets; it is not the application's task role.
- On EC2 launch type, the host **instance profile** is used by the ECS agent and host; avoid using host credentials as a substitute for per-task roles.

#### Scaling and integrations
- **ECS Service Auto Scaling** changes the desired task count using target tracking, step, or scheduled scaling; common metrics include service CPU/memory and ALB requests per target.
- EC2 capacity is scaled separately through an Auto Scaling group; an ECS **capacity provider** can connect the cluster to an ASG and add hosts when tasks need more CPU or memory.
- **ALB** is the common choice for HTTP/HTTPS routing to ECS tasks and supports dynamic host port mapping; **NLB** suits high-throughput TCP/UDP or PrivateLink scenarios, while CLB lacks modern features and does not support Fargate.
- **EventBridge** rules or schedules can run one-off ECS tasks for file processing, periodic batch work, and other event-driven workflows; SQS-backed services can scale workers with queue demand.
- EventBridge can also observe task state changes, such as stopped tasks, and trigger notifications or remediation.

#### Storage and hybrid
- ECS tasks can mount **EFS** on EC2 or Fargate for persistent shared files across AZs; Fargate with EFS offers shared storage without managing servers. ECS also supports **S3 Files** mounts for Fargate and ECS Managed Instances (not the EC2 launch type); changes synchronize to the S3 bucket.
- ECS supports task storage options including EBS volumes where configured; select storage based on whether data must persist, be shared, or be disposable with the task. Use EFS when tasks across AZs need shared files and a task-scoped EBS volume when block storage is required.
- **ECS Anywhere** registers customer-managed external instances (including on-premises servers) into ECS using the ECS agent and Systems Manager connectivity; customers maintain the external host infrastructure.
- **See also:** AWS Fargate, Amazon ECR, Elastic Load Balancing, AWS Batch, Amazon EKS

### Amazon EKS


Amazon Elastic Kubernetes Service provides a managed Kubernetes control plane on AWS. Choose it when Kubernetes compatibility, existing Kubernetes skills, or portability across environments matters more than using the ECS API.

#### What it is
- **Kubernetes** orchestrates container workloads using objects such as Pods, Deployments, Services, and namespaces; a Deployment maintains replicas and supports controlled rollouts.
- EKS manages the Kubernetes control plane; worker capacity can use EC2 nodes or Fargate, and each Region requires its own EKS cluster for regional deployments.
- EKS is an alternative to ECS with Kubernetes APIs and ecosystem; use CloudWatch Container Insights or compatible tools for cluster logs and metrics.

#### Node types and scaling
- **Managed node groups** create and manage EC2 worker nodes in an EKS-managed Auto Scaling group and support On-Demand or Spot capacity.
- **Self-managed nodes** are customer-created EC2 instances registered to the cluster, usually in an Auto Scaling group; EKS-optimized AMIs are available, and nodes can use On-Demand or Spot Instances.
- **Fargate profiles** select Pods to run on serverless Fargate capacity without managing worker nodes; use EC2 nodes when host access or specialized node configuration is needed.

#### Storage and hybrid
- Kubernetes storage uses a **StorageClass** and CSI driver; EKS supports EBS, EFS, FSx for Lustre, and FSx for NetApp ONTAP through appropriate drivers. The Kubernetes Cluster Autoscaler can adjust an EC2 Auto Scaling group when Pods cannot be scheduled for lack of worker capacity.
- **EBS** is AZ-scoped block storage for eligible Pods on EC2 nodes; **EFS** provides shared file storage and can be used with Fargate Pods.
- **EKS Anywhere** provisions and operates Kubernetes clusters on customer-managed on-premises or edge infrastructure using EKS tooling; it is distinct from the AWS-managed EKS control plane.
- **See also:** Amazon ECS, AWS Fargate, Amazon ECR, AWS Outposts

### AWS Fargate


AWS Fargate is serverless compute for containers used by Amazon ECS and Amazon EKS. Choose it when you want task- or Pod-level capacity without provisioning or maintaining worker instances.

#### What it is
- Specify container CPU and memory and Fargate runs the task or selected Pod; there are no customer-managed EC2 hosts to patch or scale.
- Billing is based on requested vCPU, memory, and execution duration, with platform-specific minimums and additional ephemeral-storage options.
- Fargate removes host administration but does not replace ECS/EKS orchestration, task definitions, IAM roles, networking, or application operations.
- **See also:** Amazon ECS, Amazon EKS, AWS Batch

### Amazon ECR


Amazon Elastic Container Registry is a managed registry for storing and distributing container images. Choose it to keep container artifacts near AWS compute services with IAM-controlled access.

#### What it is
- ECR provides **private and public repositories** for container images and integrates with ECS, EKS, and AWS Batch; images are stored durably using Amazon S3-backed infrastructure.
- IAM policies control repository and image access; task execution roles commonly authorize ECS/Fargate image pulls.
- ECR supports image tags and immutable digests, image scanning, lifecycle policies, and repository replication; configure scanning and policies to match security and retention needs.
- **See also:** Amazon ECS, Amazon EKS, AWS Fargate, AWS Batch

### AWS App Runner


AWS App Runner builds and runs web applications and APIs from source code or a container image without requiring you to manage load balancers or container clusters. Choose it for a straightforward managed web service rather than custom orchestration.

#### What it is
- App Runner can deploy from a source repository or Amazon ECR image, build with managed runtimes or a configuration file, and automatically deploy new revisions when configured to track source changes.
- It provisions and scales the web service, provides an HTTPS endpoint and managed TLS integration, and can connect outbound to private VPC resources through a VPC connector.
- App Runner is optimized for web applications and APIs, not general-purpose batch jobs, arbitrary background services, or workloads requiring direct control of hosts and cluster scheduling.
- **See also:** Amazon ECR, Amazon ECS, AWS Elastic Beanstalk

## Storage

### Amazon S3


Amazon S3 is highly durable, scalable object storage for backups, archives, data lakes, media, software distribution, application assets, and static websites. Choose it for objects accessed through APIs rather than a mounted POSIX file system or block device.

#### What it is
- A **bucket** is created in a Region; its name is unique within the applicable S3 namespace, while object keys are full names such as `folder/file` rather than real directories; bucket names use lowercase letters/numbers and hyphens, not underscores or IP-address form.
- An **object** comprises a key, content, metadata, optional tags (up to **10**), and a version ID when versioning is enabled; maximum object size is **5 TB**.
- S3 is designed for **99.999999999% (11 nines) durability**; the slide equates that rate to one lost object per 10 million objects on average every 10,000 years, while One Zone classes keep data in one AZ.
- **Availability** varies by class; Standard at **99.99%** corresponds to about **53 minutes/year** unavailable, and all classes retain the cited 11-nines durability.
- S3 is a managed **object** store, not an attached block device or general-purpose shared file system.

#### Storage classes and lifecycle
- **S3 Standard** is for frequently accessed data, with low latency, high throughput, **99.99% availability**, and multi-AZ resilience; examples include analytics, gaming, and content distribution.
- **S3 Intelligent-Tiering** automatically shifts objects among access tiers based on use, has a small per-object monitoring fee, and charges no retrieval fee; its Frequent tier is the default, with automatic Infrequent after **30 days** and Archive Instant after **90 days** without access.
- Intelligent-Tiering's optional **Archive Access** tier can be configured from **90 to 700+ days** and optional **Deep Archive Access** from **180 to 700+ days**; objects must be restored before access from the asynchronous archive tiers, with retrieval commonly taking **3-5 hours** for Archive Access or **12-48 hours** for Deep Archive Access.
- **S3 Standard-IA** is multi-AZ for infrequently accessed data that still needs millisecond retrieval; it has **99.9% availability**, a **30-day** minimum duration, **128 KB** minimum billable object size, and per-GB retrieval charges.
- **S3 One Zone-IA** has the same millisecond access pattern and 30-day/128-KB minimums, but stores data in one AZ, has **99.5% availability**, and can lose data if that AZ is destroyed; use it for recreatable or secondary-copy data.
- **S3 Glacier Instant Retrieval** provides millisecond access for rarely accessed archives, with a **90-day** minimum, **128 KB** minimum billable object size, and per-GB retrieval charges.
- **S3 Glacier Flexible Retrieval** (formerly S3 Glacier) offers free Bulk retrieval in **5-12 hours**, Standard in **3-5 hours**, or paid Expedited in **1-5 minutes**; it has a **90-day** minimum and **40 KB** minimum billable object size.
- **S3 Glacier Deep Archive** is for long-term archives; Standard retrieval takes about **12 hours**, Bulk about **48 hours**, and the minimum duration is **180 days** with **40 KB** minimum billable object size.
- Archive storage pricing includes storage plus retrieval charges; Intelligent-Tiering's monitoring fee and S3 requests are separate cost considerations.
- A regional price comparison lists monthly storage examples per GB of **$0.023 Standard**, **$0.0025-$0.023 Intelligent-Tiering**, **$0.0125 Standard-IA**, **$0.010 One Zone-IA**, **$0.004 Glacier Instant Retrieval**, **$0.0036 Glacier Flexible Retrieval**, and **$0.00099 Deep Archive**; regional pricing can change.
- Storage-class availability differs: Standard is **99.99%**, Standard-IA and Glacier Instant Retrieval **99.9%**, One Zone-IA **99.5%**, and Flexible Retrieval and Deep Archive **99.99%**; all retain 11-nines object durability.
- **S3 Express One Zone** stores objects in a single-AZ directory bucket and is designed for hundreds of thousands of requests per second with single-digit-millisecond latency; the slide describes up to **10x** Standard performance and **99.95%** availability.
- Express One Zone is for latency-sensitive, data-intensive, AI/ML, financial-modeling, media-processing, and HPC workloads; co-locate compute in its AZ, and use integrations such as SageMaker training, Athena, EMR, and Glue.
- **Lifecycle rules** transition objects between eligible classes or expire them; rules can filter by prefix or tags and can target current/noncurrent versions or incomplete multipart uploads.
- Lifecycle rules support scheduled tiering (for example, move to Standard-IA after 60 days or Glacier after six months) and deletion (for example, expire logs after 365 days); archived data can be transitioned without immediate retrieval.
- Use versioning plus lifecycle rules to retain deleted versions for a recovery window, transition noncurrent versions to cheaper tiers, and later expire them; lifecycle transitions must follow supported class paths.
- **Storage Class Analysis** helps decide when Standard data should move to Standard-IA; reports update daily, may take **24-48 hours** to begin, and do not support One Zone-IA or Glacier classes.

#### Versioning, replication, and protection
- **Versioning** is enabled at the bucket level; overwriting a key creates another version, deletion usually creates a delete marker, and prior versions can be restored.
- Objects created before versioning is enabled retain a `null` version ID; suspending versioning does not remove existing versions.
- **Cross-Region Replication (CRR)** and **Same-Region Replication (SRR)** require versioning on source and destination and appropriate S3 permissions; replication is asynchronous and can cross accounts.
- Replication normally covers new objects; **S3 Batch Replication** can copy existing or previously failed objects, and replication is not chained through an intermediate bucket.
- Replication of delete markers is optional; permanent deletion of a particular version is not replicated, helping protect against malicious deletes.
- **Object Lock** requires versioning and provides WORM protection by version, using a fixed retention period or an indefinite legal hold.
- **Compliance mode** prevents any user, including root, from deleting or overwriting a locked version or shortening its retention; **Governance mode** permits specially authorized users to bypass or change the lock.
- **MFA Delete** requires MFA to permanently delete a version or suspend versioning; it does not require MFA to enable versioning or list deleted versions, and only the bucket owner/root can enable or disable it.
- **S3 Glacier Vault Lock** locks a vault policy into an unchangeable WORM retention policy; after locking, the policy cannot be edited or deleted.

#### Security and access
- Access can be granted through **IAM policies**, **bucket policies**, and object or bucket ACLs; an explicit deny overrides an allow, and ACLs can be disabled through Object Ownership's bucket-owner-enforced setting.
- **Bucket policies** are resource-based JSON policies for bucket/object resources; they can grant cross-account or public access and require encryption headers, while account- or bucket-level **Block Public Access** prevents accidental public exposure.
- S3 applies **SSE-S3** by default to new objects; bucket policies can reject uploads lacking required encryption headers, and policy evaluation happens before default encryption is applied.
- **SSE-S3** uses AWS-owned and managed **AES-256** keys; **SSE-KMS** uses KMS keys for user control and CloudTrail key-use auditing and consumes KMS API quota on uploads and downloads.
- **DSSE-KMS** applies two server-side encryption layers (KMS and an S3-managed key) for compliance needs, with higher cost and latency than SSE-KMS.
- **SSE-C** uses a customer-managed key supplied in every HTTPS request; S3 does not retain the key, and HTTPS is mandatory.
- With **client-side encryption**, the client encrypts before upload, decrypts after download, and manages the keys and encryption lifecycle itself.
- S3 supports HTTP and HTTPS endpoints; use HTTPS for encryption in transit and a bucket policy condition on `aws:SecureTransport` to deny insecure requests.
- **Presigned URLs** grant temporary GET or PUT access using the permissions of the signing principal; the console allows **1 minute-12 hours**, while CLI/SDK expiration can be up to **604,800 seconds (7 days)** (CLI default **3,600 seconds**).
- **Access Points** provide separate DNS names and policies for different applications, teams, or prefixes; a VPC-origin access point requires a VPC endpoint whose policy also allows the requested access.
- **S3 Object Lambda** uses a Lambda function behind an Object Lambda Access Point to transform an object on retrieval, such as redacting data, converting formats, or resizing/watermarking images.
- **CORS** configuration allows browser requests from specified origins and methods (or `*`); an origin is the scheme, host, and port, and browsers may first send an OPTIONS preflight request.

#### Performance and data operations
- S3 automatically scales; each key **prefix** supports at least **3,500 PUT/COPY/POST/DELETE** or **5,500 GET/HEAD requests per second**, with no limit on the number of prefixes; distributing traffic across prefixes raises aggregate throughput.
- **Multipart upload** is recommended for objects larger than **100 MB**, required above **5 GB**, and sends parts independently, often in parallel, so failed parts can be retried.
- **Transfer Acceleration** routes transfers through a nearby AWS edge location and the AWS network to the destination bucket; it supports multipart upload and is useful for long-distance transfers.
- **Byte-range GET** requests retrieve only selected byte intervals, enabling partial reads or parallel downloads; use HTTP Range to inspect a small header or segment of a large object.
- **S3 Select** and **Glacier Select** use SQL expressions to retrieve selected records/columns from supported CSV, JSON, or Parquet objects instead of transferring an entire object; Glacier Select operates on archived data and returns query results to S3.
- **S3 Event Notifications** support events such as object creation, removal, restoration, and replication, with prefix/suffix filters and Lambda, SQS, or SNS destinations; delivery is usually in seconds but can take a minute or longer.
- S3 notifications need destination resource permissions; **EventBridge** supports richer JSON filtering, multiple destinations, archive/replay, and reliable event delivery.
- **Server access logging** can record authorized and denied requests from any account into another S3 bucket in the same Region; never use the monitored bucket as its own logging target or logs will recursively grow.
- **Requester Pays** shifts request and download charges to an authenticated requester rather than the bucket owner; anonymous access is not supported.
- **S3 Storage Lens** aggregates usage, activity, data-protection, access, event, performance, and status-code metrics by organization/account/Region/bucket/prefix; its default multi-account, multi-Region dashboard can be disabled but not deleted.
- Storage Lens free metrics cover about **28 usage metrics** and are queryable for **14 days**; paid advanced metrics add activity, cost optimization, data protection, status codes, prefix aggregation, recommendations, and **15 months** of history, with optional daily CSV/Parquet exports.
- **S3 Storage Class Analysis** is a distinct daily report for Standard-to-Standard-IA transition decisions; **S3 Inventory** supplies object lists and metadata that can be queried with Athena and used as an S3 Batch Operations manifest.
- **S3 Batch Operations** runs a single action over a manifest, including metadata/tag/ACL changes, copies, encryption, Glacier restores, or per-object Lambda actions; it manages retries, progress, completion notifications, and reports.

#### Website hosting and related services
- Static website hosting serves bucket content from a Region-specific S3 website endpoint; the bucket must allow public reads for direct access, and S3 website endpoints use HTTP rather than HTTPS.
- **Multi-Region Access Points (MRAPs)** give applications a global S3 endpoint that routes requests to an active bucket in an eligible Region; configure replication separately to keep buckets synchronized and use failover controls for regional continuity.
- Use **S3** for objects, **CloudFront** for global edge caching, **EFS/FSx** for shared file-system semantics, and **EBS** for instance-attached block storage; CRR is replication, not a CDN cache.
- **See also:** Amazon EBS, Amazon EFS, Amazon FSx, AWS DataSync, AWS Snow Family

### Amazon EBS


Amazon Elastic Block Store (EBS) provides persistent, network-attached block volumes for EC2 instances. Choose it for boot disks and low-latency block storage that must persist independently of an instance's local hardware.

#### What it is
- EBS volumes have provisioned capacity and are **scoped to one Availability Zone**; an instance in another AZ cannot attach the volume directly, but a snapshot can be restored there.
- A volume can be detached and attached to another instance in the same AZ; ordinary volumes attach to one instance at a time, except supported Multi-Attach volumes.
- You pay for provisioned capacity (and provisioned performance where applicable), not merely the occupied bytes; volume size can be increased.
- EBS is network storage, so it has some network latency; data persists when an EC2 instance is stopped or terminated unless the volume is deleted.
- The root EBS volume is deleted on instance termination by default; other attached EBS volumes are retained by default, controlled by DeleteOnTermination.

#### Volume types and performance
- **gp3** General Purpose SSD supports **1 GiB-64 TiB**, starts at **3,000 IOPS and 125 MiB/s**, and can be provisioned independently up to **80,000 IOPS and 2,000 MiB/s**.
- **gp2** General Purpose SSD supports **1 GiB-16 TiB** and scales at **3 IOPS/GiB** to a maximum **16,000 IOPS**; small volumes can burst to **3,000 IOPS**, and IOPS scale with size.
- **io1** Provisioned IOPS SSD supports **4 GiB-16 TiB**, up to **64,000 IOPS on Nitro** or **32,000** on other instances, with independently provisioned IOPS and a maximum **50:1 IOPS-to-GiB** ratio.
- **io2 Block Express** supports **4 GiB-64 TiB**, sub-millisecond latency, up to **256,000 IOPS** and a **1,000:1 IOPS-to-GiB** ratio; it supports Multi-Attach.
- **st1** Throughput Optimized HDD is for frequently accessed, throughput-intensive data such as big data, warehouses, and logs; it supports **125 GiB-16 TiB**, up to **500 MiB/s** and **500 IOPS**.
- **sc1** Cold HDD is for infrequently accessed data where lowest cost matters; it supports **125 GiB-16 TiB**, up to **250 MiB/s** and **250 IOPS**.
- HDD types **st1/sc1 cannot be boot volumes**; only gp2/gp3 and io1/io2 SSD families can be used as boot volumes.
- Choose gp3 for general-purpose SSD with independently tuned throughput/IOPS, gp2 when baseline performance may track size, io1/io2 for sustained high IOPS, st1 for sequential throughput, and sc1 for cold HDD data.

#### Snapshots and recovery
- **EBS Snapshots** are point-in-time backups; creating one does not require detaching the volume, though quiescing writes improves consistency, snapshots consume I/O, and snapshots can be copied across AZs or Regions.
- Snapshots are incremental and independent of an AZ; create a volume from a snapshot in any AZ or copy it to another Region for regional recovery.
- **Snapshot Archive** reduces snapshot storage cost by about **75%**, but restore takes **24-72 hours**.
- **EBS Snapshot Recycle Bin** applies retention rules of **1 day-1 year** to deleted snapshots so they can be recovered before permanent removal.
- **Fast Snapshot Restore (FSR)** fully initializes a restored volume to avoid first-read lazy-loading latency; enable it per snapshot and AZ at additional cost.

#### Security and Multi-Attach
- EBS encryption uses **KMS AES-256** and transparently encrypts data at rest, data moving between instance and volume, snapshots, and volumes created from encrypted snapshots, with minimal latency impact.
- An unencrypted volume can be encrypted by snapshotting it, copying the snapshot with encryption, and creating a new encrypted volume from that copy.
- **Multi-Attach** is supported for io1/io2 volumes in the same AZ, up to **16 Nitro EC2 instances**; all have read/write access, so the application must coordinate concurrent writes and use a cluster-aware file system.
- **See also:** Amazon EC2 Instance Store, Amazon S3, Amazon EFS, AWS Backup

### Amazon EC2 Instance Store


EC2 Instance Store provides very high-performance physical storage attached to the host running an EC2 instance. Use it for temporary data when latency and IOPS matter more than persistence.

#### What it is
- Instance Store is **local, ephemeral hardware** rather than a network volume and can deliver very high IOPS and low latency, up to millions of IOPS for suitable instances.
- Data is lost when the instance is stopped or the underlying hardware fails; it is not durable storage for data that must survive instance lifecycle events.
- Use it for caches, buffers, scratch space, temporary files, or replicated working data; customers are responsible for backup and replication.
- **Compared with EBS:** Instance Store can provide better local I/O but is tied to the host and ephemeral; EBS is network-attached, persistent, and snapshot-capable.
- **See also:** Amazon EBS, Amazon S3

### Amazon EFS


Amazon Elastic File System is a managed, elastic NFS file system shared by Linux compute across multiple AZs. Choose it for shared POSIX files, such as web content or application data, without sizing file-system capacity in advance.

#### What it is
- EFS provides a standard **POSIX** file API over **NFSv4.1**, scales automatically to petabytes, and is billed based on use; it supports thousands of concurrent clients.
- EFS is designed for Linux-based clients and is **not compatible with Windows instances** as a native Windows file system; use FSx for Windows for SMB/NTFS workloads. The slide compares EFS Standard as roughly **3x gp2** in price, while EFS is elastic and billed by use.
- EFS mount targets provide VPC access; create a mount target in each AZ with clients and use the local-AZ target to reduce cross-AZ latency and transfer charges.
- Mount-target security groups control client access; NFS uses **TCP 2049**, and EFS can encrypt data at rest with KMS and in transit with TLS.
- **Standard** EFS storage is multi-AZ for production availability; **One Zone** stores data in one AZ for development or recoverable data and has automatic backup enabled by default.

#### Performance and throughput
- **General Purpose** performance mode is the default and is suited to latency-sensitive web serving, CMS, and similar workloads.
- **Max I/O** supports higher aggregate throughput and parallel operations for big-data or media processing, at the cost of higher operation latency.
- **Bursting** throughput scales with file-system size and accumulates burst credits; the slide's example is **50 MiB/s per TiB** baseline and bursts up to **100 MiB/s per TiB**.
- **Provisioned** throughput sets throughput independently of stored size, useful when a small file system needs sustained high throughput.
- **Elastic** throughput scales up or down automatically for unpredictable workloads; the cited limits are up to **3 GiB/s reads** and **1 GiB/s writes**.

#### Storage classes and availability
- **Standard** is for frequently accessed files; **EFS Infrequent Access (IA)** has lower storage cost but retrieval charges, while keeping file data immediately available through the same file system.
- **EFS Archive** targets files accessed only a few times per year and is described as about **50% cheaper** than Standard; lifecycle management moves files among tiers after configured inactivity periods.
- **One Zone-IA** combines the lower-cost IA tier with single-AZ storage; use it where AZ loss is acceptable and recovery/backup is available.
- EFS Standard provides multi-AZ availability; EFS One Zone is a single-AZ option and can save over **90%** in the slide's comparison.
- Compared with EBS, EFS supports shared concurrent file access across instances and AZs but generally costs more; EBS is block storage for an instance, while S3 stores objects.
- **See also:** Amazon EBS, Amazon FSx, Amazon S3, AWS Backup

### Amazon FSx


Amazon FSx is a fully managed family of file systems that brings Windows, Lustre, NetApp ONTAP, and OpenZFS file-system capabilities to AWS. Choose a flavor based on the required protocol, operating environment, performance, and compatibility.

#### What it is
- FSx offers four distinct engines: **Windows File Server**, **Lustre**, **NetApp ONTAP**, and **OpenZFS**; FSx file systems provide file/block protocols and semantics unlike S3 object storage.
- FSx for Windows can be configured Multi-AZ; the other deployment and availability characteristics depend on the flavor and configuration.

#### FSx for Windows File Server
- Provides managed **SMB** shares with **NTFS**, Microsoft Active Directory integration, ACLs, user quotas, and Distributed File System (DFS) Namespaces.
- Windows clients and Linux EC2 instances can mount the shares; on-premises clients can access them over VPN or Direct Connect.
- Offers SSD for latency-sensitive databases/analytics/media and HDD for broad workloads such as home directories and CMS; the slide describes scaling to tens of GB/s, millions of IOPS, and hundreds of PB.
- Multi-AZ is available for high availability, and the service backs up data daily to S3.

#### FSx for Lustre
- Lustre is a parallel distributed file system for Linux-oriented HPC, ML, video processing, financial modeling, and electronic design automation.
- It scales to hundreds of GB/s, millions of IOPS, and sub-millisecond latencies; SSD fits small/random I/O and HDD fits large/sequential throughput.
- Integrates with S3 so an S3 bucket can be a file-system data repository and computation output can be written back to S3; on-premises servers can connect over VPN or Direct Connect.
- **Scratch** file systems are temporary, unreplicated, and do not persist through file-server failure; they offer high burst performance (the cited example is **6x**, **200 MB/s per TiB**) for short-term processing.
- **Persistent** file systems replicate within an AZ, replace failed files within minutes, and suit longer-term processing or sensitive data.

#### FSx for NetApp ONTAP
- Provides managed NetApp ONTAP with **NFS, SMB, and iSCSI**; it supports Linux, Windows, macOS, VMware Cloud on AWS, WorkSpaces, AppStream 2.0, EC2, ECS, and EKS.
- Storage can grow or shrink automatically; features include snapshots, replication, compression, deduplication, and point-in-time instantaneous clones for testing.
- Use it to move existing ONTAP/NAS workloads to AWS or share files across mixed operating systems and protocols.

#### FSx for OpenZFS
- Provides managed OpenZFS and **NFSv3, v4, v4.1, and v4.2**, supporting Linux, Windows, macOS, VMware Cloud on AWS, WorkSpaces, AppStream 2.0, EC2, ECS, and EKS.
- Supports up to **1,000,000 IOPS** with **less than 0.5 ms latency**, plus snapshots, compression, and point-in-time instantaneous clones.
- **Compared with EFS:** FSx supplies specialized Windows/HPC/ONTAP/ZFS compatibility and protocols; choose EFS for simpler elastic shared NFS for Linux clients.
- **See also:** Amazon EFS, Amazon S3, AWS DataSync, AWS Backup

### AWS Storage Gateway


AWS Storage Gateway connects on-premises applications to AWS storage while preserving familiar file, block, or tape workflows. Choose it for hybrid access, local caching, backup, restore, or staged migration.

#### What it is
- Storage Gateway is a hybrid service for disaster recovery, backup/restore, tiered storage, and low-latency on-premises access to cloud-backed data.
- The gateway runs as a VM (VMware, Hyper-V, or KVM) or supported appliance and encrypts transfers in transit over the internet or Direct Connect.

#### File Gateway
- **S3 File Gateway** presents configured S3 buckets as NFS/SMB file shares and keeps recently used data in a local cache; bucket access uses IAM roles.
- SMB File Gateway can authenticate users with Active Directory; objects are stored in S3, and lifecycle policies can transition them to Glacier classes.
- The slide lists Standard, Standard-IA, One Zone-IA, and Intelligent-Tiering as directly supported file-gateway classes; Glacier tiers are reached through lifecycle.
- **FSx File Gateway** presents FSx for Windows File Server shares to on-premises clients using SMB while caching frequently accessed data locally.

#### Volume Gateway
- Volume Gateway exposes **iSCSI** block volumes backed by AWS storage; cached and stored are alternative volume modes.
- **Cached volumes** keep the primary dataset in AWS and cache the most recently accessed data locally for low-latency reads.
- **Stored volumes** keep the entire dataset on premises and asynchronously back up volume snapshots to S3; EBS snapshots can restore local volumes.

#### Tape Gateway
- Tape Gateway presents a virtual tape library (VTL) over iSCSI to existing backup software and preserves tape-based workflows without physical tape handling.
- Virtual tapes are backed by S3; archived tapes move to Glacier/Deep Archive, and retrieval returns tapes to the virtual library.
- **See also:** Amazon S3, Amazon EBS, Amazon FSx, AWS Backup

### AWS Snow Family


AWS Snow Family provides rugged, secure devices for transferring large datasets when networks are constrained and for running edge compute in disconnected locations. Choose physical transfer when network time, bandwidth, stability, or cost makes online transfer impractical.

#### What it is
- Snow Family devices collect, process, and move data into or out of AWS; Snowball is designed for transfers up to petabytes, and Snowmobile addresses exabyte-scale migrations.
- **Snowcone** is the smallest portable rugged device for constrained field sites; it provides up to **8 TB HDD** or **14 TB SSD** storage with **2 vCPUs and 4 GB RAM** and supports limited edge compute.
- **Snowball Edge Storage Optimized** is listed with **104 vCPUs, 416 GB memory, and 210 TB storage**; **Compute Optimized** is listed with **104 vCPUs, 416 GB memory, and 28 TB storage**.
- Snowball Edge usable storage and compute availability depend on the device generation, options, and region; select a current device configuration in the Snow job workflow rather than assuming all stated capacity is usable.
- **Snowmobile** is a shipping-container-scale transfer service for very large migrations, commonly up to about **100 PB per device**; it moves data physically rather than providing an online storage target.
- **AWS OpsHub** is a graphical application for managing Snow devices, configuring services, and monitoring transfers, including disconnected operations.

#### Data transfer and edge compute
- Ship a Snowball device when network transfer would take more than about a week; one slide's example estimates **200 TB over 100 Mbps at 185 days**, **1 Gbps at 18.5 days**, versus about **one week end-to-end with Snowball**.
- Snowball Edge Compute Optimized and Storage Optimized devices can run EC2 instances or Lambda at edge locations; use them to preprocess data, run ML inference/training, or transcode media when connectivity or local compute is limited.
- Snowball data must land in **S3 first**; it cannot be imported directly into Glacier, so apply an S3 lifecycle policy to archive it.
- **Compared with DataSync:** Snow devices suit one-time, very large offline transfers; DataSync is the managed online choice for recurring or scheduled synchronization.
- **See also:** Amazon S3, AWS DataSync, AWS Storage Gateway

### AWS DataSync


AWS DataSync automates high-speed file and object transfers between on-premises, other-cloud, and AWS storage. Choose it for managed, scheduled bulk transfer with integrity checks and metadata preservation.

#### What it is
- DataSync transfers data to/from S3, EFS, and FSx; supported sources/protocols include NFS, SMB, HDFS, and S3-compatible APIs.
- An on-premises or other-cloud source requires a **DataSync agent** with access to the source; supported AWS-to-AWS transfers can be agentless.
- DataSync supports S3 storage classes including archive classes, EFS, and FSx for Windows, Lustre, NetApp ONTAP, and OpenZFS.
- Tasks can run once or on schedules such as hourly, daily, or weekly; DataSync preserves file permissions and metadata (including NFS POSIX and SMB metadata).
- A single agent task can use up to **10 Gbps**; a bandwidth limit can constrain transfer impact on other workloads.
- Use DataSync for online migration or ongoing synchronization, including private paths over VPN or Direct Connect; it can verify transfer integrity.
- **Compared with Storage Gateway:** DataSync moves/synchronizes files; Storage Gateway continuously presents local file/block/tape interfaces backed by AWS.
- **See also:** Amazon S3, Amazon EFS, Amazon FSx, AWS Storage Gateway, AWS Transfer Family

### AWS Transfer Family


AWS Transfer Family is a managed FTP-family endpoint for moving files into or out of Amazon S3 or Amazon EFS. Choose it when partners or legacy clients require standard file-transfer protocols without operating transfer servers.

#### What it is
- Supports **SFTP**, **FTPS**, and **FTP**; the slide notes FTP endpoints are available only within a VPC.
- Managed endpoints are scalable, reliable, and highly available across multiple AZs; endpoint-hour provisioning and data transferred in GB are billed.
- Files land in or are served from S3 or EFS, with users mapped to IAM roles and supported home directories/permissions.
- User credentials can be managed by Transfer Family or authenticated through existing systems such as Microsoft Active Directory, LDAP, Okta, Amazon Cognito, or a custom identity provider.
- Use it for secure partner file exchange, public datasets, and business integrations such as CRM or ERP; managed workflows can trigger post-upload processing.
- **Compared with DataSync:** Transfer Family offers interactive client-based file transfer; DataSync is for automated bulk copy and recurring synchronization.
- **See also:** Amazon S3, Amazon EFS, AWS DataSync

### Choosing a storage service


Choose by the storage interface, access pattern, durability, and hybrid/transfer requirement rather than by raw capacity alone.

#### What it is
- Choose **S3** for durable object storage, archives, data lakes, or static content; choose a Glacier class when lower cost is worth retrieval delay or minimum-duration constraints.
- Choose **EBS** for a persistent block device attached to EC2 in one AZ; choose **Instance Store** for temporary, very high-performance local scratch/cache data.
- Choose **EFS** for shared POSIX/NFS access from Linux clients across AZs; choose **FSx** when Windows SMB/NTFS, Lustre/HPC, ONTAP, or OpenZFS compatibility is required.
- Choose **Storage Gateway** to retain on-premises NFS/SMB, iSCSI, or tape workflows with cloud-backed storage and local caching.
- Choose **DataSync** for managed online transfers and recurring sync, **Transfer Family** for partner SFTP/FTPS/FTP access, and **Snow Family** when offline physical transfer or edge compute is needed.
- **See also:** Amazon S3, Amazon EBS, Amazon EC2 Instance Store, Amazon EFS, Amazon FSx, AWS Storage Gateway, AWS Snow Family, AWS DataSync, AWS Transfer Family

## Backup and disaster recovery

### AWS Backup


AWS Backup centrally automates backup policies and recovery points for supported AWS resources. Choose it for consistent schedules, retention, lifecycle, and cross-account or cross-Region protection across services.

#### What it is
- A **Backup Plan** defines schedule/frequency, backup window, lifecycle, retention, and optional copy rules; plans can be assigned to tagged resources.
- Schedules can run every **12 hours**, daily, weekly, monthly, or by cron expression; retention and cold-storage transitions are configurable.
- A **backup vault** stores and organizes recovery points and can apply access controls and encryption; vaults can be copied across Regions and accounts.
- AWS Backup supports on-demand and scheduled backup, point-in-time recovery for supported services, and cross-Region and cross-account backup/copy.
- **Vault Lock** enforces WORM retention for backups; it protects against malicious or accidental deletion and retention changes, and even root cannot delete locked recovery points.

#### Services and recovery
- The slide-listed services include EC2/EBS, S3, RDS engines, Aurora, DynamoDB, DocumentDB, Neptune, EFS, FSx for Lustre and Windows File Server, and Storage Gateway Volume Gateway.
- Supported resources and capabilities vary by service: confirm PITR, continuous backup, cold-storage transition, and restore options for the specific resource type.
- Restore creates service-specific recovery resources; combine AWS Backup with service-native features such as EBS snapshots, S3 versioning/replication, or database replication where required.
- Cross-account copies place recovery points in a separately controlled account, while cross-Region copies support regional recovery; use both when both failure domains matter.
- AWS Backup complements rather than replaces application/database replication when near-zero RPO or fast regional failover is required.
- **See also:** Amazon EBS, Amazon S3, Amazon EFS, Amazon FSx, AWS Storage Gateway, AWS Elastic Disaster Recovery

### AWS Elastic Disaster Recovery


AWS Elastic Disaster Recovery (AWS DRS, formerly CloudEndure Disaster Recovery) continuously replicates server disks to a low-cost AWS staging area so physical, virtual, or cloud servers can be launched in AWS after an outage.

#### What it is
- Install the AWS Replication Agent on supported source servers; it continuously replicates block-level disk changes to AWS, with replication typically occurring within seconds.
- Replicated servers are held in a staging area using low-cost EC2 and EBS resources; launch target EC2 instances and volumes for recovery drills or failover.
- DRS supports recovery of server workloads such as Oracle/MySQL/SQL Server databases and enterprise applications; protect source data from site, server, or ransomware failures.
- Recovery can bring target servers online in minutes; after the primary environment is restored, DRS supports failback.
- DRS replicates server disks and helps launch servers; it does not replace database-native replication when the required consistency or recovery design depends on database-level mechanisms.
- **Compared with AWS Backup:** DRS continuously replicates server blocks for rapid server recovery; AWS Backup retains point-in-time recovery points for supported resources.
- **See also:** AWS Backup, Amazon EBS, Amazon EC2, AWS Storage Gateway

### Disaster recovery strategies


Disaster recovery prepares for business disruption by defining acceptable data loss and service downtime, then selecting a recovery design that balances cost, complexity, and speed.

#### What it is
- **RPO (Recovery Point Objective)** is the maximum acceptable age of recoverable data at failure, expressed as tolerated data loss over time; more frequent backups or continuous replication lower RPO.
- **RTO (Recovery Time Objective)** is the maximum acceptable interval from disruption until service is restored; pre-provisioned resources and automated failover lower RTO.
- Disaster recovery can protect on-premises systems to another site, on-premises systems to AWS, or one AWS Region to another; hybrid recovery combines local infrastructure with cloud recovery.

#### Strategies and trade-offs
- **Backup and restore** stores backups and rebuilds/restores after disaster; it usually has the lowest ongoing cost and highest RPO/longest RTO because infrastructure and data must be recovered after the event.
- **Pilot light** keeps essential components (typically databases and replicated data) running in the recovery Region while application compute remains off; it costs more than backups but recovers faster because core services are ready.
- **Warm standby** runs a fully functional but reduced-size system in the recovery Region; scaling it to production after failover yields faster recovery than pilot light at higher ongoing cost.
- **Multi-site active-active (hot site)** runs full production capacity in multiple locations and serves traffic from both; it offers very low RTO (minutes or seconds) and lowest interruption but has the highest infrastructure, replication, and operations cost.
- The usual progression from backup/restore through pilot light and warm standby to active-active trades increasing operating cost and complexity for lower recovery time and less disruption.

#### Data and failover options
- Use scheduled backups and snapshots (including EBS, RDS, and S3 lifecycle/replication) for recovery points; use cross-Region replication or backup copies when a Region failure is in scope.
- Use database-native replication for tighter objectives: RDS cross-Region replication or Aurora Global Database can replicate continuously, with Aurora Global Database typically under **one-second** lag and recovery in under **one minute** when a secondary is ready.
- Use EFS, S3 replication, Storage Gateway, and Snow devices to match file/object/block or offline migration needs; Route 53 can redirect DNS during a regional recovery.
- Automate rebuilding and recovery with CloudFormation/Elastic Beanstalk, health alarms, and Lambda where appropriate; retain a backup path for configuration and data even when replication is enabled.
- Use Site-to-Site VPN as a recovery path for Direct Connect where independent connectivity is required.
- **See also:** AWS Backup, AWS Elastic Disaster Recovery, Amazon EBS, Amazon S3, Amazon EFS, AWS Storage Gateway, AWS Snow Family

## Databases

### Amazon DynamoDB


Fully managed, serverless NoSQL key-value and document database that gives single-digit-millisecond access at any scale. Choose it for massive, variable, key-based workloads with no servers to manage; it is not a relational or analytical store.

#### What it is
- **Fully managed and highly available**, with data replicated across multiple AZs; there are **no servers to provision, patch, or maintain**.
- **NoSQL, not relational**: no joins and no SQL-style schema, so moving from RDS or Aurora means rewriting queries and application logic. It does support **ACID transactions**.
- Scales horizontally to **millions of requests per second**, **trillions of items**, and **hundreds of TB**, while keeping **single-digit millisecond** latency.
- Access is controlled with **IAM**. Applications on EC2 or Lambda get temporary credentials from an instance profile or execution role instead of embedded keys.
- Fine-grained, **row-level access** is possible with IAM policy conditions, for example by tying the partition key to the caller's identity from a Cognito identity pool.
- Two table classes: **Standard** and **Standard-Infrequent Access (IA)** for rarely read data.
- It is an **operational primary datastore**, not a cache. It is a poor fit for full-text search (use OpenSearch) or analytics warehousing (use Redshift).
- Often used to hold session state as an alternative to ElastiCache, and as the data tier of serverless APIs (API Gateway, Lambda, DynamoDB).

#### Data model
- A **table** contains **items** (rows); each item has **attributes** that can be added over time or left null, so the schema evolves easily.
- The **primary key** must be chosen when the table is created: a **partition key** alone, or a **partition key plus sort key**.
- **Maximum item size is 400 KB.** Larger objects (images, big documents) belong in S3, with only the object key stored in DynamoDB.
- Data types: **scalar** (String, Number, Binary, Boolean, Null), **document** (List, Map), and **set** (String, Number, Binary sets).
- A **global secondary index (GSI)** adds an alternative partition key (and optional sort key) so a table can be queried by a different access pattern.
- A GSI does not solve unpredictable load or hot-key problems; it only changes how items can be queried.

#### Capacity modes and cost
- **Provisioned mode** (the default) means you set **read capacity units (RCUs)** and **write capacity units (WCUs)** in advance and pay for them.
- **Auto scaling** can be added to provisioned mode: you set **minimum**, **maximum**, and **target utilization** for RCU and WCU.
- **On-demand mode** needs no capacity planning, scales instantly with traffic, and charges **per request**.
- Choose on-demand for **unknown, unpredictable, or sharply spiking** traffic; choose provisioned with auto scaling for **steady, predictable** traffic, where it is usually cheaper.
- On-demand costs more than provisioned at sustained high volume.
- Auto scaling reacts to load over time, so it is not a substitute for on-demand when spikes are sudden.

#### Caching with DAX
- **DynamoDB Accelerator (DAX)** is a managed, highly available, **in-memory cache built only for DynamoDB**, taking read latency from milliseconds to **microseconds** (up to about 10x faster) even at millions of requests per second.
- It is **API-compatible** with DynamoDB: provision a DAX cluster and point the existing DynamoDB SDK calls at it, so **no application logic changes**, cache invalidation code, or data population code are needed.
- It caches **individual item reads** and **Query/Scan results**; the default cache **TTL is 5 minutes**.
- It solves **read congestion and hot keys** by serving repeated reads from memory.
- It does **not** cache relational databases or S3 objects, and it does nothing for **write scaling** or **cross-Region replication**.
- **ElastiCache** can also sit in front of DynamoDB, but the application has to implement the caching logic; it suits storing **aggregated results** and non-DynamoDB data.

#### Streams and change capture
- **DynamoDB Streams** is an **ordered, per-item log** of creates, updates, and deletes in a table, retained for **24 hours**, with a limited number of consumers.
- Consume it with **Lambda triggers** or the DynamoDB Streams Kinesis adapter.
- **Kinesis Data Streams for DynamoDB** is the newer option: up to **1 year** retention and many more consumers (Lambda, Data Firehose, Managed Service for Apache Flink, Glue streaming ETL).
- Typical uses: **react to changes in real time** (welcome emails), real-time analytics, populating derived tables, and custom cross-Region replication.
- Streams is a change feed, not a restore mechanism, and it does not relieve hot keys.
- DynamoDB has no built-in rule that rewrites an item when it is written; run a **Lambda function from the stream** to cleanse or transform items.
- **Kinesis Data Firehose cannot write directly to DynamoDB**; use Lambda (from SQS or Kinesis Data Streams) to write items.

#### Global tables (multi-Region)
- **Global tables** are a fully managed, **multi-Region, multi-writer (active-active)** setup: every replica Region serves **local reads and writes**.
- Replication is automatic and typically completes in **under a second**; **DynamoDB Streams** must be enabled as a prerequisite.
- Concurrent writes to the same item are reconciled with **last-writer-wins**, and the default multi-Region consistency is **eventual**.
- Delivers **high availability and resilience to a Region failure** plus low latency for global users.
- It replicates the whole table; **partial replication of selected items is not supported**.
- It does not fix an unpredictable load problem; capacity mode (on-demand, or provisioned with auto scaling) still has to be chosen for each replica.

#### Backup and recovery
- **Point-in-time recovery (PITR)** keeps continuous backups and restores to **any second within the last 35 days**; it must be enabled, and the restore always **creates a new table**.
- PITR is the answer to accidental writes or a mistaken `DeleteItem`, because it restores the table to just before the bad write.
- **On-demand backups** are full backups kept until you delete them; they cause **no performance impact** and can be managed in **AWS Backup** (including cross-Region and cross-account copies).
- **Deletion protection** blocks a table from being deleted until it is turned off; it does not retain earlier item versions, so combine it with PITR or backups.
- Regularly exporting to S3 is not a substitute for PITR: it adds operational work and leaves a gap between exports.

#### Time to Live (TTL)
- TTL deletes items automatically once a **per-item expiry timestamp** (Unix epoch seconds) in a designated attribute has passed.
- Deletion runs in the **background** at no extra write cost and is **asynchronous**: it may lag the timestamp by days, so it is not exact-time deletion or an access-control tool.
- Common uses: **session data**, temporary records, keeping only current data, and meeting **retention limits** (for example expiring analysis results after a year).

#### Import, export, and integrations
- **Export to S3** requires **PITR**, works for any point in the last **35 days**, uses **DynamoDB JSON or ION**, and **does not consume read capacity**; query the export with Athena or run ETL on it.
- **Import from S3** accepts **CSV, DynamoDB JSON, or ION**, always creates a **new table**, consumes **no write capacity**, and logs import errors to CloudWatch Logs.
- **Gateway VPC endpoints** give private access from a VPC to DynamoDB through route-table entries at **no charge**, avoiding NAT gateway costs; **S3 and DynamoDB are the only services** with gateway endpoints.
- **Serverless API pattern:** client -> API Gateway -> Lambda -> DynamoDB for CRUD, optionally with CloudFront in front and DAX for cached reads.
- Common ingestion patterns: SQS or Kinesis -> Lambda -> DynamoDB, and S3 event -> Lambda -> (Comprehend/Textract/Rekognition) -> DynamoDB lookup.

#### Exam cues
- "Unpredictable or spiking traffic, no capacity planning" -> **on-demand** capacity.
- "Microsecond reads without changing the application" -> **DAX**.
- "Local reads and writes in several Regions" or "survive a Region outage" -> **global tables**.
- "Restore to just before bad data was written" -> **PITR**.
- "Automatically expire old items" -> **TTL**.
- "React to item changes" -> **DynamoDB Streams + Lambda**.
- Items of many MB (for example 20 MB) -> do not store in DynamoDB (400 KB limit); keep the object in S3.
- "Migrate from a relational database with minimal code change" -> keep RDS/Aurora; DynamoDB needs an application rewrite.

- **See also:** Amazon ElastiCache, Amazon Aurora, Amazon Kinesis Data Streams, AWS Backup, Amazon VPC, Amazon S3, AWS Lambda, Amazon API Gateway, Amazon Cognito

### Amazon RDS


Amazon Relational Database Service (RDS) is a managed relational database service for SQL and OLTP workloads. Choose it to run familiar relational engines without managing database hosts and routine operations.

#### What it is
- **Managed SQL databases** — AWS provisions and manages supported database instances, operating-system maintenance, backups, monitoring, and scheduled maintenance; you cannot SSH to a standard RDS host.
- **Engines** — RDS supports PostgreSQL, MySQL, MariaDB, Oracle, Microsoft SQL Server, and IBM Db2; Aurora is AWS's separate compatible relational engine.
- **Workload fit** — Use RDS for relational schemas, transactions, and joins; select a NoSQL or purpose-built database when its data model better fits the workload.
- **Capacity** — Choose the DB instance size and EBS storage type and size; scale compute vertically and scale reads with read replicas.
- **Maintenance** — RDS schedules maintenance in a configured window; engine and operating-system maintenance may cause downtime or failover.

#### Availability and DR
- **Multi-AZ DB instance** — RDS synchronously maintains a standby in another AZ and automatically fails over to it through the same DB endpoint; the standby is for availability, not read scaling.
- **Enable Multi-AZ** — Converting a single-AZ instance can be done without stopping the DB: RDS snapshots it, restores a standby in another AZ, and establishes synchronization.
- **Multi-AZ DB cluster** — A cluster deployment has a writer and two readable standby instances in three AZs; unlike the traditional passive standby, its readers can serve read traffic and provide faster failover.
- **Read replicas** — Asynchronous replicas scale read-only queries and can be placed in the same AZ, another AZ, or another Region; replication lag means reads can be stale.
- **Replica operations** — Up to 15 read replicas are supported for eligible engines; applications must direct reads to replicas, and a replica can be promoted to a standalone DB. Same-Region replica traffic has no inter-AZ data transfer charge; cross-Region replication can incur transfer charges.
- **Regional resilience** — Multi-AZ protects within a Region; use a cross-Region read replica or copied backups for regional recovery. Cross-Region replication is asynchronous and may lag.

#### Backups and snapshots
- **Automated backups** — RDS takes a daily full backup during the backup window and saves transaction logs about every five minutes, enabling point-in-time restore to approximately five minutes before the current time within the retention period.
- **Retention** — Automated backup retention is configurable from **1 to 35 days**; setting retention to **0** disables automated backups and point-in-time restore.
- **Manual snapshots** — User-created DB snapshots persist until deleted and support longer-term recovery; they do not expire with the automated-backup window.
- **Restore behavior** — Restoring a snapshot or point in time creates a new DB instance rather than overwriting the source. Stopping a DB instance does not eliminate its storage charges; snapshot and restore is an option for long-term inactivity.
- **MySQL restore from S3** — A MySQL backup stored in S3 can be restored to a new RDS for MySQL instance.
- **Central backup management** — AWS Backup can centrally manage RDS backups and support cross-Region and cross-account backup copies.
- **Snapshot sharing** — To share an encrypted snapshot across accounts, share it and grant the recipient access to the KMS key; backup copies can also support cross-Region recovery.

#### Storage autoscaling
- **Automatic growth** — RDS can increase allocated storage up to a configured maximum when free space is below **10%** for at least **5 minutes**, provided at least **6 hours** have passed since the previous storage modification.
- **Scope** — Storage autoscaling is supported across RDS engines and is useful for unpredictable growth; it does not reduce allocated storage or exceed the configured maximum.

#### Security
- **At-rest encryption** — Enable KMS encryption when creating the DB; an unencrypted source cannot have encrypted read replicas. To encrypt an unencrypted DB, snapshot it and restore the snapshot with encryption enabled.
- **In-transit encryption** — RDS supports TLS connections; configure clients with the appropriate AWS certificate authority.
- **Network controls** — Use VPC security groups to control database access; standard RDS instances do not expose SSH access.
- **IAM database authentication** — For supported MySQL-, MariaDB-, and PostgreSQL-compatible engines, IAM database authentication can replace database passwords with IAM-authenticated tokens.
- **Audit logs** — Supported database audit and engine logs can be published to CloudWatch Logs for retention and analysis.

#### RDS Custom
- **Supported engines** — RDS Custom provides managed Oracle and SQL Server databases while allowing access to the underlying database and operating system.
- **Customization access** — Use SSH or Systems Manager Session Manager to configure settings, install patches, or enable native features; standard RDS does not provide this host-level access.
- **Automation mode** — Deactivate automation mode before making custom changes, and take a DB snapshot first so the instance can be recovered if customization fails.

#### Configuration and licensing
- **Parameter groups** — DB parameter groups control engine configuration for DB instances; cluster parameter groups apply to supported cluster deployments. AWS supplies defaults, while custom groups let you set supported engine parameters.
- **Parameter changes** — Whether a changed parameter takes effect immediately or after a reboot depends on the parameter and engine; a parameter group is distinct from an option group.
- **License model** — License terms and costs depend on the engine and version. Where offered, choose license-included or bring-your-own-license (BYOL); compare commercial-engine licensing with a compatible open-source engine such as Aurora PostgreSQL or Aurora MySQL.

#### Integrations
- **Invoke Lambda from the database** — RDS for PostgreSQL and Aurora MySQL can invoke Lambda to process database events, such as a new row; allow outbound connectivity and grant the DB and Lambda resource policies permission to invoke the function.
- **RDS event notifications** — SNS or EventBridge can notify subscribers about DB-instance, snapshot, parameter-group, security-group, RDS Proxy, and custom-engine-version events; notifications concern the DB resource, not row-level data, and can take up to **5 minutes**.
- **Reporting** — RDS relational data can feed analytics services such as QuickSight and Glue; use a read replica to isolate reporting reads from a production writer where appropriate.

#### Exam cues
- **Relational engine with managed operations** -> RDS; choose the specific engine based on compatibility, features, and license requirements.
- **Automatic failover within one Region** -> Multi-AZ; **read-only scale-out** -> asynchronous read replicas.
- **Just-before-corruption recovery** -> point-in-time restore; **long-lived recovery point** -> manual snapshot.
- **Unpredictable database storage growth** -> storage autoscaling with a maximum threshold.

- **See also:** Amazon RDS Proxy, Amazon Aurora, Amazon ElastiCache, Amazon DynamoDB, AWS Database Migration Service

### Amazon RDS Proxy


Amazon RDS Proxy is a managed, highly available database proxy that pools and reuses connections between applications and RDS or Aurora. Choose it when short-lived or bursty clients, especially Lambda functions, would otherwise exhaust database connections.

#### What it is
- **Connection pooling** — The proxy shares established database connections across application sessions, reducing connection overhead, open-connection counts, and pressure on database memory and CPU.
- **Lambda workloads** — It helps serverless applications handle concurrency spikes without overwhelming database connection limits; it does not queue or persist application work.
- **Failover** — RDS Proxy is multi-AZ and can preserve connections through failover, reducing RDS and Aurora failover time by up to **66%**.
- **Compatibility** — It supports RDS for MySQL, PostgreSQL, MariaDB, and SQL Server, plus Aurora MySQL and PostgreSQL.
- **Application changes** — Most applications can use the proxy endpoint with little or no code change.

#### Security and networking
- **Authentication** — RDS Proxy can enforce IAM authentication for clients and retrieve database credentials securely from AWS Secrets Manager.
- **Private access** — A proxy is not publicly accessible; applications must reach it from the VPC, and Lambda functions using it must be attached to that VPC.

#### Compared with
- **RDS read replicas** — A proxy pools connections to the database; a read replica serves read-only queries and does not solve connection storms at the writer.
- **SQS** — Use RDS Proxy for synchronous connection management; use SQS when requests should be buffered and processed asynchronously.

- **See also:** Amazon RDS, Amazon Aurora, AWS Lambda, AWS Secrets Manager, Amazon SQS

### Amazon Aurora


Amazon Aurora is AWS's managed relational engine, compatible with MySQL and PostgreSQL. Choose it when a relational workload needs high availability, shared-storage read scaling, or Aurora-specific scaling and recovery features.

#### What it is
- **Compatibility** — Aurora MySQL and Aurora PostgreSQL work with their respective database drivers and much existing application code; Aurora is proprietary AWS technology rather than an open-source database engine.
- **Performance** — AWS positions Aurora as cloud-optimized and has described up to **5x MySQL** and **3x PostgreSQL** performance versus RDS engines; results depend on workload and configuration.
- **Shared storage** — The cluster volume stores six copies across three AZs; four copies are needed for writes and three for reads. The storage layer self-heals and expands automatically, independently of DB-instance compute.
- **Storage growth** — Aurora storage grows in **10-GB increments** up to **256 TiB** per cluster volume and is striped across hundreds of storage volumes.
- **Compute layout** — Each cluster has a writer and can have reader instances; storage is shared rather than separately copied to each reader.

#### Availability and replicas
- **Aurora Replicas** — Up to **15** read replicas share the cluster volume, have low replication lag, and can be distributed across AZs; they scale reads and can be promoted during writer failover.
- **Automatic failover** — Aurora can promote a replica to writer, with failover typically completing in under **30 seconds**.
- **Maintenance and monitoring** — Aurora provides automated backups, security and compliance controls, advanced monitoring, routine maintenance, and push-button scaling; engine patching is designed for minimal downtime.
- **Reader endpoint** — The reader endpoint load-balances connections across available replicas; use it for read traffic rather than hard-coding an individual reader.
- **Writer endpoint** — The writer endpoint tracks the current primary instance and is the connection endpoint for writes.
- **Custom endpoints** — Define a selected subset of cluster instances behind a custom endpoint, for example to route analytical reads to larger replicas; this provides more control than the general reader endpoint.
- **Replica autoscaling** — Aurora can add or remove read replicas as demand changes, subject to configured scaling policies.

#### Aurora Global Database
- **Regional topology** — A Global Database has one primary read/write Region and up to **10** secondary read-only Regions; each secondary can have up to **16 DB instances** (a primary instance plus replicas).
- **Replication** — Storage-based cross-Region replication typically has less than **1 second** of lag and supports local read latency for users near secondary Regions.
- **Recovery** — A secondary Region can be promoted for disaster recovery with a stated recovery time under **1 minute**; Global Database is not a multi-writer design.
- **Cross-Region read replicas** — These are another DR option; Global Database is the managed multi-Region choice when low-lag regional reads are also needed.

#### Aurora Serverless
- **Automatic capacity** — Serverless adjusts database capacity to actual demand, avoiding fixed-capacity planning for intermittent, infrequent, or unpredictable workloads.
- **Versions** — Serverless v1 is a legacy version; v2 is the current scaling model for new deployments and adjusts capacity more granularly while retaining Aurora-compatible instances and features.
- **Billing and fit** — Capacity is billed as used; Serverless can be more cost-effective when demand varies substantially, but steady workloads may suit provisioned instances better.

#### Other Aurora features
- **Backtrack** — For supported Aurora MySQL clusters, Backtrack rewinds the database to an earlier point without restoring from a backup; its configurable rewind window can be up to **72 hours**, and it is not a replacement for backups.
- **Cloning** — Copy-on-write cloning creates a separate cluster quickly from an existing cluster without copying the entire volume upfront; additional storage is allocated as the clone diverges, making staging copies efficient.
- **Parallel query** — Aurora MySQL Parallel Query can push eligible query processing down to the storage layer, accelerating analytical queries over large tables; not every query can be offloaded.
- **Multi-Master** — Aurora Multi-Master was an older capability and is not offered for current Aurora clusters; use the supported single-writer cluster with read replicas instead.
- **Machine learning** — Aurora ML exposes SageMaker predictions and Amazon Comprehend sentiment analysis through SQL integrations, enabling predictions such as fraud risk, recommendations, and sentiment without building an ML platform into the application.
- **I/O-Optimized** — Aurora I/O-Optimized removes per-I/O charges in exchange for a higher storage price, which can make total cost more predictable for I/O-intensive clusters.
- **Babelfish** — Babelfish for Aurora PostgreSQL lets applications use supported SQL Server T-SQL and the SQL Server wire protocol with reduced code changes; SCT and DMS can help with objects and data that still need conversion or migration.

#### Migration from MySQL or PostgreSQL
- **RDS to Aurora** — Restore an RDS MySQL or PostgreSQL snapshot as a new Aurora cluster, or create an Aurora read replica and promote it after replication lag reaches zero; replica migration can take time and add cost.
- **External MySQL** — Restore a Percona XtraBackup file stored in S3 to a new Aurora MySQL cluster, or load with `mysqldump`, which is slower; use DMS when both databases are online.
- **External PostgreSQL** — Back up to S3 and import with the Aurora `aws_s3` extension, or use DMS when both source and target are running.

#### Backups and security
- **Automated backups** — Aurora continuously backs up cluster data and supports point-in-time recovery for **1–35 days**; unlike standard RDS automated backups, Aurora automated backups cannot be disabled.
- **Snapshots and restore** — Manual cluster snapshots persist until deleted; restoring a backup or snapshot creates a new cluster. An external Aurora MySQL cluster can also be restored from an S3 backup made with Percona XtraBackup.
- **Encryption** — KMS encryption must be selected when creating the cluster; an unencrypted cluster must be snapshot-restored to an encrypted cluster. TLS, security groups, IAM database authentication for supported engines, and CloudWatch audit logs provide additional controls.
- **Maintenance** — Aurora automates routine maintenance and patching, and offers push-button scaling and monitoring features.

#### Compared with
- **RDS** — Choose RDS for a standard supported engine deployment; choose Aurora for compatible MySQL/PostgreSQL workloads needing its distributed storage, reader endpoints, or Aurora-specific capabilities. Aurora can cost more than standard RDS, so compare workload-specific total cost.
- **Aurora Serverless vs. provisioned** — Prefer Serverless for intermittent or hard-to-predict demand; provisioned instances fit steady workloads that need fixed capacity or have predictable utilization.

- **See also:** Amazon RDS, Amazon RDS Proxy, AWS Database Migration Service, Amazon CloudWatch

### Amazon ElastiCache


Amazon ElastiCache is a managed in-memory cache service for Redis and Memcached. Choose it to serve frequently accessed or rapidly changing data with sub-millisecond latency, reduce database read pressure, or share temporary application state.

#### What it is
- **Managed cache** — AWS manages setup, configuration, monitoring, patching, failure recovery, and supported backup features; applications still need to integrate cache reads and writes.
- **Latency and fit** — In-memory access provides sub-millisecond performance; ElastiCache is generally suited to frequent reads and fewer writes, not as a substitute for a durable relational database.
- **Scaling** — Choose cache node types and, where supported, clustering or sharding to distribute capacity and workload.
- **Database cache pattern** — On a cache miss, read from the database and populate the cache; a cache hit serves the saved result and reduces database load.

#### Redis and Memcached
- **Redis capabilities** — Redis supports replication, Multi-AZ automatic failover, read replicas, backup and restore, and data persistence using append-only files (AOF) for supported configurations.
- **Redis data structures** — Redis supports sets and sorted sets; sorted sets maintain unique, ordered scores for real-time leaderboards, and Redis geospatial commands support location lookup and distance queries.
- **Redis TTL** — Set a time-to-live on cache keys to expire stale or temporary values, including sessions and current location data.
- **Memcached** — Memcached is a multithreaded cache that can shard data across nodes; it is nonpersistent and does not provide replication-based high availability.
- **Memcached authentication** — Memcached supports SASL-based authentication in supported configurations.

#### Caching patterns
- **Lazy loading** — Read from cache first, fetch from the database on a miss, then populate the cache; it caches only requested data but can serve stale values until invalidated or expired.
- **Write-through** — Update the cache when data is written to the database, keeping cached values fresher at the cost of adding cache work to writes.
- **Session store** — Keep shared, temporary session state in Redis with a TTL so any application instance can retrieve it and sessions can expire automatically.
- **Leaderboard and geospatial uses** — Use Redis sorted sets for ranked leaderboards and its geospatial commands for rapidly updated location lookups.

#### Security and availability
- **Network protection** — Place clients and the cache in appropriate VPC networking and restrict access with security groups; TLS supports encryption in transit.
- **Redis authentication** — Redis supports IAM authentication in supported configurations and Redis AUTH tokens/passwords as an additional cache-level control.
- **Persistence** — Redis backup/snapshot and AOF capabilities support recovery or durability needs, but ElastiCache remains a cache service and should not be treated as the authoritative durable database.

#### Compared with
- **Redis vs. Memcached** — Choose Redis for persistence, sorted sets, geospatial commands, replication, or failover; choose Memcached for a simpler multithreaded, sharded, nonpersistent cache.
- **ElastiCache vs. DAX** — ElastiCache is a general-purpose cache for application data and query results; DAX is the transparent in-memory cache specifically for DynamoDB.
- **ElastiCache vs. MemoryDB** — Use ElastiCache to accelerate a primary database; use MemoryDB when the Redis-compatible in-memory store itself must be the durable primary database.

- **See also:** Amazon MemoryDB for Redis, Amazon RDS, Amazon DynamoDB, Amazon CloudFront

### Amazon MemoryDB for Redis


Amazon MemoryDB for Redis is a durable in-memory database compatible with Redis OSS data structures, APIs, and commands. Choose it when an application needs very fast in-memory access with a durable primary data store rather than a disposable cache.

#### What it is
- **Primary database** — MemoryDB combines in-memory performance with durability, so microservices can use it as their primary database instead of separately operating a cache and a durable database.
- **Redis compatibility** — Applications can use familiar Redis-compatible data structures, APIs, and commands; MemoryDB is distinct from ElastiCache, which is designed primarily to cache another data store.
- **Durability** — MemoryDB stores data in memory and maintains a durable transactional log across multiple AZs; the log supports recovery, failover, and node restarts.
- **Performance** — MemoryDB provides microsecond reads, single-digit millisecond writes, and high throughput.
- **Availability** — Multi-AZ durability and automatic recovery support high availability; use it when durable in-memory data is more important than a cache's disposable state.

#### Compared with
- **MemoryDB vs. ElastiCache** — MemoryDB is a durable primary database; ElastiCache is an in-memory cache used to accelerate an application or backing database.
- **MemoryDB vs. Redis on a server** — MemoryDB provides managed infrastructure and durable multi-AZ operation while retaining Redis-compatible application interfaces.

- **See also:** Amazon ElastiCache, Amazon DynamoDB, Amazon RDS

### Amazon DocumentDB


Amazon DocumentDB is a managed, MongoDB-compatible document database for JSON-oriented data. Choose it when an application needs document storage and queries without translating document structures into relational tables.

#### What it is
- **Document model** — DocumentDB stores, queries, and indexes JSON documents using MongoDB-compatible APIs; it is a NoSQL document database rather than a relational SQL engine.
- **Managed deployment** — Its deployment concepts resemble Aurora: AWS manages the service and replicates data across three AZs for availability.
- **Storage scaling** — DocumentDB storage automatically grows in **10-GB increments** as the database expands.
- **Scale** — The service is designed to scale to workloads with millions of requests per second.
- **Workload fit** — Use it for applications built around MongoDB-compatible document access; choose a relational database when joins and relational transactions are central.

#### Compared with
- **DocumentDB vs. Aurora** — DocumentDB targets MongoDB-compatible JSON documents; Aurora targets relational PostgreSQL- or MySQL-compatible SQL workloads.
- **Migration** — DMS supports DocumentDB as a source and target; use SCT when a heterogeneous source-to-target schema requires conversion.

- **See also:** Amazon RDS, Amazon Aurora, Amazon Neptune, AWS Database Migration Service

### Amazon Neptune


Amazon Neptune is a managed graph database optimized for highly connected data and relationship traversals. Choose it for applications such as social networks, fraud detection, recommendations, and knowledge graphs.

#### What it is
- **Graph model** — Neptune represents entities and their relationships as a graph, so queries can traverse connections more naturally than relational joins for deeply linked data.
- **Scale and latency** — It can store billions of relationships and query connected data with millisecond latency.
- **Availability** — Neptune replicates across multiple AZs and supports up to **15 read replicas** for read scaling.
- **Graph use cases** — Common applications include social networks, recommendation engines, fraud detection, and knowledge graphs such as encyclopedia relationships.
- **Query technologies** — Neptune supports graph query languages including Gremlin, openCypher, and SPARQL for supported graph models.

#### Neptune Streams
- **Ordered change stream** — Neptune Streams exposes an ordered sequence of graph changes shortly after writes, without duplicates.
- **Access and use** — Applications read stream data through an HTTP REST API to send change notifications, synchronize another data store, or replicate graph changes across Regions.

#### Compared with
- **Neptune vs. relational databases** — Use Neptune when the key query is traversing many relationships; use RDS or Aurora when the data is relational and joins are the natural access pattern.
- **Neptune vs. search** — Neptune answers graph relationship queries; a search index is better for free-text and document search.

- **See also:** Amazon DocumentDB, Amazon RDS, Amazon Aurora, AWS Database Migration Service

### Amazon Keyspaces (for Apache Cassandra)


Amazon Keyspaces is a serverless, managed Apache Cassandra-compatible database that uses Cassandra Query Language (CQL). Choose it for distributed wide-column workloads that need Cassandra compatibility without operating Cassandra clusters.

#### What it is
- **Compatibility** — Keyspaces supports Apache Cassandra-compatible APIs and CQL, allowing Cassandra applications to use a managed AWS service.
- **Availability** — Tables are replicated three times across multiple AZs, and AWS manages the database infrastructure.
- **Scaling and latency** — Keyspaces scales tables up or down with traffic and provides single-digit millisecond latency at workloads of thousands of requests per second.
- **Capacity modes** — Choose on-demand capacity or provisioned capacity with auto scaling.
- **Data protection** — Keyspaces encrypts data, supports backups, and provides point-in-time recovery for up to **35 days**.
- **Workload fit** — Common uses include IoT device records and time-series data that fit Cassandra's distributed wide-column model.

#### Compared with
- **Keyspaces vs. RDS** — Choose Keyspaces for Cassandra/CQL-compatible distributed workloads; choose RDS for relational SQL, joins, and transactional relational schemas.

- **See also:** Amazon DynamoDB, Amazon Timestream, AWS Database Migration Service

### Amazon Timestream


Amazon Timestream is a managed, serverless time-series database for high-volume event data. Choose it for IoT, operational telemetry, and real-time analytics with time-based queries and retention tiers.

#### What it is
- **Time-series data** — Timestream stores and analyzes timestamped records and can handle trillions of events per day.
- **Managed scaling** — The service scales capacity up or down automatically without database-server provisioning.
- **Query features** — Timestream supports SQL, scheduled queries, multi-measure records, and built-in time-series analytics for identifying patterns.
- **Tiered storage** — Recent data is retained in a fast memory tier while historical data moves to cost-optimized storage.
- **Performance and cost** — For suitable time-series workloads, Timestream can be thousands of times faster and one-tenth the cost of relational databases; actual results depend on workload and query pattern.
- **Security** — Timestream encrypts data in transit and at rest.

#### Integrations
- **Ingestion** — Sources and integrations include AWS IoT, Kinesis Data Streams, Lambda, Prometheus, and Amazon MSK.
- **Analytics and visualization** — Timestream can feed QuickSight, SageMaker, Kinesis Data Analytics for Apache Flink, and JDBC-connected applications.

#### Compared with
- **Timestream vs. RDS** — Use Timestream for high-volume timestamped data and time-series analysis; use RDS for general relational transactions and joins.
- **Timestream vs. Keyspaces** — Choose Timestream for managed time-series analytics and time-tiered storage; choose Keyspaces when Cassandra/CQL compatibility is required.

- **See also:** Amazon Keyspaces (for Apache Cassandra), Amazon RDS, Amazon Kinesis Data Streams, Amazon QuickSight

### Amazon QLDB


Amazon Quantum Ledger Database (QLDB) was a managed ledger database designed to maintain an immutable, cryptographically verifiable history of application data. AWS ended QLDB support on **July 31, 2025**; retain this entry as historical service knowledge, not as a new deployment choice.

#### What it is
- **Immutable journal** — QLDB maintained a transaction journal whose history could not be overwritten or deleted, making it suitable for a complete record of changes.
- **Cryptographic verification** — The journal's cryptographic digest could be used to verify that a document's history had not been altered.
- **Centralized ownership** — Unlike a blockchain network, QLDB was controlled by a central authority and did not require multiple independent participants to reach consensus.
- **Ledger queries** — QLDB exposed a SQL-like query interface for searching ledger data and its history.
- **Use cases** — Examples include financial, supply-chain, and other systems that need an auditable, verifiable change history.

#### Compared with
- **QLDB vs. blockchain** — Choose a blockchain when independent parties need a decentralized shared ledger and consensus; QLDB was a centrally managed ledger with verifiable history.
- **QLDB vs. ordinary database** — A conventional database can update current values but does not inherently provide QLDB's immutable, cryptographically verifiable transaction history.

- **See also:** Amazon DynamoDB, Amazon RDS, AWS Database Migration Service

### AWS Database Migration Service


AWS Database Migration Service (AWS DMS) migrates database data while the source remains available and supports initial loads as well as ongoing change data capture. Use DMS for homogeneous or heterogeneous migrations and continuous database replication.

#### What it is
- **Homogeneous migration** — DMS moves data between databases using the same engine, such as Oracle to Oracle; schema conversion is generally unnecessary.
- **Heterogeneous migration** — DMS can move data between different engines, such as SQL Server to Aurora; use AWS Schema Conversion Tool (SCT) to convert schemas and code that are incompatible with the target.
- **Initial load and CDC** — A DMS task can load existing data and use change data capture (CDC) to replicate changes made after the load begins.
- **Source availability** — The source database can remain online during migration or replication, allowing applications to continue operating while changes are copied.
- **Replication capacity** — Provisioned DMS tasks run on a replication instance; DMS Serverless can provision and scale replication capacity automatically for variable workloads.

#### AWS Schema Conversion Tool
- **Schema conversion** — SCT converts database schemas and code objects from one engine to another, such as Oracle or SQL Server to MySQL, PostgreSQL, or Aurora for OLTP, and Teradata or Oracle to Redshift for OLAP.
- **When to use SCT** — Same-engine moves such as on-premises PostgreSQL to RDS PostgreSQL do not require conversion; SCT can still help assess compatibility issues.
- **Conversion compute** — Schema conversion can be compute-intensive, so use an appropriately sized compute instance for large conversion jobs.
- **Division of work** — SCT converts schema and code; DMS moves the table data and can replicate ongoing changes.

#### Sources and targets
- **Sources** — DMS sources include on-premises and EC2-hosted Oracle, SQL Server, MySQL, MariaDB, PostgreSQL, MongoDB, SAP, and Db2; Azure SQL Database; Amazon RDS engines including Aurora; Amazon S3; and DocumentDB.
- **Targets** — DMS targets include on-premises and EC2-hosted Oracle, SQL Server, MySQL, MariaDB, PostgreSQL, and SAP; Amazon RDS; Redshift; DynamoDB; S3; OpenSearch Service; Kinesis Data Streams; Apache Kafka; DocumentDB; Neptune; Redis; and Babelfish.

#### Availability
- **Multi-AZ replication instance** — When Multi-AZ is enabled, DMS maintains a synchronous standby replication instance in another AZ, providing redundancy, avoiding I/O freezes, and minimizing latency spikes during instance failure.
- **Migration scope** — DMS supports migrations from on-premises to AWS, between AWS databases, and from AWS to on-premises environments.

#### Compared with
- **DMS vs. SCT** — DMS copies and replicates data; SCT converts schemas and code. Heterogeneous migrations commonly use both, while a same-engine move commonly needs DMS alone.
- **DMS vs. backup restore** — Use DMS when ongoing changes must be replicated or a low-downtime migration is needed; use snapshots or engine-native backups for point-in-time restoration or suitable offline moves.

- **See also:** Amazon RDS, Amazon Aurora, Amazon DocumentDB, Amazon Neptune

### Choosing a database


Choose a database by its data model, query patterns, consistency and durability needs, latency, throughput variability, scale, and licensing cost.

#### Workload -> service
- **Relational OLTP, SQL, joins, and transactions** -> Amazon RDS for familiar managed engines; Amazon Aurora for compatible MySQL/PostgreSQL workloads needing Aurora's distributed storage, read scaling, or global features.
- **Intermittent or unpredictable relational demand** -> Aurora Serverless; prefer provisioned RDS or Aurora when demand is steady and known.
- **Lambda connection bursts to RDS or Aurora** -> Amazon RDS Proxy to pool connections; use SQS instead when work should be queued asynchronously.
- **Frequently read results, sessions, leaderboards, or live geospatial lookups** -> Amazon ElastiCache for Redis; use Memcached for a simpler multithreaded, nonpersistent sharded cache.
- **Durable Redis-compatible in-memory primary store** -> Amazon MemoryDB for Redis rather than a disposable cache.
- **MongoDB-compatible JSON documents** -> Amazon DocumentDB.
- **Highly connected relationships and graph traversals** -> Amazon Neptune.
- **Cassandra-compatible wide-column data and CQL** -> Amazon Keyspaces (for Apache Cassandra).
- **Timestamped IoT or operational events with time-series analytics** -> Amazon Timestream.
- **Immutable, cryptographically verifiable ledger history** -> Amazon QLDB for historical service knowledge; confirm AWS availability before selecting a replacement for a new project.
- **Database migration with initial load plus ongoing changes** -> AWS DMS; add SCT when source and target engines differ.
- **General key-value/document data with serverless scaling** -> Amazon DynamoDB; use DAX for transparent DynamoDB caching rather than using ElastiCache as a native drop-in cache.
- **Choose from requirements, not labels** — Confirm the query language, schema flexibility, joins, access paths, retention, recovery objective, multi-Region needs, license model, and expected read/write mix before selecting a service.

- **See also:** Amazon DynamoDB, Amazon RDS, Amazon RDS Proxy, Amazon Aurora, Amazon ElastiCache, Amazon MemoryDB for Redis, Amazon DocumentDB, Amazon Neptune, Amazon Keyspaces (for Apache Cassandra), Amazon Timestream, Amazon QLDB, AWS Database Migration Service

## Networking and content delivery

### Amazon VPC


A Virtual Private Cloud is a logically isolated network in an AWS Region where you choose IP ranges, subnets, routing, and network controls. Use it to place AWS resources on private network paths and control how they communicate with each other, AWS services, on-premises networks, and the internet.

#### What it is
- **Regional network** — A VPC is an isolated network boundary within one AWS Region; default VPC quota is **5 per Region** and can be increased.
- **Private addressing** — Select IPv4 and optional IPv6 CIDR ranges for the network, then divide them into AZ-scoped subnets.

#### Addressing and subnets
- **VPC scope** — A VPC spans a Region; each subnet is confined to one Availability Zone, so use subnets in multiple AZs for zonal resilience.
- **IPv4 CIDRs** — A VPC can have up to five IPv4 CIDR blocks; each block ranges from **/16** (65,536 addresses) to **/28** (16 addresses). Plan non-overlapping ranges across VPCs and connected corporate networks.
- **Private IPv4 ranges** — RFC 1918 ranges are **10.0.0.0/8**, **172.16.0.0/12**, and **192.168.0.0/16**; other IPv4 ranges are public.
- **CIDR interpretation** — **/32** identifies one IPv4 address, **/24** spans 256 addresses, **/16** spans 65,536, and **/0** covers all IPv4 addresses.
- **Subnet reservations** — AWS reserves the first four and last IPv4 addresses in every subnet. In a `10.0.0.0/24`, these are `10.0.0.0` (network), `.1` (VPC router), `.2` (Amazon-provided DNS), `.3` (future use), and `.255` (broadcast, unsupported in a VPC); a /24 therefore has 251 assignable addresses.
- **Default VPC** — New accounts receive a default VPC; an EC2 instance launched without an explicitly selected subnet goes there. It has internet connectivity, and instances receive public IPv4 addresses plus public and private IPv4 DNS names.
- **Public subnet** — A subnet is public only when its associated route table has a route to an attached Internet Gateway; an instance also needs a public address and permissive security rules to be internet reachable.
- **DHCP and DNS** — A VPC DHCP options set supplies network settings such as domain name and DNS servers. The Amazon-provided resolver handles VPC DNS and private hosted zones when `enableDnsSupport` and `enableDnsHostnames` are enabled; custom DHCP DNS settings can point clients at other resolvers.

#### Routing and internet access
- **Route tables** — Each subnet uses one route table, explicitly or through the main table. Routes select a destination CIDR and target; add routes for internet gateways, NAT gateways, peering, endpoints, VPNs, or transit gateways as appropriate.
- **Internet Gateway (IGW)** — Attach an IGW to a VPC for IPv4 and IPv6 internet routing; it is horizontally scaled, redundant, and highly available. An IGW alone does not provide internet access: routes and suitable instance addresses and security rules are also required.
- **IGW attachment** — An IGW attaches to one VPC, and a VPC can have only one attached IGW at a time.
- **Bastion host** — A bastion is an EC2 jump host in a public subnet used to SSH to private instances. Restrict its inbound SSH rule to a trusted corporate CIDR; allow private instances to accept SSH from the bastion security group or its private IP.
- **NAT Gateway** — A public NAT Gateway lets instances in private IPv4 subnets initiate internet connections while preventing unsolicited inbound connections. It uses an Elastic IP, requires an IGW and route-table entries, and has no security group; it is intended for clients in other subnets, not instances in its own subnet.
- **NAT Gateway capacity and cost** — A zonal NAT Gateway is created in one AZ, starts at **5 Gbps** and scales automatically to **100 Gbps**; AWS manages it, and charges apply per hour and per GB processed.
- **NAT Gateway resilience** — A NAT Gateway is resilient within its AZ but is not cross-AZ resilient. Deploy one per used AZ and route each private subnet through its same-AZ gateway to avoid cross-AZ dependency and traffic charges.
- **Regional NAT Gateway** — A Regional NAT Gateway is associated with a VPC, has its own route tables, and expands automatically into newly used AZs, avoiding per-AZ NAT deployments and the need for public subnets to host it.
- **NAT instance** — The older customer-managed alternative runs in a public subnet, needs an Elastic IP, disabled EC2 source/destination checking, routes from private subnets, and security-group rules; bandwidth depends on instance type, and you manage patching and failover. Allow HTTP/HTTPS from private subnets, SSH only from a trusted network, and HTTP/HTTPS outbound. A preconfigured Amazon Linux NAT AMI existed, but its standard support ended on **December 31, 2020**.
- **NAT comparison** — Prefer NAT Gateway for AWS-managed scaling and availability; use a NAT instance only when its instance-level control or custom configuration justifies operating and scaling it yourself. NAT Gateway costs per hour and data processed; a NAT instance also incurs EC2 instance and network charges. A NAT instance can also serve as a bastion host, unlike a NAT Gateway.
- **IPv6 egress** — An egress-only IGW lets IPv6 instances initiate outbound internet connections but blocks connections initiated from the internet; it is IPv6-only and requires a route-table entry.

#### Network controls
- **Security groups** — Security groups are stateful, allow-only firewalls attached to network interfaces or instances; return traffic is automatically permitted, and all applicable rules are evaluated together.
- **Network ACLs (NACLs)** — NACLs are stateless subnet-level allow/deny filters. They apply to every resource in the associated subnet, so explicitly allow both request and response directions.
- **NACL ordering** — Rules are numbered **1–32766**, evaluated from the lowest number upward, and the first match wins; the terminal `*` rule denies traffic with no match. New custom NACLs deny all traffic, while the default NACL allows inbound and outbound traffic; AWS recommends incrementing rule numbers by 100 rather than editing the default NACL.
- **Security group vs. NACL** — Use security groups for stateful per-interface access control and NACLs for stateless subnet-wide filtering, including explicit deny rules or blocking a source IP. Both routing and security rules must permit a flow.
- **Ephemeral ports** — A client connects to a server's fixed destination port and receives replies on a client-selected ephemeral port. Example ranges are **49152–65535** for IANA/Windows 10 and **32768–60999** for many Linux kernels; NACLs must permit the return range used by the clients (the course example uses **1024–65535**).

#### Connectivity between VPCs and services
- **VPC peering** — Peering privately connects two VPCs over AWS networking, including across accounts or Regions, only when their CIDRs do not overlap. It is **not transitive**: create a separate peering connection for every communicating pair and add routes in both VPCs.
- **Shared subnets** — AWS RAM can share VPC subnets across accounts in the same AWS Organization, allowing participant accounts to place resources in a centrally managed VPC instead of creating many peering links.
- **Peering limits and rules** — AWS recommends no more than **125 peering connections per VPC**; peering does not provide a hub, shared internet/NAT, or transitive routing through another VPC, so a growing full mesh requires many pairwise links. A security group in a peered VPC can be referenced across accounts when the peers are in the same Region.
- **VPC endpoints** — Endpoints provide private connectivity to supported AWS services without sending service traffic through an IGW or NAT Gateway; see AWS PrivateLink for endpoint types and provider services. Examples include S3, DynamoDB, CloudFormation, Systems Manager, CloudWatch, and SNS; check VPC DNS settings and route tables when endpoint access fails.
- **VPC Flow Logs** — Flow Logs capture IP traffic metadata at VPC, subnet, or ENI level, including traffic for managed interfaces such as load balancers, RDS, ElastiCache, Redshift, WorkSpaces, NAT Gateways, and Transit Gateways; they do not capture packet payloads.
- **Flow Log destinations and analysis** — Send logs to S3, CloudWatch Logs, or Kinesis Data Firehose; analyze S3 data with Athena or CloudWatch data with Logs Insights. Records can include source/destination addresses and ports, protocol, packet/byte counts, times, and `ACCEPT`/`REJECT` action.
- **Flow Log troubleshooting** — A rejected inbound or outbound flow can indicate a security-group or NACL block; an accepted request followed by a rejected response points to a stateless NACL return rule. The `action` field identifies the logged decision.
- **Flow Logs permissions** — Publishing to CloudWatch Logs requires an IAM service role with permissions such as `logs:CreateLogGroup`, `logs:CreateLogStream`, and `logs:PutLogEvents`.
- **Traffic Mirroring** — Copy selected inbound or outbound packets from source ENIs to a target ENI or Network Load Balancer for security inspection, threat monitoring, or troubleshooting; capture all packets or filter and truncate them.
- **Traffic Mirroring scope** — Sources and targets can be in the same VPC or in VPCs connected by peering; the mirrored traffic can be sent to security appliances that you operate.
- **Private-IP costs** — Same-AZ traffic and inbound data transfer are shown as free in the simplified pricing model; cross-AZ transfer is lower over private IP (**$0.01/GB**) than public or Elastic IP paths (**$0.02/GB**), and inter-Region transfer is shown at **$0.02/GB**.
- **Egress costs** — Internet egress is generally charged while ingress is typically free; keep traffic within AWS where practical, and a Direct Connect location in the same Region can reduce egress cost.

#### IPv6
- **Dual stack** — IPv4 cannot be disabled in a VPC or subnet; add IPv6 and operate in dual-stack mode. AWS IPv6 addresses are globally unique and internet-routable, not private addresses.
- **IPv6 internet routing** — An IGW supports IPv4 and IPv6 routes; an egress-only IGW is the outbound-only choice for private IPv6 workloads. IPv4 private-subnet egress still uses NAT Gateway when accessing IPv4 destinations.

#### Diagnostics and exam cues
- **Reachability Analyzer** — Analyze a modeled path between supported network resources to identify configuration blockers such as routes, security groups, or NACLs; it evaluates configuration rather than sending test packets.
- **Choose VPC controls** — A public address by itself is insufficient for internet reachability; verify the subnet route, IGW attachment, security-group rules, and NACL rules together.
- **See also:** AWS PrivateLink, AWS Transit Gateway, AWS Site-to-Site VPN, AWS Client VPN, AWS Network Firewall, Amazon Route 53, Elastic Fabric Adapter

### AWS PrivateLink


AWS PrivateLink provides private connectivity to AWS services and services that you expose from your own VPC, without requiring public IP routing or VPC peering. Use an interface endpoint for most supported services or publish a private endpoint service for consumers.

#### What it is
- **Private connectivity** — PrivateLink connects consumers to services over AWS private networking without public IP routing or VPC peering.
- **Interface endpoint** — Creates private IP addresses on endpoint network interfaces (ENIs) in selected subnets; attach a security group to control traffic to those ENIs.
- **AWS service access** — Interface endpoints use PrivateLink to reach many AWS services privately, including examples such as CloudWatch, SNS, CloudFormation, and Systems Manager, without an IGW or NAT Gateway; endpoints are redundant and scale horizontally.

#### Choosing an endpoint
- **Endpoint charges** — Interface endpoints are charged per endpoint-hour and per GB processed; compare those costs with NAT Gateway processing for the expected traffic volume.
- **Gateway endpoints** — S3 and DynamoDB are the gateway-endpoint services; a gateway endpoint adds a route-table target, uses no security group, and has no endpoint hourly or data-processing charge. A gateway endpoint can avoid example NAT Gateway charges of **$0.045/hour** and **$0.045/GB** processed; same-Region S3 transfer is shown at **$0/GB**, versus **$0.09/GB** cross-Region.
- **Choosing S3 access** — Prefer a gateway endpoint for workloads in its VPC and Region; use an interface endpoint when access is needed from on-premises, another VPC, or another Region.
- **Endpoint policies** — An endpoint policy can further limit which principals and resources are reachable through that endpoint; IAM and resource policies still apply.

#### Endpoint services
- **Provider setup** — Expose a service from a provider VPC as an endpoint service behind a Network Load Balancer, then grant selected AWS principals permission to connect.
- **Consumer setup** — A consumer creates an interface endpoint to the provider service; the connection stays on AWS private networking and avoids VPC peering, public internet, NAT, and provider-side inbound access from the consumer.
- **Service acceptance** — Endpoint services can require provider acceptance of connection requests; consumers can connect across accounts and supported Regions when the provider permits it.
- **On-premises access** — On-premises networks can reach an interface endpoint over Direct Connect or Site-to-Site VPN when routing and endpoint security groups permit it.
- **Limitations** — PrivateLink provides private consumer-to-provider service connectivity, not general transitive VPC routing; use Transit Gateway for a routed hub between networks.
- **See also:** Amazon VPC, AWS Transit Gateway, AWS Direct Connect

### AWS Transit Gateway


AWS Transit Gateway is a managed regional hub that connects VPCs and hybrid networks through attachments and centrally controlled route tables. Choose it instead of a large non-transitive VPC peering mesh when many VPCs or on-premises networks must communicate.

#### What it is
- **Hub-and-spoke** — Attach VPCs, Site-to-Site VPNs, and Direct Connect connectivity to a Transit Gateway to enable transitive routing among many networks.
- **Regional and cross-Region** — A Transit Gateway is regional; peer Transit Gateways to route between Regions.
- **Cross-account sharing** — Share a Transit Gateway with other accounts using AWS Resource Access Manager (RAM).
- **Route tables** — Associate attachments with Transit Gateway route tables and control reachability by installing, propagating, or isolating routes; separate tables support segmented networks and shared-services patterns.
- **Direct Connect integration** — Connect a Direct Connect Gateway to a Transit Gateway through a transit virtual interface; a Direct Connect Gateway is the DX integration point, not itself the VPC-to-VPC transit router.
- **Multicast** — Transit Gateway is the AWS networking service that supports IP multicast.

#### VPN throughput and ECMP
- **ECMP** — Equal-cost multi-path routing distributes traffic across equally preferred paths; Transit Gateway can use it across multiple dynamically routed Site-to-Site VPN tunnels.
- **VPN throughput example** — A Site-to-Site VPN tunnel to a virtual private gateway is limited to **1.25 Gbps**; a Transit Gateway VPN attachment can aggregate two tunnels to **2.5 Gbps**, with examples of two connections totaling **5 Gbps** and three totaling **7.5 Gbps** when ECMP is used.
- **Routing requirement** — Use dynamic BGP routing and eligible equal-cost paths for VPN ECMP; a virtual private gateway does not provide Transit Gateway ECMP.

#### Compared with
- **Transit Gateway vs. peering** — Transit Gateway is transitive and centrally routes among many attachments; VPC peering is a direct, non-transitive connection between a pair of VPCs.
- **See also:** Amazon VPC, AWS PrivateLink, AWS Direct Connect, AWS Site-to-Site VPN

### AWS Direct Connect


AWS Direct Connect establishes a dedicated private network connection from a customer network to an AWS Direct Connect location. Choose it for consistent hybrid connectivity and higher throughput; it is not encrypted by default and can take significant time to provision.

#### What it is
- **Dedicated path** — A physical Ethernet connection runs from a customer or partner router at a Direct Connect location to AWS; use a virtual interface (VIF) to reach AWS resources.
- **IP support** — Direct Connect supports both IPv4 and IPv6.
- **Use cases** — Connect on-premises networks to AWS for large data sets, bandwidth-intensive applications, real-time feeds, or a more consistent network experience; public AWS services and private VPC resources can use separate VIFs on the connection.
- **Dedicated connections** — A dedicated connection provides a physical Ethernet port for one customer; the course lists capacities from **1 Gbps to 400 Gbps**, requested from AWS and completed by a Direct Connect Partner.
- **Hosted connections** — A hosted connection is provisioned through a Direct Connect Partner; the course lists **50 Mbps to 25 Gbps**, with capacity that can be added or removed on demand.
- **Provisioning time** — Establishing a new connection can take longer than a month, so Direct Connect is not the fastest option for an urgent connection.

#### Virtual interfaces and gateways
- **Private VIF** — Use a private virtual interface to reach private VPC addresses through a Virtual Private Gateway, or through a Direct Connect Gateway for multi-Region designs.
- **Public VIF** — Use a public virtual interface to reach public AWS service endpoints, such as S3, over Direct Connect without sending traffic over the public internet.
- **Transit VIF** — Use a transit virtual interface to connect a Direct Connect Gateway to a Transit Gateway for hybrid routing across multiple VPC attachments.
- **Direct Connect Gateway** — This global resource associates a Direct Connect connection/VIF with Virtual Private Gateways in multiple Regions, or with a Transit Gateway using a transit VIF; it does not replace Transit Gateway for VPC-to-VPC transit routing.
- **BGP and VLANs** — VIFs use VLAN tagging and BGP to establish and exchange routes with AWS; advertise only prefixes appropriate to the selected public, private, or transit VIF.
- **Link Aggregation Group (LAG)** — Combine multiple eligible Direct Connect ports into one logical connection for greater aggregate bandwidth and link-level resilience; member connections must meet AWS LAG compatibility requirements.
- **SiteLink** — SiteLink lets supported Direct Connect locations communicate with each other over the AWS global network without routing the traffic through a VPC; it is configured on eligible VIFs and is distinct from a Transit Gateway hub.

#### Security and resilience
- **Encryption** — Direct Connect traffic is private but is not encrypted in transit by default; run Site-to-Site VPN over Direct Connect when IPsec encryption is required.
- **Redundant connections** — For high resilience, use redundant connections at separate Direct Connect locations; maximum resilience uses separate connections terminating on separate devices in more than one location.
- **Backup connectivity** — A Site-to-Site VPN can provide a lower-cost encrypted backup path if Direct Connect fails; a second Direct Connect connection is another, more expensive option.
- **Compared with VPN** — Direct Connect provides a dedicated, consistent private path but takes longer to establish and does not encrypt by default; VPN is quicker to set up and encrypts traffic over the public internet.
- **See also:** AWS Transit Gateway, AWS Site-to-Site VPN

### AWS Site-to-Site VPN


AWS Site-to-Site VPN creates IPsec tunnels between an on-premises network and an AWS-side gateway over the public internet. Use it for encrypted hybrid connectivity, rapid setup, or as a backup to Direct Connect.

#### What it is
- **Customer Gateway (CGW)** — Represents the customer-side VPN device; it can be a physical appliance or software, and AWS needs its public, internet-routable IP address.
- **NAT traversal** — If the customer gateway is behind a NAT device with NAT traversal enabled, configure the public IP address of that NAT device.
- **Virtual Private Gateway (VGW)** — The AWS-side VPN concentrator is attached to the VPC; its ASN can be customized.

#### Routing and security
- **Transit Gateway option** — Attach VPN connections to Transit Gateway when the VPN must reach multiple VPCs or use Transit Gateway route tables and ECMP.
- **Redundancy** — A VPN connection provides two tunnels for availability; configure both tunnel paths and appropriate routing rather than depending on a single tunnel.
- **Routing** — Enable route propagation for a VGW in the subnet route table, or configure the appropriate static routes; security groups and NACLs still control the permitted traffic.
- **Static vs. dynamic routing** — Static routing requires you to enter remote network prefixes; dynamic routing uses BGP to exchange routes and react to path changes, and is required for Transit Gateway VPN ECMP.
- **IPsec encryption** — VPN tunnels encrypt traffic in transit; they traverse the public internet, so performance and latency can vary compared with Direct Connect.

#### Options and patterns
- **Accelerated Site-to-Site VPN** — Uses AWS Global Accelerator at the VPN entry point to improve availability and performance over the AWS global network; it is an option when a regular internet VPN path is not sufficient.
- **AWS VPN CloudHub** — Connect multiple Site-to-Site VPN connections to one VGW with dynamic routing and route tables to create a low-cost hub-and-spoke network among remote sites; it still uses the public internet.
- **Direct Connect backup or encryption** — Use VPN as a backup to Direct Connect, or overlay VPN on Direct Connect when private connectivity must also be IPsec-encrypted.
- **Reachability requirements** — For an on-premises host to ping an EC2 instance, the route and security group must also permit ICMP; a VPN tunnel alone does not grant application access.
- **See also:** AWS Direct Connect, AWS Transit Gateway, Amazon VPC

### AWS Client VPN


AWS Client VPN is a managed remote-access VPN for individual users and devices, providing encrypted connectivity to VPC and on-premises resources. Choose it for user-to-network access rather than connecting an entire data center with Site-to-Site VPN.

#### What it is
- **Client-based access** — Users connect with an OpenVPN-based client to a Client VPN endpoint; the service terminates client connections and routes authorized traffic to associated networks.
- **Authentication** — Supports mutual certificate authentication and user-based authentication through Active Directory or federated SAML 2.0; authentication can be combined with mutual authentication.
- **Network association** — Associate target subnets in one or more AZs for availability and resource access; configure endpoint routes and authorization rules separately.
- **Client address pool** — Assign a client CIDR that does not overlap with the VPC or networks the endpoint will reach; clients receive addresses from this range.
- **Split tunnel** — With split tunneling enabled, only traffic for routes configured on the endpoint goes through the VPN; otherwise client traffic can be sent through the VPN endpoint.
- **Hybrid access** — Client VPN can reach on-premises networks through Site-to-Site VPN or Direct Connect when routes and authorization permit.
- **Compared with Site-to-Site VPN** — Client VPN is for individual remote users; Site-to-Site VPN connects whole customer and AWS networks through customer and virtual private gateways.
- **See also:** AWS Site-to-Site VPN, AWS Direct Connect, Amazon VPC

### Amazon Route 53


Amazon Route 53 is a highly available, scalable, managed authoritative DNS service that also supports domain registration and resource health checks. Use it to answer DNS queries with records, health-based failover, and location- or latency-aware routing; DNS answers direct clients but do not proxy their application traffic.

#### What it is
- **Authoritative DNS** — Route 53 is a managed authoritative DNS service, domain registrar, and resource-health-check service; it advertises a **100% availability SLA** for its DNS service.
- **Hosted-zone pricing** — A hosted zone is listed at **$0.50 per month**.

#### DNS records and zones
- **Record contents** — A record identifies a name, type, value, routing policy, and TTL; record types include **A**, **AAAA**, **CNAME**, **NS**, **CAA**, **DS**, **MX**, **NAPTR**, **PTR**, **SOA**, **TXT**, **SPF**, and **SRV**.
- **A and AAAA** — A maps a name to an IPv4 address; AAAA maps a name to an IPv6 address.
- **CNAME** — Maps a non-apex hostname to another hostname, whose target must resolve to an A or AAAA record; it cannot be used at the zone apex.
- **Hosted zones** — A hosted zone is a container for the records for a domain and its subdomains; a public hosted zone answers for internet DNS, and a private hosted zone answers within associated VPCs.
- **Private hosted zones** — Associate a private hosted zone with one or more VPCs and enable both `enableDnsSupport` and `enableDnsHostnames` on each VPC that must resolve its records.
- **TTL** — DNS resolvers cache a record for its TTL; a high TTL reduces DNS query volume but can preserve stale answers longer, while a low TTL makes changes take effect sooner but increases queries. TTL is required for ordinary records.

#### Alias and routing
- **Alias records** — An Alias points a DNS name to a supported AWS resource and tracks changing resource addresses; AWS-resource aliases use **A or AAAA** records, can be used at the zone apex or a subdomain, are free, and have no configurable TTL.
- **Alias targets** — Supported targets include ELBs, CloudFront distributions, API Gateway, Elastic Beanstalk environments, S3 website endpoints, VPC interface endpoints, Global Accelerator, and another record in the same hosted zone; an EC2 DNS name is not an Alias target.
- **Alias vs. CNAME** — Use Alias for AWS resources and zone-apex names; CNAME can point to any hostname but only at a non-apex name. Alias records support native target-health evaluation.
- **Simple routing** — Return one resource or multiple record values, from which the client chooses a random value; simple records cannot be associated with health checks, and an Alias simple record targets one AWS resource.
- **Weighted routing** — Send a relative share of DNS responses to same-name, same-type records using weights that need not sum to 100; use for traffic distribution or version tests, and set a record weight to zero to stop selecting it. If every record has weight zero, Route 53 returns them equally; weighted records can use health checks.
- **Latency-based routing** — Answer with the Region offering the lowest measured latency for the client; it can use health checks for failover.
- **Failover routing** — Use a health check on the primary record and return a secondary record for active-passive disaster recovery.
- **Geolocation routing** — Select a response based on the user's continent, country, or US state; when locations overlap, the most specific match wins. Create a default record for unmatched locations, and use it for localization or country-based policy; health checks can be associated with these records.
- **Geoproximity routing** — Route based on the geographic locations of users and resources, then shift traffic by a bias from **-99** (shrink) to **+99** (expand); use Route 53 Traffic Flow to configure it.
- **IP-based routing** — Map client CIDR collections to endpoint records, for example to steer an ISP's address range to a selected location.
- **Multi-value answer** — Return multiple healthy resource values, up to **eight** per query, with optional health checks; it is not a substitute for a load balancer.

#### Health checks and hybrid DNS
- **Health-check types** — Check public endpoints over HTTP, HTTPS, or TCP; combine child checks with calculated checks using **AND**, **OR**, or **NOT**; or monitor a CloudWatch alarm for metrics and private resources. Health checks integrate with CloudWatch metrics and can be used with weighted, latency, geolocation, and failover routing.
- **Endpoint health-check defaults** — About 15 global checkers monitor an endpoint; the default interval is **30 seconds** and the healthy/unhealthy threshold is **3**. A **10-second** interval is available at higher cost.
- **Health-check results** — More than **18%** of checkers must report healthy for the endpoint to be considered healthy; HTTP(S) checks pass on **2xx** or **3xx** responses and can match text in the first **5,120 bytes**. Choose checker locations as needed and allow inbound probes from Route 53 health-checker IP ranges in network firewalls.
- **Calculated checks** — Combine up to **255** child health checks and set how many must pass; this can suppress failover during planned maintenance.
- **Private-resource checks** — Public Route 53 health checkers cannot reach private VPC or on-premises endpoints; publish a metric to CloudWatch and check its alarm instead.
- **Route 53 Resolver** — The VPC Resolver answers for EC2 hostnames, private hosted zones, and public names; Resolver endpoints provide DNS forwarding between VPCs and on-premises networks over VPN or Direct Connect.
- **Inbound Resolver endpoint** — Lets on-premises DNS resolvers send queries into a VPC to resolve AWS private names.
- **Outbound Resolver endpoint** — Lets the VPC Resolver forward selected queries to on-premises DNS servers; use forwarding rules to select domains and destinations.

#### Domains and security
- **Domain registration** — A registrar registers the domain name, typically for an annual fee; the DNS service hosts and answers its records. They can be separate providers; when Route 53 hosts a third-party-registered domain, update the registrar's NS records to Route 53 name servers.
- **DNSSEC** — DNSSEC signing of a public hosted zone lets validating resolvers verify DNS response authenticity and integrity; configure the DS record with the domain registrar to establish the chain of trust.
- **Compared with load balancing** — Route 53 returns DNS answers, not application traffic; use a load balancer to distribute connections after name resolution.
- **See also:** Amazon CloudFront, AWS Global Accelerator, Amazon VPC, AWS Site-to-Site VPN

### Amazon CloudFront


Amazon CloudFront is a global content delivery network that caches and serves HTTP(S) content from edge locations, reducing viewer latency and origin load. Use it for static assets, dynamic web delivery, and protected content; it is not a general-purpose TCP/UDP accelerator.

#### What it is
- **Global edge network** — CloudFront caches content at hundreds of global Points of Presence to improve read performance and viewer experience while reducing origin load.
- **DDoS protection** — CloudFront integrates with AWS Shield and AWS WAF.

#### Origins and access
- **Origin choices** — Origins include S3 buckets, S3 static website endpoints, public HTTP servers, public load balancers, and supported private VPC origins.
- **Private VPC origins** — CloudFront VPC origins can deliver to private ALBs, NLBs, or EC2 instances in VPC subnets without exposing those origins to the public internet.
- **Custom origins** — A custom origin is any reachable HTTP(S) backend, including an on-premises server or public ALB; CloudFront can sit in front of dynamic applications as well as static files.
- **S3 origin access** — Use Origin Access Control (OAC) with a bucket policy to make an S3 bucket private and allow requests only from the CloudFront distribution; OAC also supports modern S3 features such as SSE-KMS.
- **Origin Access Identity** — OAI is the legacy S3-origin access mechanism; prefer OAC for new distributions, while recognizing that existing OAI distributions may still be in use.
- **S3 website origins** — An S3 static website endpoint must have static website hosting enabled and is treated as a custom origin; it does not use OAC like an S3 REST origin.
- **Uploads** — CloudFront can forward uploads to an S3 origin as well as serve downloads.
- **Origin groups** — Configure a primary and secondary origin for origin failover; CloudFront can switch to the secondary when configured response status codes from the primary trigger failover. Origin-group failover supports GET, HEAD, and OPTIONS requests.

#### Caching and delivery
- **Edge caching** — CloudFront caches content at global edge locations for a TTL; the default TTL is **one day** when the origin provides no cache-control directive, and caching serves repeat requests near viewers and reduces origin requests.
- **CloudFront vs. S3 Cross-Region Replication** — CloudFront caches content at global edges and suits static content served worldwide; S3 Cross-Region Replication must be configured per destination Region, replicates updates near real time, is read-only at the replica, and suits dynamic content in a few Regions.
- **Cache policy** — Configure minimum, default, and maximum TTL plus which query strings, headers, and cookies form the cache key; origin cache-control headers influence freshness within those bounds.
- **Invalidations** — If content changes before its TTL expires, invalidate all objects or selected paths such as `/images/*`; versioned object names are another way to publish changed content.
- **Price classes** — Choose **Price Class All** for all edge locations or **Price Class 100** for the least expensive locations; **Price Class 200** adds more geographic regions at higher cost.
- **Geo restriction** — Allowlist or blocklist countries for a distribution using a third-party Geo-IP database; use it for country-based content restrictions.
- **Signed URLs and cookies** — Use a signed URL for access to an individual restricted object or a signed cookie to authorize multiple restricted objects; CloudFront validates the signature before serving content.
- **CloudFront vs. S3 pre-signed URLs** — An S3 pre-signed URL grants temporary access directly to an S3 object; CloudFront signed URLs/cookies authorize delivery through the distribution and its cache.
- **Origin failover vs. DNS failover** — Origin groups fail over inside a distribution for configured requests and status codes; Route 53 failover returns a different DNS answer and depends on DNS caching.

#### Security and edge processing
- **HTTPS and SNI** — CloudFront supports HTTPS between viewers and the distribution and can use Server Name Indication to serve the correct certificate for multiple hostnames; custom CloudFront ACM certificates must be in **us-east-1**.
- **AWS WAF and Shield** — Associate AWS WAF with a distribution to filter HTTP(S) requests at the edge; CloudFront also integrates with AWS Shield for DDoS protection.
- **Field-level encryption** — Encrypt selected sensitive fields in an HTTP POST body at the edge using a public key so that only the intended application component can decrypt them.
- **CloudFront Functions** — Lightweight JavaScript runs at viewer request or viewer response for high-scale, latency-sensitive changes such as redirects, header edits, authorization, or cache-key normalization; it starts in under **1 ms** and scales to millions of requests per second.
- **Lambda@Edge** — Node.js or Python functions run at viewer-request, origin-request, origin-response, or viewer-response events; author functions in **us-east-1** and CloudFront replicates them to edge locations.
- **Functions vs. Lambda@Edge** — CloudFront Functions are the low-latency option without network, filesystem, or request-body access; Lambda@Edge supports longer work, network/filesystem access, and request-body access, but scales to thousands rather than millions of requests per second.
- **Real-time logs** — CloudFront real-time logs stream selected distribution request records to Kinesis Data Streams for near-real-time monitoring and analysis; choose fields and sampling rate.
- **Delivery cost example** — Example US rates show S3-to-CloudFront transfer at **$0/GB**, CloudFront-to-internet delivery at **$0.085/GB**, and direct S3-to-internet delivery at **$0.09/GB**; caching can also reduce S3 request charges. S3 Transfer Acceleration is shown improving transfer times by **50–500%** for an extra **$0.04–$0.08/GB**, and S3 Cross-Region Replication at **$0.02/GB**; actual charges vary by Region and current pricing.
- **See also:** Amazon Route 53, AWS Global Accelerator, AWS WAF

### AWS Global Accelerator


AWS Global Accelerator provides static anycast IP addresses and routes user traffic from nearby AWS edge locations over the AWS global network to healthy regional endpoints. Use it for global TCP or UDP applications, stable IP allowlists, and fast regional failover rather than edge caching.

#### What it is
- **Anycast addresses** — A standard accelerator provides two static anycast IPv4 addresses; clients reach a nearby edge location using the same fixed addresses around the world.
- **AWS backbone** — Traffic enters at an edge and travels over the AWS global network to the selected regional endpoint, avoiding variable public-internet paths for much of the journey.
- **Supported endpoints** — Endpoint types include Elastic IP addresses, EC2 instances, and Application or Network Load Balancers, including supported public or private endpoint configurations.

#### Traffic steering
- **Endpoint groups** — Create endpoint groups per AWS Region and add regional endpoints; health checks guide the selection of healthy endpoints.
- **Traffic shifting** — Set a traffic dial per endpoint group to shift traffic between Regions, and endpoint weights to divide traffic among endpoints in a group.
- **Client affinity** — Configure source-IP client affinity when repeated connections from the same client should be directed to the same endpoint; without affinity, endpoint selection can vary.
- **Protocols and ports** — Listeners accept configured TCP or UDP port ranges and forward matching traffic to endpoints that support those protocols.

#### Availability and security
- **Health and failover** — Global Accelerator health checks remove unhealthy endpoints from service and can fail over regionally in less than a minute; fixed IPs avoid delays caused by DNS-cache changes.
- **Security** — The two fixed addresses simplify firewall allowlists, and AWS Shield provides DDoS protection.

#### Compared with CloudFront
- **CloudFront** — Caches and serves HTTP(S) content at edge locations, supporting static and dynamic web delivery.
- **Global Accelerator** — Proxies TCP or UDP traffic through the edge to regional applications without caching content; choose it for non-HTTP protocols, static IP requirements, or deterministic fast regional failover.
- **See also:** Amazon CloudFront, Amazon Route 53, AWS Site-to-Site VPN

### AWS Network Firewall


AWS Network Firewall is a managed Layer 3–7 firewall for inspecting and filtering traffic entering, leaving, or moving through a VPC. Use it for centrally governed network inspection across VPC, internet, Direct Connect, and Site-to-Site VPN paths.

#### What it is
- **Traffic directions** — Inspect VPC ingress and egress, VPC-to-VPC traffic, and traffic to or from Direct Connect and Site-to-Site VPN.
- **Rule controls** — Apply IP address, port, protocol, domain-list, and regular-expression pattern rules; stateful domain lists can restrict outbound access to approved domains.
- **Actions** — Allow, drop, or alert on matching traffic and use active flow inspection for intrusion-prevention capabilities.
- **Scale and integration** — Supports thousands of rules and uses AWS Gateway Load Balancer internally to scale inspection.
- **Logging** — Send rule-match logs to S3, CloudWatch Logs, or Kinesis Data Firehose.
- **Central management** — AWS Firewall Manager can centrally manage Network Firewall policies across accounts and VPCs.
- **Compared with VPC controls** — Security groups and NACLs provide instance/interface or subnet filtering; Network Firewall provides centralized, deeper network inspection, while AWS WAF filters web requests at Layer 7.
- **See also:** Amazon VPC, AWS Transit Gateway, AWS Firewall Manager

### AWS Cloud Map


AWS Cloud Map is a managed service registry and service-discovery tool for cloud resources and application services. Use it to register service instances and let applications discover healthy endpoints by DNS name or API.

#### What it is
- **Service registry** — Create namespaces and services, then register resource instances with attributes that clients can query.
- **Discovery** — Applications can discover instances through DNS queries or the Cloud Map API; health status can be used to avoid unhealthy instances.
- **Integrations** — Cloud Map supports service discovery for containerized and other cloud workloads, including Amazon ECS service discovery.
- **Compared with DNS hosting** — Cloud Map provides application-oriented registration and discovery; Route 53 hosted zones provide general DNS record management.
- **See also:** Amazon Route 53, Amazon VPC, AWS App Mesh

### AWS App Mesh


AWS App Mesh is a service mesh for controlling and observing communication among microservices running on AWS. Use it when services need consistent traffic routing and telemetry across supported compute platforms.

#### What it is
- **Service mesh** — App Mesh configures Envoy proxies to control service-to-service traffic without embedding routing logic in each application.
- **Capabilities** — Define virtual services, routes, and backends for service discovery, traffic control, and observability across supported ECS, EKS, and EC2 workloads.
- **Lifecycle** — AWS App Mesh support ended on **September 30, 2026**; treat it as a legacy service and do not select it for new deployments.
- **See also:** AWS Cloud Map, Amazon VPC

### Hybrid connectivity options


Choose the connection based on required encryption, bandwidth, setup time, and whether connectivity is between one site and a VPC or many networks.

#### What it is
- **Decision factors** — Choose among public-internet VPN, dedicated Direct Connect, both together, or a Transit Gateway hub based on encryption, throughput, setup time, and number of networks.

#### Choosing a path
- **Site-to-Site VPN** — Choose IPsec VPN for encrypted connectivity that can be set up quickly over the public internet; expect internet-dependent latency and throughput.
- **Direct Connect** — Choose a dedicated private connection for consistent performance and higher throughput when a longer provisioning lead time is acceptable; add VPN over DX if encryption is required.
- **Both DX and VPN** — Use Direct Connect as the primary path and VPN as a lower-cost encrypted backup, or overlay VPN on DX to encrypt the private connection.
- **Transit Gateway** — Choose a Transit Gateway for transitive hub-and-spoke routing across many VPCs, VPNs, and Direct Connect-connected networks; use its route tables to segment reachability.
- **CloudHub** — Use VPN CloudHub when several remote sites need low-cost hub-and-spoke communication through VPN connections on one VGW.
- **PrivateLink** — Choose PrivateLink when a consumer needs private access to a specific provider service, not general network routing between VPCs.
- **See also:** AWS Site-to-Site VPN, AWS Direct Connect, AWS Transit Gateway, AWS PrivateLink

### IP addressing and ports quick reference


Use this quick reference for the address and protocol facts emphasized in the networking material; allow only the protocols and return ports required by the workload.

#### What it is
- **Address and protocol cues** — The networking material emphasizes IPv4 CIDRs, subnet-reserved addresses, ephemeral return ports, and the ports/protocols used by DNS, SSH, and database examples.

#### Addresses and ports
- **Private IPv4 CIDRs** — `10.0.0.0/8`, `172.16.0.0/12`, and `192.168.0.0/16` are private ranges; `0.0.0.0/0` means all IPv4 addresses and `/32` means one address. IPv6 addresses in AWS are public and internet-routable, so private IPv6 egress relies on an egress-only IGW.
- **Subnet reservations** — AWS reserves the first four and final IPv4 addresses in each subnet; none can be assigned to an instance.
- **SSH** — Bastion-host inbound SSH uses port **22**; limit the source to a trusted CIDR.
- **DNS** — DNS traditionally uses port **53**, the namesake of Route 53.
- **Database traffic** — The networking example uses **TCP 3306** for MySQL between web and database subnets.
- **Ephemeral reply ports** — Example client ranges are **49152–65535** (IANA/Windows 10) and **32768–60999** (many Linux kernels); NACL return rules must match the clients' actual ephemeral range.
- **ICMP** — Permit ICMP in the security group when on-premises systems must ping EC2 instances across a VPN.
- **TCP and UDP** — Global Accelerator supports both transport protocols; choose it for UDP workloads such as gaming, IoT, or voice as well as TCP applications.
- **See also:** Amazon VPC, AWS Site-to-Site VPN, AWS Global Accelerator

## Security, identity, and compliance

### AWS IAM


AWS Identity and Access Management (IAM) is the global service for defining identities and permissions in an AWS account. Use it to grant the least privilege required to people, workloads, and services; use roles and temporary credentials instead of long-lived keys wherever possible.

#### Identities and credentials
- **Root user** — created with each account and has unrestricted account access; do not use or share it for daily work, enable MFA, and avoid creating root access keys.
- **IAM users** — represent people or legacy workloads and can authenticate to the console with a password or make API calls with access keys; prefer federated access and roles for people and workloads.
- **IAM groups** — contain users only, never other groups; users may belong to multiple groups or none, and permissions are commonly assigned to groups.
- **IAM roles** — assumed identities with temporary credentials; use them for EC2, Lambda, CloudFormation, other AWS services, applications, and cross-account access.
- **EC2 instance profiles** — deliver an attached IAM role's temporary credentials to software on an EC2 instance; do not place access keys in instance files or application code.
- **Access keys** — consist of an access key ID and secret access key for CLI, SDK, or API use; treat the secret like a password, never share or commit keys, and rotate or remove them when no longer needed. AWS access paths include the password-and-MFA-protected console, the CLI, and language-specific SDKs embedded in applications.
- **MFA** — combines a memorized password with a device or authenticator; require it for the root user and IAM users, and use MFA conditions for sensitive actions. Options include virtual authenticators such as Google Authenticator or Authy, U2F security keys such as YubiKey, and hardware fobs.
- **Password policy** — can set minimum length, required uppercase/lowercase/numeric/non-alphanumeric characters, allow self-service password changes, enforce expiration, and prevent reuse.

#### Policies and evaluation
- **IAM policies** — JSON documents with a version, statements, effect, action, resource, and optional principal, statement ID, and conditions; use the `2012-10-17` policy language version.
- **Identity-based policies** attach to users, groups, or roles and grant or deny actions on resources; managed policies can be reused, while inline policies are embedded in one identity.
- **Resource-based policies** attach to resources such as S3 buckets, SNS topics, and SQS queues, name the principal, and can enable direct or cross-account access; cross-account access generally requires an allow in both the principal account and the resource policy.
- **Role versus resource policy** — assuming a role replaces the caller's permissions with the role session permissions; a resource policy can grant access without the principal giving up its own permissions.
- **Implicit deny is the default**; an applicable Allow is required, and an applicable **explicit Deny always wins** over an Allow.
- **Policy evaluation** — access is implicitly denied unless an applicable policy allows it, and an applicable explicit Deny overrides every Allow. Identity-based allows can be limited by permissions boundaries, session policies, and Organizations SCPs; resource-based policy evaluation depends on the named principal, and cross-account access requires authorization on both sides. A boundary or SCP never grants permissions.
- **Permissions boundaries** are managed policies that set the maximum permissions a user or role can receive; they apply to users and roles, not groups, and are useful for delegated administration and preventing privilege escalation.
- **Conditions** constrain when policies apply; `aws:SourceIp` limits source addresses, `aws:RequestedRegion` limits API Regions, `aws:PrincipalOrgID` restricts resource-policy access to organization principals, `aws:MultiFactorAuthPresent` can require MFA, and resource-tag keys can support tag-based access.
- **Least privilege** — grant only necessary actions on the narrowest applicable resources, and regularly remove permissions that are not used.

#### Auditing and best practices
- **IAM credentials report** — account-level report showing users and the status of their credentials; use it to identify unused or weakly protected credentials.
- **IAM Access Advisor** — user-level view of granted service permissions and last-accessed information; use it to right-size policies.
- **IAM Access Analyzer** — identifies resources shared with external principals and can validate policies; use its findings to review unintended access.
- **One person, one identity** — create an individual identity, assign it to groups, and grant group permissions rather than sharing user accounts.
- **Workload access** — grant AWS services roles, and use temporary credentials from those roles rather than long-lived access keys.
- **Root account protection** — reserve root for account-level tasks that require it, enable MFA, secure its credentials, and do not create root access keys.
- **See also:** AWS STS, AWS IAM Identity Center, AWS Organizations, Amazon Cognito

### AWS STS


AWS Security Token Service (STS) issues short-lived credentials for a trusted user, workload, or federated identity to access AWS. Choose it for temporary access, role assumption, and identity federation rather than distributing permanent access keys.

#### Temporary credentials and roles
- **Temporary credentials** — an access key ID, secret access key, and session token expire after a bounded session and are authorized by the assumed role's permissions and trust policy.
- **AssumeRole** — exchanges the caller's valid credentials for a role session; the role trust policy controls who may assume it, and the role's permissions policy controls what the session can do.
- **Cross-account access** — configure the target role's trust policy to trust the source principal, then allow that principal to call `sts:AssumeRole`; both sides must be configured.
- **Role chaining** — assuming a second role from an existing role session is limited to a maximum one-hour session.
- **Session duration** — role sessions default to one hour; a role can set a maximum from one to twelve hours, subject to the requesting API and role-chaining limit.

#### Federation
- **AssumeRoleWithWebIdentity** — exchanges an OIDC-compatible web identity token for temporary role credentials; common identity providers include Amazon Cognito and supported external providers.
- **AssumeRoleWithSAML** — exchanges a SAML assertion from a trusted identity provider for temporary role credentials, including console federation.
- **External ID** — a unique value a third-party SaaS provider supplies when assuming a customer role; the customer puts it in the trust-policy condition to mitigate the confused-deputy problem, and it is not a password or substitute for least privilege.
- **Regional STS endpoints** — use the endpoint in the workload's Region where possible to reduce latency and improve endpoint resiliency.
- **See also:** AWS IAM, AWS IAM Identity Center, Amazon Cognito

### AWS IAM Identity Center


AWS IAM Identity Center (formerly AWS Single Sign-On) provides centralized single sign-on for workforce users across AWS accounts and supported business applications. Use it to manage workforce identities and account access without creating a separate IAM user in every account.

#### Access and assignments
- **AWS accounts** — connect Identity Center to AWS Organizations and assign users or groups to accounts through permission sets.
- **Permission sets** — collections of IAM policies that define the access provisioned to a user or group in each assigned account.
- **Applications** — provide SSO to SAML 2.0 business and custom applications by configuring their URLs, certificates, and metadata.
- **Identity sources** — use the built-in Identity Center directory or connect supported external identity providers such as Active Directory, OneLogin, or Okta.
- **Active Directory** — connect to AWS Managed Microsoft AD directly; a self-managed directory can use a two-way trust through Managed Microsoft AD or an AD Connector.
- **ABAC** — use user attributes such as cost center, title, or locale from the Identity Center identity store to define access and update access by changing attributes.
- **Additional sign-in targets** — Identity Center can provide access to EC2 Windows instances as well as AWS accounts and supported applications.
- **See also:** AWS IAM, AWS STS, AWS Organizations, AWS Directory Service

### AWS Organizations


AWS Organizations centrally manages multiple AWS accounts under one organization, with accounts grouped into organizational units (OUs). Use it for account governance, consolidated billing, and organization-wide permission guardrails.

#### Accounts, billing, and governance
- **Management account** — owns the organization; other accounts are member accounts, and a member account can belong to only one organization.
- **OUs** — group accounts hierarchically by business unit, environment, or project so policies can be applied at different levels.
- **Consolidated billing** — combines charges into one payer and can aggregate usage for volume pricing; eligible Reserved Instance and Savings Plans discounts can be shared across accounts.
- **Account automation** — Organizations APIs can create accounts programmatically; separate accounts can isolate workloads and support central logging and cross-account administration.
- **Service control policies (SCPs)** — set the maximum permissions available to users and roles in member accounts; SCPs do not grant permissions, do not apply to the management account, and do not restrict service-linked roles.
- **SCP evaluation** — an action needs an explicit allow through the root and every OU on its path as well as an IAM/resource-policy allow; an explicit SCP deny blocks it. Use allow-list or block-list designs carefully.
- **Tag policies** — standardize tag keys and allowed values, audit noncompliant tagged resources, and support cost allocation and ABAC; they can prevent noncompliant tag operations for specified services but do not affect untagged resources.
- **Tag monitoring** — tag-policy reports identify tagged and noncompliant resources; EventBridge can monitor noncompliant tags.
- **Central operations** — common patterns include organization-wide CloudTrail with logs delivered to a central S3 account, central CloudWatch Logs, and cross-account administrator roles.
- **Resource sharing** — AWS RAM can share supported resources with accounts or OUs in an organization; RAM is a separate service.
- **See also:** AWS IAM, AWS IAM Identity Center, AWS Resource Access Manager

### Amazon Cognito


Amazon Cognito provides sign-in and identity federation for web and mobile application users. Use user pools to authenticate application users and identity pools when those users need temporary AWS credentials to access AWS resources.

#### User pools
- **User pool** — serverless user directory and sign-in service for an application; supports username or email and password, password reset, and email or phone verification.
- **MFA and adaptive authentication** — user pools support MFA; advanced security features can assess sign-in risk and apply adaptive responses.
- **Federation and hosted UI** — federate users from social providers, SAML, or other supported identity providers; the hosted UI/managed login provides a ready-made sign-in experience.
- **Application integration** — user pools integrate with Amazon API Gateway and Application Load Balancers, which can authenticate a request with a Cognito token before forwarding it to a backend.

#### Identity pools and authorization
- **Identity pool** — exchanges a user-pool or supported third-party identity token for temporary AWS credentials tied to IAM roles.
- **Direct resource access** — credentials can let an application user access AWS services directly or through an API, rather than routing every data operation through a custom backend.
- **Fine-grained permissions** — identity-pool IAM policies can be customized using the identity ID, for example to limit each user to their own S3 prefix or DynamoDB partition-key rows.
- **Guest and authenticated access** — identity pools can assign distinct default IAM roles to unauthenticated guest users and authenticated users.
- **Cognito versus IAM** — use Cognito for large populations of application, mobile, or federated users; IAM primarily manages workforce and workload access to AWS.
- **See also:** AWS IAM, AWS STS, AWS IAM Identity Center, Amazon DynamoDB, Amazon API Gateway

### AWS Directory Service


AWS Directory Service offers managed directory options for Microsoft Active Directory-compatible workloads and connections to existing directories. Choose the option based on whether AWS or the on-premises directory should manage users and whether domain trust is required.

#### Directory options
- **AWS Managed Microsoft AD** — runs a Microsoft AD directory in AWS; users can be managed locally, MFA is supported, and trust relationships can connect it to on-premises AD.
- **AD Connector** — a directory gateway/proxy that redirects authentication to an existing on-premises AD; user accounts remain managed on premises, and MFA is supported.
- **Simple AD** — an AWS-managed AD-compatible directory for simpler directory needs; it cannot be joined to on-premises AD.
- **Identity Center integration** — connect Identity Center directly to Managed Microsoft AD, establish a two-way trust for a self-managed directory, or use AD Connector.
- **Microsoft AD concepts** — directory objects include users, computers, printers, file shares, and security groups; domains are organized into trees, and a group of trees is a forest.
- **See also:** AWS IAM Identity Center, AWS IAM

### AWS Resource Access Manager


AWS Resource Access Manager (AWS RAM) shares supported AWS resources across accounts, OUs, or an organization without duplicating the resources. Use it for centrally managed resources that must be consumed by workloads in other accounts.

#### Sharing
- **Cross-account sharing** — share supported resources such as Transit Gateways with other accounts; consumers use the shared resource while the owner retains centralized control.
- **Organizations integration** — share with accounts or OUs in an organization to simplify resource sharing at scale.
- **Transit Gateway example** — RAM can share a regional Transit Gateway with other accounts; the Transit Gateway remains a regional resource and can also be peered across Regions.
- **See also:** AWS Organizations, Amazon VPC

### AWS KMS


AWS Key Management Service (AWS KMS) creates and controls cryptographic keys used by AWS services and applications. Choose it for managed encryption keys, authorization and audit controls, and envelope encryption; use CloudHSM when dedicated HSM hardware and direct key control are required.

#### Key types and costs
- **AWS-owned keys** — keys AWS owns and operates for integrated services, such as SSE-S3, SSE-SQS, and the default DynamoDB key; they have no key fee.
- **AWS-managed keys** — keys created and managed by AWS for a service in a customer's account, commonly named `aws/service`; the slide examples include `aws/rds` and `aws/ebs`, with no key fee.
- **Customer-managed keys** — keys customers create and control in KMS; the slide pricing is **$1 per month** for a created or imported key, plus **$0.03 per 10,000 KMS API calls**.
- **Symmetric keys** — use one AES-256 key for encryption and decryption; most AWS service integrations use symmetric KMS keys, and key material is not exposed unencrypted to the caller.
- **Asymmetric keys** — use RSA or ECC public/private key pairs for encryption/decryption or signing/verification; the public key can be downloaded, but private key operations remain in KMS.
- **External encryption** — asymmetric public keys can encrypt or verify outside AWS where the caller cannot make a KMS API request.

#### Authorization, grants, and audit
- **Key policies** — every KMS key has a key policy; it is the primary resource policy controlling who can use or administer the key.
- **Default key policy** — if no custom policy is supplied, the default policy gives the account root principal authority to delegate access to the account.
- **Custom key policies** — define key administrators and key users; for cross-account use, allow the external principal in the key policy and grant that principal IAM permission in its own account.
- **Grants** — provide delegated, often temporary or service-integrated, permissions to use a key without changing the key policy.
- **IAM and CloudTrail** — KMS integrates with IAM, and CloudTrail records KMS key usage for auditing.
- **Cross-account encrypted snapshots** — authorize the target account in the source customer-managed key policy, share the encrypted snapshot, then copy and re-encrypt it with a key in the target account.
- **Encrypted AMI sharing** — share the image and its KMS key; the target principal needs key and image permissions such as `DescribeKey`, `ReEncrypt*`, `CreateGrant`, and `Decrypt` as applicable.

#### Rotation and multi-Region keys
- **Rotation** — AWS-managed keys rotate automatically every year; customer-managed keys can be configured for automatic or on-demand rotation; imported key material requires manual rotation, commonly using an alias to move to a new key.
- **Multi-Region keys** — related primary and replica keys share key ID, key material, and rotation state across selected Regions and can encrypt in one Region and decrypt in another without re-encryption or cross-Region KMS calls.
- **Not global** — each multi-Region key is managed independently in its Region; it is a coordinated set of regional keys, not one globally available key.
- **Client-side encryption** — multi-Region keys can provide low-latency local decryption for data replicated by DynamoDB Global Tables or global databases; client-side field encryption can keep selected fields unreadable to database operators.
- **S3 replication** — SSE-S3 and unencrypted objects replicate by default; SSE-C objects can replicate, while SSE-KMS requires enabling replication, choosing a destination key, granting source decrypt and destination encrypt permissions, and adjusting key policies.
- **Throttling** — KMS API quotas are regional; high-rate operations such as encryption during replication can be throttled, so request a Service Quotas increase when needed. Multi-Region keys are treated as independent keys by S3 replication.

#### Envelope encryption and limits
- **Envelope encryption** — KMS protects a data key; the data key encrypts the payload, and the encrypted data key is stored with the ciphertext. The service or application need not send large payloads through KMS.
- **4 KB limit** — direct KMS `Encrypt` operations support plaintext up to 4 KB; use `GenerateDataKey` and envelope encryption for larger data.
- **Integrated services** — KMS is used by services including EBS, S3, RDS, and Systems Manager; a KMS key can also be used through SDK or CLI API calls.
- **Secret handling** — do not store plaintext secrets in code; encrypt secret values before storing them or use a secrets service designed for lifecycle management.
- **External key store (XKS)** — lets KMS use key material held in an external key manager through a proxy; it is for organizations that require external custody/control, and adds dependency on the external system's availability and latency.
- **See also:** AWS CloudHSM, AWS Secrets Manager, AWS Systems Manager Parameter Store, Amazon S3, Amazon EBS

### AWS CloudHSM


AWS CloudHSM provides dedicated hardware security modules in a customer's VPC for workloads that need direct control of cryptographic keys or HSM-backed operations. Choose it when single-tenant HSM hardware or specific compliance and cryptographic requirements exceed the KMS managed-key model.

#### Hardware, control, and integration
- **Dedicated HSMs** — AWS provisions tamper-resistant hardware while the customer manages keys, HSM users, and cryptographic operations through CloudHSM client software.
- **FIPS** — the slides identify CloudHSM as FIPS 140-2 Level 3 compliant; there is no free tier.
- **Key types and uses** — supports symmetric and asymmetric cryptography, digital signing and hashing, SSL/TLS keys, and cryptographic acceleration; Redshift supports CloudHSM for database encryption and key management.
- **High availability** — deploy multiple HSMs across Availability Zones in a cluster for availability and durability.
- **KMS custom key store** — integrate CloudHSM with KMS so supported services such as EBS, S3, and RDS can use KMS APIs with key material held in the HSM cluster; CloudTrail logs key use.
- **Compared with KMS** — KMS is a multi-tenant managed service with AWS-managed key operations and IAM-based authorization; CloudHSM is single-tenant, deployed in a VPC, and customers manage HSM users and keys.
- **See also:** AWS KMS, Amazon Redshift

### AWS Secrets Manager


AWS Secrets Manager stores sensitive values such as database credentials and manages their lifecycle. Choose it for managed secret rotation and database credential integration rather than general configuration storage.

#### Secret lifecycle and integrations
- **Encryption** — secrets are encrypted with AWS KMS.
- **Rotation** — configure rotation on a schedule; Secrets Manager can generate new credentials through a Lambda rotation function.
- **Database integration** — supports rotation integrations for Amazon RDS databases including MySQL, PostgreSQL, and Aurora.
- **Multi-Region secrets** — replicate a primary secret to read replicas in other Regions, keep replicas synchronized, and promote a replica to a standalone secret for regional applications or recovery.
- **Compared with Parameter Store** — Secrets Manager is purpose-built for secrets and managed rotation and has a service charge; Systems Manager Parameter Store also stores configuration and secrets, supports optional KMS encryption and hierarchical paths, and has standard/advanced tiers and parameter policies.
- **See also:** AWS KMS, AWS Systems Manager Parameter Store, AWS Lambda, Amazon RDS

### AWS Certificate Manager (ACM)


AWS Certificate Manager provisions and manages TLS certificates for supported AWS endpoints. Choose it to enable HTTPS and automate certificates for load balancers, CloudFront, and API Gateway; ACM certificates cannot be installed directly on EC2 instances.

#### Certificates and renewal
- **Public and private certificates** — ACM supports TLS certificates for public and private use; public ACM-issued certificates are free, while private certificate authority use can incur separate charges.
- **DNS or email validation** — public certificate requests identify the fully qualified domain name or wildcard name; DNS validation is preferred for automation and uses a CNAME, while email validation uses WHOIS contact addresses.
- **Automatic renewal** — ACM automatically renews ACM-issued certificates that remain eligible and validated; the slides state renewal begins 60 days before expiration.
- **Imported certificates** — ACM does not automatically renew imported certificates; it sends daily EventBridge expiration events beginning 45 days before expiry (the interval is configurable), and AWS Config has a managed expiration-check rule.
- **Load balancers** — deploy certificates on Classic, Application, or Network Load Balancers; an ALB can terminate HTTPS and redirect HTTP requests to HTTPS.
- **CloudFront** — the certificate for a CloudFront distribution must be in `us-east-1`.
- **API Gateway** — for an edge-optimized endpoint, the certificate is in `us-east-1`; for a Regional endpoint, use a certificate in the API's Region. Configure a Route 53 CNAME or alias for the custom domain.
- **Not for EC2** — ACM does not provide a deployable certificate private key for direct installation on an EC2 instance; use a supported TLS termination service or another certificate source for EC2.
- **See also:** AWS KMS, Amazon CloudFront, Elastic Load Balancing, Amazon API Gateway, Amazon Route 53

### AWS WAF


AWS WAF is a web application firewall that inspects HTTP(S) requests and filters common application-layer attacks. Choose it for Layer 7 request filtering, rate controls, and web application protection at supported AWS entry points.

#### Web ACLs and rules
- **Web ACL** — associate a set of rules with an application endpoint; a rule group is a reusable collection of rules that can be added to a web ACL.
- **Request matching** — rules can inspect IP sets, HTTP headers, body content, URI strings, and geo-location; common protections include SQL injection and cross-site scripting.
- **IP sets** — support up to **10,000 IP addresses** per IP set; use multiple rules when more addresses must be matched.
- **Rate-based rules** — count request occurrences using a configured aggregation key and block excessive rates, including abusive traffic during application-layer floods.
- **Managed rule groups** — use AWS-managed or supported third-party rules for common vulnerabilities, IP reputation, or anonymous IP sources.
- **Scope and integrations** — web ACLs are regional except for CloudFront; WAF can protect ALB, API Gateway, CloudFront, AppSync GraphQL APIs, and Cognito user pools.
- **Load balancer limitation** — WAF does not attach to a Network Load Balancer; use an ALB for WAF inspection, or Global Accelerator with a fixed IP in front of an ALB when fixed addressing is also required.
- **See also:** AWS Shield, AWS Firewall Manager, Amazon CloudFront, Elastic Load Balancing, Amazon API Gateway

### AWS Shield


AWS Shield protects AWS applications from distributed denial-of-service attacks. Shield Standard is automatic baseline network protection; Shield Advanced adds enhanced protections, response support, and cost protection for eligible resources.

#### Protection tiers
- **Shield Standard** — free and automatically enabled for AWS customers; protects against common Layer 3 and Layer 4 attacks such as SYN floods, UDP floods, and reflection attacks.
- **Shield Advanced** — optional paid protection for resources including EC2, Elastic Load Balancing, CloudFront, Global Accelerator, and Route 53; the slides cite **$3,000 per month per organization**.
- **DDoS Response Team** — Advanced provides 24/7 access to AWS's DDoS response specialists (DRT/SRT) and advanced reporting.
- **Cost protection** — Advanced can protect against certain higher AWS usage charges caused by DDoS traffic spikes.
- **Layer 7 mitigation** — automatic application-layer mitigation can create, evaluate, and deploy AWS WAF rules to mitigate Layer 7 DDoS attacks.
- **Compared with WAF** — Shield targets DDoS resilience; WAF supplies granular web request rules. They are commonly used together, with Firewall Manager for organization-wide policy deployment.
- **See also:** AWS WAF, AWS Firewall Manager, Amazon CloudFront, Amazon Route 53

### AWS Firewall Manager


AWS Firewall Manager centrally deploys and audits security policies across accounts in an AWS Organization. Choose it to apply consistent protections to existing and newly created resources at scale.

#### Organization-wide policies
- **Security policies** — define a common set of rules at the Region level and apply them to accounts and resources across an organization.
- **WAF and Shield** — manage WAF rules for ALB, API Gateway, and CloudFront, and Shield Advanced protections for ALB, CLB, NLB, Elastic IP, and CloudFront.
- **Other controls** — manage security-group policies for EC2, ALB, and ENI resources, AWS Network Firewall policies at the VPC level, and Route 53 Resolver DNS Firewall policies.
- **Automatic coverage** — policies can apply to new resources as they are created, supporting compliance across current and future organization accounts; Firewall Manager manages firewall policies, not threat-detection services such as GuardDuty or Inspector.
- **Compared with WAF** — use WAF itself for granular web ACL rules on an application; use Firewall Manager to deploy and govern those rules across accounts and resources.
- **See also:** AWS Organizations, AWS WAF, AWS Shield

### Amazon GuardDuty


Amazon GuardDuty continuously analyzes AWS activity for threats using anomaly detection, machine learning, and third-party threat intelligence. Use it for managed threat detection without installing software for its core data sources.

#### Detection sources and response
- **Core sources** — analyzes CloudTrail management events, VPC Flow Logs, and DNS logs to detect unusual API activity, unauthorized deployments, suspicious network traffic, and compromised instances.
- **S3 activity** — CloudTrail S3 data events can identify suspicious object access such as GetObject, ListObjects, or DeleteObject when the relevant protection is enabled.
- **Optional protections** — additional data sources/features include EKS audit logs and runtime monitoring, RDS and Aurora login activity, EBS malware protection, Lambda network activity, and S3 protection.
- **Findings** — GuardDuty uses machine learning, anomaly detection, and third-party data; it includes findings for cryptocurrency-mining activity.
- **Notifications and remediation** — send findings to EventBridge rules, which can notify SNS or invoke Lambda for response workflows.
- **Multi-account** — use an administrator account and AWS Organizations integration to centrally manage GuardDuty across member accounts and Regions.
- **Enablement** — the slides describe one-click setup, no software installation for core analysis, and a 30-day trial.
- **See also:** Amazon Detective, AWS Security Hub, Amazon EventBridge

### Amazon Inspector


Amazon Inspector automatically assesses supported compute workloads for software vulnerabilities and network exposure. Choose it for continuous vulnerability management across EC2, ECR container images, and Lambda functions.

#### Assessment coverage
- **EC2 instances** — use the Systems Manager (SSM) agent to inspect software and the running operating system for known vulnerabilities and assess unintended network reachability.
- **ECR images** — assess container images as they are pushed to Amazon ECR for package vulnerabilities.
- **Lambda functions** — assess deployed function code and package dependencies for software vulnerabilities.
- **CVE findings** — scan package vulnerabilities against a CVE database and associate a risk score with findings to help prioritize remediation.
- **Continuous assessment** — scans the supported infrastructure when needed and reports findings rather than applying fixes automatically.
- **Integrations** — send assessment state and findings to EventBridge and AWS Security Hub.
- **Scope** — Inspector evaluates EC2 instances, ECR container images, and Lambda functions; it is not a general-purpose application penetration-testing service.
- **See also:** AWS Systems Manager, Amazon ECR, AWS Security Hub, Amazon EventBridge

### Amazon Macie


Amazon Macie is a managed data security and privacy service that discovers sensitive data in Amazon S3 using machine learning and pattern matching. Use it to identify and alert on data such as personally identifiable information (PII) in S3 buckets.

#### S3 discovery
- **Sensitive data discovery** — analyze S3 objects to identify PII and other sensitive data types, then produce findings for review.
- **Notifications** — send Macie findings to EventBridge for alerting and integrations.
- **See also:** Amazon S3, Amazon EventBridge, AWS Security Hub

### Amazon Detective


Amazon Detective investigates security findings by collecting and correlating security-related data into linked visualizations. Use it to explore the context and likely root cause of GuardDuty findings; it helps investigate but does not prevent attacks.

#### Investigation
- **Finding analysis** — examine entities and activity relationships over time to understand suspicious behavior and scope an incident.
- **Service relationship** — use Detective with GuardDuty and other security findings; it complements detection and response rather than replacing them.
- **See also:** Amazon GuardDuty, AWS Security Hub

### AWS Security Hub


AWS Security Hub provides a centralized view of security posture and findings across AWS accounts and Regions. Use it to aggregate and prioritize findings from services such as GuardDuty, Inspector, and Macie and to check security controls against standards.

#### Findings and posture
- **Finding aggregation** — centralize supported security findings and manage them across member accounts.
- **Standards and controls** — evaluate security posture against supported security standards and controls; use findings to prioritize remediation, not as a substitute for fixing the underlying resource.
- **Integrations** — receives findings from services including GuardDuty and Inspector and can route findings to EventBridge or response workflows.
- **See also:** Amazon GuardDuty, Amazon Inspector, Amazon Macie, Amazon Detective

### AWS Audit Manager


AWS Audit Manager helps continuously collect and organize evidence relevant to AWS usage and selected compliance frameworks. Use it to prepare audit evidence and reports; it does not certify that an environment is compliant.

#### Evidence
- **Automated evidence collection** — gather evidence from supported AWS services and map it to controls in an assessment.
- **Audit preparation** — organize evidence and generate reports for auditors; customers remain responsible for interpreting requirements and correcting noncompliance.
- **See also:** AWS Artifact, AWS Config

### AWS Artifact


AWS Artifact is the self-service portal for AWS compliance documentation and agreements. Use it to download AWS audit reports or review and accept eligible agreements; it does not assess or remediate a customer's resources.

#### Reports and agreements
- **Artifact Reports** — retrieve AWS compliance reports and certifications, such as third-party audit documentation.
- **Artifact Agreements** — review, accept, and manage eligible AWS agreements for an account or organization.
- **See also:** AWS Audit Manager

### AWS Verified Access


AWS Verified Access provides application access without requiring a traditional VPN connection. It evaluates each access request using identity and device security context against configured policies.

#### Zero-trust access
- **Per-request evaluation** — grant access based on user identity and device posture rather than trusting network location alone.
- **Identity providers** — use supported identity and device trust providers and centrally managed access policies for private applications.
- **See also:** AWS IAM Identity Center, AWS Directory Service

### Encryption at rest and in transit


AWS encryption can be applied in transit, at rest on a service, or client-side before data reaches a service. Choose the termination point and key owner based on who must be able to read the plaintext and how much key control is required.

#### Encryption patterns
- **TLS in transit** — TLS/SSL encrypts data before sending and decrypts it at the receiving endpoint, protecting traffic against interception; certificates enable HTTPS.
- **TLS termination** — ACM certificates commonly terminate HTTPS at an ALB/NLB/CLB, CloudFront distribution, or API Gateway endpoint; traffic from that endpoint to a backend is a separate hop and may use HTTP or HTTPS.
- **SSE-S3** — Amazon S3 encrypts objects at rest with S3-managed AES-256 keys; it is enabled by default for new objects and the slides classify it as using AWS-owned keys. It does not provide the customer-managed KMS key-use audit trail of SSE-KMS.
- **SSE-KMS** — S3 uses KMS keys for encryption and key-use authorization/auditing; replication requires destination-key configuration and KMS permissions. S3 Bucket Keys can reduce KMS requests and associated costs by up to 99 percent.
- **SSE-C** — S3 uses a customer-provided key for server-side encryption; the customer supplies and manages the key, and S3 does not store it.
- **DSSE-KMS** — applies two independent server-side encryption layers, one using KMS and one using an S3-managed key; it has higher cost and latency than SSE-KMS and does not support S3 Bucket Keys.
- **Other service encryption** — EBS, RDS, DynamoDB, and other integrated services can use KMS for encryption at rest; select the key when the service requires it at resource creation.
- **Client-side encryption** — encrypt data on the client and keep the server from decrypting it; the receiving client decrypts it.
- **Envelope encryption** — encrypt data with a data key and protect the data key with KMS or another key-encryption key; store the encrypted data key alongside ciphertext.
- **Key choice** — AWS-owned keys offer low operational overhead, customer-managed KMS keys add control over policy and rotation, and CloudHSM or XKS supports stricter external or dedicated key custody needs.
- **See also:** AWS KMS, AWS CloudHSM, AWS Secrets Manager, AWS Certificate Manager (ACM)

### DDoS protection patterns


Build layered DDoS resilience by absorbing traffic at the edge, filtering malicious HTTP requests, distributing legitimate load, and scaling backend capacity. No single control replaces the others because network/transport and application-layer attacks require different mitigations.

#### Layered defenses
- **Layers 3 and 4** — Shield Standard automatically mitigates common network and transport attacks such as SYN floods, UDP floods, and reflection attacks; Shield Advanced adds enhanced protection for supported resources.
- **CloudFront and Route 53** — deliver and resolve traffic at AWS edge locations, absorb common attacks, and reduce direct exposure of application origins; CloudFront caching also protects backends by serving static content at the edge.
- **AWS WAF at Layer 7** — attach web ACLs to CloudFront or an ALB to inspect and filter HTTP requests; managed rules, geo/IP matches, and rate-based rules block common exploits and excessive request rates.
- **Shield Advanced and WAF** — Advanced automatic application-layer mitigation can create and deploy WAF rules; WAF rate rules can block IPs generating abusive traffic.
- **ELB and Auto Scaling** — Elastic Load Balancing distributes traffic across many EC2 instances and scales with demand; Auto Scaling adds EC2 capacity during sudden traffic increases, including flash crowds or attacks.
- **Global Accelerator** — provides edge ingress and integrates with Shield; it can help when a backend cannot use CloudFront and can provide fixed IPs in front of an ALB protected by WAF.
- **Reduce attack surface** — place CloudFront, API Gateway, or ELB in front of private backends, restrict traffic with security groups and network ACLs, and apply API Gateway burst limits and request filtering.
- **See also:** AWS Shield, AWS WAF, Amazon CloudFront, Amazon Route 53, Elastic Load Balancing, Amazon EC2 Auto Scaling

### Shared responsibility model


AWS and the customer share responsibility for security: AWS secures the infrastructure that runs AWS services, while customers secure their data, identities, configurations, and workloads. The division shifts toward AWS for managed services, but customers always retain responsibility for appropriate data access and configuration.

#### Responsibility boundaries
- **Security of the cloud** — AWS is responsible for physical facilities, hardware, networking, and the virtualization layer that operates AWS infrastructure.
- **Security in the cloud** — customers control data, IAM users and policies, encryption choices, network rules, and service configurations.
- **EC2 workloads** — customers manage the guest operating system, patches, applications, and security groups; AWS manages the underlying physical host and virtualization.
- **Managed services** — AWS operates more of the platform for services such as S3, RDS, and Lambda, but customers still configure access, protect data, and select appropriate settings.
- **See also:** AWS IAM, AWS KMS, AWS Organizations

## Integration and messaging

### Amazon SQS


Amazon Simple Queue Service is a managed message queue that buffers work between producers and consumers. Choose it for durable asynchronous processing, traffic smoothing, retries, and independent scaling of application tiers.

#### What it is
- **Pull-based queue** — producers send messages; consumers poll, process, and delete them, so messages remain until deleted or their retention expires.
- SQS decouples application tiers and buffers bursts or downstream outages; producers and consumers can scale independently without provisioning queue throughput.
- A consumer can receive up to **10 messages per call**; Lambda can poll through an event source mapping and invoke a function with message batches.
- **Standard queues** provide virtually unlimited throughput and at-least-once delivery; duplicates and best-effort ordering are possible.
- **FIFO queues** preserve order within each **MessageGroupId** and support deduplication for exactly-once processing semantics; separate groups can be processed concurrently.
- FIFO queue names must end in **`.fifo`**; a standard queue cannot be converted to FIFO in place.

#### Limits and numbers
- Message retention is **4 days by default**, configurable from **1 minute to 14 days**; a DLQ should use the same queue type as its source.
- The visibility timeout defaults to **30 seconds** and can be extended with `ChangeMessageVisibility`; the maximum is **12 hours**.
- A received message is hidden from other consumers until the visibility timeout ends; delete it after successful processing or it can be delivered again.
- Long polling waits up to **20 seconds** for a message, reducing empty receives, API calls, and cost; it can be enabled per queue or per `ReceiveMessage` call.
- Delay queues defer first delivery for up to **15 minutes**; unlike visibility timeout, the delay starts when the message is sent.
- The historic SQS message-size limit is **256 KB**; current queues can be configured to accept messages up to **1 MiB**. Use the SQS Extended Client Library with S3 payload offloading for larger bodies.
- FIFO throughput is **300 messages/second without batching** or **3,000 messages/second with batching** in the standard throughput model; higher-throughput FIFO mode has separate quotas.
- A batch API request can carry up to **10 messages**; batching reduces request overhead but does not remove the queue's throughput quota.
- FIFO deduplication uses a **5-minute deduplication interval** and either an explicit deduplication ID or optional content-based deduplication.
- **Batch send and delete** operations accept up to 10 entries per request; each message is still handled and acknowledged individually.
- Message bodies are text payloads; use message attributes for small metadata and keep large binary objects in S3.

#### Reliability and scaling
- A redrive policy moves messages that exceed the configured receive-count threshold to a **dead-letter queue (DLQ)** for diagnosis or later redrive; set the threshold to allow transient failures to retry first.
- At-least-once delivery means handlers should be **idempotent**, especially when processing takes longer than the visibility timeout or a consumer fails before deletion.
- Use CloudWatch's `ApproximateNumberOfMessages` or backlog per in-service instance to alarm on queue growth and scale an **EC2 Auto Scaling group** of consumers.
- Target tracking can scale consumers from **backlog per instance** (visible queue messages divided by running workers), with the target chosen from worker capacity and acceptable queuing delay.
- Separate queues by work priority or processing stage so workers can prioritize important jobs and each tier can absorb backlogs independently.

#### Security and integrations
- SQS encrypts messages in transit over HTTPS; server-side encryption uses **AWS KMS**, and applications can encrypt message contents client-side.
- **IAM policies** govern API actions; queue resource policies enable cross-account access and allow services such as SNS or S3 to send messages.
- **SNS-to-SQS fan-out** sends one published event to multiple durable queues, where subscribers can retry or process independently; allow the SNS topic in each queue's access policy.
- SQS works with Lambda, EC2 and container consumers, EventBridge targets, S3 notifications, and database-ingestion patterns such as SQS -> Lambda -> DynamoDB.

#### Compared with
- Choose SQS over SNS when consumers need to poll, messages must wait durably for later processing, or work should be retried and independently paced.
- Choose SNS when one publisher must push the same event to many subscribers; subscribe SQS queues to SNS when you need both fan-out and durable per-subscriber buffering.
- Choose Kinesis Data Streams for ordered shard-based streaming, replay, and multiple stream consumers rather than an ordinary work queue.
- **See also:** Amazon SNS, Amazon EventBridge, AWS Step Functions

### Amazon SNS


Amazon Simple Notification Service is a managed publish/subscribe service that pushes messages from a topic to many subscribers. Choose it for event fan-out, notifications, and mobile or application messaging.

#### What it is
- A publisher sends a message to an **SNS topic**; each subscription receives the message unless its filter policy excludes it.
- Subscription endpoints include **SQS, Lambda, HTTP/S, email, SMS, Kinesis Data Firehose, and mobile push** endpoints.
- Standard topics provide high-scale fan-out without provisioning throughput; service quotas include **100,000 topics** and **12.5 million subscriptions per topic**, subject to account quota settings.
- AWS services including CloudWatch alarms, S3, Auto Scaling, CloudFormation, budgets, and database events can publish notifications to SNS.
- **Topic publishing** uses the SDK or service integration; mobile applications can use a platform application and platform endpoint for direct push publishing.

#### Filtering and delivery
- A subscription filter policy is a **JSON policy** that selects messages using message attributes or supported message-body fields; a subscription without a filter receives all messages.
- SNS pushes messages to endpoints rather than providing a consumer-polled work queue; use SQS subscriptions when messages need durable buffering and independent retries.
- Configure a **dead-letter queue** for supported subscriptions to retain messages SNS could not deliver after its delivery retries.
- SNS supports delivery to SQS queues in other Regions; queue resource policies must authorize the topic.

#### FIFO topics and fan-out
- **FIFO topics** preserve order within a **MessageGroupId** and deduplicate using a deduplication ID or content-based deduplication.
- FIFO topics can subscribe SQS standard or FIFO queues; use SQS FIFO subscribers when the downstream consumer must preserve FIFO ordering.
- SNS FIFO has throughput limits in the same **300 messages/second without batching and 3,000 with batching** model as SQS FIFO.
- **SNS + SQS fan-out** publishes once to a topic and distributes a durable copy to each subscribed queue, allowing independent processing, retries, delayed work, and new subscribers without changing the publisher.

#### Security and use cases
- SNS supports HTTPS in transit, KMS server-side encryption, optional client-side encryption, IAM permissions, and topic resource policies for cross-account access or service publishers.
- Mobile push integrations include **Apple APNs, Google Firebase Cloud Messaging (formerly GCM), and Amazon Device Messaging**.
- Use SNS for email or SMS notification delivery; use **SES** for managed email sending and **Amazon Pinpoint** when campaigns, audience segmentation, templates, and coordinated delivery schedules are required.
- **See also:** Amazon SQS, Amazon EventBridge, Amazon SES

### Amazon EventBridge


Amazon EventBridge routes structured events between AWS services, applications, and supported SaaS partners using rules on event buses. Choose it for event-driven integrations, event-pattern filtering, scheduled invocations, and event replay.

#### What it is
- An **event bus** receives JSON events and evaluates **rules** that match event patterns and route matching events to targets.
- Event buses include the **default bus** for AWS service events, **custom buses** for application events, and **partner buses** for supported SaaS-provider events.
- Rules can target services such as Lambda, SQS, SNS, Step Functions, ECS tasks, AWS Batch, Kinesis Data Streams, CodeBuild, and Systems Manager actions.
- EventBridge is the successor and extension of **CloudWatch Events**; existing CloudWatch Events rules and event patterns are supported, while EventBridge adds partner and custom buses, schema tools, and archive/replay capabilities.
- Events from AWS services, custom applications, and SaaS partners can be routed to multiple consumers without the producers making direct calls to each consumer.

#### Rules, schedules, and targets
- Event patterns filter on JSON fields such as event source, detail type, and event details; schedules can also invoke rule targets on a rate or cron expression.
- **EventBridge Scheduler** supports one-time, rate-based, and cron-based schedules with managed delivery and flexible target integrations, including ECS tasks on Fargate.
- Use a scheduled rule for a simple recurring event-bus trigger; choose Scheduler for dedicated schedule management, one-time schedules, or direct service invocations at scale.
- EventBridge can invoke workflows, run container tasks, send queue/topic messages, and automate responses to AWS API or resource-state events.

#### Archive, replay, and schemas
- An **archive** stores all events or only events matching a pattern for a configured duration or indefinitely.
- **Replay** sends archived events back through the event bus so matching rules and targets can reprocess them after a change or outage.
- The **schema registry** can infer schemas from events on a bus, version schemas, and generate application code that reflects event structure.

#### Security and comparisons
- Event-bus resource policies control which AWS accounts or Regions can call `PutEvents`; they support centralized cross-account event aggregation, including organization-wide designs.
- Use IAM roles and resource permissions so EventBridge can invoke its targets; a target DLQ can retain events that could not be delivered.
- Compared with CloudWatch Events, EventBridge retains the core scheduled-rule behavior but adds event buses for custom and partner sources, schema discovery, and archive/replay.
- Compared with SQS, an event bus routes events by rules but does not provide a consumer-polled durable work backlog by default; configure an archive or a queue target when persistence and retries are needed.
- **See also:** Amazon SQS, Amazon SNS, AWS Step Functions

### AWS Step Functions


AWS Step Functions orchestrates multi-step workflows as managed state machines, coordinating AWS services and application logic. Choose it when a process needs visible sequencing, branching, parallel work, retries, or long-running workflow state.

#### What it is
- A workflow is a **state machine** whose states describe tasks and control flow; the service maintains execution state rather than requiring application code to coordinate every step.
- **Standard workflows** support long-running, durable executions (up to **one year**) with execution history and exactly-once workflow execution semantics unless retries are configured.
- **Express workflows** are designed for high-volume, short-lived event processing (up to **five minutes**); asynchronous Express uses at-least-once execution and synchronous Express uses at-most-once execution semantics.
- Choose Standard for auditable, durable orchestration; choose Express for high-throughput, short-duration workflows where request-driven execution is preferred.

#### State types and error handling
- Common states include **Task**, **Choice**, **Parallel**, **Map**, **Wait**, **Pass**, **Succeed**, and **Fail** for work, branching, concurrency, iteration, delays, and termination.
- Task states can invoke Lambda, ECS/Fargate, AWS Batch, DynamoDB, SQS, SNS, API Gateway, and other services through optimized integrations or AWS SDK integrations.
- **Retry** rules handle transient errors with configurable backoff and attempt limits; **Catch** routes failures to recovery or compensation states.
- Workflows support timeouts, parallel branches, map-based processing, and human approval steps that pause for an external callback.

#### Compared with
- Step Functions makes workflow structure, state, retries, and execution history explicit; chaining Lambda functions manually spreads orchestration logic and recovery behavior across code.
- Use Lambda for a single short task, not as the only orchestrator for a complex workflow; Lambda execution is capped at **15 minutes**, while Standard workflows can run much longer.
- **Amazon SWF** is an older workflow service with activity workers and deciders that application teams implement and operate; Step Functions provides a managed visual workflow model and native service integrations.
- **See also:** Amazon EventBridge, Amazon SQS, Amazon Simple Workflow Service

### Amazon MQ


Amazon MQ is a managed message broker for applications that already depend on open messaging protocols or broker APIs. Choose it to migrate compatible ActiveMQ or RabbitMQ workloads without redesigning every client around SQS or SNS.

#### What it is
- Supports managed **Apache ActiveMQ** and **RabbitMQ** broker engines, exposing familiar queue and topic patterns.
- Supports established protocols including **AMQP, MQTT, STOMP, OpenWire, and WebSocket (WSS)**, with protocol support depending on broker engine.
- Traditional applications can connect using existing broker clients and messaging formats, avoiding a rewrite to AWS-specific queue/topic APIs.
- Amazon MQ brokers run on managed instances; deployments can use a single instance or multi-AZ high availability with a standby or clustered broker arrangement.

#### Availability and operations
- Multi-AZ deployments provide a standby/failover or broker cluster arrangement, depending on engine and deployment mode; clients should support reconnect and failover.
- Amazon MQ handles broker provisioning, patching, and managed availability, but capacity and broker sizing still matter.
- Amazon MQ is not infinitely scalable: broker throughput and operational scaling are more constrained than SQS or SNS.

#### Compared with
- Choose Amazon MQ when protocol, client, or broker compatibility is the constraint; choose SQS/SNS for cloud-native applications that benefit from elastic managed queue or topic APIs.
- Amazon MQ does not turn a legacy broker into an unlimited serverless queue; refactoring to SQS/SNS can improve scaling and simplify operations when protocol compatibility is unnecessary.
- **See also:** Amazon SQS, Amazon SNS

### Amazon API Gateway


Amazon API Gateway is a managed service for creating, publishing, securing, throttling, and monitoring APIs. Choose it as a managed HTTP or WebSocket front door for Lambda, HTTP backends, AWS services, and private services.

#### What it is
- **REST APIs** offer the broadest API management features, including request/response transformation, validation, caching, usage plans, and API keys.
- **HTTP APIs** provide lower-cost, lower-latency HTTP endpoints with common routing, JWT authorization, and Lambda or HTTP integrations, but fewer advanced REST API management features.
- **WebSocket APIs** provide persistent, stateful, full-duplex communication; routes commonly include `$connect`, `$disconnect`, and `$default`.
- REST API endpoint types are **edge-optimized** (CloudFront edge locations for globally distributed clients), **Regional** (clients primarily in one Region), and **private** (reachable from a VPC through an interface endpoint).
- An edge-optimized API is hosted in one Region and uses CloudFront to improve global client latency; Regional APIs can be paired with a distribution when more CloudFront control is needed.
- Private APIs use an **interface VPC endpoint** and resource policies to restrict access to selected VPCs or principals.

#### Stages, deployments, and traffic management
- A **deployment** snapshots API configuration; a **stage** names an environment such as dev, test, or prod and points to a deployment.
- API configuration changes do not affect a live stage until a deployment is created and associated with that stage.
- Stage variables and separate stages support environment-specific settings and API versioning; OpenAPI/Swagger definitions can be imported and APIs can generate client SDKs.
- **Canary deployments** send a configured share of stage traffic to a new deployment before promotion or rollback.
- API-level throttling and quotas protect backends; **usage plans** associate API keys with per-client rate limits and quotas on REST APIs.
- API keys identify clients for usage plans; they are not a substitute for authentication or authorization.
- **Versioning** can use separate API resources or stages so callers can move between compatible API versions.
- Stage settings support per-environment throttling, logging, metrics, and cache configuration.
- Monitor a canary deployment separately for errors and latency before promoting it to all stage traffic.

#### Integrations, validation, and browser support
- Integration types include **Lambda proxy/non-proxy**, HTTP endpoints, AWS service actions (such as sending an SQS message or starting a Step Functions execution), and private/VPC-linked backends.
- **Lambda proxy integration** passes the request context to the function; non-proxy integrations can use mapping templates to shape requests and responses.
- A **VPC Link** can connect supported API integrations to private load balancers and services without exposing the backend publicly.
- API Gateway can add authentication, request rate control, and caching in front of an HTTP service, including on-premises endpoints or load balancers.
- Request validators can check required parameters and request-body schemas before forwarding; mapping templates can transform requests and responses.
- Configure **CORS** response headers and preflight handling when browser clients call an API from a different origin.
- REST API response caching reduces repeated backend calls for read-heavy APIs; cache TTL is configurable and caching is not available for every API type.
- **WebSocket routes** can invoke integrations on connect, disconnect, or application-defined route keys; backend callbacks can send messages to connected clients.
- OpenAPI/Swagger import can define API resources and methods, while generated SDKs help application clients call those APIs.

#### Security, limits, and observability
- Authorizers include **IAM/SigV4**, **Cognito user-pool**, **Lambda/custom**, and HTTP API **JWT** authorizers; resource policies can restrict invocation by principal, account, VPC, or source IP.
- Custom domains use TLS certificates from **AWS Certificate Manager**; edge-optimized API certificates must be in **us-east-1**, while Regional API certificates must be in the API's Region.
- REST API integration timeout is **29 seconds by default**; longer timeouts can be requested for supported Regional or private REST APIs. Limits vary by API type and Region.
- REST and HTTP API request payloads have a **10 MB** maximum; API request rates are quota-controlled and vary by API type and Region.
- Access and execution logs can be sent to **CloudWatch Logs**; metrics and alarms expose latency, errors, throttling, and request volume.
- **See also:** AWS Step Functions, Amazon SQS, Amazon Cognito

### AWS AppSync


AWS AppSync is a managed GraphQL API service that connects application clients to data sources through a schema and resolvers. Choose it when clients need a flexible query API, real-time subscriptions, or offline-aware application synchronization.

#### What it is
- A GraphQL schema defines available types and operations; **resolvers** connect fields to sources such as DynamoDB, Lambda, OpenSearch, HTTP services, and supported relational data paths.
- One GraphQL endpoint lets a client request the fields it needs, reducing the need to build and maintain many narrowly shaped REST endpoints.
- **Subscriptions** deliver real-time updates to clients when related mutations occur; AppSync manages the connection and notification path.

#### Security and integrations
- Authorization options include API keys, IAM, Cognito user pools, OpenID Connect, and Lambda authorizers; select an option appropriate to the app's identity model.
- AppSync can be used with AWS Amplify to build web and mobile applications; AWS WAF can protect an AppSync GraphQL API.
- **See also:** Amazon API Gateway, Amazon DynamoDB

### Amazon AppFlow


Amazon AppFlow is a managed integration service for securely transferring data between SaaS applications and AWS or other destinations. Choose it to configure repeatable SaaS data flows without writing and operating custom connector code.

#### What it is
- Supported SaaS sources include **Salesforce, SAP, Zendesk, Slack, and ServiceNow**; destinations include Amazon S3, Amazon Redshift, Snowflake, and Salesforce.
- Flows can run **on a schedule, in response to events, or on demand**.
- Built-in data transformation includes filtering and validation, avoiding custom integration code for common transfer operations.

#### Security and use cases
- Data can be encrypted over the public internet or transferred privately through **AWS PrivateLink** where supported.
- Use AppFlow to move SaaS application data into S3 or Redshift for reporting and analysis, or to transfer data between supported SaaS endpoints.
- **See also:** Amazon S3, Amazon Redshift

### Amazon SES


Amazon Simple Email Service is a managed service for sending and receiving email securely at scale. Choose it for application-driven transactional, marketing, or bulk email rather than building mail-delivery infrastructure.

#### What it is
- SES supports **inbound and outbound email** and can be called through AWS APIs, the console, or SMTP.
- Use cases include transactional messages, marketing email, and bulk communications; an application can invoke SES through an IAM-authorized role.
- **DKIM** and **SPF** support domain authentication and sender reputation; IP options include shared, dedicated, and customer-owned addresses.
- Reputation dashboards and delivery statistics track delivery, bounces, feedback-loop results, and opens.
- SES focuses on email delivery; use SNS for event notifications and mobile/SMS push, or Pinpoint for targeted customer campaigns.
- **See also:** Amazon SNS, Amazon EventBridge

### Amazon Simple Workflow Service


Amazon Simple Workflow Service (Amazon SWF) is an older managed workflow service for coordinating distributed application tasks. It is most relevant when an existing system already uses SWF's worker-and-decider programming model.

#### What it is
- SWF coordinates long-running workflows by recording workflow history and distributing **activity tasks** to workers.
- Application-managed **deciders** inspect workflow history and decide which activity or decision should run next; activity workers execute the tasks.
- Workers can run on AWS infrastructure or outside AWS, but the application team owns more workflow-worker code than with Step Functions.
- SWF persists workflow execution history so deciders can make decisions after worker tasks complete or fail.

#### Compared with
- Prefer Step Functions for managed visual state machines, built-in AWS service integrations, and less custom orchestration code; retain SWF when compatibility with an established SWF workflow is required.
- **See also:** AWS Step Functions

### Decoupling and messaging patterns


Choose the communication primitive by how data is consumed, retained, and replayed. A queue, topic, stream, and event bus solve related but distinct coordination problems.

#### What it is
- Choose a **queue (SQS)** for one-work-item-to-a-consumer processing, durable buffering, back-pressure, retries, and independent worker scaling.
- Choose a **topic (SNS)** to push the same notification to many subscribers; attach queues for durable fan-out and separately controlled retry/processing.
- Choose a **stream (Kinesis Data Streams)** for ordered records, sustained event ingestion, multiple independent consumers, and replay within a retention window.
- Choose an **event bus (EventBridge)** to route structured events from AWS services, applications, and SaaS partners by rule to different targets, with optional archive/replay.
- Use **Step Functions** when the core problem is coordinating a multi-step workflow with branching, waits, retries, and explicit execution state rather than simply moving a message.
- **See also:** Amazon SQS, Amazon SNS, Amazon EventBridge, AWS Step Functions

## Analytics and streaming

### Amazon Kinesis Data Streams


A managed, durable streaming-data service that collects records from producers and makes them available to multiple consumers in real time. Choose it when records must be retained for replay or consumed independently by processing applications.

#### What it is
- **Producers** include applications, SDK clients, Kinesis Producer Library (KPL), and AWS services; consumers include Lambda, Data Firehose, Managed Service for Apache Flink, and custom applications.
- Records are stored in a stream and can be **replayed by consumers** during the retention period; a consumer's read does not delete the record.
- Multiple independent consumers can process the same source records; for example, Lambda can filter or redact a copy and write it to DynamoDB while another application reads the original stream.
- Standard consumers pull records; **enhanced fan-out** pushes records to each registered consumer over a dedicated connection.
- Typical inputs include clickstreams, IoT events, metrics, and logs; common uses include real-time analytics, event processing, and ETL.
- DynamoDB can publish item changes to Kinesis Data Streams for up to **365 days** of retention and many consumers, including Lambda, Firehose, Flink, and Glue streaming ETL; this is longer-lived and more broadly consumable than DynamoDB Streams.

#### Capacity and cost
- In **provisioned mode**, choose the shard count and pay per shard-hour; a shard supports **1 MB/s or 1,000 records/s ingress** and **2 MB/s egress** shared by standard consumers.
- Provisioned streams require manual shard increases or decreases; splitting and merging shards is called **resharding**.
- In **on-demand mode**, capacity is managed automatically and charges are based on stream-hours and data in/out; the slide baseline is **4 MB/s or 4,000 records/s**.
- On-demand mode scales based on the observed throughput peak over the **previous 30 days**, making it useful when traffic is unpredictable or spiky.
- **Enhanced fan-out** provides each consumer up to **2 MB/s per shard** independently of other consumers.

#### Ordering and limits
- Records are ordered within a shard; records with the same **partition key** are routed to the same shard and retain their relative order.
- A poorly distributed partition key can concentrate traffic on one shard, creating a **hot shard** while other shards are underused.
- A record is limited to **1 MB by default**; the maximum can be configured up to **10 MB**, subject to the associated throughput requirements.
- Retention defaults to **24 hours** and can be extended to **365 days**; expired records are removed automatically.
- Data cannot be deleted from the stream before its retention period expires; consumers can reread it while it remains available.

#### Security
- Data is encrypted **in transit with HTTPS/TLS** and **at rest with AWS KMS** encryption.
- **KPL** batches and aggregates producer records to reduce per-request overhead and use shard throughput efficiently; **KCL** coordinates consumer applications and their shard processing.

#### Compared with
- Choose Data Firehose for fully managed delivery to supported destinations without managing consumer code; it does not provide retained records or replay.
- Choose Amazon MSK when applications need the Apache Kafka API and its ecosystem; Kinesis uses shards, while Kafka uses topics and partitions.
- **See also:** Amazon Data Firehose, Amazon Managed Service for Apache Flink, Amazon MSK, AWS Glue

### Amazon Data Firehose


A fully managed, automatically scaling delivery service that loads streaming records into analytics destinations with configurable buffering. Choose it for near-real-time delivery without operating stream consumers or managing delivery infrastructure.

#### What it is
- Formerly named **Kinesis Data Firehose**; it is serverless, scales automatically, and charges for data delivered.
- Sources include applications, SDKs, Kinesis Data Streams, CloudWatch Logs and metrics, VPC Flow Logs, AWS Network Firewall logs, EventBridge, and AWS IoT; supported record size is up to **1 MB** in the source material.
- **Near-real-time delivery** is controlled by configurable buffering based on data size and time; a common pipeline flushes about every **1 minute**.
- A stream from Kinesis Data Streams can feed Firehose when both retained replayable ingestion and managed destination delivery are needed.

#### Destinations and transformation
- Supported destinations include **Amazon S3, Amazon Redshift, Amazon OpenSearch Service**, supported third-party partners such as Splunk, MongoDB, Datadog, and New Relic, and custom HTTP endpoints.
- Firehose can invoke **AWS Lambda** to transform each batch, for example converting CSV records to JSON.
- It supports CSV, JSON, ORC, Parquet, Avro, raw text, and binary data; it can convert data to **Parquet or ORC** and compress it with gzip or Snappy.
- An S3 backup bucket can retain **all records or failed records**, in addition to delivery to the primary destination.
- CloudWatch Logs subscription filters can select events for Firehose delivery, and CloudWatch metric streams can filter which metrics are delivered.

#### Compared with
- Firehose has **no stream retention and no replay capability**; use Kinesis Data Streams when consumers need to reread records or independently process a retained stream.
- Firehose cannot write directly to DynamoDB; a Lambda or another consumer must perform DynamoDB writes.
- **See also:** Amazon Kinesis Data Streams, Amazon Redshift, Amazon OpenSearch Service, AWS Glue

### Amazon Managed Service for Apache Flink


A managed runtime for Apache Flink stream-processing applications written in Java, Scala, or SQL. Choose it to perform continuous, stateful transformations and analysis on streams without operating the Flink cluster.

#### What it is
- Formerly **Kinesis Data Analytics for Apache Flink**; it runs Apache Flink applications on managed AWS compute.
- Flink applications can be written in **Java, Scala, or SQL** to transform and analyze streaming data.

#### Features
- The managed runtime provides parallel computation on provisioned compute resources and supports automatic scaling.
- Application backups use **checkpoints and snapshots**, helping recover application state.

#### Integrations
- Common inputs include Kinesis Data Streams and Amazon MSK/Kafka; applications can send processed records to other streaming or storage services.

#### Compared with
- Managed Flink is for custom stateful stream processing; Firehose focuses on buffered delivery to destinations with optional Lambda transformation.
- Managed Flink **does not read from Amazon Data Firehose**; use a supported stream source such as Kinesis Data Streams or Kafka/MSK.
- **See also:** Amazon Kinesis Data Streams, Amazon Data Firehose, Amazon MSK

### Amazon Kinesis Video Streams


A managed service for securely ingesting, storing, and processing video streams from connected devices. Choose it for live or recorded video workflows that need AWS-managed streaming and playback or analysis integrations.

#### What it is
- Devices and applications can send live video to Kinesis Video Streams for storage and retrieval by consumer applications.
- It supports real-time video-processing and machine-learning workflows, as well as playback of stored media fragments.
- Streams are made up of time-indexed media fragments that applications can retrieve for playback or processing.
- Producers can send media from cameras and other edge devices using supported producer libraries and APIs.
- Stream retention and encryption settings can be configured to meet application requirements.
- **See also:** Amazon Kinesis Data Streams, Amazon Rekognition

### Amazon MSK


Amazon Managed Streaming for Apache Kafka (Amazon MSK) is a managed Apache Kafka service that runs Kafka clusters in an AWS VPC. Choose it when workloads need Kafka compatibility, topics, partitions, or Kafka client integrations without managing the broker fleet.

#### What it is
- AWS creates and manages the **Kafka broker nodes** and cluster coordination, including ZooKeeper nodes for ZooKeeper-based clusters; provisioned clusters can be created, updated, and deleted through the service.
- Provisioned MSK clusters run in a VPC and can span up to **three Availability Zones** for high availability; AWS automatically recovers from common Kafka failures.
- Kafka data is stored on **EBS volumes** for as long as the cluster retains it, rather than expiring after a fixed Kinesis retention window.
- **MSK Serverless** provisions resources and scales compute and storage automatically, so customers need not size broker capacity.
- Producers write records to Kafka **topics**; consumers poll topics, and Kafka replicates data across brokers.

#### Security
- Kafka client traffic can use **TLS**; clusters may also support PLAINTEXT where configured, but TLS is the encrypted transport option.
- **AWS KMS** can encrypt data at rest on EBS-backed storage.
- MSK supports Kafka authentication and authorization options including IAM, SASL/SCRAM, and TLS client authentication, with Kafka ACLs used to control topic access where applicable.

#### Compared with
- Kinesis Data Streams uses **shards** and supports shard splitting and merging; Kafka/MSK uses **topics with partitions**, to which partitions can be added.
- Kinesis records have a **1 MB default limit** that can be configured higher, for example to 10 MB; Kafka record sizes are configurable in Kafka.
- Kinesis Data Streams has built-in managed retention up to 365 days and replay; MSK retains Kafka records according to topic and storage configuration.
- Choose MSK for Kafka APIs and its ecosystem; choose Kinesis for a native AWS stream when automatic integration and shard-based operation are preferred.
- **See also:** Amazon Kinesis Data Streams, Amazon Managed Service for Apache Flink, AWS Glue

### Amazon Athena


A serverless SQL query service that reads data directly from Amazon S3. Choose it for ad hoc SQL analytics on data lakes, logs, and files without loading data into a database cluster.

#### What it is
- Athena uses standard SQL and is based on **Presto**; table schemas commonly come from the AWS Glue Data Catalog.
- Supported data formats include CSV, JSON, ORC, Avro, and Parquet; Athena can query VPC Flow Logs, load balancer logs, CloudTrail data, and other S3 datasets.
- **Federated queries** run SQL across S3 and relational, non-relational, object, or custom data sources, including AWS and on-premises sources.
- Federated query connectors run on **AWS Lambda**; query results are written to S3.

#### Performance and cost
- The source pricing is **$5 per TB scanned**; pricing is based on scanned data, so reducing bytes read reduces query cost.
- Use columnar **Parquet or ORC**, compression, and well-designed S3 partitions to reduce the amount scanned and improve performance.
- Compression options include bzip2, gzip, LZ4, Snappy, zlib, and Zstandard; larger files, typically **over 128 MB**, reduce file-management overhead.
- Partitioned S3 paths expose partition values as virtual columns, allowing queries to skip irrelevant partitions.
- **Workgroups** separate users and workloads, set query configuration, publish metrics, and can impose per-query or per-workgroup scan limits to govern cost.

#### Compared with
- Choose Athena for serverless SQL over data already in S3; choose Redshift for a provisioned or serverless warehouse optimized for repeated analytics, joins, and aggregations.
- Athena is not an operational database and does not store a warehouse copy of the source data; it queries files in place.
- **See also:** AWS Glue, Amazon Redshift, Amazon S3, Amazon QuickSight

### AWS Glue


A managed, serverless data integration service for discovering, cataloging, preparing, and transforming data for analytics. Choose it for managed ETL workflows and shared metadata used by services such as Athena and Redshift.

#### What it is
- AWS Glue is a managed, serverless service for discovering, cataloging, preparing, and transforming data for analytics.

#### Catalog and discovery
- **AWS Glue Data Catalog** stores dataset metadata, including databases, tables, and schemas used by Athena, Redshift Spectrum, EMR, and Glue jobs.
- **Crawlers** discover data sources such as S3, JDBC databases, and DynamoDB, infer schemas, and register or update table metadata in the Data Catalog.

#### ETL and preparation
- **Glue ETL jobs** extract, transform, and load data, including converting CSV data to columnar Parquet or ORC for efficient Athena queries.
- **Job bookmarks** track processed data so a job can avoid reprocessing previously handled input.
- **Glue DataBrew** offers a visual, no-code way to profile, clean, and normalize data using reusable recipes; profiling surfaces statistics, nulls, and data types, and recipes can be shared and audited.
- **Glue Studio** is a graphical interface to create, run, and monitor Glue ETL jobs.
- **Glue streaming ETL** uses Apache Spark Structured Streaming and supports Kinesis Data Streams, Kafka, and Amazon MSK.

#### Compared with
- Choose Glue for managed cataloging and ETL jobs; choose EMR when you need broad control over cluster-based Hadoop, Spark, or other big-data frameworks.
- Glue's catalog can provide schemas for Athena without copying data; crawlers catalog metadata, while ETL jobs perform data transformations.
- **See also:** Amazon Athena, Amazon EMR, Amazon Redshift, AWS Lake Formation

### Amazon Redshift


A massively parallel, columnar SQL data warehouse for online analytical processing (OLAP), reporting, and large-scale analytics. Choose it for repeated warehouse queries, joins, and aggregations rather than transactional OLTP workloads.

#### What it is
- Redshift is based on PostgreSQL but is designed for **OLAP, not OLTP**; it supports SQL and parallel query execution over columnar storage, scaling to petabytes.
- A provisioned cluster has a **leader node** for query planning and result aggregation and compute nodes that execute queries.
- **RA3 nodes** separate compute from managed storage, allowing compute and storage to scale more independently; frequently accessed data is cached locally.
- **Redshift Serverless** runs a warehouse without requiring a fixed provisioned cluster and adjusts capacity to workload demand.
- **Redshift ML** lets analysts create and use machine-learning models through SQL with SageMaker integration.
- Business intelligence tools including Amazon QuickSight and Tableau can connect through JDBC/ODBC.

#### Loading, querying, and distribution
- Use **COPY** to load data efficiently in bulk from S3; large batched loads are preferable to many small inserts.
- Data Firehose can deliver to Redshift, generally staging data in S3 before Redshift loads it.
- **UNLOAD** writes query results from Redshift to S3 for downstream use or sharing.
- **Redshift Spectrum** queries data stored in S3 without loading it into Redshift, but a Redshift cluster must be available to initiate the query.
- Distribution styles determine how table rows are placed across compute nodes: **AUTO** lets Redshift choose, **KEY** co-locates matching join keys, **ALL** copies a small dimension table to each node, and **EVEN** spreads rows evenly.

#### Performance and availability
- **Workload Management (WLM)** routes and prioritizes queries in queues, with configuration for memory and concurrency; query priorities and concurrency scaling help manage changing workloads.
- **Concurrency scaling** adds transient cluster capacity for eligible concurrent workloads and scales it back when demand subsides.
- Some cluster configurations support **Multi-AZ** deployment for availability across Availability Zones.
- Snapshots are incremental point-in-time backups stored in S3 and can be restored into a new cluster.
- Automated snapshots occur every **8 hours, every 5 GB of changes, or on a schedule**, with **1-35 days** retention; manual snapshots persist until deleted.
- Automated or manual snapshots can be copied to another AWS Region to support disaster recovery.

#### Pricing and comparison
- Provisioned clusters require selecting node types and capacity in advance; reserved instances can reduce cost for steady usage.
- Redshift is generally faster for recurring warehouse queries, joins, and aggregations; Athena avoids maintaining a cluster when SQL over S3 is sufficient.
- Redshift Spectrum still uses Redshift compute to query S3; it is not a standalone serverless replacement for Athena.
- **See also:** Amazon Athena, Amazon Data Firehose, Amazon QuickSight, Amazon S3

### Amazon EMR


A managed environment for running distributed big-data frameworks such as Hadoop and Spark on clusters that can scale to hundreds of EC2 instances. Choose it for flexible cluster-based data processing, machine learning, web indexing, and other large-data workloads.

#### What it is
- **EMR** means Elastic MapReduce; AWS handles cluster provisioning and configuration.
- EMR bundles frameworks including Apache Spark, HBase, Presto, and Flink, and supports automatic scaling and Spot Instances.
- **Master nodes** coordinate the cluster and track health; **core nodes** run tasks and store data; optional **task nodes** run tasks without storing cluster data.
- Master and core nodes are generally long-running; task nodes are often a fit for interruptible Spot capacity.
- **EMRFS** lets EMR applications use Amazon S3 as a storage layer alongside cluster storage.

#### Capacity and lifecycle
- **On-Demand Instances** provide predictable capacity that is not terminated by Spot reclamation.
- **Reserved Instances** with a term of at least **one year** can reduce cost; EMR uses them automatically when available.
- **Spot Instances** cost less but can be interrupted, so use them where workloads tolerate task-node loss.
- Clusters can be **long-running** for persistent services or **transient** for temporary jobs that terminate when processing completes.

#### Compared with
- Choose EMR for control of cluster resources and a broad open-source framework environment; choose Glue for serverless, managed ETL and catalog workflows.
- EMR can use the Glue Data Catalog for metadata and can query data in S3; it is not itself a data warehouse like Redshift.
- **See also:** AWS Glue, Amazon Athena, Amazon Redshift, Amazon S3

### Amazon OpenSearch Service


A managed search and analytics service for indexing events and documents so users can search across fields, including partial text matches. Choose it to add full-text search or log analytics alongside an operational database or streaming pipeline.

#### What it is
- Amazon OpenSearch Service succeeds Amazon Elasticsearch Service and offers managed clusters or a **serverless** option.
- It searches arbitrary indexed fields and partial matches, unlike a DynamoDB query that is constrained to its primary key or indexes.
- **OpenSearch Dashboards** provides visualization and exploration of indexed data; SQL is not natively the primary interface, though a plugin can enable SQL.
- Common ingestion sources include Kinesis Data Firehose, AWS IoT, and CloudWatch Logs.

#### Integrations and security
- A DynamoDB pattern uses a stream-triggered Lambda function to index records in OpenSearch while the application continues using DynamoDB for CRUD access.
- CloudWatch Logs can feed OpenSearch through a subscription filter and Lambda for real-time processing, or through Data Firehose for near-real-time delivery.
- Kinesis Data Streams or Data Firehose can supply streaming events for indexing and search analytics.
- Security integrations include **IAM and Amazon Cognito**; data can be encrypted with **KMS** at rest and protected with **TLS** in transit.

#### Compared with
- Use a database for authoritative transactional records and OpenSearch as a complementary search index; it is not a general-purpose relational database.
- Choose OpenSearch for text search and interactive log analytics, not for SQL data warehousing (Redshift) or SQL-in-place analytics over S3 (Athena).
- **See also:** Amazon DynamoDB, Amazon Kinesis Data Streams, Amazon Data Firehose, Amazon CloudWatch Logs

### Amazon QuickSight


A serverless, machine-learning-powered business intelligence service for interactive dashboards, visualizations, and ad hoc analysis. Choose it to present analytics from AWS, SaaS, imported, or JDBC-connected data sources to business users.

#### What it is
- QuickSight scales automatically, supports embedded analytics, and offers per-session pricing.
- ML-powered insights help users explore data and surface business trends.

#### Data sources and SPICE
- QuickSight connects to sources including S3, RDS, Aurora, Athena, Redshift, OpenSearch, Timestream, log formats, SaaS sources, imports, and on-premises databases over JDBC.
- **SPICE** is QuickSight's in-memory calculation engine for data imported into QuickSight.

#### Access and dashboards
- **Enterprise Edition** supports column-level security and row-level security for restricting which data users can see.
- QuickSight users and groups are defined within QuickSight and are distinct from IAM users and groups.
- A dashboard is a **read-only snapshot of an analysis** that preserves its filters, parameters, controls, and sort settings; publish a dashboard before sharing it.
- A dashboard viewer can see its underlying data, so apply appropriate data permissions and row/column controls before sharing.
- Analyses and published dashboards can be shared with QuickSight users or groups.
- **See also:** Amazon Athena, Amazon Redshift, AWS Lake Formation

### AWS Lake Formation


A managed service for creating and governing a centralized data lake, typically stored in Amazon S3. Choose it to simplify data ingestion and preparation and centrally apply fine-grained permissions across data-lake consumers.

#### What it is
- Lake Formation is built on AWS Glue and automates data-lake setup tasks such as collecting, cleansing, moving, and cataloging data.
- It discovers, transforms, and ingests data from sources such as S3, RDS, Aurora, and on-premises relational or NoSQL databases.
- A data lake can combine structured and unstructured data; Lake Formation provides source blueprints and data crawlers, ETL preparation, and a Data Catalog.
- **Fine-grained access controls** include row- and column-level permissions for data accessed through analytics services such as Athena and Redshift.
- Lake Formation centralizes permissions and governance; Glue jobs perform ETL transformations and S3 holds the data-lake objects.
- **See also:** AWS Glue, Amazon S3, Amazon Athena, Amazon Redshift, Amazon QuickSight

### AWS Data Exchange


A service for discovering, subscribing to, and using third-party datasets shared through AWS. Choose it when an organization needs governed access to external data products rather than building a one-off provider integration.

#### What it is
- Subscribers can find eligible data products, review the provider's offer, and subscribe to datasets through AWS Data Exchange.
- Providers can publish and manage data products and subscriptions; delivery options include Amazon S3 and supported data APIs.
- Products can include file-based datasets or API-based datasets, with provider-defined terms for access.
- Dataset updates are published as revisions that subscribers can access under their subscription.
- Subscribers can use shared data products without operating the data provider's infrastructure.
- **See also:** Amazon S3, AWS Marketplace

### AWS Data Pipeline


A managed orchestration service for scheduling and coordinating data movement and transformation between AWS compute and storage resources and on-premises sources. Choose it for dependency-aware, scheduled data workflows.

#### What it is
- A pipeline defines data sources, activities, schedules, and dependencies so work runs in the required order.
- It can coordinate processing with services such as S3, EC2, and EMR and can retry or alert on failed activities.
- Activities can run on AWS-managed resources or on resources in an on-premises environment.
- Pipelines can copy data between supported stores and schedule computation after its inputs are ready.
- Data nodes describe pipeline inputs and outputs, while activities define the work to run on those data.
- **See also:** Amazon EMR, Amazon S3, AWS Glue

### Amazon CloudSearch


A managed search service for deploying search domains and indexing application content for full-text search. Choose it for a straightforward managed search capability when a dedicated search cluster is unnecessary.

#### What it is
- CloudSearch indexes application documents and supports text search and search-result filtering.
- AWS manages the search domain infrastructure, allowing applications to submit documents for indexing and query the domain.
- A search domain defines the index and search configuration for an application's content.
- Search fields and their indexing options can be configured to match the document schema.
- Search queries return ranked results that applications can filter for their users.
- **See also:** Amazon OpenSearch Service

### Analytics pipeline patterns


A streaming analytics pipeline separates ingestion, durable storage, processing, querying, and visualization so each stage can scale independently.

#### What it is
- **Ingest:** IoT devices or applications send real-time events to Kinesis Data Streams; use MSK when Kafka compatibility is required.
- **Store and deliver:** Kinesis Data Streams retains replayable records; Data Firehose buffers and delivers streaming data to an S3 ingestion bucket in near real time.
- **Process:** Lambda can transform Firehose records, while Glue ETL can batch-convert and catalog data; Managed Flink processes continuous stateful streams.
- **Query:** Athena runs serverless SQL over S3 and stores results in S3; Redshift provides a warehouse for repeated analytics and joins.
- **Visualize:** QuickSight builds dashboards from Athena, Redshift, S3, and other supported sources; an S3 reporting bucket can hold query outputs.
- **See also:** Amazon Kinesis Data Streams, Amazon Data Firehose, AWS Glue, Amazon Athena, Amazon Redshift, Amazon QuickSight

## Application and ML services

### Amazon Rekognition


Amazon Rekognition applies managed machine learning to images and videos to detect objects, people, text, scenes, and faces. Choose it for visual analysis, content moderation, face search, or media metadata without building computer-vision models.

#### What it is
- Detects **objects, people, labels, text, scenes, and faces** in images and videos; face analysis can return attributes such as age range and emotions.
- Supports face search and verification, comparison with known face collections, and celebrity recognition.
- **Content moderation** detects inappropriate or unwanted visual material; a configurable confidence threshold determines which results are flagged.
- Moderation results can be sent to **Amazon Augmented AI (A2I)** for human review when automated confidence needs a manual check.
- Uses include image labeling, user verification, people counting, text detection, media moderation, and sports pathing analysis.
- **See also:** Amazon Textract, Amazon SageMaker

### Amazon Textract


Amazon Textract extracts printed text, handwriting, and structured data from scanned documents using managed AI and machine learning. Choose it for document ingestion when forms, tables, or key-value fields need to become machine-readable.

#### What it is
- Processes scanned **PDFs and images**, extracting text as well as data from forms and tables.
- Handles handwriting and returns structured results that downstream applications can transform, index, or store.
- Common inputs include invoices, financial reports, medical records, insurance claims, tax forms, identity documents, and passports.
- Combine S3 uploads with Lambda and Textract for document processing; Comprehend can further analyze extracted text.
- OCR-style extraction turns document content into machine-readable text and structured results for downstream processing.
- **See also:** Amazon Comprehend, Amazon Rekognition

### Amazon Comprehend


Amazon Comprehend is a managed, serverless natural-language processing service that finds information and relationships in text. Choose it for common language, sentiment, entity, key-phrase, and topic analysis without operating NLP infrastructure.

#### What it is
- Identifies a text's **language**, extracts key phrases and named entities such as people, places, brands, or events, and detects positive or negative sentiment.
- Analyzes tokenization and parts of speech and can organize a collection of documents by discovered topics.
- **Custom entity recognition** learns domain-specific labels from customer-provided labeled examples, such as specialized product or ingredient names.
- Comprehend can analyze text extracted by Textract or Transcribe; results can be stored in S3 or application databases.

#### Comprehend Medical
- **Amazon Comprehend Medical** extracts useful information from unstructured clinical text such as physician notes, discharge summaries, test results, and case notes.
- Its **DetectPHI** capability identifies protected health information (PHI) in clinical text.
- Medical text can come from S3, Kinesis Data Firehose, or speech transcribed by Amazon Transcribe before analysis.
- **See also:** Amazon Textract, Amazon Transcribe, Amazon SageMaker

### Amazon Transcribe


Amazon Transcribe converts speech in audio recordings into text using automatic speech recognition (ASR). Choose it for searchable call transcripts, captions, subtitles, or downstream text analysis.

#### What it is
- Transcribes recorded audio and customer-service calls, and can generate closed captions or subtitles for media.
- **PII redaction** can automatically remove personally identifiable information from transcript output.
- **Automatic language identification** supports multilingual audio without requiring the caller to declare the language first.
- Speaker diarization can distinguish speakers in supported audio; configurations can identify **2 to 10 speakers**.
- Transcripts can be stored and indexed for later search or queried in S3 with Athena; Transcribe performs speech recognition, not SQL analysis.
- **See also:** Amazon Comprehend, Amazon Polly

### Amazon Polly


Amazon Polly turns text into lifelike synthesized speech. Choose it for applications that speak, audio versions of content, or voice output without operating speech-generation models.

#### What it is
- Converts plain text or **Speech Synthesis Markup Language (SSML)** documents into audio using the `SynthesizeSpeech` operation.
- SSML can control emphasis, phonetic pronunciation, pauses, breathing sounds, whispering, and supported speaking styles such as Newscaster.
- **Pronunciation lexicons** customize how particular words, names, or acronyms are spoken.
- Use Polly to create voice responses for conversational applications and audio content for websites or apps.
- Applications can synthesize speech on demand rather than recording and serving every possible spoken response as a separate asset.
- **See also:** Amazon Lex, Amazon Transcribe

### Amazon Translate


Amazon Translate is a managed neural machine-translation service for translating text between languages. Choose it to localize application or website content and process large text volumes without building translation infrastructure.

#### What it is
- Produces natural translations for text that applications can incorporate into user-facing content.
- Translation is a text-language task; use Comprehend when the requirement is sentiment, entity, or topic analysis rather than translating words.
- Supports localization of websites and applications for international users and batch translation of large text volumes.
- Real-time translation can be embedded in application workflows, while asynchronous batch jobs suit collections of stored documents.
- Custom terminology can help preserve domain-specific translations for configured terms.
- **See also:** Amazon Comprehend, Amazon Polly

### Amazon Lex


Amazon Lex builds conversational bots using the speech-recognition and language-understanding technology behind Alexa. Choose it for text or voice interfaces that identify user intent and invoke application logic.

#### What it is
- Uses **automatic speech recognition (ASR)** to convert speech to text and **natural language understanding (NLU)** to determine intent from text or caller speech.
- Bots model **intents** and associated information needed to fulfill a request; they can support chat or voice conversations.
- A bot can elicit the information needed to fulfill an intent, then use an integration to complete the requested operation.
- Lex integrates with Lambda for fulfillment logic and with Amazon Connect for contact-center voice flows.
- Lex supplies the conversational bot and intent recognition; Connect supplies the cloud contact-center telephony and contact-flow environment.
- **See also:** Amazon Connect, Amazon Polly, Amazon Transcribe

### Amazon Connect


Amazon Connect is a cloud-based contact-center service for handling customer calls and building contact flows. Choose it to create a managed contact center that can integrate with AWS services and existing CRM systems.

#### What it is
- Receives calls and uses configurable **contact flows** to route interactions and invoke the required business logic.
- Integrates with Amazon Lex for conversational bots, Lambda for workflow logic, and external CRM systems.
- Contact routing and queues can distribute interactions to agents based on the configured contact flow.
- Contact flows configure the sequence of prompts, routing decisions, and service integrations for an interaction.
- Pricing is usage-based without traditional contact-center infrastructure or large up-front deployments; potential savings are often estimated at up to **80%** versus traditional contact-center solutions, though actual savings vary.
- **See also:** Amazon Lex, Amazon Transcribe, Amazon Polly

### Amazon Kendra


Amazon Kendra is a managed, machine-learning-powered enterprise search service for finding answers within organizational documents. Choose it for natural-language search across a connected document collection rather than building a search index and relevance model yourself.

#### What it is
- Indexes documents such as text, PDFs, HTML, PowerPoint, Word files, and FAQs, then returns relevant passages or answers to natural-language queries.
- Connectors can ingest content from sources such as S3, RDS, Google Drive, SharePoint, OneDrive, and supported third-party or custom repositories.
- **Incremental learning** uses user interactions and feedback to improve preferred results; administrators can also manually tune result relevance and freshness.
- Kendra focuses on answers and relevance over connected enterprise documents; use OpenSearch when the need is a configurable full-text search and analytics index.
- Search results can be grounded in connected enterprise content, helping users find answers without manually browsing each source.
- **See also:** Amazon OpenSearch Service, Amazon SageMaker

### Amazon SageMaker


Amazon SageMaker is a managed platform for developers and data scientists to build, train, tune, and deploy machine-learning models. Choose it when a team needs a managed ML workflow rather than hand-operating its own model infrastructure.

#### What it is
- A typical ML process trains a model from **historical data and labels**, tunes it, and applies the trained model to new inputs to produce predictions.
- SageMaker provides managed tools for building and training models and deploying them for inference; the service reduces the infrastructure work of an end-to-end ML process.
- SageMaker is distinct from prebuilt task-specific services such as Rekognition, Textract, and Comprehend, which expose ready-made image, document, or text capabilities.
- Teams can use SageMaker when they need control over model selection, training data, tuning, and deployment rather than a fixed task-specific API.
- For a common prebuilt task such as face analysis or sentiment, a purpose-built AI service avoids building a custom model pipeline.
- **See also:** Amazon Rekognition, Amazon Comprehend, Amazon Personalize

### Amazon Personalize


Amazon Personalize builds real-time personalized recommendations and ranking experiences using managed machine learning. Choose it when an application needs user-specific recommendations without creating and operating recommendation models itself.

#### What it is
- Uses interaction and catalog data to provide recommendations, personalize rankings, and support customized direct marketing.
- Historical input can be read from S3, with real-time data integration available for updated user activity.
- Integrates with websites, applications, mobile apps, SMS, and email systems; the service uses the same recommendation technology as Amazon.com.
- Use cases include retail recommendations and media or entertainment personalization.
- The service manages recommendation-model development and deployment so teams can integrate personalization without building the full ML pipeline.
- **See also:** Amazon SageMaker, Amazon S3

### Amazon Forecast


Amazon Forecast is a managed time-series forecasting service that uses machine learning to predict future values from historical time-dependent data. Choose it for demand or resource forecasts when a time-series forecast is needed without building the forecasting pipeline from scratch.

#### What it is
- Forecasting uses historical observations and associated time-series information to generate future-value predictions for use in planning.
- Common use cases include predicting product demand, inventory needs, or other recurring quantities over time.
- Forecasts help planning systems make forward-looking decisions from historical time-stamped records rather than treating observations as independent rows.
- Forecast quality depends on representative historical data and relevant time-series inputs.
- Forecast predicts future values over time; it is not a real-time transaction classifier or an event-routing service.
- **See also:** Amazon SageMaker, Amazon Personalize

### Amazon Fraud Detector


Amazon Fraud Detector is a managed service for identifying potentially fraudulent online activity using machine learning. Choose it for transaction or account-risk detection when a purpose-built fraud model is preferable to building detection infrastructure from scratch.

#### What it is
- A detector evaluates activity against a trained fraud-detection model and returns a risk result that an application can use in its decision process.
- Fraud scoring can be integrated into application workflows so suspicious activity can be reviewed or blocked while legitimate activity continues.
- Detector logic can combine model predictions with decision rules to return outcomes used by the calling application.
- Historical labeled events help train models to distinguish fraudulent from legitimate activity.
- Use cases include online payment and account activity risk, where a fraud score can inform additional verification or review.
- **See also:** Amazon SageMaker, Amazon Comprehend

### Amazon Bedrock


Amazon Bedrock is a managed service for building generative-AI applications with foundation models through AWS APIs. Choose it to use supported foundation models without provisioning model-serving infrastructure.

#### What it is
- Provides access to multiple foundation models for tasks such as text generation, summarization, and question answering.
- Managed capabilities include retrieval-augmented generation, agents, and guardrails for grounding or controlling application responses.
- Model choice lets builders select a foundation model that fits the application's language, modality, and response needs.
- IAM and service-level controls let applications integrate model calls into AWS environments without hosting model endpoints themselves.
- Bedrock exposes managed foundation-model inference; SageMaker is the broader platform when teams need custom model-building and training control.
- **See also:** Amazon SageMaker, Amazon Q

### Amazon Q


Amazon Q is AWS's generative-AI assistant family for business users and software developers. Choose the applicable Q assistant for enterprise information and task assistance or development help.

#### What it is
- **Amazon Q Business** helps users find and summarize information across connected enterprise content sources, subject to access permissions.
- **Amazon Q Developer** assists with software development tasks such as code explanation, generation, and AWS development workflows.
- Q Business connects enterprise knowledge sources and respects configured user permissions when returning information.
- Q Developer can help explain code, suggest implementations, and answer questions about AWS development.
- Q's enterprise and developer assistants are packaged experiences; Bedrock is the model-building platform for developers creating their own generative-AI applications.
- **See also:** Amazon Bedrock, Amazon SageMaker

## Management and governance

### Amazon CloudWatch


A monitoring and observability service for AWS resources and applications. Choose CloudWatch to collect metrics and logs, visualize behavior, and trigger alarms or operational workflows.

#### What it is
- **Metrics** are timestamped measurements organized into **namespaces**; a **dimension** is a metric attribute such as instance ID or environment, with up to **30 dimensions** per metric.
- AWS services publish standard metrics; custom metrics can report application or host data such as memory, which EC2 does not provide by default.
- **Standard resolution** custom metrics are generally published at one-minute intervals; **high-resolution** metrics can be published as frequently as one second and support alarm periods of 10 or 30 seconds or multiples of 60 seconds.
- EC2 basic monitoring publishes metrics at five-minute intervals; detailed monitoring publishes them at one-minute intervals. Higher-frequency metrics do not automatically include guest OS measurements.
- **CloudWatch dashboards** display metrics and other monitoring views, including data across accounts and Regions when configured.
- **Metric streams** continuously deliver selected metrics with near-real-time latency to Kinesis Data Firehose and its destinations, including S3, Redshift, OpenSearch, or third-party monitoring tools.

#### Alarms and anomaly detection
- **Metric alarms** evaluate a metric over a configured period and threshold; states are **OK**, **ALARM**, and **INSUFFICIENT_DATA**.
- High-resolution custom metrics support 10-second and 30-second alarm periods; standard periods are one minute or longer.
- Alarm actions can notify **Amazon SNS**, trigger an **EC2 stop, terminate, reboot, or recover action**, or invoke an **EC2 Auto Scaling** action.
- EC2 recovery alarms commonly use `StatusCheckFailed_System`; recovery retains the instance's private and public IP addresses, Elastic IP, metadata, and placement group.
- **Composite alarms** combine states of other alarms with AND/OR logic, helping reduce alert noise; a standard alarm monitors one metric.
- **Anomaly detection** models expected metric behavior and alarms on deviations rather than requiring a fixed threshold.
- A **metric filter** can extract a metric from log events and feed an alarm; CloudWatch alarm state can be set for testing.

#### Logs and Insights
- **Log groups** typically represent applications; **log streams** represent their instances, files, or containers.
- Log data is encrypted by default; customer-managed KMS keys can be configured. Retention is configurable from **one day to ten years**, or logs can be kept indefinitely.
- Log sources include AWS services, Lambda, ECS, API Gateway, VPC Flow Logs, Route 53 DNS query logs, and CloudTrail when configured.
- EC2 and on-premises hosts do not automatically send their local logs to CloudWatch; install and configure an agent and grant the necessary IAM permissions.
- The older **CloudWatch Logs agent** sends logs; the **CloudWatch Agent (Unified Agent)** collects logs plus host metrics such as RAM, disk, network, processes, and swap.
- Unified Agent configuration can be centralized with Systems Manager Parameter Store; its detailed guest metrics complement EC2's built-in CPU, disk, and network metrics.
- **Logs Insights** searches and analyzes log groups with a purpose-built query language, discovers fields in AWS and JSON logs, filters and aggregates events, and can query across log groups and accounts.
- Logs Insights queries can be saved and placed on dashboards; it is an interactive query engine, not a real-time stream processor.
- **S3 export tasks** can take up to **12 hours** before log data is available and are not suitable for real-time delivery.
- **Subscription filters** select log events for near-real-time processing by Lambda, Kinesis Data Streams, or Kinesis Data Firehose; cross-account destinations require a permitted subscription destination.

#### Operational insights
- **Contributor Insights** analyzes log records and creates time series for top-N contributors, counts, and usage; use it to identify noisy hosts, heavy network users, or error-generating URLs.
- Contributor Insights can use custom or sample rules over CloudWatch Logs and includes rules for selected AWS service metrics.
- **Synthetics canaries** run scheduled scripts to test endpoints and user paths, identifying availability or performance problems from the user's perspective.
- **CloudWatch RUM** collects real-user experience data from web applications; it complements synthetic tests with actual user sessions.
- **CloudWatch Evidently** supports feature launches and experiments, including controlled rollouts and analysis of user impact.
- **Container Insights** collects, aggregates, and summarizes metrics and logs for ECS, EKS, Kubernetes on EC2, and Fargate; Kubernetes deployments use a containerized CloudWatch Agent.
- **Lambda Insights** adds system-level metrics and diagnostic data such as cold starts through a Lambda layer; **Application Insights**, powered by SageMaker, provides automated application-health dashboards and sends findings to EventBridge and Systems Manager OpsCenter.

#### Integrations and comparisons
- **Amazon EventBridge** reacts to service events, schedules, and CloudTrail API events; CloudWatch focuses on metrics, logs, dashboards, and metric alarms, while EventBridge routes events to targets.
- CloudTrail records who made API calls; AWS Config records resource configuration and evaluates compliance; CloudWatch measures operational performance and aggregates logs.
- **See also:** Amazon EventBridge, AWS CloudTrail, AWS Config, AWS Systems Manager, AWS Systems Manager Parameter Store

### AWS CloudTrail


An account-governance and audit service that records AWS API activity. Use CloudTrail to establish who did what, when, and from which source, and to retain an audit history.

#### What it is
- CloudTrail is enabled by default and captures account activity through the console, SDKs, CLI, and AWS services; its **Event history** provides the most recent **90 days** of management events.
- A **trail** delivers selected events to an S3 bucket for retention beyond 90 days and analysis with tools such as Athena; a trail can also send events to CloudWatch Logs. Trails can cover one Region or all Regions, with all-Region coverage the default.
- Trails can cover one Region or all Regions; an **organization trail** applies centrally across the accounts in an AWS Organization.
- **Management events** record control-plane operations on resources, such as changing IAM permissions, creating a subnet, or configuring a trail; trails log management events by default.
- Management events can be selected as read-only, write-only, or both.
- **Data events** record high-volume resource operations such as S3 object reads/writes and Lambda function invocations; they are not logged by default and must be selected for applicable resources.
- **CloudTrail Insights** analyzes management write activity against a baseline to identify unusual patterns such as bursts of IAM activity, unexpected provisioning, or service-limit pressure.
- Insights findings appear in CloudTrail, can be delivered to S3, and generate EventBridge events for automated response.
- **Log file validation** uses digest files and cryptographic hashes to help detect whether delivered CloudTrail log files have been changed or deleted.
- Integrate trails with **CloudWatch Logs** for log analysis and alerting, or **EventBridge** for event-driven actions on API activity.
- **CloudTrail Lake** provides a managed event data store for collecting, retaining, and querying CloudTrail events with SQL, rather than requiring users to build their own S3/Athena query pipeline.

#### Compared with
- CloudTrail answers **which identity called which API and when**; AWS Config answers how a resource was configured and whether it meets rules; CloudWatch answers how a system is performing.
- CloudTrail event history is limited to 90 days; configure a trail or CloudTrail Lake event data store for longer retention.
- **See also:** Amazon CloudWatch, AWS Config, Amazon EventBridge, AWS Organizations

### AWS Config


A per-Region resource inventory, configuration-history, and compliance service. Use Config to evaluate AWS resource settings against required rules and track how those settings change over time.

#### What it is
- Config records resource configurations and changes, allowing configuration and compliance timelines to be reviewed over time.
- **Managed rules** are AWS-provided checks (the supplied course material lists more than 75); **custom rules** are implemented with Lambda. Rules can run on each configuration change, periodically, or both.
- Example checks include detecting unrestricted SSH access, public S3 buckets, untagged resources, or an unwanted resource type or setting.
- Config rules report compliance; they **do not prevent** an action or deny a resource change.
- Config has no free tier in the supplied pricing material; the reference rates are **$0.003 per configuration item recorded** and **$0.001 per rule evaluation per Region**. Check current regional pricing before estimating costs.
- **Conformance packs** package related Config rules and remediation actions as a reusable compliance framework.
- Config can aggregate data across Regions and accounts using a **configuration aggregator**, enabling central compliance views without changing the source recorders.
- Configuration data can be delivered to S3 for longer-term analysis, including with Athena.
- Config can notify through SNS or EventBridge when configuration or compliance state changes; EventBridge rules can route selected noncompliance events to Lambda, SQS, or SNS.
- **Remediation** can invoke Systems Manager Automation documents, including AWS-managed or custom documents; retries can be configured if a resource remains noncompliant.
- Config can show related CloudTrail API calls in a resource timeline, but CloudTrail remains the audit source for identity and API activity.

#### Compared with
- **CloudWatch** monitors metrics, logs, and operational alarms; **CloudTrail** records API activity; **Config** records resource state and evaluates compliance.
- Config rules are detective, not preventive; use organization policies or service permissions when an action must be blocked before it occurs.
- **See also:** Amazon CloudWatch, AWS CloudTrail, AWS Systems Manager, AWS Control Tower

### AWS CloudFormation


A declarative infrastructure-as-code service that provisions and updates AWS resources from templates. Choose CloudFormation to create repeatable environments with reviewable, dependency-aware changes.

#### What it is
- A **template** describes desired resources and their configuration; CloudFormation creates them in dependency order as a **stack**.
- Templates can be version-controlled and reviewed, and resources created by a stack can be managed as a coordinated unit; CloudFormation itself has no additional charge, but provisioned resources incur their normal charges. Stack-created resources carry stack identifiers that help attribute cost, and templates can be used to estimate resource costs before deployment.
- **Parameters** accept deployment-time values; **Mappings** hold static lookup values; **Conditions** control conditional resource creation; **Outputs** expose values after deployment.
- Intrinsic functions such as `Ref`, `Fn::GetAtt`, `Fn::Sub`, `Fn::Join`, and `Fn::ImportValue` reference or compose values and connect stack resources.
- **Change sets** preview proposed updates and likely replacements before applying them; a change set does not modify resources until executed.
- **Drift detection** compares supported live resource settings with the template's expected settings; it identifies drift but does not automatically repair it.
- **StackSets** deploy a template across multiple accounts and Regions, including organization-managed deployments.
- **Nested stacks** organize reusable templates into parent/child stacks; use them to decompose large templates.
- CloudFormation supports most AWS resource types; a **custom resource** lets a stack invoke a Lambda function or supported provider to perform work or manage resources not natively represented by CloudFormation types.
- **DeletionPolicy** controls what happens to a resource when removed from a template or its stack is deleted; common choices are `Delete`, `Retain`, and `Snapshot` where supported.
- On a failed create or update, CloudFormation can roll back the stack to its prior state; stack policies and termination protection can further protect resources and stacks.
- **CloudFormation helper scripts**, including `cfn-init`, configure EC2 instances from template metadata; `cfn-signal` can report successful completion for coordinated stack creation. Infrastructure Composer can visualize template resources and their relationships.
- A CloudFormation **service role** lets CloudFormation create, update, and delete resources on behalf of stack users who need not have each resource permission themselves; users need `iam:PassRole` to pass it.
- **AWS Service Catalog** can expose approved CloudFormation templates as governed products for users to provision.

#### Compared with
- **AWS CDK** lets developers define infrastructure in familiar programming languages and synthesizes CloudFormation templates for deployment; CloudFormation is the underlying deployment and stack engine.
- **See also:** AWS Cloud Development Kit, AWS Service Catalog, AWS Systems Manager

### AWS Cloud Development Kit


The AWS CDK is an infrastructure-as-code framework for defining AWS resources in programming languages and deploying them through CloudFormation.

#### What it is
- CDK applications compose reusable **constructs** in supported languages, then synthesize a CloudFormation template for deployment.
- CDK provides higher-level abstractions than writing every template resource by hand; synthesized templates can still be reviewed as CloudFormation.
- **See also:** AWS CloudFormation

### AWS Systems Manager


A collection of operational capabilities for managing AWS and hybrid infrastructure. Use Systems Manager to automate fleet operations, maintain compliance, and access managed instances without opening inbound administration ports.

#### What it is
- Managed instances need the **SSM Agent**, appropriate IAM permissions, and network connectivity to Systems Manager endpoints; on-premises servers can be registered as managed nodes.
- **Run Command** runs a command or Systems Manager document on one or many managed nodes, including nodes selected through resource groups; output can go to the console, S3, or CloudWatch Logs.
- Run Command integrates with IAM and CloudTrail, can notify SNS of command status, and can be started by EventBridge.
- **Session Manager** provides auditable shell access to Linux, macOS, and Windows EC2 or on-premises managed nodes without SSH keys, inbound port 22, or bastion hosts; sessions can be logged to S3 or CloudWatch Logs.
- **Patch Manager** scans and patches supported Linux, macOS, and Windows managed nodes for OS, application, and security updates, on demand or on a schedule.
- **Maintenance Windows** schedule actions such as patching and software installation using a schedule, duration, registered instances or other targets, and registered tasks.
- **State Manager** maintains a desired configuration by applying document associations to managed nodes on a schedule or when triggered.
- **Automation** runs predefined or custom runbooks to orchestrate maintenance and deployment actions on EC2 and other AWS resources, such as restarting instances or creating AMIs and EBS snapshots.
- Automation can be started manually, by EventBridge, by Maintenance Windows, or by AWS Config remediation.
- **Inventory** collects metadata about managed nodes, such as installed applications and system details, to support fleet visibility and compliance.
- **OpsCenter** centralizes operational issues as OpsItems and relates them to resources and investigation data; CloudWatch Application Insights can send findings there.
- **See also:** AWS Systems Manager Parameter Store, AWS Config, Amazon CloudWatch, Amazon EventBridge

### AWS Systems Manager Parameter Store


A managed parameter store for application configuration and secrets. Use it to centrally organize values by environment and retrieve them through Systems Manager APIs or SDKs.

#### What it is
- Parameters can be plain `String`, `StringList`, or encrypted `SecureString` values; **KMS** can encrypt and decrypt secure values subject to IAM permissions.
- Parameter Store is serverless, scalable, durable, and supports parameter versions and hierarchical paths such as `/application/environment/database-url`.
- Standard and Advanced tiers provide different parameter-count and size quotas; Standard supports **10,000 parameters per account per Region** and values up to **4 KB**, while Advanced supports **100,000** and values up to **8 KB**.
- Applications retrieve one or multiple parameters, including recursively by path; IAM controls who can read or write parameters.
- Parameter changes can notify EventBridge; CloudFormation can reference Parameter Store values, and the CloudWatch Unified Agent can use it for centralized configuration.
- Parameter Store can expose selected Secrets Manager values and public AWS parameters such as current Amazon Linux AMI IDs through reserved paths.
- **See also:** AWS Systems Manager, AWS CloudFormation, Amazon CloudWatch, AWS Secrets Manager

### AWS Trusted Advisor


An account assessment service that checks AWS usage against recommended practices and returns actionable findings without requiring agents on workloads.

#### What it is
- Trusted Advisor evaluates **cost optimization, performance, security, fault tolerance, service limits, and operational excellence**.
- The **Basic and Developer** support plans include a limited core set, including public S3 buckets, risky security-group ports, IAM use, root-user MFA, public EBS/RDS snapshots, and service limits; **Business, Enterprise On-Ramp, and Enterprise** plans provide the full check set, with programmatic access through the AWS Support API where supported by the plan.
- Findings can identify common issues such as exposed resources, underused capacity, service-limit pressure, or resilience gaps.
- **See also:** AWS Support plans, AWS Compute Optimizer, AWS Health Dashboard

### AWS Health Dashboard


The AWS Health Dashboard communicates service health and account-specific events that may affect AWS resources.

#### What it is
- The public **Service health** view reports broad AWS service events; the **Personal Health Dashboard** (account-specific Health Dashboard) reports events relevant to the account and its resources.
- Account-specific notifications can identify scheduled changes, service issues, or actions needed to protect workloads; organizational views can aggregate relevant health events across accounts.
- **See also:** Amazon EventBridge, AWS Trusted Advisor

### AWS Control Tower


A guided service for establishing and governing a secure multi-account AWS landing zone. Use it to apply consistent account setup and guardrails across an AWS Organization.

#### What it is
- **Landing zone** establishes a baseline multi-account environment using AWS Organizations and integrated governance services.
- **Account Factory** standardizes creation and enrollment of accounts in the governed environment.
- **Guardrails** provide ongoing controls: preventive guardrails use service control policies, while detective guardrails use AWS Config to identify noncompliance.
- Control Tower provides a governance dashboard to monitor account compliance; detective findings can be routed for notification or remediation.
- **See also:** AWS Organizations, AWS Config, AWS Service Catalog

### AWS Service Catalog


A governance service for publishing approved IT products for self-service provisioning. Use it when users need a controlled catalog instead of unrestricted resource creation.

#### What it is
- Administrators publish **portfolios** containing approved **products**, commonly backed by CloudFormation templates.
- Access, versions, constraints, and launch roles can be governed centrally while users provision permitted products without holding all underlying resource permissions.
- Products can be shared across accounts and integrated into a Control Tower account-provisioning process.
- **See also:** AWS CloudFormation, AWS Control Tower

### AWS Compute Optimizer


A recommendation service that analyzes resource utilization and configuration to identify potential rightsizing and performance improvements.

#### What it is
- Compute Optimizer uses utilization history and machine-learning analysis to recommend suitable resource configurations for supported resources such as EC2 instances, Auto Scaling groups, EBS volumes, and Lambda functions.
- Recommendations help identify over-provisioned resources that may be downsized and under-provisioned resources that may need additional capacity; they do not automatically change resources.
- **See also:** AWS Cost management tools, AWS Trusted Advisor, Amazon CloudWatch

### AWS cost management tools


AWS billing and cost-management tools help understand spending, set controls, allocate costs, and reduce recurring charges. Use them together: Cost Explorer analyzes trends, Budgets alerts on thresholds, and CUR supports detailed independent analysis.

#### What it is
- **Cost Explorer** visualizes historical cost and usage by account, service, and other dimensions, supports monthly, hourly, or resource-level views where available, and forecasts usage up to **18 months** from historical patterns.
- Cost Explorer can compare purchasing options and provide **Savings Plans** recommendations based on observed usage.
- **AWS Budgets** tracks actual or forecasted cost, usage, or commitment against a configured threshold and can send notifications or invoke supported actions.
- **Cost and Usage Report (CUR)** provides detailed billing line items and usage data for delivery to S3 for analysis with Athena, Redshift, or other tools.
- **Cost Allocation Tags** categorize usage and costs by application, environment, team, or owner; activate tags for billing reports, and use consistent tagging to support chargeback and governance.
- **Cost Anomaly Detection** continuously applies machine learning to historical spending patterns to identify unusual one-time spikes or sustained increases without requiring a fixed threshold; it can monitor services, member accounts, tags, or cost categories and send reports with root-cause analysis.
- **Savings Plans** exchange a one- or three-year hourly usage commitment for discounted eligible compute usage; they are flexible across eligible usage within their plan family, but unused commitment is still paid.
- **Reserved Instance and Savings Plans recommendations** help identify commitment opportunities; verify expected workload duration and utilization before committing.
- **Consolidated billing** combines member-account charges into one payer bill and can share eligible volume discounts and Savings Plans or Reserved Instance benefits across accounts, subject to sharing settings.
- Billing tools show costs and usage; AWS Support handles technical support, and billing data is not a substitute for CloudWatch operational monitoring.
- **See also:** AWS Organizations, AWS Budgets, Amazon CloudWatch, AWS Compute Optimizer

### AWS Support plans


AWS Support plans provide different levels of technical guidance, response targets, and proactive support. Choose a tier based on workload criticality and the need for rapid escalation or a Technical Account Manager.

#### What it is
- **Basic** is included at no additional charge and provides account, billing, and service-limit assistance plus public documentation and basic health resources; it does not include technical support cases.
- **Developer** is for development and test workloads and provides business-hours technical guidance; response targets are up to **24 hours** for general guidance and **12 hours** for system-impaired cases.
- **Business** adds 24/7 access to technical support and support for production workloads; typical targets are **4 hours** for production system impairment and **1 hour** for a production system down.
- **Enterprise On-Ramp** adds faster business-critical response targets, proactive guidance, and access to a pool of Technical Account Managers; its business-critical target is **30 minutes**.
- **Enterprise** provides the most comprehensive proactive support, a designated **Technical Account Manager (TAM)**, and a **15-minute** target for business-critical system-down cases.
- Response targets depend on the plan and severity classification; they are targets for initial response, not guaranteed resolution times.
- **See also:** AWS Trusted Advisor, AWS Health Dashboard

### AWS Well-Architected Tool


A free workload-review tool that helps evaluate an architecture against the AWS Well-Architected Framework and record improvement plans.

#### What it is
- Select a workload, answer questions organized by the six pillars, review identified risks, and receive guidance and a report that can be tracked in a dashboard.
- **See also:** Architecture principles

### AWS Resource Groups and Tag Editor


Resource Groups and Tag Editor help organize resources and apply or review tags across AWS resources.

#### What it is
- **Resource Groups** create logical collections of resources, often using shared tags or properties, for coordinated viewing and operations.
- **Tag Editor** searches resources across supported Regions and services and helps add, edit, or remove tags in bulk.
- Consistent tags support cost allocation, inventory, automation, and access-control patterns; tags do not automatically restrict access unless policies enforce them.
- **See also:** AWS cost management tools, AWS Systems Manager

### AWS License Manager


A service for managing software-license usage and reducing the risk of exceeding license terms across AWS and hybrid environments.

#### What it is
- Define license configurations and track usage of supported commercial software across managed resources and accounts.
- License Manager can help apply license rules and coordinate with AWS services used to provision or manage the licensed software.
- **See also:** AWS Systems Manager, AWS Organizations

### AWS OpsWorks


A managed configuration-management service for deploying and operating applications using Chef or Puppet.

#### What it is
- OpsWorks Stacks models applications as stacks, layers, instances, and deployments; OpsWorks for Chef Automate and Puppet Enterprise provide managed configuration-management environments.
- Use it for existing Chef/Puppet workflows rather than as the default choice for new general-purpose fleet automation; Systems Manager provides broader current operational tools.
- **See also:** AWS Systems Manager

### AWS X-Ray


A distributed tracing service for analyzing requests that cross application components and AWS services.

#### What it is
- Instrumented applications record **segments** and **subsegments** that describe request work, timing, errors, and downstream calls.
- X-Ray visualizes service maps and traces to locate latency, faults, and bottlenecks across distributed applications.
- Sampling limits trace volume and cost; trace context is propagated between supported services and instrumented clients.
- **See also:** Amazon CloudWatch, AWS Lambda, Amazon API Gateway

## Migration and transfer

### AWS Application Migration Service (MGN)


AWS Application Migration Service (MGN) automates lift-and-shift server migration to AWS with continuous replication of source disks. Choose it to rehost physical, virtual, or cloud-based servers with minimal downtime rather than redesigning applications before moving.

#### What it is
- MGN is the evolution of CloudEndure Migration and replaced AWS Server Migration Service (SMS).
- Install the **AWS Replication Agent** on supported source servers; it continuously replicates disk-level changes to a low-cost staging area in AWS.
- MGN converts supported physical, virtual, and cloud-based servers to run natively on AWS EC2 using replicated EBS volumes.
- Launch test instances to validate applications, then perform cutover to production instances when replication is current.
- It supports a wide range of platforms, operating systems, and databases, aiming to reduce migration effort, cost, and downtime.
- **See also:** AWS Application Discovery Service, AWS Migration Hub

### AWS Application Discovery Service


A migration-planning service that collects inventory and utilization information about on-premises servers and their dependencies. Choose it to understand the existing environment before grouping and moving workloads to AWS.

#### What it is
- **Agentless Discovery** uses the AWS Agentless Discovery Connector to collect VM inventory, configuration, and performance history such as CPU, memory, and disk usage.
- **Agent-based Discovery** uses the AWS Application Discovery Agent to collect system configuration, performance, running processes, and network-connection details between systems.
- Server utilization and dependency maps help determine migration plans and which servers should move together.
- Collected discovery data can be viewed in AWS Migration Hub.
- Using inventory, utilization, and dependency information together helps define application groupings and migration waves.
- **See also:** AWS Migration Hub, AWS Application Migration Service (MGN)

### AWS Migration Hub


A central place to plan and track application migration progress across AWS and partner migration tools. Choose it to view migration status across related servers and coordinate a migration project.

#### What it is
- Discovery results from AWS Application Discovery Service are viewable in Migration Hub and help organize servers into applications.
- Migration Hub tracks migration status and progress for server migrations performed with AWS Application Migration Service and other supported tools.
- The service provides a consolidated view rather than performing the underlying server replication or database migration itself.
- Migration teams can use the dashboard to review progress across application groups and identify work that remains.
- **See also:** AWS Application Discovery Service, AWS Application Migration Service (MGN), AWS Database Migration Service (DMS)

### AWS Migration Evaluator


A migration assessment service that helps build a data-driven business case for moving on-premises workloads to AWS. Choose it to estimate current resource utilization and compare projected AWS costs before planning migration waves.

#### What it is
- Migration Evaluator collects server inventory and utilization information to model right-sized AWS configurations and cost estimates.
- Its assessment can support total-cost-of-ownership comparisons and prioritization of migration candidates.
- Utilization data helps right-size proposed EC2 instances rather than basing the estimate only on provisioned on-premises capacity.
- The assessment output helps build a migration business case and plan next steps.
- The service is available at no additional charge as an AWS migration assessment offering.
- **See also:** AWS Application Discovery Service, AWS Migration Hub

### Cloud migration strategies


The **7 Rs** describe choices for an application or workload based on business constraints, technical effort, and desired cloud benefits. Select a migration approach per application rather than forcing every workload into the same path.

#### What it is
- **Rehost (lift and shift):** move a workload largely as-is; use it for speed, minimal application change, or when modernization can wait. MGN is the AWS server migration tool for this path.
- **Relocate:** move an existing virtualized environment without redesigning individual applications; VMware Cloud on AWS supports moving VMware vSphere workloads while retaining VMware operations.
- **Replatform (lift, tinker, and shift):** make limited optimizations, such as moving to a managed database, while keeping the core application architecture.
- **Repurchase:** replace the existing application with a different product, often a SaaS offering, when adopting a new product is preferable to migrating the old one.
- **Refactor / re-architect:** substantially redesign or rewrite an application to use cloud-native capabilities when the business benefit justifies the engineering effort.
- **Retain:** keep a workload where it is for now when dependencies, compliance, economics, or business timing make migration unsuitable.
- **Retire:** decommission applications that are no longer needed, avoiding the cost of migrating unused workloads.

#### Migration tooling map
- **Servers:** AWS Application Migration Service (MGN) performs continuous server replication and rehosting; AWS Application Discovery Service collects inventory and dependency data, and Migration Hub tracks progress.
- **Databases:** AWS Database Migration Service (DMS), covered in Databases, migrates database data and can replicate ongoing changes; use AWS SCT when schema conversion between engines is needed.
- **Files:** AWS DataSync and AWS Transfer Family, covered in Storage, move or provide protocol-based access to files in AWS storage.
- **Physical bulk data:** AWS Snow Family, covered in Storage, uses secure portable devices to move datasets up to petabytes when network transfer is impractical; use devices when a network transfer would take **more than a week**. For example, at 100 Mbps, 10 TB takes about 12 days, 100 TB about 124 days, and 1 PB about 3 years; at 1 Gbps the same transfers take about 30 hours, 12 days, and 124 days; at 10 Gbps they take about 3 hours, 30 hours, and 12 days. Snowball data must land in S3 before an S3 lifecycle policy moves it to Glacier.
- **VMware environments:** VMware Cloud on AWS relocates or extends vSphere-based data centers while retaining VMware tooling.
- **Discovery-to-migration flow:** use Application Discovery Service to collect server inventory, performance, and dependencies; group and track workloads in Migration Hub; migrate server replicas with MGN and validate before cutover.
- **See also:** AWS Application Discovery Service, AWS Migration Hub, AWS Application Migration Service (MGN), AWS Database Migration Service (DMS), AWS DataSync, AWS Transfer Family, AWS Snow Family, VMware Cloud on AWS

### VMware Cloud on AWS


A VMware vSphere-based cloud service that lets organizations extend or move their VMware data-center environment into AWS while continuing to use VMware software. Choose it for large-scale VMware workload migration, hybrid capacity, or disaster recovery.

#### What it is
- It runs vSphere-based private-cloud environments in AWS and can connect an on-premises vCenter environment to AWS services.
- Organizations can migrate vSphere workloads, run production workloads across private, public, and hybrid environments, or establish a disaster-recovery strategy.
- It can integrate with AWS services such as EC2, S3, Direct Connect, FSx, RDS, and Redshift.
- It supports retaining VMware administration and operational practices while extending data-center capacity into AWS.
- It is a relocation path for VMware-based infrastructure, not a requirement to refactor each guest application before migration.
- **See also:** AWS Application Migration Service (MGN), AWS Application Discovery Service, AWS Migration Hub

## Architecture principles

### AWS Well-Architected Framework pillars


The Well-Architected Framework is a set of architectural best practices for evaluating workloads. Its six pillars reinforce one another rather than represent competing goals.

#### What it is
- General principles include stop guessing capacity, test systems at production scale, automate experimentation, allow architecture to evolve with requirements, make decisions using data, and improve through game days and simulations.

#### Six pillars and design principles
- **Operational Excellence** — run and monitor systems to deliver business value and continually improve processes; operate as code, make frequent small reversible changes, refine procedures often, anticipate failure, and learn from operational events.
- Operational cues include automation of deployment and monitoring, observable operations, and game days that validate responses to failure.
- **Security** — protect systems, information, and assets while delivering business value; establish strong identity foundations, enable traceability, apply security at every layer, automate security best practices, protect data in transit and at rest, keep people away from direct data access, and prepare for security events.
- Security cues include least privilege, centralized identity, encryption, audit trails, and automated detection and response.
- **Reliability** — recover from failures, meet demand, and mitigate disruption; test recovery procedures, automatically recover, scale horizontally, stop guessing capacity, and manage change through automation.
- Reliability cues include multi-AZ designs, health checks, backups, resilient queues, tested failover, and explicit recovery objectives.
- **Performance Efficiency** — use computing resources efficiently as demand and technology change; democratize advanced technologies, go global quickly, use serverless architectures, experiment more often, and consider mechanical sympathy.
- Performance cues include choosing the right resource type, measuring bottlenecks, and using managed or purpose-built services rather than over-provisioning.
- **Cost Optimization** — deliver business value at the lowest appropriate price; adopt consumption models, measure overall efficiency, stop paying for undifferentiated heavy lifting, analyze expenditures, and use managed services.
- Cost cues include rightsizing, scheduling nonproduction capacity, commitment discounts for stable use, and matching storage class to access patterns.
- **Sustainability** — minimize the environmental impact of running cloud workloads; understand impact, establish goals, maximize utilization, anticipate and adopt efficient hardware/software, and use managed services.
- Sustainability cues include avoiding idle capacity, increasing utilization, selecting efficient architectures, and reducing unnecessary data movement and storage.
- **See also:** AWS Well-Architected Tool, AWS Trusted Advisor

### High availability, fault tolerance, and disaster recovery


These concepts describe different levels of continuity when infrastructure or an entire Region fails. Match the design to the workload's tolerated downtime and data loss.

#### What it is
- **High availability (HA)** reduces downtime through redundancy and automated detection or failover, commonly across multiple Availability Zones; brief interruptions can still occur during recovery.
- **Fault tolerance** keeps service operating through component failure with little or no interruption, typically using continuously available redundant components and synchronization; it is usually more complex and costly than HA.
- **Disaster recovery (DR)** restores service after a larger outage, such as a Region loss; it requires a recovery strategy, replicated or backed-up data, and tested procedures.
- **RTO (Recovery Time Objective)** is the maximum acceptable time to restore service; **RPO (Recovery Point Objective)** is the maximum acceptable amount of data loss measured in time.
- DR choices trade cost against RTO/RPO: backup and restore is generally cheapest and slower; pilot light and warm standby keep progressively more infrastructure ready; multi-site active/active can provide the fastest recovery at the highest cost and operational complexity.
- Multi-AZ resilience addresses failures within a Region; cross-Region backup or replication is needed for Regional disaster recovery.
- **See also:** AWS Well-Architected Framework pillars, Amazon CloudWatch, AWS CloudTrail

### Loose coupling and stateless design


Loosely coupled, stateless components can be changed, replaced, and scaled independently. They limit the blast radius of failure and avoid binding application state to one server.

#### What it is
- Put asynchronous boundaries such as SQS, SNS, or EventBridge between producers and consumers to buffer load and reduce direct dependencies.
- Use APIs and event contracts rather than hard-coding service internals; design consumers to handle retries and duplicate delivery safely.
- Store durable shared state outside replaceable compute, such as in DynamoDB, RDS, or S3; keep session state in a shared store or client token instead of a single EC2 instance.
- Use Auto Scaling and load balancers to replace or add application instances without relying on sticky local state.
- **See also:** Amazon SQS, Amazon EventBridge, AWS Lambda, Amazon DynamoDB

### Scaling: vertical and horizontal


Scaling changes available capacity as workload demand changes. Prefer horizontal scaling for resilient, distributed workloads; use vertical scaling when the application or data tier requires larger individual nodes.

#### What it is
- **Vertical scaling (scale up/down)** changes the size of one resource, such as moving to a larger EC2 instance or database class; it is constrained by available sizes and can require interruption.
- **Horizontal scaling (scale out/in)** adds or removes resource instances, commonly with load balancing and Auto Scaling; it can improve fault isolation but requires a distributed, preferably stateless application.
- Plan capacity from observed demand, use scaling policies and health checks, and test at production scale rather than guessing peak size.
- Queue-based buffering can decouple incoming bursts from worker capacity; scale consumers based on backlog or workload metrics.
- **See also:** AWS Auto Scaling, Elastic Load Balancing, Amazon SQS

### AWS global infrastructure and Region selection


AWS Regions contain isolated Availability Zones, while edge and extension locations bring selected services closer to users or workloads. Select geography based on workload requirements, not only proximity.

#### What it is
- A **Region** is a separate geographic area; services and features are not available in every Region, and many resource deployments are Region-scoped.
- An **Availability Zone (AZ)** is an isolated location within a Region, composed of one or more data centers; distribute production workloads across AZs for in-Region resilience.
- **Edge locations** serve content and network services close to users, including CloudFront; they are not equivalent to a full Region or AZ.
- **Local Zones** extend selected AWS services nearer to a metropolitan area for latency-sensitive workloads; **Wavelength Zones** place AWS infrastructure in telecommunications networks for low-latency 5G applications.
- **AWS Outposts** provides AWS-managed infrastructure in a customer's facility for local processing, low latency, data residency, or migration needs; customers remain responsible for physical security of the facility and Outposts racks.
- Choose a Region by data residency and legal requirements, proximity and latency, service and feature availability, cost, connectivity, and disaster-recovery strategy.
- **See also:** Amazon CloudFront, AWS Global Accelerator, AWS Outposts

### Caching strategies across AWS services


Caching reduces repeated work and latency by keeping reusable data closer to its consumers. Select a cache based on the content, consistency needs, and layer of the application.

#### What it is
- **Amazon CloudFront** caches HTTP content at edge locations for global delivery; configure cache keys and TTLs, and use invalidations or versioned objects when content changes.
- **API Gateway caching** caches eligible API responses at the API stage for a configured TTL, reducing repeated backend calls; it is not a general-purpose application cache.
- **Amazon ElastiCache** provides managed Redis or Memcached-compatible in-memory caches; application code controls cache keys, population, expiration, and invalidation.
- **DynamoDB Accelerator (DAX)** is an API-compatible, managed in-memory cache for DynamoDB reads; it offers microsecond read latency, caches item and query results, and does not accelerate writes.
- **S3 byte-range requests** retrieve portions of large objects rather than downloading the whole object, useful for parallel downloads or accessing selected ranges; this is partial retrieval, not a cache.
- **AWS Global Accelerator** is not a content cache: it uses static anycast IP addresses and the AWS global network to route traffic to healthy endpoints for performance and availability.
- **See also:** Amazon CloudFront, Amazon API Gateway, Amazon ElastiCache, Amazon DynamoDB, AWS Global Accelerator

### Cost optimization principles


Cost optimization is an ongoing process of matching resources to measured demand and choosing appropriate purchasing and storage models. Include network transfer and operational overhead in total cost.

#### What it is
- **Right-size** compute, databases, and storage from measured utilization; shut down or schedule nonproduction resources that are not needed continuously.
- Match purchasing to workload predictability: On-Demand for flexible or uncertain demand, Spot for fault-tolerant interruptible work, and Savings Plans or Reserved Instances for stable eligible usage.
- Use storage lifecycle policies and tiers that match access frequency, retrieval latency, and retention; avoid paying premium rates for data that is rarely accessed.
- Data transfer **into AWS is generally free**; transfers between resources in the same AZ are generally free when using private addressing, while inter-AZ, inter-Region, and outbound-to-internet transfers can incur charges.
- Compare **NAT Gateway** processing and hourly costs with private service access through VPC endpoints; gateway endpoints for S3 and DynamoDB avoid NAT processing for those destinations, while interface endpoints have their own hourly and data-processing charges.
- Reduce unnecessary cross-AZ and cross-Region traffic, and use CloudFront or regional services when they reduce repeated origin transfer costs.
- Apply consistent **cost allocation tags** and analyze Cost Explorer, Budgets, CUR, and anomaly findings to assign and investigate spend.
- **See also:** AWS cost management tools, AWS Compute Optimizer, Amazon CloudFront

### Serverless architecture patterns


Serverless services remove or abstract server provisioning and scale managed capacity in response to demand; serverless does not mean that applications have no limits, latency, or costs.

#### What it is
- Common serverless building blocks include **AWS Lambda**, API Gateway, DynamoDB, S3, Cognito, SNS, SQS, Kinesis Data Firehose, Step Functions, Aurora Serverless, and AWS Fargate; S3 and DynamoDB are serverless storage services.
- A common REST pattern is client -> API Gateway -> Lambda -> DynamoDB; Cognito can authenticate users and issue temporary credentials for restricted direct access to S3, while a public API may not need Cognito. CloudFront can sit in front for global content delivery, with DAX for DynamoDB reads and API Gateway response caching for repeated API requests.
- Event patterns use EventBridge or S3 events to invoke Lambda; S3 can also notify SQS or SNS. A DynamoDB Stream can invoke Lambda to send a welcome email through SES, generate derived data, or react to item changes.
- Serverless is a strong fit for variable or spiky demand, event-driven processing, and teams that want to focus on application code rather than server maintenance.
- Lambda runs on demand, scales automatically, and charges for requests and compute time, but functions have execution-duration and runtime limits; ECS or Fargate better suits arbitrary long-running container images. Design for quotas, retries, duplicate events, cold starts, observability, and least-privilege execution roles.
- **See also:** AWS Lambda, Amazon API Gateway, Amazon DynamoDB, Amazon S3, Amazon EventBridge

### Static website, three-tier, microservices, and event-driven architectures


Reference architectures combine services into repeatable application patterns. Choose a pattern according to the interaction model, scaling needs, and operational boundaries.

#### What it is
- A **static website** stores HTML, CSS, JavaScript, and assets in S3 and commonly delivers them through CloudFront; Route 53 can provide DNS and HTTPS is configured with an appropriate certificate.
- A **three-tier application** separates presentation, application logic, and data: for example, CloudFront or an ALB for web traffic, EC2/containers/Lambda for application logic, and RDS/Aurora or DynamoDB for data. A classic architecture commonly combines EC2, Elastic Load Balancing, RDS, and ElastiCache.
- A **microservices architecture** divides business capabilities into independently deployable services connected synchronously through API Gateway or load balancers, or asynchronously through SQS, Kinesis, SNS, and Lambda triggers. Each service can use a different architecture, but duplication of operational work, poor server utilization, coordinating versions, and many client integrations add complexity.
- An **event-driven architecture** uses producers, event buses or queues, and consumers; EventBridge routes service or application events, while SQS provides durable buffering and SNS fans notifications out to subscribers.
- A global website can serve static S3 content through CloudFront with Origin Access Control and a bucket policy that permits CloudFront only; a serverless REST API can add API Gateway, Lambda, DynamoDB, and DAX, and DynamoDB Global Tables can serve regional users.
- A **big-data ingestion pattern** can send device events to Kinesis Data Streams, then Firehose for near-real-time delivery (about one minute) to S3; Lambda can transform records, and Athena can query the data with results stored in S3 for QuickSight or Redshift reporting. S3 notifications can route through SQS to Lambda for additional processing.
- A serverless variant commonly combines S3, Lambda, DynamoDB, CloudFront, and API Gateway.
- **See also:** Amazon CloudFront, Amazon S3, Amazon API Gateway, Amazon EventBridge, Amazon SQS
