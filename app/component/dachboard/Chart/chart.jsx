import React from 'react';
import {  Chart, Interval, Axis,Line,Area,Legend,Geometry,Tooltip} from '@antv/f2';
import { CaretDownOutlined } from '@ant-design/icons';
import {CTYPE}from '../../../common'
import Canvas from '@antv/f2-react';
import '../../../assets/css/chart/chart.scss'

class ChartWarp extends React.Component{
  state={
    type:this.props.type,
    w:document.documentElement.clientWidth,
    h:document.documentElement.clientHeight
  }
  renderCartValue(type){
    switch (type){
      case 'form':
        return <ChartForm/>;
      case 'cake':
        return <ChartCake/>;
      case 'filler':
        return <ChartFiller/>
      case 'text':
        return <ChartText/>
    }
  }
  nameData(type){
    let name=''
    switch(type){
      case 'form':
        name='Daily Taliabu Concentrate'
        break
      case 'cake':
        name='Daily Power Consumption'
        break
      case 'filler':
        name='Taliabu Concentrate Shipments'
        break
      case 'text':
        name = 'Total Active Power Generations'
        break
    }
    return name
  }

  render (){
    let {type} = this.state
    return <div className='chart-warp'>
            <div className='chart-title'>
              <div className='chart-name'>
                {this.nameData(type)}
              </div>
              <div className='chart-menu'>
                {type==='form'? <span>Last Year<CaretDownOutlined /></span>: null}
              </div>
            </div>
            <div className='cart-value'>
              {this.renderCartValue(type)}
            </div>
          </div>
  }
}

class ChartForm extends React.Component{
  state={
    w:document.documentElement.clientWidth,
    h:document.documentElement.clientHeight
  }
  render(){
    return<Canvas width={this.state.w * 0.8}  height={this.state.w * 0.8 * 0.5}>
            <Chart
              data={CTYPE.linData}
              scale={{
                month: {
                  // type:'identity',
                  range: [0,1],
                  // ticks:['Jan','Feb','Mar','Apr','May','Jun'],
                },
                value: {
                  
                  // min: 0 + 'k',
                  // max: 100 + 'k',
                  formatter: (value) => `${value/1000}K`,
                  tickCount: 5,
                },
              }}
            >
              <Axis field="month" />
              <Axis field="value"style={{
          label: { align: 'between' },
        }}/>
              <Area x="month" y="value" color="l(100) 0:#8A88FB" />
              <Line x="month" y="value" color="l(100) 0:#8A88FB"/>
              <Tooltip showTooltipMarker={true} />
            </Chart>
          </Canvas>
  }
}

class ChartCake extends React.Component{
  state={
    w:document.documentElement.clientWidth,
    h:document.documentElement.clientHeight
  }
  render(){
    return<Canvas width={this.state.w * 0.8} height={this.state.w * 0.8 *0.7}>
    <Chart
      data={CTYPE.cakeData}
      scale={{
        percent: {
          formatter: function formatter(val) {
            console.log(val)
            return val + '%';

          },
        },
      }}
      coord={{
        radius: 1,
        transposed: true,
        type: 'polar',
        innerRadius: 0.6,
      }}
    >
      <Interval
        x="a"
        y="percent"
        adjust="stack"
        color="name"
        selection={{
          selectedStyle: (record) => {
            const { yMax, yMin } = record;
            return {
              // 半径放大 1.1 倍
              r: (yMax - yMin) * 2.7,
            };
          },
        }}
      />
    </Chart>
  </Canvas>
  }

}

class ChartFiller extends React.Component{
  state={
    w:document.documentElement.clientWidth,
    h:document.documentElement.clientHeight
  }
  render(){
    return<Canvas width={this.state.w * 0.8} height={this.state.w * 0.8 * 0.5}>
    <Chart
    // width='200px'
      data={CTYPE.fillerData}
      scale={{
        date: {
          range: [0, 1],
          type: 'timeCat',
          mask: 'MM-DD',
          tickCount: 5,
        },
        value: {
          max: 300,
          tickCount: 4,
        },
      }}
    >
      <Axis field="value" />
      <Axis
        field="date"
        style={{
          label: { align: 'between' },
        }}
      />
      <Area x="date" y="value" color={["city",['#D079EE','#8A88FB']]} adjust="stack" />
      <Line x="date" y="value" color={["city",['#D079EE','#8A88FB']]} adjust="stack" />
      {/* <Legend style={{ justifyContent: 'space-around' }} /> */}
      <Tooltip showTooltipMarker={true} />
    </Chart>
  </Canvas>
  }
}

class ChartText extends React.Component{
  state={
    w:document.documentElement.clientWidth,
    h:document.documentElement.clientHeight
  }
  render(){
    return<Canvas width={this.state.w * 0.8} height={this.state.w * 0.8 * 0.5}>
      <Chart 
      data={CTYPE.textData}
      coord={{
        transposed: true,
      }}
      scale={{
        月均降雨量: {
          tickCount: 5,
        },
      }}>
      <Axis field="月份" />
      <Axis field="月均降雨量" />
      <Interval x="月份" y="月均降雨量" color="name" adjust="stack" />
      <Tooltip showTooltipMarker={true} />
      </Chart>
    </Canvas>
  }
}

export {
  ChartWarp,ChartCake,ChartFiller,ChartText
}