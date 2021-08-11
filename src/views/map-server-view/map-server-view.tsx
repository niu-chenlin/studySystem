import * as React from "react";
import { bindActionCreators } from "redux";
import { changeViewLoading } from "../../redux/actions/ViewActionCreator";
import { connect } from "react-redux";
import { Button } from 'antd';
const starting = require('../../static/img/marker/starting.png');
const virtual = require('../../static/img/marker/virtual.png');
const course = require('../../static/img/marker/course.png');
const destination = require('../../static/img/marker/destination.png');
import axios from 'axios';

const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators({
        changeViewLoading: changeViewLoading
    }, dispatch);
};
// @ts-ignore
@connect(state => ({ loading: state[0] }), mapDispatchToProps)
export class MapServerView extends React.Component<any, any> {
    QMap: any = (window as any).qq.maps;
    map: any;
    center: any = null;
    measureTool: any = null;
    propsMarkerArr: any[] = [1,2,3];
    mapClickEnable: boolean = false;
    clickListener: any = null;
    dblclickListener: any = null;
    selfMarker: any[] = [];
    labelArr: any[] = [];
    polylineArr: any[] = [];
    polylinePathArr: any[] = [];
    timeoutId = null;
    constructor(props: any) {
        super(props);
    }
    componentDidMount() {
        this.props.changeViewLoading(true);
        setTimeout(() => {
            this.props.changeViewLoading(false);
            this.initMap();
        }, 500);
    }
    initMap() {
        this.center = new this.QMap.LatLng(39.984120, 116.307484);
        this.map = new this.QMap.Map(document.getElementById('mapServer'),{
            center: this.center,
            zoom: 15,
        });
        // this.measureTool = new this.QMap.tools.MeasureTool({
        //     map: this.map
        // });
    }
    async doGetPath(from, to) {
        return await axios({
            method: 'get',
            url: '/map',
            params: {
                from,
                to,
                key: 'PGPBZ-EPBK4-JFZUT-X4PIJ-7C3BZ-CUB74'
            },
        })
    }
    startCJ() {
        if(this.mapClickEnable && this.clickListener) {
            this.QMap.event.removeListener(this.clickListener)
        } else {
            this.clickListener = this.QMap.event.addListener(this.map, 'click', (event: any) => {
                clearTimeout(this.timeoutId);
                this.timeoutId = setTimeout(() => this.onClickMap(event), 300);
            });
            this.dblclickListener = this.QMap.event.addListener(this.map, 'dblclick', (event: any) => {
                clearTimeout(this.timeoutId);
                this.onDblclickMap(event)
            });
        }
        this.mapClickEnable = !this.mapClickEnable;
    }
    onDblclickMap(event) {
        let nowIcon,
            markerText = "起点",
            anchor = new this.QMap.Point(10, 30),
            scaleSize = new this.QMap.Size(35, 34),
            offset = new this.QMap.Size(10, -50);
        if(this.selfMarker.length === 0) {
            nowIcon = new this.QMap.MarkerImage(starting, undefined, undefined, anchor, scaleSize);
        } else if(this.propsMarkerArr.length-1 > this.labelArr.length) {
            markerText = "过程点";
            nowIcon = new this.QMap.MarkerImage(course, undefined, undefined, anchor, scaleSize);
        } else {
            markerText = "终点";
            nowIcon = new this.QMap.MarkerImage(destination, undefined, undefined, anchor, scaleSize);
        }
        this.renderMarker(event, nowIcon, markerText, offset);
    }
    onClickMap(event) {
        if(this.selfMarker.length === 0 || this.propsMarkerArr.length === this.labelArr.length) return;
        let nowIcon, anchor, scaleSize, offset;

        anchor = new this.QMap.Point(10, 20);
        scaleSize = new this.QMap.Size(26, 25);
        offset = new this.QMap.Size(5, -50);
        nowIcon = new this.QMap.MarkerImage(virtual, undefined, undefined, anchor, scaleSize);
        this.renderMarker(event, nowIcon, "虚拟点", offset);
    }
    renderMarker(event, nowIcon, markerText, offset) {
        let marker = new this.QMap.Marker({
            position: event.latLng,
            map: this.map,
            icon: nowIcon,
            content: markerText
        });
        marker.setDraggable(true);
        this.selfMarker.push(marker);
        this.polylinePathArr.push(event.latLng);
        let self = this;
        let index = this.selfMarker.length - 1;
        this.QMap.event.addListener(marker, 'dragend', function(rest: any) {
            self.onDragend(rest, index);
        });
        if(markerText !== "虚拟点") {
            let label = new this.QMap.Label({
                content: markerText,
                map: this.map,
                offset: offset,
                position: event.latLng
            });
            this.labelArr.push(label);
        }
        this.renderMapPoly();
    }
    doDecompression(coors: any[]) {
        let retData = [];
        for (let i = 2; i < coors.length ; i++) {
            coors[i] = coors[i-2] + coors[i]/1000000;
        }
        for (let i = 0; i < coors.length ; i+=2) {
            retData.push(new this.QMap.LatLng(coors[i], coors[i + 1]));
        }
        return retData;
    }
    async renderMapPoly() {
        this.polylineArr.forEach(polyline => {
            polyline.setMap(null);
        });
        this.polylineArr = [];
        for(let i = 0; i < this.polylinePathArr.length; i++) {
            let start = i;
            let end = i + 1;
            if (!this.polylinePathArr[end]) return;
            let from = this.polylinePathArr[start].lat + "," + this.polylinePathArr[start].lng;
            let to = this.polylinePathArr[end].lat + "," + this.polylinePathArr[end].lng;
            let retData: any = await this.doGetPath(from, to);
            let path = this.doDecompression(retData.data.result.routes[0].polyline);
            let polyline = new this.QMap.Polyline({
                map: this.map,
                // path: this.polylinePathArr,
                path,
                strokeColor: '#3893F9',
                strokeWeight: 6
            });
            this.polylineArr.push(polyline);
        }
    }
    onDragend(rest: any, index: number) {
        // this.props.addStageData[index].location = rest.latLng;
        this.polylinePathArr[index] = rest.latLng;
        // this.selfMarker[index].center = rest.latLng;
        this.renderMapPoly();
    }
    clearMap() {
        this.selfMarker.forEach(marker => {
            marker.setMap(null);
        });
        this.labelArr.forEach(label => {
            label && label.setMap(null);
        });
        this.polylineArr.forEach(polyline => {
            polyline.setMap(null);
        });
        this.selfMarker = [];
        this.labelArr = [];
        this.polylineArr = [];
        this.polylinePathArr = [];
    }
    clearNow() {
        if(this.selfMarker[this.selfMarker.length-1]) {
            if(this.selfMarker[this.selfMarker.length-1].content !== "虚拟点") {
                this.labelArr[this.labelArr.length-1].setMap(null);
                this.labelArr.splice(-1, 1);
            }
            this.selfMarker[this.selfMarker.length-1].setMap(null);
            this.selfMarker.splice(-1, 1);
            this.polylinePathArr.splice(-1, 1);
        }
        if(this.polylineArr[this.polylineArr.length-1]) {
            this.polylineArr[this.polylineArr.length-1].setMap(null);
            this.polylineArr.splice(-1, 1);
        }
    }
    render() {
        return <div style={{height: '100%'}}>
            <div id='mapServer' style={{height: '100%'}}/>
            <Button type="primary" onClick={() => this.startCJ()}>开始画线</Button>
            <Button type="primary" onClick={() => this.clearMap()} style={{marginLeft: 10}}>清空</Button>
            <Button type="primary" onClick={() => this.clearNow()} style={{marginLeft: 10}}>清空当前</Button>
        </div>
    }
}