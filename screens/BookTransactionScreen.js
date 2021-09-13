import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, Touchable } from 'react-native';
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from 'expo-barcode-scanner';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class BookTranscationScreen extends Component{
    constructor(){
        super()
        this.state={
            hasCameraPermissons:null,
            scanned:false,
            scannedData:'',
            buttonState:"normal",
        }
    }

    getCameraPermission= async() => {
        const {status} = await Permissions.askAsync(Permissions.CAMERA)
        this.setState({
            hasCameraPermissons:status==="granted",
            buttonState:"clicked",
            scanned:false,
        })
    }

    handleBarcodeScanned= async({type,data}) => {
        this.setState({
            scanned:true,
            scannedData:data,
            buttonState:"normal"
        })
    }
    render(){
        const hasCameraPermissons = this.state.hasCameraPermissons
        const scanned = this.state.scanned
        const buttonState = this.state.buttonState

        if(buttonState==="clicked" && hasCameraPermissons){
            return(
                <BarCodeScanner onBarCodeScanned = {scanned?undefined:this.handleBarcodeScanned}></BarCodeScanner>
            )
        }else if (buttonState==="normal"){
            return(
                <View style={styles.container}>
                    <Text style={styles.displayText}>{hasCameraPermissons===true?this.state.scannedData:"Request Camera Permission"}</Text>
                    <TouchableOpacity style={styles.scanButton} onPress = {this.getCameraPermission}>
                        <Text style={styles.buttonText}>Scan QRcode</Text>
                    </TouchableOpacity>
                </View>
            )
        }
       
    }
}
const styles = StyleSheet.create({ 
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' }, 
    displayText:{ fontSize: 15, textDecorationLine: 'underline' },
    scanButton:{ backgroundColor: '#2196F3', padding: 10, margin: 10 },
    buttonText:{ fontSize: 20, } });