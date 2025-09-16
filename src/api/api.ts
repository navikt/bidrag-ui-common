import { useApi } from "../react_components/hooks";
import { Api as PersonApi } from "./PersonApi";

export const PERSON_API = useApi(
    new PersonApi({ baseURL: process.env.BIDRAG_PERSON_URL }),
    "bidrag-person",
    "fss",
    process.env.ENVIRONMENT
);
