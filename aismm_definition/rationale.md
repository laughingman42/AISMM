# AISMM Framework Alignment Rationale

This document provides detailed rationale for framework mappings in the AI Security Maturity Model (AISMM). Each domain's indicators are mapped to specific controls, requirements, or guidance from recognized security and AI governance frameworks.

---

## Domain: `ai_security_standards`

**Pillar:** Security for AI  
**Description:** Establishment and implementation of comprehensive AI security standards and governance frameworks

### Indicator 1: Existence of documented AI security policies and procedures

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST AI RMF** | GOVERN 1.1, GOVERN 1.2, GOVERN 1.3, GOVERN 1.4 | GOVERN 1.x subcategories specifically address organizational policies, procedures, and processes for AI risk management. GOVERN 1.1 covers legal/regulatory requirements; 1.2 addresses trustworthiness characteristics; 1.3 focuses on organizational policies; 1.4 addresses risk management processes. |
| **ISO 27001** | A.5.1.1, A.5.1.2, Clause 5.2 | A.5.1.1 (Policies for information security) and A.5.1.2 (Review of policies) directly address policy documentation. Clause 5.2 requires top management to establish an information security policy. |
| **ISO 42001** | 5.2, 5.3, 7.5.1, 7.5.2, 7.5.3 | Clause 5.2 (AI policy) requires documented AI management system policy. 5.3 addresses organizational roles. 7.5.x covers documented information requirements for AI systems. |
| **NIST CSF 2.0** | GV.PO-01, GV.PO-02 | GV.PO-01 addresses organizational cybersecurity policy establishment. GV.PO-02 covers policy communication throughout the organization. These are governance-focused controls in CSF 2.0's new Govern function. |
| **SOC 2** | CC1.1, CC1.2 | CC1.1 (COSO Principle 1: Integrity and ethical values) and CC1.2 (Board oversight) establish foundational governance for security policies. |

---

### Indicator 2: Compliance with industry standards (NIST AI RMF, ISO/IEC 42001, etc.)

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST AI RMF** | GOVERN 1.2, GOVERN 2.1, GOVERN 2.3 | GOVERN 1.2 addresses alignment with trustworthiness characteristics from standards. GOVERN 2.1 covers roles/responsibilities aligned with standards. GOVERN 2.3 addresses executive commitment to AI risk management. |
| **ISO 27001** | A.18.1.1, A.18.2.1, A.18.2.2, Clause 9.2 | A.18.1.x addresses compliance with legal and contractual requirements. A.18.2.x covers information security reviews and compliance checking. Clause 9.2 requires internal audits. |
| **ISO 42001** | 4.1, 4.2, 9.2, 9.3, 10.2 | Clause 4.x addresses understanding organizational context and stakeholder needs (including regulatory). 9.2 (Internal audit) and 9.3 (Management review) ensure ongoing compliance. 10.2 addresses nonconformity and corrective action. |
| **EU AI Act** | Article 9, Article 17, Article 40, Article 41 | Article 9 covers risk management systems. Article 17 addresses quality management systems. Articles 40-41 cover harmonized standards and conformity assessment—directly relevant to compliance demonstration. |
| **NIST CSF 2.0** | GV.OC-01, GV.OC-02, GV.OC-03 | GV.OC (Organizational Context) subcategories address understanding legal, regulatory, and contractual requirements that inform cybersecurity strategy. |

---

### Indicator 3: Regular updates to security standards based on emerging threats

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST AI RMF** | GOVERN 1.5, GOVERN 1.6, GOVERN 6.1 | GOVERN 1.5 addresses ongoing monitoring and adjustment. GOVERN 1.6 covers mechanisms for continuous improvement. GOVERN 6.1 addresses policies for managing third-party AI risks (which evolve with threats). |
| **ISO 27001** | Clause 10.1, Clause 10.2, A.5.1.2 | Clause 10.x addresses continual improvement and corrective action. A.5.1.2 specifically requires policies to be reviewed at planned intervals or when significant changes occur. |
| **ISO 42001** | 10.1, 10.2, 9.3 | Clause 10.1 (Continual improvement) and 10.2 (Nonconformity and corrective action) ensure standards evolve. 9.3 (Management review) includes reviewing changes in external/internal issues affecting the AI management system. |
| **NIST CSF 2.0** | GV.IM-01, GV.IM-02, ID.IM-01 | GV.IM (Improvement) subcategories specifically address incorporating lessons learned and improving cybersecurity risk management. ID.IM-01 covers improvement to asset management based on assessments. |

---

### Indicator 4: Integration with existing enterprise security frameworks

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST AI RMF** | GOVERN 2.1, GOVERN 2.2, GOVERN 6.2 | GOVERN 2.x addresses organizational structures and accountability that must integrate with existing governance. GOVERN 6.2 covers contingency processes integrating with enterprise incident response. |
| **ISO 27001** | A.5.1.1, Clause 4.1, Clause 4.2, Clause 4.3 | A.5.1.1 requires policies aligned with organizational direction. Clause 4.x addresses understanding organizational context, stakeholder needs, and ISMS scope—essential for integration. |
| **ISO 42001** | 4.1, 4.2, 4.3, 5.1 | Clauses 4.1-4.3 establish context and scope that must align with enterprise frameworks. 5.1 (Leadership and commitment) requires integration with organizational processes. |
| **SOC 2** | CC1.1, CC1.2, CC1.3, CC3.1 | CC1.x addresses organizational integrity and oversight structures. CC3.1 (Risk assessment) must integrate with enterprise risk management. |
| **NIST CSF 2.0** | GV.OC-04, GV.OC-05 | GV.OC-04 addresses critical objectives and stakeholder expectations. GV.OC-05 covers requirements from oversight bodies—both require enterprise integration. |

---

### Indicator 5: Measurable security objectives and KPIs

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST AI RMF** | GOVERN 1.3, GOVERN 1.7, MEASURE 1.1 | GOVERN 1.3 addresses organizational processes and document objectives. GOVERN 1.7 covers risk management process monitoring. MEASURE 1.1 specifically addresses measurement approaches for AI risks. |
| **ISO 27001** | Clause 6.2, Clause 9.1, Clause 9.3 | Clause 6.2 requires information security objectives to be measurable. Clause 9.1 (Monitoring, measurement, analysis, evaluation) directly addresses KPIs. Clause 9.3 covers management review of performance. |
| **ISO 42001** | 6.2, 9.1, 9.3 | Clause 6.2 (AI objectives) requires measurable objectives. 9.1 and 9.3 address performance evaluation and management review of metrics. |
| **NIST CSF 2.0** | GV.MT-01, GV.MT-02, GV.MT-03 | GV.MT (Measurement and Tracking) subcategories directly address cybersecurity risk management performance measurement, tracking, and reporting. |
| **SOC 2** | CC4.1, CC4.2 | CC4.1 (Monitoring activities) and CC4.2 (Evaluation and communication of deficiencies) address ongoing measurement and reporting of control effectiveness. |

---

## Domain: `security_reviews`

**Pillar:** Security for AI  
**Description:** Systematic security assessment and review processes for AI systems

### Indicator 1: Frequency and consistency of AI security assessments

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST AI RMF** | MEASURE 2.1, MEASURE 2.2, MEASURE 2.3 | MEASURE 2.x subcategories address evaluation and assessment of AI systems. 2.1 covers evaluation approaches; 2.2 addresses evaluations conducted by appropriate personnel; 2.3 focuses on metrics for AI system assessment. |
| **ISO 27001** | A.18.2.1, A.18.2.2, A.18.2.3 | A.18.2.x (Information security reviews) directly addresses security assessment frequency and methodology. A.18.2.1 covers independent review; A.18.2.2 addresses compliance with policies; A.18.2.3 covers technical compliance review. |
| **NIST CSF 2.0** | ID.RA-01, ID.RA-02, ID.RA-03 | ID.RA (Risk Assessment) subcategories address systematic identification and assessment of risks. ID.RA-01 covers asset vulnerabilities; ID.RA-02 addresses threat intelligence; ID.RA-03 covers threats identification. |
| **ISO 42001** | 9.2, 9.3, 8.6 | Clause 9.2 (Internal audit) establishes systematic review requirements. 9.3 (Management review) ensures regular assessment cycles. 8.6 addresses AI system performance monitoring. |

---

### Indicator 2: Scope and depth of security reviews

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST AI RMF** | MAP 1.1, MAP 1.2, MAP 5.1, MAP 5.2 | MAP function addresses understanding context and scope. MAP 1.1 covers intended purposes; 1.2 addresses interdisciplinary AI actors; 5.1 and 5.2 address impact characterization and assessment scope. |
| **ISO 27001** | A.14.2.1, A.14.2.8, A.18.2.1 | A.14.2.1 (Secure development policy) and A.14.2.8 (System security testing) address review depth. A.18.2.1 ensures independent review with appropriate scope. |
| **ISO 42001** | 8.2, 8.6, 8.7 | Clause 8.2 covers AI system lifecycle processes. 8.6 addresses performance and monitoring. 8.7 covers AI system operation with comprehensive review requirements. |
| **NIST CSF 2.0** | ID.RA-04, ID.RA-05 | ID.RA-04 addresses potential impacts identification. ID.RA-05 covers risk determination—both define the scope of security analysis. |

---

### Indicator 3: Automation level of security testing

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST CSF 2.0** | DE.CM-01, DE.CM-04, DE.CM-09 | DE.CM (Continuous Monitoring) subcategories address automated security capabilities. DE.CM-01 covers network monitoring; DE.CM-04 addresses malicious code detection; DE.CM-09 covers computing hardware monitoring. |
| **ISO 27001** | A.14.2.5, A.14.2.8 | A.14.2.5 (Secure system engineering principles) and A.14.2.8 (System security testing) address automation in development security testing. |
| **NIST SSDF** | PW.7.1, PW.7.2, PW.8.1 | PW.7.x addresses code review and testing automation. PW.7.1 covers automated testing requirements; PW.7.2 addresses test coverage. PW.8.1 covers configuring software to have secure settings. |
| **ISO 42001** | 8.2, 8.3, 8.4 | Clauses 8.2-8.4 address AI system lifecycle implementation including automated verification and validation processes. |
| **SOC 2** | CC6.1, CC6.6, CC7.1 | CC6.1 (Logical and physical access controls) and CC6.6 (Security events) enable automated monitoring. CC7.1 (System operations) addresses automated detection capabilities. |

---

### Indicator 4: Integration with development lifecycle

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST SSDF** | PO.3.1, PO.3.2, PW.1.1, PW.4.1 | NIST Secure Software Development Framework directly addresses SDLC integration. PO.3.x covers security requirements. PW.1.1 addresses secure design. PW.4.1 covers software builds with security controls. |
| **NIST CSF 2.0** | PR.DS-07, PR.DS-08 | PR.DS-07 (Development and testing environments) and PR.DS-08 (Integrity checking) address security integration throughout development. |
| **ISO 27001** | A.14.1.1, A.14.2.1, A.14.2.6 | A.14.1.x addresses security requirements analysis. A.14.2.1 (Secure development policy) and A.14.2.6 (Secure development environment) ensure lifecycle integration. |
| **ISO 42001** | 8.2, 8.3, 8.4, 8.5 | Clauses 8.2-8.5 comprehensively address AI system lifecycle from design through deployment, requiring security integration at each phase. |

---

### Indicator 5: Policy enforcement mechanisms

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST AI RMF** | GOVERN 3.1, GOVERN 3.2, MANAGE 2.1 | GOVERN 3.x addresses workforce diversity and expertise for enforcement. MANAGE 2.1 covers resources and mechanisms for risk treatment and policy implementation. |
| **ISO 27001** | A.5.1.1, A.18.1.1, A.18.2.2 | A.5.1.1 (Policies for information security) establishes policy foundation. A.18.1.1 (Identification of applicable legislation) and A.18.2.2 (Compliance with security policies) address enforcement. |
| **SOC 2** | CC5.1, CC5.2, CC5.3 | CC5.1 (Control activities) establishes enforcement mechanisms. CC5.2 addresses policy deployment. CC5.3 covers control selection and design for enforcement. |
| **ISO 42001** | 5.2, 8.1, 9.2 | Clause 5.2 (AI policy) establishes policy requirements. 8.1 (Operational planning and control) addresses implementation. 9.2 (Internal audit) ensures enforcement verification. |
| **NIST CSF 2.0** | GV.PO-01, GV.PO-02 | GV.PO-01 (Policy establishment) and GV.PO-02 (Policy communication) are foundational to enforcement—policies must exist and be communicated before enforcement. |

---

## Domain: `shadow_ai_management`

**Pillar:** Security from AI  
**Description:** Detection, prevention, and governance of unauthorized AI tool usage

### Indicator 1: Visibility into unauthorized AI tool usage

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST AI RMF** | GOVERN 1.4, GOVERN 1.5, MAP 1.5 | GOVERN 1.4 addresses ongoing risk management processes including asset visibility. GOVERN 1.5 covers mechanisms for continuous monitoring. MAP 1.5 addresses organizational risk tolerances which inform what constitutes "unauthorized." |
| **ISO 27001** | A.8.1.1, A.8.1.2, A.12.5.1 | A.8.1.1 (Inventory of assets) and A.8.1.2 (Ownership of assets) directly support visibility into all IT assets including AI tools. A.12.5.1 (Installation of software) controls unauthorized software. |
| **NIST CSF 2.0** | ID.AM-01, ID.AM-02, ID.AM-03 | ID.AM (Asset Management) subcategories address physical devices, software platforms, and data flow mapping—essential for identifying unauthorized AI tool usage. |
| **ISO 42001** | 8.2, 9.1, 8.6 | Clause 8.2 (AI system lifecycle) requires understanding all AI systems. 9.1 (Monitoring, measurement, analysis) ensures ongoing visibility. 8.6 addresses performance and monitoring. |

---

### Indicator 2: Detection capabilities for unapproved AI services

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST CSF 2.0** | DE.AE-02, DE.AE-03, DE.CM-01, DE.CM-07 | DE.AE (Adverse Event Analysis) addresses detection of anomalous activities. DE.CM (Continuous Monitoring) covers network and personnel activity monitoring—both essential for detecting unapproved AI service usage. |
| **ISO 27001** | A.12.4.1, A.12.4.3 | A.12.4.1 (Event logging) and A.12.4.3 (Administrator and operator logs) provide the foundational logging required for detection of unauthorized service usage. |
| **SOC 2** | CC6.1, CC6.8, CC7.1, CC7.2 | CC6.1 (Logical and physical access) and CC6.8 (Software acquisition) address controls for service usage. CC7.1-7.2 (System operations monitoring) cover detection capabilities. |
| **ISO 42001** | 8.6, 8.7, 9.1 | Clauses 8.6-8.7 address AI system performance and operation monitoring. 9.1 covers measurement and analysis—supporting detection of anomalous AI usage patterns. |

---

### Indicator 3: Prevention controls and access restrictions

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **ISO 27001** | A.9.1.2, A.9.2.3, A.13.1.1, A.13.1.3 | A.9.1.2 (Access to networks) and A.9.2.3 (Management of privileged access) restrict access to services. A.13.1.1 (Network controls) and A.13.1.3 (Segregation in networks) enable blocking of unauthorized services. |
| **NIST CSF 2.0** | PR.AC-01, PR.AC-03, PR.AC-04, PR.AC-05 | PR.AC (Access Control) subcategories address identity management, remote access, and access permissions—all critical for preventing unauthorized AI tool access. |
| **SOC 2** | CC6.1, CC6.2, CC6.3 | CC6.1 (Logical access security) establishes access controls. CC6.2 (Prior to granting access) and CC6.3 (Access removal) govern the authorization lifecycle. |
| **ISO 42001** | 8.5, 7.1, 8.1 | Clause 8.5 covers AI system resources and security. 7.1 addresses resources including access controls. 8.1 (Operational planning) includes prevention mechanisms. |

---

### Indicator 4: Governance integration across data and AI domains

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST AI RMF** | GOVERN 2.1, GOVERN 2.2, GOVERN 6.1, GOVERN 6.2 | GOVERN 2.x addresses organizational structures and accountability integration. GOVERN 6.x covers policies for third-party AI and contingency processes—essential for comprehensive governance. |
| **ISO 27001** | A.5.1.1, Clause 4.1, Clause 4.2 | A.5.1.1 (Policies for information security) must encompass AI governance. Clause 4.1-4.2 address organizational context and stakeholder needs for integrated governance. |
| **ISO 42001** | 4.1, 4.2, 5.1, 8.1 | Clauses 4.1-4.2 establish organizational context requiring integration. 5.1 (Leadership commitment) ensures governance priority. 8.1 (Operational planning) integrates AI into enterprise processes. |
| **NIST CSF 2.0** | GV.OC-01, GV.OC-02, GV.RR-01 | GV.OC (Organizational Context) addresses stakeholder expectations and legal requirements. GV.RR (Roles, Responsibilities) ensures governance accountability across domains. |
| **COBIT** | DSS05.01, DSS05.02, DSS05.03 | DSS05 (Manage Security Services) addresses protection of enterprise information including network security, endpoint security, and identity management—spanning data and IT domains. |

---

