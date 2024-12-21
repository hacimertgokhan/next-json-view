import { __assign } from '../../node_modules/tslib/tslib.es6.js';
import React, { useRef, useEffect } from 'react';

// @ts-ignore
var JSONCanvasVisualizer = function (_a) {
    var data = _a.data, _b = _a.width, width = _b === void 0 ? 800 : _b, _c = _a.height, height = _c === void 0 ? 600 : _c, _d = _a.options, options = _d === void 0 ? {} : _d;
    var canvasRef = useRef(null);
    var defaultOptions = {
        padding: 20,
        fontSize: 14,
        fontFamily: 'Monaco, monospace',
        backgroundColor: '#ffffff',
        textColor: '#333333',
        bracketColor: '#0066cc',
        keyColor: '#116329',
        valueColor: '#0550ae',
        stringColor: '#0a3069',
        numberColor: '#0550ae',
        nullColor: '#6e7781',
        booleanColor: '#0550ae',
        indentSize: 20,
    };
    var mergedOptions = __assign(__assign({}, defaultOptions), options);
    var drawJSON = function (ctx, obj, x, y, level) {
        if (level === void 0) { level = 0; }
        var indent = level * mergedOptions.indentSize;
        ctx.font = "".concat(mergedOptions.fontSize, "px ").concat(mergedOptions.fontFamily);
        if (Array.isArray(obj)) {
            ctx.fillStyle = mergedOptions.bracketColor;
            ctx.fillText('[', x + indent, y);
            var currentY_1 = y + mergedOptions.fontSize + 5;
            obj.forEach(function (item, index) {
                currentY_1 = drawJSON(ctx, item, x, currentY_1, level + 1);
                if (index < obj.length - 1) {
                    ctx.fillStyle = mergedOptions.textColor;
                    ctx.fillText(',', x + indent + ctx.measureText(']').width, currentY_1 - mergedOptions.fontSize - 5);
                }
            });
            ctx.fillStyle = mergedOptions.bracketColor;
            ctx.fillText(']', x + indent, currentY_1);
            return currentY_1 + mergedOptions.fontSize + 5;
        }
        if (typeof obj === 'object' && obj !== null) {
            ctx.fillStyle = mergedOptions.bracketColor;
            ctx.fillText('{', x + indent, y);
            var currentY_2 = y + mergedOptions.fontSize + 5;
            Object.entries(obj).forEach(function (_a, index) {
                var key = _a[0], value = _a[1];
                ctx.fillStyle = mergedOptions.keyColor;
                ctx.fillText("\"".concat(key, "\": "), x + indent + mergedOptions.indentSize, currentY_2);
                var keyWidth = ctx.measureText("\"".concat(key, "\": ")).width;
                currentY_2 = drawJSON(ctx, value, x + keyWidth, currentY_2, level + 1);
                if (index < Object.entries(obj).length - 1) {
                    ctx.fillStyle = mergedOptions.textColor;
                    ctx.fillText(',', x + indent + mergedOptions.indentSize, currentY_2 - mergedOptions.fontSize - 5);
                }
            });
            ctx.fillStyle = mergedOptions.bracketColor;
            ctx.fillText('}', x + indent, currentY_2);
            return currentY_2 + mergedOptions.fontSize + 5;
        }
        // Primitive değerler için
        if (typeof obj === 'string') {
            ctx.fillStyle = mergedOptions.stringColor;
            ctx.fillText("\"".concat(obj, "\""), x + indent, y);
        }
        else if (typeof obj === 'number') {
            ctx.fillStyle = mergedOptions.numberColor;
            ctx.fillText(obj.toString(), x + indent, y);
        }
        else if (typeof obj === 'boolean') {
            ctx.fillStyle = mergedOptions.booleanColor;
            ctx.fillText(obj.toString(), x + indent, y);
        }
        else if (obj === null) {
            ctx.fillStyle = mergedOptions.nullColor;
            ctx.fillText('null', x + indent, y);
        }
        return y + mergedOptions.fontSize + 5;
    };
    useEffect(function () {
        var canvas = canvasRef.current;
        // @ts-ignore
        var ctx = canvas.getContext('2d');
        // Canvas temizleme
        ctx.fillStyle = mergedOptions.backgroundColor;
        ctx.fillRect(0, 0, width, height);
        // JSON çizimi
        drawJSON(ctx, data, mergedOptions.padding, mergedOptions.padding);
    }, [data, width, height, mergedOptions]);
    return (React.createElement("canvas", { ref: canvasRef, width: width, height: height, style: { border: '1px solid #ddd' } }));
};

export { JSONCanvasVisualizer as default };
//# sourceMappingURL=JSONCanvasVisualizer.js.map
