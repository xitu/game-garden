// https://raw.githubusercontent.com/wechat-miniprogram/api-typings/2.7.7/types/wx/lib.wx.cloud.d.ts

/*! *****************************************************************************
Copyright (c) 2018 Tencent, Inc. All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
***************************************************************************** */

/////////////////////
///// WX Cloud Apis
/////////////////////

/**
 * Common interfaces and types
 */

// declare interface IAPIError {
//     errMsg: string;
// }

// declare interface IAPIParam<T> {
//     config?: ICloudConfig;
//     success?: (res: T) => void;
//     fail?: (err: IAPIError) => void;
//     complete?: (val: T | IAPIError) => void;
// }

// declare interface IAPISuccessParam {
//     errMsg: string;
// }

// declare interface ICloudConfig {
//     env?: string;
//     traceUser?: boolean;
// }

// type Optional<T> = {[K in keyof T]?: T[K]};

// type OQ<
//     T extends Optional<
//     Record<'complete' | 'success' | 'fail', (...args: any[]) => any>
//     >
//     > = any;

// type RQ<
//     T extends Optional<
//     Record<'complete' | 'success' | 'fail', (...args: any[]) => any>
//     >
//     > = any;

// declare class InternalSymbol { }

declare namespace wx {
    export class cloud {
        public static init(config?: ICloudConfig): void;
        public static database(config?: ICloudConfig): DB.Database;
        public static callFunction(param: {name: string, data: any, success?: (res)=>{}, fail?: (err)=>{}}): void;
    }
}

// === Database ===
declare namespace DB {
    /**
     * The class of all exposed cloud database instances
     */
    export class Database {
        public readonly config: ICloudConfig;
        public readonly command: DatabaseCommand;
        public readonly Geo: IGeo;
        public readonly serverDate: () => ServerDate;
        public readonly RegExp: IRegExpConstructor;

        private constructor();

        collection(collectionName: string): CollectionReference;
    }

    export class CollectionReference extends Query {
        public readonly collectionName: string;
        public readonly database: Database;

        private constructor(name: string, database: Database);

        doc(docId: string | number): DocumentReference;

        // add(options: IAddDocumentOptions): Promise<IAddResult> | void

        add(options: OQ<IAddDocumentOptions>): void;
        add(options: RQ<IAddDocumentOptions>): Promise<IAddResult>;
    }

    export class DocumentReference {
        private constructor(docId: string | number, database: Database);

        field(object: any): this;

        // get(options?: IGetDocumentOptions): Promise<IQuerySingleResult> | void

        // set(options?: ISetSingleDocumentOptions): Promise<ISetResult> | void

        // update(options?: IUpdateSingleDocumentOptions): Promise<IUpdateResult> | void

        // remove(options?: IRemoveSingleDocumentOptions): Promise<IRemoveResult> | void

        // get(options?: IGetDocumentOptions): Promise<IQuerySingleResult> | void
        get(): Promise<IQuerySingleResult>;
        get(options: OQ<IGetDocumentOptions>): void;
        get(options: RQ<IGetDocumentOptions>): Promise<IQuerySingleResult>;

        // set(options?: ISetSingleDocumentOptions): Promise<ISetResult> | void
        set(): Promise<ISetResult>;
        set(options: OQ<ISetSingleDocumentOptions>): void;
        set(options: RQ<ISetSingleDocumentOptions>): Promise<ISetResult>;

        // update(options?: IUpdateSingleDocumentOptions): Promise<IUpdateResult> | void
        update(): Promise<IUpdateResult>;
        update(options: OQ<IUpdateSingleDocumentOptions>): void;
        update(options: RQ<IUpdateSingleDocumentOptions>): Promise<IUpdateResult>;

        // remove(options?: IRemoveSingleDocumentOptions): Promise<IRemoveResult> | void
        remove(): Promise<IRemoveResult>;
        remove(options: OQ<IRemoveSingleDocumentOptions>): void;
        remove(options: RQ<IRemoveSingleDocumentOptions>): Promise<IRemoveResult>;
    }

    export class Query {
        where(condition: IQueryCondition): Query;

