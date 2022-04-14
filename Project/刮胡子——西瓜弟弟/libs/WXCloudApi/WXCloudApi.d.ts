declare namespace egret {
    class WXDBWatcher {
        private _collection;
        private _env;
        static openCollection(name: string, env?: string): WXDBWatcher;
        startWatch(selectRule: any, callback: {
            onChange: (snapshot: DBSnapshot) => {};
            onError: (error: DBError) => {};
        }): WXDBListener;
        stopWatch(listener: WXDBListener): void;
        private init;
    }
    class WXDBListener {
        private _listener;
        constructor(listener: any);
        close(): void;
    }
    interface DBSnapshot {
        id: number;
        docChanges: [DBDocChange];
        docs: [any];
    }
    interface DBDocChange {
        dataType: string;
        queueType: string;
        id: number;
        docId: string;
        doc: any;
        updateFields: {
            key: any;
            value: any;
        };
        removeFields: string[];
    }
    interface DBError {
        errCode: number;
        errMsg: string;
    }
}
interface AuthConfig {
    persistence: "local" | "session" | "none";
}
interface Config {
    env?: string;
    token?: string;
    timeout?: number;
    proxy?: string;
    persistence?: string;
}
declare class TCBCache {
    storageClass: any;
    constructor(persistence: string);
    setStore(key: string, value: any, version?: any): void;
    getStore(key: string, version?: string): any;
    removeStore(key: any): void;
}
declare class Base {
    httpRequest: Request;
    cache: TCBCache;
    accessTokenKey: string;
    accessTokenExpireKey: string;
    refreshTokenKey: string;
    constructor(config: Config);
    setRefreshToken(refreshToken: any): void;
    getJwt(appid?: string, loginType?: string, code?: string): any;
}
declare class WeixinAuthProvider extends Base {
    config: Config;
    private scope;
    private state;
    private loginMode;
    private appid;
    constructor(config: Config, appid: string, scope: string, loginMode?: string, state?: string);
    signIn(callback?: any): any;
    redirect(): void;
}
declare class AuthProvider {
    httpRequest: Request;
    cache: Cache;
    accessTokenKey: string;
    accessTokenExpireKey: string;
    refreshTokenKey: string;
    constructor(config: Config);
    setRefreshToken(refreshToken: any): void;
    getJwt(appid?: string, loginType?: string, code?: string): any;
}
declare class Auth extends AuthProvider {
    httpRequest: Request;
    config: Config;
    customAuthProvider: AuthProvider;
    _shouldRefreshAccessToken: Function;
    constructor(config: Config);
    weixinAuthProvider({ appid, scope, loginMode, state }: {
        appid: any;
        scope: any;
        loginMode?: any;
        state?: any;
    }): WeixinAuthProvider;
    signOut(): Promise<any>;
    getAccessToken(): Promise<{}>;
    onLoginStateExpire(callback: Function): void;
    signInWithTicket(ticket: string): Promise<void>;
    shouldRefreshAccessToken(hook: any): void;
    getUserInfo(): Promise<any>;
}
declare namespace egret.wxCloud.DB {
    /**
     * The class of all exposed cloud database instances
     */
    class Database {
        readonly config: ICloudConfig;
        readonly command: DatabaseCommand;
        readonly Geo: IGeo;
        readonly serverDate: () => ServerDate;
        readonly RegExp: IRegExpConstructor;
        private constructor();
        collection(collectionName: string): CollectionReference;
    }
    class CollectionReference extends Query {
        readonly collectionName: string;
        readonly database: Database;
        private constructor();
        doc(docId: string | number): DocumentReference;
        add(options: OQ<IAddDocumentOptions>): void;
        add(options: RQ<IAddDocumentOptions>): Promise<IAddResult>;
    }
    class DocumentReference {
        private constructor();
        field(object: any): this;
        get(): Promise<IQuerySingleResult>;
        get(options: OQ<IGetDocumentOptions>): void;
        get(options: RQ<IGetDocumentOptions>): Promise<IQuerySingleResult>;
        set(): Promise<ISetResult>;
        set(options: OQ<ISetSingleDocumentOptions>): void;
        set(options: RQ<ISetSingleDocumentOptions>): Promise<ISetResult>;
        update(): Promise<IUpdateResult>;
        update(options: OQ<IUpdateSingleDocumentOptions>): void;
        update(options: RQ<IUpdateSingleDocumentOptions>): Promise<IUpdateResult>;
        remove(): Promise<IRemoveResult>;
        remove(options: OQ<IRemoveSingleDocumentOptions>): void;
        remove(options: RQ<IRemoveSingleDocumentOptions>): Promise<IRemoveResult>;
    }
    class Query {
        where(condition: IQueryCondition): Query;
        orderBy(fieldPath: string, order: string): Query;
        limit(max: number): Query;
        skip(offset: number): Query;
        field(object: any): Query;
        get(): Promise<IQueryResult>;
        get(options: OQ<IGetDocumentOptions>): void;
        get(options: RQ<IGetDocumentOptions>): Promise<IQueryResult>;
        count(): Promise<ICountResult>;
        count(options: OQ<ICountDocumentOptions>): void;
        count(options: RQ<ICountDocumentOptions>): Promise<ICountResult>;
        watch(callback: {
            onChange: (snapshot: any) => {};
            onError: (e: any) => {};
        }): any;
    }
    interface DatabaseCommand {
        eq(val: any): DatabaseQueryCommand;
        neq(val: any): DatabaseQueryCommand;
        gt(val: any): DatabaseQueryCommand;
        gte(val: any): DatabaseQueryCommand;
        lt(val: any): DatabaseQueryCommand;
        lte(val: any): DatabaseQueryCommand;
        in(val: any[]): DatabaseQueryCommand;
        nin(val: any[]): DatabaseQueryCommand;
        geoNear(options: IGeoNearCommandOptions): DatabaseQueryCommand;
        geoWithin(options: IGeoWithinCommandOptions): DatabaseQueryCommand;
        geoIntersects(options: IGeoIntersectsCommandOptions): DatabaseQueryCommand;
        and(...expressions: (DatabaseLogicCommand | IQueryCondition)[]): DatabaseLogicCommand;
        or(...expressions: (DatabaseLogicCommand | IQueryCondition)[]): DatabaseLogicCommand;
        set(val: any): DatabaseUpdateCommand;
        remove(): DatabaseUpdateCommand;
        inc(val: number): DatabaseUpdateCommand;
        mul(val: number): DatabaseUpdateCommand;
        push(...values: any[]): DatabaseUpdateCommand;
        pop(): DatabaseUpdateCommand;
        shift(): DatabaseUpdateCommand;
        unshift(...values: any[]): DatabaseUpdateCommand;
    }
    class DatabaseLogicCommand {
        fieldName: string | InternalSymbol;
        operator: string;
        operands: any[];
        _setFieldName(fieldName: string): DatabaseLogicCommand;
        and(...expressions: (DatabaseLogicCommand | IQueryCondition)[]): DatabaseLogicCommand;
        or(...expressions: (DatabaseLogicCommand | IQueryCondition)[]): DatabaseLogicCommand;
    }
    class DatabaseQueryCommand extends DatabaseLogicCommand {
        operator: string;
        _setFieldName(fieldName: string): DatabaseQueryCommand;
        eq(val: any): DatabaseLogicCommand;
        neq(val: any): DatabaseLogicCommand;
        gt(val: any): DatabaseLogicCommand;
        gte(val: any): DatabaseLogicCommand;
        lt(val: any): DatabaseLogicCommand;
        lte(val: any): DatabaseLogicCommand;
        in(val: any[]): DatabaseLogicCommand;
        nin(val: any[]): DatabaseLogicCommand;
        geoNear(options: IGeoNearCommandOptions): DatabaseLogicCommand;
        geoWithin(options: IGeoWithinCommandOptions): DatabaseLogicCommand;
        geoIntersects(options: IGeoIntersectsCommandOptions): DatabaseLogicCommand;
    }
    class DatabaseUpdateCommand {
        fieldName: string | InternalSymbol;
        operator: string;
        operands: any[];
        constructor(operator: string, operands: any[], fieldName?: string | InternalSymbol);
        _setFieldName(fieldName: string): DatabaseUpdateCommand;
    }
    class Batch {
    }
    /**
     * A contract that all API provider must adhere to
     */
    class APIBaseContract<PROMISE_RETURN, CALLBACK_RETURN, PARAM extends IAPIParam<any>, CONTEXT> {
        getContext(param: PARAM): CONTEXT;
        /**
         * In case of callback-style invocation, this function will be called
         */
        getCallbackReturn(param: PARAM, context: CONTEXT): CALLBACK_RETURN;
        getFinalParam<T extends PARAM>(param: PARAM, context: CONTEXT): T;
        run<T extends PARAM>(param: T): Promise<PROMISE_RETURN>;
    }
    interface IGeoPointConstructor {
        new (longitude: number, latitide: number): GeoPoint;
        new (geojson: IGeoJSONPoint): GeoPoint;
        (longitude: number, latitide: number): GeoPoint;
        (geojson: IGeoJSONPoint): GeoPoint;
    }
    interface IGeoMultiPointConstructor {
        new (points: GeoPoint[] | IGeoJSONMultiPoint): GeoMultiPoint;
        (points: GeoPoint[] | IGeoJSONMultiPoint): GeoMultiPoint;
    }
    interface IGeoLineStringConstructor {
        new (points: GeoPoint[] | IGeoJSONLineString): GeoLineString;
        (points: GeoPoint[] | IGeoJSONLineString): GeoLineString;
    }
    interface IGeoMultiLineStringConstructor {
        new (lineStrings: GeoLineString[] | IGeoJSONMultiLineString): GeoMultiLineString;
        (lineStrings: GeoLineString[] | IGeoJSONMultiLineString): GeoMultiLineString;
    }
    interface IGeoPolygonConstructor {
        new (lineStrings: GeoLineString[] | IGeoJSONPolygon): GeoPolygon;
        (lineStrings: GeoLineString[] | IGeoJSONPolygon): GeoPolygon;
    }
    interface IGeoMultiPolygonConstructor {
        new (polygons: GeoPolygon[] | IGeoJSONMultiPolygon): GeoMultiPolygon;
        (polygons: GeoPolygon[] | IGeoJSONMultiPolygon): GeoMultiPolygon;
    }
    interface IGeo {
        Point: IGeoPointConstructor;
        MultiPoint: IGeoMultiPointConstructor;
        LineString: IGeoLineStringConstructor;
        MultiLineString: IGeoMultiLineStringConstructor;
        Polygon: IGeoPolygonConstructor;
        MultiPolygon: IGeoMultiPolygonConstructor;
    }
    interface IGeoJSONPoint {
        type: 'Point';
        coordinates: [number, number];
    }
    interface IGeoJSONMultiPoint {
        type: 'MultiPoint';
        coordinates: [number, number][];
    }
    interface IGeoJSONLineString {
        type: 'LineString';
        coordinates: [number, number][];
    }
    interface IGeoJSONMultiLineString {
        type: 'MultiLineString';
        coordinates: [number, number][][];
    }
    interface IGeoJSONPolygon {
        type: 'Polygon';
        coordinates: [number, number][][];
    }
    interface IGeoJSONMultiPolygon {
        type: 'MultiPolygon';
        coordinates: [number, number][][][];
    }
    type IGeoJSONObject = IGeoJSONPoint | IGeoJSONMultiPoint | IGeoJSONLineString | IGeoJSONMultiLineString | IGeoJSONPolygon | IGeoJSONMultiPolygon;
    abstract class GeoPoint {
        longitude: number;
        latitude: number;
        constructor(longitude: number, latitude: number);
        toJSON(): any;
        toString(): string;
    }
    abstract class GeoMultiPoint {
        points: GeoPoint[];
        constructor(points: GeoPoint[]);
        toJSON(): IGeoJSONMultiPoint;
        toString(): string;
    }
    abstract class GeoLineString {
        points: GeoPoint[];
        constructor(points: GeoPoint[]);
        toJSON(): IGeoJSONLineString;
        toString(): string;
    }
    abstract class GeoMultiLineString {
        lines: GeoLineString[];
        constructor(lines: GeoLineString[]);
        toJSON(): IGeoJSONMultiLineString;
        toString(): string;
    }
    abstract class GeoPolygon {
        lines: GeoLineString[];
        constructor(lines: GeoLineString[]);
        toJSON(): IGeoJSONPolygon;
        toString(): string;
    }
    abstract class GeoMultiPolygon {
        polygons: GeoPolygon[];
        constructor(polygons: GeoPolygon[]);
        toJSON(): IGeoJSONMultiPolygon;
        toString(): string;
    }
    type GeoInstance = GeoPoint | GeoMultiPoint | GeoLineString | GeoMultiLineString | GeoPolygon | GeoMultiPolygon;
    interface IGeoNearCommandOptions {
        geometry: GeoPoint;
        maxDistance?: number;
        minDistance?: number;
    }
    interface IGeoWithinCommandOptions {
        geometry: GeoPolygon | GeoMultiPolygon;
    }
    interface IGeoIntersectsCommandOptions {
        geometry: GeoPoint | GeoMultiPoint | GeoLineString | GeoMultiLineString | GeoPolygon | GeoMultiPolygon;
    }
    interface IServerDateOptions {
        offset: number;
    }
    abstract class ServerDate {
        readonly options: IServerDateOptions;
        constructor(options?: IServerDateOptions);
    }
    interface IRegExpOptions {
        regexp: string;
        options?: string;
    }
    interface IRegExpConstructor {
        new (options: IRegExpOptions): RegExp;
        (options: IRegExpOptions): RegExp;
    }
    abstract class RegExp {
        readonly regexp: string;
        readonly options: string;
        constructor(options: IRegExpOptions);
    }
    type DocumentId = string | number;
    interface IDocumentData {
        _id?: DocumentId;
        [key: string]: any;
    }
    interface IDBAPIParam extends IAPIParam<any> {
    }
    interface IAddDocumentOptions extends IDBAPIParam {
        data: IDocumentData;
    }
    interface IGetDocumentOptions extends IDBAPIParam {
    }
    interface ICountDocumentOptions extends IDBAPIParam {
    }
    interface IUpdateDocumentOptions extends IDBAPIParam {
        data: IUpdateCondition;
    }
    interface IUpdateSingleDocumentOptions extends IDBAPIParam {
        data: IUpdateCondition;
    }
    interface ISetDocumentOptions extends IDBAPIParam {
        data: IUpdateCondition;
    }
    interface ISetSingleDocumentOptions extends IDBAPIParam {
        data: IUpdateCondition;
    }
    interface IRemoveDocumentOptions extends IDBAPIParam {
        query: IQueryCondition;
    }
    interface IRemoveSingleDocumentOptions extends IDBAPIParam {
    }
    interface IQueryCondition {
        [key: string]: any;
    }
    type IStringQueryCondition = string;
    interface IQueryResult extends IAPISuccessParam {
        data: IDocumentData[];
    }
    interface IQuerySingleResult extends IAPISuccessParam {
        data: IDocumentData;
    }
    interface IUpdateCondition {
        [key: string]: any;
    }
    type IStringUpdateCondition = string;
    interface ISetCondition {
    }
    interface IAddResult extends IAPISuccessParam {
        _id: DocumentId;
    }
    interface IUpdateResult extends IAPISuccessParam {
        stats: {
            updated: number;
        };
    }
    interface ISetResult extends IAPISuccessParam {
        _id: DocumentId;
        stats: {
            updated: number;
            created: number;
        };
    }
    interface IRemoveResult extends IAPISuccessParam {
        stats: {
            removed: number;
        };
    }
    interface ICountResult extends IAPISuccessParam {
        total: number;
    }
}
/**
 * Common interfaces and types
 */
interface IAPIError {
    errMsg: string;
}
interface IAPIParam<T> {
    config?: ICloudConfig;
    success?: (res: T) => void;
    fail?: (err: IAPIError) => void;
    complete?: (val: T | IAPIError) => void;
}
interface IAPISuccessParam {
    errMsg: string;
}
interface ICloudConfig {
    env?: string;
    traceUser?: boolean;
}
declare type Optional<T> = {
    [K in keyof T]?: T[K];
};
declare type OQ<T extends Optional<Record<'complete' | 'success' | 'fail', (...args: any[]) => any>>> = any;
declare type RQ<T extends Optional<Record<'complete' | 'success' | 'fail', (...args: any[]) => any>>> = any;
declare class InternalSymbol {
}
declare namespace egret.wxCloud {
    class cloud {
        private static _webTcb;
        static init(config?: ICloudConfig): void;
        static database(config?: ICloudConfig): egret.wxCloud.DB.Database;
        static callFunction(param: {
            name: string;
            data: any;
            success?: (res: any) => {};
            fail?: (err: any) => {};
        }): void;
        static auth(config: AuthConfig): Auth;
    }
}
declare function isWXPlatform(): boolean;
