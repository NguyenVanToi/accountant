/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface GetManyAccountResponseDto {
  data: Account[];
  count: number;
  total: number;
  page: number;
  pageCount: number;
}

export interface GetManyActivityResponseDto {
  data: Activity[];
  count: number;
  total: number;
  page: number;
  pageCount: number;
}

export interface GetManyCategoryResponseDto {
  data: Category[];
  count: number;
  total: number;
  page: number;
  pageCount: number;
}

export interface Category {
  id: number;
  code: string;
  name: string;
  image: string;
  description: string;

  /** @format date-time */
  created_at: string;

  /** @format date-time */
  updated_at: string;
  activities: Activity[];
}

export interface Activity {
  id: number;
  name: string;
  amount: number;
  type: string;
  description: string;
  images: string[];
  categoryId: number;
  accountId: number;

  /** @format date-time */
  created_at: string;

  /** @format date-time */
  updated_at: string;
  account: Account;
  category: Category;
}

export interface Account {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
  password: string;
  phoneNumber: string;
  birthday: string;
  address: string;

  /** @format date-time */
  created_at: string;

  /** @format date-time */
  updated_at: string;
  roles: Role[];
  activities: Activity[];
}

export interface Role {
  id: number;
  name: string;
  description: string;
  accounts: Account[];
}

export interface CreateAccountDto {
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  password?: string;
  phoneNumber?: string;
  birthday?: string;
  address?: string;
  roles?: Role[];
  activities?: Activity[];
}

export interface CreateManyAccountDto {
  bulk: CreateAccountDto[];
}

export interface UpdateAccountDto {
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  password?: string;
  phoneNumber?: string;
  birthday?: string;
  address?: string;
  roles?: Role[];
  activities?: Activity[];
}

export interface CreateRoleDto {
  name: string;
  description: string;
}

export interface UpdateRoleDto {
  name?: string;
  description?: string;
}

export interface CreateActivityDto {
  name?: string;
  amount?: number;
  type?: string;
  description?: string;
  images?: string[];
  categoryId?: number;
  accountId?: number;
  account?: Account;
  category?: Category;
}

export interface CreateManyActivityDto {
  bulk: CreateActivityDto[];
}

export interface UpdateActivityDto {
  name?: string;
  amount?: number;
  type?: string;
  description?: string;
  images?: string[];
  categoryId?: number;
  accountId?: number;
  account?: Account;
  category?: Category;
}

export interface CreateCategoryDto {
  code?: string;
  name?: string;
  image?: string;
  description?: string;
  activities?: Activity[];
}

export interface CreateManyCategoryDto {
  bulk: CreateCategoryDto[];
}

export interface UpdateCategoryDto {
  code?: string;
  name?: string;
  image?: string;
  description?: string;
  activities?: Activity[];
}

export interface GetManySummaryResponseDto {
  data: Summary[];
  count: number;
  total: number;
  page: number;
  pageCount: number;
}

export interface Summary {
  id: number;
  type: string;
  day: number;
  week: number;
  month: number;
  year: number;
  data: string;
  accountId: number;

  /** @format date-time */
  created_at: string;

  /** @format date-time */
  updated_at: string;
  account: Account;
}

export interface CreateSummaryDto {
  id?: number;
  type?: string;
  day?: number;
  week?: number;
  month?: number;
  year?: number;
  data?: string;
  accountId?: number;
  account?: Account;
}

export interface CreateManySummaryDto {
  bulk: CreateSummaryDto[];
}

export interface UpdateSummaryDto {
  type?: string;
  day?: number;
  week?: number;
  month?: number;
  year?: number;
  data?: string;
  accountId?: number;
  account?: Account;
}

export interface GetManyTemplateResponseDto {
  data: Template[];
  count: number;
  total: number;
  page: number;
  pageCount: number;
}

export interface Template {
  id: number;
  name: string;
  value: string;

  /** @format date-time */
  created_at: string;

  /** @format date-time */
  updated_at: string;
}

export interface CreateTemplateDto {
  id?: number;
  name?: string;
  value?: string;
}

export interface CreateManyTemplateDto {
  bulk: CreateTemplateDto[];
}