        orderBy(fieldPath: string, order: string): Query;

        limit(max: number): Query;

        skip(offset: number): Query;

        field(object: any): Query;

        // get(options?: IGetDocumentOptions): Promise<IQueryResult> | void

        // // update(options?: IUpdateDocumentOptions): Promise<IUpdateResult> | void

        // // remove(options?: IRemoveDocumentOptions): Promise<IRemoveResult> | void

        // count(options?: ICountDocumentOptions): Promise<ICountResult> | void

        // get(options?: IGetDocumentOptions): Promise<IQueryResult> | void
        get(): Promise<IQueryResult>;
        get(options: OQ<IGetDocumentOptions>): void;
        get(options: RQ<IGetDocumentOptions>): Promise<IQueryResult>;

        // update(options?: IUpdateDocumentOptions): Promise<IUpdateResult> | void

        // remove(options?: IRemoveDocumentOptions): Promise<IRemoveResult> | void

        // count(options?: ICountDocumentOptions): Promise<ICountResult> | void
        count(): Promise<ICountResult>;
        count(options: OQ<ICountDocumentOptions>): void;
        count(options: RQ<ICountDocumentOptions>): Promise<ICountResult>;

        watch(callback: {onChange: (snapshot)=>{}, onError: (e)=>{}}): any;
    }

    export interface DatabaseCommand {
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

        and(
            ...expressions: (DatabaseLogicCommand | IQueryCondition)[]
        ): DatabaseLogicCommand;
        or(
            ...expressions: (DatabaseLogicCommand | IQueryCondition)[]
        ): DatabaseLogicCommand;

        set(val: any): DatabaseUpdateCommand;
        remove(): DatabaseUpdateCommand;
        inc(val: number): DatabaseUpdateCommand;
        mul(val: number): DatabaseUpdateCommand;

        push(...values: any[]): DatabaseUpdateCommand;
        pop(): DatabaseUpdateCommand;
        shift(): DatabaseUpdateCommand;
        unshift(...values: any[]): DatabaseUpdateCommand;
    }

    // export enum LOGIC_COMMANDS_LITERAL {
    //     AND = 'and',
    //     OR = 'or',
    //     NOT = 'not',
    //     NOR = 'nor',
    // }

    export class DatabaseLogicCommand {
        public fieldName: string | InternalSymbol;
        // public operator: LOGIC_COMMANDS_LITERAL | string;
        public operator: string;
        public operands: any[];

        _setFieldName(fieldName: string): DatabaseLogicCommand;

        and(
            ...expressions: (DatabaseLogicCommand | IQueryCondition)[]
        ): DatabaseLogicCommand;
        or(
            ...expressions: (DatabaseLogicCommand | IQueryCondition)[]
        ): DatabaseLogicCommand;
    }

    // export enum QUERY_COMMANDS_LITERAL {
        // // normal
        // EQ = 'eq',
        // NEQ = 'neq',
        // GT = 'gt',
        // GTE = 'gte',
        // LT = 'lt',
        // LTE = 'lte',
        // IN = 'in',
        // NIN = 'nin',
        // // geo
        // GEO_NEAR = 'geoNear',
        // GEO_WITHIN = 'geoWithin',
        // GEO_INTERSECTS = 'geoIntersects',
    // }

    export class DatabaseQueryCommand extends DatabaseLogicCommand {
        // public operator: QUERY_COMMANDS_LITERAL | string;
        public operator: string;

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

    // export enum UPDATE_COMMANDS_LITERAL {
    //     SET = 'set',
    //     REMOVE = 'remove',
    //     INC = 'inc',
    //     MUL = 'mul',
    //     PUSH = 'push',
    //     POP = 'pop',
    //     SHIFT = 'shift',
    //     UNSHIFT = 'unshift',
    // }

    export class DatabaseUpdateCommand {
        public fieldName: string | InternalSymbol;
        // public operator: UPDATE_COMMANDS_LITERAL;
        public operator: string;
        public operands: any[];

        constructor(
            // operator: UPDATE_COMMANDS_LITERAL,
            operator: string,
            operands: any[],
            fieldName?: string | InternalSymbol,
        );