### Indicator 5: Monitoring and compliance reporting

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **ISO 27001** | Clause 9.1, Clause 9.2, A.18.2.1, A.18.2.2 | Clause 9.1 (Monitoring and measurement) and 9.2 (Internal audit) establish monitoring foundations. A.18.2.1-2.2 address compliance reviews and technical compliance checking. |
| **NIST CSF 2.0** | DE.CM-07, RS.CO-02, RS.CO-03 | DE.CM-07 addresses monitoring for unauthorized activities. RS.CO (Response Communications) covers information sharing and coordination for compliance reporting. |
| **SOC 2** | CC4.1, CC4.2, CC7.2 | CC4.1 (COSO monitoring) and CC4.2 (Deficiency evaluation) address ongoing monitoring and reporting. CC7.2 (Security incidents) covers reporting on anomalous activities. |
| **ISO 42001** | 9.1, 9.2, 9.3, 10.2 | Clauses 9.1-9.3 comprehensively address performance evaluation, internal audit, and management review. 10.2 (Nonconformity and corrective action) ensures compliance gaps are reported and addressed. |
| **NIST AI RMF** | MEASURE 1.1, MEASURE 1.2, MEASURE 4.1 | MEASURE 1.x establishes appropriate methods and metrics for measurement. MEASURE 4.1 addresses feedback collection and reporting for AI systems. |

---

## Domain: `ai_agent_authorization`

**Pillar:** Security from AI  
**Description:** Authorization frameworks and access controls for autonomous AI agents and their tool/API usage

### Indicator 1: Agent authorization and access control frameworks

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST AI RMF** | GOVERN 1.5, MANAGE 2.2, MANAGE 2.3, MEASURE 2.7 | GOVERN 1.5 addresses ongoing monitoring mechanisms. MANAGE 2.x covers risk treatment including access controls—2.2 addresses risk responses, 2.3 covers risk treatment implementation. MEASURE 2.7 addresses AI system security and resilience. |
| **ISO 27001** | A.9.1.1, A.9.1.2, A.9.2.1, A.9.4.1 | A.9.1.1 (Access control policy) establishes framework. A.9.1.2 (Access to networks) addresses network-level controls. A.9.2.1 (User registration) and A.9.4.1 (Information access restriction) apply to agent identities and permissions. |
| **NIST CSF 2.0** | PR.AC-01, PR.AC-04, PR.AC-05, PR.AA-01 | PR.AC subcategories address identity management, access permissions, and network integrity. PR.AA-01 (Authentication and identity proofing) is essential for agent identity verification. |
| **ISO 42001** | 8.5, 8.6, 7.1 | Clause 8.5 addresses AI system resources and access. 8.6 covers performance monitoring. 7.1 addresses resources including access control infrastructure. |
| **SOC 2** | CC6.1, CC6.2, CC6.3 | CC6.1 (Logical and physical access controls) establishes authorization framework. CC6.2 (Access granted) and CC6.3 (Access removed) govern the authorization lifecycle for agents. |

---

### Indicator 2: Least privilege and permission boundaries

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST AI RMF** | MANAGE 2.2, MANAGE 2.3, GOVERN 1.5 | MANAGE 2.x addresses risk treatment strategies including permission minimization. GOVERN 1.5 covers mechanisms to ensure ongoing compliance with access restrictions. |
| **ISO 27001** | A.9.2.3, A.9.4.1, A.9.4.4, A.9.4.5 | A.9.2.3 (Privileged access rights management) directly addresses least privilege. A.9.4.1 (Information access restriction), A.9.4.4 (Privileged utility programs), and A.9.4.5 (Access control to program source code) establish boundaries. |
| **NIST CSF 2.0** | PR.AC-04, PR.AC-06, PR.PT-03 | PR.AC-04 (Access permissions) directly addresses least privilege implementation. PR.AC-06 (Account and credential management) ensures proper credential scoping. PR.PT-03 addresses principle of least functionality. |
| **ISO 42001** | 8.5, 7.1, 8.1 | Clause 8.5 addresses AI system resource controls. 7.1 covers resource allocation including access. 8.1 (Operational planning) ensures least privilege in operational contexts. |
| **NIST SP 800-207** | Zero Trust Architecture Principles | Zero Trust mandates "never trust, always verify" and continuous authorization—directly applicable to agent permission boundaries and sandboxing. |

---

### Indicator 3: Agent activity monitoring and audit logging

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **ISO 27001** | A.12.4.1, A.12.4.2, A.12.4.3, A.12.4.4 | A.12.4.x comprehensively addresses logging and monitoring: A.12.4.1 (Event logging), A.12.4.2 (Protection of log information), A.12.4.3 (Administrator logs), A.12.4.4 (Clock synchronization) for forensics. |
| **NIST CSF 2.0** | DE.CM-01, DE.CM-03, DE.AE-03, PR.PT-01 | DE.CM (Continuous Monitoring) addresses network and computing resource monitoring. DE.AE-03 covers event correlation. PR.PT-01 addresses audit logging capabilities. |
| **SOC 2** | CC6.1, CC6.2, CC7.2, CC7.3 | CC6.1-6.2 address access logging. CC7.2 (Security events identification) and CC7.3 (Security incident response) ensure agent activities are tracked and anomalies detected. |
| **NIST AI RMF** | MEASURE 4.1, MEASURE 4.2 | MEASURE 4.1 addresses feedback mechanisms for AI systems. MEASURE 4.2 covers trustworthy AI characteristics including transparency—supporting comprehensive audit trails. |
| **ISO 42001** | 9.1, 9.2, 8.6 | Clause 9.1 (Monitoring and measurement) establishes monitoring requirements. 9.2 (Internal audit) ensures audit capabilities. 8.6 covers performance monitoring for AI systems. |

---

### Indicator 4: Dynamic risk-based access control

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST AI RMF** | MANAGE 2.2, MANAGE 2.3, MEASURE 2.7, MEASURE 2.8 | MANAGE 2.x enables dynamic risk treatment. MEASURE 2.7 addresses security/resilience evaluation. MEASURE 2.8 covers ongoing monitoring—essential for dynamic access adjustments. |
| **NIST CSF 2.0** | PR.AC-04, DE.CM-01, DE.AE-02 | PR.AC-04 (Access permissions) combined with DE.CM-01 (Network monitoring) enables risk-based access decisions. DE.AE-02 (Adverse event correlation) informs dynamic risk assessment. |
| **ISO 42001** | 8.6, 9.1, 9.2 | Clause 8.6 (Performance and monitoring) and 9.1 (Measurement) provide data for risk-based decisions. 9.2 (Internal audit) validates dynamic control effectiveness. |
| **NIST SP 800-207** | Continuous Verification, Context-Aware Policies | Zero Trust Architecture explicitly requires continuous verification and context-aware access decisions—the foundation of dynamic risk-based access control for agents. |

---

## Domain: `malicious_agent_detection`

**Pillar:** Security from AI  
**Description:** Detection and response capabilities for rogue, compromised, or malicious AI agents

### Indicator 1: Malicious agent detection capabilities

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST AI RMF** | MEASURE 2.7, MEASURE 2.8, MEASURE 4.2, MANAGE 4.1 | MEASURE 2.7 addresses AI system security evaluation. MEASURE 2.8 covers ongoing monitoring for risks. MEASURE 4.2 addresses trustworthiness measurement. MANAGE 4.1 covers risk response actions. |
| **ISO 27001** | A.12.4.1, A.16.1.2, A.16.1.4, A.16.1.7 | A.12.4.1 (Event logging) captures agent activities. A.16.1.2 (Reporting security events), A.16.1.4 (Assessment of security events), and A.16.1.7 (Collection of evidence) support malicious agent detection and investigation. |
| **NIST CSF 2.0** | DE.CM-01, DE.CM-03, DE.AE-02, DE.AE-03, DE.AE-06 | DE.CM (Continuous Monitoring) addresses network and computing hardware monitoring. DE.AE (Adverse Event Analysis) covers correlation, impact analysis, and incident alerting thresholds. |
| **ISO 42001** | 8.6, 8.7, 9.1, 9.2 | Clauses 8.6-8.7 address AI system performance monitoring and operation. 9.1-9.2 cover measurement, analysis, and internal audit—enabling detection of anomalous agent behavior. |
| **SOC 2** | CC7.1, CC7.2, CC7.3 | CC7.1 (Detect security events), CC7.2 (Monitor system components), and CC7.3 (Evaluate security events) provide the detection foundation for identifying malicious agents. |

---

### Indicator 2: Agent behavioral analysis and threat scoring

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST AI RMF** | MEASURE 2.7, MEASURE 2.8, MEASURE 4.2 | MEASURE 2.7 (Security/resilience evaluation) and MEASURE 2.8 (Ongoing monitoring) enable behavioral baseline establishment. MEASURE 4.2 (Trustworthiness measurement) informs threat scoring. |
| **NIST CSF 2.0** | DE.CM-01, DE.CM-03, DE.AE-02, DE.AE-04 | DE.CM subcategories provide monitoring data for behavioral analysis. DE.AE-02 (Event correlation) and DE.AE-04 (Impact estimation) support threat scoring based on behavioral patterns. |
| **ISO 42001** | 8.6, 9.1, 9.2 | Clause 8.6 (Performance monitoring) enables behavioral baselining. 9.1 (Measurement) provides metrics for scoring. 9.2 (Internal audit) validates analysis accuracy. |
| **ISO 27001** | A.12.4.1, A.12.4.3 | A.12.4.1 (Event logging) provides behavioral data. A.12.4.3 (Administrator/operator logs) captures privileged agent activities for analysis. |

---

### Indicator 3: Coordinated attack detection

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST CSF 2.0** | DE.CM-01, DE.AE-02, DE.AE-04, DE.AE-06 | DE.CM-01 (Network monitoring) detects coordination patterns. DE.AE-02 (Event correlation) identifies multi-agent coordination. DE.AE-04 (Impact estimation) and DE.AE-06 (Alerting thresholds) enable coordinated attack identification. |
| **ISO 27001** | A.16.1.2, A.16.1.4, A.16.1.5 | A.16.1.2 (Reporting events), A.16.1.4 (Event assessment), and A.16.1.5 (Response to incidents) address coordinated incident handling and detection across multiple vectors. |
| **NIST AI RMF** | MEASURE 2.7, MANAGE 4.1 | MEASURE 2.7 addresses security resilience. MANAGE 4.1 covers incident response for AI systems—both essential for coordinated attack scenarios. |
| **SOC 2** | CC7.2, CC7.3, CC7.4 | CC7.2 (Monitor for anomalies), CC7.3 (Evaluate events), and CC7.4 (Respond to security incidents) address detection and response to coordinated attack patterns. |

---

### Indicator 4: Automated response and containment

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST AI RMF** | MANAGE 4.1, MANAGE 4.2, MANAGE 4.3 | MANAGE 4.x comprehensively addresses incident response: 4.1 (Incident response plans), 4.2 (Mechanisms for remediation), 4.3 (Post-deployment monitoring and response). |
| **NIST CSF 2.0** | RS.RP-01, RS.AN-01, RS.MI-01, RS.MI-02 | RS.RP (Response Planning) covers response execution. RS.AN (Analysis) addresses incident investigation. RS.MI (Mitigation) covers containment and eradication of threats. |
| **ISO 27001** | A.16.1.5, A.16.1.6, A.16.1.7 | A.16.1.5 (Response to incidents), A.16.1.6 (Learning from incidents), and A.16.1.7 (Evidence collection) provide complete response and containment capabilities. |
| **ISO 42001** | 8.7, 10.1, 10.2 | Clause 8.7 (AI system operation) includes incident handling. 10.1 (Continual improvement) and 10.2 (Nonconformity and corrective action) ensure response effectiveness. |
| **SOC 2** | CC7.3, CC7.4, CC7.5 | CC7.3 (Evaluate events), CC7.4 (Respond to incidents), and CC7.5 (Recover from incidents) address the full containment and recovery lifecycle. |

---

## Domain: `agent_to_agent_security`

**Pillar:** Security from AI  
**Description:** Security controls for communication, collaboration, and trust between autonomous AI agents

### Indicator 1: Secure agent communication protocols

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST AI RMF** | GOVERN 1.2, MANAGE 2.2, MAP 3.4 | GOVERN 1.2 establishes governance for AI system interfaces. MANAGE 2.2 covers operational security. MAP 3.4 addresses AI system dependencies and integrations. |
| **ISO 27001** | A.13.1.1, A.13.2.1, A.14.1.2, A.14.1.3 | A.13.1.1 (Network controls), A.13.2.1 (Information transfer policies), A.14.1.x (Secure development) ensure secure agent-to-agent communication channels. |
| **NIST CSF 2.0** | PR.DS-01, PR.DS-02, PR.AA-05 | PR.DS (Data Security) protects data in transit between agents. PR.AA-05 addresses access permissions for inter-system communication. |
| **NIST SP 800-207** | 3.1, 3.2, 5.1 | Zero Trust principles (3.1-3.2) and deployment models (5.1) apply directly to agent communication—no implicit trust between agents. |
| **ISO 42001** | 6.1.3, 8.4 | Clause 6.1.3 (Risk treatment) and 8.4 (AI system operation) address secure operation of communicating AI systems. |

---

### Indicator 2: Agent trust and authentication frameworks

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST AI RMF** | GOVERN 1.5, MAP 3.4, MANAGE 2.3 | GOVERN 1.5 (Third-party governance), MAP 3.4 (Dependencies), and MANAGE 2.3 (Operational procedures) establish trust requirements for agent interactions. |
| **ISO 27001** | A.9.2.1, A.9.4.2, A.9.4.3, A.15.1.2 | A.9.x controls (User access management, secure log-on, password management) apply to agent identity. A.15.1.2 (Supplier agreements) covers trust establishment with third-party agents. |
| **NIST CSF 2.0** | PR.AA-01, PR.AA-03, PR.AA-05 | PR.AA (Identity Management and Access Control) subcategories cover identity provisioning, authentication, and access permissions for agents. |
| **NIST SP 800-207** | 3.3, 4.1, 5.2 | Section 3.3 (Trust algorithm), 4.1 (Deployment models), and 5.2 (Trust evaluation) define how trust is computed and validated in zero-trust agent environments. |
| **ISO 42001** | 6.1.2, 8.4 | Clause 6.1.2 (Risk assessment) evaluates trust risks. 8.4 (Operation) includes operational trust controls. |
| **SOC 2** | CC6.1, CC6.2, CC6.3 | CC6.1 (Logical access security), CC6.2 (System access restrictions), CC6.3 (Access removal) manage agent authentication and trust lifecycle. |

---

### Indicator 3: Multi-agent attack surface management

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST AI RMF** | MAP 1.3, MAP 1.5, MEASURE 2.7 | MAP 1.3 (AI system context) and MAP 1.5 (Organizational risk context) identify attack surface. MEASURE 2.7 evaluates security posture of multi-agent systems. |
| **NIST CSF 2.0** | ID.AM-01, ID.AM-02, ID.RA-01, ID.RA-02 | ID.AM (Asset Management) inventories agents and their connections. ID.RA (Risk Assessment) identifies vulnerabilities across the multi-agent attack surface. |
| **ISO 27001** | A.8.1.1, A.8.1.2, A.12.6.1, A.18.1.3 | A.8.1.x (Asset inventory, ownership) tracks agents. A.12.6.1 (Technical vulnerability management) and A.18.1.3 (Protection of records) manage multi-agent vulnerabilities. |
| **ISO 42001** | 6.1.1, 6.1.2, 8.2 | Clauses 6.1.1-6.1.2 (Risk identification and assessment) and 8.2 (AI risk assessment) address attack surface identification and evaluation. |
| **NIST SP 800-207** | 4.2, 5.3 | Section 4.2 (Deployment variations) and 5.3 (Network-based) address attack surface in distributed zero-trust environments. |

---

### Indicator 4: Agent supply chain security

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST AI RMF** | GOVERN 1.2, MAP 3.4, GOVERN 6.1 | GOVERN 1.2 (Organizational policies) and GOVERN 6.1 (Third-party policies) establish supply chain governance. MAP 3.4 addresses dependencies on external agents. |
| **NIST SSDF** | PO.3.1, PO.3.2, PS.1.1, PS.2.1 | PO.3.x (Secure development environment) and PS.x (Protect software) address agent software supply chain integrity throughout the development lifecycle. |
| **ISO 27001** | A.15.1.1, A.15.1.2, A.15.2.1, A.15.2.2 | A.15.1.x (Supplier relationships policy, agreements) and A.15.2.x (Supplier service delivery management, change management) provide comprehensive supply chain controls. |
| **NIST CSF 2.0** | ID.SC-01, ID.SC-02, ID.SC-04 | ID.SC (Supply Chain Risk Management) covers supply chain risk management program, supplier assessment, and supplier monitoring. |
| **ISO 42001** | 8.4, 8.5 | Clauses 8.4-8.5 (Operation of AI system, third-party considerations) address operational security for third-party agent components. |
| **SOC 2** | CC9.2 | CC9.2 (Risk mitigation) addresses third-party and vendor risk management relevant to agent supply chains. |

---

## Domain: `ai_security_tools`

**Pillar:** AI for Security  
**Description:** Specialized tooling and capabilities for AI-specific security risks and vulnerabilities

> **Note:** Unlike governance/process domains, MITRE ATLAS and OWASP GenAI references are appropriate here because this domain focuses on *tools that detect and respond to* AI-specific attacks and vulnerabilities. The attack/vulnerability frameworks inform what the tools must address.

