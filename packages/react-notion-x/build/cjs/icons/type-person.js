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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
function SvgTypePerson(props) {
    return (react_1["default"].createElement("svg", __assign({ viewBox: '0 0 14 14' }, props),
        react_1["default"].createElement("path", { d: 'M9.625 10.847C8.912 10.289 8.121 9.926 7 9.26v-.54a3.33 3.33 0 00.538-.888c.408-.1.774-.498.774-.832 0-.482-.202-.673-.44-.829 0-.015.003-.03.003-.046 0-.711-.438-2.625-2.625-2.625-2.188 0-2.625 1.915-2.625 2.625 0 .017.003.03.003.046-.238.156-.44.347-.44.829 0 .334.366.731.774.833.146.343.326.643.538.886v.541c-1.12.665-1.912 1.028-2.625 1.587C.041 11.498 0 12.469 0 14h10.5c0-1.531-.041-2.502-.875-3.153zm3.5-3.5c-.713-.558-1.504-.921-2.625-1.587v-.54c.212-.244.392-.544.538-.888.408-.1.774-.498.774-.832 0-.482-.202-.673-.44-.829 0-.015.003-.03.003-.046C11.375 1.914 10.937 0 8.75 0 6.562 0 6.125 1.915 6.125 2.625c0 .017.003.03.003.046-.016.012-.03.025-.047.036 1.751.359 2.516 1.841 2.647 3.04.248.262.46.65.46 1.253 0 .603-.417 1.203-1.004 1.515-.057.109-.117.214-.181.315l.437.245c.64.357 1.194.666 1.724 1.081.138.108.256.224.365.343H14c0-1.53-.041-2.5-.875-3.153z' })));
}
exports["default"] = SvgTypePerson;
//# sourceMappingURL=type-person.js.map