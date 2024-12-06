export interface VacancySuperjob {
  canEdit:                       boolean;
  is_closed:                     boolean;
  id:                            number;
  id_client:                     number;
  payment_from:                  number;
  payment_to:                    number;
  date_pub_to:                   number;
  date_archived:                 number;
  date_published:                number;
  address:                       string;
  profession:                    string;
  work:                          null;
  compensation:                  null;
  candidat:                      string;
  metro:                         unknown[];
  currency:                      string;
  vacancyRichText:               string;
  covid_vaccination_requirement: Agency;
  contact:                       string;
  moveable:                      boolean;
  agreement:                     boolean;
  anonymous:                     boolean;
  is_archive:                    boolean;
  is_storage:                    boolean;
  type_of_work:                  Agency;
  place_of_work:                 Agency;
  education:                     Agency;
  experience:                    Agency;
  maritalstatus:                 Agency;
  children:                      Agency;
  client:                        Client;
  languages:                     unknown[];
  driving_licence:               unknown[];
  catalogues:                    Catalogue[];
  agency:                        Agency;
  town:                          Town;
  already_sent_on_vacancy:       boolean;
  rejected:                      boolean;
  response_info:                 unknown[];
  phone:                         string;
  phones:                        Phone[];
  fax:                           null;
  faxes:                         null;
  favorite:                      boolean;
  client_logo:                   string;
  highlight:                     boolean;
  age_from:                      number;
  age_to:                        number;
  gender:                        Agency;
  firm_name:                     string;
  firm_activity:                 string;
  link:                          string;
  isBlacklisted:                 boolean;
  latitude:                      number;
  longitude:                     number;
}

export interface Agency {
  id:    number;
  title: string;
}

export interface Catalogue {
  id:         number;
  title:      string;
  key:        number;
  positions?: Catalogue[];
}

export interface Client {
  id:              number;
  title:           string;
  link:            string;
  industry:        unknown[];
  description:     string;
  vacancy_count:   number;
  staff_count:     string;
  client_logo:     string;
  address:         null;
  addresses:       unknown[];
  url:             string;
  short_reg:       boolean;
  is_blocked:      boolean;
  registered_date: number;
  town:            Town;
}

export interface Town {
  id:         number;
  title:      string;
  declension: string;
  hasMetro:   boolean;
  genitive:   string;
}

export interface Phone {
  number:           number;
  additionalNumber: null;
}