### Indicator 1: Coverage of AI-specific security vulnerabilities

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST AI RMF** | MEASURE 2.3, MEASURE 2.5, MEASURE 2.7 | MEASURE 2.3 (AI system testing), 2.5 (Trustworthiness evaluation), and 2.7 (Security assessment) define what tools must evaluate. |
| **ISO 27001** | A.12.6.1, A.14.2.1, A.14.2.8 | A.12.6.1 (Technical vulnerability management), A.14.2.1 (Secure development policy), A.14.2.8 (System security testing) guide tool requirements. |
| **ISO 42001** | 8.2.2, 8.6, 8.7 | AI-specific clauses for risk assessment (8.2.2), monitoring (8.6), and operation (8.7) inform vulnerability coverage scope. |
| **NIST CSF 2.0** | ID.RA-01, ID.RA-02, DE.CM-04 | ID.RA (Risk Assessment) identifies vulnerabilities. DE.CM-04 (Malicious code detection) addresses AI-specific malware/attacks. |
| **MITRE ATLAS** | AML.T0015, AML.T0043, AML.T0040 | Attack techniques (Model Evasion, Adversarial Data, Inference API Access) that tools must detect and prevent. |
| **OWASP GenAI** | LLM01:2025, LLM02:2025, LLM09:2025 | Vulnerabilities (Prompt Injection, Sensitive Information Disclosure, Misinformation) that tools must address. |

---

### Indicator 2: Integration with existing security infrastructure

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST CSF 2.0** | PR.PT-01, DE.CM-01, DE.CM-06 | PR.PT (Protective Technology) and DE.CM (Continuous Monitoring) define integration points for SIEM/SOAR. |
| **ISO 27001** | A.12.4.1, A.13.1.1, A.14.1.3 | A.12.4.1 (Event logging), A.13.1.1 (Network controls), A.14.1.3 (Application services security) address integration requirements. |
| **SOC 2** | CC6.1, CC6.6, CC6.8 | CC6.x (Logical access security) controls guide how AI tools integrate with access management and security infrastructure. |
| **ISO 42001** | 7.1.4, 8.1, 8.3 | AI management system integration requirements (7.1.4 Resources, 8.1 Planning, 8.3 Development). |
| **NIST AI RMF** | GOVERN 1.4, MANAGE 2.2 | GOVERN 1.4 (Organizational governance) and MANAGE 2.2 (Operational deployment) address integration governance. |

---

### Indicator 3: Specialized tooling for AI/ML workloads

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST AI RMF** | MANAGE 1.1, MANAGE 1.2, MEASURE 2.7 | MANAGE 1.x (Deployment decisions) and MEASURE 2.7 (Security evaluation) guide specialized tool requirements. |
| **ISO 27001** | A.14.2.1, A.14.2.5, A.14.2.8 | Secure development policy (A.14.2.1), system development procedures (A.14.2.5), and testing (A.14.2.8) for ML workloads. |
| **NIST CSF 2.0** | PR.DS-01, PR.DS-02, DE.CM-04 | Data security (PR.DS) and malicious code detection (DE.CM-04) for AI/ML-specific data and models. |
| **ISO 42001** | 7.1.4, 8.2, 8.3 | AI-specific resource requirements (7.1.4), risk treatment (8.2), and development (8.3). |
| **MITRE ATLAS** | AML.T0010, AML.T0012 | Supply Chain Compromise and Valid Accounts attacks that specialized tools must detect in ML environments. |
| **OWASP GenAI** | LLM03:2025, LLM05:2025 | Supply Chain Vulnerabilities and Improper Output Handling that specialized AI tools must address. |

---

### Indicator 4: Enterprise-wide deployment and adoption

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **ISO 27001** | A.12.1.2, A.14.1.1, A.18.2.2 | Change management (A.12.1.2), information security requirements (A.14.1.1), and compliance checking (A.18.2.2) for enterprise deployment. |
| **NIST CSF 2.0** | GV.OC-01, GV.RM-01, PR.IP-03 | Organizational context (GV.OC), risk management strategy (GV.RM), and configuration management (PR.IP) for enterprise rollout. |
| **SOC 2** | CC1.4, CC5.1, CC5.2 | CC1.4 (Board oversight), CC5.1-5.2 (Control activities) ensure enterprise-wide governance of security tools. |
| **ISO 42001** | 5.1, 7.1, 8.1 | Leadership commitment (5.1), resources (7.1), and operational planning (8.1) for enterprise AI tool deployment. |
| **NIST AI RMF** | GOVERN 1.1, GOVERN 1.4, GOVERN 4.1 | Organizational policies (1.1), governance integration (1.4), and culture (4.1) support enterprise adoption. |

---

### Indicator 5: Automation capabilities and threat response

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST CSF 2.0** | RS.RP-01, RS.AN-01, RS.MI-01, RS.MI-02 | Response Planning (RS.RP), Analysis (RS.AN), and Mitigation (RS.MI) define automated response requirements. |
| **ISO 27001** | A.16.1.4, A.16.1.5, A.16.1.6 | Event assessment (A.16.1.4), response (A.16.1.5), and learning from incidents (A.16.1.6) guide automation design. |
| **SOC 2** | CC7.2, CC7.3, CC7.4 | Monitor for anomalies (CC7.2), evaluate events (CC7.3), respond to incidents (CC7.4) for automated threat response. |
| **ISO 42001** | 8.5.2, 8.6, 10.2 | AI system changes (8.5.2), monitoring (8.6), and corrective action (10.2) enable automation frameworks. |
| **NIST AI RMF** | MANAGE 4.1, MANAGE 4.2 | Incident response (4.1) and remediation mechanisms (4.2) define automated response requirements. |

---

## Domain: `development_integration`

**Pillar:** Security for AI  
**Description:** Integration of AI security practices into software development lifecycles

### Indicator 1: AI security practices in software development lifecycle

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST SSDF** | PO.1.1, PO.1.2, PO.1.3, PS.1.1 | PO.1.x (Define security requirements) and PS.1.1 (Protect all software components) establish secure development foundations. |
| **ISO 27001** | A.14.1.1, A.14.2.1, A.14.2.5 | A.14.1.1 (Security requirements analysis), A.14.2.1 (Secure development policy), A.14.2.5 (Secure system engineering) define SDLC security requirements. |
| **NIST CSF 2.0** | PR.IP-02, PR.DS-06, DE.CM-04 | PR.IP-02 (Configuration management), PR.DS-06 (Integrity checking), DE.CM-04 (Malicious code detection) protect the development pipeline. |
| **ISO 42001** | 8.2, 8.3, 8.4 | Clauses 8.2-8.4 (AI risk assessment, risk treatment, operation) provide AI-specific SDLC guidance. |
| **NIST AI RMF** | MAP 1.1, MAP 1.2, GOVERN 1.3 | MAP 1.x (Context establishment) and GOVERN 1.3 (Processes) integrate AI risk considerations into development. |
| **SOC 2** | CC8.1, CC7.1 | CC8.1 (Change management) and CC7.1 (Detection of changes) ensure controlled development processes. |

---

### Indicator 2: CI/CD pipeline security integration

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST SSDF** | PS.2.1, PS.3.1, PW.4.1, PW.4.4 | PS.2-3 (Protect software), PW.4.x (Reuse existing secure software, verify third-party components) address pipeline security. |
| **ISO 27001** | A.14.2.2, A.14.2.6, A.14.2.9 | System change control (A.14.2.2), secure development environment (A.14.2.6), system acceptance testing (A.14.2.9) for CI/CD. |
| **NIST CSF 2.0** | PR.DS-06, PR.IP-02, DE.CM-04 | Integrity checking (PR.DS-06), configuration management (PR.IP-02), and malicious code detection (DE.CM-04) protect pipelines. |
| **ISO 42001** | 8.3, 8.4, 8.6 | AI risk treatment (8.3), operation (8.4), and monitoring (8.6) integrate into automated pipelines. |
| **OWASP SAMM** | ST1.1, ST2.2, ST3.1 | Security Testing practices (ST) provide CI/CD security testing maturity guidance. |
| **SOC 2** | CC8.1, CC7.1, CC7.2 | Change management (CC8.1), detection (CC7.1), and monitoring (CC7.2) for pipeline integrity. |

---

### Indicator 3: Developer training and awareness programs

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST SSDF** | PO.2.1, PO.2.2, PO.2.3 | PO.2.x (Implement roles and responsibilities) includes training requirements for secure software development. |
| **ISO 27001** | A.7.2.2, A.7.2.3 | A.7.2.2 (Information security awareness, education and training), A.7.2.3 (Disciplinary process) establish training frameworks. |
| **SOC 2** | CC1.4, CC1.5, CC2.2 | CC1.4 (Commitment to competence), CC1.5 (Accountability), CC2.2 (Internal communication) support training programs. |
| **ISO 42001** | 7.2, 7.3, 7.4 | Competence (7.2), awareness (7.3), and communication (7.4) requirements for AI system personnel. |
| **NIST AI RMF** | GOVERN 4.1, GOVERN 4.2 | GOVERN 4.x (Organizational culture) addresses AI-specific training and awareness. |
| **NIST CSF 2.0** | GV.AT-01, GV.AT-02 | Awareness and Training subcategories (GV.AT) define training program requirements. |

---

### Indicator 4: Security testing automation

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST SSDF** | PW.7.1, PW.7.2, PW.8.1, PW.8.2 | PW.7.x (Review and analyze code) and PW.8.x (Test executable code) define automated testing requirements. |
| **ISO 27001** | A.14.2.3, A.14.2.8, A.14.2.9 | Technical review (A.14.2.3), system security testing (A.14.2.8), and acceptance testing (A.14.2.9) for automation. |
| **OWASP SAMM** | ST2.1, ST3.1, ST3.2 | Security Testing (ST) maturity levels guide automated testing implementation. |
| **ISO 42001** | 8.2.2, 8.6, 8.7 | AI-specific risk assessment (8.2.2), monitoring (8.6), and operation (8.7) inform testing scope. |
| **NIST CSF 2.0** | DE.CM-04, DE.CM-09, PR.DS-06 | Malicious code detection (DE.CM-04), software execution monitoring (DE.CM-09), and integrity checking (PR.DS-06). |
| **NIST AI RMF** | MEASURE 2.3, MEASURE 2.5 | MEASURE 2.x (AI system evaluation) guides AI-specific testing requirements. |

---

### Indicator 5: Application-level AI security controls

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST AI RMF** | MANAGE 2.1, MANAGE 2.2, MANAGE 2.3 | MANAGE 2.x (Deployment, operational procedures) address runtime AI application security. |
| **ISO 27001** | A.14.1.2, A.14.1.3, A.14.2.5 | Application services security (A.14.1.2-1.3) and secure system engineering (A.14.2.5) for AI applications. |
| **ISO 42001** | 8.2.2, 8.5.2, 8.6 | AI risk assessment (8.2.2), changes to AI systems (8.5.2), and monitoring (8.6) for application controls. |
| **NIST CSF 2.0** | PR.DS-01, PR.DS-02, PR.AA-05 | Data-at-rest protection (PR.DS-01), data-in-transit (PR.DS-02), and access permissions (PR.AA-05) for AI applications. |
| **NIST SSDF** | PW.5.1, PW.6.1, PW.6.2 | Create source code (PW.5.1), configure software (PW.6.x) with security controls. |
| **SOC 2** | CC6.1, CC6.6, CC6.7 | Logical access security (CC6.1), security controls for system boundaries (CC6.6-6.7) for AI applications. |

---

## Domain: `asset_management`

**Pillar:** Security for AI  
**Description:** Inventory, tracking, and lifecycle management of AI models and data assets

### Indicator 1: Inventory completeness for AI models and training data

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST AI RMF** | GOVERN 1.4, MAP 1.3, MAP 1.5 | GOVERN 1.4 (Organizational AI governance) and MAP 1.x (Context and scope) establish inventory requirements for AI assets. |
| **ISO 27001** | A.8.1.1, A.8.1.2, A.8.1.3 | A.8.1.1 (Inventory of assets), A.8.1.2 (Ownership of assets), A.8.1.3 (Acceptable use of assets) provide core asset management controls. |
| **NIST CSF 2.0** | ID.AM-01, ID.AM-02, ID.AM-05 | ID.AM (Asset Management) covers inventories of hardware (AM-01), software/services (AM-02), and data priorities (AM-05). |
| **ISO 42001** | 7.5, 8.1, 8.2.1 | Documented information (7.5), operational planning (8.1), and AI risk assessment (8.2.1) require comprehensive asset inventory. |
| **SOC 2** | CC6.1, CC6.5 | CC6.1 (Logical access security) and CC6.5 (Asset disposal) require asset identification and tracking. |

---

### Indicator 2: Lineage tracking and dependency mapping

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST AI RMF** | MAP 1.4, MAP 3.4, MANAGE 1.3 | MAP 1.4 (Organizational risk priorities), MAP 3.4 (Dependencies/integrations), MANAGE 1.3 (Procedures for AI) address lineage and dependency tracking. |
| **ISO 27001** | A.8.2.1, A.8.2.3, A.15.1.2 | A.8.2.1 (Classification), A.8.2.3 (Handling of assets), A.15.1.2 (Supplier agreements) track asset relationships. |
| **NIST CSF 2.0** | ID.AM-03, ID.SC-04, PR.DS-06 | ID.AM-03 (Data flows), ID.SC-04 (Supplier monitoring), PR.DS-06 (Integrity checking) support lineage tracking. |
| **ISO 42001** | 7.5, 8.2.1, 8.2.2 | Documented information (7.5), AI risk assessment (8.2.1), and risk treatment (8.2.2) require lineage documentation. |
| **NIST SSDF** | PO.1.2, PS.3.1 | PO.1.2 (Security requirements), PS.3.1 (Archive and protect software) support software/model lineage. |

---

### Indicator 3: Performance monitoring and drift detection

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST AI RMF** | MEASURE 2.1, MEASURE 2.2, MEASURE 2.6 | MEASURE 2.x (Evaluation methods) defines performance measurement including drift detection (2.6 - Bias assessment over time). |
| **ISO 27001** | A.12.1.4, Clause 9.1, A.12.4.1 | A.12.1.4 (Separation of environments), Clause 9.1 (Monitoring/measurement), A.12.4.1 (Event logging) enable performance tracking. |
| **NIST CSF 2.0** | DE.CM-01, DE.CM-03, DE.AE-03 | DE.CM (Continuous Monitoring) for networks (01) and personnel (03). DE.AE-03 (Event correlation) detects drift patterns. |
| **ISO 42001** | 8.6, 9.1, 9.2 | Monitoring (8.6), measurement/analysis (9.1), and internal audit (9.2) support drift detection. |
| **SOC 2** | CC7.1, CC7.2 | CC7.1 (Detection of changes), CC7.2 (Monitor system components) enable performance monitoring. |

---

### Indicator 4: Version control and change management

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **ISO 27001** | A.12.1.2, A.14.2.2, A.14.2.4 | A.12.1.2 (Change management), A.14.2.2 (System change control), A.14.2.4 (Restrictions on changes) govern version control. |
| **NIST SSDF** | PO.1.2, PS.3.1, PS.3.2 | PO.1.2 (Security requirements), PS.3.x (Archive and protect software, maintain provenance) ensure version control. |
| **NIST CSF 2.0** | PR.IP-03, PR.DS-06, ID.AM-02 | PR.IP-03 (Configuration management), PR.DS-06 (Integrity checking), ID.AM-02 (Software inventory) support version management. |
| **ISO 42001** | 7.5, 8.4, 8.5.1 | Documented information control (7.5), operation (8.4), and management of changes (8.5.1) address AI versioning. |
| **COBIT** | BAI06.01, BAI06.02 | BAI06 (Manage Changes) addresses IT change management including AI/ML models. |
| **SOC 2** | CC8.1 | CC8.1 (Change management) controls changes to system components. |

---

### Indicator 5: Continuous monitoring capabilities

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST CSF 2.0** | DE.CM-01, DE.CM-03, DE.CM-07 | DE.CM subcategories cover network monitoring (01), personnel activity (03), and unauthorized entity monitoring (07). |
| **ISO 27001** | A.12.4.1, A.12.4.3, A.16.1.2 | A.12.4.1 (Event logging), A.12.4.3 (Administrator logs), A.16.1.2 (Reporting security events) enable continuous monitoring. |
| **SOC 2** | CC7.1, CC7.2, CC7.3 | CC7.1-7.3 (Detection procedures, monitoring, evaluation) provide monitoring foundation. |
| **ISO 42001** | 8.6, 9.1, 9.3 | Monitoring (8.6), measurement/analysis (9.1), and management review (9.3) ensure continuous oversight. |
| **NIST AI RMF** | MEASURE 4.1, MEASURE 4.2, MANAGE 4.1 | MEASURE 4.x (Feedback mechanisms) and MANAGE 4.1 (Risk response) enable continuous monitoring response. |

---

## Domain: `team_structure`

**Pillar:** Security for AI  
**Description:** Organizational structure and expertise for AI security management

### Indicator 1: Dedicated AI security personnel and expertise

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST AI RMF** | GOVERN 1.6, GOVERN 2.2, GOVERN 4.1 | GOVERN 1.6 (Accountability mechanisms), GOVERN 2.2 (Personnel competencies), GOVERN 4.1 (Organizational culture) establish staffing requirements. |
| **ISO 27001** | A.6.1.1, A.7.1.1, A.7.2.2 | A.6.1.1 (Information security roles), A.7.1.1 (Screening), A.7.2.2 (Awareness/training) define personnel security. |
| **NIST CSF 2.0** | GV.RR-01, GV.RR-02, PR.AT-01 | GV.RR (Roles and Responsibilities) and PR.AT (Awareness and Training) define organizational security structure. |
| **ISO 42001** | 5.3, 7.1, 7.2 | Organizational roles (5.3), resources (7.1), and competence (7.2) establish AI personnel requirements. |
| **SOC 2** | CC1.3, CC1.4 | CC1.3 (Establishes structure) and CC1.4 (Commitment to competence) ensure appropriate staffing. |

