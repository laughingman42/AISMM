export interface MaturityLevel {
  level: number;
  name: string;
  description: string;
  key_indicators?: string[];
}

export interface Domain {
  id: string;
  id_code: string;
  name: string;
  description: string;
  key_controls?: string[];
  mappings?: {
    mitre_atlas?: string[];
    nist_ai_rmf?: string[];
    eu_ai_act?: string[];
    iso_42001?: string[];
    owasp_genai?: string[];
  };
  maturity_levels: MaturityLevel[];
}

export interface Component {
  id: string;
  id_code: string;
  title: string;
  description: string;
  domains: Domain[];
}

export interface QuestionOption {
  code: number;
  label: string;
}

export interface Question {
  id: string;
  type: 'multiple_choice' | 'true_false' | 'scoring' | 'free_text' | 'numeric';
  title: string;
  help_text: string;
  required: boolean;
  attachments_allowed?: boolean;
  options?: QuestionOption[];
}

export interface AssessmentQuestionnaire {
  questions: Question[];
}

export interface AISMMData {
  aismm: {
    version: string;
    id: string;
    title: string;
    description: string;
  };
  components: Component[];
  assessment_questionnaire: AssessmentQuestionnaire;
}
