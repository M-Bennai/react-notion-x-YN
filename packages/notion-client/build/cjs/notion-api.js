"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.NotionAPI = void 0;
var got_1 = __importDefault(require("got"));
var p_map_1 = __importDefault(require("p-map"));
var notion_utils_1 = require("notion-utils");
/**
 * Main Notion API client.
 */
var NotionAPI = /** @class */ (function () {
    function NotionAPI(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.apiBaseUrl, apiBaseUrl = _c === void 0 ? 'https://www.notion.so/api/v3' : _c, authToken = _b.authToken, activeUser = _b.activeUser, _d = _b.userTimeZone, userTimeZone = _d === void 0 ? 'America/New_York' : _d;
        this._apiBaseUrl = apiBaseUrl;
        this._authToken = authToken;
        this._activeUser = activeUser;
        this._userTimeZone = userTimeZone;
    }
    NotionAPI.prototype.getPage = function (pageId, _a) {
        var _b, _c, _d;
        var _e = _a === void 0 ? {} : _a, _f = _e.concurrency, concurrency = _f === void 0 ? 3 : _f, _g = _e.fetchCollections, fetchCollections = _g === void 0 ? true : _g, _h = _e.signFileUrls, signFileUrls = _h === void 0 ? true : _h, gotOptions = _e.gotOptions;
        return __awaiter(this, void 0, void 0, function () {
            var page, recordMap, pendingBlockIds, newBlocks, contentBlockIds, allCollectionInstances;
            var _this = this;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0: return [4 /*yield*/, this.getPageRaw(pageId, gotOptions)];
                    case 1:
                        page = _j.sent();
                        recordMap = page === null || page === void 0 ? void 0 : page.recordMap;
                        if (!(recordMap === null || recordMap === void 0 ? void 0 : recordMap.block)) {
                            throw new Error("Notion page not found \"" + (0, notion_utils_1.uuidToId)(pageId) + "\"");
                        }
                        // ensure that all top-level maps exist
                        recordMap.collection = (_b = recordMap.collection) !== null && _b !== void 0 ? _b : {};
                        recordMap.collection_view = (_c = recordMap.collection_view) !== null && _c !== void 0 ? _c : {};
                        recordMap.notion_user = (_d = recordMap.notion_user) !== null && _d !== void 0 ? _d : {};
                        // additional mappings added for convenience
                        // note: these are not native notion objects
                        recordMap.collection_query = {};
                        recordMap.signed_urls = {};
                        _j.label = 2;
                    case 2:
                        if (!true) return [3 /*break*/, 4];
                        pendingBlockIds = (0, notion_utils_1.getPageContentBlockIds)(recordMap).filter(function (id) { return !recordMap.block[id]; });
                        if (!pendingBlockIds.length) {
                            return [3 /*break*/, 4];
                        }
                        return [4 /*yield*/, this.getBlocks(pendingBlockIds, gotOptions).then(function (res) { return res.recordMap.block; })];
                    case 3:
                        newBlocks = _j.sent();
                        recordMap.block = __assign(__assign({}, recordMap.block), newBlocks);
                        return [3 /*break*/, 2];
                    case 4:
                        contentBlockIds = (0, notion_utils_1.getPageContentBlockIds)(recordMap);
                        if (!fetchCollections) return [3 /*break*/, 6];
                        allCollectionInstances = contentBlockIds.flatMap(function (blockId) {
                            var block = recordMap.block[blockId].value;
                            if (block &&
                                (block.type === 'collection_view' ||
                                    block.type === 'collection_view_page')) {
                                return block.view_ids.map(function (collectionViewId) { return ({
                                    collectionId: block.collection_id,
                                    collectionViewId: collectionViewId
                                }); });
                            }
                            else {
                                return [];
                            }
                        });
                        // fetch data for all collection view instances
                        return [4 /*yield*/, (0, p_map_1["default"])(allCollectionInstances, function (collectionInstance) { return __awaiter(_this, void 0, void 0, function () {
                                var collectionId, collectionViewId, collectionView, collectionData, err_1;
                                var _a;
                                var _b, _c, _d, _e, _f, _g, _h, _j;
                                return __generator(this, function (_k) {
                                    switch (_k.label) {
                                        case 0:
                                            collectionId = collectionInstance.collectionId, collectionViewId = collectionInstance.collectionViewId;
                                            collectionView = (_b = recordMap.collection_view[collectionViewId]) === null || _b === void 0 ? void 0 : _b.value;
                                            _k.label = 1;
                                        case 1:
                                            _k.trys.push([1, 3, , 4]);
                                            return [4 /*yield*/, this.getCollectionData(collectionId, collectionViewId, {
                                                    type: collectionView === null || collectionView === void 0 ? void 0 : collectionView.type,
                                                    query: this.getQuery(collectionView),
                                                    groups: (collectionView === null || collectionView === void 0 ? void 0 : collectionView.type) === 'board'
                                                        ? ((_c = collectionView === null || collectionView === void 0 ? void 0 : collectionView.format) === null || _c === void 0 ? void 0 : _c.board_groups2) ||
                                                            ((_d = collectionView === null || collectionView === void 0 ? void 0 : collectionView.format) === null || _d === void 0 ? void 0 : _d.board_groups) ||
                                                            ((_e = collectionView === null || collectionView === void 0 ? void 0 : collectionView.format) === null || _e === void 0 ? void 0 : _e.board_columns)
                                                        : [],
                                                    gotOptions: gotOptions
                                                })
                                                // await fs.writeFile(
                                                //   `${collectionId}-${collectionViewId}.json`,
                                                //   JSON.stringify(collectionData.result, null, 2)
                                                // )
                                            ];
                                        case 2:
                                            collectionData = _k.sent();
                                            // await fs.writeFile(
                                            //   `${collectionId}-${collectionViewId}.json`,
                                            //   JSON.stringify(collectionData.result, null, 2)
                                            // )
                                            recordMap.block = __assign(__assign({}, recordMap.block), collectionData.recordMap.block);
                                            recordMap.collection = __assign(__assign({}, recordMap.collection), collectionData.recordMap.collection);
                                            recordMap.collection_view = __assign(__assign({}, recordMap.collection_view), collectionData.recordMap.collection_view);
                                            recordMap.notion_user = __assign(__assign({}, recordMap.notion_user), collectionData.recordMap.notion_user);
                                            recordMap.collection_query[collectionId] = __assign(__assign({}, recordMap.collection_query[collectionId]), (_a = {}, _a[collectionViewId] = (_h = (_g = (_f = collectionData.result) === null || _f === void 0 ? void 0 : _f.reducerResults) === null || _g === void 0 ? void 0 : _g.collection_group_results) !== null && _h !== void 0 ? _h : (_j = collectionData.result) === null || _j === void 0 ? void 0 : _j.reducerResults, _a));
                                            return [3 /*break*/, 4];
                                        case 3:
                                            err_1 = _k.sent();
                                            // It's possible for public pages to link to private collections, in which case
                                            // Notion returns a 400 error
                                            console.warn('NotionAPI collectionQuery error', err_1.message);
                                            return [3 /*break*/, 4];
                                        case 4: return [2 /*return*/];
                                    }
                                });
                            }); }, {
                                concurrency: concurrency
                            })];
                    case 5:
                        // fetch data for all collection view instances
                        _j.sent();
                        _j.label = 6;
                    case 6:
                        if (!signFileUrls) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.addSignedUrls({ recordMap: recordMap, contentBlockIds: contentBlockIds, gotOptions: gotOptions })];
                    case 7:
                        _j.sent();
                        _j.label = 8;
                    case 8: return [2 /*return*/, recordMap];
                }
            });
        });
    };
    NotionAPI.prototype.addSignedUrls = function (_a) {
        var recordMap = _a.recordMap, contentBlockIds = _a.contentBlockIds, _b = _a.gotOptions, gotOptions = _b === void 0 ? {} : _b;
        return __awaiter(this, void 0, void 0, function () {
            var allFileInstances, signedUrls, i, file, signedUrl, err_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        recordMap.signed_urls = {};
                        if (!contentBlockIds) {
                            contentBlockIds = (0, notion_utils_1.getPageContentBlockIds)(recordMap);
                        }
                        allFileInstances = contentBlockIds.flatMap(function (blockId) {
                            var _a, _b, _c, _d;
                            var block = recordMap.block[blockId].value;
                            if (block &&
                                (block.type === 'pdf' ||
                                    block.type === 'audio' ||
                                    (block.type === 'image' && ((_a = block.file_ids) === null || _a === void 0 ? void 0 : _a.length)) ||
                                    block.type === 'video' ||
                                    block.type === 'file')) {
                                var source = (_d = (_c = (_b = block.properties) === null || _b === void 0 ? void 0 : _b.source) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d[0];
                                // console.log(block, source)
                                if (source) {
                                    if (source.indexOf('youtube') >= 0 || source.indexOf('vimeo') >= 0) {
                                        return [];
                                    }
                                    return {
                                        permissionRecord: {
                                            table: 'block',
                                            id: block.id
                                        },
                                        url: source
                                    };
                                }
                            }
                            return [];
                        });
                        if (!(allFileInstances.length > 0)) return [3 /*break*/, 4];
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.getSignedFileUrls(allFileInstances, gotOptions)];
                    case 2:
                        signedUrls = (_c.sent()).signedUrls;
                        if (signedUrls.length === allFileInstances.length) {
                            for (i = 0; i < allFileInstances.length; ++i) {
                                file = allFileInstances[i];
                                signedUrl = signedUrls[i];
                                recordMap.signed_urls[file.permissionRecord.id] = signedUrl;
                            }
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        err_2 = _c.sent();
                        console.warn('NotionAPI getSignedfileUrls error', err_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    NotionAPI.prototype.getPageRaw = function (pageId, gotOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var parsedPageId, body;
            return __generator(this, function (_a) {
                parsedPageId = (0, notion_utils_1.parsePageId)(pageId);
                if (!parsedPageId) {
                    throw new Error("invalid notion pageId \"" + pageId + "\"");
                }
                body = {
                    pageId: parsedPageId,
                    limit: 100,
                    cursor: { stack: [] },
                    chunkNumber: 0,
                    verticalColumns: false
                };
                return [2 /*return*/, this.fetch({
                        endpoint: 'loadPageChunk',
                        body: body,
                        gotOptions: gotOptions
                    })];
            });
        });
    };
    NotionAPI.prototype.getCollectionData = function (collectionId, collectionViewId, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.type, type = _c === void 0 ? 'table' : _c, query = _b.query, _d = _b.groups, groups = _d === void 0 ? undefined : _d, _e = _b.limit, limit = _e === void 0 ? 999999 : _e, _f = _b.searchQuery, searchQuery = _f === void 0 ? '' : _f, _g = _b.userTimeZone, userTimeZone = _g === void 0 ? this._userTimeZone : _g, _h = _b.loadContentCover, loadContentCover = _h === void 0 ? true : _h, gotOptions = _b.gotOptions;
        return __awaiter(this, void 0, void 0, function () {
            var loader, boardReducers, _i, groups_1, group;
            return __generator(this, function (_j) {
                // TODO: All other collection types queries fail with 400 errors.
                // My guess is that they require slightly different query params, but since
                // their results are the same AFAICT, there's not much point in supporting
                // them.
                if (type !== 'table' && type !== 'board') {
                    type = 'table';
                }
                loader = __assign(__assign({ type: 'reducer', reducers: {
                        collection_group_results: {
                            type: 'results',
                            limit: limit,
                            loadContentCover: loadContentCover
                        },
                        'table:uncategorized:title:count': {
                            type: 'aggregation',
                            aggregation: {
                                property: 'title',
                                aggregator: 'count'
                            }
                        }
                    } }, query), { //add the filters
                    searchQuery: searchQuery, userTimeZone: userTimeZone });
                if (groups && groups.length > 0) {
                    boardReducers = {
                        board_columns: {
                            type: 'groups',
                            groupBy: {
                                sort: {
                                    type: 'manual'
                                },
                                type: 'select',
                                property: groups[0].property
                            },
                            groupSortPreference: groups.map(function (group) {
                                if (group.value) {
                                    return {
                                        type: 'select',
                                        value: group.value
                                    };
                                }
                                return {
                                    type: 'select'
                                };
                            }),
                            limit: 10
                        }
                    };
                    for (_i = 0, groups_1 = groups; _i < groups_1.length; _i++) {
                        group = groups_1[_i];
                        if (!group.value.value) {
                            boardReducers['board:uncategorized'] = {
                                type: 'aggregation',
                                filter: {
                                    operator: 'and',
                                    filters: [
                                        {
                                            property: group.property,
                                            filter: {
                                                operator: 'is_empty'
                                            }
                                        }
                                    ]
                                },
                                aggregation: {
                                    aggregator: 'count'
                                }
                            };
                            boardReducers['results:uncategorized'] = {
                                type: 'results',
                                filter: {
                                    operator: 'and',
                                    filters: [
                                        {
                                            property: group.property,
                                            filter: {
                                                operator: 'is_empty'
                                            }
                                        }
                                    ]
                                },
                                limit: limit
                            };
                        }
                        else {
                            boardReducers["board:" + group.value.value] = {
                                type: 'aggregation',
                                filter: {
                                    operator: 'and',
                                    filters: [
                                        {
                                            property: group.property,
                                            filter: {
                                                operator: 'enum_is',
                                                value: {
                                                    type: 'exact',
                                                    value: group.value.value
                                                }
                                            }
                                        }
                                    ]
                                },
                                aggregation: {
                                    aggregator: 'count'
                                }
                            };
                            boardReducers["board:" + group.value.value] = {
                                type: 'results',
                                filter: {
                                    operator: 'and',
                                    filters: [
                                        {
                                            property: group.property,
                                            filter: {
                                                operator: 'enum_is',
                                                value: {
                                                    type: 'exact',
                                                    value: group.value.value
                                                }
                                            }
                                        }
                                    ]
                                },
                                limit: limit
                            };
                        }
                    }
                    loader.reducers = boardReducers;
                }
                //useful for debugging collection queries
                //console.log('queryCollection', JSON.stringify( { collectionId, collectionViewId, query, loader}, null, 2))
                return [2 /*return*/, this.fetch({
                        endpoint: 'queryCollection',
                        body: {
                            collection: {
                                id: collectionId
                            },
                            collectionView: {
                                id: collectionViewId
                            },
                            loader: loader
                        },
                        gotOptions: gotOptions
                    })];
            });
        });
    };
    //handle setting group_by for the query if it isn't already
    NotionAPI.prototype.getQuery = function (collectionView) {
        var _a, _b, _c;
        var query = (collectionView === null || collectionView === void 0 ? void 0 : collectionView.query2) || (collectionView === null || collectionView === void 0 ? void 0 : collectionView.query);
        if (!query)
            return undefined;
        var groupBy = ((_a = collectionView === null || collectionView === void 0 ? void 0 : collectionView.format) === null || _a === void 0 ? void 0 : _a.board_columns_by)
            ? (_c = (_b = collectionView === null || collectionView === void 0 ? void 0 : collectionView.format) === null || _b === void 0 ? void 0 : _b.board_columns_by) === null || _c === void 0 ? void 0 : _c.property
            : undefined;
        if (groupBy) {
            query.group_by = groupBy;
        }
        return query;
    };
    NotionAPI.prototype.getUsers = function (userIds, gotOptions) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.fetch({
                        endpoint: 'getRecordValues',
                        body: {
                            requests: userIds.map(function (id) { return ({ id: id, table: 'notion_user' }); })
                        },
                        gotOptions: gotOptions
                    })];
            });
        });
    };
    NotionAPI.prototype.getBlocks = function (blockIds, gotOptions) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.fetch({
                        endpoint: 'syncRecordValues',
                        body: {
                            requests: blockIds.map(function (blockId) { return ({
                                // TODO: when to use table 'space' vs 'block'?
                                table: 'block',
                                id: blockId,
                                version: -1
                            }); })
                        },
                        gotOptions: gotOptions
                    })];
            });
        });
    };
    NotionAPI.prototype.getSignedFileUrls = function (urls, gotOptions) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.fetch({
                        endpoint: 'getSignedFileUrls',
                        body: {
                            urls: urls
                        },
                        gotOptions: gotOptions
                    })];
            });
        });
    };
    NotionAPI.prototype.search = function (params, gotOptions) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.fetch({
                        endpoint: 'search',
                        body: {
                            type: 'BlocksInAncestor',
                            source: 'quick_find_public',
                            ancestorId: (0, notion_utils_1.parsePageId)(params.ancestorId),
                            sort: 'Relevance',
                            limit: params.limit || 20,
                            query: params.query,
                            filters: __assign({ isDeletedOnly: false, excludeTemplates: true, isNavigableOnly: true, requireEditPermissions: false, ancestors: [], createdBy: [], editedBy: [], lastEditedTime: {}, createdTime: {} }, params.filters)
                        },
                        gotOptions: gotOptions
                    })];
            });
        });
    };
    NotionAPI.prototype.fetch = function (_a) {
        var endpoint = _a.endpoint, body = _a.body, gotOptions = _a.gotOptions, clientHeaders = _a.headers;
        return __awaiter(this, void 0, void 0, function () {
            var headers, url;
            return __generator(this, function (_b) {
                headers = __assign(__assign(__assign({}, clientHeaders), gotOptions === null || gotOptions === void 0 ? void 0 : gotOptions.headers), { 'Content-Type': 'application/json' });
                if (this._authToken) {
                    headers.cookie = "token_v2=" + this._authToken;
                }
                if (this._activeUser) {
                    headers['x-notion-active-user-header'] = this._activeUser;
                }
                url = this._apiBaseUrl + "/" + endpoint;
                return [2 /*return*/, got_1["default"]
                        .post(url, __assign(__assign({}, gotOptions), { json: body, headers: headers }))
                        .json()
                    // return fetch(url, {
                    //   method: 'post',
                    //   body: JSON.stringify(body),
                    //   headers
                    // }).then((res) => {
                    //   console.log(endpoint, res)
                    //   return res.json()
                    // })
                ];
            });
        });
    };
    return NotionAPI;
}());
exports.NotionAPI = NotionAPI;
//# sourceMappingURL=notion-api.js.map