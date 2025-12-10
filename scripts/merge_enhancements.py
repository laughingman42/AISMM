#!/usr/bin/env python3
"""
Script to merge enhancements from v2 into the old AISMM structure.
Adds:
1. MITRE ATLAS mappings to framework_alignment
2. OWASP GenAI mappings to framework_alignment  
3. key_controls section to each domain
"""

import yaml
import sys
from pathlib import Path

# MITRE ATLAS mappings for each domain (from earlier work)
MITRE_ATLAS_MAPPINGS = {
    "ai_security_standards": [
        "AML.T0034 - Cost Harvesting",
        "AML.T0047 - ML Supply Chain Compromise"
    ],
    "security_reviews": [
        "AML.T0010 - ML Supply Chain Compromise",
        "AML.T0042 - Verify Attack"
    ],
    "shadow_ai_management": [
        "AML.T0035 - Develop Capabilities",
        "AML.T0052 - Phishing"
    ],
    "ai_security_tools": [
        "AML.T0015 - Evade ML Model",
        "AML.T0043 - Craft Adversarial Data"
    ],
    "development_integration": [
        "AML.T0010 - ML Supply Chain Compromise",
        "AML.T0042 - Verify Attack"
    ],
    "asset_management": [
        "AML.T0047 - ML Supply Chain Compromise",
        "AML.T0035 - Develop Capabilities"
    ],
    "team_structure": [
        "AML.T0052 - Phishing",
        "AML.T0050 - Command and Scripting Interpreter"
    ],
    "threat_detection_analysis": [
        "AML.T0015 - Evade ML Model",
        "AML.T0043 - Craft Adversarial Data",
        "AML.T0044 - Full ML Model Access"
    ],
    "incident_response": [
        "AML.T0048 - Exfiltration via ML Inference API",
        "AML.T0024 - Exfiltration via Cyber Means"
    ],
    "vulnerability_management": [
        "AML.T0010 - ML Supply Chain Compromise",
        "AML.T0043 - Craft Adversarial Data"
    ],
    "identity_access_management": [
        "AML.T0044 - Full ML Model Access",
        "AML.T0048 - Exfiltration via ML Inference API"
    ],
    "security_operations": [
        "AML.T0015 - Evade ML Model",
        "AML.T0048 - Exfiltration via ML Inference API"
    ],
    "fraud_detection": [
        "AML.T0015 - Evade ML Model",
        "AML.T0043 - Craft Adversarial Data",
        "AML.T0031 - Erode ML Model Integrity"
    ],
    "ai_content_detection": [
        "AML.T0015 - Evade ML Model",
        "AML.T0043 - Craft Adversarial Data"
    ],
    "deepfake_defense": [
        "AML.T0015 - Evade ML Model",
        "AML.T0043 - Craft Adversarial Data",
        "AML.T0048 - Exfiltration via ML Inference API"
    ],
    "ai_attack_defense": [
        "AML.T0043 - Craft Adversarial Data",
        "AML.T0031 - Erode ML Model Integrity",
        "AML.T0015 - Evade ML Model"
    ],
    "prompt_injection_protection": [
        "AML.T0051 - LLM Prompt Injection",
        "AML.T0054 - LLM Jailbreak",
        "AML.T0056 - LLM Plugin Compromise"
    ],
    "ai_supply_chain_security": [
        "AML.T0010 - ML Supply Chain Compromise",
        "AML.T0047 - ML Supply Chain Compromise",
        "AML.T0011 - Publish Poisoned Datasets"
    ],
    "adversarial_ai_defense": [
        "AML.T0043 - Craft Adversarial Data",
        "AML.T0031 - Erode ML Model Integrity",
        "AML.T0015 - Evade ML Model",
        "AML.T0040 - ML Model Inference API Access"
    ]
}

