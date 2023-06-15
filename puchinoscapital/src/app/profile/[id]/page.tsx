'use client';
import React, { useEffect, useRef } from 'react';
import '../../../styles/profile.css'

import * as echarts from 'echarts';

const generateData = () => {
    const data = [];
    const startDate = new Date('2023/01/01').getTime();
    let previousClose = 2500;

    for (let i = 0; i < 500; i++) {
        const currentDate = new Date(startDate + i * 24 * 60 * 60 * 1000);
        const formattedDate = currentDate.toISOString().split('T')[0];
        const open = previousClose;
        const close = open + Math.random() * 100 - 50;
        const high = Math.max(open, close) + Math.random() * 100;
        const low = Math.min(open, close) - Math.random() * 100;

        data.push([formattedDate, open, close, low, high]);
        previousClose = close;
    }

    return data;
};

const ProfilePage = () => {
    const chartContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const upColor = '#FFE01B';
        const downColor = '#6E6E78';

        function splitData(rawData: string | any[]) {
            var categoryData = [];
            var values = []
            for (var i = 0; i < rawData.length; i++) {
                categoryData.push(rawData[i].splice(0, 1)[0]);
                values.push(rawData[i])
            }
            return {
                categoryData: categoryData,
                values: values
            };
        }

        if (chartContainerRef.current) {
            const myChart = echarts.init(chartContainerRef.current);

            const data = splitData(generateData());

            myChart.setOption({
                backgroundColor: '#0A0A0B',
                animation: false,
                legend: {
                    bottom: 10,
                    left: 'center',
                    data: ['R41N'],
                    show: false
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    },
                    backgroundColor: '#131315',
                    borderWidth: 1,
                    borderColor: '#FFF',
                    padding: 10,
                    textStyle: {
                        color: '#fff'
                    },
                    position: function (pos: any, params: any, el: any, elRect: any, size: any) {
                        var obj: any = { top: 10 };
                        obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
                        return obj;
                    }
                    // extraCssText: 'width: 170px'
                },
                axisPointer: {
                    link: { xAxisIndex: 'all' },
                    label: {
                        backgroundColor: '#131315'
                    }
                },
                toolbox: {
                    feature: {
                        dataZoom: {
                            yAxisIndex: false
                        },
                        brush: {
                            type: ['lineX', 'clear']
                        }
                    }
                },
                brush: {
                    xAxisIndex: 'all',
                    brushLink: 'all',
                    outOfBrush: {
                        colorAlpha: 0.2
                    }
                },
                visualMap: {
                    show: false,
                    seriesIndex: 5,
                    dimension: 2,
                    pieces: [{
                        value: 1,
                        color: downColor
                    }, {
                        value: -1,
                        color: upColor
                    }]
                },
                grid: [
                    // remove the horizontal grid lines
                    {
                        left: '10%',
                        right: '8%',
                        height: '50%'
                    },
                    {
                        left: '10%',
                        right: '8%',
                        top: '63%',
                        height: '16%'
                    }
                ],
                xAxis: [
                    {
                        type: 'category',
                        data: data.categoryData,
                        scale: true,
                        boundaryGap: false,
                        axisLine: { show: false },
                        splitLine: { show: false },
                        splitNumber: 20,
                        min: 'dataMin',
                        max: 'dataMax',
                        axisPointer: {
                            z: 100
                        }
                    },
                    {
                        type: 'category',
                        gridIndex: 1,
                        data: data.categoryData,
                        scale: true,
                        boundaryGap: false,
                        axisLine: { onZero: false },
                        axisTick: { show: false },
                        splitLine: { show: false },
                        axisLabel: { show: false },
                        splitNumber: 1,
                        min: 'dataMin',
                        max: 'dataMax',
                        axisPointer: {
                            label: {
                                formatter: function (params: any) {
                                    var seriesValue = (params.seriesData[0] || {}).value;
                                    return params.value
                                        + (seriesValue != null
                                            ? '\n' + echarts.format.addCommas(seriesValue)
                                            : ''
                                        );
                                }
                            }
                        }
                    }
                ],
                yAxis: [
                    {
                        scale: true,
                        splitArea: {
                            show: false
                        }
                    },
                    {
                        scale: false,
                        gridIndex: 1,
                        splitNumber: 1,
                        axisLabel: { show: false },
                        axisLine: { show: false },
                        axisTick: { show: false },
                        splitLine: { show: false }
                    }
                ],
                dataZoom: [
                    {
                        type: 'inside',
                        xAxisIndex: [0, 1],
                        start: 95,
                        end: 100
                    },
                    {
                        show: true,
                        xAxisIndex: [0, 1],
                        type: 'slider',
                        top: '85%',
                        start: 95,
                        end: 100
                    }
                ],
                series: [
                    {
                        name: 'R41N',
                        type: 'candlestick',
                        data: data.values,
                        itemStyle: {
                            color: upColor,
                            color0: downColor,
                            borderColor: null,
                            borderColor0: null
                        },
                        tooltip: {
                            formatter: function (param: any) {
                                param = param[0];
                                return [
                                    'Date: ' + param.name + '<hr size=1 style="margin: 3px 0">',
                                    'Open: ' + param.data[0] + '<br/>',
                                    'Close: ' + param.data[1] + '<br/>',
                                    'Lowest: ' + param.data[2] + '<br/>',
                                    'Highest: ' + param.data[3] + '<br/>'
                                ].join('');
                            }
                        }
                    }
                ],
                timeAxis: {
                    axisLine: {
                        lineStyle: {
                            color: '#131315'
                        }
                    }
                },
            });

            return () => {
                myChart.dispose()
            };

        }

    }, []);

    return (

        <div className="profile-container">

            <div className="profile-details">

                <div className="first-container">

                    <div className='R41N-chart'>

                        <div className='title'>

                            <h1>$R41N</h1>

                        </div>

                        <div className='chart' ref={chartContainerRef} style={{ width: '100%', height: '300px' }}></div>

                    </div>

                </div>

                <div className="second-container">

                    <div className="weekly-module">

                        <div className="title">

                            <h1>Weekly Airdrop</h1>

                        </div>

                        <div className="content">
                        </div>

                    </div>

                </div>

            </div>

        </div>

    )

}

export default ProfilePage;