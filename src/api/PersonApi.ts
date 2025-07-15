/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export enum Adressetype {
  BOSTEDSADRESSE = "BOSTEDSADRESSE",
  KONTAKTADRESSE = "KONTAKTADRESSE",
  OPPHOLDSADRESSE = "OPPHOLDSADRESSE",
  DELT_BOSTED = "DELT_BOSTED",
}

export enum SivilstandskodePDL {
  GIFT = "GIFT",
  UGIFT = "UGIFT",
  UOPPGITT = "UOPPGITT",
  ENKE_ELLER_ENKEMANN = "ENKE_ELLER_ENKEMANN",
  SKILT = "SKILT",
  SEPARERT = "SEPARERT",
  REGISTRERT_PARTNER = "REGISTRERT_PARTNER",
  SEPARERT_PARTNER = "SEPARERT_PARTNER",
  SKILT_PARTNER = "SKILT_PARTNER",
  GJENLEVENDE_PARTNER = "GJENLEVENDE_PARTNER",
}

export interface PersonRequest {
  ident: string;
}

export interface SivilstandPdlDto {
  type?: SivilstandskodePDL;
  /** @format date */
  gyldigFom?: string;
  relatertVedSivilstand?: string;
  /** @format date */
  bekreftelsesdato?: string;
  master?: string;
  /** @format date-time */
  registrert?: string;
  historisk?: boolean;
}

export interface SivilstandPdlHistorikkDto {
  /** Liste over alle hentede forekomster av sivilstand fra bidrag-person */
  sivilstandPdlDto: SivilstandPdlDto[];
}

export interface HentePersonidenterRequest {
  ident: string;
  /** @uniqueItems true */
  grupper: ("AKTORID" | "FOLKEREGISTERIDENT" | "NPID")[];
  inkludereHistoriske: boolean;
}

export interface PersonidentDto {
  ident: string;
  historisk: boolean;
  gruppe: "AKTORID" | "FOLKEREGISTERIDENT" | "NPID";
}

export interface NavnFodselDodDto {
  /** Gir navn, fødselsdato og fødselsår for angitt person. Fødselsår finnes for alle i PDL(men ikke opphørte personer), mens noen ikke har utfyllt fødselsdato */
  navn: string;
  /** @format date */
  fødselsdato?: string;
  /** @format int32 */
  fødselsår?: number;
  /**
   * Eventuell dødsdato til personen
   * @format date
   */
  dødsdato?: string;
  /**
   * Skrivefeil
   * @deprecated
   * @format date
   */
  foedselsdato?: string;
  /**
   * Skrivefeil
   * @deprecated
   * @format int32
   */
  foedselsaar?: number;
  /**
   * Eventuell dødsdato til personen
   * @deprecated
   * @format date
   */
  doedsdato?: string;
}

export interface MotpartBarnRelasjon {
  forelderrolleMotpart:
    | "BARN"
    | "FAR"
    | "MEDMOR"
    | "MOR"
    | "INGEN"
    | "FORELDER"
    | "EKTEFELLE"
    | "MOTPART_TIL_FELLES_BARN"
    | "UKJENT";
  motpart?: PersonDto;
  fellesBarn: PersonDto[];
}

export interface MotpartBarnRelasjonDto {
  /** Identen til personen */
  person: PersonDto;
  /** Familieenheter til personen */
  personensMotpartBarnRelasjon: MotpartBarnRelasjon[];
}