        _setFieldName(fieldName: string): DatabaseUpdateCommand;
    }

    export class Batch { }

    /**
     * A contract that all API provider must adhere to
     */
    export class APIBaseContract<
        PROMISE_RETURN,
        CALLBACK_RETURN,
        PARAM extends IAPIParam<any>,
        CONTEXT> {
        getContext(param: PARAM): CONTEXT;

        /**
         * In case of callback-style invocation, this function will be called
         */
        getCallbackReturn(param: PARAM, context: CONTEXT): CALLBACK_RETURN;

        getFinalParam<T extends PARAM>(param: PARAM, context: CONTEXT): T;

        run<T extends PARAM>(param: T): Promise<PROMISE_RETURN>;
    }

    export interface IGeoPointConstructor {
        new (longitude: number, latitide: number): GeoPoint;
        new (geojson: IGeoJSONPoint): GeoPoint;
        (longitude: number, latitide: number): GeoPoint;
        (geojson: IGeoJSONPoint): GeoPoint;
    }

    export interface IGeoMultiPointConstructor {
        new (points: GeoPoint[] | IGeoJSONMultiPoint): GeoMultiPoint;
        (points: GeoPoint[] | IGeoJSONMultiPoint): GeoMultiPoint;
    }

    export interface IGeoLineStringConstructor {
        new (points: GeoPoint[] | IGeoJSONLineString): GeoLineString;
        (points: GeoPoint[] | IGeoJSONLineString): GeoLineString;
    }

    export interface IGeoMultiLineStringConstructor {
        new (
            lineStrings: GeoLineString[] | IGeoJSONMultiLineString,
        ): GeoMultiLineString;
        (
            lineStrings: GeoLineString[] | IGeoJSONMultiLineString,
        ): GeoMultiLineString;
    }

    export interface IGeoPolygonConstructor {
        new (lineStrings: GeoLineString[] | IGeoJSONPolygon): GeoPolygon;
        (lineStrings: GeoLineString[] | IGeoJSONPolygon): GeoPolygon;
    }

    export interface IGeoMultiPolygonConstructor {
        new (polygons: GeoPolygon[] | IGeoJSONMultiPolygon): GeoMultiPolygon;
        (polygons: GeoPolygon[] | IGeoJSONMultiPolygon): GeoMultiPolygon;
    }

    export interface IGeo {
        Point: IGeoPointConstructor;
        MultiPoint: IGeoMultiPointConstructor;
        LineString: IGeoLineStringConstructor;
        MultiLineString: IGeoMultiLineStringConstructor;
        Polygon: IGeoPolygonConstructor;
        MultiPolygon: IGeoMultiPolygonConstructor;
    }

    export interface IGeoJSONPoint {
        type: 'Point';
        coordinates: [number, number];
    }

    export interface IGeoJSONMultiPoint {
        type: 'MultiPoint';
        coordinates: [number, number][];
    }

    export interface IGeoJSONLineString {
        type: 'LineString';
        coordinates: [number, number][];
    }

    export interface IGeoJSONMultiLineString {
        type: 'MultiLineString';
        coordinates: [number, number][][];
    }

    export interface IGeoJSONPolygon {
        type: 'Polygon';
        coordinates: [number, number][][];
    }

    export interface IGeoJSONMultiPolygon {
        type: 'MultiPolygon';
        coordinates: [number, number][][][];
    }

    export type IGeoJSONObject =
        | IGeoJSONPoint
        | IGeoJSONMultiPoint
        | IGeoJSONLineString
        | IGeoJSONMultiLineString
        | IGeoJSONPolygon
        | IGeoJSONMultiPolygon;

    export abstract class GeoPoint {
        public longitude: number;
        public latitude: number;

        constructor(longitude: number, latitude: number);

        toJSON(): any;
        toString(): string;
    }

    export abstract class GeoMultiPoint {
        public points: GeoPoint[];

        constructor(points: GeoPoint[]);

        toJSON(): IGeoJSONMultiPoint;
        toString(): string;
    }