---

### Indicator 2: Cross-functional collaboration and integration

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **ISO 27001** | A.6.1.2, A.6.1.3, A.6.1.5 | A.6.1.2 (Segregation of duties), A.6.1.3 (Contact with authorities), A.6.1.5 (Project management) enable cross-functional work. |
| **NIST CSF 2.0** | GV.OC-01, GV.OC-03, GV.RR-01 | GV.OC (Organizational Context) and GV.RR (Roles/Responsibilities) address organizational integration. |
| **SOC 2** | CC1.1, CC1.2, CC1.3 | CC1.1 (COSO principles), CC1.2 (Board oversight), CC1.3 (Organizational structure) support cross-functional governance. |
| **ISO 42001** | 5.1, 5.3, 7.4 | Leadership (5.1), roles (5.3), and communication (7.4) enable AI security collaboration. |
| **NIST AI RMF** | GOVERN 2.1, GOVERN 2.2, GOVERN 3.1 | GOVERN 2.x (Roles/responsibilities) and GOVERN 3.1 (Processes) address collaboration requirements. |
| **COBIT** | APO01.01, APO01.02, EDM01.01 | APO01 (Manage IT Framework) and EDM01 (Governance Framework) provide IT governance structure. |

---

### Indicator 3: Clear roles, responsibilities, and deliverables

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **ISO 27001** | A.6.1.1, A.7.1.2, A.7.2.1 | A.6.1.1 (Roles and responsibilities), A.7.1.2 (Terms of employment), A.7.2.1 (Management responsibilities) define accountability. |
| **NIST CSF 2.0** | GV.RR-01, GV.RR-02, GV.RR-03 | GV.RR subcategories comprehensively address roles, responsibilities, and accountability. |
| **COBIT** | APO01.01, APO01.02, APO01.03 | APO01 (Manage IT Management Framework) defines roles and responsibilities. |
| **ISO 42001** | 5.3, 7.1, 8.1 | Organizational roles (5.3), resources (7.1), and operational planning (8.1) establish clear deliverables. |
| **NIST AI RMF** | GOVERN 1.1, GOVERN 1.6, GOVERN 2.2 | GOVERN 1.x (Policies/accountability) and GOVERN 2.2 (Competencies) define role clarity. |
| **SOC 2** | CC1.1, CC1.2 | CC1.1 (Control environment) and CC1.2 (Board oversight) establish accountability structures. |

---

### Indicator 4: Training and skill development programs

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **ISO 27001** | A.7.2.1, A.7.2.2, A.7.2.3 | A.7.2.1 (Management responsibilities), A.7.2.2 (Awareness/education/training), A.7.2.3 (Disciplinary process) establish training framework. |
| **NIST CSF 2.0** | PR.AT-01, PR.AT-02, GV.AT-01 | PR.AT (Awareness and Training) and GV.AT (Governance-Awareness/Training) define training requirements. |
| **SOC 2** | CC1.4, CC1.5, CC2.2 | CC1.4 (Commitment to competence), CC1.5 (Accountability), CC2.2 (Internal communication) support skill development. |
| **ISO 42001** | 7.2, 7.3, 7.4 | Competence (7.2), awareness (7.3), and communication (7.4) define AI-specific training. |
| **NIST AI RMF** | GOVERN 4.1, GOVERN 4.2 | GOVERN 4.x (Organizational culture, training, awareness) addresses AI-specific skill development. |
| **NIST SSDF** | PO.2.1, PO.2.2 | PO.2.x (Implement roles and responsibilities) includes secure development training. |

---

### Indicator 5: Organizational AI security culture

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST AI RMF** | GOVERN 4.1, GOVERN 4.2, GOVERN 6.1 | GOVERN 4.x (Culture/awareness) and GOVERN 6.1 (External stakeholder engagement) build security culture. |
| **ISO 27001** | A.7.2.1, Clause 7.2, Clause 7.3 | Management responsibilities (A.7.2.1), competence (7.2), and awareness (7.3) establish security culture foundation. |
| **NIST CSF 2.0** | GV.OC-01, GV.OC-04, PR.AT-02 | GV.OC (Organizational Context) and PR.AT (Training) shape organizational security culture. |
| **ISO 42001** | 5.1, 7.2, 7.4 | Leadership (5.1), competence (7.2), and communication (7.4) drive AI security culture. |
| **SOC 2** | CC1.1, CC1.4, CC1.5 | CC1.1 (Control environment), CC1.4 (Competence), CC1.5 (Accountability) establish cultural expectations. |

---

## Domain: `data_poisoning_protection`

**Pillar:** Security for AI  
**Description:** Detection and prevention of data poisoning attacks against AI training datasets

**Note:** This domain appropriately retains MITRE ATLAS and OWASP GenAI references because it focuses on detecting and preventing specific AI attacks (data poisoning, backdoors). These attack framework references inform what the detection capabilities must address.

### Indicator 1: Data poisoning detection and prevention

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST AI RMF** | MAP 3.4, MEASURE 2.3, MEASURE 2.7, MANAGE 2.3 | MAP 3.4 (AI risks), MEASURE 2.x (Testing/evaluation), MANAGE 2.3 (Risk response) address poisoning detection. |
| **ISO 42001** | 8.5, 8.7, 9.1 | Data management (8.5), AI system monitoring (8.7), and evaluation (9.1) support detection capabilities. |
| **NIST CSF 2.0** | DE.CM-01, DE.CM-03, DE.AE-02 | Continuous monitoring (DE.CM) and adverse event analysis (DE.AE) enable poisoning detection. |
| **ISO 27001** | A.12.2.1, A.14.1.2, A.14.1.3 | Malware controls (A.12.2.1) and security requirements (A.14.1.x) support data integrity. |
| **SOC 2** | CC7.1, CC7.2 | System monitoring (CC7.x) supports anomaly detection. |
| **MITRE ATLAS** | AML.T0018, AML.T0020 | Backdoor ML Model and Poison Training Data techniques inform detection requirements. |
| **OWASP GenAI** | LLM03:2025, LLM04:2025 | Supply Chain Vulnerabilities and Data/Model Poisoning define attack vectors to detect. |

---

### Indicator 2: Data source verification and trust

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST AI RMF** | MAP 3.4, GOVERN 1.2, GOVERN 1.4 | Risk identification (MAP 3.4) and governance (GOVERN 1.x) guide source verification. |
| **ISO 27001** | A.15.1.1, A.15.1.2, A.15.2.1 | Supplier security (A.15.x) addresses third-party data source trust. |
| **NIST SSDF** | PO.3.1, PO.3.2, PS.3.1 | Third-party component requirements (PO.3.x) and verification (PS.3.1) apply to data sources. |
| **NIST CSF 2.0** | ID.SC-01, ID.SC-02, ID.SC-04 | Supply chain risk management (ID.SC) governs data source trust. |
| **ISO 42001** | 8.2.1, 8.5 | Risk treatment (8.2.1) and data management (8.5) support source verification. |
| **SOC 2** | CC9.1, CC9.2 | Vendor management (CC9.x) addresses third-party data sources. |

---

### Indicator 3: Anomaly and outlier detection

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST AI RMF** | MEASURE 2.3, MEASURE 2.7, MEASURE 2.11 | Testing (2.3), evaluation (2.7), and red teaming (2.11) support anomaly detection. |
| **ISO 42001** | 8.5, 8.7, 9.1 | Data management (8.5), monitoring (8.7), and evaluation (9.1) enable outlier detection. |
| **NIST CSF 2.0** | DE.AE-02, DE.AE-03, DE.CM-01 | Adverse event analysis (DE.AE) and monitoring (DE.CM) support anomaly detection. |
| **ISO 27001** | A.12.4.1, A.12.6.1 | Event logging (A.12.4.1) and vulnerability management (A.12.6.1) support detection. |
| **SOC 2** | CC7.1, CC7.2 | System monitoring (CC7.x) supports anomaly identification. |

---

### Indicator 4: Provenance tracking and chain of custody

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST AI RMF** | MAP 3.4, MAP 1.5, MEASURE 3.1 | Risk mapping (MAP 3.x) and feedback (MEASURE 3.1) support provenance tracking. |
| **ISO 42001** | 7.3, 8.5, 8.2.1 | Documentation (7.3), data management (8.5), and risk treatment (8.2.1) address custody. |
| **NIST SSDF** | PO.1.2, PS.3.1 | Requirements (PO.1.2) and verification (PS.3.1) support data lineage. |
| **NIST CSF 2.0** | ID.AM-01, ID.AM-03, PR.DS-06 | Asset management (ID.AM) and integrity (PR.DS-06) govern provenance. |
| **ISO 27001** | A.8.1.1, A.8.1.2 | Asset inventory (A.8.1.x) supports data tracking. |

---

### Indicator 5: Poisoning attack testing and resilience

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST AI RMF** | MEASURE 2.11, MANAGE 4.1, MANAGE 4.2 | Adversarial testing (MEASURE 2.11) and incident management (MANAGE 4.x) address resilience. |
| **ISO 42001** | 8.7, 9.2 | System monitoring (8.7) and internal audit (9.2) support testing. |
| **NIST CSF 2.0** | DE.CM-08, ID.RA-01, RS.AN-02 | Vulnerability scans (DE.CM-08), risk assessment (ID.RA), and analysis (RS.AN) support testing. |
| **ISO 27001** | A.14.2.8, A.18.2.3 | System security testing (A.14.2.8) and compliance review (A.18.2.3) address resilience. |
| **MITRE ATLAS** | AML.T0018, AML.T0020 | Backdoor and poisoning techniques inform test scenarios. |

---

## Domain: `ai_red_teaming`

**Pillar:** Security for AI  
**Description:** Adversarial testing and security assessment of AI systems through red team exercises

**Note:** This domain appropriately retains MITRE ATLAS and OWASP GenAI references because red teaming explicitly tests FOR these attack techniques. The frameworks define what attacks the red team should simulate.

### Indicator 1: AI red team program and methodology

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST AI RMF** | MEASURE 2.11, MANAGE 4.1, GOVERN 1.5 | Adversarial testing (2.11), incident management (4.1), and continuous improvement (1.5) define red team programs. |
| **ISO 42001** | 8.7, 9.2, 8.4 | Monitoring (8.7), audit (9.2), and AI system development (8.4) support methodology. |
| **NIST CSF 2.0** | DE.CM-08, ID.RA-01, ID.RA-05 | Vulnerability scanning (DE.CM-08) and risk assessment (ID.RA) guide red team scope. |
| **ISO 27001** | A.14.2.8, A.18.2.3, A.12.6.1 | Security testing (A.14.2.8), compliance review (A.18.2.3), and vulnerability management (A.12.6.1). |
| **SOC 2** | CC4.1, CC4.2 | Monitoring (CC4.x) supports red team program. |
| **MITRE ATLAS** | AML.T0043, AML.T0051, AML.T0054 | Adversarial data, jailbreak, and prompt injection techniques define test scenarios. |
| **OWASP GenAI** | LLM01:2025, LLM04:2025 | Prompt Injection and Poisoning define LLM-specific attack tests. |

---

### Indicator 2: Adversarial testing for model robustness

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST AI RMF** | MEASURE 2.3, MEASURE 2.7, MEASURE 2.11 | Testing (2.3), evaluation (2.7), and adversarial testing (2.11) assess robustness. |
| **ISO 42001** | 8.7, 8.5 | Monitoring (8.7) and data management (8.5) support robustness testing. |
| **NIST CSF 2.0** | DE.CM-01, DE.CM-03, DE.AE-02 | Monitoring (DE.CM) and analysis (DE.AE) enable adversarial detection. |
| **ISO 27001** | A.14.2.8, A.12.6.1 | Security testing (A.14.2.8) and vulnerability management (A.12.6.1) support testing. |
| **SOC 2** | CC7.1 | Monitoring supports robustness evaluation. |
| **MITRE ATLAS** | AML.T0043, AML.T0015 | Adversarial data and evasion techniques define robustness tests. |
| **OWASP ASVS** | V14 | Configuration verification supports testing methodology. |

---

### Indicator 3: Prompt injection and jailbreak testing

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST AI RMF** | MEASURE 2.11, MANAGE 2.3, MEASURE 2.7 | Adversarial testing (2.11), risk response (2.3), and evaluation (2.7) guide prompt testing. |
| **ISO 42001** | 8.7, 8.6 | Monitoring (8.7) and operation (8.6) address LLM-specific testing. |
| **NIST CSF 2.0** | DE.CM-08, PR.DS-01 | Vulnerability scanning (DE.CM-08) and data protection (PR.DS) support testing. |
| **MITRE ATLAS** | AML.T0051, AML.T0054 | Jailbreak and prompt injection techniques define test scenarios. |
| **OWASP GenAI** | LLM01:2025, LLM07:2025 | Prompt Injection and System Prompt Leakage define LLM attack tests. |

---

### Indicator 4: Model extraction and inversion testing

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST AI RMF** | MEASURE 2.11, MAP 3.4, MANAGE 2.2 | Adversarial testing (2.11), risk mapping (3.4), and controls (2.2) address extraction risks. |
| **ISO 42001** | 8.7, 8.6 | Monitoring (8.7) and operation (8.6) support extraction testing. |
| **NIST CSF 2.0** | DE.CM-01, PR.DS-01, PR.DS-02 | Monitoring (DE.CM) and data protection (PR.DS) address extraction prevention. |
| **ISO 27001** | A.13.2.1, A.9.4.1 | Information transfer (A.13.2.1) and access control (A.9.4.1) prevent extraction. |
| **MITRE ATLAS** | AML.T0024, AML.T0044 | Exfiltration and model access techniques define test scenarios. |
| **OWASP GenAI** | LLM06:2025, LLM08:2025 | Excessive Agency and Vector Weaknesses inform extraction tests. |

---

### Indicator 5: Purple team collaboration and remediation

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST AI RMF** | MANAGE 4.1, MANAGE 4.2, GOVERN 6.2 | Incident management (4.x) and stakeholder engagement (6.2) support collaboration. |
| **ISO 27001** | A.16.1.4, A.16.1.5, A.16.1.6 | Incident assessment (A.16.1.4), response (A.16.1.5), and lessons learned (A.16.1.6). |
| **NIST CSF 2.0** | RS.IM-01, RS.IM-02, RS.AN-03 | Improvement (RS.IM) and analysis (RS.AN) support remediation. |
| **ISO 42001** | 9.2, 10.1, 10.2 | Internal audit (9.2) and improvement (10.x) drive remediation. |
| **SOC 2** | CC7.3, CC7.4, CC7.5 | Incident detection (CC7.3), response (CC7.4), and recovery (CC7.5) support collaboration. |

---

## Domain: `threat_detection_analysis`

**Pillar:** AI for Security  
**Description:** AI-powered threat detection, analysis, and hunting capabilities

**Note:** This domain appropriately retains MITRE ATLAS and OWASP GenAI references because AI-powered threat detection tools must identify and respond to these specific AI attack patterns. The attack frameworks inform what the detection systems must recognize.

### Indicator 1: AI-powered log analysis and anomaly detection capabilities

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST CSF 2.0** | DE.AE-02, DE.AE-03, DE.CM-01, DE.CM-09 | Adverse event analysis (DE.AE) and continuous monitoring (DE.CM) are core detection capabilities. |
| **ISO 27001** | A.12.4.1, A.12.4.3, A.16.1.2 | Event logging (A.12.4.x) and incident management (A.16.1.2) support AI-enhanced analysis. |
| **SOC 2** | CC7.1, CC7.2 | System monitoring (CC7.x) addresses anomaly detection. |
| **ISO 42001** | 8.6, 8.7, 9.1 | AI system operation (8.6), monitoring (8.7), and evaluation (9.1) guide AI-powered detection. |
| **NIST AI RMF** | MEASURE 2.3, MEASURE 2.7, MANAGE 4.1 | Testing (2.3), evaluation (2.7), and incident response (4.1) support detection systems. |
| **MITRE ATLAS** | AML.T0015, AML.T0043 | Evasion and adversarial data techniques inform what detection must identify. |
| **OWASP GenAI** | LLM01:2025, LLM04:2025 | Prompt Injection and Poisoning attacks inform detection requirements. |

---

### Indicator 2: Threat hunting automation and pattern recognition

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST CSF 2.0** | DE.AE-06, DE.AE-07, DE.CM-01 | Event correlation (DE.AE-06/07) and monitoring (DE.CM) enable threat hunting. |
| **ISO 27001** | A.16.1.4, A.16.1.7, A.12.4.1 | Incident assessment (A.16.1.x) and logging (A.12.4.1) support hunting. |
| **ISO 42001** | 8.3, 8.6, 8.7 | AI risk treatment (8.3), operation (8.6), and monitoring (8.7) guide automation. |
| **NIST AI RMF** | MEASURE 2.7, MANAGE 4.1, MANAGE 4.2 | Evaluation (2.7) and incident management (4.x) support threat hunting. |
| **SOC 2** | CC7.2, CC7.3 | Monitoring (CC7.2) and response (CC7.3) enable automated hunting. |
| **MITRE ATLAS** | AML.T0015, AML.T0043 | Attack techniques inform hunting patterns. |
| **MITRE ATT&CK** | TA0007, TA0008 | Discovery and Lateral Movement tactics guide threat hunting scope. |

---