export interface UpdateTemplateDto {
  name?: string;
  value?: string;
}

export interface GetManyLenderResponseDto {
  data: Lender[];
  count: number;
  total: number;
  page: number;
  pageCount: number;
}

export interface GetManyTransactionResponseDto {
  data: Transaction[];
  count: number;
  total: number;
  page: number;
  pageCount: number;
}

export interface Transaction {
  id: number;
  rate: number;
  name: string;
  money: number;
  image: string;
  date: string;
  description: string;

  /** @format date-time */
  created_at: string;

  /** @format date-time */
  updated_at: string;
  lender: Lender;
}

export interface Lender {
  id: number;
  rate: number;
  name: string;
  money: number;
  description: string;
  date: string;

  /** @format date-time */
  created_at: string;

  /** @format date-time */
  updated_at: string;
  transactions: Transaction[];
}

export interface CreateLenderDto {
  rate?: number;
  name?: string;
  money?: number;
  description?: string;
  date?: string;
  transactions?: Transaction[];
}

export interface CreateManyLenderDto {
  bulk: CreateLenderDto[];
}

export interface UpdateLenderDto {
  rate?: number;
  name?: string;
  money?: number;
  description?: string;
  date?: string;
  transactions?: Transaction[];
}

export interface CreateTransactionDto {
  rate?: number;
  name?: string;
  money?: number;
  image?: string;
  date?: string;
  description?: string;
  lender?: Lender;
}

export interface CreateManyTransactionDto {
  bulk: CreateTransactionDto[];
}

export interface UpdateTransactionDto {
  rate?: number;
  name?: string;
  money?: number;
  image?: string;
  date?: string;
  description?: string;
  lender?: Lender;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>;

export interface FullRequestParams extends Omit<RequestInit, 'body'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  'body' | 'method' | 'query' | 'path'
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>;
  securityWorker?: (
    securityData: SecurityDataType | null
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = '';
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: 'same-origin',
    headers: {},
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  private encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(
      typeof value === 'number' ? value : `${value}`
    )}`;
  }

  private addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  private addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join('&');
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => 'undefined' !== typeof query[key]
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key)
      )
      .join('&');
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : '';
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === 'object' || typeof input === 'string')
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === 'object' && property !== null
            ? JSON.stringify(property)
            : `${property}`
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  private mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  private createAbortSignal = (
    cancelToken: CancelToken
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ''}${path}${
        queryString ? `?${queryString}` : ''
      }`,
      {
        ...requestParams,
        headers: {
          ...(type && type !== ContentType.FormData
            ? { 'Content-Type': type }
            : {}),
          ...(requestParams.headers || {}),
        },
        signal: cancelToken ? this.createAbortSignal(cancelToken) : void 0,
        body:
          typeof body === 'undefined' || body === null
            ? null
            : payloadFormatter(body),
      }
    ).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Accounting API
 * @version 1.0
 * @contact
 *
 * @Copyright Vinamilk
 */