    export abstract class GeoLineString {
        public points: GeoPoint[];

        constructor(points: GeoPoint[]);

        toJSON(): IGeoJSONLineString;
        toString(): string;
    }

    export abstract class GeoMultiLineString {
        public lines: GeoLineString[];

        constructor(lines: GeoLineString[]);

        toJSON(): IGeoJSONMultiLineString;
        toString(): string;
    }

    export abstract class GeoPolygon {
        public lines: GeoLineString[];

        constructor(lines: GeoLineString[]);

        toJSON(): IGeoJSONPolygon;
        toString(): string;
    }

    export abstract class GeoMultiPolygon {
        public polygons: GeoPolygon[];

        constructor(polygons: GeoPolygon[]);

        toJSON(): IGeoJSONMultiPolygon;
        toString(): string;
    }

    export type GeoInstance =
        | GeoPoint
        | GeoMultiPoint
        | GeoLineString
        | GeoMultiLineString
        | GeoPolygon
        | GeoMultiPolygon;

    export interface IGeoNearCommandOptions {
        geometry: GeoPoint;
        maxDistance?: number;
        minDistance?: number;
    }

    export interface IGeoWithinCommandOptions {
        geometry: GeoPolygon | GeoMultiPolygon;
    }

    export interface IGeoIntersectsCommandOptions {
        geometry:
        | GeoPoint
        | GeoMultiPoint
        | GeoLineString
        | GeoMultiLineString
        | GeoPolygon
        | GeoMultiPolygon;
    }

    export interface IServerDateOptions {
        offset: number;
    }

    export abstract class ServerDate {
        public readonly options: IServerDateOptions;
        constructor(options?: IServerDateOptions);
    }

    export interface IRegExpOptions {
        regexp: string;
        options?: string;
    }

    export interface IRegExpConstructor {
        new (options: IRegExpOptions): RegExp;
        (options: IRegExpOptions): RegExp;
    }

    export abstract class RegExp {
        public readonly regexp: string;
        public readonly options: string;
        constructor(options: IRegExpOptions);
    }

    export type DocumentId = string | number;

    export interface IDocumentData {
        _id?: DocumentId;
        [key: string]: any;
    }

    export interface IDBAPIParam extends IAPIParam<any> { }

    export interface IAddDocumentOptions extends IDBAPIParam {
        data: IDocumentData;
    }

    export interface IGetDocumentOptions extends IDBAPIParam { }

    export interface ICountDocumentOptions extends IDBAPIParam { }

    export interface IUpdateDocumentOptions extends IDBAPIParam {
        data: IUpdateCondition;
    }

    export interface IUpdateSingleDocumentOptions extends IDBAPIParam {
        data: IUpdateCondition;
    }

    export interface ISetDocumentOptions extends IDBAPIParam {
        data: IUpdateCondition;
    }

    export interface ISetSingleDocumentOptions extends IDBAPIParam {
        data: IUpdateCondition;
    }

    export interface IRemoveDocumentOptions extends IDBAPIParam {
        query: IQueryCondition;
    }

    export interface IRemoveSingleDocumentOptions extends IDBAPIParam { }

    export interface IQueryCondition {
        [key: string]: any;
    }

    export type IStringQueryCondition = string;

    export interface IQueryResult extends IAPISuccessParam {
        data: IDocumentData[];
    }

    export interface IQuerySingleResult extends IAPISuccessParam {
        data: IDocumentData;
    }

    export interface IUpdateCondition {
        [key: string]: any;
    }

    export type IStringUpdateCondition = string;

    export interface ISetCondition { }

    export interface IAddResult extends IAPISuccessParam {
        _id: DocumentId;
    }

    export interface IUpdateResult extends IAPISuccessParam {
        stats: {
            updated: number;
            // created: number,
        };
    }

    export interface ISetResult extends IAPISuccessParam {
        _id: DocumentId;
        stats: {
            updated: number;
            created: number;
        };
    }

    export interface IRemoveResult extends IAPISuccessParam {
        stats: {
            removed: number;
        };
    }

    export interface ICountResult extends IAPISuccessParam {
        total: number;
    }
}
