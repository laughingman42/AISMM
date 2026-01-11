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

*Last updated: 2026-01-11*