# OWASP GenAI mappings
OWASP_GENAI_MAPPINGS = {
    "ai_security_standards": ["LLM01:2025 Prompt Injection - Governance", "LLM10:2025 Unbounded Consumption - Policy"],
    "security_reviews": ["LLM09:2025 Misinformation - Validation", "LLM02:2025 Sensitive Information Disclosure - Testing"],
    "shadow_ai_management": ["LLM05:2025 Improper Output Handling - Discovery", "LLM10:2025 Unbounded Consumption - Visibility"],
    "ai_security_tools": ["LLM01:2025 Prompt Injection - Detection", "LLM06:2025 Excessive Agency - Monitoring"],
    "development_integration": ["LLM03:2025 Supply Chain Vulnerabilities", "LLM05:2025 Improper Output Handling"],
    "asset_management": ["LLM03:2025 Supply Chain Vulnerabilities - Inventory", "LLM10:2025 Unbounded Consumption - Asset Tracking"],
    "team_structure": ["LLM07:2025 System Prompt Leakage - Training", "LLM06:2025 Excessive Agency - Skills"],
    "threat_detection_analysis": ["LLM01:2025 Prompt Injection - Detection", "LLM04:2025 Data and Model Poisoning - Analysis"],
    "incident_response": ["LLM02:2025 Sensitive Information Disclosure - Response", "LLM06:2025 Excessive Agency - Containment"],
    "vulnerability_management": ["LLM03:2025 Supply Chain Vulnerabilities", "LLM04:2025 Data and Model Poisoning - Assessment"],
    "identity_access_management": ["LLM06:2025 Excessive Agency - Access Controls", "LLM02:2025 Sensitive Information Disclosure - IAM"],
    "security_operations": ["LLM01:2025 Prompt Injection - Monitoring", "LLM08:2025 Vector and Embedding Weaknesses - Operations"],
    "fraud_detection": ["LLM01:2025 Prompt Injection - Anti-Fraud", "LLM04:2025 Data and Model Poisoning - Fraud Models"],
    "ai_content_detection": ["LLM09:2025 Misinformation - Detection", "LLM05:2025 Improper Output Handling - Content Validation"],
    "deepfake_defense": ["LLM09:2025 Misinformation - Deepfake Detection", "LLM05:2025 Improper Output Handling - Media Verification"],
    "ai_attack_defense": ["LLM04:2025 Data and Model Poisoning - Defense", "LLM01:2025 Prompt Injection - Adversarial Defense"],
    "prompt_injection_protection": ["LLM01:2025 Prompt Injection", "LLM07:2025 System Prompt Leakage", "LLM06:2025 Excessive Agency"],
    "ai_supply_chain_security": ["LLM03:2025 Supply Chain Vulnerabilities", "LLM04:2025 Data and Model Poisoning - Supply Chain"],
    "adversarial_ai_defense": ["LLM04:2025 Data and Model Poisoning", "LLM08:2025 Vector and Embedding Weaknesses"]
}