### Indicator 3: Predictive threat intelligence and behavioral analysis

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST CSF 2.0** | DE.AE-02, DE.AE-08, ID.RA-03 | Event analysis (DE.AE) and threat intelligence (ID.RA-03) enable prediction. |
| **ISO 27001** | A.12.2.1, A.16.1.1, A.6.1.4 | Malware controls (A.12.2.1), incident management (A.16.1.1), and contact with authorities (A.6.1.4). |
| **ISO 42001** | 8.2.2, 8.6, 9.1 | Risk assessment (8.2.2), operation (8.6), and evaluation (9.1) support behavioral analysis. |
| **NIST AI RMF** | MEASURE 2.6, MEASURE 2.7, MANAGE 4.1 | Performance (2.6), evaluation (2.7), and incident response (4.1) guide prediction. |
| **SOC 2** | CC7.1, CC7.2 | Monitoring (CC7.x) supports behavioral analysis. |
| **MITRE ATT&CK** | T1071, T1078 | C2 and Valid Accounts techniques inform behavioral patterns. |

---

### Indicator 4: Real-time adaptive learning and model updating

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST CSF 2.0** | DE.CM-07, RS.IM-01, RS.IM-02 | Monitoring (DE.CM-07) and improvement (RS.IM) enable adaptive systems. |
| **ISO 27001** | A.12.6.1, Clause 10.1, Clause 10.2 | Vulnerability management (A.12.6.1) and continual improvement (10.x) support adaptation. |
| **SOC 2** | CC4.1, CC7.4 | Monitoring (CC4.1) and response (CC7.4) enable learning. |
| **ISO 42001** | 8.5.1, 9.3, 10.1 | AI system development (8.5.1), management review (9.3), and improvement (10.1). |
| **NIST AI RMF** | MEASURE 4.1, MEASURE 4.2, MANAGE 4.2 | Feedback (MEASURE 4.x) and improvement (MANAGE 4.2) drive adaptation. |

---

### Indicator 5: Integration with security infrastructure and workflows

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST CSF 2.0** | DE.CM-01, RS.CO-02, RS.CO-03 | Monitoring (DE.CM) and communication (RS.CO) enable integration. |
| **ISO 27001** | A.13.1.1, A.16.1.5, A.6.1.3 | Network security (A.13.1.1), response (A.16.1.5), and contacts (A.6.1.3) support workflows. |
| **SOC 2** | CC6.1, CC6.8, CC7.3 | Access (CC6.x) and response (CC7.3) enable infrastructure integration. |
| **ISO 42001** | 8.1, 8.3, 7.4 | Operational planning (8.1), risk treatment (8.3), and communication (7.4). |
| **NIST AI RMF** | GOVERN 1.4, MANAGE 2.2, MANAGE 4.1 | Processes (1.4), controls (2.2), and incident response (4.1) guide integration. |

---

## Domain: `training_data_privacy`

**Pillar:** Security for AI  
**Description:** Privacy-preserving techniques and controls for AI training data protection

### Indicator 1: Privacy-enhancing technologies for training data

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST AI RMF** | GOVERN 1.4, MAP 1.6, MEASURE 2.8, MEASURE 2.10 | GOVERN 1.4 (Risk management processes), MAP 1.6 (Privacy considerations), MEASURE 2.8/2.10 (Privacy assessments and monitoring) address PET governance. |
| **ISO 27001** | A.18.1.4, A.8.2.1, A.8.3.1, A.10.1.1 | A.18.1.4 (Privacy/PII protection), A.8.2.1 (Information classification), A.8.3.1 (Media handling), A.10.1.1 (Cryptography) support privacy controls. |
| **ISO 42001** | 6.2.1, 7.3, 8.5 | Risk assessment (6.2.1), documented information (7.3), and data management (8.5) for AI-specific privacy. |
| **NIST CSF 2.0** | PR.DS-01, PR.DS-02, PR.IP-01 | PR.DS-01/02 (Data-at-rest/transit protection), PR.IP-01 (Configuration management) enable PET deployment. |
| **ISO 27701** | 6.5.2.1, 6.5.2.4, 7.4.5 | PII processing controls (6.5.2.x) and privacy-specific safeguards (7.4.5) directly address PETs. |
| **SOC 2** | C1.1, C1.2, P6.1 | Confidentiality (C1.x) and Privacy (P6.1) criteria govern privacy technology implementation. |

---

### Indicator 2: Data minimization and purpose limitation

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **ISO 27701** | 6.3.2.1, 6.3.2.2, 6.3.3.2, 7.2.1 | Purpose limitation (6.3.2.x), collection limitation (6.3.3.2), and conditions for processing (7.2.1) are core privacy principles. |
| **ISO 42001** | 6.2.1, 7.3, 8.2.1 | Risk-based approach (6.2.1) and data management (8.2.1) support minimization for AI training. |
| **NIST AI RMF** | MAP 1.6, GOVERN 1.4, GOVERN 1.5 | MAP 1.6 (Privacy context), GOVERN 1.4/1.5 (Policies and continuous improvement) guide minimization practices. |
| **NIST CSF 2.0** | GV.RM-01, ID.AM-05, PR.DS-10 | GV.RM (Risk management), ID.AM-05 (Data flows), PR.DS-10 (Data retention) enforce minimization. |
| **SOC 2** | P3.1, P3.2, P4.1 | P3.x (Collection) and P4.1 (Use/retention) criteria define purpose limitation controls. |

---

### Indicator 3: Anonymization and synthetic data usage

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST AI RMF** | MAP 1.6, MEASURE 2.8, MANAGE 1.3 | Privacy considerations (MAP 1.6), assessments (MEASURE 2.8), and risk response (MANAGE 1.3) guide anonymization strategy. |
| **ISO 27001** | A.8.2.3, A.8.3.1, A.8.3.2 | Information handling (A.8.2.3) and media protection (A.8.3.x) apply to anonymized data handling. |
| **ISO 27701** | 7.4.2, 7.4.5, 7.4.8 | Accuracy (7.4.2), protection (7.4.5), and anonymization measures (7.4.8) directly address this indicator. |
| **ISO 42001** | 7.3, 8.5, 8.6 | Data management (8.5) and AI system operation (8.6) govern synthetic data practices. |
| **NIST CSF 2.0** | PR.DS-01, PR.DS-02 | Data protection controls enable secure anonymization and synthetic data generation. |

---

### Indicator 4: Consent management and data subject rights

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **ISO 27701** | 6.4.1, 6.5.1, 7.3.1, 7.3.2, 7.3.4 | Consent (6.4.1), individual rights (6.5.1, 7.3.x) comprehensively address data subject rights. |
| **ISO 27001** | A.18.1.4, A.18.1.1 | Privacy (A.18.1.4) and legal compliance (A.18.1.1) support consent requirements. |
| **NIST AI RMF** | GOVERN 1.4, GOVERN 6.1, MAP 1.6 | Policy governance (GOVERN 1.x) and stakeholder engagement (6.1) address consent frameworks. |
| **NIST CSF 2.0** | GV.PO-01, GV.OC-02, ID.AM-05 | GV.PO (Policy), GV.OC (Context), and ID.AM (Asset management) support rights management. |
| **SOC 2** | P1.1, P2.1, P5.1, P5.2 | P1 (Notice), P2 (Choice/consent), P5 (Access) criteria directly govern consent and rights. |

---

### Indicator 5: Privacy-preserving model training

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST AI RMF** | MAP 1.6, MEASURE 2.8, MEASURE 2.10, MANAGE 2.2 | Privacy assessment (MAP 1.6, MEASURE 2.x) and implementation (MANAGE 2.2) guide training approaches. |
| **ISO 42001** | 7.3, 8.5, 8.6 | Documentation (7.3), data management (8.5), and system operation (8.6) define training governance. |
| **ISO 27701** | 6.5.2.1, 7.4.5 | Processing safeguards (6.5.2.1) and protection measures (7.4.5) apply to model training. |
| **NIST CSF 2.0** | PR.DS-01, PR.DS-02, PR.IP-01 | Data protection (PR.DS) and configuration (PR.IP) enable privacy-preserving techniques. |
| **SOC 2** | CC6.1, CC6.7, P6.1 | Logical access (CC6.1/6.7) and privacy use (P6.1) govern training environment security. |

---

## Domain: `training_data_security`

**Pillar:** Security for AI  
**Description:** Security controls and protection mechanisms for AI training data throughout its lifecycle

### Indicator 1: Training data classification and access controls

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST AI RMF** | GOVERN 1.2, GOVERN 1.4, MAP 5.1 | GOVERN 1.x (Policies/processes) and MAP 5.1 (Impact characterization) guide classification. |
| **ISO 27001** | A.8.2.1, A.8.2.2, A.9.2.1, A.9.4.1 | Classification (A.8.2.x) and access control (A.9.x) directly address this indicator. |
| **ISO 42001** | 7.3, 8.2.1, 8.5 | Documentation (7.3), risk treatment (8.2.1), and data management (8.5) define classification. |
| **NIST CSF 2.0** | PR.AA-01, PR.AA-05, PR.DS-01, ID.AM-01 | PR.AA (Access Administration) and ID.AM (Asset Management) govern classification and access. |
| **SOC 2** | CC6.1, CC6.2, CC6.3 | Logical access (CC6.x) criteria define access control requirements. |

---

### Indicator 2: Data encryption and secure storage

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **ISO 27001** | A.10.1.1, A.10.1.2, A.8.3.1 | Cryptographic controls (A.10.1.x) and media handling (A.8.3.1) address encryption. |
| **NIST CSF 2.0** | PR.DS-01, PR.DS-02 | PR.DS-01 (Data-at-rest) and PR.DS-02 (Data-in-transit) define encryption requirements. |
| **SOC 2** | CC6.1, CC6.6, CC6.7 | Logical access (CC6.1), encryption (CC6.6), and transmission (CC6.7) govern data protection. |
| **NIST AI RMF** | GOVERN 1.4, MANAGE 2.2 | Risk processes (GOVERN 1.4) and controls implementation (MANAGE 2.2) guide encryption strategy. |
| **ISO 42001** | 8.5, 8.6 | Data management (8.5) and system operation (8.6) address secure storage. |

---

### Indicator 3: Data lineage and provenance tracking

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST AI RMF** | MAP 3.4, MAP 1.5, MEASURE 3.1 | MAP 3.4 (Data dependencies), MAP 1.5 (Organizational context), MEASURE 3.1 (Traceability) address lineage. |
| **ISO 42001** | 7.3, 8.5, 8.2.1 | Documentation (7.3), data management (8.5), and risk treatment (8.2.1) support provenance. |
| **NIST SSDF** | PO.1.2, PS.3.1 | Software requirements (PO.1.2) and verification (PS.3.1) support data traceability. |
| **ISO 27001** | A.8.1.1, A.8.1.2, A.12.1.2 | Asset inventory (A.8.1.x) and change management (A.12.1.2) track data lineage. |
| **NIST CSF 2.0** | ID.AM-01, ID.AM-03, PR.DS-06 | Asset management (ID.AM) and integrity (PR.DS-06) support provenance tracking. |

---

### Indicator 4: Training data integrity verification

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST AI RMF** | MEASURE 2.3, MEASURE 3.1, MANAGE 2.3 | MEASURE 2.3 (Testing), MEASURE 3.1 (Feedback), MANAGE 2.3 (Risk response) address integrity. |
| **ISO 27001** | A.12.2.1, A.14.1.2, A.14.1.3 | Malware controls (A.12.2.1) and security requirements (A.14.1.x) ensure integrity. |
| **ISO 42001** | 8.5, 8.7 | Data management (8.5) and monitoring (8.7) support integrity verification. |
| **NIST CSF 2.0** | PR.DS-06, DE.CM-09 | Integrity checking (PR.DS-06) and monitoring (DE.CM-09) verify data integrity. |
| **SOC 2** | CC7.1, CC7.2 | System monitoring (CC7.x) criteria support integrity verification. |

---

### Indicator 5: Exfiltration prevention and monitoring

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **ISO 27001** | A.12.4.1, A.12.4.3, A.13.2.1 | Event logging (A.12.4.x) and information transfer (A.13.2.1) prevent exfiltration. |
| **NIST CSF 2.0** | DE.CM-01, DE.CM-03, PR.DS-05 | Monitoring (DE.CM) and data leak prevention (PR.DS-05) address exfiltration. |
| **SOC 2** | CC6.6, CC6.7, CC7.2 | Encryption (CC6.6), transmission (CC6.7), and monitoring (CC7.2) prevent data loss. |
| **NIST AI RMF** | MANAGE 2.2, MANAGE 4.1 | Controls implementation (MANAGE 2.2) and incident response (MANAGE 4.1) address threats. |
| **ISO 42001** | 8.6, 9.1 | System operation (8.6) and performance evaluation (9.1) support monitoring. |

---

## Domain: `incident_response`

**Pillar:** AI for Security  
**Description:** AI-enhanced incident response and automation capabilities

**Note:** This domain appropriately retains MITRE ATLAS and OWASP GenAI references because AI-powered incident response must detect, triage, and respond to these specific AI attack patterns.

### Indicator 1: AI-assisted incident triage and classification capabilities

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST CSF 2.0** | RS.AN-03, RS.AN-06, RS.AN-07 | RS.AN (Response Analysis) subcategories address incident analysis, understanding, and forensics. |
| **ISO 27001** | A.16.1.2, A.16.1.4, A.16.1.5 | Incident reporting (A.16.1.2), assessment (A.16.1.4), and response (A.16.1.5). |
| **ISO 42001** | 8.6, 8.7, 10.2 | AI system operation (8.6), monitoring (8.7), and nonconformity handling (10.2). |
| **NIST AI RMF** | MANAGE 4.1, MANAGE 4.2, GOVERN 6.2 | Incident response (MANAGE 4.x) and stakeholder communication (GOVERN 6.2). |
| **SOC 2** | CC7.3, CC7.4 | Incident detection (CC7.3) and response (CC7.4) criteria. |
| **MITRE ATLAS** | AML.T0048, AML.T0024 | Exfiltration techniques inform AI incident classification. |
| **OWASP GenAI** | LLM02:2025, LLM06:2025 | Information Disclosure and Excessive Agency attacks require triage. |

---

### Indicator 2: Automated workflow orchestration and response coordination

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST CSF 2.0** | RS.RP-01, RS.CO-02, RS.CO-03 | Response planning (RS.RP) and communication/coordination (RS.CO). |
| **ISO 27001** | A.16.1.5, A.16.1.6, A.6.1.3 | Response (A.16.1.5), lessons learned (A.16.1.6), and authority contacts (A.6.1.3). |
| **SOC 2** | CC7.3, CC7.4, CC7.5 | Detection (CC7.3), response (CC7.4), and recovery (CC7.5) support orchestration. |
| **ISO 42001** | 8.3, 8.5.2, 8.1 | Risk treatment (8.3), AI development (8.5.2), and planning (8.1). |
| **NIST AI RMF** | MANAGE 4.1, MANAGE 4.2, GOVERN 6.2 | Incident response (MANAGE 4.x) and communication (GOVERN 6.2). |

---

### Indicator 3: AI-powered root cause analysis and evidence correlation

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST CSF 2.0** | RS.AN-03, RS.AN-06, RS.AN-08 | Forensic analysis (RS.AN-03), incident understanding (RS.AN-06), and correlation (RS.AN-08). |
| **ISO 27001** | A.16.1.7, A.16.1.4, A.12.4.1 | Evidence collection (A.16.1.7), assessment (A.16.1.4), and logging (A.12.4.1). |
| **ISO 42001** | 8.6, 8.7, 9.2 | Operation (8.6), monitoring (8.7), and internal audit (9.2) for analysis. |
| **NIST AI RMF** | MANAGE 4.1, MEASURE 4.1, MEASURE 4.2 | Incident response (MANAGE 4.1) and feedback mechanisms (MEASURE 4.x). |
| **SOC 2** | CC7.4, CC7.5 | Response (CC7.4) and recovery (CC7.5) include root cause analysis. |

---

### Indicator 4: Autonomous decision-making and remediation actions

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST CSF 2.0** | RS.MI-01, RS.MI-02, RC.RP-01 | Mitigation (RS.MI) and recovery planning (RC.RP) address remediation. |
| **ISO 27001** | A.16.1.5, A.12.2.1, A.12.6.1 | Response (A.16.1.5), malware controls (A.12.2.1), and vulnerability management (A.12.6.1). |
| **SOC 2** | CC7.2, CC7.4, CC7.5 | Monitoring (CC7.2), response (CC7.4), and recovery (CC7.5). |
| **ISO 42001** | 8.5.2, 8.1, 5.2 | AI development (8.5.2), planning (8.1), and policy (5.2). |
| **NIST AI RMF** | MANAGE 2.2, MANAGE 4.1, MANAGE 4.2 | Controls (MANAGE 2.2) and incident response (MANAGE 4.x). |

---

### Indicator 5: Continuous learning from incident patterns and outcomes

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST CSF 2.0** | RS.IM-01, RS.IM-02, ID.IM-01 | Response improvement (RS.IM) and identification improvement (ID.IM). |
| **ISO 27001** | A.16.1.6, Clause 10.1, Clause 10.2 | Lessons learned (A.16.1.6) and continual improvement (10.x). |
| **ISO 42001** | 9.3, 10.1, 8.5.1 | Management review (9.3), improvement (10.1), and development (8.5.1). |
| **NIST AI RMF** | MEASURE 4.1, MEASURE 4.2, MANAGE 4.2 | Feedback (MEASURE 4.x) and improvement (MANAGE 4.2). |
| **SOC 2** | CC4.1, CC4.2 | Monitoring (CC4.1) and evaluation (CC4.2) enable learning. |

---

