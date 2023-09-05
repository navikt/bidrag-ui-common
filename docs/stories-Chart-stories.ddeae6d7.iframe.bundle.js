"use strict";(self.webpackChunk_navikt_bidrag_ui_common=self.webpackChunk_navikt_bidrag_ui_common||[]).push([[496],{"./src/stories/Chart.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{LineChart:()=>LineChart,__namedExportsOrder:()=>__namedExportsOrder,default:()=>Chart_stories});var install=__webpack_require__("./node_modules/echarts/lib/chart/line/install.js"),legend_install=__webpack_require__("./node_modules/echarts/lib/component/legend/install.js"),grid_install=__webpack_require__("./node_modules/echarts/lib/component/grid/install.js"),tooltip_install=__webpack_require__("./node_modules/echarts/lib/component/tooltip/install.js"),title_install=__webpack_require__("./node_modules/echarts/lib/component/title/install.js"),toolbox_install=__webpack_require__("./node_modules/echarts/lib/component/toolbox/install.js"),dataZoom_install=__webpack_require__("./node_modules/echarts/lib/component/dataZoom/install.js"),extension=__webpack_require__("./node_modules/echarts/lib/extension.js"),echarts=__webpack_require__("./node_modules/echarts/lib/core/echarts.js"),installCanvasRenderer=__webpack_require__("./node_modules/echarts/lib/renderer/installCanvasRenderer.js"),react=__webpack_require__("./node_modules/react/index.js"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");(0,extension.D)([legend_install.N,install.N,grid_install.N,tooltip_install.N,title_install.N,toolbox_install.N,dataZoom_install.N,installCanvasRenderer.N]);let currentIndex=-1;function EChartLineChart({option,style}){const chartRef=(0,react.useRef)(null),[chartInitialized,setChartInitialized]=(0,react.useState)(!1);return(0,react.useEffect)((()=>{let chart;function resizeChart(){chart?.resize()}return null!==chartRef.current&&(chart=(0,echarts.S1)(chartRef.current),setChartInitialized(!0)),window.addEventListener("resize",resizeChart),()=>{chart?.dispose(),window.removeEventListener("resize",resizeChart)}}),[]),(0,react.useEffect)((()=>{const canvas=chartRef.current.querySelector("canvas"),chart=(0,echarts.JE)(chartRef.current),dataLen=option.series[0].data?.length??0,handleKeydown=e=>{"ArrowRight"!==e.key&&"ArrowLeft"!==e.key||(chart?.dispatchAction({type:"downplay",seriesIndex:0,dataIndex:currentIndex}),currentIndex="ArrowRight"===e.key?(currentIndex+1)%dataLen:currentIndex<=0?dataLen-1:currentIndex-1,chart?.dispatchAction({type:"highlight",seriesIndex:0,dataIndex:currentIndex}),chart?.dispatchAction({type:"showTip",seriesIndex:0,dataIndex:currentIndex}))},addKeydownListener=()=>window.addEventListener("keydown",handleKeydown),removeKeydownListener=()=>window.removeEventListener("keydown",handleKeydown);return canvas?.setAttribute("tabindex","0"),canvas?.addEventListener("focusin",addKeydownListener),canvas?.addEventListener("focusout",removeKeydownListener),()=>{window.removeEventListener("keydown",handleKeydown),canvas?.removeEventListener("focusin",addKeydownListener),canvas?.removeEventListener("focusout",removeKeydownListener)}}),[chartInitialized]),(0,react.useEffect)((()=>{if(null!==chartRef.current){(0,echarts.JE)(chartRef.current).setOption(option)}}),[option]),(0,jsx_runtime.jsx)("div",{ref:chartRef,style:{width:"100%",height:"250px",...style}})}EChartLineChart.displayName="EChartLineChart";try{EChartLineChart.displayName="EChartLineChart",EChartLineChart.__docgenInfo={description:"",displayName:"EChartLineChart",props:{option:{defaultValue:null,description:"",name:"option",required:!0,type:{name:"EChartsOption"}},style:{defaultValue:null,description:"",name:"style",required:!1,type:{name:"CSSProperties"}},settings:{defaultValue:null,description:"",name:"settings",required:!1,type:{name:"SetOptionOpts"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/react_components/e-charts/LineChart.tsx#EChartLineChart"]={docgenInfo:EChartLineChart.__docgenInfo,name:"EChartLineChart",path:"src/react_components/e-charts/LineChart.tsx#EChartLineChart"})}catch(__react_docgen_typescript_loader_error){}const Chart_stories={title:"Example/Chart",component:EChartLineChart,tags:["autodocs"],parameters:{layout:"fullscreen"}},LineChart={args:{option:{legend:{show:!1},tooltip:{trigger:"axis",showContent:!0,formatter:"<p><strong>Lønn</strong>: 45000</p>",backgroundColor:"rgb(230,240,255)",borderColor:"rgb(230,240,255)"},xAxis:{type:"category",data:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]},grid:{bottom:"0px",top:"16px",left:"8px",right:"0px",containLabel:!0},yAxis:{type:"value",min:1e4,max:8e4},series:[{name:"Lønn",data:[45e3,45e3,45e3,45e3,45e3,75e3,45e3,45e3,45e3,45e3,6e4,45e3],type:"line",smooth:!0}]}}};LineChart.parameters={...LineChart.parameters,docs:{...LineChart.parameters?.docs,source:{originalSource:'{\n  args: {\n    option: {\n      legend: {\n        show: false\n      },\n      tooltip: {\n        trigger: "axis",\n        showContent: true,\n        formatter: `<p><strong>Lønn</strong>: 45000</p>`,\n        backgroundColor: "rgb(230,240,255)",\n        borderColor: "rgb(230,240,255)"\n      },\n      xAxis: {\n        type: "category",\n        data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]\n      },\n      grid: {\n        bottom: "0px",\n        top: "16px",\n        left: "8px",\n        right: "0px",\n        containLabel: true\n      },\n      yAxis: {\n        type: "value",\n        min: 10000,\n        max: 80000\n      },\n      series: [{\n        name: "Lønn",\n        data: [45000, 45000, 45000, 45000, 45000, 75000, 45000, 45000, 45000, 45000, 60000, 45000],\n        type: "line",\n        smooth: true\n      }]\n    }\n  }\n}',...LineChart.parameters?.docs?.source}}};const __namedExportsOrder=["LineChart"]}}]);