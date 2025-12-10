#!/usr/bin/env python3
"""
YAML validation script for AISMM model definitions.
Supports both:
  - v1.x structure (flat domains dictionary, pillars, scoring_config)
  - v2.x structure (aismm wrapper with nested components)
"""
import sys
import os
import yaml

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
YAML_PATH = os.path.join(ROOT, "aismm_definition", "aismm.yaml")


def load_yaml(path):
    """Load YAML file, rejecting files with tab characters."""
    with open(path, "r", encoding="utf-8") as f:
        text = f.read()
    if '\t' in text:
        lines_with_tabs = [i + 1 for i, ln in enumerate(text.splitlines()) if '\t' in ln]
        raise ValueError(
            f"YAML file contains tab characters on line(s): {lines_with_tabs}. "
            "YAML must use spaces for indentation. Replace tabs with spaces and re-run validation."
        )
    return yaml.safe_load(text)


def detect_version(doc):
    """Detect which AISMM structure version is being used."""
    if not isinstance(doc, dict):
        return None
    # v2.x has 'aismm' top-level key with 'components' inside
    if "aismm" in doc:
        return "2.x"
    # v1.x has 'domains', 'pillars', 'scoring_config' at top level
    if "domains" in doc and "pillars" in doc:
        return "1.x"
    return None


def validate_v1(doc):
    """Validate v1.x structure (flat domains, pillars, scoring_config)."""
    errors = []
    
    # Check required top-level keys
    required_keys = ["version", "name", "description", "scoring_config", "pillars", "domains"]
    for key in required_keys:
        if key not in doc:
            errors.append(f"Missing required top-level key: '{key}'")
    
    # Validate scoring_config
    sc = doc.get("scoring_config", {})
    if not isinstance(sc, dict):
        errors.append("'scoring_config' should be a mapping")
    else:
        for key in ["level_scores", "maturity_thresholds"]:
            if key not in sc:
                errors.append(f"scoring_config missing '{key}'")
    
    # Validate pillars
    pillars = doc.get("pillars", {})
    if not isinstance(pillars, dict):
        errors.append("'pillars' should be a mapping")
    else:
        for pid, pdata in pillars.items():
            if not isinstance(pdata, dict):
                errors.append(f"pillars.{pid} should be a mapping")
                continue
            for field in ["id", "name", "description", "weight"]:
                if field not in pdata:
                    errors.append(f"pillars.{pid} missing '{field}'")
    
    # Validate domains
    domains = doc.get("domains", {})
    if not isinstance(domains, dict):
        errors.append("'domains' should be a mapping")
    else:
        for did, ddata in domains.items():
            prefix = f"domains.{did}"
            if not isinstance(ddata, dict):
                errors.append(f"{prefix} should be a mapping")
                continue
            
            # Required domain fields
            for field in ["id", "name", "description", "pillar"]:
                if field not in ddata:
                    errors.append(f"{prefix} missing '{field}'")
            
            # Validate pillar reference
            pillar_ref = ddata.get("pillar")
            if pillar_ref and pillar_ref not in pillars:
                errors.append(f"{prefix}.pillar '{pillar_ref}' not found in pillars definition")
            
            # Validate levels
            levels = ddata.get("levels", {})
            if not isinstance(levels, dict):
                errors.append(f"{prefix}.levels should be a mapping")
            else:
                level_keys = set(levels.keys())
                expected_levels = {"level_1", "level_2", "level_3", "level_4", "level_5"}
                if level_keys != expected_levels:
                    missing = expected_levels - level_keys
                    extra = level_keys - expected_levels
                    if missing:
                        errors.append(f"{prefix}.levels missing: {missing}")
                    if extra:
                        errors.append(f"{prefix}.levels has unexpected keys: {extra}")
            
            # Validate framework_alignment (optional but recommended)
            fa = ddata.get("framework_alignment", [])
            if fa and not isinstance(fa, list):
                errors.append(f"{prefix}.framework_alignment should be a list")
            
            # Validate key_controls (optional but recommended after merge)
            kc = ddata.get("key_controls", [])
            if kc and not isinstance(kc, list):
                errors.append(f"{prefix}.key_controls should be a list")
            
            # Validate questions
            questions = ddata.get("questions", [])
            if questions and not isinstance(questions, list):
                errors.append(f"{prefix}.questions should be a list")
            elif questions:
                for qi, q in enumerate(questions, start=1):
                    qprefix = f"{prefix}.questions[{qi}]"
                    if not isinstance(q, dict):
                        errors.append(f"{qprefix} should be a mapping")
                        continue
                    for field in ["id", "text", "question_type"]:
                        if field not in q:
                            errors.append(f"{qprefix} missing '{field}'")
    
    return errors