export class Api<
  SecurityDataType extends unknown
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @name AppControllerGetHello
   * @request GET:/
   */
  appControllerGetHello = (params: RequestParams = {}) =>
    this.request<string, any>({
      path: `/`,
      method: 'GET',
      format: 'json',
      ...params,
    });

  upload = {
    /**
     * No description
     *
     * @name AppControllerUploadFile
     * @request POST:/upload
     */
    appControllerUploadFile: (params: RequestParams = {}) =>
      this.request<object[], any>({
        path: `/upload`,
        method: 'POST',
        format: 'json',
        ...params,
      }),
  };
  image = {
    /**
     * No description
     *
     * @name AppControllerFindImage
     * @request GET:/image/{imagename}
     */
    appControllerFindImage: (imagename: string, params: RequestParams = {}) =>
      this.request<object, any>({
        path: `/image/${imagename}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
  account = {
    /**
     * No description
     *
     * @tags Account
     * @name AccountControllerRegister
     * @request POST:/account/register
     */
    accountControllerRegister: (
      data: CreateAccountDto,
      params: RequestParams = {}
    ) =>
      this.request<Account, any>({
        path: `/account/register`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Account
     * @name AccountControllerLogIn
     * @request POST:/account/login
     */
    accountControllerLogIn: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/account/login`,
        method: 'POST',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Account
     * @name AccountControllerLogOut
     * @request POST:/account/log-out
     */
    accountControllerLogOut: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/account/log-out`,
        method: 'POST',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Account
     * @name GetManyBaseAccountControllerAccount
     * @summary Retrieve multiple Accounts
     * @request GET:/account
     */
    getManyBaseAccountControllerAccount: (
      query?: {
        fields?: string[];
        s?: string;
        filter?: string[];
        or?: string[];
        sort?: string[];
        join?: string[];
        limit?: number;
        offset?: number;
        page?: number;
        cache?: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<GetManyAccountResponseDto | Account[], any>({
        path: `/account`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Account
     * @name CreateOneBaseAccountControllerAccount
     * @summary Create a single Account
     * @request POST:/account
     */
    createOneBaseAccountControllerAccount: (
      data: CreateAccountDto,
      params: RequestParams = {}
    ) =>
      this.request<Account, any>({
        path: `/account`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Account
     * @name GetOneBaseAccountControllerAccount
     * @summary Retrieve a single Account
     * @request GET:/account/{id}
     */
    getOneBaseAccountControllerAccount: (
      id: number,
      query?: { fields?: string[]; join?: string[]; cache?: number },
      params: RequestParams = {}
    ) =>
      this.request<Account, any>({
        path: `/account/${id}`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Account
     * @name UpdateOneBaseAccountControllerAccount
     * @summary Update a single Account
     * @request PATCH:/account/{id}
     */
    updateOneBaseAccountControllerAccount: (
      id: number,
      data: UpdateAccountDto,
      params: RequestParams = {}
    ) =>
      this.request<Account, any>({
        path: `/account/${id}`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Account
     * @name ReplaceOneBaseAccountControllerAccount
     * @summary Replace a single Account
     * @request PUT:/account/{id}
     */
    replaceOneBaseAccountControllerAccount: (
      id: number,
      data: Account,
      params: RequestParams = {}
    ) =>
      this.request<Account, any>({
        path: `/account/${id}`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Account
     * @name DeleteOneBaseAccountControllerAccount
     * @summary Delete a single Account
     * @request DELETE:/account/{id}
     */
    deleteOneBaseAccountControllerAccount: (
      id: number,
      params: RequestParams = {}
    ) =>
      this.request<void, any>({
        path: `/account/${id}`,
        method: 'DELETE',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Account
     * @name CreateManyBaseAccountControllerAccount
     * @summary Create multiple Accounts
     * @request POST:/account/bulk
     */
    createManyBaseAccountControllerAccount: (
      data: CreateManyAccountDto,
      params: RequestParams = {}
    ) =>
      this.request<Account[], any>({
        path: `/account/bulk`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
  role = {
    /**
     * No description
     *
     * @tags Role
     * @name RoleControllerCreate
     * @request POST:/role
     */
    roleControllerCreate: (data: CreateRoleDto, params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/role`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Role
     * @name RoleControllerFindAll
     * @request GET:/role
     */
    roleControllerFindAll: (params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/role`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Role
     * @name RoleControllerFindOne
     * @request GET:/role/{id}
     */
    roleControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/role/${id}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Role
     * @name RoleControllerUpdate
     * @request PATCH:/role/{id}
     */
    roleControllerUpdate: (
      id: string,
      data: UpdateRoleDto,
      params: RequestParams = {}
    ) =>
      this.request<string, any>({
        path: `/role/${id}`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Role
     * @name RoleControllerRemove
     * @request DELETE:/role/{id}
     */
    roleControllerRemove: (id: string, params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/role/${id}`,
        method: 'DELETE',
        format: 'json',
        ...params,
      }),
  };
  activities = {
    /**
     * No description
     *
     * @tags Activities
     * @name GetOneBaseActivityControllerActivity
     * @summary Retrieve a single Activity
     * @request GET:/activities/{id}
     */
    getOneBaseActivityControllerActivity: (
      id: number,
      query?: { fields?: string[]; join?: string[]; cache?: number },
      params: RequestParams = {}
    ) =>
      this.request<Activity, any>({
        path: `/activities/${id}`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Activities
     * @name UpdateOneBaseActivityControllerActivity
     * @summary Update a single Activity
     * @request PATCH:/activities/{id}
     */
    updateOneBaseActivityControllerActivity: (
      id: number,
      data: UpdateActivityDto,
      params: RequestParams = {}
    ) =>
      this.request<Activity, any>({
        path: `/activities/${id}`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Activities
     * @name ReplaceOneBaseActivityControllerActivity
     * @summary Replace a single Activity
     * @request PUT:/activities/{id}
     */
    replaceOneBaseActivityControllerActivity: (
      id: number,
      data: Activity,
      params: RequestParams = {}
    ) =>
      this.request<Activity, any>({
        path: `/activities/${id}`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Activities
     * @name DeleteOneBaseActivityControllerActivity
     * @summary Delete a single Activity
     * @request DELETE:/activities/{id}
     */
    deleteOneBaseActivityControllerActivity: (
      id: number,
      params: RequestParams = {}
    ) =>
      this.request<void, any>({
        path: `/activities/${id}`,
        method: 'DELETE',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Activities
     * @name GetManyBaseActivityControllerActivity
     * @summary Retrieve multiple Activities
     * @request GET:/activities
     */
    getManyBaseActivityControllerActivity: (
      query?: {
        fields?: string[];
        s?: string;
        filter?: string[];
        or?: string[];
        sort?: string[];
        join?: string[];
        limit?: number;
        offset?: number;
        page?: number;
        cache?: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<GetManyActivityResponseDto | Activity[], any>({
        path: `/activities`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Activities
     * @name CreateOneBaseActivityControllerActivity
     * @summary Create a single Activity
     * @request POST:/activities
     */
    createOneBaseActivityControllerActivity: (
      data: CreateActivityDto,
      params: RequestParams = {}
    ) =>
      this.request<Activity, any>({
        path: `/activities`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Activities
     * @name CreateManyBaseActivityControllerActivity
     * @summary Create multiple Activities
     * @request POST:/activities/bulk
     */
    createManyBaseActivityControllerActivity: (
      data: CreateManyActivityDto,
      params: RequestParams = {}
    ) =>
      this.request<Activity[], any>({
        path: `/activities/bulk`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
  category = {
    /**
     * No description
     *
     * @tags Categories
     * @name GetOneBaseCategoryControllerCategory
     * @summary Retrieve a single Category
     * @request GET:/category/{id}
     */
    getOneBaseCategoryControllerCategory: (
      id: number,
      query?: { fields?: string[]; join?: string[]; cache?: number },
      params: RequestParams = {}
    ) =>
      this.request<Category, any>({
        path: `/category/${id}`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Categories
     * @name UpdateOneBaseCategoryControllerCategory
     * @summary Update a single Category
     * @request PATCH:/category/{id}
     */
    updateOneBaseCategoryControllerCategory: (
      id: number,
      data: UpdateCategoryDto,
      params: RequestParams = {}
    ) =>
      this.request<Category, any>({
        path: `/category/${id}`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Categories
     * @name ReplaceOneBaseCategoryControllerCategory
     * @summary Replace a single Category
     * @request PUT:/category/{id}
     */
    replaceOneBaseCategoryControllerCategory: (
      id: number,
      data: Category,
      params: RequestParams = {}
    ) =>
      this.request<Category, any>({
        path: `/category/${id}`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Categories
     * @name DeleteOneBaseCategoryControllerCategory
     * @summary Delete a single Category
     * @request DELETE:/category/{id}
     */
    deleteOneBaseCategoryControllerCategory: (
      id: number,
      params: RequestParams = {}
    ) =>
      this.request<void, any>({
        path: `/category/${id}`,
        method: 'DELETE',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Categories
     * @name GetManyBaseCategoryControllerCategory
     * @summary Retrieve multiple Categories
     * @request GET:/category
     */
    getManyBaseCategoryControllerCategory: (
      query?: {
        fields?: string[];
        s?: string;
        filter?: string[];
        or?: string[];
        sort?: string[];
        join?: string[];
        limit?: number;
        offset?: number;
        page?: number;
        cache?: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<GetManyCategoryResponseDto | Category[], any>({
        path: `/category`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Categories
     * @name CreateOneBaseCategoryControllerCategory
     * @summary Create a single Category
     * @request POST:/category
     */
    createOneBaseCategoryControllerCategory: (
      data: CreateCategoryDto,
      params: RequestParams = {}
    ) =>
      this.request<Category, any>({
        path: `/category`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Categories
     * @name CreateManyBaseCategoryControllerCategory
     * @summary Create multiple Categories
     * @request POST:/category/bulk
     */
    createManyBaseCategoryControllerCategory: (
      data: CreateManyCategoryDto,
      params: RequestParams = {}
    ) =>
      this.request<Category[], any>({
        path: `/category/bulk`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
  summary = {
    /**
     * No description
     *
     * @tags Summaries
     * @name GetOneBaseSummaryControllerSummary
     * @summary Retrieve a single Summary
     * @request GET:/summary/{id}
     */
    getOneBaseSummaryControllerSummary: (
      id: number,
      query?: { fields?: string[]; join?: string[]; cache?: number },
      params: RequestParams = {}
    ) =>
      this.request<Summary, any>({
        path: `/summary/${id}`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Summaries
     * @name UpdateOneBaseSummaryControllerSummary
     * @summary Update a single Summary
     * @request PATCH:/summary/{id}
     */
    updateOneBaseSummaryControllerSummary: (
      id: number,
      data: UpdateSummaryDto,
      params: RequestParams = {}
    ) =>
      this.request<Summary, any>({
        path: `/summary/${id}`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Summaries
     * @name ReplaceOneBaseSummaryControllerSummary
     * @summary Replace a single Summary
     * @request PUT:/summary/{id}
     */
    replaceOneBaseSummaryControllerSummary: (
      id: number,
      data: Summary,
      params: RequestParams = {}
    ) =>
      this.request<Summary, any>({
        path: `/summary/${id}`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Summaries
     * @name DeleteOneBaseSummaryControllerSummary
     * @summary Delete a single Summary
     * @request DELETE:/summary/{id}
     */
    deleteOneBaseSummaryControllerSummary: (
      id: number,
      params: RequestParams = {}
    ) =>
      this.request<void, any>({
        path: `/summary/${id}`,
        method: 'DELETE',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Summaries
     * @name GetManyBaseSummaryControllerSummary
     * @summary Retrieve multiple Summaries
     * @request GET:/summary
     */
    getManyBaseSummaryControllerSummary: (
      query?: {
        fields?: string[];
        s?: string;
        filter?: string[];
        or?: string[];
        sort?: string[];
        join?: string[];
        limit?: number;
        offset?: number;
        page?: number;
        cache?: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<GetManySummaryResponseDto | Summary[], any>({
        path: `/summary`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Summaries
     * @name CreateOneBaseSummaryControllerSummary
     * @summary Create a single Summary
     * @request POST:/summary
     */
    createOneBaseSummaryControllerSummary: (
      data: CreateSummaryDto,
      params: RequestParams = {}
    ) =>
      this.request<Summary, any>({
        path: `/summary`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Summaries
     * @name CreateManyBaseSummaryControllerSummary
     * @summary Create multiple Summaries
     * @request POST:/summary/bulk
     */
    createManyBaseSummaryControllerSummary: (
      data: CreateManySummaryDto,
      params: RequestParams = {}
    ) =>
      this.request<Summary[], any>({
        path: `/summary/bulk`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
  template = {
    /**
     * No description
     *
     * @tags Template
     * @name GetOneBaseTemplateControllerTemplate
     * @summary Retrieve a single Template
     * @request GET:/template/{id}
     */
    getOneBaseTemplateControllerTemplate: (
      id: number,
      query?: { fields?: string[]; join?: string[]; cache?: number },
      params: RequestParams = {}
    ) =>
      this.request<Template, any>({
        path: `/template/${id}`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Template
     * @name UpdateOneBaseTemplateControllerTemplate
     * @summary Update a single Template
     * @request PATCH:/template/{id}
     */
    updateOneBaseTemplateControllerTemplate: (
      id: number,
      data: UpdateTemplateDto,
      params: RequestParams = {}
    ) =>
      this.request<Template, any>({
        path: `/template/${id}`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Template
     * @name ReplaceOneBaseTemplateControllerTemplate
     * @summary Replace a single Template
     * @request PUT:/template/{id}
     */
    replaceOneBaseTemplateControllerTemplate: (
      id: number,
      data: Template,
      params: RequestParams = {}
    ) =>
      this.request<Template, any>({
        path: `/template/${id}`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Template
     * @name DeleteOneBaseTemplateControllerTemplate
     * @summary Delete a single Template
     * @request DELETE:/template/{id}
     */
    deleteOneBaseTemplateControllerTemplate: (
      id: number,
      params: RequestParams = {}
    ) =>
      this.request<void, any>({
        path: `/template/${id}`,
        method: 'DELETE',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Template
     * @name GetManyBaseTemplateControllerTemplate
     * @summary Retrieve multiple Templates
     * @request GET:/template
     */
    getManyBaseTemplateControllerTemplate: (
      query?: {
        fields?: string[];
        s?: string;
        filter?: string[];
        or?: string[];
        sort?: string[];
        join?: string[];
        limit?: number;
        offset?: number;
        page?: number;
        cache?: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<GetManyTemplateResponseDto | Template[], any>({
        path: `/template`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Template
     * @name CreateOneBaseTemplateControllerTemplate
     * @summary Create a single Template
     * @request POST:/template
     */
    createOneBaseTemplateControllerTemplate: (
      data: CreateTemplateDto,
      params: RequestParams = {}
    ) =>
      this.request<Template, any>({
        path: `/template`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Template
     * @name CreateManyBaseTemplateControllerTemplate
     * @summary Create multiple Templates
     * @request POST:/template/bulk
     */
    createManyBaseTemplateControllerTemplate: (
      data: CreateManyTemplateDto,
      params: RequestParams = {}
    ) =>
      this.request<Template[], any>({
        path: `/template/bulk`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
  lender = {
    /**
     * No description
     *
     * @tags Lenders
     * @name LenderControllerLendersWithTransactions
     * @request GET:/lender/lendersWithTransactions
     */
    lenderControllerLendersWithTransactions: (params: RequestParams = {}) =>
      this.request<object[], any>({
        path: `/lender/lendersWithTransactions`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Lenders
     * @name GetOneBaseLenderControllerLender
     * @summary Retrieve a single Lender
     * @request GET:/lender/{id}
     */
    getOneBaseLenderControllerLender: (
      id: number,
      query?: { fields?: string[]; join?: string[]; cache?: number },
      params: RequestParams = {}
    ) =>
      this.request<Lender, any>({
        path: `/lender/${id}`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Lenders
     * @name UpdateOneBaseLenderControllerLender
     * @summary Update a single Lender
     * @request PATCH:/lender/{id}
     */
    updateOneBaseLenderControllerLender: (
      id: number,
      data: UpdateLenderDto,
      params: RequestParams = {}
    ) =>
      this.request<Lender, any>({
        path: `/lender/${id}`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Lenders
     * @name ReplaceOneBaseLenderControllerLender
     * @summary Replace a single Lender
     * @request PUT:/lender/{id}
     */
    replaceOneBaseLenderControllerLender: (
      id: number,
      data: Lender,
      params: RequestParams = {}
    ) =>
      this.request<Lender, any>({
        path: `/lender/${id}`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Lenders
     * @name DeleteOneBaseLenderControllerLender
     * @summary Delete a single Lender
     * @request DELETE:/lender/{id}
     */
    deleteOneBaseLenderControllerLender: (
      id: number,
      params: RequestParams = {}
    ) =>
      this.request<void, any>({
        path: `/lender/${id}`,
        method: 'DELETE',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Lenders
     * @name GetManyBaseLenderControllerLender
     * @summary Retrieve multiple Lenders
     * @request GET:/lender
     */
    getManyBaseLenderControllerLender: (
      query?: {
        fields?: string[];
        s?: string;
        filter?: string[];
        or?: string[];
        sort?: string[];
        join?: string[];
        limit?: number;
        offset?: number;
        page?: number;
        cache?: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<GetManyLenderResponseDto | Lender[], any>({
        path: `/lender`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Lenders
     * @name CreateOneBaseLenderControllerLender
     * @summary Create a single Lender
     * @request POST:/lender
     */
    createOneBaseLenderControllerLender: (
      data: CreateLenderDto,
      params: RequestParams = {}
    ) =>
      this.request<Lender, any>({
        path: `/lender`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Lenders
     * @name CreateManyBaseLenderControllerLender
     * @summary Create multiple Lenders
     * @request POST:/lender/bulk
     */
    createManyBaseLenderControllerLender: (
      data: CreateManyLenderDto,
      params: RequestParams = {}
    ) =>
      this.request<Lender[], any>({
        path: `/lender/bulk`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
  transaction = {
    /**
     * No description
     *
     * @tags Transactions
     * @name TransactionControllerGetTransactionsOfLender
     * @request GET:/transaction/getTransactionsOfLender/{lenderId}
     */
    transactionControllerGetTransactionsOfLender: (
      lenderId: number,
      params: RequestParams = {}
    ) =>
      this.request<Transaction[], any>({
        path: `/transaction/getTransactionsOfLender/${lenderId}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Transactions
     * @name GetOneBaseTransactionControllerTransaction
     * @summary Retrieve a single Transaction
     * @request GET:/transaction/{id}
     */
    getOneBaseTransactionControllerTransaction: (
      id: number,
      query?: { fields?: string[]; join?: string[]; cache?: number },
      params: RequestParams = {}
    ) =>
      this.request<Transaction, any>({
        path: `/transaction/${id}`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Transactions
     * @name UpdateOneBaseTransactionControllerTransaction
     * @summary Update a single Transaction
     * @request PATCH:/transaction/{id}
     */
    updateOneBaseTransactionControllerTransaction: (
      id: number,
      data: UpdateTransactionDto,
      params: RequestParams = {}
    ) =>
      this.request<Transaction, any>({
        path: `/transaction/${id}`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Transactions
     * @name ReplaceOneBaseTransactionControllerTransaction
     * @summary Replace a single Transaction
     * @request PUT:/transaction/{id}
     */
    replaceOneBaseTransactionControllerTransaction: (
      id: number,
      data: Transaction,
      params: RequestParams = {}
    ) =>
      this.request<Transaction, any>({
        path: `/transaction/${id}`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Transactions
     * @name DeleteOneBaseTransactionControllerTransaction
     * @summary Delete a single Transaction
     * @request DELETE:/transaction/{id}
     */
    deleteOneBaseTransactionControllerTransaction: (
      id: number,
      params: RequestParams = {}
    ) =>
      this.request<void, any>({
        path: `/transaction/${id}`,
        method: 'DELETE',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Transactions
     * @name GetManyBaseTransactionControllerTransaction
     * @summary Retrieve multiple Transactions
     * @request GET:/transaction
     */
    getManyBaseTransactionControllerTransaction: (
      query?: {
        fields?: string[];
        s?: string;
        filter?: string[];
        or?: string[];
        sort?: string[];
        join?: string[];
        limit?: number;
        offset?: number;
        page?: number;
        cache?: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<GetManyTransactionResponseDto | Transaction[], any>({
        path: `/transaction`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Transactions
     * @name CreateOneBaseTransactionControllerTransaction
     * @summary Create a single Transaction
     * @request POST:/transaction
     */
    createOneBaseTransactionControllerTransaction: (
      data: CreateTransactionDto,
      params: RequestParams = {}
    ) =>
      this.request<Transaction, any>({
        path: `/transaction`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Transactions
     * @name CreateManyBaseTransactionControllerTransaction
     * @summary Create multiple Transactions
     * @request POST:/transaction/bulk
     */
    createManyBaseTransactionControllerTransaction: (
      data: CreateManyTransactionDto,
      params: RequestParams = {}
    ) =>
      this.request<Transaction[], any>({
        path: `/transaction/bulk`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
}