# Key controls for each domain
KEY_CONTROLS = {
    "ai_security_standards": [
        "Formal AI governance framework and steering committee",
        "AI risk appetite definition and risk classification criteria",
        "Documented AI security policies aligned with enterprise security",
        "Compliance mapping to NIST AI RMF, ISO 42001, EU AI Act",
        "Regular policy review and update cycles (quarterly minimum)"
    ],
    "security_reviews": [
        "Mandatory security review gates in AI development lifecycle",
        "Automated security scanning for ML pipelines and models",
        "Red team assessments for AI systems pre-deployment",
        "Security review documentation and remediation tracking",
        "Integration with CI/CD for continuous security validation"
    ],
    "shadow_ai_management": [
        "AI asset discovery and inventory processes",
        "Sanctioned AI tools catalog and approval workflow",
        "Network monitoring for unauthorized AI service usage",
        "Employee training on approved AI usage policies",
        "Periodic audits for shadow AI detection"
    ],
    "ai_security_tools": [
        "AI-specific security tool evaluation and selection criteria",
        "Integration of AI security tools into existing SIEM/SOAR",
        "Model scanning and vulnerability assessment tools",
        "Prompt injection detection and prevention tools",
        "AI threat intelligence feed integration"
    ],
    "development_integration": [
        "Secure ML development guidelines and checklists",
        "Security requirements in AI project inception",
        "Secure coding standards for ML pipelines",
        "Dependency scanning for ML libraries and frameworks",
        "Security sign-off required for model deployment"
    ],
    "asset_management": [
        "Comprehensive AI/ML asset inventory and classification",
        "Model versioning and lineage tracking",
        "Data provenance and source documentation",
        "Third-party AI component inventory",
        "Asset lifecycle management and decommissioning procedures"
    ],
    "team_structure": [
        "Defined AI security roles and responsibilities",
        "AI security training requirements for development teams",
        "Cross-functional AI security working groups",
        "AI security awareness programs organization-wide",
        "Career paths and skill development for AI security"
    ],
    "threat_detection_analysis": [
        "AI-specific threat modeling methodology",
        "Model behavior monitoring and anomaly detection",
        "Input validation and adversarial input detection",
        "Output monitoring for data leakage and hallucinations",
        "Integration with enterprise threat intelligence"
    ],
    "incident_response": [
        "AI-specific incident response playbooks",
        "Model rollback and containment procedures",
        "AI incident classification and severity criteria",
        "Post-incident analysis for AI-specific attacks",
        "Communication protocols for AI security incidents"
    ],
    "vulnerability_management": [
        "AI/ML-specific vulnerability scanning and assessment",
        "Model robustness testing against adversarial attacks",
        "Dependency vulnerability tracking for ML frameworks",
        "Vulnerability prioritization criteria for AI systems",
        "Remediation SLAs for AI vulnerabilities"
    ],
    "identity_access_management": [
        "Least privilege access for ML systems and data",
        "API key and credential management for AI services",
        "Role-based access control for model management",
        "Audit logging for AI system access",
        "Service account management for ML pipelines"
    ],
    "security_operations": [
        "AI system monitoring in security operations center",
        "Automated alerting for AI security anomalies",
        "Integration of AI telemetry into SIEM",
        "24/7 monitoring coverage for critical AI systems",
        "Runbooks for common AI security scenarios"
    ],
    "fraud_detection": [
        "AI-powered fraud detection model security",
        "Adversarial testing of fraud detection models",
        "Model retraining procedures when evasion detected",
        "Human-in-the-loop for high-confidence fraud cases",
        "Feedback loop for fraud model improvement"
    ],
    "ai_content_detection": [
        "AI-generated content identification capabilities",
        "Deepfake and synthetic media detection tools",
        "Content authenticity verification procedures",
        "Integration with content moderation workflows",
        "Regular model updates for emerging generation techniques"
    ],
    "deepfake_defense": [
        "Deepfake detection across multiple media types",
        "Identity verification enhanced with liveness detection",
        "Employee training on deepfake awareness",
        "Incident procedures for deepfake attacks",
        "Collaboration with industry on detection methods"
    ],
    "ai_attack_defense": [
        "Defense mechanisms against adversarial attacks",
        "Input preprocessing and sanitization for models",
        "Model hardening and robustness techniques",
        "Attack simulation and penetration testing",
        "Defense-in-depth architecture for AI systems"
    ],
    "prompt_injection_protection": [
        "Input validation and sanitization for prompts",
        "System prompt protection and encapsulation",
        "Output filtering and safety guardrails",
        "Privilege separation for LLM actions",
        "Monitoring for prompt injection attempts"
    ],
    "ai_supply_chain_security": [
        "Vendor security assessment for AI providers",
        "Model provenance verification and signing",
        "Dataset source validation and integrity checks",
        "Third-party model security review requirements",
        "Supply chain risk monitoring and alerts"
    ],
    "adversarial_ai_defense": [
        "Adversarial robustness testing methodology",
        "Defense techniques: adversarial training, input certification",
        "Monitoring for adversarial attack patterns",
        "Model ensemble and diversity strategies",
        "Regular adversarial red team exercises"
    ]
}


def load_yaml(filepath):
    """Load YAML file."""
    with open(filepath, 'r') as f:
        return yaml.safe_load(f)