## Domain: `vulnerability_management`

**Pillar:** AI for Security  
**Description:** AI-driven vulnerability assessment, prioritization, and management

**Note:** This domain appropriately retains MITRE ATLAS and OWASP GenAI references because AI-powered vulnerability management must identify and prioritize these specific AI vulnerabilities.

### Indicator 1: AI-enhanced vulnerability prioritization and risk scoring

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST CSF 2.0** | ID.RA-01, ID.RA-02, ID.RA-05 | Risk assessment (ID.RA) subcategories address vulnerability identification and prioritization. |
| **ISO 27001** | A.12.6.1, A.18.2.2, A.18.2.3 | Vulnerability management (A.12.6.1) and compliance review (A.18.2.x). |
| **ISO 42001** | 8.6, 8.7, 6.1 | Operation (8.6), monitoring (8.7), and risk actions (6.1). |
| **NIST AI RMF** | MEASURE 2.3, MEASURE 2.7, MANAGE 2.3 | Testing (MEASURE 2.3), evaluation (MEASURE 2.7), and response (MANAGE 2.3). |
| **SOC 2** | CC4.1, CC4.2, CC7.1 | Monitoring (CC4.x) and system monitoring (CC7.1). |
| **MITRE ATLAS** | AML.T0010, AML.T0043 | Supply chain and adversarial data vulnerabilities to prioritize. |
| **OWASP GenAI** | LLM03:2025, LLM04:2025 | Supply chain and poisoning vulnerabilities inform prioritization. |

---

### Indicator 2: Automated vulnerability assessment and discovery capabilities

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST CSF 2.0** | DE.CM-08, ID.AM-07, ID.AM-08 | Vulnerability scans (DE.CM-08) and asset discovery (ID.AM). |
| **ISO 27001** | A.12.6.1, A.14.2.1, A.14.2.8 | Vulnerability management (A.12.6.1) and security testing (A.14.2.x). |
| **ISO 42001** | 8.2.2, 8.6, 8.3 | Risk assessment (8.2.2), operation (8.6), and treatment (8.3). |
| **NIST AI RMF** | MEASURE 2.3, MEASURE 2.11, MAP 1.5 | Testing (MEASURE 2.3), adversarial testing (MEASURE 2.11), and context (MAP 1.5). |
| **SOC 2** | CC7.1, CC4.1 | System monitoring (CC7.1) and continuous monitoring (CC4.1). |
| **OWASP ASVS** | V1.14, V14.1 | Configuration verification supports discovery. |

---

### Indicator 3: Predictive vulnerability identification and threat modeling

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST CSF 2.0** | ID.RA-03, ID.RA-04, ID.RA-05 | Threat identification (ID.RA-03), impact analysis (ID.RA-04), and risk determination (ID.RA-05). |
| **ISO 27001** | A.14.2.1, A.12.6.1, A.6.1.4 | Security requirements (A.14.2.1), vulnerability management (A.12.6.1), and authority contacts (A.6.1.4). |
| **ISO 42001** | 6.1, 8.2.2, 8.6 | Risk actions (6.1), assessment (8.2.2), and operation (8.6). |
| **NIST AI RMF** | MAP 3.4, MEASURE 2.7, MEASURE 2.11 | Risk mapping (MAP 3.4), evaluation (MEASURE 2.7), and adversarial testing (MEASURE 2.11). |
| **SOC 2** | CC3.1, CC3.2 | Risk identification (CC3.x) supports prediction. |

---

### Indicator 4: Threat intelligence integration and dynamic risk analysis

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST CSF 2.0** | ID.RA-03, ID.RA-02, DE.CM-08 | Threat identification (ID.RA-03), risk assessment (ID.RA-02), and vulnerability scans (DE.CM-08). |
| **ISO 27001** | A.12.2.1, A.16.1.3, A.6.1.4 | Malware controls (A.12.2.1), incident trending (A.16.1.3), and authorities (A.6.1.4). |
| **ISO 42001** | 8.6, 8.7, 9.1 | Operation (8.6), monitoring (8.7), and evaluation (9.1). |
| **NIST AI RMF** | MANAGE 4.1, MEASURE 2.7, GOVERN 6.1 | Incident response (MANAGE 4.1), evaluation (MEASURE 2.7), and stakeholders (GOVERN 6.1). |
| **SOC 2** | CC7.1, CC7.2 | System monitoring (CC7.x) enables threat integration. |

---

### Indicator 5: Automated patch management and verification processes

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST CSF 2.0** | PR.PS-01, PR.PS-02, DE.CM-08 | Platform security (PR.PS) and vulnerability scanning (DE.CM-08). |
| **ISO 27001** | A.12.6.1, A.14.2.3, A.12.1.2 | Vulnerability management (A.12.6.1), acceptance testing (A.14.2.3), and change management (A.12.1.2). |
| **SOC 2** | CC6.1, CC8.1 | Logical access (CC6.1) and change management (CC8.1). |
| **ISO 42001** | 8.5.2, 8.6, 9.2 | AI development (8.5.2), operation (8.6), and audit (9.2). |
| **NIST AI RMF** | MANAGE 2.2, MANAGE 4.1, GOVERN 1.5 | Controls (MANAGE 2.2), response (MANAGE 4.1), and improvement (GOVERN 1.5). |

---

## Domain: `identity_access_management`

**Pillar:** AI for Security  
**Description:** AI-enhanced identity governance and access control systems

**Note:** This domain appropriately retains MITRE ATLAS and OWASP GenAI references because AI-powered IAM must detect and prevent these specific AI-related access threats.

### Indicator 1: AI-powered user behavior analytics and anomaly detection

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST CSF 2.0** | DE.AE-02, DE.AE-03, DE.CM-01 | Adverse event analysis (DE.AE) and continuous monitoring (DE.CM) enable UBA. |
| **ISO 27001** | A.9.2.5, A.12.4.1, A.12.4.3 | Access review (A.9.2.5) and logging (A.12.4.x) support behavioral analysis. |
| **ISO 42001** | 8.6, 8.7, 9.1 | Operation (8.6), monitoring (8.7), and evaluation (9.1). |
| **NIST AI RMF** | MEASURE 2.3, MEASURE 2.7, MANAGE 4.1 | Testing (MEASURE 2.3), evaluation (MEASURE 2.7), and response (MANAGE 4.1). |
| **SOC 2** | CC6.1, CC6.2, CC7.2 | Access controls (CC6.x) and monitoring (CC7.2). |
| **NIST SP 800-207** | 3.1, 3.2, 4.2 | Zero trust architecture principles for continuous verification. |
| **MITRE ATLAS** | AML.T0044, AML.T0048 | Model access and exfiltration threats inform behavior analytics. |
| **OWASP GenAI** | LLM06:2025, LLM02:2025 | Excessive Agency and Information Disclosure threats to detect. |

---

### Indicator 2: Adaptive authentication with risk-based access decisions

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST CSF 2.0** | PR.AA-01, PR.AA-03, PR.AA-05 | Identity management (PR.AA-01), authentication (PR.AA-03), and access permissions (PR.AA-05). |
| **ISO 27001** | A.9.1.2, A.9.4.2, A.9.4.3 | Access policy (A.9.1.2) and authentication procedures (A.9.4.x). |
| **ISO 42001** | 8.5.2, 8.2.2, 8.6 | AI development (8.5.2), risk assessment (8.2.2), and operation (8.6). |
| **NIST AI RMF** | MANAGE 2.2, MEASURE 2.7, GOVERN 1.4 | Controls (MANAGE 2.2), evaluation (MEASURE 2.7), and processes (GOVERN 1.4). |
| **SOC 2** | CC6.1, CC6.2, CC6.3 | Logical access (CC6.x) governs authentication. |
| **NIST SP 800-207** | 3.1, 4.2, 5.1 | Zero trust identity verification principles. |

---

### Indicator 3: Zero-trust architecture with continuous access validation

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST SP 800-207** | 3.1, 3.2, 4.2, 5.1 | Core zero trust tenets and deployment models. |
| **NIST CSF 2.0** | PR.AA-05, PR.AA-06, DE.CM-01 | Access permissions (PR.AA-05/06) and monitoring (DE.CM-01). |
| **ISO 27001** | A.9.1.2, A.13.1.1, A.13.1.3 | Access policy (A.9.1.2) and network controls (A.13.1.x). |
| **ISO 42001** | 8.1, 8.5.2, 8.6 | Planning (8.1), development (8.5.2), and operation (8.6). |
| **NIST AI RMF** | GOVERN 1.4, MANAGE 2.2, MEASURE 2.7 | Processes (GOVERN 1.4), controls (MANAGE 2.2), and evaluation (MEASURE 2.7). |
| **SOC 2** | CC6.1, CC6.6, CC6.7 | Logical access (CC6.1), encryption (CC6.6), and transmission (CC6.7). |

---

### Indicator 4: Automated access governance and entitlement management

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **ISO 27001** | A.9.2.1, A.9.2.5, A.9.2.6 | User registration (A.9.2.1), access review (A.9.2.5), and removal (A.9.2.6). |
| **NIST CSF 2.0** | PR.AA-01, PR.AA-02, ID.AM-06 | Identity management (PR.AA-01/02) and roles (ID.AM-06). |
| **SOC 2** | CC6.2, CC6.3, CC6.5 | Access provisioning (CC6.2), removal (CC6.3), and review (CC6.5). |
| **ISO 42001** | 8.1, 8.3, 7.4 | Planning (8.1), risk treatment (8.3), and communication (7.4). |
| **NIST AI RMF** | GOVERN 2.1, GOVERN 2.2, MANAGE 2.2 | Roles (GOVERN 2.x) and controls (MANAGE 2.2). |
| **COBIT** | DSS05.04, DSS05.05 | Identity and access management processes. |

---

### Indicator 5: Predictive identity threat prevention and response

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST CSF 2.0** | DE.AE-02, DE.AE-06, RS.AN-03 | Adverse event analysis (DE.AE) and incident analysis (RS.AN-03). |
| **ISO 27001** | A.16.1.2, A.9.2.5, A.12.4.1 | Incident reporting (A.16.1.2), access review (A.9.2.5), and logging (A.12.4.1). |
| **ISO 42001** | 8.6, 8.7, 10.2 | Operation (8.6), monitoring (8.7), and nonconformity (10.2). |
| **NIST AI RMF** | MANAGE 4.1, MEASURE 2.7, MEASURE 4.1 | Incident response (MANAGE 4.1) and feedback (MEASURE 4.x). |
| **SOC 2** | CC7.2, CC7.3 | Monitoring (CC7.2) and detection (CC7.3). |
| **MITRE ATT&CK** | T1078, T1534 | Valid Accounts and Internal Spearphishing techniques for identity threats. |

---

## Domain: `security_operations`

**Pillar:** AI for Security  
**Description:** AI-powered security operations center (SOC) capabilities

**Note:** This domain appropriately retains MITRE ATLAS and OWASP GenAI references because AI-powered SOC operations must detect and respond to these specific AI attack patterns.

### Indicator 1: AI-powered event correlation and alert prioritization

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST CSF 2.0** | DE.AE-02, DE.AE-03, DE.AE-06 | Adverse event analysis (DE.AE) for correlation and prioritization. |
| **ISO 27001** | A.12.4.1, A.16.1.2, A.16.1.4 | Event logging (A.12.4.1) and incident management (A.16.1.x). |
| **ISO 42001** | 8.6, 8.7, 9.1 | AI operation (8.6), monitoring (8.7), and evaluation (9.1). |
| **NIST AI RMF** | MEASURE 2.3, MEASURE 2.7, MANAGE 4.1 | Testing (MEASURE 2.3), evaluation (MEASURE 2.7), and incident response (MANAGE 4.1). |
| **SOC 2** | CC7.1, CC7.2, CC7.3 | System monitoring (CC7.x) covers SOC operations. |
| **MITRE ATLAS** | AML.T0015, AML.T0048 | Model evasion and exfiltration attacks to detect. |
| **OWASP GenAI** | LLM01:2025, LLM08:2025 | Prompt Injection and Embedding Weaknesses to monitor. |

---

### Indicator 2: Automated security workflow orchestration and SOAR integration

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST CSF 2.0** | RS.RP-01, RS.CO-02, RS.CO-03 | Response planning (RS.RP) and coordination (RS.CO). |
| **ISO 27001** | A.16.1.5, A.13.1.1, A.6.1.3 | Incident response (A.16.1.5), network security (A.13.1.1), and authority contacts (A.6.1.3). |
| **ISO 42001** | 8.3, 8.5.2, 8.1 | Risk treatment (8.3), AI development (8.5.2), and planning (8.1). |
| **NIST AI RMF** | MANAGE 4.1, MANAGE 4.2, GOVERN 6.2 | Incident response (MANAGE 4.x) and communication (GOVERN 6.2). |
| **SOC 2** | CC7.3, CC7.4, CC7.5 | Detection (CC7.3), response (CC7.4), and recovery (CC7.5). |

---

### Indicator 3: AI-driven security analytics and threat intelligence integration

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST CSF 2.0** | DE.CM-08, ID.RA-03, ID.RA-02 | Vulnerability scans (DE.CM-08) and risk assessment (ID.RA). |
| **ISO 27001** | A.12.2.1, A.16.1.3, A.6.1.4 | Malware controls (A.12.2.1), trending (A.16.1.3), and authorities (A.6.1.4). |
| **ISO 42001** | 8.6, 8.7, 9.1 | Operation (8.6), monitoring (8.7), and evaluation (9.1). |
| **NIST AI RMF** | MEASURE 2.6, MEASURE 2.7, MANAGE 4.1 | Bias testing (MEASURE 2.6), evaluation (MEASURE 2.7), and response (MANAGE 4.1). |
| **SOC 2** | CC7.1, CC7.2 | System monitoring (CC7.x) for threat intelligence. |
| **MITRE ATT&CK** | TA0001, TA0043 | Initial Access and Reconnaissance tactics for threat hunting. |

---

### Indicator 4: Automated incident classification and response recommendations

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST CSF 2.0** | RS.AN-03, RS.AN-06, RS.MI-01 | Incident analysis (RS.AN) and mitigation (RS.MI). |
| **ISO 27001** | A.16.1.4, A.16.1.5, A.16.1.7 | Assessment (A.16.1.4), response (A.16.1.5), and evidence (A.16.1.7). |
| **ISO 42001** | 8.6, 8.7, 10.2 | Operation (8.6), monitoring (8.7), and nonconformity (10.2). |
| **NIST AI RMF** | MANAGE 4.1, MANAGE 4.2, MEASURE 4.1 | Incident response (MANAGE 4.x) and feedback (MEASURE 4.1). |
| **SOC 2** | CC7.3, CC7.4 | Detection (CC7.3) and response (CC7.4). |

---

### Indicator 5: Continuous security monitoring with predictive capabilities

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST CSF 2.0** | DE.CM-01, DE.CM-09, ID.IM-01 | Continuous monitoring (DE.CM) and improvement (ID.IM). |
| **ISO 27001** | A.12.4.1, Clause 9.1, Clause 10.1 | Logging (A.12.4.1) and improvement (10.x). |
| **ISO 42001** | 9.1, 9.3, 10.1 | Evaluation (9.1), review (9.3), and improvement (10.1). |
| **NIST AI RMF** | MEASURE 4.1, MEASURE 4.2, MANAGE 4.2 | Feedback (MEASURE 4.x) and improvement (MANAGE 4.2). |
| **SOC 2** | CC7.1, CC4.1, CC4.2 | Monitoring (CC7.1) and evaluation (CC4.x). |

---

## Domain: `fraud_detection`

**Pillar:** AI for Security  
**Description:** AI-powered fraud detection and prevention systems

**Note:** This domain appropriately retains MITRE ATLAS and OWASP GenAI references because fraud detection systems must be resilient against adversarial attacks that attempt to evade detection.

### Indicator 1: AI-powered transaction analysis and anomaly detection

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST CSF 2.0** | DE.AE-02, DE.AE-03, DE.CM-01 | Adverse event analysis (DE.AE) and monitoring (DE.CM) for transaction analysis. |
| **ISO 27001** | A.12.4.1, A.16.1.2, A.16.1.4 | Event logging (A.12.4.1) and incident management (A.16.1.x). |
| **ISO 42001** | 8.6, 8.7, 9.1 | AI operation (8.6), monitoring (8.7), and evaluation (9.1). |
| **NIST AI RMF** | MEASURE 2.3, MEASURE 2.7, MANAGE 4.1 | Testing (MEASURE 2.3), evaluation (MEASURE 2.7), and incident response (MANAGE 4.1). |
| **SOC 2** | CC7.1, CC7.2, CC7.3 | System monitoring (CC7.x) for fraud detection. |
| **PCI DSS** | Req 11, Req 12.10 | Security testing (Req 11) and incident response (Req 12.10). |
| **MITRE ATLAS** | AML.T0015, AML.T0043, AML.T0031 | Model evasion, adversarial data, and integrity attacks targeting fraud models. |
| **OWASP GenAI** | LLM01:2025, LLM04:2025 | Prompt Injection and Model Poisoning attacks against fraud systems. |

---

