import ky from "ky";

const domain = process.env.VUE_APP_MICROCMS_DOMAIN || null;
const version = "v1";

const headers = {
  "X-MICROCMS-API-KEY": process.env.VUE_APP_MICROCMS_API_KEY || undefined,
};

interface Response {
  contents: unknown[];
  limit: number;
  offset: number;
  totalCount: number;
}

interface Params {
  [key: string]: unknown;
}

export const client = async (
  path: string,
  params?: Params
): Promise<Response> => {
  if (!domain) {
    throw new Error("no VUE_APP_MICROCMS_DOMAIN");
  }
  const json: Response = await ky
    .get(`https://${domain}/api/${version}/${path}`, { headers, json: params })
    .json();
  return json;
};