def validate_v2(doc):
    """Validate v2.x structure (aismm wrapper with nested components)."""
    errors = []
    
    if "aismm" not in doc:
        errors.append("Missing top-level 'aismm' key")
        return errors
    
    aismm = doc.get("aismm", {})
    if not isinstance(aismm, dict):
        errors.append("'aismm' should be a mapping")
        return errors
    
    comps = aismm.get("components")
    if comps is None:
        errors.append("Missing 'components' list")
    elif not isinstance(comps, list):
        errors.append("'components' should be a list")
    else:
        for ci, comp in enumerate(comps, start=1):
            prefix = f"components[{ci}]"
            if not isinstance(comp, dict):
                errors.append(f"{prefix} is not a mapping")
                continue
            if "id" not in comp:
                errors.append(f"{prefix} missing 'id'")
            if "id_code" not in comp:
                errors.append(f"{prefix} missing 'id_code'")
            doms = comp.get("domains")
            if doms is None:
                errors.append(f"{prefix} missing 'domains' list")
            elif not isinstance(doms, list):
                errors.append(f"{prefix}.domains should be a list")
            else:
                for di, dom in enumerate(doms, start=1):
                    dprefix = f"{prefix}.domains[{di}]"
                    if not isinstance(dom, dict):
                        errors.append(f"{dprefix} is not a mapping")
                        continue
                    if "id" not in dom:
                        errors.append(f"{dprefix} missing 'id'")
                    if "id_code" not in dom:
                        errors.append(f"{dprefix} missing 'id_code'")
                    
                    if "mappings" in dom:
                        mappings = dom.get("mappings")
                        if not isinstance(mappings, dict):
                            errors.append(f"{dprefix}.mappings should be a mapping")
                        else:
                            for framework, refs in mappings.items():
                                if not isinstance(refs, list):
                                    errors.append(f"{dprefix}.mappings.{framework} should be a list")

                    if "maturity_levels" not in dom:
                        errors.append(f"{dprefix} missing 'maturity_levels' list")
                    else:
                        mls = dom.get("maturity_levels")
                        if not isinstance(mls, list):
                            errors.append(f"{dprefix}.maturity_levels should be a list")
                        else:
                            levels = [m.get("level") for m in mls if isinstance(m, dict)]
                            if sorted(levels) != [1,2,3,4,5]:
                                errors.append(f"{dprefix}.maturity_levels should contain levels 1..5")

    # Check questionnaire structure
    q = aismm.get("assessment_questionnaire")
    if q is None:
        errors.append("Missing 'assessment_questionnaire' section")
    else:
        questions = q.get("questions") if isinstance(q, dict) else None
        if questions is None:
            errors.append("'assessment_questionnaire' missing 'questions' list")
        elif not isinstance(questions, list):
            errors.append("assessment_questionnaire.questions should be a list")
        else:
            for qi, qq in enumerate(questions, start=1):
                qpre = f"assessment_questionnaire.questions[{qi}]"
                if not isinstance(qq, dict):
                    errors.append(f"{qpre} is not a mapping")
                    continue
                for field in ("id","type","title","help_text","required"):
                    if field not in qq:
                        errors.append(f"{qpre} missing '{field}'")
                allowed_types = ("multiple_choice","true_false","scoring","free_text","numeric")
                if qq.get("type") not in allowed_types:
                    errors.append(f"{qpre} has unsupported type '{qq.get('type')}'")

    return errors


def print_summary_v1(doc):
    """Print summary for v1.x structure."""
    pillars = doc.get("pillars", {})
    domains = doc.get("domains", {})
    total_questions = sum(len(d.get("questions", [])) for d in domains.values() if isinstance(d, dict))
    total_key_controls = sum(len(d.get("key_controls", [])) for d in domains.values() if isinstance(d, dict))
    
    print(f"Pillars: {len(pillars)}")
    print(f"Domains: {len(domains)}")
    print(f"Total questions (embedded): {total_questions}")
    print(f"Total key_controls: {total_key_controls}")
    
    # Check for framework mappings
    has_mitre = any("mitre_atlas" in str(d) for d in domains.values())
    has_owasp = any("owasp_genai" in str(d) for d in domains.values())
    print(f"MITRE ATLAS mappings: {'Yes' if has_mitre else 'No'}")
    print(f"OWASP GenAI mappings: {'Yes' if has_owasp else 'No'}")


def print_summary_v2(doc):
    """Print summary for v2.x structure."""
    aismm = doc.get("aismm", {})
    comps = aismm.get("components", [])
    total_domains = sum(len(c.get("domains", [])) for c in comps if isinstance(c, dict))
    q = aismm.get("assessment_questionnaire", {})
    qs = q.get("questions", [])
    
    print(f"Components: {len(comps)}")
    print(f"Total domains: {total_domains}")
    print(f"Total assessment questions: {len(qs)}")


def main():
    if not os.path.exists(YAML_PATH):
        print(f"ERROR: YAML file not found at {YAML_PATH}")
        sys.exit(2)
    
    try:
        doc = load_yaml(YAML_PATH)
    except Exception as e:
        print("ERROR: Failed to parse YAML:", e)
        sys.exit(2)
    
    version = detect_version(doc)
    if version is None:
        print("ERROR: Unable to detect AISMM version. Expected either 'aismm' key (v2.x) or 'domains'+'pillars' keys (v1.x)")
        sys.exit(2)
    
    print(f"Detected AISMM structure version: {version}")
    
    if version == "1.x":
        errors = validate_v1(doc)
    else:
        errors = validate_v2(doc)
    
    if errors:
        print(f"\nValidation FAILED with {len(errors)} issue(s):")
        for e in errors:
            print(" -", e)
        sys.exit(1)
    
    print("\n✓ YAML parsed and structure validated successfully.\n")
    
    if version == "1.x":
        print_summary_v1(doc)
    else:
        print_summary_v2(doc)


if __name__ == "__main__":
    main()