### Indicator 2: Real-time fraud scoring and risk assessment

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST CSF 2.0** | ID.RA-01, ID.RA-02, DE.CM-01 | Risk assessment (ID.RA) and monitoring (DE.CM) for scoring. |
| **ISO 27001** | A.18.2.2, A.12.1.4, A.12.4.1 | Compliance review (A.18.2.2), capacity (A.12.1.4), and logging (A.12.4.1). |
| **ISO 42001** | 8.2.2, 8.6, 6.1 | Risk assessment (8.2.2), operation (8.6), and risk actions (6.1). |
| **NIST AI RMF** | MEASURE 2.3, MEASURE 2.7, MANAGE 2.3 | Testing (MEASURE 2.3), evaluation (MEASURE 2.7), and response (MANAGE 2.3). |
| **SOC 2** | CC7.1, CC4.1, CC3.2 | Monitoring (CC7.1), evaluation (CC4.1), and risk assessment (CC3.2). |

---

### Indicator 3: Behavioral pattern analysis and user profiling

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST CSF 2.0** | DE.AE-02, DE.AE-03, ID.AM-06 | Adverse event analysis (DE.AE) and asset roles (ID.AM-06). |
| **ISO 27001** | A.9.2.5, A.18.1.4, A.12.4.1 | Access review (A.9.2.5), privacy (A.18.1.4), and logging (A.12.4.1). |
| **ISO 42001** | 8.6, 8.7, 5.2 | Operation (8.6), monitoring (8.7), and policy (5.2). |
| **NIST AI RMF** | MEASURE 2.7, MAP 2.3, GOVERN 1.4 | Evaluation (MEASURE 2.7), context (MAP 2.3), and processes (GOVERN 1.4). |
| **SOC 2** | CC6.1, CC7.2 | Logical access (CC6.1) and monitoring (CC7.2). |
| **ISO 27701** | 7.4, 7.5 | Privacy controls for behavioral analysis. |

---

### Indicator 4: Machine learning model performance and accuracy tracking

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST CSF 2.0** | ID.IM-01, ID.IM-02, PR.PS-01 | Improvement (ID.IM) and platform security (PR.PS) for model tracking. |
| **ISO 27001** | Clause 9.1, A.12.1.4, Clause 10.1 | Performance evaluation (9.1), capacity (A.12.1.4), and improvement (10.1). |
| **ISO 42001** | 8.6, 9.1, 9.2 | Operation (8.6), evaluation (9.1), and audit (9.2). |
| **NIST AI RMF** | MEASURE 2.3, MEASURE 4.1, MEASURE 4.2 | Testing (MEASURE 2.3) and feedback (MEASURE 4.x). |
| **SOC 2** | CC4.1, CC4.2 | Monitoring (CC4.1) and evaluation (CC4.2). |

---

### Indicator 5: Integration with payment processing and financial systems

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST CSF 2.0** | PR.DS-01, PR.DS-02, ID.AM-05 | Data security (PR.DS) and asset management (ID.AM) for integration. |
| **ISO 27001** | A.13.1.1, A.14.1.3, A.14.1.2 | Network security (A.13.1.x) and application security (A.14.1.x). |
| **ISO 42001** | 8.1, 8.3, 7.4 | Planning (8.1), risk treatment (8.3), and communication (7.4). |
| **NIST AI RMF** | GOVERN 1.4, MANAGE 2.2, MAP 1.5 | Processes (GOVERN 1.4), controls (MANAGE 2.2), and context (MAP 1.5). |
| **SOC 2** | CC6.1, CC6.6, CC6.7 | Logical access (CC6.1), encryption (CC6.6), and transmission (CC6.7). |
| **PCI DSS** | Req 1, Req 6 | Network security (Req 1) and secure development (Req 6). |

---

### Indicator 6: Account takeover and credential abuse detection

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST CSF 2.0** | PR.AA-01, PR.AA-05, DE.CM-01 | Identity management (PR.AA) and monitoring (DE.CM) for ATO detection. |
| **ISO 27001** | A.9.4.3, A.12.4.1, A.9.2.5 | Authentication (A.9.4.3), logging (A.12.4.1), and access review (A.9.2.5). |
| **ISO 42001** | 8.6, 8.7 | AI operation (8.6) and monitoring (8.7). |
| **NIST AI RMF** | MEASURE 2.3, MEASURE 2.7, MANAGE 4.1 | Testing (MEASURE 2.3), evaluation (MEASURE 2.7), and response (MANAGE 4.1). |
| **SOC 2** | CC6.1, CC6.2, CC7.2 | Access controls (CC6.x) and monitoring (CC7.2). |
| **PCI DSS** | Req 8, Req 10 | Authentication (Req 8) and audit trails (Req 10). |

---

### Indicator 7: Anti-money laundering (AML) and suspicious activity detection

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST CSF 2.0** | DE.AE-02, DE.AE-06, RS.AN-03 | Adverse event analysis (DE.AE) and incident analysis (RS.AN) for AML. |
| **ISO 27001** | A.18.1.5, A.12.4.1, A.16.1.2 | Regulatory compliance (A.18.1.5), logging (A.12.4.1), and reporting (A.16.1.2). |
| **ISO 42001** | 8.6, 5.2 | AI operation (8.6) and policy (5.2). |
| **NIST AI RMF** | MEASURE 2.3, MEASURE 2.7, MANAGE 4.1 | Testing (MEASURE 2.3), evaluation (MEASURE 2.7), and response (MANAGE 4.1). |
| **SOC 2** | CC7.2, CC7.3 | Monitoring (CC7.2) and detection (CC7.3). |

---

## Domain: `ai_content_detection`

**Pillar:** Security from AI  
**Description:** Detection and verification of AI-generated content across multiple modalities

**Note:** This domain appropriately retains MITRE ATLAS and OWASP GenAI references because content detection systems must identify AI-generated content that may be used for misinformation or social engineering attacks.

### Indicator 1: Text-based AI content detection and verification capabilities

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST CSF 2.0** | DE.AE-02, DE.AE-03, PR.DS-06 | Adverse event analysis (DE.AE) and data integrity (PR.DS-06). |
| **ISO 27001** | A.13.2.1, A.16.1.2, A.18.1.4 | Information transfer (A.13.2.1), reporting (A.16.1.2), and privacy (A.18.1.4). |
| **ISO 42001** | 8.6, 8.7, 5.2 | AI operation (8.6), monitoring (8.7), and policy (5.2). |
| **NIST AI RMF** | MEASURE 2.3, MEASURE 2.7, GOVERN 4.2 | Testing (MEASURE 2.3), evaluation (MEASURE 2.7), and documentation (GOVERN 4.2). |
| **SOC 2** | CC7.1, CC7.2 | System monitoring (CC7.x). |
| **MITRE ATLAS** | AML.T0015, AML.T0043 | Model evasion and adversarial data craft detection evasion. |
| **OWASP GenAI** | LLM09:2025, LLM05:2025 | Misinformation and Output Handling attacks to detect. |

---

### Indicator 2: Multi-modal AI content detection (images, video, audio)

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST CSF 2.0** | DE.AE-02, DE.CM-01, PR.DS-06 | Event analysis (DE.AE-02), monitoring (DE.CM-01), and integrity (PR.DS-06). |
| **ISO 27001** | A.13.2.3, A.14.1.2, A.16.1.2 | Electronic messaging (A.13.2.3), analysis (A.14.1.2), and reporting (A.16.1.2). |
| **ISO 42001** | 8.2.2, 8.6, 8.7 | Risk assessment (8.2.2), operation (8.6), and monitoring (8.7). |
| **NIST AI RMF** | MEASURE 2.3, MEASURE 2.7, MEASURE 2.11 | Testing (MEASURE 2.3), evaluation (MEASURE 2.7), and adversarial testing (MEASURE 2.11). |
| **SOC 2** | CC7.1, CC7.2, CC7.3 | System monitoring (CC7.x) for detection. |

---

### Indicator 3: Integration with content management and publishing systems

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST CSF 2.0** | PR.PS-01, PR.PS-02, DE.CM-01 | Platform security (PR.PS) and monitoring (DE.CM) for integration. |
| **ISO 27001** | A.13.1.1, A.14.1.3, A.8.1.1 | Network security (A.13.1.1), application services (A.14.1.3), and asset inventory (A.8.1.1). |
| **ISO 42001** | 8.1, 8.3, 7.4 | Planning (8.1), risk treatment (8.3), and communication (7.4). |
| **NIST AI RMF** | GOVERN 1.4, MANAGE 2.2, MAP 1.5 | Processes (GOVERN 1.4), controls (MANAGE 2.2), and context (MAP 1.5). |
| **SOC 2** | CC6.1, CC8.1 | Logical access (CC6.1) and change management (CC8.1). |

---

### Indicator 4: Real-time content verification and authenticity scoring

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST CSF 2.0** | DE.CM-07, DE.CM-09, PR.DS-06 | Monitoring (DE.CM) and data integrity (PR.DS-06) for verification. |
| **ISO 27001** | A.12.4.1, A.16.1.2, A.18.2.2 | Logging (A.12.4.1), reporting (A.16.1.2), and compliance (A.18.2.2). |
| **ISO 42001** | 8.6, 9.1, 8.2.2 | Operation (8.6), evaluation (9.1), and risk assessment (8.2.2). |
| **NIST AI RMF** | MEASURE 2.3, MEASURE 2.7, MANAGE 4.1 | Testing (MEASURE 2.3), evaluation (MEASURE 2.7), and response (MANAGE 4.1). |
| **SOC 2** | CC7.1, CC4.1 | Monitoring (CC7.1) and evaluation (CC4.1). |

---

### Indicator 5: Policy enforcement and automated content flagging

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST CSF 2.0** | PR.AA-05, RS.MI-01, DE.AE-06 | Access permissions (PR.AA-05), mitigation (RS.MI-01), and event correlation (DE.AE-06). |
| **ISO 27001** | A.13.1.3, A.18.1.4, A.5.1.1 | Network controls (A.13.1.3), privacy (A.18.1.4), and policies (A.5.1.1). |
| **ISO 42001** | 8.5.2, 5.2, 8.1 | AI development (8.5.2), policy (5.2), and planning (8.1). |
| **NIST AI RMF** | GOVERN 4.2, MANAGE 2.2, MANAGE 4.1 | Documentation (GOVERN 4.2), controls (MANAGE 2.2), and response (MANAGE 4.1). |
| **SOC 2** | CC6.1, CC7.3, CC7.4 | Access (CC6.1), detection (CC7.3), and response (CC7.4). |

---

## Domain: `deepfake_defense`

**Pillar:** Security from AI  
**Description:** Protection against deepfake attacks and synthetic media manipulation

**Note:** This domain appropriately retains MITRE ATLAS and OWASP GenAI references because deepfake defense must detect AI-generated synthetic media used for fraud and social engineering.

### Indicator 1: Deepfake and synthetic media detection capabilities

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST CSF 2.0** | DE.AE-02, DE.AE-03, DE.CM-01 | Adverse event analysis (DE.AE) and monitoring (DE.CM) for detection. |
| **ISO 27001** | A.13.2.1, A.16.1.2, A.18.1.4 | Information transfer (A.13.2.1), reporting (A.16.1.2), and privacy (A.18.1.4). |
| **ISO 42001** | 8.6, 8.7, 9.1 | AI operation (8.6), monitoring (8.7), and evaluation (9.1). |
| **NIST AI RMF** | MEASURE 2.3, MEASURE 2.7, MEASURE 2.11 | Testing (MEASURE 2.3), evaluation (MEASURE 2.7), and adversarial testing (MEASURE 2.11). |
| **SOC 2** | CC7.1, CC7.2 | System monitoring (CC7.x). |
| **MITRE ATLAS** | AML.T0015, AML.T0043 | Model evasion and adversarial data attacks inform detection. |
| **OWASP GenAI** | LLM09:2025, LLM05:2025 | Misinformation and Output Handling vulnerabilities to detect. |

---

### Indicator 2: Real-time verification in communications and media

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST CSF 2.0** | DE.CM-01, DE.CM-07, DE.CM-09 | Continuous monitoring (DE.CM) for real-time verification. |
| **ISO 27001** | A.13.1.1, A.13.2.3, A.12.4.1 | Network security (A.13.1.1), messaging (A.13.2.3), and logging (A.12.4.1). |
| **ISO 42001** | 8.6, 8.7, 8.2.2 | Operation (8.6), monitoring (8.7), and risk assessment (8.2.2). |
| **NIST AI RMF** | MEASURE 2.3, MEASURE 2.7, MANAGE 4.1 | Testing (MEASURE 2.3), evaluation (MEASURE 2.7), and response (MANAGE 4.1). |
| **SOC 2** | CC7.1, CC7.2, CC7.3 | System monitoring (CC7.x) for verification. |

---

### Indicator 3: Advanced authentication and provenance tracking

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST CSF 2.0** | PR.AA-01, PR.AA-03, PR.DS-06 | Identity management (PR.AA) and data integrity (PR.DS-06). |
| **ISO 27001** | A.9.4.2, A.9.4.3, A.18.2.2 | Authentication (A.9.4.x) and compliance (A.18.2.2). |
| **ISO 42001** | 8.5.2, 8.6, 9.2 | AI development (8.5.2), operation (8.6), and audit (9.2). |
| **NIST AI RMF** | GOVERN 1.4, MANAGE 2.2, MEASURE 2.7 | Processes (GOVERN 1.4), controls (MANAGE 2.2), and evaluation (MEASURE 2.7). |
| **SOC 2** | CC6.1, CC6.2, CC6.3 | Logical access (CC6.x) for authentication. |
| **NIST SP 800-207** | 3.1, 4.2 | Zero trust authentication principles. |

---

### Indicator 4: Incident response and containment procedures

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST CSF 2.0** | RS.AN-03, RS.MI-01, RS.CO-02 | Incident analysis (RS.AN), mitigation (RS.MI), and coordination (RS.CO). |
| **ISO 27001** | A.16.1.4, A.16.1.5, A.16.1.7 | Assessment (A.16.1.4), response (A.16.1.5), and evidence (A.16.1.7). |
| **ISO 42001** | 8.6, 8.7, 10.2 | Operation (8.6), monitoring (8.7), and nonconformity (10.2). |
| **NIST AI RMF** | MANAGE 4.1, MANAGE 4.2, GOVERN 6.2 | Incident response (MANAGE 4.x) and communication (GOVERN 6.2). |
| **SOC 2** | CC7.3, CC7.4, CC7.5 | Detection (CC7.3), response (CC7.4), and recovery (CC7.5). |

---

### Indicator 5: Employee awareness and training programs

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST CSF 2.0** | PR.AT-01, PR.AT-02, GV.AT-01 | Awareness and training (PR.AT, GV.AT) for employees. |
| **ISO 27001** | A.7.2.2, A.7.2.1, A.6.1.1 | Security awareness (A.7.2.x) and responsibilities (A.6.1.1). |
| **ISO 42001** | 7.2, 7.3, 5.2 | Competence (7.2), awareness (7.3), and policy (5.2). |
| **NIST AI RMF** | GOVERN 4.1, GOVERN 4.2, MAP 1.6 | Culture (GOVERN 4.x) and stakeholder context (MAP 1.6). |
| **SOC 2** | CC1.4, CC2.2 | HR policies (CC1.4) and communication (CC2.2). |

---

## Domain: `ai_attack_defense`

**Pillar:** Security from AI  
**Description:** Defense against AI-enabled attacks and social engineering

**Note:** This domain appropriately retains MITRE ATLAS and OWASP GenAI references because it focuses on defending against AI-powered attacks.

### Indicator 1: AI-powered attack detection and pattern recognition

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST CSF 2.0** | DE.AE-02, DE.AE-03, DE.CM-01 | Adverse event analysis (DE.AE) and monitoring (DE.CM) for attack detection. |
| **ISO 27001** | A.12.2.1, A.16.1.2, A.12.4.1 | Malware controls (A.12.2.1), reporting (A.16.1.2), and logging (A.12.4.1). |
| **ISO 42001** | 8.6, 8.7, 9.1 | Operation (8.6), monitoring (8.7), and evaluation (9.1). |
| **NIST AI RMF** | MEASURE 2.3, MEASURE 2.7, MANAGE 4.1 | Testing (MEASURE 2.3), evaluation (MEASURE 2.7), and response (MANAGE 4.1). |
| **SOC 2** | CC7.1, CC7.2, CC7.3 | System monitoring (CC7.x) for detection. |
| **MITRE ATLAS** | AML.T0015, AML.T0043 | Model evasion and adversarial data attacks to detect. |
| **OWASP GenAI** | LLM01:2025, LLM04:2025 | Prompt Injection and Poisoning attacks to defend against. |

---

### Indicator 2: Proactive defense against AI-generated social engineering

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST CSF 2.0** | DE.CM-01, PR.AT-01, DE.AE-06 | Monitoring (DE.CM), training (PR.AT), and correlation (DE.AE-06). |
| **ISO 27001** | A.7.2.2, A.12.2.1, A.16.1.1 | Awareness (A.7.2.2), malware (A.12.2.1), and responsibilities (A.16.1.1). |
| **ISO 42001** | 7.2, 8.6, 8.7 | Competence (7.2), operation (8.6), and monitoring (8.7). |
| **NIST AI RMF** | GOVERN 4.1, MEASURE 2.7, MANAGE 4.1 | Culture (GOVERN 4.1), evaluation (MEASURE 2.7), and response (MANAGE 4.1). |
| **SOC 2** | CC1.4, CC7.2, CC7.3 | HR policies (CC1.4), monitoring (CC7.2), and detection (CC7.3). |

---

