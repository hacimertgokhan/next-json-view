export interface JSONCanvasVisualizerProps {
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