export interface PersonDto {
  /** Identen til personen */
  ident: string;
  /** Navn til personen, format <Etternavn, Fornavn Middelnavn> */
  navn?: string;
  /** Fornavn til personen */
  fornavn?: string;
  /** Mellomnavn til personen */
  mellomnavn?: string;
  /** Etternavn til personen */
  etternavn?: string;
  /** Kjønn til personen */
  kjønn?: "KVINNE" | "MANN" | "UKJENT";
  /**
   * Kjønn til personen
   * @deprecated
   */
  kjoenn?: "KVINNE" | "MANN" | "UKJENT";
  /**
   * Dødsdato til personen
   * @format date
   */
  dødsdato?: string;
  /**
   * Dødsdato til personen
   * @deprecated
   * @format date
   */
  doedsdato?: string;
  /**
   * Fødselsdato til personen
   * @format date
   */
  fødselsdato?: string;
  /**
   * Fødselsdato til personen
   * @deprecated
   * @format date
   */
  foedselsdato?: string;
  /** Diskresjonskode (personvern) */
  diskresjonskode?: "SPSF" | "SPFO" | "URIK" | "MILI" | "PEND" | "SVAL" | "P19";
  /** Aktør id til personen */
  aktørId?: string;
  /**
   * Aktør id til personen
   * @deprecated
   */
  aktoerId?: string;
  /** Kortnavn på personen, navn som benyttes ved maskinelle utskrifter (maks 40 tegn) */
  kortnavn?: string;
  /**
   * Kortnavn på personen, navn som benyttes ved maskinelle utskrifter (maks 40 tegn)
   * @deprecated
   */
  kortNavn?: string;
  /** Navn som benyttes for visning av personavn i skjermbilder og dokumenter */
  visningsnavn: string;
}

export interface DodsboDto {
  /** Fra Tingretten angis skifteformen for booppgjøret. */
  skifteform: "OFFENTLIG" | "ANNET";
  /**
   * Attestutstedelsesdato for skifteattest.
   * @format date
   */
  attestutstedelsesdato: string;
  /** Kontaktadresse i Norge eller utlandet for person, advokat eller oganisasjon. */
  kontaktadresse: DodsboKontaktadresse;
  /** Navn på kontaktperson for dødsboet. Dette kan være en person, advokat eller oganisasjon. */
  kontaktperson: string;
}

export interface DodsboKontaktadresse {
  /** Adresselinje 1 */
  adresselinje1: string;
  /** Adresselinje 2 */
  adresselinje2?: string;
  /** Postnummer. */
  postnummer: string;
  /** Poststed */
  poststed: string;
  /** Landkode 3 siffer. */
  land3?: string;
}

/** Representerer kontonummer for en person. For norske kontonummer er det kun norskKontornr som er utfyllt, ellers benyttes de andre feltene for utlandske kontonummer. */
export interface KontonummerDto {
  /** Norsk kontonummer, 11 siffer. */
  norskKontonr?: string;
  /** IBAN angir kontonummeret på et internasjonalt format. */
  iban?: string;
  /** SWIFT angir banken på et internasjonalt format */
  swift?: string;
  /** Bankens navn. */
  banknavn?: string;
  /** Bankens landkode. */
  banklandkode?: string;
  /** BankCode. Format varierer. */
  bankkode?: string;
  /**
   * Bankkode. Format varierer.
   * @deprecated
   */
  bankcode?: string;
  /** Kontoens valuta. */
  valutakode?: string;
  /** Adressefelt 1, utenlandsk bank */
  bankadresse1?: string;
  /** Adressefelt 2, utenlandsk bank */
  bankadresse2?: string;
  /** Adressefelt 3, utenlandsk bank */
  bankadresse3?: string;
  /** Tilleggsinformasjon */
  metadata: MetadataDto;
}

export interface MetadataDto {
  /** @format date-time */
  gyldigFom: string;
  opprettetAv: string;
  kilde?: string;
}

export interface PersonAdresseDto {
  /** Gyldige adressetyper: BOSTEDSADRESSE, KONTAKTADRESSE, eller OPPHOLDSADRESSE */
  adressetype: Adressetype;
  /** Adresselinje 1 */
  adresselinje1?: string;
  /** Adresselinje 2 */
  adresselinje2?: string;
  /** Adresselinje 3 */
  adresselinje3?: string;
  /** Bruksenhetsnummer */
  bruksenhetsnummer?: string;
  /** Postnummer, tilgjengelig hvis norsk adresse */
  postnummer?: string;
  /** Poststed, tilgjengelig hvis norsk adresse */
  poststed?: string;
  /** To-bokstavers landkode ihht iso3166-1 alfa-2 */
  land: string;
  /** Trebokstavs landkode ihht iso3166-1 alfa-3 */
  land3: string;
}

