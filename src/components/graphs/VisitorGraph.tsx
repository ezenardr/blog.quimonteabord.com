import Style from './visitorGraph.module.scss';

type ChartDataPoints = {
    label: string;
    value: number;
}[];

export default function VisitorGraph() {
    const chartDataPoints: ChartDataPoints = [
        { label: 'Jan', value: 75 },
        { label: 'Feb', value: 20 },
        { label: 'Mar', value: 40 },
        { label: 'May', value: 10 },
        { label: 'Jun', value: 50 },
        { label: 'Jul', value: 80 },
        { label: 'Aug', value: 30 },
        { label: 'Sep', value: 39 },
        { label: 'Oct', value: 98 },
        { label: 'Nov', value: 125 },
        { label: 'Dec', value: 66 },
    ];
    const dataPointValues = chartDataPoints.map((dataPoint) => dataPoint.value);
    const maxValue = Math.max(...dataPointValues);
    return (
        <div className={Style.chart}>
            {chartDataPoints.map(
                ({ label, value }: { label: string; value: number }) => (
                    <ChartBar
                        key={label}
                        value={value}
                        maxValue={maxValue}
                        label={label}
                    />
                )
            )}
        </div>
    );
}

function ChartBar({
    value,
    maxValue,
    label,
}: {
    value: number;
    maxValue: number;
    label: string;
}) {
    let barFillHeight = Math.round((value / maxValue) * 100) + '%';
    return (
        <div className={Style.chartBar}>
            <div className={Style.chartBar__inner}>
                <div
                    className={Style.chartBar__fill}
                    style={{ height: barFillHeight }}
                ></div>
            </div>
            <p className={Style.chartBar__label}>{label}</p>
        </div>
    );
}
