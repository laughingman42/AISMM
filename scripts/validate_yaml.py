#!/usr/bin/env python3
import sys
import os
import yaml

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
YAML_PATH = os.path.join(ROOT, "aismm_definition", "aismm.yaml")


def load_yaml(path):
    # Read raw text and reject files that contain tab characters.
    # YAML best practice is to use spaces only for indentation. If tabs
    # are present we fail fast and report the offending line numbers so
    # the user/editor/CI can fix the source.
    with open(path, "r", encoding="utf-8") as f:
        text = f.read()
    if '\t' in text:
        lines_with_tabs = [i + 1 for i, ln in enumerate(text.splitlines()) if '\t' in ln]
        raise ValueError(
            f"YAML file contains tab characters on line(s): {lines_with_tabs}. "
            "YAML must use spaces for indentation. Replace tabs with spaces and re-run validation."
        )
    return yaml.safe_load(text)


def simple_checks(doc):
    errors = []
    if not isinstance(doc, dict):
        errors.append("Top-level document is not a mapping/object")
        return errors
    if "aismm" not in doc:
        errors.append("Missing top-level 'aismm' key")
    else:
        if not isinstance(doc.get("aismm"), dict):
            errors.append("'aismm' should be a mapping")
    
    # Support both old and new structure: components can be at top-level or under aismm
    aismm_section = doc.get("aismm", {})
    comps = doc.get("components") or aismm_section.get("components")
    
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
                    
                    # Optional mappings check
                    if "mappings" in dom:
                        mappings = dom.get("mappings")
                        if not isinstance(mappings, dict):
                            errors.append(f"{dprefix}.mappings should be a mapping")
                        else:
                            for framework, refs in mappings.items():
                                if not isinstance(refs, list):
                                    errors.append(f"{dprefix}.mappings.{framework} should be a list of strings")

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
    q = doc.get("assessment_questionnaire") or aismm_section.get("assessment_questionnaire")
    if q is None:
        errors.append("Missing 'assessment_questionnaire' section")
    else:
        questions = q.get("questions") if isinstance(q, dict) else None
        if questions is None:
            errors.append("'assessment_questionnaire' missing 'questions' list")
        else:
            if not isinstance(questions, list):
                errors.append("assessment_questionnaire.questions should be a list")
            else:
                # basic check for question fields
                for qi, qq in enumerate(questions, start=1):
                    qpre = f"assessment_questionnaire.questions[{qi}]"
                    if not isinstance(qq, dict):
                        errors.append(f"{qpre} is not a mapping")
                        continue
                    for field in ("id","type","title","help_text","required"):
                        if field not in qq:
                            errors.append(f"{qpre} missing '{field}'")
                    if qq.get("type") not in ("multiple_choice","true_false","scoring","free_text","numeric"):
                        errors.append(f"{qpre} has unsupported type '{qq.get('type')}'")

    return errors


def main():
    if not os.path.exists(YAML_PATH):
        print(f"ERROR: YAML file not found at {YAML_PATH}")
        sys.exit(2)
    try:
        doc = load_yaml(YAML_PATH)
    except Exception as e:
        print("ERROR: Failed to parse YAML:", e)
        sys.exit(2)
    errors = simple_checks(doc)
    if errors:
        print("Validation FAILED with the following issues:")
        for e in errors:
            print(" -", e)
        sys.exit(1)
    print("YAML parsed and basic structure validated successfully.")
    # optionally print summary counts
    aismm_section = doc.get("aismm", {})
    comps = doc.get("components") or aismm_section.get("components", [])
    print(f"Components: {len(comps)}")
    total_domains = sum(len(c.get("domains", [])) for c in comps if isinstance(c, dict))
    print(f"Total domains: {total_domains}")
    q = doc.get("assessment_questionnaire") or aismm_section.get("assessment_questionnaire", {})
    qs = q.get("questions", [])
    print(f"Total assessment questions: {len(qs)}")


if __name__ == "__main__":
    main()
