import React from 'react';

declare const JSONCanvasVisualizer: ({ data, width, height, options }: {
    data: any;
    width?: number | undefined;
    height?: number | undefined;
    options?: {} | undefined;
}) => React.JSX.Element;

interface JSONCanvasVisualizerProps {
    data: any;
    width?: number;
    height?: number;
    options?: {
        padding?: number;
        fontSize?: number;
        fontFamily?: string;
        backgroundColor?: string;
        textColor?: string;
        bracketColor?: string;
        keyColor?: string;
        valueColor?: string;
        stringColor?: string;
        numberColor?: string;
        nullColor?: string;
        booleanColor?: string;
        indentSize?: number;
    };
}

export { JSONCanvasVisualizer, type JSONCanvasVisualizerProps };