/** Representerer en person med tilhørende informasjon om navn, fødselsdato, adresse, gradering, språk, dødsdato, dødsbo og tidligere identer */
export interface PersondetaljerDto {
  person: PersonDto;
  adresse?: PersonAdresseDto;
  /** Representerer kontonummer for en person. For norske kontonummer er det kun norskKontornr som er utfyllt, ellers benyttes de andre feltene for utlandske kontonummer. */
  kontonummer?: KontonummerDto;
  dødsbo?: DodsboDto;
  språk?: string;
  /** Liste over tidligere identer personen har hatt. */
  tidligereIdenter?: string[];
}

export interface HusstandsmedlemmerRequest {
  personRequest: PersonRequest;
  /** @format date */
  periodeFra?: string;
}

export interface Husstand {
  /** @format date */
  gyldigFraOgMed?: string;
  /** @format date */
  gyldigTilOgMed?: string;
  adressenavn?: string;
  husnummer?: string;
  husbokstav?: string;
  bruksenhetsnummer?: string;
  postnummer?: string;
  bydelsnummer?: string;
  kommunenummer?: string;
  /** @format int64 */
  matrikkelId?: number;
  husstandsmedlemListe: Husstandsmedlem[];
}

export interface Husstandsmedlem {
  /** @format date */
  gyldigFraOgMed?: string;
  /** @format date */
  gyldigTilOgMed?: string;
  personId: string;
  navn: string;
  /** @format date */
  fødselsdato?: string;
  /** @format date */
  dødsdato?: string;
  /**
   * Skrivefeil
   * @deprecated
   * @format date
   */
  foedselsdato?: string;
  /**
   * Skrivefeil
   * @deprecated
   * @format date
   */
  doedsdato?: string;
}

export interface HusstandsmedlemmerDto {
  /** Periodiser liste over husstander og dens medlemmer i perioden */
  husstandListe: Husstand[];
}

export interface Graderingsinfo {
  /** Map med ident til gradering. */
  identerTilGradering: Record<
    string,
    "STRENGT_FORTROLIG" | "FORTROLIG" | "STRENGT_FORTROLIG_UTLAND" | "UGRADERT"
  >;
  /** Hvor vidt hovedident fra GraderingQuery er skjerment. */
  identerTilSkjerming: Record<string, boolean>;
}

export interface GeografiskTilknytningDto {
  /** Identen til personen */
  ident: string;
  /** Aktørid til personen */
  aktørId?: string;
  /**
   * Aktørid til personen
   * @deprecated
   */
  aktoerId?: string;
  /** Geografisk tilknytning til personen */
  geografiskTilknytning?: string;
  /** Om geografisk tilknytning til personen er utlandet. Geografisktilknytning feltet vil da ha landkode istedenfor kommune/bydel nummer */
  erUtland: boolean;
  /** Diskresjonskode (personvern) */
  diskresjonskode?: "SPSF" | "SPFO" | "URIK" | "MILI" | "PEND" | "SVAL" | "P19";
}

export interface ForelderBarnRelasjon {
  minRolleForPerson:
    | "BARN"
    | "FAR"
    | "MEDMOR"
    | "MOR"
    | "INGEN"
    | "FORELDER"
    | "EKTEFELLE"
    | "MOTPART_TIL_FELLES_BARN"
    | "UKJENT";
  relatertPersonsIdent?: string;
  /** Hvilken rolle personen i requesten har til personen i responsen */
  relatertPersonsRolle:
    | "BARN"
    | "FAR"
    | "MEDMOR"
    | "MOR"
    | "INGEN"
    | "FORELDER"
    | "EKTEFELLE"
    | "MOTPART_TIL_FELLES_BARN"
    | "UKJENT";
}

