/**
 * Created by Yaroslav on 04.06.2018.
 */
import React, { Component } from 'react';
import { View, Text, Button, PermissionsAndroid, Image } from 'react-native';
import Camera from 'react-native-camera';
import Ripple from 'react-native-material-ripple';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNFS from 'react-native-fs';
import {API} from '../../constants/appConfig';



class AddPlace extends Component {

    constructor(props){
        super(props);
        this.state = {
            isPhotoTaken: false,
            filePhotoUrl: ''
        }
    }

    async requestCameraPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                return true;
            } else {
                this.props.navigator.push({
                    title: 'MapPage',
                    animationType: 'FloatFromBottom'
                })
            }
        } catch (err) {
            console.warn(err)
        }
    }

    async requestStoragePermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                return true;
            } else {
                this.props.navigator.push({
                    title: 'MapPage',
                    animationType: 'FloatFromBottom'
                })
            }
        } catch (err) {
            console.warn(err)
        }
    }

    remakePhoto() {
        let photoPath = this.state.filePhotoUrl.split('///').pop();
        RNFS.unlink(photoPath)
            .then(() => {
                //FILE_DELETED
                this.setState({
                    isPhotoTaken: false,
                    filePhotoUrl: ''
                });
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    sendParkPlace() {
        const file = {
            uri,             // e.g. 'file:///path/to/file/image123.jpg'
            name,            // e.g. 'image123.jpg',
            type             // e.g. 'image/jpg'
        };

        const body = new FormData()
        body.append('file', file)

        fetch(url, {
            method: 'POST',
            body
        })
    }

    takePicture() {
        const options = {};
        //options.location = ...
        this.camera.capture({metadata: options})
            .then((data) => {
            console.log(data);
                this.setState({
                    isPhotoTaken: true,
                    filePhotoUrl: data.path
                });
            })
            .catch(err => console.error(err));
    }

    render() {
        this.requestCameraPermission();
        this.requestStoragePermission();

        let finishedPhoto = <View style={styles.thanks}>
            <Image
                style={styles.finishedPhoto}
                source={{isStatic:true, uri: this.state.filePhotoUrl}}  />
            <View style={styles.botBtn}>
                <Ripple
                    onPress={this.sendParkPlace.bind(this)}
                    rippleColor={'#FFFFFF'}
                    rippleOpacity={0.6}
                    rippleDuration={800}
                    style={{...styles.stdBtn, marginRight: 1}}>
                    <Icon style={styles.stdBtnIcon} name={'paper-plane-o'} />
                    <Text style={styles.stdBtnText}>SEND</Text>
                </Ripple>
                <Ripple
                    onPress={this.remakePhoto.bind(this)}
                    rippleColor={'#FFFFFF'}
                    rippleOpacity={0.6}
                    rippleDuration={800}
                    style={styles.stdBtn}>
                    <Icon style={styles.stdBtnIcon} name={'camera'} />
                    <Text style={styles.stdBtnText}>Remake photo</Text>
                </Ripple>
            </View>
        </View> ;

        return (
            <View style={styles.addPlace}>
                {(this.state.isPhotoTaken)? finishedPhoto :
                        <Camera
                            ref={(cam) => {
                            this.camera = cam;
                            }}
                            captureQuality={Camera.constants.CaptureQuality["480p"]}
                            style={styles.preview}>
                            <Icon style={styles.photoBtn} name={'camera'} onPress={this.takePicture.bind(this)} />
                        </Camera>
                }

            </View>
        )
    }

}

const styles = {
    addPlace: {
        flex: 1
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        //backgroundColor: '#064A56'
    },
    photoBtn: {
        fontSize: 45,
        color: '#FF6D64'
    },
    finishedPhoto: {
        flex: 1
    },
    thanks: {
        flex: 1,
    },
    botBtn: {
        flexDirection: 'row',
    },
    stdBtn: {
        height: 55,
        flexGrow: 1,
        backgroundColor: '#FF6D64',
        width: '50%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    stdBtnText: {
        color: '#FFFFFF',
        fontSize: 20
    },
    stdBtnIcon: {
        fontSize: 23,
        color: '#FFFFFF',
        marginRight: 5
    }
};

export default AddPlace