def add_enhancements_to_yaml(filepath):
    """Add MITRE ATLAS, OWASP GenAI, and key_controls to the YAML file."""
    
    with open(filepath, 'r') as f:
        content = f.read()
        lines = content.split('\n')
    
    # Parse to get structure
    data = yaml.safe_load(content)
    
    # Get domain keys from domains dict
    domain_keys = list(data.get('domains', {}).keys())
    
    print(f"Found {len(domain_keys)} domains: {domain_keys}")
    
    # For each domain, we need to:
    # 1. Find the framework_alignment section and add mitre_atlas and owasp_genai to each indicator's frameworks
    # 2. Add key_controls after weight
    
    new_lines = []
    current_domain = None
    in_framework_alignment = False
    in_frameworks = False
    last_framework_indent = 0
    added_key_controls_for_domain = set()
    
    i = 0
    while i < len(lines):
        line = lines[i]
        
        # Detect domain start
        for domain_key in domain_keys:
            if line.strip() == f"{domain_key}:" or line == f"  {domain_key}:":
                current_domain = domain_key
                in_framework_alignment = False
                break
        
        # Detect weight line to add key_controls after it
        if current_domain and line.strip().startswith('weight:') and current_domain not in added_key_controls_for_domain:
            new_lines.append(line)
            # Add key_controls after weight
            if current_domain in KEY_CONTROLS:
                new_lines.append('')
                new_lines.append('    key_controls:')
                for ctrl in KEY_CONTROLS[current_domain]:
                    new_lines.append(f'      - "{ctrl}"')
                added_key_controls_for_domain.add(current_domain)
            i += 1
            continue
        
        # Detect framework_alignment section
        if 'framework_alignment:' in line:
            in_framework_alignment = True
        
        # Detect end of framework_alignment (levels: or indicators:)
        if in_framework_alignment and (line.strip().startswith('levels:') or line.strip().startswith('indicators:')):
            in_framework_alignment = False
            in_frameworks = False
        
        # Detect frameworks: within framework_alignment
        if in_framework_alignment and line.strip() == 'frameworks:':
            in_frameworks = True
            # Calculate indent for adding new frameworks
            last_framework_indent = len(line) - len(line.lstrip()) + 2  # indent of child items
        
        # Detect next indicator (new - indicator:) to add mitre/owasp before it
        if in_frameworks and current_domain:
            # Check if this is the last framework line before a new indicator or levels/indicators
            next_line = lines[i + 1] if i + 1 < len(lines) else ''
            
            # If next line starts a new indicator or ends framework_alignment
            if (next_line.strip().startswith('- indicator:') or 
                next_line.strip().startswith('levels:') or 
                next_line.strip().startswith('indicators:')):
                
                new_lines.append(line)
                
                # Add MITRE ATLAS
                indent = ' ' * last_framework_indent
                if current_domain in MITRE_ATLAS_MAPPINGS:
                    mitre_items = MITRE_ATLAS_MAPPINGS[current_domain]
                    mitre_list = ', '.join([f'"{m}"' for m in mitre_items])
                    new_lines.append(f'{indent}mitre_atlas: [{mitre_list}]')
                
                # Add OWASP GenAI
                if current_domain in OWASP_GENAI_MAPPINGS:
                    owasp_items = OWASP_GENAI_MAPPINGS[current_domain]
                    owasp_list = ', '.join([f'"{o}"' for o in owasp_items])
                    new_lines.append(f'{indent}owasp_genai: [{owasp_list}]')
                
                in_frameworks = False
                i += 1
                continue
        
        new_lines.append(line)
        i += 1
    
    # Write back
    with open(filepath, 'w') as f:
        f.write('\n'.join(new_lines))
    
    print(f"Enhanced YAML written to {filepath}")


def main():
    yaml_path = Path(__file__).parent.parent / 'aismm_definition' / 'aismm.yaml'
    
    if not yaml_path.exists():
        print(f"Error: {yaml_path} not found")
        sys.exit(1)
    
    print(f"Processing {yaml_path}")
    add_enhancements_to_yaml(yaml_path)
    print("Done!")


if __name__ == '__main__':
    main()
