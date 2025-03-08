export interface VacancyHHMultipleResponse {
    items: VacancyHH[];
    found: number;
    pages: number;
    page: number;
    per_page: number;
    clusters: unknown;
    arguments: unknown;
    fixes: unknown;
    suggests: unknown;
    alternate_url: string;
}

export interface VacancyHH {
    id:                        string;
    premium:                   boolean;
    name:                      string;
    department:                Employment | null;
    has_test:                  boolean;
    response_letter_required:  boolean;
    area:                      Area;
    salary:                    Salary | null;
    type:                      Employment;
    address:                   Address | null;
    response_url:              null | string;
    sort_point_distance:       null;
    published_at:              string;
    created_at:                string;
    archived:                  boolean;
    apply_alternate_url:       string;
    show_logo_in_search?:      null;
    insider_interview:         null;
    url:                       string;
    alternate_url:             string;
    relations:                 unknown[];
    employer:                  Employer;
    snippet:                   Snippet;
    contacts:                  null;
    schedule:                  Employment;
    working_days:              unknown[];
    working_time_intervals:    Employment[];
    working_time_modes:        Employment[];
    accept_temporary:          boolean;
    professional_roles:        Employment[];
    accept_incomplete_resumes: boolean;
    experience:                Employment;
    employment:                Employment;
    adv_response_url:          null;
    is_adv_vacancy:            boolean;
    adv_context:               null;
}

export interface Address {
    city:           string;
    street:         string;
    building:       string;
    lat:            number;
    lng:            number;
    description:    null;
    raw:            string;
    metro:          Metro | null;
    metro_stations: Metro[];
    id:             string;
}

export interface Metro {
    station_name: string;
    line_name:    string;
    station_id:   string;
    line_id:      string;
    lat:          number;
    lng:          number;
}

export interface Area {
    id:   string;
    name: string;
    url:  string;
}

export interface Employment {
    id:   string;
    name: string;
}

export interface Employer {
    id:                     string;
    name:                   string;
    url:                    string;
    alternate_url:          string;
    logo_urls:              LogoUrls | null;
    vacancies_url:          string;
    accredited_it_employer: boolean;
    trusted:                boolean;
}

export interface LogoUrls {
    "90":     string;
    "240":    string;
    original: string;
}

export interface Salary {
    from:     number | null;
    to:       number | null;
    currency: string;
    gross:    boolean;
}

export interface Snippet {
    requirement:    null | string;
    responsibility: null | string;
}

export interface VacancyHHById extends Omit<VacancyHH, 'description'>{
    description: string;
}
