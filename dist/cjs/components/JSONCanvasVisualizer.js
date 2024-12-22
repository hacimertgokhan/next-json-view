'use strict';

var React = require('react');

// @ts-ignore
const JSONCanvasVisualizer = ({ data, width = 800, height = 600, options = {} }) => {
    const canvasRef = React.useRef(null);
    const defaultOptions = {
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
    const mergedOptions = Object.assign(Object.assign({}, defaultOptions), options);
    const drawJSON = (ctx, obj, x, y, level = 0) => {
        const indent = level * mergedOptions.indentSize;
        ctx.font = `${mergedOptions.fontSize}px ${mergedOptions.fontFamily}`;
        if (Array.isArray(obj)) {
            ctx.fillStyle = mergedOptions.bracketColor;
            ctx.fillText('[', x + indent, y);
            let currentY = y + mergedOptions.fontSize + 5;
            obj.forEach((item, index) => {
                currentY = drawJSON(ctx, item, x, currentY, level + 1);
                if (index < obj.length - 1) {
                    ctx.fillStyle = mergedOptions.textColor;
                    ctx.fillText(',', x + indent + ctx.measureText(']').width, currentY - mergedOptions.fontSize - 5);
                }
            });
            ctx.fillStyle = mergedOptions.bracketColor;
            ctx.fillText(']', x + indent, currentY);
            return currentY + mergedOptions.fontSize + 5;
        }
        if (typeof obj === 'object' && obj !== null) {
            ctx.fillStyle = mergedOptions.bracketColor;
            ctx.fillText('{', x + indent, y);
            let currentY = y + mergedOptions.fontSize + 5;
            Object.entries(obj).forEach(([key, value], index) => {
                ctx.fillStyle = mergedOptions.keyColor;
                ctx.fillText(`"${key}": `, x + indent + mergedOptions.indentSize, currentY);
                const keyWidth = ctx.measureText(`"${key}": `).width;
                currentY = drawJSON(ctx, value, x + keyWidth, currentY, level + 1);
                if (index < Object.entries(obj).length - 1) {
                    ctx.fillStyle = mergedOptions.textColor;
                    ctx.fillText(',', x + indent + mergedOptions.indentSize, currentY - mergedOptions.fontSize - 5);
                }
            });
            ctx.fillStyle = mergedOptions.bracketColor;
            ctx.fillText('}', x + indent, currentY);
            return currentY + mergedOptions.fontSize + 5;
        }
        // Primitive values
        if (typeof obj === 'string') {
            ctx.fillStyle = mergedOptions.stringColor;
            ctx.fillText(`"${obj}"`, x + indent, y);
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
    React.useEffect(() => {
        const canvas = canvasRef.current;
        // @ts-ignore
        const ctx = canvas.getContext('2d');
        // Canvas temizleme
        ctx.fillStyle = mergedOptions.backgroundColor;
        ctx.fillRect(0, 0, width, height);
        // JSON çizimi
        drawJSON(ctx, data, mergedOptions.padding, mergedOptions.padding);
    }, [data, width, height, mergedOptions]);
    return (React.createElement("canvas", { ref: canvasRef, width: width, height: height, style: { border: '1px solid #ddd' } }));
};

module.exports = JSONCanvasVisualizer;
//# sourceMappingURL=JSONCanvasVisualizer.js.map
