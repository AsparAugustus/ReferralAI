export type ResponseQuery = {
  answer: {
    type: string;
    value?: string;
    selection?: string[];
  };
  conversation: {
    id: string;
  };
};

export type Message = {
  type: string;
  value_type?: string;
  text?: string;
  meta?: {};
  value?: string;
}[];

export type Choice = {
  type: string;
  id: string;
  text?: string;
  label?: string;
  name?: string;
  long_name?: string;
  preselect?: boolean;
};

type Symptom = {
  cui: string;
  name: string;
  severity: string;
};

export type Summary = {
  diagnosis_possible: boolean;
  extracted_symptoms: Symptom[];
  duration: string;
  additional_symptoms: Symptom[];
  negative_symptoms: Omit<Symptom, "severity">[];
  unsure_symptoms: Omit<Symptom, "severity">[];
  consultation_triage: {
    triage: string;
    triage_advice: string;
    level: string;
  };
  articles: any[];
  articles_v3: Article[];
  consultation_id: string;
  notifications: any[];
  influencing_factors: {
    cui: string;
    type: string;
    rank: number;
    name: string;
    long_name: string;
    value: {
      not_sure: boolean;
      value: boolean;
    };
  }[];
  user_profile: {
    year_of_birth: number;
    gender: string;
  };
};

export type Article = {
  yourmd_id: string;
  name: string;
  condition: {
    cui: string;
    probalility: number;
    adzones: any[];
  };
  content: {
    name: string;
    medical_name: string;
    snippet: string;
    triage: {
      triage: string;
      triage_advice: string;
      triage_diagnostic: string;
      triage_treatment: string;
      triage_worries: string;
      triage_message: string;
      triage_level: string;
    };
  };
  substitution: string;
  substitute_articles: any[];
  urls: {
    web: string;
    mobile: string;
  };
  metadata: {
    reading_time_minutes: number;
    category_id: string;
    category_name: string;
    image?: string;
  };
};

export type APIResponse = {
  report?: {
    type: string;
    articles?: {
      id: string;
      name: string;
      snippet: string;
      image: string;
      category_id: string;
      category_name: string;
      reading_time_minutes: number;
      urls: {
        web: string;
        mobile: string;
      };
    }[];
    summary: Summary;
    serviceNames: string;
  };
  conversation: {
    id: string;
    scenario: string;
    phase: string;
    progress?: {
      percentage: number;
      stage: string;
    };
    available_commands?: string[];
    symptoms_summary?: {
      selected: {
        cui: string;
        name: string;
      }[];
    };
    step_back_possible?: boolean;
  };
  question: {
    type: string;
    messages: Message;
    mandatory?: boolean;
    multiple?: boolean;
    choices?: Choice[];
    constraints?: {
      min_selections: number;
      max_selections: number;
    };
  };
  user: {
    name: string;
    gender?: string;
    age?: number;
    year_of_birth?: number;
    other: boolean;
    initial_symptom?: string;
  };
  error?: string;
};

export type Constraint = APIResponse["question"]["constraints"];

export type Choices = APIResponse["question"]["choices"];

export type SearchAutoComplete = {
  cui: string;
  highlight: string;
  id: string;
  medical_name: string;
  user_facing_name: string;
};

export type SearchAPIResponse = {
  user_facing_prefix: string;
  autocomplete: SearchAutoComplete[];
};

export type AuthResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
};