### Indicator 3: Employee training and awareness programs for AI threats

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST CSF 2.0** | PR.AT-01, PR.AT-02, GV.AT-01 | Awareness and training (PR.AT, GV.AT). |
| **ISO 27001** | A.7.2.2, A.7.2.1, A.6.1.1 | Security awareness (A.7.2.x) and responsibilities (A.6.1.1). |
| **ISO 42001** | 7.2, 7.3, 5.2 | Competence (7.2), awareness (7.3), and policy (5.2). |
| **NIST AI RMF** | GOVERN 4.1, GOVERN 4.2, MAP 1.6 | Culture (GOVERN 4.x) and context (MAP 1.6). |
| **SOC 2** | CC1.4, CC2.2 | HR policies (CC1.4) and communication (CC2.2). |

---

### Indicator 4: AI attack simulation and defense testing capabilities

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST CSF 2.0** | ID.RA-05, DE.CM-08, RS.IM-01 | Risk assessment (ID.RA-05), vulnerability scans (DE.CM-08), and improvement (RS.IM-01). |
| **ISO 27001** | A.14.2.8, A.12.6.1, A.18.2.3 | System testing (A.14.2.8), vulnerability management (A.12.6.1), and compliance (A.18.2.3). |
| **ISO 42001** | 8.2.2, 9.2, 10.1 | Risk assessment (8.2.2), audit (9.2), and improvement (10.1). |
| **NIST AI RMF** | MEASURE 2.11, MANAGE 4.1, GOVERN 1.5 | Adversarial testing (MEASURE 2.11), response (MANAGE 4.1), and improvement (GOVERN 1.5). |
| **SOC 2** | CC4.1, CC4.2, CC7.1 | Monitoring (CC4.x) and system monitoring (CC7.1). |

---

### Indicator 5: Autonomous defense systems and adaptive countermeasures

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST CSF 2.0** | DE.AE-06, RS.MI-01, ID.IM-01 | Event correlation (DE.AE-06), mitigation (RS.MI-01), and improvement (ID.IM-01). |
| **ISO 27001** | A.12.2.1, Clause 10.1, Clause 10.2 | Malware controls (A.12.2.1) and improvement (10.x). |
| **ISO 42001** | 8.5.1, 9.3, 10.1 | Development (8.5.1), review (9.3), and improvement (10.1). |
| **NIST AI RMF** | MEASURE 4.1, MEASURE 4.2, MANAGE 4.2 | Feedback (MEASURE 4.x) and improvement (MANAGE 4.2). |
| **SOC 2** | CC4.1, CC7.4 | Monitoring (CC4.1) and response (CC7.4). |

---

## Domain: `prompt_injection_protection`

**Pillar:** Security for AI  
**Description:** Protection against direct and indirect prompt injection attacks and LLM manipulation through AI guardrails

**Note:** This domain focuses on prompt injection protection, appropriately including MITRE ATLAS (specifically AML.T0051) and OWASP GenAI LLM01:2025.

### Indicator 1: Direct and indirect prompt injection protection

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST CSF 2.0** | PR.DS-01, PR.DS-02, DE.CM-01 | Data security (PR.DS) and monitoring (DE.CM) for injection protection. |
| **ISO 27001** | A.14.2.1, A.14.2.5, A.12.6.1 | Security requirements (A.14.2.1), testing (A.14.2.5), and vulnerability management (A.12.6.1). |
| **ISO 42001** | 8.5.2, 8.6, 8.2.2 | AI development (8.5.2), operation (8.6), and risk assessment (8.2.2). |
| **NIST AI RMF** | MAP 3.4, MEASURE 2.7, MANAGE 2.3 | Risk mapping (MAP 3.4), evaluation (MEASURE 2.7), and response (MANAGE 2.3). |
| **SOC 2** | CC6.1, CC7.1, CC7.2 | Logical access (CC6.1) and monitoring (CC7.x). |
| **MITRE ATLAS** | AML.T0051, AML.T0043 | LLM Prompt Injection and Adversarial Data attacks. |
| **OWASP GenAI** | LLM01:2025 | Prompt Injection vulnerability. |

---

### Indicator 2: AI guardrails implementation and enforcement

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST CSF 2.0** | PR.PS-01, PR.PS-02, GV.PO-01 | Platform security (PR.PS) and governance policies (GV.PO). |
| **ISO 27001** | A.14.2.1, A.14.1.1, A.5.1.1 | Security requirements (A.14.2.1), analysis (A.14.1.1), and policies (A.5.1.1). |
| **ISO 42001** | 7.2, 8.2, 5.2 | Competence (7.2), risk (8.2), and policy (5.2). |
| **NIST AI RMF** | GOVERN 1.5, MANAGE 2.2, MEASURE 2.11 | Improvement (GOVERN 1.5), controls (MANAGE 2.2), and adversarial testing (MEASURE 2.11). |
| **SOC 2** | CC6.1, CC8.1 | Logical access (CC6.1) and change management (CC8.1). |

---

### Indicator 3: Centralized guardrail policy management

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST CSF 2.0** | GV.PO-01, GV.PO-02, GV.RM-01 | Policy (GV.PO) and risk management (GV.RM) governance. |
| **ISO 27001** | A.5.1.1, A.18.1.1, A.6.1.1 | Policies (A.5.1.1), compliance (A.18.1.1), and responsibilities (A.6.1.1). |
| **ISO 42001** | 5.2, 6.1, 8.1 | Policy (5.2), risk actions (6.1), and planning (8.1). |
| **NIST AI RMF** | GOVERN 1.3, GOVERN 2.2, GOVERN 1.4 | Processes (GOVERN 1.x) and roles (GOVERN 2.2). |
| **SOC 2** | CC1.1, CC1.2, CC5.1 | Control environment (CC1.x) and activities (CC5.1). |
| **COBIT** | APO01.03, APO01.04 | Management system and policy processes. |

---

### Indicator 4: Input/output validation and filtering

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST CSF 2.0** | PR.DS-01, PR.DS-02, DE.AE-02 | Data security (PR.DS) and adverse event analysis (DE.AE). |
| **ISO 27001** | A.14.2.5, A.14.1.2, A.12.2.1 | Testing (A.14.2.5), analysis (A.14.1.2), and malware (A.12.2.1). |
| **ISO 42001** | 8.5.2, 8.6, 8.7 | Development (8.5.2), operation (8.6), and monitoring (8.7). |
| **NIST AI RMF** | MEASURE 2.7, MANAGE 2.3, MEASURE 2.3 | Evaluation (MEASURE 2.7), response (MANAGE 2.3), and testing (MEASURE 2.3). |
| **SOC 2** | CC6.1, CC7.1 | Logical access (CC6.1) and monitoring (CC7.1). |
| **OWASP ASVS** | V5.1, V5.2 | Input validation requirements. |

---

### Indicator 5: Monitoring and detection capabilities

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST CSF 2.0** | DE.CM-01, DE.CM-09, DE.AE-02 | Continuous monitoring (DE.CM) and event analysis (DE.AE). |
| **ISO 27001** | A.12.4.1, A.16.1.2, A.16.1.4 | Logging (A.12.4.1), reporting (A.16.1.2), and assessment (A.16.1.4). |
| **ISO 42001** | 8.6, 8.7, 9.1 | Operation (8.6), monitoring (8.7), and evaluation (9.1). |
| **NIST AI RMF** | MEASURE 2.1, MEASURE 4.2, MANAGE 4.1 | Metrics (MEASURE 2.1), feedback (MEASURE 4.2), and response (MANAGE 4.1). |
| **SOC 2** | CC7.1, CC7.2, CC7.3 | System monitoring (CC7.x). |
| **MITRE ATLAS** | AML.T0051 | LLM Prompt Injection attack pattern to detect. |

---

## Domain: `ai_supply_chain_security`

**Pillar:** Security from AI  
**Description:** Security assessment and management of AI supply chain components

**Note:** This domain appropriately retains MITRE ATLAS and OWASP GenAI references because supply chain security must detect and prevent model poisoning, backdoors, and supply chain compromises.

### Indicator 1: AI supply chain component security assessment

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST CSF 2.0** | ID.SC-01, ID.SC-02, ID.SC-04 | Supply chain risk management (ID.SC) for component assessment. |
| **ISO 27001** | A.15.1.1, A.15.1.2, A.15.2.1 | Supplier policies (A.15.1.x) and monitoring (A.15.2.1). |
| **ISO 42001** | 8.3, 8.4, 6.1 | Risk treatment (8.3), external provision (8.4), and risk actions (6.1). |
| **NIST AI RMF** | MAP 3.4, GOVERN 1.2, GOVERN 1.4 | Risk mapping (MAP 3.4) and governance (GOVERN 1.x). |
| **SOC 2** | CC9.1, CC9.2 | Vendor management (CC9.x). |
| **MITRE ATLAS** | AML.T0010, AML.T0018 | Supply Chain Compromise and Backdoor attacks. |
| **OWASP GenAI** | LLM03:2025, LLM04:2025 | Supply Chain and Poisoning vulnerabilities. |

---

### Indicator 2: Model and data provenance tracking and verification

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST CSF 2.0** | ID.AM-07, ID.AM-08, PR.DS-06 | Asset management (ID.AM) and data integrity (PR.DS-06). |
| **ISO 27001** | A.8.1.1, A.8.1.2, A.12.1.2 | Asset inventory (A.8.1.x) and change management (A.12.1.2). |
| **ISO 42001** | 8.5.2, 8.6, 9.2 | Development (8.5.2), operation (8.6), and audit (9.2). |
| **NIST AI RMF** | MAP 3.4, MAP 1.5, MEASURE 3.1 | Risk mapping (MAP 3.4), context (MAP 1.5), and metrics (MEASURE 3.1). |
| **SOC 2** | CC6.1, CC8.1 | Logical access (CC6.1) and change management (CC8.1). |
| **MITRE ATLAS** | AML.T0010, AML.T0020 | Supply Chain and Poison Training Data attacks. |

---

### Indicator 3: Third-party AI service risk management

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST CSF 2.0** | ID.SC-02, ID.SC-04, GV.SC-01 | Supply chain risk (ID.SC) and governance (GV.SC). |
| **ISO 27001** | A.15.1.1, A.15.1.3, A.15.2.2 | Supplier policies (A.15.1.x) and change management (A.15.2.2). |
| **ISO 42001** | 8.3, 8.4, 7.4 | Risk treatment (8.3), external provision (8.4), and communication (7.4). |
| **NIST AI RMF** | GOVERN 1.2, GOVERN 6.1, MAP 1.5 | Governance (GOVERN 1.2), stakeholders (GOVERN 6.1), and context (MAP 1.5). |
| **SOC 2** | CC9.1, CC9.2, CC3.2 | Vendor management (CC9.x) and risk assessment (CC3.2). |
| **COBIT** | APO10.03, APO10.04 | Third-party management processes. |

---

### Indicator 4: Automated security verification and monitoring

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST CSF 2.0** | DE.CM-06, DE.CM-08, ID.SC-04 | Monitoring (DE.CM) and supply chain (ID.SC-04). |
| **ISO 27001** | A.15.2.1, A.15.2.2, A.12.6.1 | Supplier monitoring (A.15.2.x) and vulnerability management (A.12.6.1). |
| **ISO 42001** | 8.6, 8.7, 9.1 | Operation (8.6), monitoring (8.7), and evaluation (9.1). |
| **NIST AI RMF** | MEASURE 2.3, MEASURE 2.7, MANAGE 4.1 | Testing (MEASURE 2.3), evaluation (MEASURE 2.7), and response (MANAGE 4.1). |
| **SOC 2** | CC7.1, CC4.1 | Monitoring (CC7.1) and evaluation (CC4.1). |

---

### Indicator 5: Supply chain threat intelligence and response

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST CSF 2.0** | ID.RA-02, ID.RA-03, RS.AN-03 | Risk assessment (ID.RA) and incident analysis (RS.AN). |
| **ISO 27001** | A.16.1.3, A.6.1.4, A.16.1.4 | Trending (A.16.1.3), authorities (A.6.1.4), and assessment (A.16.1.4). |
| **ISO 42001** | 8.6, 8.7, 10.2 | Operation (8.6), monitoring (8.7), and nonconformity (10.2). |
| **NIST AI RMF** | MANAGE 4.1, MEASURE 2.7, GOVERN 6.1 | Response (MANAGE 4.1), evaluation (MEASURE 2.7), and stakeholders (GOVERN 6.1). |
| **SOC 2** | CC7.2, CC7.3 | Monitoring (CC7.2) and detection (CC7.3). |
| **MITRE ATLAS** | AML.T0010, AML.T0018 | Supply Chain Compromise and Backdoor attacks. |

---

## Domain: `adversarial_ai_defense`

**Pillar:** Security from AI  
**Description:** Protection against adversarial AI attacks and model manipulation

**Note:** This domain appropriately retains MITRE ATLAS and OWASP GenAI references because it focuses on defending against adversarial attacks that manipulate AI models.

### Indicator 1: Adversarial robustness testing and validation

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST CSF 2.0** | ID.RA-05, DE.CM-08, PR.DS-01 | Risk assessment (ID.RA-05), vulnerability scanning (DE.CM-08), and data security (PR.DS-01). |
| **ISO 27001** | A.14.2.8, A.12.6.1, A.18.2.3 | System testing (A.14.2.8), vulnerability management (A.12.6.1), and compliance (A.18.2.3). |
| **ISO 42001** | 8.2.2, 8.6, 9.2 | Risk assessment (8.2.2), operation (8.6), and audit (9.2). |
| **NIST AI RMF** | MEASURE 2.11, MEASURE 2.7, MEASURE 2.3 | Adversarial testing (MEASURE 2.11), evaluation (MEASURE 2.7), and testing (MEASURE 2.3). |
| **SOC 2** | CC4.1, CC4.2, CC7.1 | Monitoring (CC4.x) and system monitoring (CC7.1). |
| **MITRE ATLAS** | AML.T0015, AML.T0043 | Model evasion and adversarial data attacks to test against. |
| **OWASP GenAI** | LLM04:2025 | Data and Model Poisoning vulnerability. |

---

### Indicator 2: Advanced defense mechanisms and adversarial training

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST CSF 2.0** | PR.DS-01, PR.DS-02, PR.PS-01 | Data security (PR.DS) and platform security (PR.PS). |
| **ISO 27001** | A.14.2.1, A.14.2.5, A.12.2.1 | Security requirements (A.14.2.1), testing (A.14.2.5), and malware controls (A.12.2.1). |
| **ISO 42001** | 8.5.1, 8.5.2, 8.6 | AI development (8.5.x) and operation (8.6). |
| **NIST AI RMF** | GOVERN 1.5, MANAGE 2.2, MEASURE 2.11 | Improvement (GOVERN 1.5), controls (MANAGE 2.2), and adversarial testing (MEASURE 2.11). |
| **SOC 2** | CC6.1, CC8.1 | Logical access (CC6.1) and change management (CC8.1). |
| **MITRE ATLAS** | AML.T0015, AML.T0043 | Model evasion and adversarial data attacks to defend against. |

---

### Indicator 3: Real-time detection and monitoring capabilities

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST CSF 2.0** | DE.CM-01, DE.CM-09, DE.AE-02 | Continuous monitoring (DE.CM) and event analysis (DE.AE). |
| **ISO 27001** | A.12.4.1, A.16.1.2, A.16.1.4 | Logging (A.12.4.1), reporting (A.16.1.2), and assessment (A.16.1.4). |
| **ISO 42001** | 8.6, 8.7, 9.1 | Operation (8.6), monitoring (8.7), and evaluation (9.1). |
| **NIST AI RMF** | MEASURE 2.3, MEASURE 2.7, MANAGE 4.1 | Testing (MEASURE 2.3), evaluation (MEASURE 2.7), and response (MANAGE 4.1). |
| **SOC 2** | CC7.1, CC7.2, CC7.3 | System monitoring (CC7.x). |
| **MITRE ATLAS** | AML.T0015, AML.T0043 | Model evasion and adversarial data attacks to detect. |

---

### Indicator 4: Incident response and model recovery procedures

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST CSF 2.0** | RS.AN-03, RS.MI-01, RC.RP-01 | Incident analysis (RS.AN), mitigation (RS.MI), and recovery planning (RC.RP). |
| **ISO 27001** | A.16.1.4, A.16.1.5, A.16.1.6 | Assessment (A.16.1.4), response (A.16.1.5), and lessons learned (A.16.1.6). |
| **ISO 42001** | 8.6, 8.7, 10.2 | Operation (8.6), monitoring (8.7), and nonconformity (10.2). |
| **NIST AI RMF** | MANAGE 4.1, MANAGE 4.2, GOVERN 6.2 | Response (MANAGE 4.x) and communication (GOVERN 6.2). |
| **SOC 2** | CC7.3, CC7.4, CC7.5 | Detection (CC7.3), response (CC7.4), and recovery (CC7.5). |

---

### Indicator 5: Adaptive defense systems and continuous evolution

| Framework | Controls | Rationale |
|-----------|----------|-----------|
| **NIST CSF 2.0** | ID.IM-01, ID.IM-02, PR.PS-02 | Improvement (ID.IM) and platform security (PR.PS). |
| **ISO 27001** | Clause 10.1, Clause 10.2, A.12.1.2 | Improvement (10.x) and change management (A.12.1.2). |
| **ISO 42001** | 9.3, 10.1, 10.2 | Management review (9.3) and improvement (10.x). |
| **NIST AI RMF** | MEASURE 4.1, MEASURE 4.2, GOVERN 1.5 | Feedback (MEASURE 4.x) and improvement (GOVERN 1.5). |
| **SOC 2** | CC4.1, CC4.2 | Monitoring activities (CC4.x). |
| **MITRE ATLAS** | AML.T0015, AML.T0043 | Model evasion and adversarial data attacks inform evolution. |

---

*Last updated: 2026-01-11*