export interface ForelderBarnRelasjonDto {
  /** Liste over alle hentede forekomster av foreldre-barnrelasjoner */
  forelderBarnRelasjon: ForelderBarnRelasjon[];
}

export interface Fodselsdatoer {
  /** Map med ident til fødselsdato-elementer. */
  identerTilDatoer: Record<string, string>;
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType,
} from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL:
        axiosConfig.baseURL ||
        "https://bidrag-person-q2.dev.intern.nav.no/bidrag-person",
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem),
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === "object"
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== "string"
    ) {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title bidrag-person
 * @version v1
 * @baseUrl https://bidrag-person-q2.dev.intern.nav.no/bidrag-person
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  spraak = {
    /**
     * @description Henter personens språk fra Kontakt- og reservasjonsregisteret
     *
     * @tags person-controller
     * @name HentPersonSpraak
     * @request POST:/spraak
     * @secure
     */
    hentPersonSpraak: (data: PersonRequest, params: RequestParams = {}) =>
      this.request<string, string>({
        path: `/spraak`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  sivilstand = {
    /**
     * @description Hent sivilstand for en person
     *
     * @tags person-controller
     * @name HentSivilstand
     * @request POST:/sivilstand
     * @secure
     */
    hentSivilstand: (data: PersonRequest, params: RequestParams = {}) =>
      this.request<SivilstandPdlHistorikkDto, any>({
        path: `/sivilstand`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  personidenter = {
    /**
     * @description Henter alle identer som er registrert for en person
     *
     * @tags person-controller
     * @name HentePersonidenter
     * @request POST:/personidenter
     * @secure
     */
    hentePersonidenter: (
      data: HentePersonidenterRequest,
      params: RequestParams = {},
    ) =>
      this.request<PersonidentDto[], any>({
        path: `/personidenter`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  navnfoedseldoed = {
    /**
     * @description Hent informasjon om en persons navn, fødselsdata og eventuell død
     *
     * @tags person-controller
     * @name HentNavnFoedselDoed
     * @request POST:/navnfoedseldoed
     * @secure
     */
    hentNavnFoedselDoed: (data: PersonRequest, params: RequestParams = {}) =>
      this.request<NavnFodselDodDto, any>({
        path: `/navnfoedseldoed`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Hent informasjon om en persons navn, fødselsdata og eventuell død
     *
     * @tags person-controller
     * @name GetNavnFoedselDoed
     * @request GET:/navnfoedseldoed/{ident}
     * @deprecated
     * @secure
     */
    getNavnFoedselDoed: (ident: string, params: RequestParams = {}) =>
      this.request<NavnFodselDodDto, any>({
        path: `/navnfoedseldoed/${ident}`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
  motpartbarnrelasjon = {
    /**
     * @description Hent motpart-barn relasjon til en person
     *
     * @tags person-controller
     * @name GetPersonensMotpartBarnRelasjon
     * @request POST:/motpartbarnrelasjon
     * @secure
     */
    getPersonensMotpartBarnRelasjon: (
      data: PersonRequest,
      params: RequestParams = {},
    ) =>
      this.request<MotpartBarnRelasjonDto, MotpartBarnRelasjonDto>({
        path: `/motpartbarnrelasjon`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  informasjon = {
    /**
     * @description Hent informasjon om person. Dette innebærer fornavn/etternavn, fødselsdato, adresse, gradering, språk, dødsdato, dødsbo og tidligere identer. Dette endepunktet er ikke cached.
     *
     * @tags person-controller
     * @name HentPersoninformasjonDetaljer
     * @request POST:/informasjon/detaljer
     * @secure
     */
    hentPersoninformasjonDetaljer: (
      data: PersonRequest,
      params: RequestParams = {},
    ) =>
      this.request<PersondetaljerDto, PersondetaljerDto>({
        path: `/informasjon/detaljer`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Hent informasjon om en person
     *
     * @tags person-controller
     * @name HentPersonPost
     * @request POST:/informasjon/
     * @secure
     */
    hentPersonPost: (data: PersonRequest, params: RequestParams = {}) =>
      this.request<PersonDto, PersonDto>({
        path: `/informasjon/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Hent informasjon om en person
     *
     * @tags person-controller
     * @name HentPerson
     * @request GET:/informasjon
     * @deprecated
     * @secure
     */
    hentPerson: (params: RequestParams = {}) =>
      this.request<PersonDto, PersonDto>({
        path: `/informasjon`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * @description Hent informasjon om en person
     *
     * @tags person-controller
     * @name HentPersonPost1
     * @request POST:/informasjon
     * @secure
     */
    hentPersonPost1: (data: PersonRequest, params: RequestParams = {}) =>
      this.request<PersonDto, PersonDto>({
        path: `/informasjon`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Hent informasjon om en person
     *
     * @tags person-controller
     * @name HentPerson1
     * @request GET:/informasjon/{ident}
     * @deprecated
     * @secure
     */
    hentPerson1: (ident: string, params: RequestParams = {}) =>
      this.request<PersonDto, PersonDto>({
        path: `/informasjon/${ident}`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
  husstandsmedlemskapbarn = {
    /**
     * @description Hent alle barn til angitt person som har delt bolig med personen og informasjon om de ulike periodene
     *
     * @tags person-controller
     * @name HentHusstandsmedlemskapBarn
     * @request POST:/husstandsmedlemskapbarn
     * @secure
     */
    hentHusstandsmedlemskapBarn: (
      data: HusstandsmedlemmerRequest,
      params: RequestParams = {},
    ) =>
      this.request<HusstandsmedlemmerDto, any>({
        path: `/husstandsmedlemskapbarn`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  husstandsmedlemmer = {
    /**
     * @description Hent alle personer som bor i samme husstand som angitt person
     *
     * @tags person-controller
     * @name HentHusstandsmedlemmer
     * @request POST:/husstandsmedlemmer
     * @secure
     */
    hentHusstandsmedlemmer: (
      data: HusstandsmedlemmerRequest,
      params: RequestParams = {},
    ) =>
      this.request<HusstandsmedlemmerDto, any>({
        path: `/husstandsmedlemmer`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Hent alle personer som bor i samme husstand som angitt person
     *
     * @tags person-controller
     * @name GetHusstandsmedlemmer
     * @request GET:/husstandsmedlemmer/{ident}
     * @deprecated
     * @secure
     */
    getHusstandsmedlemmer: (ident: string, params: RequestParams = {}) =>
      this.request<HusstandsmedlemmerDto, any>({
        path: `/husstandsmedlemmer/${ident}`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
  graderingsinfo = {
    /**
     * @description Hent graderingsinfo for en liste med personer
     *
     * @tags person-controller
     * @name HentGraderinger
     * @request POST:/graderingsinfo
     * @secure
     */
    hentGraderinger: (data: string[], params: RequestParams = {}) =>
      this.request<Graderingsinfo, any>({
        path: `/graderingsinfo`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  geografisktilknytning = {
    /**
     * @description Hent informasjon om geografisk tilknytning for en person
     *
     * @tags person-controller
     * @name HentGeografiskTilknytning
     * @request POST:/geografisktilknytning
     * @secure
     */
    hentGeografiskTilknytning: (
      data: PersonRequest,
      params: RequestParams = {},
    ) =>
      this.request<GeografiskTilknytningDto, any>({
        path: `/geografisktilknytning`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Hent informasjon om geografisk tilknytning for en person
     *
     * @tags person-controller
     * @name GetGeografiskTilknytning
     * @request GET:/geografisktilknytning/{ident}
     * @deprecated
     * @secure
     */
    getGeografiskTilknytning: (ident: string, params: RequestParams = {}) =>
      this.request<GeografiskTilknytningDto, any>({
        path: `/geografisktilknytning/${ident}`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
  geografiskTilknytning = {
    /**
     * @description Hent informasjon om geografisk tilknytning for en person
     *
     * @tags person-controller
     * @name HentGeografiskTilknytning1
     * @request POST:/geografisk_tilknytning
     * @secure
     */
    hentGeografiskTilknytning1: (data: string, params: RequestParams = {}) =>
      this.request<GeografiskTilknytningDto, any>({
        path: `/geografisk_tilknytning`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  forelderbarnrelasjoner = {
    /**
     * @description Hent alle forelder/barn-relasjoner for en person
     *
     * @tags person-controller
     * @name HentForelderBarnRelasjon
     * @request POST:/forelderbarnrelasjoner
     * @secure
     */
    hentForelderBarnRelasjon: (data: string, params: RequestParams = {}) =>
      this.request<ForelderBarnRelasjonDto, any>({
        path: `/forelderbarnrelasjoner`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  forelderbarnrelasjon = {
    /**
     * @description Hent alle forelder/barn-relasjoner for en person
     *
     * @tags person-controller
     * @name HentForelderBarnRelasjon1
     * @request POST:/forelderbarnrelasjon
     * @secure
     */
    hentForelderBarnRelasjon1: (
      data: PersonRequest,
      params: RequestParams = {},
    ) =>
      this.request<ForelderBarnRelasjonDto, any>({
        path: `/forelderbarnrelasjon`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Hent alle forelder/barn-relasjoner for en person
     *
     * @tags person-controller
     * @name GetForelderBarnRelasjon
     * @request GET:/forelderbarnrelasjon/{ident}
     * @deprecated
     * @secure
     */
    getForelderBarnRelasjon: (ident: string, params: RequestParams = {}) =>
      this.request<ForelderBarnRelasjonDto, any>({
        path: `/forelderbarnrelasjon/${ident}`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
  fodselsdatoer = {
    /**
     * @description Hent fødselsdatoer for en liste med personer
     *
     * @tags person-controller
     * @name HentFodselsdatoer
     * @request POST:/fodselsdatoer
     * @secure
     */
    hentFodselsdatoer: (data: string[], params: RequestParams = {}) =>
      this.request<Fodselsdatoer, any>({
        path: `/fodselsdatoer`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  adresse = {
    /**
     * @description Henter registrerte adresser for person
     *
     * @tags person-controller
     * @name HentPersonAdresser
     * @request POST:/adresse
     * @secure
     */
    hentPersonAdresser: (
      query: {
        personident: any;
        /**
         * Settes til true for å hente postadresse til person.
         * @example true
         */
        "hente-postadresse"?: any;
      },
      data: PersonRequest,
      params: RequestParams = {},
    ) =>
      this.request<PersonAdresseDto[], PersonAdresseDto[]>({
        path: `/adresse`,
        method: "POST",
        query: query,
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Hent postadresse for person
     *
     * @tags person-controller
     * @name HentPersonPostadresse
     * @request POST:/adresse/post
     * @secure
     */
    hentPersonPostadresse: (
      query: {
        personident: any;
      },
      data: PersonRequest,
      params: RequestParams = {},
    ) =>
      this.request<PersonAdresseDto, PersonAdresseDto>({
        path: `/adresse/post`,
        method: "POST",
        query: query,
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Hent postadresse for person
     *
     * @tags person-controller
     * @name HentPersonAdresse
     * @request GET:/adresse/{ident}
     * @deprecated
     * @secure
     */
    hentPersonAdresse: (ident: string, params: RequestParams = {}) =>
      this.request<PersonAdresseDto, PersonAdresseDto>({
        path: `/adresse/${ident}`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
}
