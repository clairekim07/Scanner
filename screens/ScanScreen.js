import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View ,Image, TouchableOpacity} from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';

export default class ScanScreen extends React.Component{
    constructor(){
        super();
        this.state={
            hasCameraPermissions:null,
            scanned:false,
            scannedData:'',
            buttonState:'normal'
        }
    }
   
    getCameraPermission=async()=>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermission:status==='granted'
        })

    }

    handleBarcodeScan=async(type,data)=>{
        this.setState({
            scanned:true,
            scannedData:data,
            buttonState:'normal'
        })
    }
    render(){
        const hasCameraPermission = this.state.hasCameraPermission;
        const scannedData = this.state.scannedData;
        const buttonState = this.state.buttonState;
        if(buttonState==='clicked'&& hasCameraPermission){
            this.setState({buttonState:'clicked'})
            return(
                <BarCodeScanner 
                onBarCodeScanned={scanned?undefined:this.handleBarcodeScan}
                style={StyleSheet.absoluteFillObject} 
                />
            )
    }else if(buttonState==='normal'){
    return(
        <View>
<Image source={require('../assets/scanner.jpg')} />            <Text>{hasCameraPermission===true?this.state.scannedData:"Request camera permissions"}</Text>
            <TouchableOpacity 
            onPress={this.getCameraPermission}
            title={"Bar Code Scanner"}>
                <Text style={styles.scan}>
                    Scan the QR code
                </Text>

            </TouchableOpacity>
        </View>
    )}
    }
}
const styles= StyleSheet.create({
    scan:{
        backgroundColor:'lightblue',
        margin:10,
        padding:10,

    }
})